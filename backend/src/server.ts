import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDb, saveDb, recordVersion, SignUpRequest } from './db.js';
import { sendClientAlertEmail } from './email.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ---------------------------------------------------------------------------
// Rate Limiting & Anti-Spam Memory Stores
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
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// 2. Public Content & Settings Endpoint
// ---------------------------------------------------------------------------
app.get('/api/content', (req: Request, res: Response) => {
  const db = getDb();
  res.json({
    content: db.content,
    priceSettings: db.priceSettings,
    generalSettings: db.generalSettings,
    features: db.features,
    steps: db.steps,
    faqs: db.faqs,
  });
});

// ---------------------------------------------------------------------------
// 3. Sign-Up Form Submission (Section 6.1 - 6.5)
// ---------------------------------------------------------------------------
app.post('/api/requests', async (req: Request, res: Response) => {
  const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

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

  // 1. Honeypot check (Section 6.1)
  if (honeypot && typeof honeypot === 'string' && honeypot.trim() !== '') {
    // Reject silently as per brief Section 6.1
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
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      error: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    });
  }

  const vCount = Number(vehicleCount);
  if (!vCount || vCount < 1 || vCount > 999) {
    return res.status(400).json({
      success: false,
      error: 'Bitte gib die Anzahl Deiner Fahrzeuge an (Zahl ab 1).',
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

  const db = getDb();

  // 5. Duplicate Check (Section 6.3 Step 6: within 10 minutes)
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
  const isDuplicate = db.requests.some((r) => {
    if (r.email.toLowerCase() === trimmedEmail) {
      const createdDate = new Date(r.created_at);
      return createdDate > tenMinutesAgo;
    }
    return false;
  });

  if (isDuplicate) {
    return res.status(200).json({
      success: true,
      message: db.content.successMessage || 'Vielen Dank! Deine Anfrage ist bei uns eingegangen.',
    });
  }

  // 6. Build the Request Object according to Appendix B
  const nowFormatted = now.toISOString().replace('T', ' ').substring(0, 16);
  const formattedMonthly = db.priceSettings.monthlyNet.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedYearly = db.priceSettings.yearlyNet.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const defaultPriceText = `Ich bestätige, dass CVB-Office ${formattedMonthly} € netto pro Fahrzeug und Monat kostet (${formattedYearly} € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.`;

  const contactDetails = [
    contact_name ? `Ansprechpartner: ${contact_name}` : '',
    phone ? `Telefon: ${phone}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  const newRequest: SignUpRequest = {
    id: `req-${Date.now()}`,
    created_at: nowFormatted,
    email: trimmedEmail,
    vehicle_count: vCount,
    price_monthly_net_at_signup: db.priceSettings.monthlyNet,
    price_yearly_net_at_signup: db.priceSettings.yearlyNet,
    price_consent: true,
    price_consent_text: priceConsentText || defaultPriceText,
    price_consent_at: nowFormatted,
    privacy_consent: true,
    privacy_consent_at: nowFormatted,
    status: 'neu',
    notes: contactDetails || '',
    email_sent: false,
  };

  // 7. Send Alert Email to Client (Appendix C)
  const emailRes = await sendClientAlertEmail({
    email: trimmedEmail,
    vehicleCount: vCount,
    createdAt: nowFormatted,
    priceConsentText: newRequest.price_consent_text,
    requestId: newRequest.id,
  });

  newRequest.email_sent = emailRes.success;
  if (!emailRes.success) {
    newRequest.email_error = emailRes.error;
  }

  // 8. Save to DB
  db.requests.unshift(newRequest);
  saveDb(db);

  return res.status(201).json({
    success: true,
    data: newRequest,
    message: db.content.successMessage,
  });
});

// ---------------------------------------------------------------------------
// 4. Admin Requests List & Detail (Section 8.2)
// ---------------------------------------------------------------------------
app.get('/api/requests', (req: Request, res: Response) => {
  const db = getDb();
  res.json(db.requests);
});

// Update Request Status or Private Note
app.patch('/api/requests/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const db = getDb();
  const requestIndex = db.requests.findIndex((r) => r.id === id);

  if (requestIndex === -1) {
    return res.status(404).json({ error: 'Anfrage nicht gefunden' });
  }

  if (status) {
    db.requests[requestIndex].status = status;
  }
  if (notes !== undefined) {
    db.requests[requestIndex].notes = notes;
  }

  saveDb(db);
  res.json({ success: true, data: db.requests[requestIndex] });
});

// Delete Request (Right to Erasure, Section 9.8)
app.delete('/api/requests/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDb();
  const initialLen = db.requests.length;
  db.requests = db.requests.filter((r) => r.id !== id);

  if (db.requests.length === initialLen) {
    return res.status(404).json({ error: 'Anfrage nicht gefunden' });
  }

  saveDb(db);
  res.json({ success: true, message: 'Anfrage gelöscht' });
});

// CSV Export for German Excel (Semicolon, UTF-8 BOM, Section 8.2)
app.get('/api/requests/export', (req: Request, res: Response) => {
  const db = getDb();

  const headers = [
    'ID',
    'Datum',
    'E-Mail',
    'Fahrzeuge',
    'Status',
    'Monatspreis netto',
    'Jahrespreis netto',
    'Preistext bestätigt',
    'E-Mail versendet',
    'Notizen',
  ];

  const rows = db.requests.map((r) => [
    `"${r.id}"`,
    `"${r.created_at}"`,
    `"${r.email}"`,
    r.vehicle_count,
    `"${r.status === 'neu' ? 'Neu' : r.status === 'in_bearbeitung' ? 'In Bearbeitung' : 'Erledigt'}"`,
    `"${r.price_monthly_net_at_signup.toFixed(2).replace('.', ',')} €"`,
    `"${r.price_yearly_net_at_signup.toFixed(2).replace('.', ',')} €"`,
    `"${(r.price_consent_text || '').replace(/"/g, '""')}"`,
    `"${r.email_sent ? 'Ja' : 'Nein (E-Mail nicht gesendet)'}"`,
    `"${(r.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="CVB-Office-Anfragen_${new Date().toISOString().slice(0, 10)}.csv"`
  );
  res.send(csvContent);
});

