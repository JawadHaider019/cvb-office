export type RequestStatus = 'neu' | 'in_bearbeitung' | 'erledigt';

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
  status: RequestStatus;
  notes: string;
  email_sent: boolean;
  email_error?: string;
}

export interface FeatureCardItem {
  id: string;
  title: string;
  text: string;
  icon: string;
  sort_order: number;
  visible: boolean;
}

export interface StepItem {
  id: string;
  number: number;
  title: string;
  text: string;
  icon: string;
  visible: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  visible: boolean;
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
