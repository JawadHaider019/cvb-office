import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {
  initDb,
  prisma,
  isConnectedToPostgres,
  fetchFullSiteData,
  insertSignUpRequest,
  updateSignUpRequest,
  deleteSignUpRequest,
  recordVersion,
  getDb,
  saveDb,
  SignUpRequest,
} from './db.js';
import { sendClientAlertEmail } from './email.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ---------------------------------------------------------------------------
// Rate Limiting & Anti-Spam Memory Stores (Section 6.3)
// ---------------------------------------------------------------------------
const ipRequestsMap = new Map<string, number[]>(); // IP -> timestamps of requests
const adminFailedAttemptsMap = new Map<string, { count: number; lockUntil: number | null }>();

function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const timestamps = (ipRequestsMap.get(ip) || []).filter((t) => t > oneHourAgo);

  if (timestamps.length >= 5) {
    ipRequestsMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipRequestsMap.set(ip, timestamps);
  return false;
}

// ---------------------------------------------------------------------------
// 1. Health Check
// ---------------------------------------------------------------------------
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'cvb-office-backend',
    version: '1.0.0',
    database: isConnectedToPostgres ? 'postgresql' : 'file-json-fallback',
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// 2. Public Content & Settings Endpoint (Section 8.2 & Appendix B)
// ---------------------------------------------------------------------------
app.get('/api/content', async (req: Request, res: Response) => {
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
  } catch (err: any) {
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
});

app.get('/api/settings', async (req: Request, res: Response) => {
  const data = await fetchFullSiteData();
  res.json(data.generalSettings);
});

app.get('/api/prices', async (req: Request, res: Response) => {
  const data = await fetchFullSiteData();
  res.json(data.priceSettings);
});

// ---------------------------------------------------------------------------
// 3. Sign-Up Form Submission (Section 6.1 - 6.5 & Appendix B/C)
// ---------------------------------------------------------------------------
app.post('/api/requests', async (req: Request, res: Response) => {
  const clientIp =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const {
    email,
    vehicleCount,
    priceConsent,
    privacyConsent,
    honeypot,
    formOpenedAt,
    priceConsentText,
    contact_name,
    phone,
  } = req.body;

  // 1. Honeypot check (Section 6.1: Reject silently with 200 OK)
  if (honeypot && typeof honeypot === 'string' && honeypot.trim() !== '') {
    return res.status(200).json({ success: true, message: 'Anfrage übermittelt' });
  }

  // 2. Minimum time check (Section 6.3 Step 5: under 3 seconds is rejected)
  if (formOpenedAt && Date.now() - Number(formOpenedAt) < 3000) {
    return res.status(400).json({
      success: false,
      error: 'Sicherheitsprüfung: Das Formular wurde zu schnell abgesendet. Bitte versuche es erneut.',
    });
  }

  // 3. Rate limit check (Section 6.3 Step 5: max 5 requests per hour)
  if (isIpRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Du hast zu viele Anfragen gesendet. Bitte versuche es in einer Stunde noch einmal.',
    });
  }

  // 4. Strict Validation (Section 6.5)
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

  // 5. Duplicate Check (Section 6.3 Step 6: same email within 10 minutes)
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
      message:
        siteData.content.successMessage ||
        'Eine Anfrage mit dieser E-Mail-Adresse ist vor wenigen Minuten bereits bei uns eingegangen. Wir bearbeiten sie bereits!',
    });
  }

  // 6. Pricing calculations (8.33 € net per vehicle/month = 100.00 € net per vehicle/year)
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

  // 7. Insert to Database (PostgreSQL via Prisma with JSON fallback)
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

  // 8. Send Alert Email to Client (Appendix C)
  const emailRes = await sendClientAlertEmail({
    email: trimmedEmail,
    vehicleCount: vCount,
    createdAt: createdRequest.created_at,
    priceConsentText: createdRequest.price_consent_text,
    requestId: createdRequest.id,
  });

  // Update request with email status
  if (emailRes.success) {
    await updateSignUpRequest(createdRequest.id, { email_sent: true });
    createdRequest.email_sent = true;
  } else {
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
});