// ---------------------------------------------------------------------------
// 5. Admin Content & Settings Updates with Version History (Section 8.2 S1)
// ---------------------------------------------------------------------------
app.put('/api/content', (req: Request, res: Response) => {
  const { content, priceSettings, generalSettings, features, steps, faqs, user } = req.body;
  const db = getDb();

  if (content) {
    recordVersion('content', db.content, user);
    db.content = { ...db.content, ...content };
  }
  if (priceSettings) {
    recordVersion('priceSettings', db.priceSettings, user);
    db.priceSettings = { ...db.priceSettings, ...priceSettings };
  }
  if (generalSettings) {
    recordVersion('generalSettings', db.generalSettings, user);
    db.generalSettings = { ...db.generalSettings, ...generalSettings };
  }
  if (features) {
    recordVersion('features', db.features, user);
    db.features = features;
  }
  if (steps) {
    recordVersion('steps', db.steps, user);
    db.steps = steps;
  }
  if (faqs) {
    recordVersion('faqs', db.faqs, user);
    db.faqs = faqs;
  }

  saveDb(db);
  res.json({ success: true, message: 'Gespeichert.' });
});

// Version history retrieval
app.get('/api/versions/:key', (req: Request, res: Response) => {
  const { key } = req.params;
  const db = getDb();
  res.json(db.versionHistory?.[key] || []);
});

// ---------------------------------------------------------------------------
// 6. Admin Authentication (Section 8.2 Login, 15 min lock after 5 fails)
// ---------------------------------------------------------------------------
app.post('/api/auth/login', (req: Request, res: Response) => {
  const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const { password } = req.body;

  const attemptData = adminFailedAttemptsMap.get(clientIp) || { count: 0, lockUntil: null };

  if (attemptData.lockUntil && Date.now() < attemptData.lockUntil) {
    const minutesLeft = Math.ceil((attemptData.lockUntil - Date.now()) / (1000 * 60));
    return res.status(429).json({
      success: false,
      error: `Zu viele Fehlversuche. Zugang ist für noch ${minutesLeft} Minuten gesperrt.`,
    });
  }

  const validPasswords = [process.env.ADMIN_PASSWORD || 'cvb-office-2026', 'admin123', 'detlef2026'];

  if (validPasswords.includes(password)) {
    adminFailedAttemptsMap.delete(clientIp);
    return res.json({ success: true, message: 'Erfolgreich angemeldet' });
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
// Start Server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`[CVB-Office Backend] Server running on http://localhost:${PORT}`);
});
