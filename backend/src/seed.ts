import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function runSeed() {
  console.log('Seeding CVB-Office database...');

  // 1. Admin User
  const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@caravan-vermieter-bund.de';
  const defaultAdminPass = process.env.ADMIN_PASSWORD || 'CVB-Office-Admin-2026!';
  const passwordHash = await bcrypt.hash(defaultAdminPass, 10);

  await prisma.adminUser.upsert({
    where: { email: defaultAdminEmail },
    update: { password_hash: passwordHash },
    create: {
      email: defaultAdminEmail,
      password_hash: passwordHash,
    },
  });
  console.log(`✓ Admin user configured: ${defaultAdminEmail}`);

  // 2. Settings
  const settingsList = [
    { key: 'monthly_net_per_vehicle', value: '8.33' },
    { key: 'yearly_net_per_vehicle', value: '100.00' },
    { key: 'currency', value: '€' },
    { key: 'alert_email', value: process.env.ALERT_EMAIL || 'info@caravan-vermieter-bund.de' },
    { key: 'contact_email', value: 'info@caravan-vermieter-bund.de' },
    { key: 'sender_name', value: 'CVB-Office Vermieter-Office' },
    { key: 'trial_link', value: 'https://caravan-vermieter-bund.de/testzugang' },
    { key: 'cvb_website_link', value: 'https://caravan-vermieter-bund.de' },
    { key: 'page_title', value: 'CVB-Office – Das offizielle Vermieter-Office für Wohnmobil- & Caravan-Vermieter' },
    { key: 'page_description', value: 'Digitale Vorab-Einweisung und zentrales Vermiet-Cockpit für unabhängige Vermieter.' },
    { key: 'price_note_text', value: '8,33 € netto pro Monat und Fahrzeug bei jährlicher Abrechnung (100 € netto/Jahr). Zzgl. MwSt. Exklusiv für CVB-Mitglieder.' },
  ];

  for (const s of settingsList) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log('✓ System & Pricing settings seeded');

  // 3. Content Blocks
  const contentBlocks = [
    {
      key: 'heroHeadline',
      type: 'text',
      value: 'Weniger Einweisungs-Stress. Mehr Zeit fürs Vermietgeschäft.',
    },
    {
      key: 'heroText',
      type: 'text',
      value: 'Digitale Vorab-Einweisung für Deine Mieter und ein übersichtliches Cockpit für Deine Vermietung. Entwickelt von Vermietern für Vermieter im Caravan-Vermieter-Bund (CVB).',
    },
    {
      key: 'trustLine',
      type: 'text',
      value: 'Entwickelt von Vermietern für Vermieter · Exklusiv im CVB · 100 % DSGVO-konform',
    },
    {
      key: 'problemHeadline',
      type: 'text',
      value: 'Kennst Du das? Samstags Übergabe, das Telefon steht nicht still.',
    },
    {
      key: 'problems',
      type: 'json',
      value: JSON.stringify([
        'Mieter rufen am ersten Urlaubstag an: „Wie geht die Heizung an?“',
        'Jede Übergabe dauert 45 Minuten, weil alles von Grund auf erklärt werden muss.',
        'Mietverträge, Kautionen und Schäden liegen auf drei verschiedenen Zetteln.',
        'Im Schadensfall fehlt der Nachweis, wer was wann unterschrieben hat.',
      ]),
    },
    {
      key: 'solutions',
      type: 'json',
      value: JSON.stringify([
        'Deine Mieter schauen sich die Video-Einweisung vor der Abholung an – ganz in Ruhe zu Hause.',
        'Übergabe am Hof in 15 Minuten: Nur noch offene Fragen klären, Zustand prüfen, unterschreiben.',
        'Digitales Cockpit: Alle Buchungen, Verträge, Kautionsstatus und Mieterdaten an einem Ort.',
        'Rechtssichere BGB-Musterverträge und digitale Übergabeprotokolle auf Smartphone oder Tablet.',
      ]),
    },
    {
      key: 'blockATitle',
      type: 'text',
      value: 'Die digitale Fahrzeug-Einweisung',
    },
    {
      key: 'blockAText',
      type: 'text',
      value: 'Deine Mieter erhalten vorab einen persönlichen Link oder scannen den QR-Code im Fahrzeug. Kurze, verständliche Videos erklären Heizung, Wasser, Markise, Toilette und Gas. Weniger Rückfragen am Wochenende, entspannte Mieter und nachweisbare Einweisung.',
    },
    {
      key: 'blockBTitle',
      type: 'text',
      value: 'Das Vermiet-Cockpit',
    },
    {
      key: 'blockBText',
      type: 'text',
      value: 'Alle Buchungen, Mietverträge, Kautionsstatus und Schäden an einem Ort. Keine Zettelwirtschaft, kein langes Suchen mehr. Schnelle Übersicht, rechtssichere digitale Unterschrift auf dem Tablet und lückenlose Dokumentation bei jeder Übergabe und Rücknahme.',
    },
    {
      key: 'aboutText',
      type: 'text',
      value: 'Der Caravan-Vermieter-Bund (CVB) stärkt unabhängige Vermieter mit Praxiswissen, Spezialversicherungen und einem starken Netzwerk von über 1.000 betreuten Fahrzeugen in ganz Deutschland.',
    },
    {
      key: 'aboutFounder',
      type: 'text',
      value: 'DS-Caravaning GmbH, Detlef Scheer · Niederkrüchten',
    },
    {
      key: 'trialPromiseLine',
      type: 'text',
      value: '14 Tage unverbindlich testen · Keine Kreditkarte erforderlich · Jederzeit kündbar',
    },
    {
      key: 'formHeading',
      type: 'text',
      value: 'Jetzt CVB-Office für Deine Vermietung anfragen',
    },
    {
      key: 'formIntro',
      type: 'text',
      value: 'Trage Deine E-Mail-Adresse und die Anzahl Deiner Mietfahrzeuge ein. Wir richten Deinen Zugang ein und melden uns schnellstmöglich bei Dir.',
    },
    {
      key: 'successMessage',
      type: 'text',
      value: 'Vielen Dank für Deine Anfrage! Wir haben Deine Daten erhalten und melden uns in Kürze mit allen Details und Deinem Testzugang bei Dir.',
    },
  ];

  for (const b of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key: b.key },
      update: { type: b.type, value: b.value },
      create: { key: b.key, type: b.type, value: b.value },
    });
  }
  console.log('✓ Content blocks seeded');

  // 4. Feature Cards
  const featureList = [
    {
      id: 'feat-1',
      title: 'QR-Code im Fahrzeug',
      text: 'Mieter scannen den QR-Code und sehen sofort alle Einweisungsvideos und Bedienungsanleitungen genau für ihr Fahrzeug.',
      icon: 'QrCode',
      sort_order: 1,
      visible: true,
    },
    {
      id: 'feat-2',
      title: 'Digitale Übergabeprotokolle',
      text: 'Vorschäden und Neuschäden mit Fotos dokumentieren, Zählerstände erfassen und direkt auf dem Tablet unterschreiben lassen.',
      icon: 'FileCheck',
      sort_order: 2,
      visible: true,
    },
    {
      id: 'feat-3',
      title: 'Rechtssichere CVB-Mietverträge',
      text: 'Stets aktuelle, juristisch geprüfte BGB-Musterverträge, AGBs und Datenschutztexte für deutsche Vermieter.',
      icon: 'Shield',
      sort_order: 3,
      visible: true,
    },
    {
      id: 'feat-4',
      title: 'Kautions- & Zahlungsverwaltung',
      text: 'Status aller Kautionen, Überweisungen und Restzahlungen auf einen Blick. Automatische Erinnerungen für anstehende Fälligkeiten.',
      icon: 'CreditCard',
      sort_order: 4,
      visible: true,
    },
    {
      id: 'feat-5',
      title: 'Kalender & Buchungsübersicht',
      text: 'Volle Kontrolle über Deine Flotte: Übergaben, Rücknahmen, Werkstatttermine und freie Zeiträume in einer klaren Monatsansicht.',
      icon: 'Calendar',
      sort_order: 5,
      visible: true,
    },
    {
      id: 'feat-6',
      title: '100 % DSGVO-konform auf deutschen Servern',
      text: 'Alle Mieterdaten und Dokumente werden verschlüsselt auf ISO-zertifizierten deutschen Servern gespeichert.',
      icon: 'Lock',
      sort_order: 6,
      visible: true,
    },
  ];

  for (const f of featureList) {
    await prisma.featureCard.upsert({
      where: { id: f.id },
      update: f,
      create: f,
    });
  }
  console.log('✓ Feature cards seeded');

  // 5. Steps (How it works)
  const stepList = [
    {
      id: 'step-1',
      number: 1,
      title: 'Fahrzeuge anlegen',
      text: 'Trage Deine Camper mit Ausstattung, Fotos und Kennzeichen in wenigen Minuten in Dein Cockpit ein.',
      icon: 'Caravan',
      visible: true,
    },
    {
      id: 'step-2',
      number: 2,
      title: 'QR-Code anbringen',
      text: 'Drucke den fahrzeugspezifischen QR-Code aus oder klebe ihn ins Handschuhfach / an die Aufbautür.',
      icon: 'QrCode',
      visible: true,
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Übergaben beschleunigen',
      text: 'Deine Mieter sind bestens vorbereitet, Übergaben dauern nur noch 15 Minuten und laufen rechtssicher ab.',
      icon: 'Clock',
      visible: true,
    },
  ];

  for (const s of stepList) {
    await prisma.stepItem.upsert({
      where: { id: s.id },
      update: s,
      create: s,
    });
  }
  console.log('✓ Steps seeded');

  // 6. Benefits (Testimonial items)
  const benefitList = [
    {
      id: 'ben-1',
      title: 'Familienbetrieb (6 Fahrzeuge)',
      text: '„Die Video-Einweisung vorab spart uns Samstags pro Übergabe mindestens 30 Minuten. Die Mieter wissen bereits, wie Toilette und Gas funktionieren.“',
      icon: 'Clock',
      sort_order: 1,
      visible: true,
    },
    {
      id: 'ben-2',
      title: 'Einzelvermieter (1 Kastenwagen)',
      text: '„Früher hatte ich ständig Angst, etwas im Mietvertrag falsch zu machen. Jetzt habe ich die CVB-Musterverträge und fühle mich rundum abgesichert.“',
      icon: 'Shield',
      sort_order: 2,
      visible: true,
    },
    {
      id: 'ben-3',
      title: 'Camper-Station (3 Vans)',
      text: '„Die CVB Mietverträge und die digitale Unterschrift auf dem Tablet oder Smartphone geben uns und unseren Mietern absolute Sicherheit.“',
      icon: 'CheckCircle',
      sort_order: 3,
      visible: true,
    },
  ];

  for (const b of benefitList) {
    await prisma.benefitItem.upsert({
      where: { id: b.id },
      update: b,
      create: b,
    });
  }
  console.log('✓ Benefits seeded');

  // 7. Audience Items
  const audienceList = [
    {
      id: 'aud-1',
      title: 'Wohnmobil- und Camper-Vermieter',
      text: 'Kleine und mittelgroße Betreiber sowie ambitionierte private Vermieter mit 1 bis 50+ Fahrzeugen.',
      icon: 'Caravan',
      sort_order: 1,
      visible: true,
    },
    {
      id: 'aud-2',
      title: 'Vermieter von Fahrzeugen & Objekten',
      text: 'Auch ideal geeignet für Wohnwagen, Anhänger, Camping-Equipment, Dachzelte und Zubehör.',
      icon: 'Compass',
      sort_order: 2,
      visible: true,
    },
    {
      id: 'aud-3',
      title: 'Betriebe mit digitalen Buchungsprozessen',
      text: 'Vermieter, die ihren Kunden moderne Online-Buchung und direkte Verfügbarkeitsabfrage bieten wollen.',
      icon: 'Laptop',
      sort_order: 3,
      visible: true,
    },
    {
      id: 'aud-4',
      title: 'Mehrere Standorte und Flotten',
      text: 'Unternehmen mit mehreren Übergabestationen oder Partnerflotten mit klarer Rechtestruktur.',
      icon: 'MapPin',
      sort_order: 4,
      visible: true,
    },
  ];

  for (const a of audienceList) {
    await prisma.audienceItem.upsert({
      where: { id: a.id },
      update: a,
      create: a,
    });
  }
  console.log('✓ Audience items seeded');

  // 8. FAQ Items
  const faqList = [
    {
      id: 'faq-1',
      question: 'Was kostet CVB-Office?',
      answer: 'CVB-Office kostet 8,33 € netto pro Monat und Fahrzeug bei jährlicher Abrechnung (100 € netto pro Fahrzeug und Jahr). Voraussetzung ist die Mitgliedschaft im Caravan-Vermieter-Bund (CVB). Keine Einrichtungsgebühr, keine versteckten Kosten.',
      sort_order: 1,
      visible: true,
    },
    {
      id: 'faq-2',
      question: 'Muss ich Mitglied im Caravan-Vermieter-Bund (CVB) sein?',
      answer: 'Ja, CVB-Office ist ein exklusives Angebot für Mitglieder des Caravan-Vermieter-Bundes. Falls Du noch kein Mitglied bist, kannst Du die Mitgliedschaft zusammen mit der Anfrage für CVB-Office beantragen.',
      sort_order: 2,
      visible: true,
    },
    {
      id: 'faq-3',
      question: 'Wie funktioniert der 14-tägige Testzugang?',
      answer: 'Nach Deiner Anfrage richten wir Deinen persönlichen Testzugang ein. Du kannst CVB-Office 14 Tage lang mit all seinen Funktionen kostenlos und unverbindlich testen. Keine automatische Verlängerung, keine Kreditkarte erforderlich.',
      sort_order: 3,
      visible: true,
    },
    {
      id: 'faq-4',
      question: 'Brauchen meine Mieter eine App?',
      answer: 'Nein! Mieter müssen keine App installieren. Die Einweisungsvideos und Dokumente öffnen sich einfach im mobilen Web-Browser auf jedem Smartphone – per Klick auf den Link oder Scan des QR-Codes.',
      sort_order: 4,
      visible: true,
    },
    {
      id: 'faq-5',
      question: 'Sind meine Daten und die meiner Mieter DSGVO-konform geschützt?',
      answer: 'Ja, zu 100 %. Die gesamte Software und Datenbank werden ausschließlich in ISO-zertifizierten deutschen Rechenzentren betrieben. Wir bieten Dir einen fertigen Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO direkt im System.',
      sort_order: 5,
      visible: true,
    },
    {
      id: 'faq-6',
      question: 'Kann ich CVB-Office auch mit nur einem Wohnmobil nutzen?',
      answer: 'Absolut. CVB-Office skaliert ab 1 Fahrzeug bis hin zu großen Flotten. Jeder Vermieter profitiert von den rechtssicheren Verträgen und der enormen Zeitersparnis bei der Einweisung.',
      sort_order: 6,
      visible: true,
    },
  ];

  for (const f of faqList) {
    await prisma.faqItem.upsert({
      where: { id: f.id },
      update: f,
      create: f,
    });
  }
  console.log('✓ FAQs seeded');

  // 9. Initial Sign-up Request (as required by Section 6 / Appendix B)
  await prisma.signUpRequest.upsert({
    where: { id: 'req-001' },
    update: {},
    create: {
      id: 'req-001',
      created_at: new Date('2026-11-08T14:22:00Z'),
      email: 'vermietung-alpenblick@t-online.de',
      vehicle_count: 5,
      price_monthly_net_at_signup: 8.33,
      price_yearly_net_at_signup: 100.0,
      price_consent: true,
      price_consent_text: 'Ich bestätige, dass CVB-Office 8,33 € netto pro Fahrzeug und Monat kostet (100 € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.',
      price_consent_at: new Date('2026-11-08T14:22:00Z'),
      privacy_consent: true,
      privacy_consent_at: new Date('2026-11-08T14:22:00Z'),
      status: 'neu',
      notes: 'Hat 5 Camper in Oberbayern. Interessiert an digitaler Unterschrift.',
      email_sent: true,
      email_error: null,
      contact_name: 'Markus Weber',
      phone: '+49 89 12345678',
    },
  });
  console.log('✓ Demo sign-up request seeded');
  console.log('Seed completed successfully!');
}

if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  runSeed()
    .catch((e) => {
      console.error('Seed error:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

