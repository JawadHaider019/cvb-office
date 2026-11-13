import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
export let isConnectedToPostgres = false;
const defaultDatabase = {
    requests: [
        {
            id: 'req-001',
            created_at: '2026-11-08 14:22',
            email: 'vermietung-alpenblick@t-online.de',
            vehicle_count: 5,
            price_monthly_net_at_signup: 8.33,
            price_yearly_net_at_signup: 100.0,
            price_consent: true,
            price_consent_text: 'Ich bestätige, dass CVB-Office 8,33 € netto pro Fahrzeug und Monat kostet (100 € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.',
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
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
export function getDb() {
    try {
        if (fs.existsSync(DB_FILE)) {
            const data = fs.readFileSync(DB_FILE, 'utf-8');
            return JSON.parse(data);
        }
    }
    catch (err) {
        console.error('Failed to read db.json, using default database', err);
    }
    saveDb(defaultDatabase);
    return defaultDatabase;
}
export function saveDb(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    }
    catch (err) {
        console.error('Failed to write db.json', err);
    }
}
export async function initDb() {
    try {
        await prisma.$connect();
        await prisma.$queryRaw `SELECT 1`;
        isConnectedToPostgres = true;
        console.log('✓ Successfully connected to PostgreSQL via Prisma ORM');
        return true;
    }
    catch (err) {
        isConnectedToPostgres = false;
        console.warn('! PostgreSQL connection failed or offline:', err.message);
        console.warn('! Continuing in fallback file-backed mode (backend/data/db.json).');
        return false;
    }
}
