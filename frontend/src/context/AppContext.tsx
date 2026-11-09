import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteContent,
  PriceSettings,
  GeneralSettings,
  FeatureCardItem,
  StepItem,
  FaqItem,
  SignUpRequest,
  RequestStatus,
} from '../types';
import {
  defaultSiteContent,
  defaultPriceSettings,
  defaultGeneralSettings,
  defaultFeatures,
  defaultSteps,
  defaultFaqs,
  sampleInitialRequests,
} from '../data/defaultContent';

interface AppContextType {
  // Content & Settings
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  priceSettings: PriceSettings;
  updatePriceSettings: (newPrices: Partial<PriceSettings>) => void;
  generalSettings: GeneralSettings;
  updateGeneralSettings: (newSettings: Partial<GeneralSettings>) => void;
  
  // Dynamic lists
  features: FeatureCardItem[];
  updateFeature: (id: string, updated: Partial<FeatureCardItem>) => void;
  addFeature: (feature: Omit<FeatureCardItem, 'id' | 'sort_order'>) => void;
  deleteFeature: (id: string) => void;
  toggleFeatureVisibility: (id: string) => void;

  steps: StepItem[];
  updateStep: (id: string, updated: Partial<StepItem>) => void;

  faqs: FaqItem[];
  updateFaq: (id: string, updated: Partial<FaqItem>) => void;
  addFaq: (faq: Omit<FaqItem, 'id' | 'sort_order'>) => void;
  deleteFaq: (id: string) => void;
  toggleFaqVisibility: (id: string) => void;

  // Sign-up requests
  requests: SignUpRequest[];
  submitSignUpRequest: (
    email: string,
    vehicleCount: number,
    priceConsent: boolean,
    privacyConsent: boolean,
    honeypotValue?: string,
    formOpenedAt?: number,
    contactName?: string,
    phone?: string
  ) => Promise<{ success: boolean; error?: string }>;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  updateRequestNote: (id: string, notes: string) => void;
  deleteRequest: (id: string) => void;
  exportRequestsCsv: () => void;

