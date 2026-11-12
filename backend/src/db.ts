import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Initialize Prisma Client
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

export let isConnectedToPostgres = false;

// ---------------------------------------------------------------------------
// Type Definitions conforming to Appendix B
// ---------------------------------------------------------------------------

export interface SignUpRequest {
  id: string;
  created_at: string;
  email: string;
  vehicle_count: number;
  price_monthly_net_at_signup: number;
  price_yearly_net_at_signup: number;
  price_consent: boolean;
  price_consent_text: string;
  price_consent_at: string;
  privacy_consent: boolean;
  privacy_consent_at: string;
  status: 'neu' | 'in_bearbeitung' | 'erledigt';
  notes?: string | null;
  email_sent: boolean;
  email_error?: string | null;
  contact_name?: string | null;
  phone?: string | null;
}

export interface SiteContent {
  heroHeadline: string;
  heroText: string;
  trustLine: string;
  heroImage?: string;
  heroImageAlt?: string;
  problemHeadline: string;
  problems: string[];
  solutions: string[];
  blockATitle: string;
  blockAText: string;
  blockAImage?: string;
  blockAImageAlt?: string;
  blockBTitle: string;
  blockBText: string;
  blockBImage?: string;
  blockBImageAlt?: string;
  aboutText: string;
  aboutFounder: string;
  aboutFact: string;
  aboutLinkText: string;
  aboutLinkUrl: string;
  aboutImage?: string;
  aboutImageAlt?: string;
  contactEmail: string;
  partnerNote: string;
  trialPromiseLine: string;
  formHeading: string;
  formIntro: string;
  successMessage: string;
}

export interface PriceSettings {
  monthlyNet: number;
  yearlyNet: number;
  noteText: string;
  currency: string;
}

export interface GeneralSettings {
  alertEmail: string;
  senderName: string;
  trialLink: string;
  cvbWebsiteLink: string;
  contactEmail: string;
  pageTitle: string;
  pageDescription: string;
}

export interface DatabaseSchema {
  requests: SignUpRequest[];
  content: SiteContent;
  priceSettings: PriceSettings;
  generalSettings: GeneralSettings;
  features: Array<{ id: string; title: string; text: string; icon: string; sort_order: number; visible: boolean }>;
  steps: Array<{ id: string; number: number; title: string; text: string; icon: string; visible: boolean }>;
  faqs: Array<{ id: string; question: string; answer: string; sort_order: number; visible: boolean }>;
  benefits?: Array<{ id: string; title: string; text: string; icon: string; sort_order: number; visible: boolean }>;
  audiences?: Array<{ id: string; title: string; text: string; icon: string; sort_order: number; visible: boolean }>;
  versionHistory: Record<string, Array<{ timestamp: string; value: any; saved_by: string }>>;
  auditLog: Array<{ timestamp: string; action: string; details: any }>;
}

// ---------------------------------------------------------------------------
// Fallback In-Memory / File Database
// ---------------------------------------------------------------------------

