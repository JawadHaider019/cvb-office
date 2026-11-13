import { prisma, isConnectedToPostgres, getDb, saveDb } from '../config/db.js';
import { fetchFullSiteData, recordVersion, fetchVersions } from '../services/content.service.js';
export async function getContent(req, res) {
    try {
        const data = await fetchFullSiteData();
        res.json({
            content: data.content,
            priceSettings: data.priceSettings,
            generalSettings: data.generalSettings,
            features: data.features,
            steps: data.steps,
            faqs: data.faqs,
            benefits: data.benefits,
            audiences: data.audiences,
        });
    }
    catch (err) {
        console.error('Error fetching site data:', err);
        const fallback = getDb();
        res.json({
            content: fallback.content,
            priceSettings: fallback.priceSettings,
            generalSettings: fallback.generalSettings,
            features: fallback.features,
            steps: fallback.steps,
            faqs: fallback.faqs,
        });
    }
}
export async function getSettings(req, res) {
    const data = await fetchFullSiteData();
    res.json(data.generalSettings);
}
export async function getPrices(req, res) {
    const data = await fetchFullSiteData();
    res.json(data.priceSettings);
}
export async function updateContent(req, res) {
    const { content, priceSettings, generalSettings, features, steps, faqs, user } = req.body;
    const db = getDb();
    const userName = user || 'Detlef Scheer';
    if (content) {
        await recordVersion('content', db.content, userName);
        db.content = { ...db.content, ...content };
        if (isConnectedToPostgres) {
            try {
                for (const [k, v] of Object.entries(content)) {
                    const type = Array.isArray(v) || typeof v === 'object' ? 'json' : 'text';
                    const valStr = typeof v === 'string' ? v : JSON.stringify(v);
                    await prisma.contentBlock.upsert({
                        where: { key: k },
                        update: { value: valStr, type, updated_by: userName },
                        create: { key: k, value: valStr, type, updated_by: userName },
                    });
                }
            }
            catch (e) {
                console.error('Failed to update content blocks in PostgreSQL:', e);
            }
        }
    }
    if (priceSettings) {
        await recordVersion('priceSettings', db.priceSettings, userName);
        db.priceSettings = { ...db.priceSettings, ...priceSettings };
        if (isConnectedToPostgres) {
            try {
                if (priceSettings.monthlyNet !== undefined) {
                    await prisma.setting.upsert({
                        where: { key: 'monthly_net_per_vehicle' },
                        update: { value: String(priceSettings.monthlyNet) },
                        create: { key: 'monthly_net_per_vehicle', value: String(priceSettings.monthlyNet) },
                    });
                }
                if (priceSettings.yearlyNet !== undefined) {
                    await prisma.setting.upsert({
                        where: { key: 'yearly_net_per_vehicle' },
                        update: { value: String(priceSettings.yearlyNet) },
                        create: { key: 'yearly_net_per_vehicle', value: String(priceSettings.yearlyNet) },
                    });
                }
                if (priceSettings.noteText !== undefined) {
                    await prisma.setting.upsert({
                        where: { key: 'price_note_text' },
                        update: { value: String(priceSettings.noteText) },
                        create: { key: 'price_note_text', value: String(priceSettings.noteText) },
                    });
                }
            }
            catch (e) {
                console.error('Failed to update price settings in PostgreSQL:', e);
            }
        }
    }
    if (generalSettings) {
        await recordVersion('generalSettings', db.generalSettings, userName);
        db.generalSettings = { ...db.generalSettings, ...generalSettings };
        if (isConnectedToPostgres) {
            try {
                const mappings = {
                    alertEmail: 'alert_email',
                    senderName: 'sender_name',
                    trialLink: 'trial_link',
                    cvbWebsiteLink: 'cvb_website_link',
                    contactEmail: 'contact_email',
                    pageTitle: 'page_title',
                    pageDescription: 'page_description',
                };
                for (const [field, dbKey] of Object.entries(mappings)) {
                    if (generalSettings[field] !== undefined) {
                        await prisma.setting.upsert({
                            where: { key: dbKey },
                            update: { value: String(generalSettings[field]) },
                            create: { key: dbKey, value: String(generalSettings[field]) },
                        });
                    }
                }
            }
            catch (e) {
                console.error('Failed to update general settings in PostgreSQL:', e);
            }
        }
    }
    if (features) {
        await recordVersion('features', db.features, userName);
        db.features = features;
    }
    if (steps) {
        await recordVersion('steps', db.steps, userName);
        db.steps = steps;
    }
    if (faqs) {
        await recordVersion('faqs', db.faqs, userName);
        db.faqs = faqs;
    }
    saveDb(db);
    res.json({ success: true, message: 'Änderungen erfolgreich gespeichert.' });
}
export async function getVersions(req, res) {
    const { key } = req.params;
    const versions = await fetchVersions(key);
    res.json(versions);
}
export async function restoreVersion(req, res) {
    const { key } = req.params;
    const { versionIndex, value } = req.body;
    const db = getDb();
    let targetValue = value;
    if (!targetValue && db.versionHistory?.[key] && db.versionHistory[key][versionIndex]) {
        targetValue = db.versionHistory[key][versionIndex].value;
    }
    if (!targetValue) {
        return res.status(404).json({ error: 'Version nicht gefunden' });
    }
    if (key === 'content') {
        db.content = { ...db.content, ...targetValue };
    }
    else if (key === 'priceSettings') {
        db.priceSettings = { ...db.priceSettings, ...targetValue };
    }
    else if (key === 'generalSettings') {
        db.generalSettings = { ...db.generalSettings, ...targetValue };
    }
    else if (key === 'features') {
        db.features = targetValue;
    }
    else if (key === 'steps') {
        db.steps = targetValue;
    }
    else if (key === 'faqs') {
        db.faqs = targetValue;
    }
    saveDb(db);
    res.json({ success: true, message: `Version für "${key}" erfolgreich wiederhergestellt.` });
}