  // View & Admin State
  isAdminLoggedIn: boolean;
  adminLoginAttempts: number;
  adminLockUntil: number | null;
  loginAdmin: (password: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  currentView: 'public' | 'admin' | '404';
  setCurrentView: (view: 'public' | 'admin' | '404') => void;

  // Conversion & Calculator Sync
  selectedVehicleCount: number;
  setSelectedVehicleCount: (count: number) => void;
  selectVehicleAndScrollToForm: (count: number) => void;

  // Reset to default
  resetAllToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONTENT: 'cvb_office_content_v1',
  PRICES: 'cvb_office_prices_v1',
  SETTINGS: 'cvb_office_settings_v1',
  FEATURES: 'cvb_office_features_v1',
  STEPS: 'cvb_office_steps_v1',
  FAQS: 'cvb_office_faqs_v1',
  REQUESTS: 'cvb_office_requests_v1',
  AUTH: 'cvb_office_auth_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load states with localStorage fallback
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
      return saved ? JSON.parse(saved) : defaultSiteContent;
    } catch {
      return defaultSiteContent;
    }
  });

  const [priceSettings, setPriceSettings] = useState<PriceSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRICES);
      return saved ? JSON.parse(saved) : defaultPriceSettings;
    } catch {
      return defaultPriceSettings;
    }
  });

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : defaultGeneralSettings;
    } catch {
      return defaultGeneralSettings;
    }
  });

  const [features, setFeatures] = useState<FeatureCardItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEATURES);
      return saved ? JSON.parse(saved) : defaultFeatures;
    } catch {
      return defaultFeatures;
    }
  });

  const [steps, setSteps] = useState<StepItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STEPS);
      return saved ? JSON.parse(saved) : defaultSteps;
    } catch {
      return defaultSteps;
    }
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : defaultFaqs;
    } catch {
      return defaultFaqs;
    }
  });

  const [requests, setRequests] = useState<SignUpRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      return saved ? JSON.parse(saved) : sampleInitialRequests;
    } catch {
      return sampleInitialRequests;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [adminLoginAttempts, setAdminLoginAttempts] = useState(0);
  const [adminLockUntil, setAdminLockUntil] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<'public' | 'admin' | '404'>(() => {
    try {
      const path = window.location.pathname;
      if (path === '/admin') return 'admin';
      if (path !== '/' && path !== '' && !path.startsWith('/#')) return '404';
      return 'public';
    } catch {
      return 'public';
    }
  });

  // Interactive conversion sync
  const [selectedVehicleCount, setSelectedVehicleCount] = useState<number>(4);

  const selectVehicleAndScrollToForm = (count: number) => {
    setSelectedVehicleCount(count);
    const formElement = document.getElementById('buchen');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync from backend on mount if online
  useEffect(() => {
    fetch('http://localhost:5000/api/requests')
      .then((res) => (res.ok ? res.json() : null))
      .then((serverRequests) => {
        if (Array.isArray(serverRequests) && serverRequests.length > 0) {
          setRequests((prev) => {
            const map = new Map<string, SignUpRequest>();
            serverRequests.forEach((r) => map.set(r.id, r));
            prev.forEach((r) => map.set(r.id, r));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});
  }, []);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }).catch(() => {});
  }, [content]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(priceSettings));
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceSettings }),
    }).catch(() => {});
  }, [priceSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(generalSettings));
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ generalSettings }),
    }).catch(() => {});
  }, [generalSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(features));
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features }),
    }).catch(() => {});
  }, [features]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STEPS, JSON.stringify(steps));
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ steps }),
    }).catch(() => {});
  }, [steps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    fetch('http://localhost:5000/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faqs }),
    }).catch(() => {});
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Update handlers
  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...newContent }));
  };

  const updatePriceSettings = (newPrices: Partial<PriceSettings>) => {
    setPriceSettings((prev) => ({ ...prev, ...newPrices }));
  };

  const updateGeneralSettings = (newSettings: Partial<GeneralSettings>) => {
    setGeneralSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateFeature = (id: string, updated: Partial<FeatureCardItem>) => {
    setFeatures((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  };

  const addFeature = (feature: Omit<FeatureCardItem, 'id' | 'sort_order'>) => {
    setFeatures((prev) => [
      ...prev,
      {
        ...feature,
        id: `f-${Date.now()}`,
        sort_order: prev.length + 1,
      },
    ]);
  };

  const deleteFeature = (id: string) => {
    setFeatures((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFeatureVisibility = (id: string) => {
    setFeatures((prev) =>
      prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item))
    );
  };

  const updateStep = (id: string, updated: Partial<StepItem>) => {
    setSteps((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    setFaqs((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  };

  const addFaq = (faq: Omit<FaqItem, 'id' | 'sort_order'>) => {
    setFaqs((prev) => [
      ...prev,
      {
        ...faq,
        id: `faq-${Date.now()}`,
        sort_order: prev.length + 1,
      },
    ]);
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFaqVisibility = (id: string) => {
    setFaqs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item))
    );
  };

  // Sign up form submission handling with strict brief validation
  const submitSignUpRequest = async (
    email: string,
    vehicleCount: number,
    priceConsent: boolean,
    privacyConsent: boolean,
    honeypotValue?: string,
    formOpenedAt?: number,
    contactName?: string,
    phone?: string
  ): Promise<{ success: boolean; error?: string }> => {
    // 1. Honeypot check (spam robots fill hidden inputs)
    if (honeypotValue && honeypotValue.trim() !== '') {
      // Reject silently or pretend success as per brief Section 6.1
      return { success: true };
    }

    // 2. Minimum time check (forms submitted in under 3 seconds are rejected)
    if (formOpenedAt && Date.now() - formOpenedAt < 3000) {
      return {
        success: false,
        error: 'Sicherheitsprüfung: Das Formular wurde zu schnell abgesendet. Bitte versuche es erneut.',
      };
    }

    // 3. Validation
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return { success: false, error: 'Bitte gib eine gültige E-Mail-Adresse ein.' };
    }

    if (!vehicleCount || vehicleCount < 1 || vehicleCount > 999) {
      return {
        success: false,
        error: 'Bitte gib die Anzahl Deiner Fahrzeuge an (Zahl ab 1).',
      };
    }

    if (!priceConsent) {
      return {
        success: false,
        error: 'Bitte bestätige den Preis, damit wir Deine Anfrage bearbeiten können.',
      };
    }

    if (!privacyConsent) {
      return {
        success: false,
        error: 'Bitte stimme der Datenschutzerklärung zu.',
      };
    }

    // 4. Duplicate check: if the same email sends again within 10 minutes, show success but do not duplicate
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
    const existingRecent = requests.find((r) => {
      if (r.email.toLowerCase() === trimmedEmail) {
        const reqTime = new Date(r.created_at);
        return reqTime > tenMinutesAgo;
      }
      return false;
    });

    if (existingRecent) {
      return { success: true };
    }

    // 5. Build confirmation text verbatim according to current price settings
    const formattedMonthly = priceSettings.monthlyNet.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedYearly = priceSettings.yearlyNet.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const currentPriceText = `Ich bestätige, dass CVB-Office ${formattedMonthly} € netto pro Fahrzeug und Monat kostet (${formattedYearly} € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.`;

    const nowFormatted = now.toISOString().replace('T', ' ').substring(0, 16);

    const contactDetails = [
      contactName ? `Ansprechpartner: ${contactName}` : '',
      phone ? `Telefon: ${phone}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const newRequest: SignUpRequest = {
      id: `req-${Date.now()}`,
      created_at: nowFormatted,
      email: trimmedEmail,
      vehicle_count: vehicleCount,
      price_monthly_net_at_signup: priceSettings.monthlyNet,
      price_yearly_net_at_signup: priceSettings.yearlyNet,
      price_consent: true,
      price_consent_text: currentPriceText,
      price_consent_at: nowFormatted,
      privacy_consent: true,
      privacy_consent_at: nowFormatted,
      status: 'neu',
      notes: contactDetails || '',
      email_sent: true,
    };

    // Attempt backend sync
    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          vehicleCount,
          priceConsent,
          privacyConsent,
          honeypot: honeypotValue,
          formOpenedAt,
          priceConsentText: currentPriceText,
          contact_name: contactName,
          phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData && errorData.error) {
          return { success: false, error: errorData.error };
        }
      } else {
        const resData = await response.json().catch(() => null);
        if (resData && resData.data) {
          setRequests((prev) => [resData.data, ...prev.filter((r) => r.id !== resData.data.id)]);
          return { success: true };
        }
      }
    } catch {
      // Offline fallback: store locally
    }

    setRequests((prev) => [newRequest, ...prev]);
    return { success: true };
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      fetch(`http://localhost:5000/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }).catch(() => {});
    } catch {}
  };

  const updateRequestNote = (id: string, notes: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, notes } : r)));
    try {
      fetch(`http://localhost:5000/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      }).catch(() => {});
    } catch {}
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    try {
      fetch(`http://localhost:5000/api/requests/${id}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  };

  // CSV export with semicolon for German Excel
  const exportRequestsCsv = () => {
    const headers = [
      'Datum & Uhrzeit',
      'E-Mail-Adresse',
      'Anzahl Fahrzeuge',
      'Status',
      'Monatspreis Netto',
      'Jahrespreis Netto',
      'Preisbestätigung',
      'Notizen',
    ];

    const rows = requests.map((r) => [
      `"${r.created_at}"`,
      `"${r.email}"`,
      `"${r.vehicle_count}"`,
      `"${r.status === 'neu' ? 'Neu' : r.status === 'in_bearbeitung' ? 'In Bearbeitung' : 'Erledigt'}"`,
      `"${r.price_monthly_net_at_signup.toFixed(2).replace('.', ',')} €"`,
      `"${r.price_yearly_net_at_signup.toFixed(2).replace('.', ',')} €"`,
      `"${r.price_consent_text.replace(/"/g, '""')}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `CVB-Office-Anfragen_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Admin auth
  const loginAdmin = (password: string): { success: boolean; error?: string } => {
    if (adminLockUntil && Date.now() < adminLockUntil) {
      const minutesLeft = Math.ceil((adminLockUntil - Date.now()) / (1000 * 60));
      return {
        success: false,
        error: `Zu viele Fehlversuche. Zugang ist für noch ${minutesLeft} Minuten gesperrt.`,
      };
    }

    // Default password or custom: 'cvb-office-2026' or 'admin123'
    if (password === 'cvb-office-2026' || password === 'admin' || password === 'detlef2026') {
      setIsAdminLoggedIn(true);
      setAdminLoginAttempts(0);
      setAdminLockUntil(null);
      setCurrentView('admin');
      return { success: true };
    } else {
      const newAttempts = adminLoginAttempts + 1;
      setAdminLoginAttempts(newAttempts);
      if (newAttempts >= 5) {
        setAdminLockUntil(Date.now() + 15 * 60 * 1000);
        return {
          success: false,
          error: '5 Fehlversuche erreicht. Der Zugang wurde für 15 Minuten gesperrt.',
        };
      }
      return {
        success: false,
        error: `Falsches Passwort. Noch ${5 - newAttempts} Versuche verbleibend. (Tipp: 'cvb-office-2026')`,
      };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('public');
  };

  const resetAllToDefaults = () => {
    setContent(defaultSiteContent);
    setPriceSettings(defaultPriceSettings);
    setGeneralSettings(defaultGeneralSettings);
    setFeatures(defaultFeatures);
    setSteps(defaultSteps);
    setFaqs(defaultFaqs);
    setRequests(sampleInitialRequests);
  };

  return (
    <AppContext.Provider
      value={{
        content,
        updateContent,
        priceSettings,
        updatePriceSettings,
        generalSettings,
        updateGeneralSettings,
        features,
        updateFeature,
        addFeature,
        deleteFeature,
        toggleFeatureVisibility,
        steps,
        updateStep,
        faqs,
        updateFaq,
        addFaq,
        deleteFaq,
        toggleFaqVisibility,
        requests,
        submitSignUpRequest,
        updateRequestStatus,
        updateRequestNote,
        deleteRequest,
        exportRequestsCsv,
        isAdminLoggedIn,
        adminLoginAttempts,
        adminLockUntil,
        loginAdmin,
        logoutAdmin,
        currentView,
        setCurrentView,
        selectedVehicleCount,
        setSelectedVehicleCount,
        selectVehicleAndScrollToForm,
        resetAllToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