const defaultDatabase: DatabaseSchema = {
  requests: [
    {
      id: 'req-001',
      created_at: '2026-11-08 14:22',
      email: 'vermietung-alpenblick@t-online.de',
      vehicle_count: 5,
      price_monthly_net_at_signup: 8.33,
      price_yearly_net_at_signup: 100.0,
      price_consent: true,
      price_consent_text:
        'Ich bestätige, dass CVB-Office 8,33 € netto pro Fahrzeug und Monat kostet (100 € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.',
      price_consent_at: '2026-11-08 14:22',
      privacy_consent: true,
      privacy_consent_at: '2026-11-08 14:22',
      status: 'neu',
      notes: 'Hat 5 Camper in Oberbayern. Interessiert an digitaler Unterschrift.',
      email_sent: true,
      contact_name: 'Markus Weber',
      phone: '+49 89 12345678',
    },
  ],
  content: {
    heroHeadline: 'Weniger Einweisungs-Stress. Mehr Zeit fürs Vermietgeschäft.',
    heroText: 'Digitale Vorab-Einweisung für Deine Mieter und ein übersichtliches Cockpit für Deine Vermietung. Entwickelt von Vermietern für Vermieter im Caravan-Vermieter-Bund (CVB).',
    trustLine: 'Entwickelt von Vermietern für Vermieter · Exklusiv im CVB · 100 % DSGVO-konform',
    problemHeadline: 'Kennst Du das? Samstags Übergabe, das Telefon steht nicht still.',
    problems: [
      'Mieter rufen am ersten Urlaubstag an: „Wie geht die Heizung an?“',
      'Jede Übergabe dauert 45 Minuten, weil alles von Grund auf erklärt werden muss.',
      'Mietverträge, Kautionen und Schäden liegen auf drei verschiedenen Zetteln.',
      'Im Schadensfall fehlt der Nachweis, wer was wann unterschrieben hat.',
    ],
    solutions: [
      'Deine Mieter schauen sich die Video-Einweisung vor der Abholung an – ganz in Ruhe zu Hause.',
      'Übergabe am Hof in 15 Minuten: Nur noch offene Fragen klären, Zustand prüfen, unterschreiben.',
      'Digitales Cockpit: Alle Buchungen, Verträge, Kautionsstatus und Mieterdaten an einem Ort.',
      'Rechtssichere BGB-Musterverträge und digitale Übergabeprotokolle auf Smartphone oder Tablet.',
    ],
    blockATitle: 'Die digitale Fahrzeug-Einweisung',
    blockAText: 'Deine Mieter erhalten vorab einen persönlichen Link oder scannen den QR-Code im Fahrzeug. Kurze, verständliche Videos erklären Heizung, Wasser, Markise, Toilette und Gas. Weniger Rückfragen am Wochenende, entspannte Mieter und nachweisbare Einweisung.',
    blockBTitle: 'Das Vermiet-Cockpit',
    blockBText: 'Alle Buchungen, Mietverträge, Kautionsstatus und Schäden an einem Ort. Keine Zettelwirtschaft, kein langes Suchen mehr. Schnelle Übersicht, rechtssichere digitale Unterschrift auf dem Tablet und lückenlose Dokumentation bei jeder Übergabe und Rücknahme.',
    aboutText: 'Der Caravan-Vermieter-Bund (CVB) stärkt unabhängige Vermieter mit Praxiswissen, Spezialversicherungen und einem starken Netzwerk von über 1.000 betreuten Fahrzeugen in ganz Deutschland.',
    aboutFounder: 'DS-Caravaning GmbH, Detlef Scheer · Niederkrüchten',
    aboutFact: 'Über 1.000 betreute Fahrzeuge in Deutschland',
    aboutLinkText: 'Mehr über den CVB erfahren',
    aboutLinkUrl: 'https://caravan-vermieter-bund.de',
    contactEmail: 'info@caravan-vermieter-bund.de',
    partnerNote: 'Technologiepartner: Smarlps',
    trialPromiseLine: '14 Tage unverbindlich testen · Keine Kreditkarte erforderlich · Jederzeit kündbar',
    formHeading: 'Jetzt CVB-Office für Deine Vermietung anfragen',
    formIntro: 'Trage Deine E-Mail-Adresse und die Anzahl Deiner Mietfahrzeuge ein. Wir richten Deinen Zugang ein und melden uns schnellstmöglich bei Dir.',
    successMessage: 'Vielen Dank für Deine Anfrage! Wir haben Deine Daten erhalten und melden uns in Kürze mit allen Details und Deinem Testzugang bei Dir.',
  },
  priceSettings: {
    monthlyNet: 8.33,
    yearlyNet: 100.0,
    noteText: '8,33 € netto pro Monat und Fahrzeug bei jährlicher Abrechnung (100 € netto/Jahr). Zzgl. MwSt. Exklusiv für CVB-Mitglieder.',
    currency: '€',
  },
  generalSettings: {
    alertEmail: 'info@caravan-vermieter-bund.de',
    senderName: 'CVB-Office Vermieter-Office',
    trialLink: 'https://caravan-vermieter-bund.de/testzugang',
    cvbWebsiteLink: 'https://caravan-vermieter-bund.de',
    contactEmail: 'info@caravan-vermieter-bund.de',
    pageTitle: 'CVB-Office – Das offizielle Vermieter-Office für Wohnmobil- & Caravan-Vermieter',
    pageDescription: 'Digitale Vorab-Einweisung und zentrales Vermiet-Cockpit für unabhängige Vermieter.',
  },
  features: [
    { id: 'feat-1', title: 'QR-Code im Fahrzeug', text: 'Mieter scannen den QR-Code und sehen sofort alle Einweisungsvideos und Anleitungen für ihr Fahrzeug.', icon: 'QrCode', sort_order: 1, visible: true },
    { id: 'feat-2', title: 'Digitale Übergabeprotokolle', text: 'Vorschäden und Neuschäden mit Fotos dokumentieren, Zählerstände erfassen und auf dem Tablet signieren.', icon: 'FileCheck', sort_order: 2, visible: true },
    { id: 'feat-3', title: 'Rechtssichere CVB-Mietverträge', text: 'Stets aktuelle, juristisch geprüfte BGB-Musterverträge, AGBs und Datenschutztexte für deutsche Vermieter.', icon: 'Shield', sort_order: 3, visible: true },
    { id: 'feat-4', title: 'Kautions- & Zahlungsverwaltung', text: 'Status aller Kautionen, Überweisungen und Restzahlungen auf einen Blick.', icon: 'CreditCard', sort_order: 4, visible: true },
    { id: 'feat-5', title: 'Kalender & Buchungsübersicht', text: 'Volle Kontrolle über Deine Flotte: Übergaben, Rücknahmen und freie Zeiträume in der Monatsansicht.', icon: 'Calendar', sort_order: 5, visible: true },
    { id: 'feat-6', title: '100 % DSGVO-konform auf deutschen Servern', text: 'Alle Mieterdaten und Dokumente werden verschlüsselt auf ISO-zertifizierten deutschen Servern gespeichert.', icon: 'Lock', sort_order: 6, visible: true },
  ],
  steps: [
    { id: 'step-1', number: 1, title: 'Fahrzeuge anlegen', text: 'Trage Deine Camper mit Ausstattung, Fotos und Kennzeichen in Dein Cockpit ein.', icon: 'Caravan', visible: true },
    { id: 'step-2', number: 2, title: 'QR-Code anbringen', text: 'Drucke den fahrzeugspezifischen QR-Code aus oder klebe ihn ins Handschuhfach / an die Aufbautür.', icon: 'QrCode', visible: true },
    { id: 'step-3', number: 3, title: 'Übergaben beschleunigen', text: 'Deine Mieter sind bestens vorbereitet, Übergaben dauern nur noch 15 Minuten und laufen rechtssicher ab.', icon: 'Clock', visible: true },
  ],
  faqs: [
    { id: 'faq-1', question: 'Was kostet CVB-Office?', answer: 'CVB-Office kostet 8,33 € netto pro Monat und Fahrzeug bei jährlicher Abrechnung (100 € netto pro Fahrzeug und Jahr). Voraussetzung ist die Mitgliedschaft im Caravan-Vermieter-Bund (CVB). Keine Einrichtungsgebühr, keine versteckten Kosten.', sort_order: 1, visible: true },
    { id: 'faq-2', question: 'Muss ich Mitglied im Caravan-Vermieter-Bund (CVB) sein?', answer: 'Ja, CVB-Office ist ein exklusives Angebot für Mitglieder des Caravan-Vermieter-Bundes. Falls Du noch kein Mitglied bist, kannst Du die Mitgliedschaft zusammen mit der Anfrage für CVB-Office beantragen.', sort_order: 2, visible: true },
    { id: 'faq-3', question: 'Wie funktioniert der 14-tägige Testzugang?', answer: 'Nach Deiner Anfrage richten wir Deinen persönlichen Testzugang ein. Du kannst CVB-Office 14 Tage lang mit all seinen Funktionen kostenlos und unverbindlich testen. Keine automatische Verlängerung, keine Kreditkarte erforderlich.', sort_order: 3, visible: true },
    { id: 'faq-4', question: 'Brauchen meine Mieter eine App?', answer: 'Nein! Mieter müssen keine App installieren. Die Einweisungsvideos und Dokumente öffnen sich einfach im mobilen Web-Browser auf jedem Smartphone – per Klick auf den Link oder Scan des QR-Codes.', sort_order: 4, visible: true },
    { id: 'faq-5', question: 'Sind meine Daten und die meiner Mieter DSGVO-konform geschützt?', answer: 'Ja, zu 100 %. Die gesamte Software und Datenbank werden ausschließlich in ISO-zertifizierten deutschen Rechenzentren betrieben. Wir bieten Dir einen fertigen Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO direkt im System.', sort_order: 5, visible: true },
    { id: 'faq-6', question: 'Kann ich CVB-Office auch mit nur einem Wohnmobil nutzen?', answer: 'Absolut. CVB-Office skaliert ab 1 Fahrzeug bis hin zu großen Flotten. Jeder Vermieter profitiert von den rechtssicheren Verträgen und der enormen Zeitersparnis bei der Einweisung.', sort_order: 6, visible: true },
  ],
  versionHistory: {},
  auditLog: [],
};

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read db.json, using default database', err);
  }
  saveDb(defaultDatabase);
  return defaultDatabase;
}

