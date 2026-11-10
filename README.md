# CVB-Office: Landing Page & Management Platform

> Offizielle Landing Page und Lead-Management-Plattform für **CVB-Office** des **Caravan-Vermieter-Bund (CVB)**.  
> Entwickelt nach den Vorgaben der Spezifikation *„CVB-Office Landing Page: Project brief and full scope for the developer“ (Web Mavien v1.0)*.

---

## 📋 Inhaltsverzeichnis

1. [Projektüberblick & Architektur](#projektüberblick--architektur)
2. [Design & Markenrichtlinien (Olive Theme)](#design--markenrichtlinien-olive-theme)
3. [Die 12 Sektionen der Landing Page](#die-12-sektionen-der-landing-page)
4. [Backend, API & E-Mail-System](#backend-api--e-mail-system)
5. [Sicherheit, Spam-Schutz & DSGVO](#sicherheit-spam-schutz--dsgvo)
6. [Installation & Schnellstart](#installation--schnellstart)
7. [Umgebungsvariablen (.env)](#umgebungsvariablen-env)
8. [Admin-Bereich](#admin-bereich)
9. [Build & Deployment](#build--deployment)

---

## 1. Projektüberblick & Architektur

Das Projekt ist als monorepoartige Workspace-Struktur organisiert:

```
cvb-office/
├── package.json               # Root-Workspace & Convenience-Skripte
├── README.md                  # Technische Dokumentation für Entwickler
├── ADMIN_GUIDE.md             # Deutsche Bedienungsanleitung für Detlef Scheer
├── frontend/                  # React 19 + TypeScript + Vite + Tailwind CSS
│   ├── index.html             # DSGVO-konform ohne externe CDN-Fonts, Schema.org JSON-LD
│   ├── public/
│   │   ├── images/            # Lokale optimierte Bilddateien
│   │   ├── favicon.svg        # CVB Marken-Favicon
│   │   ├── robots.txt         # SEO Crawl-Regeln
│   │   └── sitemap.xml        # XML-Sitemap für Suchmaschinen
│   └── src/
│       ├── components/        # Modulare UI-Komponenten (12 Sektionen + Admin)
│       ├── context/           # AppContext (Zustand, Persistenz, Preissynchronisation)
│       ├── data/              # Standardinhalte (defaultContent.ts)
│       └── types/             # Strikte TypeScript-Typdefinitionen
└── backend/                   # Node.js + Express + TypeScript
    ├── data/                  # Datei-basierte Persistenz (db.json)
    └── src/
        ├── db.ts              # Datenbankmodell, Audit-Log, Versionierung
        ├── email.ts           # Appendix C Nodemailer E-Mail-Alarm
        └── server.ts          # REST-API mit Rate-Limiting & Excel-BOM CSV Export
```

---

## 2. Design & Markenrichtlinien (Olive Theme)

Das Design repräsentiert zu 100 % den **Caravan-Vermieter-Bund (CVB)**. Es verwendet die verbindliche Farbpalette aus Abschnitt 3 des Briefings:

| Name | Hex-Code | Verwendung |
|---|---|---|
| **Dark Olive** | `#384808` | Primärfarbe, H1-Überschriften, Haupt-Buttons, Header |
| **Olive** | `#889028` | Akzente, Icons, aktive Stati, Badges |
| **Gold** | `#A09048` | Premium-Akzente, Trennlinien, Zitate, Verzierungen |
| **Warm Cream** | `#F4F2E6` | Weiche Sektionshintergründe (Bausteine, Bento-Karten) |
| **Dark Olive Outline** | `#585828` | Sekundärer Fließtext, Rahmen, dezente Umrandungen |
| **White** | `#FFFFFF` | Reiner Hintergrund, Kartenfüllung |

- **Typografie**: Moderner lokaler System-Font-Stack (system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial) – **kein Google Fonts CDN**, um Abmahnrisiken nach deutschen DSGVO-Urteilen vollständig auszuschließen.
- **Tonalität**: Freundliches, professionelles „Du“ (Branchenstandard unter Caravan- und Wohnmobil-Vermietern).

---

## 3. Die 12 Sektionen der Landing Page

1. **Teil 0: Header**: CVB-Logo, Verbands-Badge, leicht verständliche Ankernavigation und direkte CTA-Buttons.
2. **Teil 1: Hero**: Große League-Spartan-Typografie, Untertitel, Vertrauenszeile (*„Ein Angebot des Caravan-Vermieter-Bund“*), Parallax-Effekt und Schnellrechner.
3. **Teil 2: Problem & Lösung**: 4 reale Herausforderungen von Vermietern gegenübergestellt mit den 4 konkreten Lösungen von CVB-Office.
4. **Teil 3: Funktionen (Features)**: Bento-Grid mit 8 Kernfunktionen (Buchungskalender, Website-Widget, Preislogik, Mindestdauer, Verträge, PDF-Protokolle, Mieterverwaltung, Flottenpflege).
5. **Teil 4: Die 2 Bausteine**:
   - *Baustein A: Digitale Vorab-Einweisung* per Video & QR-Code im Fahrzeug (bis zu 50 % Zeitersparnis bei der Übergabe vor Ort).
   - *Baustein B: Dein Vermiet-Office* (zentrale Verwaltung von Buchungen, Verträgen und Übergaben).
6. **Teil 5: Wie es funktioniert**: 4 einfache Schritte (Anfrage erhalten → Buchung verwalten → Vertrag abschließen → Übergabe dokumentieren).
7. **Teil 6: Zielgruppen & Vorteile**: Wohnmobil- und Caravan-Vermieter, Flottengrößen von 1 bis 50+ Fahrzeugen.
8. **Teil 7: Preis & Testphase**: Transparente Konditionen (100 € netto/Jahr = 8,33 € netto/Monat pro Fahrzeug) und Hinweis auf 14 Tage unverbindliche Testphase.
9. **Teil 8: Buchungsformular**: Sicheres Sign-Up mit dynamischer Preisbestätigung, Fahrzeuganzahl, E-Mail-Adresse und Datenschutzkontrollkästchen.
10. **Teil 9: FAQ**: Interaktives Akkordeon mit den 8 wichtigsten Fragen und Antworten.
11. **Teil 10: Über den CVB**: Vorstellung des Verbands durch Gründer Detlef Scheer, Betreuung von über 1.000 Fahrzeugen in ganz Deutschland.
12. **Teil 11: Footer**: Impressum- und Datenschutz-Modals, Technologiepartner-Hinweis (*„Technologiepartner: Smarlps“*), Copyright und Admin-Zugang.

---

## 4. Backend, API & E-Mail-System

Das Backend basiert auf **Node.js + Express + TypeScript**:

### Endpunkte

- `GET /api/health` – Statusprüfung des Backend-Dienstes.
- `GET /api/content` – Liefert alle Webseitentexte, Preise, Feature-Karten und Einstellungen.
- `PUT /api/content` – Aktualisiert Webseitentexte, speichert Revisionshistorie und Audit-Log.
- `POST /api/requests` – Nimmt Buchungsanfragen entgegen (mit Spam-, Zeit- und Duplikatsprüfung).
- `GET /api/requests` – Liste aller eingegangenen Anfragen (Admin).
- `PATCH /api/requests/:id` – Status (`neu`, `in_bearbeitung`, `erledigt`) und Notizen ändern.
- `DELETE /api/requests/:id` – Anfrage löschen (DSGVO-Recht auf Löschung).
- `GET /api/requests/export` – Export als semikolongetrennte CSV mit UTF-8 Byte Order Mark (`\uFEFF`) für deutsche Excel-Versionen.
- `POST /api/auth/login` – Admin-Login mit 15-Minuten-Sperre nach 5 Fehlversuchen.
- `GET /api/versions/:key` – Revisionsverlauf für Inhalte und Preise.

### E-Mail-Benachrichtigung (Appendix C)

Jede neue Anfrage löst sofort eine formatierte E-Mail an die in den Einstellungen hinterlegte Adresse (Detlef Scheer) aus:
- **Betreff**: `Neue Buchungsanfrage: CVB-Office von [E-Mail]`
- **Inhalt**: Exakte E-Mail, Anzahl der Fahrzeuge, berechneter Netto-Jahrespreis, Bestätigungsnachweis des Preistextes und direkter Link ins Admin-Panel.
- **Fallback**: Fehlen SMTP-Zugangsdaten in `.env`, wird die E-Mail formatiert und fehlerfrei in der Konsole simuliert.

---

## 5. Sicherheit, Spam-Schutz & DSGVO

1. **Honeypot-Feld (`company_nickname`)**: Verstecktes Formularfeld; wird es von Bots ausgefüllt, wird die Anfrage lautlos ignoriert.
2. **Mindestzeitprüfung**: Formulare, die in unter 3 Sekunden abgeschickt werden, werden abgewiesen.
3. **IP Rate-Limiting**: Maximal 5 Buchungsanfragen pro IP-Adresse und Stunde.
4. **Duplikatsprüfung**: Sendet dieselbe E-Mail innerhalb von 10 Minuten erneut ab, wird Erfolg gemeldet, aber kein doppelter Eintrag erzeugt.
5. **Brute-Force-Schutz**: Nach 5 falschen Passworteingaben im Admin-Bereich wird der Zugriff für 15 Minuten gesperrt.
6. **DSGVO / Keine Drittanbieter-Tracker**:
   - Keine externen CDNs (kein Google Fonts, keine Analytics-Skripte).
   - Kein Cookie-Banner erforderlich, da ausschließlich technisch notwendige Session-/Local-Storage-Daten verarbeitet werden.
   - Recht auf Löschung (Art. 17 DSGVO) über den Admin-Papierkorb.

---

## 6. Installation & Schnellstart

### Voraussetzungen

- Node.js Version 18 oder höher (getestet mit v24)
- npm Version 9 oder höher

### Schritt 1: Abhängigkeiten installieren

```bash
# Im Projekt-Hauptverzeichnis:
npm install
npm --prefix frontend install
npm --prefix backend install
```

### Schritt 2: Entwicklungsumgebung starten

```bash
# Startet Frontend (Port 5173 / Vite)
npm run dev

# In einem zweiten Terminal: Backend starten (Port 5000 / Express)
npm run dev:backend
```

Die Anwendung ist nun unter `http://localhost:5173` erreichbar.  
Das Admin-Panel erreichst Du unter `http://localhost:5173/admin` oder über den Schloss-Button im Footer.

---

## 7. Umgebungsvariablen (.env)

Erstelle im Ordner `backend/` eine Datei namens `.env` für den Produktivbetrieb:

```env
PORT=5000
NODE_ENV=production
ADMIN_PASSWORD=cvb-office-2026

# SMTP Zugangsdaten für automatische Alarm-Mails
SMTP_HOST=smtp.dein-mailserver.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=benachrichtigung@caravan-vermieter-bund.de
SMTP_PASS=DeinSicheresPasswort
ALERT_EMAIL=info@caravan-vermieter-bund.de
```

---

## 8. Admin-Bereich

Der Admin-Bereich wurde speziell für **Detlef Scheer** konzipiert und bietet:
- **Große, übersichtliche Schaltflächen** und rein deutsche Beschriftungen.
- **Vollständige Inhaltsbearbeitung** aller 12 Sektionen samt Bild-URLs und Alt-Texten.
- **1-Klick-Wiederherstellung** über den Button *„Version wiederherstellen“*.
- **Preisanpassung mit Live-Synchronisation** zur Preisbox und zum Formulartext.
- **CSV-Export** mit einem Klick für Microsoft Excel.

Detaillierte Anweisungen zur Bedienung findest Du im [ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

---

## 9. Build & Deployment

### Produktions-Build erstellen

```bash
# Frontend-Build erzeugen (generiert dist/ Ordner)
npm run build

# Backend TypeScript kompilieren (generiert dist/ Ordner)
npm --prefix backend run build
```

### Statisches Hosting

Der Ordner `frontend/dist/` kann auf jedem Webserver (Apache, Nginx, Hostinger, All-Inkl, Vercel, Netlify) abgelegt werden. Bei Verwendung von HTML5 PushState-Routing muss eine Umleitungsregel auf `index.html` konfiguriert sein.

#   c v b - o f f i c e  
 