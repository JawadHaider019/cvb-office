import { prisma, isConnectedToPostgres, getDb, saveDb } from '../config/db.js';
export async function fetchFullSiteData() {
    if (!isConnectedToPostgres) {
        return getDb();
    }
    try {
        const [contentBlocks, settings, features, steps, faqs, benefits, audiences, requests,] = await Promise.all([
            prisma.contentBlock.findMany(),
            prisma.setting.findMany(),
            prisma.featureCard.findMany({ orderBy: { sort_order: 'asc' } }),
            prisma.stepItem.findMany({ orderBy: { number: 'asc' } }),
            prisma.faqItem.findMany({ orderBy: { sort_order: 'asc' } }),
            prisma.benefitItem.findMany({ orderBy: { sort_order: 'asc' } }),
            prisma.audienceItem.findMany({ orderBy: { sort_order: 'asc' } }),
            prisma.signUpRequest.findMany({ orderBy: { created_at: 'desc' } }),
        ]);
        const fallback = getDb();
        const content = { ...fallback.content };
        contentBlocks.forEach((b) => {
            if (b.type === 'json') {
                try {
                    content[b.key] = JSON.parse(b.value);
                }
                catch {
                    content[b.key] = b.value;
                }
            }
            else {
                content[b.key] = b.value;
            }
        });
        const settingsMap = {};
        settings.forEach((s) => {
            settingsMap[s.key] = s.value;
        });
        const priceSettings = {
            monthlyNet: settingsMap['monthly_net_per_vehicle']
                ? parseFloat(settingsMap['monthly_net_per_vehicle'])
                : 8.33,
            yearlyNet: settingsMap['yearly_net_per_vehicle']
                ? parseFloat(settingsMap['yearly_net_per_vehicle'])
                : 100.0,
            noteText: settingsMap['price_note_text'] || fallback.priceSettings.noteText,
            currency: settingsMap['currency'] || '€',
        };
        const generalSettings = {
            alertEmail: settingsMap['alert_email'] || fallback.generalSettings.alertEmail,
            senderName: settingsMap['sender_name'] || fallback.generalSettings.senderName,
            trialLink: settingsMap['trial_link'] || fallback.generalSettings.trialLink,
            cvbWebsiteLink: settingsMap['cvb_website_link'] || fallback.generalSettings.cvbWebsiteLink,
            contactEmail: settingsMap['contact_email'] || fallback.generalSettings.contactEmail,
            pageTitle: settingsMap['page_title'] || fallback.generalSettings.pageTitle,
            pageDescription: settingsMap['page_description'] || fallback.generalSettings.pageDescription,
        };
        const formattedRequests = requests.map((r) => ({
            id: r.id,
            created_at: r.created_at.toISOString(),
            email: r.email,
            vehicle_count: r.vehicle_count,
            price_monthly_net_at_signup: r.price_monthly_net_at_signup,
            price_yearly_net_at_signup: r.price_yearly_net_at_signup,
            price_consent: r.price_consent,
            price_consent_text: r.price_consent_text,
            price_consent_at: r.price_consent_at.toISOString(),
            privacy_consent: r.privacy_consent,
            privacy_consent_at: r.privacy_consent_at.toISOString(),
            status: r.status || 'neu',
            notes: r.notes,
            email_sent: r.email_sent,
            email_error: r.email_error,
            contact_name: r.contact_name,
            phone: r.phone,
        }));
        return {
            content,
            priceSettings,
            generalSettings,
            features: features.length > 0 ? features : fallback.features,
            steps: steps.length > 0 ? steps : fallback.steps,
            faqs: faqs.length > 0 ? faqs : fallback.faqs,
            benefits: benefits.length > 0 ? benefits : fallback.benefits,
            audiences: audiences.length > 0 ? audiences : fallback.audiences,
            requests: formattedRequests,
            versionHistory: fallback.versionHistory || {},
            auditLog: fallback.auditLog || [],
        };
    }
    catch (e) {
        console.error('Error fetching data from PostgreSQL, using fallback:', e);
        return getDb();
    }
}
export async function recordVersion(key, value, user = 'Detlef Scheer') {
    const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
    if (isConnectedToPostgres) {
        try {
            await prisma.contentVersion.create({
                data: {
                    block_key: key,
                    value: valueStr,
                    saved_by: user,
                },
            });
        }
        catch (e) {
            console.error('Failed to record version in PostgreSQL:', e);
        }
    }
    const db = getDb();
    if (!db.versionHistory)
        db.versionHistory = {};
    if (!db.versionHistory[key])
        db.versionHistory[key] = [];
    db.versionHistory[key].unshift({
        timestamp: new Date().toISOString(),
        value: JSON.parse(JSON.stringify(value)),
        saved_by: user,
    });
    if (db.versionHistory[key].length > 20) {
        db.versionHistory[key] = db.versionHistory[key].slice(0, 20);
    }
    saveDb(db);
}
export async function fetchVersions(key) {
    if (isConnectedToPostgres) {
        try {
            const versions = await prisma.contentVersion.findMany({
                where: { block_key: key },
                orderBy: { saved_at: 'desc' },
                take: 20,
            });
            if (versions.length > 0) {
                return versions.map((v) => ({
                    id: v.id,
                    timestamp: v.saved_at.toISOString(),
                    value: v.value,
                    saved_by: v.saved_by || 'Admin',
                }));
            }
        }
        catch (e) {
            console.error('Error fetching versions from PostgreSQL:', e);
        }
    }
    const db = getDb();
    return db.versionHistory?.[key] || [];
}
