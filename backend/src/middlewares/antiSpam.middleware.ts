import { Request, Response, NextFunction } from 'express';

export function antiSpamCheck(req: Request, res: Response, next: NextFunction) {
  const { honeypot, formOpenedAt } = req.body;

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

  next();
}