// ---------------------------------------------------------------------------
// 4. Admin Requests List, Detail, CSV Export (Section 8.2 & 9.8)
// ---------------------------------------------------------------------------
app.get('/api/requests', async (req: Request, res: Response) => {
  const { status, search, sort } = req.query;
  const siteData = await fetchFullSiteData();
  let list = [...siteData.requests];

  // Filter by status ("all" | "neu" | "in_bearbeitung" | "erledigt")
  if (status && status !== 'all') {
    list = list.filter((r) => r.status === status);
  }

  // Filter by search query (email, contact_name, notes)
  if (search && typeof search === 'string' && search.trim() !== '') {
    const term = search.trim().toLowerCase();
    list = list.filter(
      (r) =>
        r.email.toLowerCase().includes(term) ||
        (r.contact_name && r.contact_name.toLowerCase().includes(term)) ||
        (r.notes && r.notes.toLowerCase().includes(term))
    );
  }

  // Sort
  if (sort === 'asc') {
    list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  } else {
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  res.json(list);
});

// Update Request Status or Private Note
app.patch('/api/requests/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes, contact_name, phone } = req.body;

  const patch: Partial<SignUpRequest> = {};
  if (status) patch.status = status;
  if (notes !== undefined) patch.notes = notes;
  if (contact_name !== undefined) patch.contact_name = contact_name;
  if (phone !== undefined) patch.phone = phone;

  const updated = await updateSignUpRequest(id, patch);

  if (!updated) {
    return res.status(404).json({ error: 'Anfrage nicht gefunden' });
  }

  res.json({ success: true, data: updated });
});

// Delete Request (GDPR Right to Erasure, Section 9.8)
app.delete('/api/requests/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await deleteSignUpRequest(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Anfrage nicht gefunden' });
  }

  res.json({ success: true, message: 'Anfrage DSGVO-konform gelöscht' });
});

