import { insertSignUpRequest, updateSignUpRequest, deleteSignUpRequest, getFilteredRequests, generateCsvExport, } from '../services/requests.service.js';
import { fetchFullSiteData } from '../services/content.service.js';
import { sendClientAlertEmail } from '../services/email.service.js';
export async function createRequest(req, res) {
    const { email, vehicleCount, priceConsent, privacyConsent, priceConsentText, contact_name, phone, } = req.body;
    // 1. Strict Validation (Section 6.5)
    const trimmedEmail = (email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
        return res.status(400).json({
            success: false,
            error: 'Bitte gib eine gültige E-Mail-Adresse ein.',
        });
    }
    const vCount = parseInt(String(vehicleCount), 10);
    if (isNaN(vCount) || vCount < 1 || vCount > 999) {
        return res.status(400).json({
            success: false,
            error: 'Bitte gib die Anzahl Deiner Fahrzeuge an (Zahl zwischen 1 und 999).',
        });
    }
    if (!priceConsent) {
        return res.status(400).json({
            success: false,
            error: 'Bitte bestätige den Preis, damit wir Deine Anfrage bearbeiten können.',
        });
    }
    if (!privacyConsent) {
        return res.status(400).json({
            success: false,
            error: 'Bitte stimme der Datenschutzerklärung zu.',
        });
    }
    const siteData = await fetchFullSiteData();
    // 2. Duplicate Check (Section 6.3 Step 6: within 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const isDuplicate = siteData.requests.some((r) => {
        if (r.email.toLowerCase() === trimmedEmail) {
            const createdDate = new Date(r.created_at);
            return createdDate > tenMinutesAgo;
        }
        return false;
    });
    if (isDuplicate) {
        return res.status(200).json({
            success: true,
            duplicate: true,
            message: siteData.content.successMessage ||
                'Eine Anfrage mit dieser E-Mail-Adresse ist vor wenigen Minuten bereits bei uns eingegangen. Wir bearbeiten sie bereits!',
        });
    }
    // 3. Price Calculation
    const unitMonthlyNet = siteData.priceSettings.monthlyNet || 8.33;
    const unitYearlyNet = siteData.priceSettings.yearlyNet || 100.0;
    const priceMonthlyNet = Number((vCount * unitMonthlyNet).toFixed(2));
    const priceYearlyNet = Number((vCount * unitYearlyNet).toFixed(2));
    const formattedUnitMonthly = unitMonthlyNet.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const formattedUnitYearly = unitYearlyNet.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const defaultPriceConsentText = `Ich bestätige, dass CVB-Office ${formattedUnitMonthly} € netto pro Fahrzeug und Monat kostet (${formattedUnitYearly} € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.`;
    // 4. Persistence
    const createdRequest = await insertSignUpRequest({
        email: trimmedEmail,
        vehicle_count: vCount,
        price_monthly_net_at_signup: priceMonthlyNet,
        price_yearly_net_at_signup: priceYearlyNet,
        price_consent: true,
        price_consent_text: priceConsentText || defaultPriceConsentText,
        privacy_consent: true,
        contact_name: contact_name || undefined,
        phone: phone || undefined,
    });
    // 5. Send Alert Email
    const emailRes = await sendClientAlertEmail({
        email: trimmedEmail,
        vehicleCount: vCount,
        createdAt: createdRequest.created_at,
        priceConsentText: createdRequest.price_consent_text,
        requestId: createdRequest.id,
        contactName: createdRequest.contact_name,
        phone: createdRequest.phone,
    });
    if (emailRes.success) {
        await updateSignUpRequest(createdRequest.id, { email_sent: true });
        createdRequest.email_sent = true;
    }
    else {
        await updateSignUpRequest(createdRequest.id, {
            email_sent: false,
            email_error: emailRes.error,
        });
        createdRequest.email_sent = false;
        createdRequest.email_error = emailRes.error;
    }
    return res.status(201).json({
        success: true,
        data: createdRequest,
        message: siteData.content.successMessage || 'Vielen Dank für Deine Anfrage! Wir melden uns in Kürze.',
    });
}
export async function getRequests(req, res) {
    const { status, search, sort } = req.query;
    const requests = await getFilteredRequests({
        status: typeof status === 'string' ? status : undefined,
        search: typeof search === 'string' ? search : undefined,
        sort: typeof sort === 'string' ? sort : undefined,
    });
    res.json(requests);
}
export async function updateRequest(req, res) {
    const { id } = req.params;
    const { status, notes, contact_name, phone } = req.body;
    const patch = {};
    if (status)
        patch.status = status;
    if (notes !== undefined)
        patch.notes = notes;
    if (contact_name !== undefined)
        patch.contact_name = contact_name;
    if (phone !== undefined)
        patch.phone = phone;
    const updated = await updateSignUpRequest(id, patch);
    if (!updated) {
        return res.status(404).json({ error: 'Anfrage nicht gefunden' });
    }
    res.json({ success: true, data: updated });
}
export async function deleteRequest(req, res) {
    const { id } = req.params;
    const deleted = await deleteSignUpRequest(id);
    if (!deleted) {
        return res.status(404).json({ error: 'Anfrage nicht gefunden' });
    }
    res.json({ success: true, message: 'Anfrage DSGVO-konform gelöscht' });
}
export async function exportCsv(req, res) {
    const csvContent = await generateCsvExport();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="CVB-Office-Anfragen_${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(csvContent);
}
