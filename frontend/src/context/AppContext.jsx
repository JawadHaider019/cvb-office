'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultSiteContent, defaultPriceSettings, defaultGeneralSettings, defaultFeatures, defaultSteps, defaultFaqs, sampleInitialRequests, } from '../data/defaultContent';
/** Resolve backend API base URL; returns null on non-local origins when NEXT_PUBLIC_API_URL / VITE_API_URL is unset so browsers never prompt for local network access. */
const getApiBaseUrl = () => {
    const envUrl = (typeof process !== 'undefined' &&
        (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL)) ||
        '';
    const configured = envUrl?.trim();
    if (configured) {
        return configured.replace(/\/+$/, '');
    }
    if (typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return 'http://localhost:5000';
    }
    return null;
};
const API_BASE_URL = getApiBaseUrl();
const syncContentPatch = (payload) => {
    if (!API_BASE_URL)
        return;
    fetch(`${API_BASE_URL}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).catch(() => { });
};
const AppContext = createContext(undefined);
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
    const [adminLoginAttempts, setAdminLoginAttempts] = useState(0);
    const [adminLockUntil, setAdminLockUntil] = useState(null);
    const [currentView, setCurrentView] = useState('public');
    const [isHydrated, setIsHydrated] = useState(false);

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

    // Sync from backend on mount if API backend is configured/local
    useEffect(() => {
        if (!API_BASE_URL)
            return;
        fetch(`${API_BASE_URL}/api/requests`)
            .then((res) => (res.ok ? res.json() : null))
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
    }, []);

    // Persistence effects (only persist once client hydration is complete)
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
        syncContentPatch({ content });
    }, [content, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(priceSettings));
        syncContentPatch({ priceSettings });
    }, [priceSettings, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(generalSettings));
        syncContentPatch({ generalSettings });
    }, [generalSettings, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(features));
        syncContentPatch({ features });
    }, [features, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.STEPS, JSON.stringify(steps));
        syncContentPatch({ steps });
    }, [steps, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
        syncContentPatch({ faqs });
    }, [faqs, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    }, [requests, isHydrated]);
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem(STORAGE_KEYS.AUTH, isAdminLoggedIn ? 'true' : 'false');
    }, [isAdminLoggedIn, isHydrated]);
    // Update handlers
    const updateContent = (newContent) => {
        setContent((prev) => ({ ...prev, ...newContent }));
    };
    const updatePriceSettings = (newPrices) => {
        setPriceSettings((prev) => ({ ...prev, ...newPrices }));
    };
    const updateGeneralSettings = (newSettings) => {
        setGeneralSettings((prev) => ({ ...prev, ...newSettings }));
    };
    const updateFeature = (id, updated) => {
        setFeatures((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    };
    const addFeature = (feature) => {
        setFeatures((prev) => [
            ...prev,
            {
                ...feature,
                id: `f-${Date.now()}`,
                sort_order: prev.length + 1,
            },
        ]);
    };
    const deleteFeature = (id) => {
        setFeatures((prev) => prev.filter((item) => item.id !== id));
    };
    const toggleFeatureVisibility = (id) => {
        setFeatures((prev) => prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)));
    };
    const updateStep = (id, updated) => {
        setSteps((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    };
    const updateFaq = (id, updated) => {
        setFaqs((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    };
    const addFaq = (faq) => {
        setFaqs((prev) => [
            ...prev,
            {
                ...faq,
                id: `faq-${Date.now()}`,
                sort_order: prev.length + 1,
            },
        ]);
    };
    const deleteFaq = (id) => {
        setFaqs((prev) => prev.filter((item) => item.id !== id));
    };
    const toggleFaqVisibility = (id) => {
        setFaqs((prev) => prev.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)));
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
        const contactDetails = [
            contactName ? `Ansprechpartner: ${contactName}` : '',
            phone ? `Telefon: ${phone}` : '',
        ]
            .filter(Boolean)
            .join(' | ');
        const newRequest = {
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
        // Attempt backend sync when API backend is available
        if (API_BASE_URL) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/requests`, {
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
                }
                else {
                    const resData = await response.json().catch(() => null);
                    if (resData && resData.data) {
                        setRequests((prev) => [resData.data, ...prev.filter((r) => r.id !== resData.data.id)]);
                        return { success: true };
                    }
                }
            }
            catch {
                // Offline fallback: store locally
            }
        }
        setRequests((prev) => [newRequest, ...prev]);
        return { success: true };
    };
    const updateRequestStatus = (id, status) => {
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
        if (!API_BASE_URL)
            return;
        try {
            fetch(`${API_BASE_URL}/api/requests/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            }).catch(() => { });
        }
        catch { }
    };
    const updateRequestNote = (id, notes) => {
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, notes } : r)));
        if (!API_BASE_URL)
            return;
        try {
            fetch(`${API_BASE_URL}/api/requests/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notes }),
            }).catch(() => { });
        }
        catch { }
    };
    const deleteRequest = (id) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        if (!API_BASE_URL)
            return;
        try {
            fetch(`${API_BASE_URL}/api/requests/${id}`, {
                method: 'DELETE',
            }).catch(() => { });
        }
        catch { }
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
    const loginAdmin = (password) => {
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
    return (<AppContext.Provider value={{
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
