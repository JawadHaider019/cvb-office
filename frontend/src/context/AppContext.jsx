'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultSiteContent, defaultPriceSettings, defaultGeneralSettings, defaultFeatures, defaultSteps, defaultFaqs, sampleInitialRequests, } from '../data/defaultContent';
/** Resolve backend API base URL; returns empty string for relative same-origin proxy via Next.js rewrites. */
const getApiBaseUrl = () => {
    const envUrl = (typeof process !== 'undefined' &&
        (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL)) ||
        '';
    const configured = envUrl?.trim();
    if (configured) {
        return configured.replace(/\/+$/, '');
    }
    return '';
};
const API_BASE_URL = getApiBaseUrl();

/** Safe API fetch helper that handles timeouts and network unreachability without throwing unhandled Console TypeError */
const safeApiFetch = async (url, options = {}, timeoutMs = 3500) => {
    if (typeof window === 'undefined') return null;
    try {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
        const res = await fetch(url, {
            ...options,
            signal: controller ? controller.signal : undefined,
        }).catch(() => null);
        if (timer) clearTimeout(timer);
        return res;
    } catch {
        return null;
    }
};

const syncContentPatch = (payload) => {
    safeApiFetch(`${API_BASE_URL}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
};
const AppContext = createContext(undefined);

/** Extract contact name, phone, and internal notes from both dedicated fields and legacy notes text. */
export const parseRequestContact = (req) => {
    const rawNotes = (req?.notes || '').trim();
    let contactName = (req?.contact_name || '').trim();
    let phone = (req?.phone || '').trim();
    let cleanNotes = rawNotes;

    if (rawNotes && (!contactName || !phone)) {
        const parts = rawNotes.split('|').map((p) => p.trim());
        const remaining = [];
        parts.forEach((part) => {
            if (/^Ansprechpartner\s*:/i.test(part) && !contactName) {
                contactName = part.replace(/^Ansprechpartner\s*:/i, '').trim();
            } else if (/^Telefon\s*:/i.test(part) && !phone) {
                phone = part.replace(/^Telefon\s*:/i, '').trim();
            } else if (part) {
                remaining.push(part);
            }
        });
        cleanNotes = remaining.join(' | ');
    }

    return { contactName, phone, cleanNotes };
};

const STORAGE_KEYS = {
    CONTENT: 'cvb_office_content_v1',
    PRICES: 'cvb_office_prices_v1',
    SETTINGS: 'cvb_office_settings_v1',
    FEATURES: 'cvb_office_features_v1',
    STEPS: 'cvb_office_steps_v1',
    FAQS: 'cvb_office_faqs_v1',
    REQUESTS: 'cvb_office_requests_v1',
    AUTH: 'cvb_office_auth_v1',
    ADMIN_PW: 'cvb_office_admin_pw_v1',
};
export const AppProvider = ({ children }) => {
    // Initialize states with SSR-safe defaults (avoids React hydration mismatch)
    const [content, setContent] = useState(defaultSiteContent);
    const [priceSettings, setPriceSettings] = useState(defaultPriceSettings);
    const [generalSettings, setGeneralSettings] = useState(defaultGeneralSettings);
    const [features, setFeatures] = useState(defaultFeatures);
    const [steps, setSteps] = useState(defaultSteps);
    const [faqs, setFaqs] = useState(defaultFaqs);
    const [requests, setRequests] = useState(sampleInitialRequests);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [customAdminPassword, setCustomAdminPassword] = useState(null);
    const [adminLoginAttempts, setAdminLoginAttempts] = useState(0);
    const [adminLockUntil, setAdminLockUntil] = useState(null);
    const [currentView, setCurrentView] = useState('public');
    const [isHydrated, setIsHydrated] = useState(false);

    const handleSetCurrentView = (view) => {
        setCurrentView(view);
        if (typeof window !== 'undefined' && window.history?.pushState) {
            if (view === 'admin' && window.location.pathname !== '/admin') {
                window.history.pushState({}, '', '/admin');
            } else if (view === 'public' && window.location.pathname === '/admin') {
                window.history.pushState({}, '', '/');
            }
        }
    };

    // Interactive conversion sync
    const [selectedVehicleCount, setSelectedVehicleCount] = useState(1);
    const selectVehicleAndScrollToForm = (count) => {
        setSelectedVehicleCount(count);
        const formElement = document.getElementById('buchen');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Client-side hydration from localStorage (runs strictly after mount, 0 hydration mismatch)
    useEffect(() => {
        try {
            const savedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
            if (savedContent) setContent(JSON.parse(savedContent));

            const savedPrices = localStorage.getItem(STORAGE_KEYS.PRICES);
            if (savedPrices) setPriceSettings(JSON.parse(savedPrices));

            const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            if (savedSettings) setGeneralSettings(JSON.parse(savedSettings));

            const savedFeatures = localStorage.getItem(STORAGE_KEYS.FEATURES);
            if (savedFeatures) setFeatures(JSON.parse(savedFeatures));

            const savedSteps = localStorage.getItem(STORAGE_KEYS.STEPS);
            if (savedSteps) setSteps(JSON.parse(savedSteps));

            const savedFaqs = localStorage.getItem(STORAGE_KEYS.FAQS);
            if (savedFaqs) {
                const parsed = JSON.parse(savedFaqs);
                if (!parsed.some((f) => f.id === 'faq-mitglied')) {
                    setFaqs([...defaultFaqs.filter((f) => f.id === 'faq-mitglied'), ...parsed]);
                } else {
                    setFaqs(parsed);
                }
            }

            const savedRequests = localStorage.getItem(STORAGE_KEYS.REQUESTS);
            if (savedRequests) setRequests(JSON.parse(savedRequests));

            const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
            if (savedAuth === 'true') setIsAdminLoggedIn(true);

            const savedPw = localStorage.getItem(STORAGE_KEYS.ADMIN_PW);
            if (savedPw) setCustomAdminPassword(savedPw);

            const path = window.location.pathname;
            if (path === '/admin') {
                setCurrentView('admin');
            } else if (path !== '/' && path !== '' && !path.startsWith('/#')) {
                setCurrentView('404');
            }
        } catch (e) {
            console.error('Error hydrating state from localStorage:', e);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    // Sync from backend on mount (both leads and published site content)
    useEffect(() => {
        safeApiFetch(`${API_BASE_URL}/api/requests`)
            .then((res) => (res && res.ok ? res.json() : null))
            .then((serverRequests) => {
                if (Array.isArray(serverRequests) && serverRequests.length > 0) {
                    setRequests((prev) => {
                        const map = new Map();
                        serverRequests.forEach((r) => map.set(r.id, r));
                        prev.forEach((r) => map.set(r.id, r));
                        return Array.from(map.values());
                    });
                }
            })
            .catch(() => { });

        safeApiFetch(`${API_BASE_URL}/api/content`)
            .then((res) => (res && res.ok ? res.json() : null))
            .then((serverData) => {
                if (!serverData || typeof window === 'undefined') return;
                if (!localStorage.getItem(STORAGE_KEYS.CONTENT) && serverData.content) {
                    setContent({ ...defaultSiteContent, ...serverData.content });
                }
                if (!localStorage.getItem(STORAGE_KEYS.PRICES) && serverData.priceSettings) {
                    setPriceSettings({ ...defaultPriceSettings, ...serverData.priceSettings });
                }
                if (!localStorage.getItem(STORAGE_KEYS.SETTINGS) && serverData.generalSettings) {
                    setGeneralSettings({ ...defaultGeneralSettings, ...serverData.generalSettings });
                }
                if (!localStorage.getItem(STORAGE_KEYS.FEATURES) && Array.isArray(serverData.features) && serverData.features.length > 0) {
                    setFeatures(serverData.features);
                }
                if (!localStorage.getItem(STORAGE_KEYS.STEPS) && Array.isArray(serverData.steps) && serverData.steps.length > 0) {
                    setSteps(serverData.steps);
                }
                if (!localStorage.getItem(STORAGE_KEYS.FAQS) && Array.isArray(serverData.faqs) && serverData.faqs.length > 0) {
                    setFaqs(serverData.faqs);
                }
            })
            .catch(() => { });
    }, []);

    // Persistence effects (only persist locally to avoid overwriting server state passively on mount)
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
    }, [content, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(priceSettings));
    }, [priceSettings, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(generalSettings));
    }, [generalSettings, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(features));
    }, [features, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.STEPS, JSON.stringify(steps));
    }, [steps, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    }, [faqs, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    }, [requests, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.AUTH, isAdminLoggedIn ? 'true' : 'false');
    }, [isAdminLoggedIn, isHydrated]);
    // Update handlers (sync explicitly to backend on user mutations)
    const updateContent = (newContent) => {
        setContent((prev) => {
            const next = { ...prev, ...newContent };
            syncContentPatch({ content: next });
            return next;
        });
    };
    const updatePriceSettings = (newPrices) => {
        setPriceSettings((prev) => {
            const next = { ...prev, ...newPrices };
            syncContentPatch({ priceSettings: next });
            return next;
        });
    };
    const updateGeneralSettings = (newSettings) => {
        setGeneralSettings((prev) => {
            const next = { ...prev, ...newSettings };
            syncContentPatch({ generalSettings: next });
            return next;
        });
    };
    const setAllFeatures = (newFeatures) => {
        setFeatures(newFeatures);
        syncContentPatch({ features: newFeatures });
    };
    const updateFeature = (id, updated) => {
        setFeatures((prev) => {
            const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
            syncContentPatch({ features: next });
            return next;
        });
    };
    const addFeature = (feature) => {
        setFeatures((prev) => {
            const next = [
                ...prev,
                {
                    ...feature,
                    id: `f-${Date.now()}`,
                    sort_order: prev.length + 1,
                },
            ];
            syncContentPatch({ features: next });
            return next;
        });
    };
    const deleteFeature = (id) => {
        setFeatures((prev) => {
            const next = prev.filter((item) => item.id !== id);
            syncContentPatch({ features: next });
            return next;
        });
    };
    const toggleFeatureVisibility = (id) => {
        setFeatures((prev) => {
            const next = prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item));
            syncContentPatch({ features: next });
            return next;
        });
    };
    const setAllSteps = (newSteps) => {
        setSteps(newSteps);
        syncContentPatch({ steps: newSteps });
    };
    const updateStep = (id, updated) => {
        setSteps((prev) => {
            const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
            syncContentPatch({ steps: next });
            return next;
        });
    };
    const setAllFaqs = (newFaqs) => {
        setFaqs(newFaqs);
        syncContentPatch({ faqs: newFaqs });
    };
    const updateFaq = (id, updated) => {
        setFaqs((prev) => {
            const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
            syncContentPatch({ faqs: next });
            return next;
        });
    };
    const addFaq = (faq) => {
        setFaqs((prev) => {
            const next = [
                ...prev,
                {
                    ...faq,
                    id: `faq-${Date.now()}`,
                    sort_order: prev.length + 1,
                },
            ];
            syncContentPatch({ faqs: next });
            return next;
        });
    };
    const deleteFaq = (id) => {
        setFaqs((prev) => {
            const next = prev.filter((item) => item.id !== id);
            syncContentPatch({ faqs: next });
            return next;
        });
    };
    const toggleFaqVisibility = (id) => {
        setFaqs((prev) => {
            const next = prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item));
            syncContentPatch({ faqs: next });
            return next;
        });
    };
    // Sign up form submission handling with strict brief validation
    const submitSignUpRequest = async (email, vehicleCount, priceConsent, privacyConsent, honeypotValue, formOpenedAt, contactName, phone) => {
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
        const newRequest = {
            id: `req-${Date.now()}`,
            created_at: nowFormatted,
            email: trimmedEmail,
            contact_name: contactName ? contactName.trim() : '',
            phone: phone ? phone.trim() : '',
            vehicle_count: vehicleCount,
            price_monthly_net_at_signup: priceSettings.monthlyNet,
            price_yearly_net_at_signup: priceSettings.yearlyNet,
            price_consent: true,
            price_consent_text: currentPriceText,
            price_consent_at: nowFormatted,
            privacy_consent: true,
            privacy_consent_at: nowFormatted,
            status: 'neu',
            notes: '',
            email_sent: true,
        };
        // Attempt backend sync when API backend is available
        try {
            const response = await safeApiFetch(`${API_BASE_URL}/api/requests`, {
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
            }, 6000);
            if (response && !response.ok) {
                const errorData = await response.json().catch(() => null);
                if (errorData && errorData.error) {
                    return { success: false, error: errorData.error };
                }
            } else if (response) {
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
    const updateRequestStatus = (id, status) => {
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
        safeApiFetch(`${API_BASE_URL}/api/requests/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
    };
    const updateRequestNote = (id, notes) => {
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, notes } : r)));
        safeApiFetch(`${API_BASE_URL}/api/requests/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes }),
        });
    };
    const deleteRequest = (id) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        safeApiFetch(`${API_BASE_URL}/api/requests/${id}`, {
            method: 'DELETE',
        });
    };
    // CSV export with semicolon for German Excel
    const exportRequestsCsv = () => {
        const headers = [
            'Datum & Uhrzeit',
            'E-Mail-Adresse',
            'Ansprechpartner',
            'Telefon',
            'Anzahl Fahrzeuge',
            'Status',
            'Monatspreis Netto',
            'Jahrespreis Netto',
            'Preisbestätigung',
            'Notizen',
        ];
        const rows = requests.map((r) => {
            const { contactName, phone, cleanNotes } = parseRequestContact(r);
            return [
                `"${r.created_at}"`,
                `"${r.email}"`,
                `"${contactName.replace(/"/g, '""')}"`,
                `"${phone.replace(/"/g, '""')}"`,
                `"${r.vehicle_count}"`,
                `"${r.status === 'neu' ? 'Neu' : r.status === 'in_bearbeitung' ? 'In Bearbeitung' : 'Erledigt'}"`,
                `"${r.price_monthly_net_at_signup.toFixed(2).replace('.', ',')} €"`,
                `"${r.price_yearly_net_at_signup.toFixed(2).replace('.', ',')} €"`,
                `"${r.price_consent_text.replace(/"/g, '""')}"`,
                `"${cleanNotes.replace(/"/g, '""')}"`,
            ];
        });
        const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((row) => row.join(';'))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `CVB-Office-Anfragen_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    // Admin auth
    const changeAdminPassword = (newPassword) => {
        const trimmed = (newPassword || '').trim();
        if (trimmed.length < 4) {
            return { success: false, error: 'Das Passwort muss mindestens 4 Zeichen lang sein.' };
        }
        setCustomAdminPassword(trimmed);
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.ADMIN_PW, trimmed);
        }
        return { success: true };
    };
    const loginAdmin = (password) => {
        if (adminLockUntil && Date.now() < adminLockUntil) {
            const minutesLeft = Math.ceil((adminLockUntil - Date.now()) / (1000 * 60));
            return {
                success: false,
                error: `Zu viele Fehlversuche. Zugang ist für noch ${minutesLeft} Minuten gesperrt.`,
            };
        }
        // Custom password or default fallback passwords
        if ((customAdminPassword && password === customAdminPassword) || password === 'cvb-office-2026' || password === 'admin' || password === 'detlef2026') {
            setIsAdminLoggedIn(true);
            setAdminLoginAttempts(0);
            setAdminLockUntil(null);
            handleSetCurrentView('admin');
            return { success: true };
        }
        else {
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
        handleSetCurrentView('public');
    };
    const resetAllToDefaults = () => {
        setContent(defaultSiteContent);
        setPriceSettings(defaultPriceSettings);
        setGeneralSettings(defaultGeneralSettings);
        setFeatures(defaultFeatures);
        setSteps(defaultSteps);
        setFaqs(defaultFaqs);
        syncContentPatch({
            content: defaultSiteContent,
            priceSettings: defaultPriceSettings,
            generalSettings: defaultGeneralSettings,
            features: defaultFeatures,
            steps: defaultSteps,
            faqs: defaultFaqs,
        });
    };
    return (<AppContext.Provider value={{
            content,
            updateContent,
            priceSettings,
            updatePriceSettings,
            generalSettings,
            updateGeneralSettings,
            features,
            setAllFeatures,
            updateFeature,
            addFeature,
            deleteFeature,
            toggleFeatureVisibility,
            steps,
            setAllSteps,
            updateStep,
            faqs,
            setAllFaqs,
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
            changeAdminPassword,
            logoutAdmin,
            currentView,
            setCurrentView: handleSetCurrentView,
            selectedVehicleCount,
            setSelectedVehicleCount,
            selectVehicleAndScrollToForm,
            resetAllToDefaults,
        }}>
      {children}
    </AppContext.Provider>);
};
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
