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

export interface EmailAlertPayload {
  email: string;
  vehicleCount: number;
  createdAt: string;
  priceConsentText: string;
  requestId: string;
  contactName?: string | null;
  phone?: string | null;
}
