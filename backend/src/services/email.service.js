import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export async function sendClientAlertEmail(payload) {
    const { email, vehicleCount, createdAt, priceConsentText, contactName, phone } = payload;
    const adminLink = process.env.ADMIN_URL || 'https://cvb-office.de/#admin';
    const subject = `[CVB-Office] Neue Anfrage: ${vehicleCount} Fahrzeuge – ${email}`;
    const contactInfo = [
        contactName ? `Ansprechpartner: ${contactName}` : null,
        phone ? `Telefon: ${phone}` : null,
    ]
        .filter(Boolean)
        .join('\n');
    const textBody = `Hallo Detlef,\n\nüber cvb-office.de ist eine neue Anfrage eingegangen.\n\nE-Mail: ${email}\nAnzahl Fahrzeuge: ${vehicleCount}\n${contactInfo ? contactInfo + '\n' : ''}Eingegangen am: ${createdAt}\nPreis bestätigt: Ja (${priceConsentText})\nDatenschutz-Einwilligung: Ja\n\nZur Anfrage im Admin-Bereich: ${adminLink}\n\nViele Grüße\nCVB-Office Vermieter-Office`;
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #384808; border-radius: 12px; background-color: #F4F2E6; color: #384808;">
      <h2 style="color: #384808; border-bottom: 2px solid #A09048; padding-bottom: 8px;">Neue CVB-Office-Anfrage</h2>
      <p>Hallo Detlef,</p>
      <p>über <strong>cvb-office.de</strong> ist eine neue Anfrage eingegangen.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background-color: #FFFFFF; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 35%;">E-Mail:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Anzahl Fahrzeuge:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${vehicleCount}</td>
        </tr>
        ${contactName
        ? `<tr>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Ansprechpartner:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${contactName}</td>
              </tr>`
        : ''}
        ${phone
        ? `<tr>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Telefon:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${phone}</td>
              </tr>`
        : ''}
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Eingegangen am:</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${createdAt}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; vertical-align: top;">Preis bestätigt:</td>
          <td style="padding: 10px; font-size: 12px; color: #585828;">Ja (${priceConsentText})</td>
        </tr>
      </table>
      <p style="margin: 20px 0;">
        <a href="${adminLink}" style="background-color: #384808; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 999px; font-weight: bold; font-size: 13px;">
          Zur Anfrage im Admin-Bereich
        </a>
      </p>
      <p style="font-size: 12px; color: #585828; margin-top: 30px; border-top: 1px solid #A09048; padding-top: 12px;">
        Viele Grüße<br/>
        <strong>CVB-Office</strong>
      </p>
    </div>
  `;
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const recipient = process.env.ALERT_EMAIL || 'info@caravan-vermieter-bund.de';
    if (!host || !user) {
        console.log(`[SMTP Notice] Kein externer SMTP-Server konfiguriert. Benachrichtigung simuliert:`);
        console.log(`[E-Mail an ${recipient}] Betreff: ${subject}`);
        return { success: true };
    }
    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        });
        await transporter.sendMail({
            from: `"CVB-Office" <${process.env.SMTP_FROM || 'no-reply@cvb-office.de'}>`,
            to: recipient,
            subject,
            text: textBody,
            html: htmlBody,
        });
        return { success: true };
    }
    catch (err) {
        console.error('[SMTP Error] Fehler beim Versenden der Benachrichtigungs-E-Mail:', err);
        return { success: false, error: err?.message || 'SMTP-Sendefehler' };
    }
}
