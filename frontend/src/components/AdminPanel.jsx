'use client';
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Inbox,
  FileEdit,
  DollarSign,
  HelpCircle,
  Settings,
  User,
  LogOut,
  ExternalLink,
  Search,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Plus,
  Save,
  RotateCcw,
  ChevronRight,
  KeyRound,
  Copy,
  Check,
  Car,
  Sparkles,
  Building2,
  Bell,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Calendar,
  FileText,
  Clock,
  X,
  Sliders,
  Award,
  Scale,
  Server,
  TrendingUp,
  RefreshCw,
  Layers,
  Smartphone,
  CheckSquare,
  HelpCircle as QuestionIcon,
} from 'lucide-react';

// Live Homepage Section Components
import { Hero } from './Hero';
import { ProblemSolution } from './ProblemSolution';
import { Features } from './Features';
import { BuildingBlocks } from './BuildingBlocks';
import { HowItWorks } from './HowItWorks';
import { BenefitsAudience } from './BenefitsAudience';
import { PriceTrialBox } from './PriceTrialBox';
import { SignUpForm } from './SignUpForm';
import { FaqAccordion } from './FaqAccordion';
import { AboutCvb } from './AboutCvb';
import { Footer } from './Footer';

export const AdminPanel = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    setCurrentView,
    requests,
    updateRequestStatus,
    updateRequestNote,
    deleteRequest,
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
    resetAllToDefaults,
  } = useApp();

  // Active Tab state (dashboard, requests, section-*, settings, account)
  const [activeTab, setActiveTab] = useState('dashboard');

  // Edit Drawer state for Live Section Editor
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('detlef@caravan-vermieter-bund.de');
  const [loginPassword, setLoginPassword] = useState('cvb-office-2026');
  const [loginError, setLoginError] = useState(null);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  // Request list state
  const [searchEmail, setSearchEmail] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [tempNote, setTempNote] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Save feedback state
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  const [showReloadDialog, setShowReloadDialog] = useState(false);

  // Local form drafts
  const [contentDraft, setContentDraft] = useState(content);
  const [priceDraft, setPriceDraft] = useState(priceSettings);
  const [settingsDraft, setSettingsDraft] = useState(generalSettings);

  // FAQ new modal / form
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const [showAddFaq, setShowAddFaq] = useState(false);

  // Feature new card
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeatureText, setNewFeatureText] = useState('');
  const [showAddFeature, setShowAddFeature] = useState(false);

  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showSaveNotice = (msg = 'Änderungen erfolgreich gespeichert.') => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const copyToClipboard = (text, id) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedEmail(id);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  // Aggregated calculations
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const q = searchEmail.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.email.toLowerCase().includes(q) ||
        (r.notes && r.notes.toLowerCase().includes(q)) ||
        (r.id && r.id.toLowerCase().includes(q));
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchEmail, statusFilter]);

  const newRequestsCount = useMemo(() => requests.filter((r) => r.status === 'neu').length, [requests]);
  const inProgressCount = useMemo(() => requests.filter((r) => r.status === 'in_bearbeitung').length, [requests]);
  const doneCount = useMemo(() => requests.filter((r) => r.status === 'erledigt').length, [requests]);

  const totalVehiclesCount = useMemo(() => {
    return requests.reduce((sum, r) => sum + (Number(r.vehicle_count) || 1), 0);
  }, [requests]);

  // Handler to update a section and offer home reload
  const handleUpdateAndApply = (sectionName) => {
    try {
      localStorage.setItem('cvb_office_content_backup_v1', JSON.stringify(content));
    } catch {}
    updateContent(contentDraft);
    updatePriceSettings(priceDraft);
    showSaveNotice(`${sectionName} erfolgreich aktualisiert und auf der Startseite angewendet!`);
    setIsEditDrawerOpen(false);
    setShowReloadDialog(true);
  };

  // Reload the public home page
  const handleReloadHomePage = () => {
    setShowReloadDialog(false);
    window.location.href = '/';
  };

  // Section tabs configuration
  const homepageSections = [
    { id: 'section-hero', num: '01', label: 'Hero-Bereich', title: 'Teil 1: Hero-Bereich (Kopfzeile)', component: <Hero /> },
    { id: 'section-problem', num: '02', label: 'Problem & Lösung', title: 'Teil 2: Problem & Lösung', component: <ProblemSolution /> },
    { id: 'section-features', num: '03', label: 'Funktions-Module', title: 'Teil 3: Die 6 Funktions-Module', component: <Features /> },
    { id: 'section-blocks', num: '04', label: 'Die 2 Bausteine', title: 'Teil 4: Mieter-Einweisung & Cockpit', component: <BuildingBlocks /> },
    { id: 'section-steps', num: '05', label: '4-Schritte-Ablauf', title: 'Teil 5: Der Ablauf in 4 Schritten', component: <HowItWorks /> },
    { id: 'section-audience', num: '06', label: 'Vorteile & Zielgruppe', title: 'Teil 6 & 7: Zielgruppen & Vorteile', component: <BenefitsAudience /> },
    { id: 'section-prices', num: '07', label: 'Preise & Tarife', title: 'Teil 8: Preis- & Testphasen-Box', component: <PriceTrialBox /> },
    { id: 'section-form', num: '08', label: 'Buchungsformular', title: 'Teil 9: Mietanfrage-Formular', component: <SignUpForm onOpenPrivacyModal={() => {}} /> },
    { id: 'section-faq', num: '09', label: 'FAQ Wissensbasis', title: 'Teil 10: Häufig gestellte Fragen (FAQ)', component: <FaqAccordion /> },
    { id: 'section-about', num: '10', label: 'Über den CVB', title: 'Teil 11: Über den Caravan-Vermieter-Bund', component: <AboutCvb /> },
    { id: 'section-footer', num: '11', label: 'Footer & Kontakt', title: 'Teil 12: Footer & Abschluss', component: <Footer onOpenImpressum={() => {}} onOpenPrivacy={() => {}} /> },
  ];

  // Active section metadata if on a section tab
  const currentSection = homepageSections.find((s) => s.id === activeTab);

  // If not logged in, show Executive Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#1A2304] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-body">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#A09048]/15 blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#889028]/20 blur-[180px] pointer-events-none" />

        <div className="max-w-md w-full bg-[#F4F2E6] rounded-[32px] p-8 sm:p-11 border-2 border-[#A09048]/40 shadow-[0_25px_70px_rgba(26,35,4,0.6)] relative z-10 text-[#384808]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#384808] border-2 border-[#A09048] text-white flex items-center justify-center font-spartan font-black text-2xl mb-4 shadow-xl">
              <span className="text-[#A09048]">CVB</span>
            </div>

            <h1 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
              ADMIN-OFFICE<span className="text-[#889028]">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#585828] font-normal leading-relaxed mt-2">
              Management-Portal für Detlef Scheer &amp; die CVB-Geschäftsstelle
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-2xl flex items-center gap-3">
              <AlertTriangle size={18} className="shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          {showForgotNotice && (
            <div className="mb-5 p-4 bg-[#F9F8F3] border border-[#A09048]/40 text-[#384808] text-xs font-medium rounded-2xl leading-relaxed">
              Ein sicherer Anmelde-Link wurde an <strong>{loginEmail}</strong> gesendet (Simulation).
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoginError(null);
              const res = loginAdmin(loginPassword);
              if (!res.success) {
                setLoginError(res.error || 'Ungültiges Passwort.');
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#384808] mb-1.5">
                Administrator E-Mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-[#A09048]" size={18} />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-medium text-[#242E05] bg-white focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  Zugangspasswort
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(true)}
                  className="text-[11px] text-[#A09048] hover:text-[#384808] font-bold underline cursor-pointer"
                >
                  Passwort vergessen?
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3.5 text-[#A09048]" size={18} />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Passwort eingeben..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-medium text-[#242E05] bg-white focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15"
                  required
                />
              </div>
            </div>

            <div className="p-3 bg-white/80 border border-[#A09048]/30 rounded-2xl text-[11px] text-[#585828] flex items-center justify-between">
              <span>Standard: <strong className="font-mono text-[#242E05]">cvb-office-2026</strong></span>
              <button
                type="button"
                onClick={() => setLoginPassword('cvb-office-2026')}
                className="text-[10px] font-black uppercase text-[#384808] hover:text-[#A09048] bg-[#F4F2E6] px-2.5 py-1 rounded-lg border border-[#A09048]/30 cursor-pointer"
              >
                Einfügen
              </button>
            </div>

            <button
              type="submit"
              className="tech-cta-primary w-full justify-between h-13 text-sm mt-2"
            >
              <span>SICHER ANMELDEN</span>
              <span className="tech-ci">
                <ArrowRight size={17} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('public')}
              className="w-full py-2.5 text-xs font-bold text-[#585828] hover:text-[#384808] text-center transition-colors block cursor-pointer"
            >
              ← Zurück zur öffentlichen Startseite
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F7F0] text-[#384808] font-body flex antialiased selection:bg-[#A09048] selection:text-white">
      {/* =========================================================================
          1. ENTERPRISE SIDEBAR WITH LIVE SECTIONS TABS
         ========================================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-80 bg-[#172002] text-[#F4F2E6] flex flex-col justify-between border-r border-[#A09048]/30 shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:h-screen md:sticky md:top-0 md:shadow-none`}
      >
        <div>
          {/* Top Announcement Ribbon */}
          <div className="bg-[#242E05] px-5 py-2 border-b border-[#A09048]/30 flex items-center justify-between text-[10px] font-spartan font-bold uppercase tracking-[0.14em] text-[#A09048]">
            <span>CVB VERWALTUNGSSUITE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Brand Emblem */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#384808] border-2 border-[#A09048] text-white flex items-center justify-center font-spartan font-black text-lg shadow-md">
                <span className="text-[#A09048]">CVB</span>
              </div>
              <div>
                <span className="font-spartan font-black text-lg tracking-tight text-white block leading-none">
                  CVB-OFFICE
                </span>
                <span className="text-[11px] font-semibold text-[#A09048] tracking-wider uppercase block mt-1">
                  ADMINISTRATION
                </span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-stone-400 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Category Groups */}
          <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-210px)]">
            {/* Group 1: Overview & CRM */}
            <div>
              <div className="px-3.5 text-[10px] font-spartan font-black uppercase tracking-widest text-[#A09048]/80 mb-2">
                ÜBERSICHT &amp; CRM
              </div>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-spartan uppercase tracking-wider transition-all text-left cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-[#A09048] text-[#172002] font-black shadow-lg shadow-[#A09048]/20'
                      : 'text-[#E1E5D5] hover:bg-white/[0.08] hover:text-white font-bold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard size={18} className={activeTab === 'dashboard' ? 'text-[#172002]' : 'text-[#A09048]'} />
                    <span>Dashboard Übersicht</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('requests');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-spartan uppercase tracking-wider transition-all text-left cursor-pointer ${
                    activeTab === 'requests'
                      ? 'bg-[#A09048] text-[#172002] font-black shadow-lg shadow-[#A09048]/20'
                      : 'text-[#E1E5D5] hover:bg-white/[0.08] hover:text-white font-bold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Inbox size={18} className={activeTab === 'requests' ? 'text-[#172002]' : 'text-[#A09048]'} />
                    <span>Mietanfragen CRM</span>
                  </div>
                  {newRequestsCount > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                        activeTab === 'requests' ? 'bg-[#172002] text-white' : 'bg-[#A09048] text-[#172002]'
                      }`}
                    >
                      {newRequestsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Group 2: Home Page Sections Live Editor */}
            <div>
              <div className="px-3.5 flex items-center justify-between text-[10px] font-spartan font-black uppercase tracking-widest text-[#A09048]/80 mb-2">
                <span>STARTSEITE SEKTIONEN</span>
                <span className="text-[9px] bg-[#A09048]/20 text-[#A09048] px-1.5 py-0.5 rounded">
                  11 TEILE
                </span>
              </div>
              <div className="space-y-1">
                {homepageSections.map((sec) => {
                  const isActive = activeTab === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setActiveTab(sec.id);
                        setIsEditDrawerOpen(false);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-spartan uppercase tracking-wider transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#A09048] text-[#172002] font-black shadow-md'
                          : 'text-[#D5DBC7] hover:bg-white/[0.08] hover:text-white font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-[#172002] text-white' : 'bg-white/10 text-[#A09048]'
                        }`}>
                          {sec.num}
                        </span>
                        <span className="truncate">{sec.label}</span>
                      </div>
                      <ChevronRight size={13} className={isActive ? 'text-[#172002]' : 'text-stone-500'} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 3: System & Account */}
            <div>
              <div className="px-3.5 text-[10px] font-spartan font-black uppercase tracking-widest text-[#A09048]/80 mb-2">
                SYSTEM &amp; KONTO
              </div>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-spartan uppercase tracking-wider transition-all text-left cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#A09048] text-[#172002] font-black shadow-lg shadow-[#A09048]/20'
                      : 'text-[#E1E5D5] hover:bg-white/[0.08] hover:text-white font-bold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Settings size={18} className={activeTab === 'settings' ? 'text-[#172002]' : 'text-[#A09048]'} />
                    <span>System-Einstellungen</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('account');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-spartan uppercase tracking-wider transition-all text-left cursor-pointer ${
                    activeTab === 'account'
                      ? 'bg-[#A09048] text-[#172002] font-black shadow-lg shadow-[#A09048]/20'
                      : 'text-[#E1E5D5] hover:bg-white/[0.08] hover:text-white font-bold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User size={18} className={activeTab === 'account' ? 'text-[#172002]' : 'text-[#A09048]'} />
                    <span>Administrator Profil</span>
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Profile Area */}
        <div className="p-4 border-t border-white/10 bg-[#121A02]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#A09048] text-[#172002] font-spartan font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                DS
              </div>
              <div className="min-w-0">
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-white block truncate">
                  Detlef Scheer
                </span>
                <span className="text-[11px] text-[#A09048] block truncate">Inhaber &amp; Admin</span>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              className="p-2 text-stone-400 hover:text-red-400 hover:bg-white/[0.08] rounded-xl transition-colors cursor-pointer"
              title="Abmelden"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* =========================================================================
          2. FLUID MAIN WORKSPACE
         ========================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <header className="h-20 px-6 sm:px-10 lg:px-12 bg-white/95 backdrop-blur-xl border-b border-[#A09048]/25 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl border border-[#A09048]/30 text-[#384808]"
            >
              <Sliders size={20} />
            </button>

            <h1 className="font-spartan font-black text-xl sm:text-2xl uppercase tracking-tight text-[#242E05]">
              {activeTab === 'dashboard' && 'Dashboard Übersicht'}
              {activeTab === 'requests' && 'Mietanfragen CRM'}
              {currentSection && currentSection.title}
              {activeTab === 'settings' && 'System-Einstellungen'}
              {activeTab === 'account' && 'Administrator Profil'}
            </h1>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('public')}
              className="tech-cta-primary h-11 text-xs px-4"
            >
              <span className="hidden sm:inline">ÖFFENTLICHE WEBPAGE</span>
              <span className="sm:hidden">LIVE</span>
              <span className="tech-ci w-7 h-7">
                <ArrowUpRight size={14} />
              </span>
            </button>
          </div>
        </header>

        {/* Floating Save Toast Notification */}
        {saveSuccessMsg && (
          <div className="fixed top-24 right-8 z-50 bg-[#384808] text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-200 text-sm font-bold border-2 border-[#A09048]">
            <CheckCircle size={20} className="text-[#A09048]" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Reload Confirmation Dialog */}
        {showReloadDialog && (
          <div className="fixed bottom-8 right-8 z-50 bg-[#242E05] text-white p-5 rounded-3xl shadow-2xl border-2 border-[#A09048] max-w-sm animate-in slide-in-from-bottom duration-300">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle size={22} className="text-[#A09048] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-spartan font-black text-sm uppercase text-white">
                  Änderungen Live geschaltet
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  Möchtest Du die Startseite neu laden, um das Ergebnis im Browser zu sehen?
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setShowReloadDialog(false)}
                className="px-3.5 py-1.5 text-xs text-stone-300 hover:text-white cursor-pointer font-bold"
              >
                Im Admin bleiben
              </button>
              <button
                onClick={handleReloadHomePage}
                className="px-4 py-2 bg-[#A09048] hover:bg-[#8D7F3E] text-[#172002] rounded-xl text-xs font-spartan font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <RefreshCw size={13} />
                <span>Startseite neu laden</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. TAB CONTENT PANELS
           ========================================================================= */}
        <main className="flex-1 w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 py-8 space-y-8">
          {/* -----------------------------------------------------------------------
              TAB 1: DASHBOARD
             ----------------------------------------------------------------------- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Executive Welcome Card */}
              <div className="bg-[#F4F2E6] p-7 sm:p-10 rounded-[30px] border border-[#A09048]/35 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#A09048]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h1 className="font-spartan font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#242E05]">
                      WILLKOMMEN, DETLEF<span className="text-[#889028]">.</span>
                    </h1>
                    <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed mt-2 max-w-2xl font-body">
                      Wähle in der linken Navigation eine beliebige Sektion der Startseite aus, um das exakte Design live zu sehen, Texte anzupassen und mit einem Klick live zu schalten.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('requests')}
                    className="tech-cta-primary self-start md:self-auto h-12 text-xs"
                  >
                    <span>ANFRAGEN ÖFFNEN ({requests.length})</span>
                    <span className="tech-ci">
                      <ArrowRight size={16} />
                    </span>
                  </button>
                </div>
              </div>

              {/* 4 Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
                  <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                    01
                  </span>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">
                        NEUE ANFRAGEN
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold border border-amber-200">
                        <Inbox size={18} />
                      </div>
                    </div>
                    <div className="font-spartan font-black text-5xl text-[#242E05] tabular-nums tracking-tight">
                      {newRequestsCount}
                    </div>
                  </div>
                  <div className="text-xs text-amber-800 font-bold mt-4 flex items-center gap-1.5 pt-3 border-t border-stone-100">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Müssen noch bearbeitet werden</span>
                  </div>
                </div>

                <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
                  <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                    02
                  </span>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">
                        IN SETUP
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold border border-blue-200">
                        <Clock size={18} />
                      </div>
                    </div>
                    <div className="font-spartan font-black text-5xl text-[#242E05] tabular-nums tracking-tight">
                      {inProgressCount}
                    </div>
                  </div>
                  <div className="text-xs text-blue-800 font-bold mt-4 flex items-center gap-1.5 pt-3 border-t border-stone-100">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Smarlps Zugang wird eingerichtet</span>
                  </div>
                </div>

                <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
                  <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                    03
                  </span>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">
                        AKTIV
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold border border-emerald-200">
                        <CheckCircle size={18} />
                      </div>
                    </div>
                    <div className="font-spartan font-black text-5xl text-[#242E05] tabular-nums tracking-tight">
                      {doneCount}
                    </div>
                  </div>
                  <div className="text-xs text-emerald-800 font-bold mt-4 flex items-center gap-1.5 pt-3 border-t border-stone-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Zugang erfolgreich übermittelt</span>
                  </div>
                </div>

                <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
                  <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                    04
                  </span>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">
                        GESAMTFLOTTE
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F4F2E6] text-[#384808] flex items-center justify-center font-bold border border-[#A09048]/30">
                        <Car size={18} />
                      </div>
                    </div>
                    <div className="font-spartan font-black text-5xl text-[#384808] tabular-nums tracking-tight">
                      {totalVehiclesCount} <span className="text-base font-bold text-[#585828]">Camper</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#585828] font-bold mt-4 pt-3 border-t border-stone-100">
                    Über alle {requests.length} Anträge erfasst
                  </div>
                </div>
              </div>

              {/* Sections Quick Grid */}
              <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs">
                <div className="mb-6">
                  <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-1">
                    SCHNELLZUGRIFF AUF DIE SEKTIONEN
                  </span>
                  <h3 className="font-spartan font-black text-2xl uppercase tracking-tight text-[#242E05]">
                    STARTSEITEN SEKTIONEN DIREKT LIVE BEARBEITEN
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {homepageSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setActiveTab(sec.id);
                        setIsEditDrawerOpen(true);
                      }}
                      className="p-5 bg-[#F9F8F3] hover:bg-white rounded-2xl border border-[#A09048]/25 hover:border-[#384808] transition-all text-left group shadow-xs hover:shadow-lg cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-[#A09048]">
                          Teil {sec.num}
                        </span>
                        <span className="tech-ci w-6 h-6">
                          <ArrowRight size={12} />
                        </span>
                      </div>
                      <span className="font-spartan font-black text-sm uppercase text-[#242E05] group-hover:text-[#384808]">
                        {sec.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Requests Bento Table */}
              <div className="bg-white rounded-[32px] p-7 sm:p-9 border border-[#A09048]/30 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-1">
                      VERLAUF
                    </span>
                    <h3 className="font-spartan font-black text-xl sm:text-2xl uppercase tracking-tight text-[#242E05]">
                      DIE NEUESTEN ANFRAGEN
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveTab('requests')}
                    className="tech-cta-ghost h-10 text-xs px-4"
                  >
                    <span>Alle {requests.length} Anfragen ansehen</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#A09048]/25">
                  <table className="w-full text-left text-xs sm:text-sm font-body">
                    <thead className="bg-[#F4F2E6] border-b border-[#A09048]/25 text-[#384808] font-spartan font-black uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="px-5 py-4">Datum</th>
                        <th className="px-5 py-4">Vermieter / E-Mail</th>
                        <th className="px-5 py-4 text-center">Fahrzeuge</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4 text-right">Aktion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                      {requests.slice(0, 5).map((req) => (
                        <tr
                          key={req.id}
                          onClick={() => {
                            setSelectedRequest(req);
                            setTempNote(req.notes || '');
                            setActiveTab('requests');
                          }}
                          className="hover:bg-[#F9F8F3] transition-colors cursor-pointer"
                        >
                          <td className="px-5 py-4 text-stone-500 whitespace-nowrap tabular-nums">
                            {req.created_at}
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-bold text-[#242E05] block">{req.email}</span>
                            {req.notes && (
                              <span className="text-[11px] text-stone-400 block truncate max-w-xs mt-0.5">
                                Notiz: {req.notes}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F4F2E6] border border-[#A09048]/30 font-spartan font-black text-xs text-[#384808] tabular-nums">
                              <Car size={13} className="text-[#A09048]" />
                              <span>{req.vehicle_count}</span>
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-spartan font-bold uppercase tracking-wider ${
                                req.status === 'neu'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : req.status === 'in_bearbeitung'
                                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              }`}
                            >
                              {req.status === 'neu'
                                ? 'Neu'
                                : req.status === 'in_bearbeitung'
                                ? 'In Bearbeitung'
                                : 'Erledigt'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRequest(req);
                                setTempNote(req.notes || '');
                                setActiveTab('requests');
                              }}
                              className="px-3.5 py-1.5 text-xs font-spartan font-bold uppercase tracking-wider text-[#384808] hover:bg-[#F4F2E6] rounded-xl border border-[#A09048]/30 transition-colors"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 2: MIETANFRAGEN CRM
             ----------------------------------------------------------------------- */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs">
                <div className="mb-6 pb-6 border-b border-[#A09048]/20">
                  <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                    MIETANFRAGEN CRM
                  </h2>
                  <p className="text-xs sm:text-sm text-[#585828] mt-1">
                    Alle über das Registrierungsformular auf cvb-office.de eingegangenen Anträge von Wohnmobil-Vermietern.
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-3.5 text-[#A09048]" size={18} />
                    <input
                      type="text"
                      placeholder="Nach E-Mail, Notiz oder ID suchen..."
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-medium text-[#242E05] focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15 bg-white"
                    />
                    {searchEmail && (
                      <button
                        onClick={() => setSearchEmail('')}
                        className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 p-1.5 bg-[#F4F2E6] border border-[#A09048]/30 rounded-2xl text-xs overflow-x-auto shrink-0">
                    {[
                      { id: 'all', label: `Alle (${requests.length})` },
                      { id: 'neu', label: `Neu (${newRequestsCount})` },
                      { id: 'in_bearbeitung', label: `In Bearbeitung (${inProgressCount})` },
                      { id: 'erledigt', label: `Erledigt (${doneCount})` },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setStatusFilter(tab.id)}
                        className={`px-4 py-2 rounded-xl font-spartan font-bold uppercase tracking-wider text-xs transition-all cursor-pointer whitespace-nowrap ${
                          statusFilter === tab.id
                            ? 'bg-[#384808] text-white shadow-xs'
                            : 'text-[#585828] hover:text-[#384808]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#A09048]/25">
                  <table className="w-full text-left text-xs sm:text-sm font-body">
                    <thead className="bg-[#F4F2E6] border-b border-[#A09048]/25 text-[#384808] font-spartan font-black uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="px-5 py-4">Datum</th>
                        <th className="px-5 py-4">Vermieter / E-Mail</th>
                        <th className="px-5 py-4 text-center">Flotte</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Preiseinwilligung</th>
                        <th className="px-5 py-4 text-right">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                      {filteredRequests.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-14 text-center text-[#585828]">
                            Keine Anfragen gefunden.
                          </td>
                        </tr>
                      ) : (
                        filteredRequests.map((req) => (
                          <tr
                            key={req.id}
                            className="hover:bg-[#F9F8F3] transition-colors cursor-pointer"
                            onClick={() => {
                              setSelectedRequest(req);
                              setTempNote(req.notes || '');
                            }}
                          >
                            <td className="px-5 py-4 text-stone-500 whitespace-nowrap tabular-nums">
                              {req.created_at}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#242E05]">{req.email}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(req.email, req.id);
                                  }}
                                  className="text-[#A09048] hover:text-[#384808] p-1"
                                  title="E-Mail kopieren"
                                >
                                  {copiedEmail === req.id ? (
                                    <Check size={14} className="text-emerald-600" />
                                  ) : (
                                    <Copy size={14} />
                                  )}
                                </button>
                              </div>
                              {req.notes && (
                                <span className="text-[11px] text-stone-400 block truncate max-w-sm mt-0.5">
                                  Notiz: {req.notes}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-center">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F4F2E6] border border-[#A09048]/30 font-spartan font-black text-xs text-[#384808] tabular-nums">
                                <Car size={14} className="text-[#A09048]" />
                                <span>{req.vehicle_count} Wohnmobil(e)</span>
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-spartan font-bold uppercase tracking-wider ${
                                  req.status === 'neu'
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : req.status === 'in_bearbeitung'
                                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                }`}
                              >
                                {req.status === 'neu'
                                  ? 'Neu'
                                  : req.status === 'in_bearbeitung'
                                  ? 'In Bearbeitung'
                                  : 'Erledigt'}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                <CheckCircle size={13} />
                                <span>Bestätigt</span>
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRequest(req);
                                  setTempNote(req.notes || '');
                                }}
                                className="px-3.5 py-1.5 text-xs font-spartan font-bold uppercase tracking-wider text-[#384808] hover:bg-[#F4F2E6] rounded-xl border border-[#A09048]/30 transition-colors"
                              >
                                Details &amp; Notiz
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Request Detail Modal */}
              {selectedRequest && (
                <div
                  role="dialog"
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
                >
                  <div className="bg-[#F4F2E6] rounded-[32px] max-w-2xl w-full p-7 sm:p-10 shadow-2xl border-2 border-[#A09048]/40 max-h-[92vh] overflow-y-auto space-y-6 text-[#384808]">
                    <div className="flex justify-between items-start border-b border-[#A09048]/25 pb-4">
                      <div>
                        <span className="font-mono text-xs text-[#A09048] block mb-1">
                          Vorgang #{selectedRequest.id}
                        </span>
                        <h3 className="font-spartan font-black text-2xl uppercase tracking-tight text-[#242E05]">
                          ANFRAGE DETAILS
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="text-stone-400 hover:text-stone-800 p-2 text-xl font-bold leading-none cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4 text-sm font-body">
                      <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-[#A09048]/30 shadow-xs">
                        <div>
                          <span className="text-[11px] font-spartan font-bold uppercase tracking-wider text-[#585828] block">
                            E-Mail-Adresse
                          </span>
                          <span className="font-bold text-[#242E05] text-base">{selectedRequest.email}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-spartan font-bold uppercase tracking-wider text-[#585828] block">
                            Fahrzeugflotte
                          </span>
                          <span className="font-bold text-[#242E05] text-base">
                            {selectedRequest.vehicle_count} Wohnmobile
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-spartan font-bold uppercase tracking-wider text-[#585828] block">
                            Eingegangen am
                          </span>
                          <span className="font-medium text-stone-700">{selectedRequest.created_at}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-spartan font-bold uppercase tracking-wider text-[#585828] block">
                            Speicherung
                          </span>
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle size={14} /> In Datenbank gespeichert
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                          Bearbeitungsstatus
                        </label>
                        <select
                          value={selectedRequest.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            updateRequestStatus(selectedRequest.id, newStatus);
                            setSelectedRequest({ ...selectedRequest, status: newStatus });
                            showSaveNotice('Bearbeitungsstatus aktualisiert.');
                          }}
                          className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-bold bg-white text-[#242E05] focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        >
                          <option value="neu">Neu (Erfordert Kontaktaufnahme)</option>
                          <option value="in_bearbeitung">In Bearbeitung (Smarlps Zugang wird eingerichtet)</option>
                          <option value="erledigt">Erledigt (Zugangsdaten an Kunden übermittelt)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#585828] mb-1.5">
                          Bestätigte Preiseinwilligung (BGB Nachweis):
                        </label>
                        <div className="p-4 bg-white rounded-2xl border border-[#A09048]/30 text-xs text-[#585828] leading-relaxed italic">
                          „{selectedRequest.price_consent_text}“
                        </div>
                      </div>

                      <div>
                        <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                          Interne Notiz (nur für Dich als Administrator)
                        </label>
                        <textarea
                          rows={3}
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="z. B. Am 10.11. telefoniert. Möchte 5 Wohnmobile für 2026 einbinden..."
                          className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-xs sm:text-sm text-[#242E05] bg-white focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        />
                        <button
                          onClick={() => {
                            updateRequestNote(selectedRequest.id, tempNote);
                            showSaveNotice('Interne Notiz erfolgreich gespeichert.');
                          }}
                          className="mt-2 px-4 py-2 bg-[#384808] hover:bg-[#242E05] text-white text-xs font-spartan font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                        >
                          Notiz speichern
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-5 border-t border-[#A09048]/25">
                      <button
                        onClick={() => {
                          if (window.confirm('Diese Anfrage wirklich unwiderruflich löschen?')) {
                            deleteRequest(selectedRequest.id);
                            setSelectedRequest(null);
                            showSaveNotice('Anfrage gelöscht.');
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 size={15} />
                        <span>Anfrage löschen</span>
                      </button>

                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="px-5 py-2.5 bg-white hover:bg-stone-100 text-[#384808] border border-[#A09048]/30 rounded-2xl text-xs font-spartan font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Schließen
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------------
              LIVE HOMEPAGE SECTION TABS (SAME DESIGN AS HOMEPAGE + EDIT + UPDATE)
             ----------------------------------------------------------------------- */}
          {currentSection && (
            <div className="space-y-6">
              {/* Top Control Bar for this Section */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#A09048]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-1">
                    STARTSEITEN SEKTION {currentSection.num} / 11
                  </span>
                  <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                    {currentSection.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#585828] mt-1 font-body">
                    Originalgetreue Live-Vorschau. Klicke auf „Bearbeiten“, um Texte anzupassen, und auf „Aktualisieren“, um sie sofort auf die Startseite anzuwenden.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsEditDrawerOpen(!isEditDrawerOpen)}
                    className="tech-cta-ghost h-12 text-xs px-5 cursor-pointer"
                  >
                    <FileEdit size={16} className="text-[#A09048]" />
                    <span>{isEditDrawerOpen ? 'Editor schließen' : 'Sektion bearbeiten'}</span>
                  </button>

                  <button
                    onClick={() => handleUpdateAndApply(currentSection.label)}
                    className="tech-cta-primary h-12 text-xs px-5 cursor-pointer"
                  >
                    <span>AKTUALISIEREN &amp; ANWENDEN</span>
                    <span className="tech-ci w-8 h-8">
                      <RefreshCw size={14} />
                    </span>
                  </button>
                </div>
              </div>

              {/* Collapsible Edit Panel for this Specific Section */}
              {isEditDrawerOpen && (
                <div className="bg-[#F4F2E6] rounded-[32px] p-6 sm:p-8 border-2 border-[#A09048]/40 shadow-xl space-y-6 animate-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center justify-between border-b border-[#A09048]/25 pb-4">
                    <div>
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#384808] block mb-1">
                        SCHNELL-EDITOR
                      </span>
                      <h3 className="font-spartan font-black text-xl uppercase tracking-tight text-[#242E05]">
                        {currentSection.label} anpassen
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsEditDrawerOpen(false)}
                      className="p-2 text-stone-400 hover:text-stone-800 rounded-xl"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Section-Specific Inputs */}
                  <div className="space-y-4">
                    {/* HERO */}
                    {currentSection.id === 'section-hero' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                            Hauptüberschrift (H1)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.heroHeadline}
                            onChange={(e) => setContentDraft({ ...contentDraft, heroHeadline: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-base font-spartan font-black uppercase text-[#242E05] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                            Einführungstext (Subheadline)
                          </label>
                          <textarea
                            rows={3}
                            value={contentDraft.heroText}
                            onChange={(e) => setContentDraft({ ...contentDraft, heroText: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-body text-[#242E05] bg-white leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                            Vertrauenszeile (Kicker über dem Titel)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.trustLine}
                            onChange={(e) => setContentDraft({ ...contentDraft, trustLine: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-body text-[#242E05] bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                              Hero-Bildpfad
                            </label>
                            <input
                              type="text"
                              value={contentDraft.heroImage || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, heroImage: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-[#A09048]/35 text-xs font-mono bg-white"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                              Alt-Text für SEO
                            </label>
                            <input
                              type="text"
                              value={contentDraft.heroImageAlt || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, heroImageAlt: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-[#A09048]/35 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PROBLEM & SOLUTION */}
                    {currentSection.id === 'section-problem' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                            Abschnittsüberschrift
                          </label>
                          <input
                            type="text"
                            value={contentDraft.problemHeadline}
                            onChange={(e) => setContentDraft({ ...contentDraft, problemHeadline: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-base font-spartan font-black uppercase text-[#242E05] bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* FEATURES */}
                    {currentSection.id === 'section-features' && (
                      <div className="space-y-4">
                        <span className="font-spartan font-bold text-xs uppercase text-[#242E05] block">
                          Funktions-Karten bearbeiten ({features.length} Karten hinterlegt):
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {features.map((feat) => (
                            <div key={feat.id} className="p-4 bg-white rounded-2xl border border-[#A09048]/30 space-y-2">
                              <div className="flex items-center justify-between">
                                <input
                                  type="text"
                                  value={feat.title}
                                  onChange={(e) => updateFeature(feat.id, { title: e.target.value })}
                                  className="w-full px-2.5 py-1 text-xs font-spartan font-bold text-[#242E05] border border-stone-200 rounded-lg mr-2"
                                />
                                <button
                                  onClick={() => toggleFeatureVisibility(feat.id)}
                                  className="p-1 text-stone-400 hover:text-[#384808]"
                                  title={feat.visible ? 'Ausblenden' : 'Einblenden'}
                                >
                                  {feat.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                              </div>
                              <textarea
                                rows={2}
                                value={feat.text}
                                onChange={(e) => updateFeature(feat.id, { text: e.target.value })}
                                className="w-full px-2.5 py-1 text-xs text-[#585828] border border-stone-200 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2 BAUSTEINE */}
                    {currentSection.id === 'section-blocks' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                          <span className="font-spartan font-black text-xs uppercase text-[#384808] block">
                            BAUSTEIN A: FÜR DEINE MIETER
                          </span>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Titel Baustein A</label>
                            <input
                              type="text"
                              value={contentDraft.blockATitle}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockATitle: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-spartan font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Beschreibung A</label>
                            <textarea
                              rows={3}
                              value={contentDraft.blockAText}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockAText: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Bildpfad A</label>
                            <input
                              type="text"
                              value={contentDraft.blockAImage || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockAImage: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-mono"
                            />
                          </div>
                        </div>

                        <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                          <span className="font-spartan font-black text-xs uppercase text-[#A09048] block">
                            BAUSTEIN B: FÜR DICH ALS VERMIETER
                          </span>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Titel Baustein B</label>
                            <input
                              type="text"
                              value={contentDraft.blockBTitle}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBTitle: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-spartan font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Beschreibung B</label>
                            <textarea
                              rows={3}
                              value={contentDraft.blockBText}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBText: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Bildpfad B</label>
                            <input
                              type="text"
                              value={contentDraft.blockBImage || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBImage: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4 SCHRITTE */}
                    {currentSection.id === 'section-steps' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {steps.map((st) => (
                          <div key={st.id} className="p-4 bg-white rounded-2xl border border-[#A09048]/30 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#384808] text-white font-spartan font-black text-xs flex items-center justify-center shrink-0">
                                {st.number}
                              </span>
                              <input
                                type="text"
                                value={st.title}
                                onChange={(e) => updateStep(st.id, { title: e.target.value })}
                                className="w-full px-3 py-1 text-xs font-spartan font-bold text-[#242E05] border border-stone-200 rounded-lg"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={st.text}
                              onChange={(e) => updateStep(st.id, { text: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs text-[#585828] border border-stone-200 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* PREISE & TARIFE */}
                    {currentSection.id === 'section-prices' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Monatspreis netto pro Fahrzeug (€)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={priceDraft.monthlyNet}
                            onChange={(e) => setPriceDraft({ ...priceDraft, monthlyNet: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-base font-spartan font-black text-[#242E05] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Jahrespreis netto pro Fahrzeug (€)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={priceDraft.yearlyNet}
                            onChange={(e) => setPriceDraft({ ...priceDraft, yearlyNet: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-base font-spartan font-black text-[#242E05] bg-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Hinweistext zur Abrechnung
                          </label>
                          <textarea
                            rows={2}
                            value={priceDraft.noteText}
                            onChange={(e) => setPriceDraft({ ...priceDraft, noteText: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* FORM */}
                    {currentSection.id === 'section-form' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Formular-Überschrift
                          </label>
                          <input
                            type="text"
                            value={contentDraft.formHeading || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, formHeading: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-spartan font-bold text-[#242E05] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Einleitungstext
                          </label>
                          <textarea
                            rows={2}
                            value={contentDraft.formIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, formIntro: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* FAQ */}
                    {currentSection.id === 'section-faq' && (
                      <div className="space-y-3">
                        <span className="font-spartan font-bold text-xs uppercase text-[#242E05] block">
                          FAQ Fragen anpassen ({faqs.length} Fragen im System):
                        </span>
                        {faqs.map((f, i) => (
                          <div key={f.id} className="p-4 bg-white rounded-2xl border border-[#A09048]/30 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-[#A09048]">Frage {i + 1}</span>
                              <button
                                onClick={() => toggleFaqVisibility(f.id)}
                                className="p-1 text-stone-400 hover:text-[#384808]"
                                title={f.visible ? 'Ausblenden' : 'Einblenden'}
                              >
                                {f.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                            </div>
                            <input
                              type="text"
                              value={f.question}
                              onChange={(e) => updateFaq(f.id, { question: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs font-spartan font-bold text-[#242E05] border border-stone-200 rounded-lg"
                            />
                            <textarea
                              rows={2}
                              value={f.answer}
                              onChange={(e) => updateFaq(f.id, { answer: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs text-[#585828] border border-stone-200 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ABOUT */}
                    {currentSection.id === 'section-about' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Netzwerk-Beschreibung
                          </label>
                          <textarea
                            rows={3}
                            value={contentDraft.aboutText}
                            onChange={(e) => setContentDraft({ ...contentDraft, aboutText: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#242E05] bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                              Gründer &amp; Zitatgeber
                            </label>
                            <input
                              type="text"
                              value={contentDraft.aboutFounder}
                              onChange={(e) => setContentDraft({ ...contentDraft, aboutFounder: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#242E05] bg-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                              Kennzahl / Fakt
                            </label>
                            <input
                              type="text"
                              value={contentDraft.aboutFact}
                              onChange={(e) => setContentDraft({ ...contentDraft, aboutFact: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#242E05] bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* FOOTER */}
                    {currentSection.id === 'section-footer' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Kontakt-E-Mail
                          </label>
                          <input
                            type="email"
                            value={contentDraft.contactEmail || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, contactEmail: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Technologiepartner Notiz
                          </label>
                          <input
                            type="text"
                            value={contentDraft.partnerNote || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, partnerNote: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#A09048]/25">
                    <button
                      onClick={() => setIsEditDrawerOpen(false)}
                      className="px-5 py-2.5 bg-white text-stone-700 hover:bg-stone-100 rounded-xl text-xs font-bold border border-stone-300 cursor-pointer"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={() => handleUpdateAndApply(currentSection.label)}
                      className="tech-cta-primary h-11 text-xs px-5 cursor-pointer"
                    >
                      <span>AKTUALISIEREN &amp; ANWENDEN</span>
                      <span className="tech-ci w-7 h-7">
                        <Save size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* High-Fidelity Browser Mockup Frame (Live Home Component Render) */}
              <div className="rounded-[32px] border-2 border-[#A09048]/35 shadow-2xl overflow-hidden bg-white">
                {/* Mock Browser Header */}
                <div className="bg-[#242E05] px-6 py-3.5 border-b border-[#A09048]/30 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    <span className="ml-3 font-mono text-[11px] text-[#A09048] hidden sm:inline">
                      https://cvb-office.de/#{currentSection.id.replace('section-', '')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-spartan font-bold text-[11px] uppercase tracking-wider text-[#A09048]">
                      ORIGINAL HOMEPAGE DESIGN
                    </span>
                  </div>
                </div>

                {/* Live Component Render */}
                <div className="relative">
                  {currentSection.component}
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB: SYSTEM EINSTELLUNGEN
             ----------------------------------------------------------------------- */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs max-w-4xl space-y-6">
              <div className="pb-6 border-b border-[#A09048]/20">
                <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                  SYSTEM-EINSTELLUNGEN
                </h2>
                <p className="text-xs sm:text-sm text-[#585828] mt-1">
                  E-Mail-Benachrichtigungen, externe Verlinkungen und Systemkontrollen für cvb-office.de.
                </p>
              </div>

              <div className="space-y-5 font-body">
                <div>
                  <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                    Benachrichtigungs-E-Mail (Admin-Alarm)
                  </label>
                  <input
                    type="email"
                    value={settingsDraft.alertEmail}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, alertEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-medium bg-white"
                  />
                  <span className="text-[11px] text-[#585828] mt-1 block">
                    An diese Adresse wird Detlef unverzüglich informiert, sobald ein Vermieter ein Formular ausfüllt.
                  </span>
                </div>

                <div>
                  <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                    Smarlps Testphase-Link (Trial Link)
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.trialLink}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, trialLink: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-xs font-mono bg-white"
                  />
                  <span className="text-[11px] text-[#585828] mt-1 block">
                    Ziel-URL bei Klick auf „14 Tage kostenlos testen“ auf der Startseite.
                  </span>
                </div>

                <div>
                  <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                    CVB Hauptwebsite
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.cvbWebsiteLink}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, cvbWebsiteLink: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-medium bg-white"
                  />
                </div>

                <div>
                  <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                    Öffentliche Kontakt-E-Mail
                  </label>
                  <input
                    type="email"
                    value={settingsDraft.contactEmail}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, contactEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-medium bg-white"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[#A09048]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    if (window.confirm('Möchtest Du wirklich alle Inhalte auf die Standard-Texte zurücksetzen?')) {
                      resetAllToDefaults();
                      showSaveNotice('Inhalte auf Auslieferungszustand zurückgesetzt.');
                    }
                  }}
                  className="text-xs text-stone-400 hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Auf Standardinhalte zurücksetzen</span>
                </button>

                <button
                  onClick={() => {
                    updateGeneralSettings(settingsDraft);
                    showSaveNotice('System-Einstellungen erfolgreich gesichert.');
                  }}
                  className="tech-cta-primary h-11 text-xs px-5"
                >
                  <span>EINSTELLUNGEN SPEICHERN</span>
                  <span className="tech-ci w-7 h-7">
                    <Save size={14} />
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB: MEIN ADMIN-KONTO
             ----------------------------------------------------------------------- */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs max-w-2xl space-y-6">
              <div className="pb-6 border-b border-[#A09048]/20">
                <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                  ADMINISTRATOR PROFIL
                </h2>
                <p className="text-xs sm:text-sm text-[#585828] mt-1">
                  Sicherheitsangaben und Authentifizierung für Detlef Scheer.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F4F2E6] border border-[#A09048]/30 space-y-4 text-xs sm:text-sm font-body">
                <div className="flex items-center justify-between pb-3 border-b border-[#A09048]/25">
                  <span className="font-bold text-[#585828]">Angemeldeter Benutzer:</span>
                  <span className="font-spartan font-black text-sm text-[#242E05]">Detlef Scheer (Inhaber)</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-[#A09048]/25">
                  <span className="font-bold text-[#585828]">E-Mail-Adresse:</span>
                  <span className="font-mono text-[#384808]">detlef@caravan-vermieter-bund.de</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#585828]">Brute-Force-Schutz:</span>
                  <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                    <ShieldCheck size={16} /> Aktiv (15 Min. Sperre nach 5 Fehlversuchen)
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => showSaveNotice('Ein neuer Passwort-Link wurde an detlef@caravan-vermieter-bund.de gesendet.')}
                  className="tech-cta-ghost w-full justify-center h-12 text-xs"
                >
                  Neues Passwort per E-Mail anfordern
                </button>

                <button
                  onClick={logoutAdmin}
                  className="w-full py-3.5 px-4 rounded-full bg-red-50 text-red-700 hover:bg-red-100 text-xs font-spartan font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer border border-red-200"
                >
                  <LogOut size={16} />
                  <span>Aus dem Admin-Bereich abmelden</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