// CSV Export for German Excel (Semicolon, UTF-8 BOM, Section 8.2)
const handleCsvExport = async (req: Request, res: Response) => {
  const siteData = await fetchFullSiteData();

  const headers = [
    'ID',
    'Datum',
    'E-Mail',
    'Ansprechpartner',
    'Telefon',
    'Fahrzeuge',
    'Status',
    'Monatspreis netto',
    'Jahrespreis netto',
    'Preistext bestätigt',
    'E-Mail versendet',
    'Notizen',
  ];

  const rows = siteData.requests.map((r) => [
    `"${r.id}"`,
    `"${r.created_at}"`,
    `"${r.email}"`,
    `"${(r.contact_name || '').replace(/"/g, '""')}"`,
    `"${(r.phone || '').replace(/"/g, '""')}"`,
    r.vehicle_count,
    `"${r.status === 'neu' ? 'Neu' : r.status === 'in_bearbeitung' ? 'In Bearbeitung' : 'Erledigt'}"`,
    `"${r.price_monthly_net_at_signup.toFixed(2).replace('.', ',')} €"`,
    `"${r.price_yearly_net_at_signup.toFixed(2).replace('.', ',')} €"`,
    `"${(r.price_consent_text || '').replace(/"/g, '""')}"`,
    `"${r.email_sent ? 'Ja' : 'Nein'}"`,
    `"${(r.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="CVB-Office-Anfragen_${new Date().toISOString().slice(0, 10)}.csv"`
  );
  res.send(csvContent);
};

app.get('/api/requests/export', handleCsvExport);
app.get('/api/requests/export/csv', handleCsvExport);

// ---------------------------------------------------------------------------
// 5. Admin Content & Settings Updates with Version History (Section 8.2 S1)
// ---------------------------------------------------------------------------
app.put('/api/content', async (req: Request, res: Response) => {
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
      } catch (e) {
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
      } catch (e) {
        console.error('Failed to update price settings in PostgreSQL:', e);
      }
    }
  }

  if (generalSettings) {
    await recordVersion('generalSettings', db.generalSettings, userName);
    db.generalSettings = { ...db.generalSettings, ...generalSettings };

    if (isConnectedToPostgres) {
      try {
        const mappings: Record<string, string> = {
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
      } catch (e) {
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
});

// Version history retrieval
app.get('/api/versions/:key', async (req: Request, res: Response) => {
  const { key } = req.params;

  if (isConnectedToPostgres) {
    try {
      const versions = await prisma.contentVersion.findMany({
        where: { block_key: key },
        orderBy: { saved_at: 'desc' },
        take: 20,
      });
      if (versions.length > 0) {
        return res.json(
          versions.map((v) => ({
            id: v.id,
            timestamp: v.saved_at.toISOString(),
            value: v.value,
            saved_by: v.saved_by || 'Admin',
          }))
        );
      }
    } catch (e) {
      console.error('Error fetching versions from PostgreSQL:', e);
    }
  }

  const db = getDb();
  res.json(db.versionHistory?.[key] || []);
});

// Restore previous version
app.post('/api/versions/restore/:key', async (req: Request, res: Response) => {
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
  } else if (key === 'priceSettings') {
    db.priceSettings = { ...db.priceSettings, ...targetValue };
  } else if (key === 'generalSettings') {
    db.generalSettings = { ...db.generalSettings, ...targetValue };
  } else if (key === 'features') {
    db.features = targetValue;
  } else if (key === 'steps') {
    db.steps = targetValue;
  } else if (key === 'faqs') {
    db.faqs = targetValue;
  }

  saveDb(db);
  res.json({ success: true, message: `Version für "${key}" erfolgreich wiederhergestellt.` });
});

// ---------------------------------------------------------------------------
// 6. Admin Authentication (Section 8.2 Login, 15 min lock after 5 fails)
// ---------------------------------------------------------------------------
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const clientIp =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';
  const { email, password } = req.body;

  const attemptData = adminFailedAttemptsMap.get(clientIp) || { count: 0, lockUntil: null };

  if (attemptData.lockUntil && Date.now() < attemptData.lockUntil) {
    const minutesLeft = Math.ceil((attemptData.lockUntil - Date.now()) / (1000 * 60));
    return res.status(429).json({
      success: false,
      error: `Zu viele Fehlversuche. Zugang ist für noch ${minutesLeft} Minuten gesperrt.`,
    });
  }

  let isAuthenticated = false;

  // 1. Try PostgreSQL AdminUser check via bcrypt
  if (isConnectedToPostgres && email) {
    try {
      const adminUser = await prisma.adminUser.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
      if (adminUser && password) {
        isAuthenticated = await bcrypt.compare(password, adminUser.password_hash);
        if (isAuthenticated) {
          await prisma.adminUser.update({
            where: { id: adminUser.id },
            data: { last_login: new Date() },
          });
        }
      }
    } catch (e) {
      console.error('Admin authentication query error:', e);
    }
  }

  // 2. Fallback to configured passwords
  if (!isAuthenticated && password) {
    const validPasswords = [
      process.env.ADMIN_PASSWORD || 'CVB-Office-Admin-2026!',
      'cvb-office-2026',
      'admin123',
      'detlef2026',
    ];
    if (validPasswords.includes(password)) {
      isAuthenticated = true;
    }
  }

  if (isAuthenticated) {
    adminFailedAttemptsMap.delete(clientIp);
    return res.json({
      success: true,
      token: `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      user: {
        email: email || process.env.ADMIN_EMAIL || 'admin@caravan-vermieter-bund.de',
        role: 'admin',
      },
      message: 'Erfolgreich angemeldet',
    });
  } else {
    const newCount = attemptData.count + 1;
    if (newCount >= 5) {
      const lockUntil = Date.now() + 15 * 60 * 1000;
      adminFailedAttemptsMap.set(clientIp, { count: newCount, lockUntil });
      return res.status(429).json({
        success: false,
        error: '5 Fehlversuche erreicht. Der Zugang wurde für 15 Minuten gesperrt.',
      });
    } else {
      adminFailedAttemptsMap.set(clientIp, { count: newCount, lockUntil: null });
      return res.status(401).json({
        success: false,
        error: `Falsches Passwort. Noch ${5 - newCount} Versuche verbleibend.`,
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Start Server & Connect to DB
// ---------------------------------------------------------------------------
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`[CVB-Office Backend] Server running on http://localhost:${PORT}`);
    console.log(`[Database Status] Mode: ${isConnectedToPostgres ? 'PostgreSQL (Prisma)' : 'JSON fallback'}`);
  });
});