export function saveDb(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write db.json', err);
  }
}

// ---------------------------------------------------------------------------
// Database Connection Initialization
// ---------------------------------------------------------------------------

export async function initDb(): Promise<boolean> {
  try {
    await prisma.$connect();
    // Test a basic query
    await prisma.$queryRaw`SELECT 1`;
    isConnectedToPostgres = true;
    console.log('✓ Successfully connected to PostgreSQL via Prisma ORM');
    return true;
  } catch (err: any) {
    isConnectedToPostgres = false;
    console.warn('! PostgreSQL connection failed or offline:', err.message);
    console.warn('! Continuing in fallback file-backed mode (backend/data/db.json).');
    return false;
  }
}

// ---------------------------------------------------------------------------
// Asynchronous Content & Settings Querying via Prisma (with fallback)
// ---------------------------------------------------------------------------

export async function fetchFullSiteData(): Promise<DatabaseSchema> {
  if (!isConnectedToPostgres) {
    return getDb();
  }

  try {
    const [
      contentBlocks,
      settings,
      features,
      steps,
      faqs,
      benefits,
      audiences,
      requests,
    ] = await Promise.all([
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
          (content as any)[b.key] = JSON.parse(b.value);
        } catch {
          (content as any)[b.key] = b.value;
        }
      } else {
        (content as any)[b.key] = b.value;
      }
    });

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    const priceSettings: PriceSettings = {
      monthlyNet: settingsMap['monthly_net_per_vehicle'] ? parseFloat(settingsMap['monthly_net_per_vehicle']) : 8.33,
      yearlyNet: settingsMap['yearly_net_per_vehicle'] ? parseFloat(settingsMap['yearly_net_per_vehicle']) : 100.0,
      noteText: settingsMap['price_note_text'] || fallback.priceSettings.noteText,
      currency: settingsMap['currency'] || '€',
    };

    const generalSettings: GeneralSettings = {
      alertEmail: settingsMap['alert_email'] || fallback.generalSettings.alertEmail,
      senderName: settingsMap['sender_name'] || fallback.generalSettings.senderName,
      trialLink: settingsMap['trial_link'] || fallback.generalSettings.trialLink,
      cvbWebsiteLink: settingsMap['cvb_website_link'] || fallback.generalSettings.cvbWebsiteLink,
      contactEmail: settingsMap['contact_email'] || fallback.generalSettings.contactEmail,
      pageTitle: settingsMap['page_title'] || fallback.generalSettings.pageTitle,
      pageDescription: settingsMap['page_description'] || fallback.generalSettings.pageDescription,
    };

    const formattedRequests: SignUpRequest[] = requests.map((r) => ({
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
      status: (r.status as 'neu' | 'in_bearbeitung' | 'erledigt') || 'neu',
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
  } catch (e) {
    console.error('Error fetching data from PostgreSQL, using fallback:', e);
    return getDb();
  }
}

// ---------------------------------------------------------------------------
// Sign-Up Requests (Section 6 & Appendix B)
// ---------------------------------------------------------------------------

export async function insertSignUpRequest(data: {
  email: string;
  vehicle_count: number;
  price_monthly_net_at_signup: number;
  price_yearly_net_at_signup: number;
  price_consent: boolean;
  price_consent_text: string;
  privacy_consent: boolean;
  contact_name?: string;
  phone?: string;
}): Promise<SignUpRequest> {
  const now = new Date();
  const id = `req-${Date.now()}`;

  let created: SignUpRequest = {
    id,
    created_at: now.toISOString(),
    email: data.email.toLowerCase().trim(),
    vehicle_count: data.vehicle_count,
    price_monthly_net_at_signup: data.price_monthly_net_at_signup,
    price_yearly_net_at_signup: data.price_yearly_net_at_signup,
    price_consent: data.price_consent,
    price_consent_text: data.price_consent_text,
    price_consent_at: now.toISOString(),
    privacy_consent: data.privacy_consent,
    privacy_consent_at: now.toISOString(),
    status: 'neu',
    notes: null,
    email_sent: false,
    email_error: null,
    contact_name: data.contact_name || null,
    phone: data.phone || null,
  };

  if (isConnectedToPostgres) {
    try {
      const pRecord = await prisma.signUpRequest.create({
        data: {
          email: created.email,
          vehicle_count: created.vehicle_count,
          price_monthly_net_at_signup: created.price_monthly_net_at_signup,
          price_yearly_net_at_signup: created.price_yearly_net_at_signup,
          price_consent: created.price_consent,
          price_consent_text: created.price_consent_text,
          privacy_consent: created.privacy_consent,
          status: 'neu',
          contact_name: created.contact_name,
          phone: created.phone,
        },
      });
      created.id = pRecord.id;
      created.created_at = pRecord.created_at.toISOString();
    } catch (e) {
      console.error('Failed to insert request into PostgreSQL, saving to JSON fallback:', e);
    }
  }

  // Also mirror to file db
  const db = getDb();
  db.requests.unshift(created);
  saveDb(db);

  return created;
}

export async function updateSignUpRequest(
  id: string,
  patch: Partial<SignUpRequest>
): Promise<SignUpRequest | null> {
  if (isConnectedToPostgres) {
    try {
      const updateData: any = {};
      if (patch.status !== undefined) updateData.status = patch.status;
      if (patch.notes !== undefined) updateData.notes = patch.notes;
      if (patch.email_sent !== undefined) updateData.email_sent = patch.email_sent;
      if (patch.email_error !== undefined) updateData.email_error = patch.email_error;
      if (patch.contact_name !== undefined) updateData.contact_name = patch.contact_name;
      if (patch.phone !== undefined) updateData.phone = patch.phone;

      await prisma.signUpRequest.update({
        where: { id },
        data: updateData,
      });
    } catch (e) {
      console.error('Failed to update request in PostgreSQL:', e);
    }
  }

  const db = getDb();
  const idx = db.requests.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  db.requests[idx] = { ...db.requests[idx], ...patch };
  saveDb(db);
  return db.requests[idx];
}

export async function deleteSignUpRequest(id: string): Promise<boolean> {
  if (isConnectedToPostgres) {
    try {
      await prisma.signUpRequest.delete({
        where: { id },
      });
    } catch (e) {
      console.error('Failed to delete request from PostgreSQL:', e);
    }
  }

  const db = getDb();
  const initialLen = db.requests.length;
  db.requests = db.requests.filter((r) => r.id !== id);
  saveDb(db);
  return db.requests.length < initialLen;
}

// ---------------------------------------------------------------------------
// Content Versioning & Audit
// ---------------------------------------------------------------------------

export async function recordVersion(
  key: string,
  value: any,
  user = 'Detlef Scheer'
): Promise<void> {
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
    } catch (e) {
      console.error('Failed to record version in PostgreSQL:', e);
    }
  }

  const db = getDb();
  if (!db.versionHistory) db.versionHistory = {};
  if (!db.versionHistory[key]) db.versionHistory[key] = [];

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
