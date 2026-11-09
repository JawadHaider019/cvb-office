import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

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
  notes?: string;
  email_sent: boolean;
  email_error?: string;
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
  versionHistory: Record<string, Array<{ timestamp: string; value: any; saved_by: string }>>;
  auditLog: Array<{ timestamp: string; action: string; details: any }>;
}

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
      status: 'in_bearbeitung',
      notes: 'Detlef: Smarlps-Instanz wird angelegt, Kunde will 5 Kastenwagen verwalten.',
      email_sent: true,
    },
    {
      id: 'req-002',
      created_at: '2026-11-08 09:15',
      email: 'hans.meier.camper@gmail.com',
      vehicle_count: 2,
      price_monthly_net_at_signup: 8.33,
      price_yearly_net_at_signup: 100.0,
      price_consent: true,
      price_consent_text:
        'Ich bestätige, dass CVB-Office 8,33 € netto pro Fahrzeug und Monat kostet (100 € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.',
      price_consent_at: '2026-11-08 09:15',
      privacy_consent: true,
      privacy_consent_at: '2026-11-08 09:15',
      status: 'neu',
      notes: 'Neu eingegangen über Messekontakt.',
      email_sent: true,
    },
    {
      id: 'req-003',
      created_at: '2026-11-07 16:40',
      email: 'info@nordsee-reisemobile.de',
      vehicle_count: 12,
      price_monthly_net_at_signup: 8.33,
      price_yearly_net_at_signup: 100.0,
      price_consent: true,
      price_consent_text:
        'Ich bestätige, dass CVB-Office 8,33 € netto pro Fahrzeug und Monat kostet (100 € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.',
      price_consent_at: '2026-11-07 16:40',
      privacy_consent: true,
      privacy_consent_at: '2026-11-07 16:40',
      status: 'erledigt',
      notes: 'Zugangsdaten erfolgreich übermittelt. Widget bereits auf Website aktiv.',
      email_sent: true,
    },
  ],
  content: {
    heroHeadline: 'CVB-Office: Dein digitales Vermiet-Office',
    heroText: 'Anfrage, Buchung, Vertrag und Übergabe an einem Ort. Entwickelt für Wohnmobil- und Caravan-Vermieter im Caravan-Vermieter-Bund.',
    trustLine: 'Ein Angebot des Caravan-Vermieter-Bund',
    problemHeadline: 'Vermietung kostet Zeit. CVB-Office gibt sie Dir zurück.',
    problems: [
      'Lange Einweisungen vor Ort bei jeder Übergabe',
      'Anfragen, Buchungen und Verträge verteilt auf E-Mail, Excel und Zettel',
      'Unklare Preise, Saisonaufschläge und Verfügbarkeiten',
      'Brüche zwischen Anfrage, Vertrag, Zahlung und Übergabe',
    ],
    solutions: [
      'Digitale Vorab-Einweisung per Video und QR-Code',
      'Eine Lösung von der Anfrage bis zur Übergabe',
      'Klare Preislogik mit Saison, Rabatten und Zubehör',
      'Klare Abläufe, weniger Rückfragen, ein professioneller Auftritt',
    ],
    blockATitle: 'Digitale Vorab-Einweisung',
    blockAText: 'Deine Mieter lernen ihr Fahrzeug schon vor der Übergabe kennen, per Video auf dem Smartphone und per QR-Code im Fahrzeug. Bis zu 50 % Zeitersparnis bei der Übergabe vor Ort.',
    blockBTitle: 'Dein Vermiet-Office',
    blockBText: 'Anfragen, Buchungen, Verträge, Zahlungen und Übergaben an einem Ort, immer aktuell und übersichtlich. Inklusive Live-Verfügbarkeit, Saisonpreisen und digitaler Vertragserstellung als PDF.',
    aboutText: 'Der Caravan-Vermieter-Bund unterstützt Wohnmobil-Vermieter mit Wissen, Versicherungen und einem starken Netzwerk. Heute betreuen wir mehr als 1.000 Fahrzeuge in ganz Deutschland.',
    aboutFounder: 'Detlef Scheer (Gründer & Geschäftsführer)',
    aboutFact: 'Über 1.000 betreute Fahrzeuge in Deutschland',
    aboutLinkText: 'Mehr über den CVB erfahren',
    aboutLinkUrl: 'https://caravan-vermieter-bund.de',
    contactEmail: 'info@caravan-vermieter-bund.de',
    partnerNote: 'Technologiepartner: Smarlps',
    trialPromiseLine: '14 Tage kostenlos testen, keine automatische Verlängerung',
    formHeading: 'CVB-Office buchen',
    formIntro: 'Trag Deine E-Mail-Adresse und die Anzahl Deiner Fahrzeuge ein. Wir melden uns bei Dir und richten Deinen Zugang ein.',
    successMessage: 'Vielen Dank! Deine Anfrage ist bei uns eingegangen. Wir melden uns in Kürze bei Dir und richten Deinen Zugang ein.',
  },
  priceSettings: {
    monthlyNet: 8.33,
    yearlyNet: 100.0,
    noteText: 'Der Betrag wird zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet.',
    currency: '€',
  },
  generalSettings: {
    alertEmail: 'info@caravan-vermieter-bund.de',
    senderName: 'CVB-Office',
    trialLink: 'https://ausprobieren.smarlps.de',
    cvbWebsiteLink: 'https://caravan-vermieter-bund.de',
    contactEmail: 'info@caravan-vermieter-bund.de',
    pageTitle: 'CVB-Office: Dein digitales Vermiet-Office',
    pageDescription: 'Anfrage, Buchung, Vertrag und Übergabe an einem Ort. Entwickelt für Wohnmobil- und Caravan-Vermieter im Caravan-Vermieter-Bund.',
  },
  features: [
    { id: 'f1', title: 'Buchungen und Auslastung im Blick', text: 'Alle Termine, Belegungen und Fahrzeugzustände in einem intuitiven Kalender übersichtlich gebündelt.', icon: 'Calendar', sort_order: 1, visible: true },
    { id: 'f2', title: 'Buchungswidget für Deine Website', text: 'Deine Kunden fragen direkt auf Deiner eigenen Website an oder buchen dort verbindlich zum Live-Preis.', icon: 'Globe', sort_order: 2, visible: true },
    { id: 'f3', title: 'Klare Preislogik', text: 'Saisonale Preise, Mindestmietdauern, Frühbucherrabatte und Sonderangebote minutengenau hinterlegt.', icon: 'Tag', sort_order: 3, visible: true },
    { id: 'f4', title: 'Verfügbarkeit und Mindestdauer', text: 'Automatische Sperren verhindern Doppelbuchungen und regeln Leerstandszeiten zwischen Vermietungen.', icon: 'CheckCircle2', sort_order: 4, visible: true },
    { id: 'f5', title: 'Digitaler Vertragsabschluss', text: 'Rechtssichere Mietverträge werden direkt digital unterschrieben – papierlos und zeitsparend.', icon: 'FileSignature', sort_order: 5, visible: true },
    { id: 'f6', title: 'Bestätigungen und Protokolle als PDF', text: 'Automatischer Versand von Buchungsbestätigungen, Rechnungen und Übergabeprotokollen an Deine Mieter.', icon: 'FileText', sort_order: 6, visible: true },
    { id: 'f7', title: 'Kunden- und Mieterverwaltung', text: 'Vollständige Mieterhistorie, Führerscheinkopien, Kontaktdaten und Dokumente an einem zentralen Ort.', icon: 'Users', sort_order: 7, visible: true },
    { id: 'f8', title: 'Fahrzeuge und Zubehör', text: 'Pflege Deine Flotte, Zusatzausstattung wie Campingstühle, Fahrräder oder Navis unkompliziert mit.', icon: 'Truck', sort_order: 8, visible: true },
  ],
  steps: [
    { id: 's1', number: 1, title: 'Anfrage erhalten', text: 'Mietanfragen gehen über Dein Website-Widget oder manuell direkt in Dein zentrales Postfach ein.', icon: 'Inbox', visible: true },
    { id: 's2', number: 2, title: 'Buchung verwalten', text: 'Verfügbarkeit prüfen, Konditionen anpassen und das Angebot mit einem Klick an den Mieter senden.', icon: 'CalendarCheck', visible: true },
    { id: 's3', number: 3, title: 'Vertrag abschließen', text: 'Der Mieter unterschreibt digital. Kaution, Zahlungsfristen und Dokumente sind hinterlegt.', icon: 'FileCheck', visible: true },
    { id: 's4', number: 4, title: 'Übergabe dokumentieren', text: 'Zustand, Kilometerstand, Fotos und Vorschäden per Tablet/Smartphone erfassen und gemeinsam signieren.', icon: 'ClipboardCheck', visible: true },
  ],
  faqs: [
    { id: 'faq1', question: 'Für welche Art von Vermietung ist CVB-Office geeignet?', answer: 'Für Wohnmobile, Camper, Wohnwagen und Anhänger. Überall, wo Anfragen, Buchungen, Verträge und Übergaben anfallen.', sort_order: 1, visible: true },
    { id: 'faq2', question: 'Wie schnell kann ich starten?', answer: 'Nach der Einrichtung Deines Zugangs kannst Du direkt loslegen. Du brauchst keine eigene IT und keine lange Schulung.', sort_order: 2, visible: true },
    { id: 'faq3', question: 'Was kostet CVB-Office?', answer: '8,33 € netto pro Fahrzeug und Monat, also 100 € netto pro Fahrzeug und Jahr. Transparente Kosten ohne versteckte Gebühren.', sort_order: 3, visible: true },
    { id: 'faq4', question: 'Wie wird CVB-Office bezahlt?', answer: 'Der Betrag wird unkompliziert zusätzlich zu Deiner jährlichen CVB-Mitgliedsgebühr abgerechnet.', sort_order: 4, visible: true },
    { id: 'faq5', question: 'Kann ich CVB-Office erst testen?', answer: 'Ja, Du kannst CVB-Office über unseren Technologiepartner Smarlps 14 Tage unverbindlich testen. Es gibt keine automatische Verlängerung.', sort_order: 5, visible: true },
    { id: 'faq6', question: 'Kann ich CVB-Office in meine Website einbinden?', answer: 'Ja. Mit dem integrierten Buchungswidget bindest Du Verfügbarkeitskalender, Preise und Direktanfragen nahtlos in Deine eigene Website ein.', sort_order: 6, visible: true },
    { id: 'faq7', question: 'Geht das auch mit mehreren Standorten?', answer: 'Ja. CVB-Office unterstützt mehrere Standorte und Verbünde mit klarer Zuweisung von Fahrzeugen und Berechtigungen.', sort_order: 7, visible: true },
    { id: 'faq8', question: 'Was passiert mit meinen bestehenden Buchungen?', answer: 'Bestehende Buchungen und Kundendaten lassen sich übersichtlich einpflegen und abbilden, damit Du alle Vermietungen an einem Ort hast.', sort_order: 8, visible: true },
  ],
  versionHistory: {},
  auditLog: [],
};

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load or initialize DB
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

export function recordVersion(key: string, value: any, user = 'Detlef Scheer'): void {
  const db = getDb();
  if (!db.versionHistory) db.versionHistory = {};
  if (!db.versionHistory[key]) db.versionHistory[key] = [];

  db.versionHistory[key].unshift({
    timestamp: new Date().toISOString(),
    value: JSON.parse(JSON.stringify(value)),
    saved_by: user,
  });

  // Keep last 20 versions
  if (db.versionHistory[key].length > 20) {
    db.versionHistory[key] = db.versionHistory[key].slice(0, 20);
  }

  saveDb(db);
}
