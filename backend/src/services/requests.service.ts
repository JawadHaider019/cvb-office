import { prisma, isConnectedToPostgres, getDb, saveDb } from '../config/db.js';
import { SignUpRequest } from '../types/index.js';
import { fetchFullSiteData } from './content.service.js';

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

export async function getFilteredRequests(options: {
  status?: string;
  search?: string;
  sort?: string;
}): Promise<SignUpRequest[]> {
  const siteData = await fetchFullSiteData();
  let list = [...siteData.requests];

  if (options.status && options.status !== 'all') {
    list = list.filter((r) => r.status === options.status);
  }

  if (options.search && typeof options.search === 'string' && options.search.trim() !== '') {
    const term = options.search.trim().toLowerCase();
    list = list.filter(
      (r) =>
        r.email.toLowerCase().includes(term) ||
        (r.contact_name && r.contact_name.toLowerCase().includes(term)) ||
        (r.notes && r.notes.toLowerCase().includes(term))
    );
  }

  if (options.sort === 'asc') {
    list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  } else {
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return list;
}

export async function generateCsvExport(): Promise<string> {
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

  return '\uFEFF' + [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\r\n');
}
