'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Inbox,
  FileEdit,
  User,
  LogOut,
  Search,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  ChevronRight,
  KeyRound,
  Check,
  Car,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Clock,
  X,
  TrendingUp,
  RefreshCw,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Sliders,
  Settings,
  Image as ImageIcon,
  Plus,
} from 'lucide-react';

// Live Homepage Section Components
import { Header } from './Header';
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
    toggleFeatureVisibility,
    steps,
    updateStep,
    faqs,
    updateFaq,
    toggleFaqVisibility,
    resetAllToDefaults,
  } = useApp();

  // Active topbar navigation tab: 'dashboard' | 'requests' | 'content' | 'profile'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Currently opened section for editing in the Content Management drawer (null if none)
  const [editingSection, setEditingSection] = useState(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('detlef@caravan-vermieter-bund.de');
  const [loginPassword, setLoginPassword] = useState('cvb-office-2026');
  const [loginError, setLoginError] = useState(null);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  // Request CRM state
  const [searchEmail, setSearchEmail] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [tempNote, setTempNote] = useState('');

  // Save feedback state
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  const [showReloadDialog, setShowReloadDialog] = useState(false);

  // Local form drafts for editing
  const [contentDraft, setContentDraft] = useState(content);
  const [priceDraft, setPriceDraft] = useState(priceSettings);
  const [settingsDraft, setSettingsDraft] = useState(generalSettings);

  // Sync drafts whenever drawer opens
  useEffect(() => {
    if (editingSection) {
      setContentDraft(content);
      setPriceDraft(priceSettings);
      setSettingsDraft(generalSettings);
    }
  }, [editingSection, content, priceSettings, generalSettings]);

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showSaveNotice = (msg = 'Änderungen erfolgreich gespeichert.') => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Aggregated lead calculations
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
    updateGeneralSettings(settingsDraft);
    showSaveNotice(`${sectionName} erfolgreich aktualisiert und auf der Startseite angewendet!`);
    setEditingSection(null);
    setShowReloadDialog(true);
  };

  // Reload the public home page
  const handleReloadHomePage = () => {
    setShowReloadDialog(false);
    window.location.href = '/';
  };

  // Smooth scroll to section in Content Management mode
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -130;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Homepage sections registry
  const homepageSections = [
    { id: 'section-header', anchorId: 'sec-header', num: '00', label: 'Navbar & Ticker', title: 'Teil 00: Navbar & Top Sliding Bar', component: <Header /> },
    { id: 'section-hero', anchorId: 'sec-hero', num: '01', label: 'Hero-Bereich', title: 'Teil 1: Hero-Bereich (Kopfzeile)', component: <Hero /> },
    { id: 'section-problem', anchorId: 'sec-problem', num: '02', label: 'Problem & Lösung', title: 'Teil 2: Problem & Lösung', component: <ProblemSolution /> },
    { id: 'section-features', anchorId: 'sec-features', num: '03', label: 'Funktions-Module', title: 'Teil 3: Die 6 Funktions-Module', component: <Features /> },
    { id: 'section-blocks', anchorId: 'sec-blocks', num: '04', label: 'Die 2 Bausteine', title: 'Teil 4: Mieter-Einweisung & Cockpit', component: <BuildingBlocks /> },
    { id: 'section-steps', anchorId: 'sec-steps', num: '05', label: '4-Schritte-Ablauf', title: 'Teil 5: Der Ablauf in 4 Schritten', component: <HowItWorks /> },
    { id: 'section-audience', anchorId: 'sec-audience', num: '06', label: 'Vorteile & Zielgruppe', title: 'Teil 6 & 7: Zielgruppen & Vorteile', component: <BenefitsAudience /> },
    { id: 'section-prices', anchorId: 'sec-prices', num: '07', label: 'Preise & Tarife', title: 'Teil 8: Preis- & Testphasen-Box', component: <PriceTrialBox /> },
    { id: 'section-form', anchorId: 'sec-form', num: '08', label: 'Buchungsformular', title: 'Teil 9: Mietanfrage-Formular', component: <SignUpForm onOpenPrivacyModal={() => {}} /> },
    { id: 'section-faq', anchorId: 'sec-faq', num: '09', label: 'FAQ Wissensbasis', title: 'Teil 10: Häufig gestellte Fragen (FAQ)', component: <FaqAccordion /> },
    { id: 'section-about', anchorId: 'sec-about', num: '10', label: 'Über den CVB', title: 'Teil 11: Über den Caravan-Vermieter-Bund', component: <AboutCvb /> },
    { id: 'section-footer', anchorId: 'sec-footer', num: '11', label: 'Footer & Kontakt', title: 'Teil 12: Footer & Abschluss', component: <Footer onOpenImpressum={() => {}} onOpenPrivacy={() => {}} /> },
  ];

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
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-sm font-medium text-[#242E05] bg-white focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
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
    <div className="min-h-screen w-full bg-[#F8F7F0] text-[#384808] font-body flex flex-col antialiased selection:bg-[#A09048] selection:text-white">
      {/* =========================================================================
          1. ELEGANT FULL-WIDTH TOPBAR NAVIGATION (4 MAIN TABS)
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-[#A09048]/25 shadow-xs px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#384808] border-2 border-[#A09048] text-white flex items-center justify-center font-spartan font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-[#A09048]">CVB</span>
            </div>
            <div>
              <span className="font-spartan font-black text-lg sm:text-xl tracking-tight text-[#242E05] block leading-none">
                CVB-OFFICE<span className="text-[#A09048]">.</span>
              </span>
              <span className="text-[10px] font-bold text-[#A09048] tracking-widest uppercase block mt-0.5">
                ADMIN CENTER
              </span>
            </div>
          </div>
        </div>

        {/* The 4 Main Navigation Buttons (Center) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#F4F2E6] p-1.5 rounded-2xl border border-[#A09048]/25 shadow-xs">
          {/* 1. Dashboard */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setEditingSection(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-spartan font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#384808] text-white shadow-sm'
                : 'text-[#585828] hover:text-[#242E05] hover:bg-white/60'
            }`}
          >
            <LayoutDashboard size={16} className={activeTab === 'dashboard' ? 'text-[#A09048]' : 'text-[#585828]'} />
            <span>Dashboard</span>
          </button>

          {/* 2. Mietanfragen / Leads ("all those users") */}
          <button
            onClick={() => {
              setActiveTab('requests');
              setEditingSection(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-spartan font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-[#384808] text-white shadow-sm'
                : 'text-[#585828] hover:text-[#242E05] hover:bg-white/60'
            }`}
          >
            <Inbox size={16} className={activeTab === 'requests' ? 'text-[#A09048]' : 'text-[#585828]'} />
            <span>Mietanfragen</span>
            {newRequestsCount > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                  activeTab === 'requests' ? 'bg-[#A09048] text-[#172002]' : 'bg-[#384808] text-white'
                }`}
              >
                {newRequestsCount}
              </span>
            )}
          </button>

          {/* 3. Content Management (Live Homepage Editor) */}
          <button
            onClick={() => {
              setActiveTab('content');
              setEditingSection(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-spartan font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-[#384808] text-white shadow-sm'
                : 'text-[#585828] hover:text-[#242E05] hover:bg-white/60'
            }`}
          >
            <Layers size={16} className={activeTab === 'content' ? 'text-[#A09048]' : 'text-[#585828]'} />
            <span>Content Management</span>
          </button>

          {/* 4. Admin Profile */}
          <button
            onClick={() => {
              setActiveTab('profile');
              setEditingSection(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-spartan font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#384808] text-white shadow-sm'
                : 'text-[#585828] hover:text-[#242E05] hover:bg-white/60'
            }`}
          >
            <User size={16} className={activeTab === 'profile' ? 'text-[#A09048]' : 'text-[#585828]'} />
            <span>Admin-Profil</span>
          </button>
        </nav>

        {/* Right Action Controls: Public Website & Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('public')}
            className="tech-cta-primary h-10 text-xs px-3 sm:px-4 cursor-pointer"
            title="Öffentliche Website im neuen Tab ansehen"
          >
            <span className="hidden sm:inline">LIVE-WEBSITE</span>
            <span className="sm:hidden">LIVE</span>
            <span className="tech-ci w-6 h-6">
              <ArrowUpRight size={13} />
            </span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-2.5 text-[#585828] hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-[#A09048]/20"
            title="Sicher abmelden"
          >
            <LogOut size={17} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-[#A09048]/30 text-[#384808]"
          >
            <Sliders size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Topbar Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4F2E6] border-b border-[#A09048]/30 p-4 space-y-2 animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-spartan font-black text-xs uppercase ${
              activeTab === 'dashboard' ? 'bg-[#384808] text-white' : 'bg-white text-[#242E05]'
            }`}
          >
            <span>Dashboard</span>
            <LayoutDashboard size={16} />
          </button>

          <button
            onClick={() => {
              setActiveTab('requests');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-spartan font-black text-xs uppercase ${
              activeTab === 'requests' ? 'bg-[#384808] text-white' : 'bg-white text-[#242E05]'
            }`}
          >
            <span>Mietanfragen ({requests.length})</span>
            <Inbox size={16} />
          </button>

          <button
            onClick={() => {
              setActiveTab('content');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-spartan font-black text-xs uppercase ${
              activeTab === 'content' ? 'bg-[#384808] text-white' : 'bg-white text-[#242E05]'
            }`}
          >
            <span>Content Management</span>
            <Layers size={16} />
          </button>

          <button
            onClick={() => {
              setActiveTab('profile');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-spartan font-black text-xs uppercase ${
              activeTab === 'profile' ? 'bg-[#384808] text-white' : 'bg-white text-[#242E05]'
            }`}
          >
            <span>Admin-Profil</span>
            <User size={16} />
          </button>
        </div>
      )}

      {/* Floating Save Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed top-20 right-6 sm:right-10 z-50 bg-[#384808] text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-200 text-sm font-bold border-2 border-[#A09048]">
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
                Möchtest Du die Startseite neu laden, um das Ergebnis sofort im Browser zu überprüfen?
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
          2. TAB 1: DASHBOARD
         ========================================================================= */}
      {activeTab === 'dashboard' && (
        <main className="flex-1 w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 py-8 space-y-8 animate-in fade-in duration-200">
          {/* Executive Welcome Card */}
          <div className="bg-[#F4F2E6] p-7 sm:p-10 rounded-[32px] border border-[#A09048]/35 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#A09048]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="font-spartan font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#242E05]">
                  WILLKOMMEN, DETLEF<span className="text-[#889028]">.</span>
                </h1>
                <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed mt-2 max-w-2xl font-body">
                  Über die obere Navigation gelangst Du direkt zu den <strong>Mietanfragen</strong> oder in das <strong>Content Management</strong>, um die gesamte Startseite live zu scrollen, anzupassen und mit einem Klick zu aktualisieren.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('content')}
                  className="tech-cta-primary h-12 text-xs cursor-pointer"
                >
                  <span>ZUM CONTENT MANAGEMENT</span>
                  <span className="tech-ci">
                    <Layers size={16} />
                  </span>
                </button>
              </div>
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
                <span>Müssen noch kontaktiert werden</span>
              </div>
            </div>

            <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
              <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                02
              </span>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">
                    IN EINRICHTUNG
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
                    ABGESCHLOSSEN
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
                <span>Zugang übermittelt &amp; aktiv</span>
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
                Über alle {requests.length} Vermieter erfasst
              </div>
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
                className="tech-cta-ghost h-10 text-xs px-4 cursor-pointer"
              >
                <span>Alle {requests.length} Anfragen im CRM verwalten</span>
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
                          Öffnen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          3. TAB 2: MIETANFRAGEN CRM ("ALL THOSE USERS")
         ========================================================================= */}
      {activeTab === 'requests' && (
        <main className="flex-1 w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 py-8 space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs">
            <div className="mb-6 pb-6 border-b border-[#A09048]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                  MIETANFRAGEN CRM
                </h2>
                <p className="text-xs sm:text-sm text-[#585828] mt-1 font-body">
                  Alle über das Registrierungsformular eingegangenen Anfragen von Wohnmobil-Vermietern mit Preisbestätigung.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-[#F4F2E6] border border-[#A09048]/30 rounded-xl font-spartan font-black text-xs uppercase text-[#384808]">
                  {requests.length} Anfragen im System
                </span>
              </div>
            </div>

            {/* Search & Filters */}
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

            {/* Inquiries Table */}
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
                      <td colSpan={6} className="px-6 py-12 text-center text-stone-400">
                        Keine Anfragen gefunden, die den Suchkriterien entsprechen.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => (
                      <tr
                        key={req.id}
                        onClick={() => {
                          setSelectedRequest(req);
                          setTempNote(req.notes || '');
                        }}
                        className="hover:bg-[#F9F8F3] transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-4 text-stone-500 whitespace-nowrap tabular-nums">
                          {req.created_at}
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-bold text-[#242E05] block">{req.email}</span>
                          {req.notes && (
                            <span className="text-[11px] text-stone-400 block truncate max-w-sm mt-0.5">
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
                        <td className="px-5 py-4 text-xs text-stone-500 max-w-xs truncate">
                          {req.price_consent_text}
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
                            Details
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
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
              <div className="bg-[#F4F2E6] rounded-[32px] p-6 sm:p-9 max-w-xl w-full border-2 border-[#A09048] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
                <div className="flex items-start justify-between border-b border-[#A09048]/25 pb-4">
                  <div>
                    <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-1">
                      ANFRAGE-DETAILS
                    </span>
                    <h3 className="font-spartan font-black text-xl uppercase tracking-tight text-[#242E05]">
                      {selectedRequest.email}
                    </h3>
                    <span className="text-xs text-stone-500">
                      Eingegangen am {selectedRequest.created_at} (ID: {selectedRequest.id})
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-[#A09048]/30">
                      <span className="text-[11px] font-bold text-[#585828] uppercase tracking-wider block">
                        Flottengröße
                      </span>
                      <span className="font-spartan font-black text-2xl text-[#242E05] mt-1 block">
                        {selectedRequest.vehicle_count} Wohnmobile
                      </span>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#A09048]/30">
                      <span className="text-[11px] font-bold text-[#585828] uppercase tracking-wider block">
                        Preismodell
                      </span>
                      <span className="font-spartan font-black text-lg text-[#384808] mt-1 block">
                        {priceSettings.monthlyNet.toFixed(2)} € / Fzg.
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
        </main>
      )}

      {/* =========================================================================
          4. TAB 3: CONTENT MANAGEMENT (LIVE HOMEPAGE FLOW + INLINE CONTROLS)
         ========================================================================= */}
      {activeTab === 'content' && (
        <div className="w-full flex-1 flex flex-col relative animate-in fade-in duration-200">
          {/* Full Continuous Homepage View */}
          <div className="w-full bg-white relative">
            {homepageSections.map((sec) => (
              <div
                key={sec.id}
                id={sec.anchorId}
                className="relative group transition-all"
              >
                {/* Floating Edit Button: Only edit button shows on each section top right */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-8 z-30 pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => setEditingSection(sec.id)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#242E05]/95 hover:bg-[#384808] text-white hover:text-[#F4F2E6] border border-[#A09048] shadow-2xl backdrop-blur-md font-spartan font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 hover:scale-105 cursor-pointer group/btn"
                    title={`${sec.label} bearbeiten`}
                  >
                    <FileEdit size={13} className="text-[#A09048] group-hover/btn:rotate-12 transition-transform" />
                    <span>Bearbeiten</span>
                  </button>
                </div>

                {/* The Real Homepage Component Rendered With Live AppContext Binding */}
                <div className="relative">
                  {sec.component}
                </div>
              </div>
            ))}
          </div>

          {/* Slide-out Edit Drawer For The Selected Section */}
          {editingSection && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="w-full max-w-2xl bg-[#F4F2E6] h-full shadow-2xl flex flex-col border-l-2 border-[#A09048] animate-in slide-in-from-right duration-300">
                {/* Drawer Header with Update and Close Actions */}
                <div className="p-6 bg-[#242E05] text-white flex items-center justify-between border-b border-[#A09048]/30">
                  <div>
                    <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-1">
                      SEKTION BEARBEITEN
                    </span>
                    <h3 className="font-spartan font-black text-xl uppercase tracking-tight text-white">
                      {homepageSections.find((s) => s.id === editingSection)?.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const sec = homepageSections.find((s) => s.id === editingSection);
                        handleUpdateAndApply(sec ? sec.label : 'Sektion');
                      }}
                      className="px-3.5 py-1.5 bg-[#A09048] hover:bg-[#8D7F3E] text-[#172002] rounded-xl text-xs font-spartan font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                      title="Änderungen jetzt anwenden"
                    >
                      <Check size={13} strokeWidth={3} />
                      <span>Aktualisieren</span>
                    </button>
                    <button
                      onClick={() => setEditingSection(null)}
                      className="p-2 text-stone-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Drawer Form Body */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                  {/* NAVBAR & TOP SLIDING TICKER BAR */}
                  {editingSection === 'section-header' && (
                    <div className="space-y-6">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#A09048]/20">
                          <div>
                            <span className="font-spartan font-black text-sm uppercase text-[#242E05] block">
                              Top Sliding Bar (Laufband-Ankündigung)
                            </span>
                            <span className="text-xs text-[#585828]">
                              Schlankes goldenes Laufband oberhalb der Navigationsleiste
                            </span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={contentDraft.tickerVisible !== false}
                              onChange={(e) => setContentDraft({ ...contentDraft, tickerVisible: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#384808]"></div>
                          </label>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05]">
                              Laufband-Texte (Nachrichten im Ticker)
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const currentItems = contentDraft.tickerItems || [
                                  'OFFIZIELLES DIGITALES VERMIET-OFFICE DES CARAVAN-VERMIETER-BUND (CVB)',
                                  '14 TAGE VOLLSTÄNDIG KOSTENLOS TESTEN',
                                  'NUR 8,33 € NETTO PRO FAHRZEUG & MONAT',
                                  'SMARLPS GO! // 100 % DSGVO IN DEUTSCHLAND',
                                ];
                                setContentDraft({
                                  ...contentDraft,
                                  tickerItems: [...currentItems, 'NEUE ANKÜNDIGUNG EINGEBEN'],
                                });
                              }}
                              className="text-xs font-spartan font-bold uppercase tracking-wider text-[#384808] hover:text-[#A09048] flex items-center gap-1 cursor-pointer"
                            >
                              + Text hinzufügen
                            </button>
                          </div>

                          {(contentDraft.tickerItems || [
                            'OFFIZIELLES DIGITALES VERMIET-OFFICE DES CARAVAN-VERMIETER-BUND (CVB)',
                            '14 TAGE VOLLSTÄNDIG KOSTENLOS TESTEN',
                            'NUR 8,33 € NETTO PRO FAHRZEUG & MONAT',
                            'SMARLPS GO! // 100 % DSGVO IN DEUTSCHLAND',
                          ]).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#A09048] w-6 shrink-0">
                                {idx + 1}.
                              </span>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const list = [...(contentDraft.tickerItems || [
                                    'OFFIZIELLES DIGITALES VERMIET-OFFICE DES CARAVAN-VERMIETER-BUND (CVB)',
                                    '14 TAGE VOLLSTÄNDIG KOSTENLOS TESTEN',
                                    'NUR 8,33 € NETTO PRO FAHRZEUG & MONAT',
                                    'SMARLPS GO! // 100 % DSGVO IN DEUTSCHLAND',
                                  ])];
                                  list[idx] = e.target.value;
                                  setContentDraft({ ...contentDraft, tickerItems: list });
                                }}
                                className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white focus:outline-none focus:border-[#384808]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...(contentDraft.tickerItems || [
                                    'OFFIZIELLES DIGITALES VERMIET-OFFICE DES CARAVAN-VERMIETER-BUND (CVB)',
                                    '14 TAGE VOLLSTÄNDIG KOSTENLOS TESTEN',
                                    'NUR 8,33 € NETTO PRO FAHRZEUG & MONAT',
                                    'SMARLPS GO! // 100 % DSGVO IN DEUTSCHLAND',
                                  ])];
                                  if (list.length > 1) {
                                    list.splice(idx, 1);
                                    setContentDraft({ ...contentDraft, tickerItems: list });
                                  } else {
                                    alert('Mindestens eine Nachricht muss im Laufband verbleiben.');
                                  }
                                }}
                                className="p-2 text-stone-400 hover:text-red-600 rounded-lg cursor-pointer"
                                title="Nachricht entfernen"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-sm uppercase text-[#242E05] block pb-2 border-b border-[#A09048]/20">
                          Navbar Buttons &amp; Verlinkungen
                        </span>

                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                            Button-Text für Testphase (Pill Button)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.navCtaText || '14 Tage testen'}
                            onChange={(e) => setContentDraft({ ...contentDraft, navCtaText: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                            Smarlps Testphase Ziel-URL (Trial Link)
                          </label>
                          <input
                            type="url"
                            value={settingsDraft.trialLink}
                            onChange={(e) => setSettingsDraft({ ...settingsDraft, trialLink: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-mono bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* HERO */}
                  {editingSection === 'section-hero' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Titelzeilen &amp; Hauptkicker
                        </span>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Vertrauenszeile (Kicker über dem Titel)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.trustLine || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, trustLine: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-[#242E05] bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                              Titel Präfix
                            </label>
                            <input
                              type="text"
                              value={contentDraft.heroTitlePrefix || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, heroTitlePrefix: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-bold text-[#242E05] bg-white"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                              Titel Highlight (Gold)
                            </label>
                            <input
                              type="text"
                              value={contentDraft.heroTitleHighlight || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, heroTitleHighlight: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-bold text-[#A09048] bg-white"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                              Titel Suffix
                            </label>
                            <input
                              type="text"
                              value={contentDraft.heroTitleSuffix || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, heroTitleSuffix: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-bold text-[#242E05] bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Einführungstext (Subheadline)
                          </label>
                          <textarea
                            rows={3}
                            value={contentDraft.heroText || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, heroText: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-body text-[#242E05] bg-white leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Hero Image & Alt Text with Thumbnail Preview */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Hero Hintergrundbild &amp; SEO Alt-Text
                        </span>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-xl bg-stone-100 border border-stone-300 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                            {contentDraft.heroImage ? (
                              <img src={contentDraft.heroImage} alt={contentDraft.heroImageAlt || 'Vorschau'} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={24} className="text-stone-400" />
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <label className="block font-spartan font-bold text-[11px] uppercase tracking-wider text-[#242E05] mb-1">
                                Bildpfad (URL oder /images/...)
                              </label>
                              <input
                                type="text"
                                value={contentDraft.heroImage || ''}
                                onChange={(e) => setContentDraft({ ...contentDraft, heroImage: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-white"
                              />
                            </div>
                            <div>
                              <label className="block font-spartan font-bold text-[11px] uppercase tracking-wider text-[#242E05] mb-1">
                                SEO Alt-Text (Barrierefreiheit &amp; Google)
                              </label>
                              <input
                                type="text"
                                value={contentDraft.heroImageAlt || ''}
                                onChange={(e) => setContentDraft({ ...contentDraft, heroImageAlt: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3 Check Badges */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          3 Feature-Badges unter dem Intro
                        </span>
                        {(contentDraft.heroBadges || [
                          'Website-Buchungswidget',
                          'Digitale Verträge als PDF',
                          'Vorab-Einweisung per QR & Video',
                        ]).map((badge, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#384808] text-white font-spartan font-black text-xs flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <input
                              type="text"
                              value={badge}
                              onChange={(e) => {
                                const list = [...(contentDraft.heroBadges || [
                                  'Website-Buchungswidget',
                                  'Digitale Verträge als PDF',
                                  'Vorab-Einweisung per QR & Video',
                                ])];
                                list[bIdx] = e.target.value;
                                setContentDraft({ ...contentDraft, heroBadges: list });
                              }}
                              className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-[#242E05] bg-white"
                            />
                          </div>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Buttons &amp; Call-to-Action
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                              Haupt-Button (Primary CTA)
                            </label>
                            <input
                              type="text"
                              value={contentDraft.heroCtaPrimary || 'CVB-Office anfragen'}
                              onChange={(e) => setContentDraft({ ...contentDraft, heroCtaPrimary: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                              Zweit-Button (Secondary CTA)
                            </label>
                            <input
                              type="text"
                              value={contentDraft.heroCtaSecondary || '14 Tage kostenlos testen'}
                              onChange={(e) => setContentDraft({ ...contentDraft, heroCtaSecondary: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 4 Trust Items */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          4 Sicherheits- &amp; Vertrauenspunkte (Trust Bar)
                        </span>
                        {(contentDraft.heroTrustItems || [
                          { title: 'Serverstandort Deutschland', subtitle: 'Hosting in Frankfurt am Main · Höchste Ausfallsicherheit' },
                          { title: '100 % DSGVO-konform', subtitle: 'Keine Datenweitergabe · Verschlüsselte Übertragung' },
                          { title: 'Rechtssichere BGB-Muster', subtitle: 'Speziell für Reisemobil- & Caravan-Vermietung' },
                          { title: 'Offizieller CVB-Standard', subtitle: 'Entwickelt von Vermietern für Vermieter' },
                        ]).map((item, tIdx) => (
                          <div key={tIdx} className="p-3 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#A09048] w-6 shrink-0">
                                0{tIdx + 1}.
                              </span>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => {
                                  const list = [...(contentDraft.heroTrustItems || [
                                    { title: 'Serverstandort Deutschland', subtitle: 'Hosting in Frankfurt am Main · Höchste Ausfallsicherheit' },
                                    { title: '100 % DSGVO-konform', subtitle: 'Keine Datenweitergabe · Verschlüsselte Übertragung' },
                                    { title: 'Rechtssichere BGB-Muster', subtitle: 'Speziell für Reisemobil- & Caravan-Vermietung' },
                                    { title: 'Offizieller CVB-Standard', subtitle: 'Entwickelt von Vermietern für Vermieter' },
                                  ])];
                                  list[tIdx] = { ...list[tIdx], title: e.target.value };
                                  setContentDraft({ ...contentDraft, heroTrustItems: list });
                                }}
                                placeholder="Titel"
                                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                              />
                            </div>
                            <input
                              type="text"
                              value={item.subtitle}
                              onChange={(e) => {
                                const list = [...(contentDraft.heroTrustItems || [
                                  { title: 'Serverstandort Deutschland', subtitle: 'Hosting in Frankfurt am Main · Höchste Ausfallsicherheit' },
                                  { title: '100 % DSGVO-konform', subtitle: 'Keine Datenweitergabe · Verschlüsselte Übertragung' },
                                  { title: 'Rechtssichere BGB-Muster', subtitle: 'Speziell für Reisemobil- & Caravan-Vermietung' },
                                  { title: 'Offizieller CVB-Standard', subtitle: 'Entwickelt von Vermietern für Vermieter' },
                                ])];
                                list[tIdx] = { ...list[tIdx], subtitle: e.target.value };
                                setContentDraft({ ...contentDraft, heroTrustItems: list });
                              }}
                              placeholder="Untertitel / Beschreibung"
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-[#585828] bg-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PROBLEM & SOLUTION */}
                  {editingSection === 'section-problem' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Kopfbereich &amp; Texte
                        </span>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Sektions-Tag
                          </label>
                          <input
                            type="text"
                            value={contentDraft.problemTag || 'HERAUSFORDERUNG & LÖSUNG'}
                            onChange={(e) => setContentDraft({ ...contentDraft, problemTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                              Hauptüberschrift Zeile 1
                            </label>
                            <input
                              type="text"
                              value={contentDraft.problemHeadline || 'Vermietung kostet Zeit.'}
                              onChange={(e) => setContentDraft({ ...contentDraft, problemHeadline: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase text-[#242E05] bg-white"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                              Unterzeile (Gold)
                            </label>
                            <input
                              type="text"
                              value={contentDraft.problemSubheadline || 'CVB-Office gibt sie Dir zurück.'}
                              onChange={(e) => setContentDraft({ ...contentDraft, problemSubheadline: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase text-[#889028] bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Einführungstext (Rechte Spalte)
                          </label>
                          <textarea
                            rows={3}
                            value={contentDraft.problemIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, problemIntro: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Spalten-Titel
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-red-600 mb-1">
                              Linke Spalte (Problem)
                            </label>
                            <input
                              type="text"
                              value={contentDraft.problemColLeft || 'BISHERIGE VERMIETPRAXIS'}
                              onChange={(e) => setContentDraft({ ...contentDraft, problemColLeft: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#889028] mb-1">
                              Rechte Spalte (Lösung)
                            </label>
                            <input
                              type="text"
                              value={contentDraft.problemColRight || 'MIT DEM CVB-OFFICE'}
                              onChange={(e) => setContentDraft({ ...contentDraft, problemColRight: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 1-to-1 Problem & Solution Items */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#A09048]/20">
                          <span className="font-spartan font-black text-xs uppercase text-[#384808]">
                            1-zu-1 Problem &amp; Lösungs-Paare ({(contentDraft.problems || []).length} Paare)
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const p = [...(contentDraft.problems || [])];
                              const s = [...(contentDraft.solutions || [])];
                              p.push('Neues Praxisproblem eingeben');
                              s.push('Passende digitale CVB-Lösung eingeben');
                              setContentDraft({ ...contentDraft, problems: p, solutions: s });
                            }}
                            className="text-xs font-spartan font-bold uppercase text-[#384808] hover:text-[#A09048] flex items-center gap-1 cursor-pointer"
                          >
                            + Paar hinzufügen
                          </button>
                        </div>

                        {(contentDraft.problems || []).map((prob, idx) => (
                          <div key={idx} className="p-3 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-[#A09048]">Paar {idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const p = [...(contentDraft.problems || [])];
                                  const s = [...(contentDraft.solutions || [])];
                                  if (p.length > 1) {
                                    p.splice(idx, 1);
                                    s.splice(idx, 1);
                                    setContentDraft({ ...contentDraft, problems: p, solutions: s });
                                  } else {
                                    alert('Mindestens ein Problem-Lösungs-Paar muss erhalten bleiben.');
                                  }
                                }}
                                className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                                title="Paar entfernen"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-red-600 mb-0.5">Problem (Rot):</label>
                              <input
                                type="text"
                                value={prob}
                                onChange={(e) => {
                                  const p = [...(contentDraft.problems || [])];
                                  p[idx] = e.target.value;
                                  setContentDraft({ ...contentDraft, problems: p });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-[#585828]"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-[#384808] mb-0.5">Lösung (Grün):</label>
                              <input
                                type="text"
                                value={(contentDraft.solutions || [])[idx] || ''}
                                onChange={(e) => {
                                  const s = [...(contentDraft.solutions || [])];
                                  s[idx] = e.target.value;
                                  setContentDraft({ ...contentDraft, solutions: s });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-[#242E05] font-semibold"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Note & CTA */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Abschlusszeile &amp; Button
                        </span>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Hinweistext unten
                          </label>
                          <input
                            type="text"
                            value={contentDraft.problemBottomNote || 'Alle Abläufe von der ersten Anfrage bis zur Übergabe in einem zentralen System.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, problemBottomNote: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-[#242E05] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Button-Text
                          </label>
                          <input
                            type="text"
                            value={contentDraft.problemBottomCta || 'Jetzt umsteigen'}
                            onChange={(e) => setContentDraft({ ...contentDraft, problemBottomCta: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FEATURES */}
                  {editingSection === 'section-features' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Kopfbereich &amp; Texte
                        </span>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Sektions-Tag
                          </label>
                          <input
                            type="text"
                            value={contentDraft.featuresTag || 'HAUPTFUNKTIONEN & SYSTEM'}
                            onChange={(e) => setContentDraft({ ...contentDraft, featuresTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Hauptüberschrift
                          </label>
                          <input
                            type="text"
                            value={contentDraft.featuresHeadline || 'DIE KOMPLETTLÖSUNG FÜR VERMIETER IM BUND.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, featuresHeadline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase text-[#242E05] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            Einführungstext
                          </label>
                          <textarea
                            rows={3}
                            value={contentDraft.featuresIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, featuresIntro: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1">
                            CTA-Button Text
                          </label>
                          <input
                            type="text"
                            value={contentDraft.featuresCta || 'CVB-Office anfragen'}
                            onChange={(e) => setContentDraft({ ...contentDraft, featuresCta: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                          />
                        </div>
                      </div>

                      {/* 3 Spotlight Photo Cards */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          3 Spotlight Fotokarten (Obere Reihe)
                        </span>
                        {(contentDraft.featuresSpotlightModules || [
                          { num: '1', title: 'Flotten-Cockpit', desc: 'Alle Buchungen, Termine und Fahrzeugzustände in Echtzeit an einem zentralen Ort.', image: '/images/luxury_cockpit_tablet.jpg', imageAlt: 'Flotten-Cockpit Übersicht' },
                          { num: '2', title: 'Digitaler Vertrag', desc: 'Geprüfte Mietverträge papierlos direkt digital unterschreiben & rechtssicher archivieren.', image: '/images/hero_motorhome_handover.jpg', imageAlt: 'Schlüsselübergabe' },
                          { num: '3', title: 'Online-Buchungswidget', desc: 'Live-Verfügbarkeiten & provisionsfreie Direktanfragen auf Deiner eigenen Domain.', image: '/images/camper_digital_cockpit.jpg', imageAlt: 'Buchungskalender' },
                        ]).map((mod, mIdx) => (
                          <div key={mIdx} className="p-4 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#384808] text-white font-spartan font-black text-xs flex items-center justify-center shrink-0">
                                {mIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={mod.title}
                                onChange={(e) => {
                                  const list = [...(contentDraft.featuresSpotlightModules || [
                                    { num: '1', title: 'Flotten-Cockpit', desc: 'Alle Buchungen, Termine und Fahrzeugzustände in Echtzeit an einem zentralen Ort.', image: '/images/luxury_cockpit_tablet.jpg', imageAlt: 'Flotten-Cockpit Übersicht' },
                                    { num: '2', title: 'Digitaler Vertrag', desc: 'Geprüfte Mietverträge papierlos direkt digital unterschreiben & rechtssicher archivieren.', image: '/images/hero_motorhome_handover.jpg', imageAlt: 'Schlüsselübergabe' },
                                    { num: '3', title: 'Online-Buchungswidget', desc: 'Live-Verfügbarkeiten & provisionsfreie Direktanfragen auf Deiner eigenen Domain.', image: '/images/camper_digital_cockpit.jpg', imageAlt: 'Buchungskalender' },
                                  ])];
                                  list[mIdx] = { ...list[mIdx], title: e.target.value };
                                  setContentDraft({ ...contentDraft, featuresSpotlightModules: list });
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-spartan font-bold text-[#242E05] bg-white"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={mod.desc}
                              onChange={(e) => {
                                const list = [...(contentDraft.featuresSpotlightModules || [
                                  { num: '1', title: 'Flotten-Cockpit', desc: 'Alle Buchungen, Termine und Fahrzeugzustände in Echtzeit an einem zentralen Ort.', image: '/images/luxury_cockpit_tablet.jpg', imageAlt: 'Flotten-Cockpit Übersicht' },
                                  { num: '2', title: 'Digitaler Vertrag', desc: 'Geprüfte Mietverträge papierlos direkt digital unterschreiben & rechtssicher archivieren.', image: '/images/hero_motorhome_handover.jpg', imageAlt: 'Schlüsselübergabe' },
                                  { num: '3', title: 'Online-Buchungswidget', desc: 'Live-Verfügbarkeiten & provisionsfreie Direktanfragen auf Deiner eigenen Domain.', image: '/images/camper_digital_cockpit.jpg', imageAlt: 'Buchungskalender' },
                                ])];
                                list[mIdx] = { ...list[mIdx], desc: e.target.value };
                                setContentDraft({ ...contentDraft, featuresSpotlightModules: list });
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-[#585828] bg-white"
                            />
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-lg bg-stone-100 border border-stone-300 overflow-hidden shrink-0 flex items-center justify-center">
                                {mod.image ? (
                                  <img src={mod.image} alt={mod.imageAlt || mod.title} className="w-full h-full object-cover" />
                                ) : (
                                  <ImageIcon size={18} className="text-stone-400" />
                                )}
                              </div>
                              <div className="flex-1 space-y-1.5">
                                <input
                                  type="text"
                                  value={mod.image || ''}
                                  onChange={(e) => {
                                    const list = [...(contentDraft.featuresSpotlightModules || [
                                      { num: '1', title: 'Flotten-Cockpit', desc: 'Alle Buchungen, Termine und Fahrzeugzustände in Echtzeit an einem zentralen Ort.', image: '/images/luxury_cockpit_tablet.jpg', imageAlt: 'Flotten-Cockpit Übersicht' },
                                      { num: '2', title: 'Digitaler Vertrag', desc: 'Geprüfte Mietverträge papierlos direkt digital unterschreiben & rechtssicher archivieren.', image: '/images/hero_motorhome_handover.jpg', imageAlt: 'Schlüsselübergabe' },
                                      { num: '3', title: 'Online-Buchungswidget', desc: 'Live-Verfügbarkeiten & provisionsfreie Direktanfragen auf Deiner eigenen Domain.', image: '/images/camper_digital_cockpit.jpg', imageAlt: 'Buchungskalender' },
                                    ])];
                                    list[mIdx] = { ...list[mIdx], image: e.target.value };
                                    setContentDraft({ ...contentDraft, featuresSpotlightModules: list });
                                  }}
                                  placeholder="Bildpfad (/images/...)"
                                  className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-mono bg-white"
                                />
                                <input
                                  type="text"
                                  value={mod.imageAlt || ''}
                                  onChange={(e) => {
                                    const list = [...(contentDraft.featuresSpotlightModules || [
                                      { num: '1', title: 'Flotten-Cockpit', desc: 'Alle Buchungen, Termine und Fahrzeugzustände in Echtzeit an einem zentralen Ort.', image: '/images/luxury_cockpit_tablet.jpg', imageAlt: 'Flotten-Cockpit Übersicht' },
                                      { num: '2', title: 'Digitaler Vertrag', desc: 'Geprüfte Mietverträge papierlos direkt digital unterschreiben & rechtssicher archivieren.', image: '/images/hero_motorhome_handover.jpg', imageAlt: 'Schlüsselübergabe' },
                                      { num: '3', title: 'Online-Buchungswidget', desc: 'Live-Verfügbarkeiten & provisionsfreie Direktanfragen auf Deiner eigenen Domain.', image: '/images/camper_digital_cockpit.jpg', imageAlt: 'Buchungskalender' },
                                    ])];
                                    list[mIdx] = { ...list[mIdx], imageAlt: e.target.value };
                                    setContentDraft({ ...contentDraft, featuresSpotlightModules: list });
                                  }}
                                  placeholder="Bild Alt-Text"
                                  className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs bg-white"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Carousel Features */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Karussell Systemkarten ({features.length} Karten)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-[11px] font-bold text-[#242E05] mb-1">Karussell Tag</label>
                            <input
                              type="text"
                              value={contentDraft.featuresCarouselTag || 'WEITERE SYSTEMLEISTUNGEN'}
                              onChange={(e) => setContentDraft({ ...contentDraft, featuresCarouselTag: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-[#242E05] mb-1">Karussell Titel</label>
                            <input
                              type="text"
                              value={contentDraft.featuresCarouselHeadline || 'ALLE SYSTEMFUNKTIONEN IM ÜBERBLICK.'}
                              onChange={(e) => setContentDraft({ ...contentDraft, featuresCarouselHeadline: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          {features.map((feat) => (
                            <div key={feat.id} className="p-3 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-2">
                              <div className="flex items-center justify-between">
                                <input
                                  type="text"
                                  value={feat.title}
                                  onChange={(e) => updateFeature(feat.id, { title: e.target.value })}
                                  className="w-full px-2.5 py-1 text-xs font-spartan font-bold text-[#242E05] border border-stone-300 rounded mr-2 bg-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => toggleFeatureVisibility(feat.id)}
                                  className="p-1 text-stone-400 hover:text-[#384808] cursor-pointer"
                                  title={feat.visible ? 'Ausblenden' : 'Einblenden'}
                                >
                                  {feat.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                              </div>
                              <textarea
                                rows={2}
                                value={feat.text}
                                onChange={(e) => updateFeature(feat.id, { text: e.target.value })}
                                className="w-full px-2.5 py-1 text-xs text-[#585828] border border-stone-300 rounded bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2 BAUSTEINE */}
                  {editingSection === 'section-blocks' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Sektions-Kopf
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Sektions-Tag</label>
                          <input
                            type="text"
                            value={contentDraft.blocksTag || 'DIE ZWEI BAUSTEINE'}
                            onChange={(e) => setContentDraft({ ...contentDraft, blocksTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Hauptüberschrift</label>
                          <input
                            type="text"
                            value={contentDraft.blocksHeadline || 'Digitale Vorab-Einweisung & zentrales Vermiet-Cockpit.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, blocksHeadline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Einführungstext</label>
                          <textarea
                            rows={3}
                            value={contentDraft.blocksIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, blocksIntro: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* BAUSTEIN A */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          BAUSTEIN A: FÜR DEINE MIETER (Vorab-Einweisung)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Tag Baustein A</label>
                            <input
                              type="text"
                              value={contentDraft.blockATag || 'FÜR DEINE MIETER'}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockATag: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Bild-Badge unten</label>
                            <input
                              type="text"
                              value={contentDraft.blockABadge || 'Vorab per Smartphone & QR-Code'}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockABadge: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Titel Baustein A</label>
                          <input
                            type="text"
                            value={contentDraft.blockATitle || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, blockATitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-spartan font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Beschreibung Baustein A</label>
                          <textarea
                            rows={3}
                            value={contentDraft.blockAText || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, blockAText: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>

                        {/* Image & Alt */}
                        <div className="flex items-center gap-3 p-3 bg-[#F9F8F3] rounded-xl border border-stone-200">
                          <div className="w-14 h-14 rounded-lg bg-stone-100 border border-stone-300 overflow-hidden shrink-0 flex items-center justify-center">
                            {contentDraft.blockAImage ? (
                              <img src={contentDraft.blockAImage} alt={contentDraft.blockAImageAlt || 'A'} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={18} className="text-stone-400" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              value={contentDraft.blockAImage || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockAImage: e.target.value })}
                              placeholder="Bildpfad A (/images/...)"
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-mono bg-white"
                            />
                            <input
                              type="text"
                              value={contentDraft.blockAImageAlt || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockAImageAlt: e.target.value })}
                              placeholder="Alt-Text A"
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs bg-white"
                            />
                          </div>
                        </div>

                        {/* 3 Sub-Features */}
                        <div className="space-y-2 pt-2">
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05]">
                            3 Unterpunkte Baustein A
                          </label>
                          {(contentDraft.blockAFeatures || [
                            { num: '01', title: 'Kurze Videos auf dem Smartphone', text: 'Deine Mieter sehen sich die wichtigsten Funktionen bereits vor der Übergabe an.' },
                            { num: '02', title: 'QR-Codes im Fahrzeug', text: 'Direkt im Camper scannen und unterwegs sofort die passende Anleitung finden.' },
                            { num: '03', title: 'Digitaler KI-Assistent', text: 'Beantwortet Mieterfragen rund um das gemietete Fahrzeug jederzeit direkt.' },
                          ]).map((fItem, fIdx) => (
                            <div key={fIdx} className="p-3 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-1.5">
                              <input
                                type="text"
                                value={fItem.title}
                                onChange={(e) => {
                                  const list = [...(contentDraft.blockAFeatures || [
                                    { num: '01', title: 'Kurze Videos auf dem Smartphone', text: 'Deine Mieter sehen sich die wichtigsten Funktionen bereits vor der Übergabe an.' },
                                    { num: '02', title: 'QR-Codes im Fahrzeug', text: 'Direkt im Camper scannen und unterwegs sofort die passende Anleitung finden.' },
                                    { num: '03', title: 'Digitaler KI-Assistent', text: 'Beantwortet Mieterfragen rund um das gemietete Fahrzeug jederzeit direkt.' },
                                  ])];
                                  list[fIdx] = { ...list[fIdx], title: e.target.value };
                                  setContentDraft({ ...contentDraft, blockAFeatures: list });
                                }}
                                className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                              />
                              <input
                                type="text"
                                value={fItem.text}
                                onChange={(e) => {
                                  const list = [...(contentDraft.blockAFeatures || [
                                    { num: '01', title: 'Kurze Videos auf dem Smartphone', text: 'Deine Mieter sehen sich die wichtigsten Funktionen bereits vor der Übergabe an.' },
                                    { num: '02', title: 'QR-Codes im Fahrzeug', text: 'Direkt im Camper scannen und unterwegs sofort die passende Anleitung finden.' },
                                    { num: '03', title: 'Digitaler KI-Assistent', text: 'Beantwortet Mieterfragen rund um das gemietete Fahrzeug jederzeit direkt.' },
                                  ])];
                                  list[fIdx] = { ...list[fIdx], text: e.target.value };
                                  setContentDraft({ ...contentDraft, blockAFeatures: list });
                                }}
                                className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs text-[#585828] bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BAUSTEIN B */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#A09048] block pb-2 border-b border-[#A09048]/20">
                          BAUSTEIN B: FÜR DICH ALS VERMIETER (Vermiet-Office)
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Tag Baustein B</label>
                          <input
                            type="text"
                            value={contentDraft.blockBTag || 'FÜR DICH ALS VERMIETER'}
                            onChange={(e) => setContentDraft({ ...contentDraft, blockBTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Titel Baustein B</label>
                          <input
                            type="text"
                            value={contentDraft.blockBTitle || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, blockBTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-spartan font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Beschreibung Baustein B</label>
                          <textarea
                            rows={3}
                            value={contentDraft.blockBText || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, blockBText: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>

                        {/* Image & Alt */}
                        <div className="flex items-center gap-3 p-3 bg-[#F9F8F3] rounded-xl border border-stone-200">
                          <div className="w-14 h-14 rounded-lg bg-stone-100 border border-stone-300 overflow-hidden shrink-0 flex items-center justify-center">
                            {contentDraft.blockBImage ? (
                              <img src={contentDraft.blockBImage} alt={contentDraft.blockBImageAlt || 'B'} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={18} className="text-stone-400" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              value={contentDraft.blockBImage || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBImage: e.target.value })}
                              placeholder="Bildpfad B (/images/...)"
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-mono bg-white"
                            />
                            <input
                              type="text"
                              value={contentDraft.blockBImageAlt || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBImageAlt: e.target.value })}
                              placeholder="Alt-Text B"
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs bg-white"
                            />
                          </div>
                        </div>

                        {/* 3 Sub-Features */}
                        <div className="space-y-2 pt-2">
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05]">
                            3 Unterpunkte Baustein B
                          </label>
                          {(contentDraft.blockBFeatures || [
                            { num: '01', title: 'Zentrales Cockpit', text: 'Alle Termine, Verträge und Fahrzeugstatus in Echtzeit auf einen Blick.' },
                            { num: '02', title: 'Digitale Verträge', text: 'Rechtssichere Mietverträge, Protokolle und Rechnungen sekundenschnell als PDF.' },
                            { num: '03', title: 'Standorte & Partnerflotten', text: 'Mehrere Übergabestationen oder Partnerflotten mit klarer Trennung verwalten.' },
                          ]).map((fItem, fIdx) => (
                            <div key={fIdx} className="p-3 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-1.5">
                              <input
                                type="text"
                                value={fItem.title}
                                onChange={(e) => {
                                  const list = [...(contentDraft.blockBFeatures || [
                                    { num: '01', title: 'Zentrales Cockpit', text: 'Alle Termine, Verträge und Fahrzeugstatus in Echtzeit auf einen Blick.' },
                                    { num: '02', title: 'Digitale Verträge', text: 'Rechtssichere Mietverträge, Protokolle und Rechnungen sekundenschnell als PDF.' },
                                    { num: '03', title: 'Standorte & Partnerflotten', text: 'Mehrere Übergabestationen oder Partnerflotten mit klarer Trennung verwalten.' },
                                  ])];
                                  list[fIdx] = { ...list[fIdx], title: e.target.value };
                                  setContentDraft({ ...contentDraft, blockBFeatures: list });
                                }}
                                className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                              />
                              <input
                                type="text"
                                value={fItem.text}
                                onChange={(e) => {
                                  const list = [...(contentDraft.blockBFeatures || [
                                    { num: '01', title: 'Zentrales Cockpit', text: 'Alle Termine, Verträge und Fahrzeugstatus in Echtzeit auf einen Blick.' },
                                    { num: '02', title: 'Digitale Verträge', text: 'Rechtssichere Mietverträge, Protokolle und Rechnungen sekundenschnell als PDF.' },
                                    { num: '03', title: 'Standorte & Partnerflotten', text: 'Mehrere Übergabestationen oder Partnerflotten mit klarer Trennung verwalten.' },
                                  ])];
                                  list[fIdx] = { ...list[fIdx], text: e.target.value };
                                  setContentDraft({ ...contentDraft, blockBFeatures: list });
                                }}
                                className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs text-[#585828] bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4 SCHRITTE */}
                  {editingSection === 'section-steps' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Kopfbereich &amp; Texte
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Sektions-Tag</label>
                          <input
                            type="text"
                            value={contentDraft.stepsTag || 'DER VERMIETPROZESS'}
                            onChange={(e) => setContentDraft({ ...contentDraft, stepsTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Hauptüberschrift</label>
                          <input
                            type="text"
                            value={contentDraft.stepsHeadline || 'IN 4 SCHRITTEN VON DER ANFRAGE ZUR ÜBERGABE.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, stepsHeadline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Einführungstext</label>
                          <textarea
                            rows={3}
                            value={contentDraft.stepsIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, stepsIntro: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* 4 Schritte */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Die 4 Prozess-Schritte
                        </span>
                        {steps.map((st) => (
                          <div key={st.id} className="p-4 bg-[#F9F8F3] rounded-2xl border border-stone-200 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#384808] text-white font-spartan font-black text-xs flex items-center justify-center shrink-0">
                                {st.number}
                              </span>
                              <input
                                type="text"
                                value={st.title}
                                onChange={(e) => updateStep(st.id, { title: e.target.value })}
                                className="w-full px-3 py-1 text-xs font-spartan font-bold text-[#242E05] border border-stone-300 rounded-lg bg-white"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={st.text}
                              onChange={(e) => updateStep(st.id, { text: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs text-[#585828] border border-stone-300 rounded-lg bg-white"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Callout Box Unten */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Workflow-Banner unter den Schritten
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Banner Titel</label>
                          <input
                            type="text"
                            value={contentDraft.stepsCalloutTitle || 'KEIN SYSTEMBRUCH MEHR:'}
                            onChange={(e) => setContentDraft({ ...contentDraft, stepsCalloutTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Banner Beschreibung</label>
                          <input
                            type="text"
                            value={contentDraft.stepsCalloutText || 'Alle Schritte von der ersten Buchungsanfrage bis zum unterschriebenen Übergabeprotokoll greifen nahtlos ineinander.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, stepsCalloutText: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Banner Button</label>
                          <input
                            type="text"
                            value={contentDraft.stepsCalloutCta || 'Jetzt Prozess digitalisieren'}
                            onChange={(e) => setContentDraft({ ...contentDraft, stepsCalloutCta: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VORTEILE & ZIELGRUPPE */}
                  {editingSection === 'section-audience' && (
                    <div className="space-y-5">
                      {/* Vorteile */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Teil 1: Vorteile für Vermieter (Band 1)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Vorteile Tag</label>
                            <input
                              type="text"
                              value={contentDraft.benefitsTag || 'VORTEILE FÜR VERMIETER'}
                              onChange={(e) => setContentDraft({ ...contentDraft, benefitsTag: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Vorteile Button</label>
                            <input
                              type="text"
                              value={contentDraft.benefitsCta || 'Jetzt starten'}
                              onChange={(e) => setContentDraft({ ...contentDraft, benefitsCta: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Vorteile Überschrift</label>
                          <input
                            type="text"
                            value={contentDraft.benefitsHeadline || 'WARUM SICH CVB-OFFICE FÜR DEINEN BETRIEB AUSZAHLT.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, benefitsHeadline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Vorteile Beschreibung</label>
                          <textarea
                            rows={3}
                            value={contentDraft.benefitsIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, benefitsIntro: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>

                        {/* 6 Vorteile List */}
                        <div className="space-y-2 pt-2">
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05]">
                            6 durchnummerierte Vorteile
                          </label>
                          {(contentDraft.benefitsList || [
                            { title: 'Weniger Aufwand', text: 'Keine Zettelwirtschaft mehr. Automatisierte Workflows sparen wertvolle Stunden pro Vermietung.' },
                            { title: 'Schnellere Bearbeitung', text: 'Vom ersten Kundenkontakt bis zum unterschriebenen Vertrag in Minuten statt Tagen.' },
                            { title: 'Volle Transparenz', text: 'Jederzeit exakter Überblick über Flottenauslastung, Umsätze und anstehende Übergaben.' },
                            { title: 'Professioneller Auftritt', text: 'Modernes Buchungserlebnis für Deine Mieter und saubere, ansprechende PDF-Dokumente.' },
                            { title: 'Keine Medienbrüche', text: 'Alle Schritte von der Buchung bis zur Schadensdokumentation in einem nahtlosen System.' },
                            { title: 'Einfacher Einstieg', text: 'Keine komplexe IT-Installation. Sofort im Browser einsatzbereit mit persönlichem CVB-Support.' },
                          ]).map((bItem, bIdx) => (
                            <div key={bIdx} className="p-3 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#889028] w-6 shrink-0">
                                  0{bIdx + 1}.
                                </span>
                                <input
                                  type="text"
                                  value={bItem.title}
                                  onChange={(e) => {
                                    const list = [...(contentDraft.benefitsList || [
                                      { title: 'Weniger Aufwand', text: 'Keine Zettelwirtschaft mehr. Automatisierte Workflows sparen wertvolle Stunden pro Vermietung.' },
                                      { title: 'Schnellere Bearbeitung', text: 'Vom ersten Kundenkontakt bis zum unterschriebenen Vertrag in Minuten statt Tagen.' },
                                      { title: 'Volle Transparenz', text: 'Jederzeit exakter Überblick über Flottenauslastung, Umsätze und anstehende Übergaben.' },
                                      { title: 'Professioneller Auftritt', text: 'Modernes Buchungserlebnis für Deine Mieter und saubere, ansprechende PDF-Dokumente.' },
                                      { title: 'Keine Medienbrüche', text: 'Alle Schritte von der Buchung bis zur Schadensdokumentation in einem nahtlosen System.' },
                                      { title: 'Einfacher Einstieg', text: 'Keine komplexe IT-Installation. Sofort im Browser einsatzbereit mit persönlichem CVB-Support.' },
                                    ])];
                                    list[bIdx] = { ...list[bIdx], title: e.target.value };
                                    setContentDraft({ ...contentDraft, benefitsList: list });
                                  }}
                                  className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                                />
                              </div>
                              <input
                                type="text"
                                value={bItem.text}
                                onChange={(e) => {
                                  const list = [...(contentDraft.benefitsList || [
                                    { title: 'Weniger Aufwand', text: 'Keine Zettelwirtschaft mehr. Automatisierte Workflows sparen wertvolle Stunden pro Vermietung.' },
                                    { title: 'Schnellere Bearbeitung', text: 'Vom ersten Kundenkontakt bis zum unterschriebenen Vertrag in Minuten statt Tagen.' },
                                    { title: 'Volle Transparenz', text: 'Jederzeit exakter Überblick über Flottenauslastung, Umsätze und anstehende Übergaben.' },
                                    { title: 'Professioneller Auftritt', text: 'Modernes Buchungserlebnis für Deine Mieter und saubere, ansprechende PDF-Dokumente.' },
                                    { title: 'Keine Medienbrüche', text: 'Alle Schritte von der Buchung bis zur Schadensdokumentation in einem nahtlosen System.' },
                                    { title: 'Einfacher Einstieg', text: 'Keine komplexe IT-Installation. Sofort im Browser einsatzbereit mit persönlichem CVB-Support.' },
                                  ])];
                                  list[bIdx] = { ...list[bIdx], text: e.target.value };
                                  setContentDraft({ ...contentDraft, benefitsList: list });
                                }}
                                className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs text-[#585828] bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3 Testimonials */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Teil 2: Stimmen aus der Praxis (Testimonials)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Testimonials Tag</label>
                            <input
                              type="text"
                              value={contentDraft.testimonialsTag || '★ STIMMEN AUS DER VERMIETPRAXIS'}
                              onChange={(e) => setContentDraft({ ...contentDraft, testimonialsTag: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Testimonials Überschrift</label>
                            <input
                              type="text"
                              value={contentDraft.testimonialsHeadline || 'WAS VERMIETER AN CVB-OFFICE SCHÄTZEN.'}
                              onChange={(e) => setContentDraft({ ...contentDraft, testimonialsHeadline: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase bg-white"
                            />
                          </div>
                        </div>

                        {(contentDraft.testimonials || [
                          { num: '01', title: 'Familienbetrieb (6 Fahrzeuge)', region: 'Bayern · 50 % Zeitersparnis', quote: '„Die Video-Einweisung vorab spart uns Samstags pro Übergabe mindestens 30 Minuten. Die Mieter wissen bereits, wie Toilette und Gas funktionieren.“' },
                          { num: '02', title: 'Wohnmobilvermietung (14 Mobile)', region: 'NRW · 0 % Provision', quote: '„Mit dem 1-Zeilen-Kalender auf unserer Website buchen Kunden direkt bei uns statt über teure Vermittlungsportale. 0 % Provision ab Tag eins.“' },
                          { num: '03', title: 'Camper-Station (3 Vans)', region: 'Norddeutschland · Rechtssicher', quote: '„Die CVB Mietverträge und die digitale Unterschrift auf dem Tablet oder Smartphone geben uns und unseren Mietern absolute Sicherheit.“' },
                        ]).map((testi, tIdx) => (
                          <div key={tIdx} className="p-3 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#A09048] w-6 shrink-0">
                                0{tIdx + 1}.
                              </span>
                              <input
                                type="text"
                                value={testi.title}
                                onChange={(e) => {
                                  const list = [...(contentDraft.testimonials || [
                                    { num: '01', title: 'Familienbetrieb (6 Fahrzeuge)', region: 'Bayern · 50 % Zeitersparnis', quote: '„Die Video-Einweisung vorab spart uns Samstags pro Übergabe mindestens 30 Minuten. Die Mieter wissen bereits, wie Toilette und Gas funktionieren.“' },
                                    { num: '02', title: 'Wohnmobilvermietung (14 Mobile)', region: 'NRW · 0 % Provision', quote: '„Mit dem 1-Zeilen-Kalender auf unserer Website buchen Kunden direkt bei uns statt über teure Vermittlungsportale. 0 % Provision ab Tag eins.“' },
                                    { num: '03', title: 'Camper-Station (3 Vans)', region: 'Norddeutschland · Rechtssicher', quote: '„Die CVB Mietverträge und die digitale Unterschrift auf dem Tablet oder Smartphone geben uns und unseren Mietern absolute Sicherheit.“' },
                                  ])];
                                  list[tIdx] = { ...list[tIdx], title: e.target.value };
                                  setContentDraft({ ...contentDraft, testimonials: list });
                                }}
                                placeholder="Betrieb / Name"
                                className="flex-1 px-2.5 py-1 rounded border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                              />
                              <input
                                type="text"
                                value={testi.region}
                                onChange={(e) => {
                                  const list = [...(contentDraft.testimonials || [
                                    { num: '01', title: 'Familienbetrieb (6 Fahrzeuge)', region: 'Bayern · 50 % Zeitersparnis', quote: '„Die Video-Einweisung vorab spart uns Samstags pro Übergabe mindestens 30 Minuten. Die Mieter wissen bereits, wie Toilette und Gas funktionieren.“' },
                                    { num: '02', title: 'Wohnmobilvermietung (14 Mobile)', region: 'NRW · 0 % Provision', quote: '„Mit dem 1-Zeilen-Kalender auf unserer Website buchen Kunden direkt bei uns statt über teure Vermittlungsportale. 0 % Provision ab Tag eins.“' },
                                    { num: '03', title: 'Camper-Station (3 Vans)', region: 'Norddeutschland · Rechtssicher', quote: '„Die CVB Mietverträge und die digitale Unterschrift auf dem Tablet oder Smartphone geben uns und unseren Mietern absolute Sicherheit.“' },
                                  ])];
                                  list[tIdx] = { ...list[tIdx], region: e.target.value };
                                  setContentDraft({ ...contentDraft, testimonials: list });
                                }}
                                placeholder="Region / Kennzahl"
                                className="w-1/3 px-2.5 py-1 rounded border border-stone-300 text-xs font-mono text-[#889028] bg-white"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={testi.quote}
                              onChange={(e) => {
                                const list = [...(contentDraft.testimonials || [
                                  { num: '01', title: 'Familienbetrieb (6 Fahrzeuge)', region: 'Bayern · 50 % Zeitersparnis', quote: '„Die Video-Einweisung vorab spart uns Samstags pro Übergabe mindestens 30 Minuten. Die Mieter wissen bereits, wie Toilette und Gas funktionieren.“' },
                                  { num: '02', title: 'Wohnmobilvermietung (14 Mobile)', region: 'NRW · 0 % Provision', quote: '„Mit dem 1-Zeilen-Kalender auf unserer Website buchen Kunden direkt bei uns statt über teure Vermittlungsportale. 0 % Provision ab Tag eins.“' },
                                  { num: '03', title: 'Camper-Station (3 Vans)', region: 'Norddeutschland · Rechtssicher', quote: '„Die CVB Mietverträge und die digitale Unterschrift auf dem Tablet oder Smartphone geben uns und unseren Mietern absolute Sicherheit.“' },
                                ])];
                                list[tIdx] = { ...list[tIdx], quote: e.target.value };
                                setContentDraft({ ...contentDraft, testimonials: list });
                              }}
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Zielgruppen Banner */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Teil 3: Zielgruppen &amp; Flotten (Banner)
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Banner Tag</label>
                          <input
                            type="text"
                            value={contentDraft.audienceTag || '✦ ZIELGRUPPEN & FLOTTEN'}
                            onChange={(e) => setContentDraft({ ...contentDraft, audienceTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Banner Überschrift</label>
                          <input
                            type="text"
                            value={contentDraft.audienceHeadline || 'FÜR JEDE VERMIETUNG GEBAUT. VOM EINZELCAMPER BIS ZUR FLOTTE.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, audienceHeadline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Banner Beschreibung</label>
                          <textarea
                            rows={2}
                            value={contentDraft.audienceIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, audienceIntro: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Haupt-Button (Primary CTA)</label>
                            <input
                              type="text"
                              value={contentDraft.audienceCtaPrimary || 'Jetzt anfragen'}
                              onChange={(e) => setContentDraft({ ...contentDraft, audienceCtaPrimary: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Zweit-Button (Secondary CTA)</label>
                            <input
                              type="text"
                              value={contentDraft.audienceCtaSecondary || '14 Tage kostenlos testen'}
                              onChange={(e) => setContentDraft({ ...contentDraft, audienceCtaSecondary: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                        </div>

                        {/* 4 Audience Pills */}
                        <div className="space-y-2 pt-2">
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05]">
                            4 Zielgruppen-Pills
                          </label>
                          {(contentDraft.audienceList || [
                            { title: 'Wohnmobil- und Camper-Vermieter', text: 'Kleine und mittelgroße Betreiber sowie ambitionierte private Vermieter mit 1 bis 50+ Fahrzeugen.' },
                            { title: 'Vermieter von Fahrzeugen & Objekten', text: 'Auch ideal geeignet für Wohnwagen, Anhänger, Camping-Equipment, Dachzelte und Zubehör.' },
                            { title: 'Betriebe mit digitalen Buchungsprozessen', text: 'Vermieter, die ihren Kunden moderne Online-Buchung und direkte Verfügbarkeitsabfrage bieten wollen.' },
                            { title: 'Mehrere Standorte und Flotten', text: 'Unternehmen mit mehreren Übergabestationen oder Vermiet-Partnerschaften mit klarer Rechtestruktur.' },
                          ]).map((aud, aIdx) => (
                            <div key={aIdx} className="p-3 bg-[#F9F8F3] rounded-xl border border-stone-200 space-y-1">
                              <input
                                type="text"
                                value={aud.title}
                                onChange={(e) => {
                                  const list = [...(contentDraft.audienceList || [
                                    { title: 'Wohnmobil- und Camper-Vermieter', text: 'Kleine und mittelgroße Betreiber sowie ambitionierte private Vermieter mit 1 bis 50+ Fahrzeugen.' },
                                    { title: 'Vermieter von Fahrzeugen & Objekten', text: 'Auch ideal geeignet für Wohnwagen, Anhänger, Camping-Equipment, Dachzelte und Zubehör.' },
                                    { title: 'Betriebe mit digitalen Buchungsprozessen', text: 'Vermieter, die ihren Kunden moderne Online-Buchung und direkte Verfügbarkeitsabfrage bieten wollen.' },
                                    { title: 'Mehrere Standorte und Flotten', text: 'Unternehmen mit mehreren Übergabestationen oder Vermiet-Partnerschaften mit klarer Rechtestruktur.' },
                                  ])];
                                  list[aIdx] = { ...list[aIdx], title: e.target.value };
                                  setContentDraft({ ...contentDraft, audienceList: list });
                                }}
                                className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PREISE & TARIFE */}
                  {editingSection === 'section-prices' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Sektions-Kopf &amp; Tarife
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Sektions-Tag</label>
                          <input
                            type="text"
                            value={contentDraft.pricesTag || 'TARIFE & EXKLUSIVKONDITIONEN'}
                            onChange={(e) => setContentDraft({ ...contentDraft, pricesTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Hauptüberschrift</label>
                          <input
                            type="text"
                            value={contentDraft.pricesHeadline || 'EINFACHE, TRANSPARENTE PREISSTRUKTUR FÜR CVB-MITGLIEDER.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, pricesHeadline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Einführungstext</label>
                          <textarea
                            rows={3}
                            value={contentDraft.pricesIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, pricesIntro: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Tarif-Badge</label>
                            <input
                              type="text"
                              value={contentDraft.pricesBadge || 'CVB-MITGLIEDSTARIF'}
                              onChange={(e) => setContentDraft({ ...contentDraft, pricesBadge: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Einheit-Text</label>
                            <input
                              type="text"
                              value={contentDraft.pricesUnit || 'netto / Fahrzeug / Monat'}
                              onChange={(e) => setContentDraft({ ...contentDraft, pricesUnit: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Preiswerte & Abrechnung */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Preiseinstellungen &amp; Berechnungslogik
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Hinweistext zur Abrechnung
                          </label>
                          <textarea
                            rows={2}
                            value={priceDraft.noteText}
                            onChange={(e) => setPriceDraft({ ...priceDraft, noteText: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>
                      </div>

                      {/* 4 Checklist Items */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Checklisten-Punkte in der Preis-Box
                        </span>
                        {(contentDraft.pricesChecklist || [
                          'Voller Funktionsumfang & Website-Buchungswidget',
                          'Digitale Vorab-Einweisung per QR-Code & Video',
                          'Unbegrenzte Buchungen, Verträge und Mieterdaten',
                          '14 Tage kostenlos testen, keine automatische Verlängerung',
                        ]).map((chk, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#A09048] text-white font-spartan font-black text-xs flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <input
                              type="text"
                              value={chk}
                              onChange={(e) => {
                                const list = [...(contentDraft.pricesChecklist || [
                                  'Voller Funktionsumfang & Website-Buchungswidget',
                                  'Digitale Vorab-Einweisung per QR-Code & Video',
                                  'Unbegrenzte Buchungen, Verträge und Mieterdaten',
                                  '14 Tage kostenlos testen, keine automatische Verlängerung',
                                ])];
                                list[cIdx] = e.target.value;
                                setContentDraft({ ...contentDraft, pricesChecklist: list });
                              }}
                              className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium text-[#242E05] bg-white"
                            />
                          </div>
                        ))}
                      </div>

                      {/* CVB Membership Notice Box */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          CVB-Mitgliedschaft Hinweiskasten
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Hinweis Titel</label>
                          <input
                            type="text"
                            value={contentDraft.membershipTitle || 'Voraussetzung: CVB-Mitgliedschaft'}
                            onChange={(e) => setContentDraft({ ...contentDraft, membershipTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Hinweis Text</label>
                          <textarea
                            rows={2}
                            value={contentDraft.membershipText || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, membershipText: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Link-Text</label>
                            <input
                              type="text"
                              value={contentDraft.membershipLinkText || 'Jetzt Mitglied werden'}
                              onChange={(e) => setContentDraft({ ...contentDraft, membershipLinkText: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Link-URL</label>
                            <input
                              type="url"
                              value={contentDraft.membershipLinkUrl || 'https://caravan-vermieter-bund.de/mitglied-werden'}
                              onChange={(e) => setContentDraft({ ...contentDraft, membershipLinkUrl: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* CTAs & Calculator Title */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Buttons &amp; Rechner-Titel
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Haupt-Button (Primary)</label>
                            <input
                              type="text"
                              value={contentDraft.pricesCtaPrimary || 'CVB-Office unverbindlich anfragen'}
                              onChange={(e) => setContentDraft({ ...contentDraft, pricesCtaPrimary: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Zweit-Button (Secondary)</label>
                            <input
                              type="text"
                              value={contentDraft.pricesCtaSecondary || '14 Tage kostenlos testen'}
                              onChange={(e) => setContentDraft({ ...contentDraft, pricesCtaSecondary: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Rechner Kasten-Titel</label>
                          <input
                            type="text"
                            value={contentDraft.calcTitle || 'FLOTTEN-RECHNER & ROI'}
                            onChange={(e) => setContentDraft({ ...contentDraft, calcTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BUCHUNGSFORMULAR */}
                  {editingSection === 'section-form' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Formular-Kopf &amp; Texte
                        </span>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Sektions-Tag
                          </label>
                          <input
                            type="text"
                            value={contentDraft.formTag || 'JETZT STARTEN'}
                            onChange={(e) => setContentDraft({ ...contentDraft, formTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Formular-Überschrift (H2)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.formHeading || 'DEIN DIGITALES OFFICE WARTET.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, formHeading: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-spartan font-bold text-[#242E05] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Einleitungstext
                          </label>
                          <textarea
                            rows={3}
                            value={contentDraft.formIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, formIntro: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                            Absende-Button Text
                          </label>
                          <input
                            type="text"
                            value={contentDraft.formSubmitButton || '14 Tage kostenlos testen & anfragen'}
                            onChange={(e) => setContentDraft({ ...contentDraft, formSubmitButton: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                      </div>

                      {/* Logo & Alt Text */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Formular Logo &amp; Bild
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-lg bg-stone-100 border border-stone-300 overflow-hidden shrink-0 flex items-center justify-center">
                            {contentDraft.formLogo ? (
                              <img src={contentDraft.formLogo} alt={contentDraft.formLogoAlt || 'Logo'} className="w-full h-full object-contain p-1" />
                            ) : (
                              <ImageIcon size={18} className="text-stone-400" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              value={contentDraft.formLogo || '/images/cvb_office_logo.png'}
                              onChange={(e) => setContentDraft({ ...contentDraft, formLogo: e.target.value })}
                              placeholder="Logo Pfad"
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-mono bg-white"
                            />
                            <input
                              type="text"
                              value={contentDraft.formLogoAlt || 'CVB-Office Logo'}
                              onChange={(e) => setContentDraft({ ...contentDraft, formLogoAlt: e.target.value })}
                              placeholder="Alt-Text"
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3 Trust Checklist Points */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          3 Vertrauenspunkte (Checkliste)
                        </span>
                        {(contentDraft.formTrustPoints || [
                          '14 Tage kostenlose Testphase',
                          'Keine Einrichtungsgebühr',
                          'Persönliche Betreuung durch das CVB-Team',
                        ]).map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#A09048] text-white font-spartan font-black text-xs flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <input
                              type="text"
                              value={pt}
                              onChange={(e) => {
                                const list = [...(contentDraft.formTrustPoints || [
                                  '14 Tage kostenlose Testphase',
                                  'Keine Einrichtungsgebühr',
                                  'Persönliche Betreuung durch das CVB-Team',
                                ])];
                                list[pIdx] = e.target.value;
                                setContentDraft({ ...contentDraft, formTrustPoints: list });
                              }}
                              className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium text-[#242E05] bg-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ */}
                  {editingSection === 'section-faq' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Sektions-Kopf &amp; Texte
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Sektions-Tag</label>
                          <input
                            type="text"
                            value={contentDraft.faqTag || 'HÄUFIG GESTELLTE FRAGEN'}
                            onChange={(e) => setContentDraft({ ...contentDraft, faqTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Hauptüberschrift</label>
                          <input
                            type="text"
                            value={contentDraft.faqHeadline || 'ALLES, WAS DU ZU CVB-OFFICE WISSEN MUSST.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, faqHeadline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Einführungstext</label>
                          <textarea
                            rows={3}
                            value={contentDraft.faqIntro || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, faqIntro: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Sidebar Box */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Support-Kasten ("Noch Fragen offen?")
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Kasten Titel</label>
                          <input
                            type="text"
                            value={contentDraft.faqBoxTitle || 'Noch Fragen offen?'}
                            onChange={(e) => setContentDraft({ ...contentDraft, faqBoxTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Kasten Text</label>
                          <textarea
                            rows={2}
                            value={contentDraft.faqBoxText || 'Unser CVB-Team hilft Dir gerne bei Fragen zu Funktionen, Preisen und der Umstellung Deiner Vermietung.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, faqBoxText: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Kasten Button-Text</label>
                          <input
                            type="text"
                            value={contentDraft.faqBoxCta || 'Team kontaktieren'}
                            onChange={(e) => setContentDraft({ ...contentDraft, faqBoxCta: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                      </div>

                      {/* All FAQs */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#A09048]/20">
                          <span className="font-spartan font-black text-xs uppercase text-[#242E05]">
                            FAQ Fragen anpassen ({faqs.length} Fragen):
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newId = `faq_${Date.now()}`;
                              addFaq({
                                id: newId,
                                question: 'Neue Frage hier eingeben?',
                                answer: 'Antwort auf die Frage hier eingeben.',
                                visible: true,
                              });
                            }}
                            className="text-xs font-spartan font-bold uppercase text-[#384808] hover:text-[#A09048] flex items-center gap-1 cursor-pointer"
                          >
                            + Neue FAQ hinzufügen
                          </button>
                        </div>
                        {faqs.map((f, i) => (
                          <div key={f.id} className="p-4 bg-[#F9F8F3] rounded-2xl border border-stone-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-[#A09048]">Frage {i + 1}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleFaqVisibility(f.id)}
                                  className="p-1 text-stone-400 hover:text-[#384808] cursor-pointer"
                                  title={f.visible ? 'Ausblenden' : 'Einblenden'}
                                >
                                  {f.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteFaq(f.id)}
                                  className="p-1 text-stone-400 hover:text-red-600 cursor-pointer"
                                  title="Frage löschen"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            <input
                              type="text"
                              value={f.question}
                              onChange={(e) => updateFaq(f.id, { question: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs font-spartan font-bold text-[#242E05] border border-stone-300 rounded-lg bg-white"
                            />
                            <textarea
                              rows={2}
                              value={f.answer}
                              onChange={(e) => updateFaq(f.id, { answer: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs text-[#585828] border border-stone-300 rounded-lg bg-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ABOUT */}
                  {editingSection === 'section-about' && (
                    <div className="space-y-5">
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Sektions-Kopf &amp; Narrative
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Sektions-Tag</label>
                          <input
                            type="text"
                            value={contentDraft.aboutTag || 'ÜBER DAS CVB-NETZWERK'}
                            onChange={(e) => setContentDraft({ ...contentDraft, aboutTag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Hauptüberschrift</label>
                          <input
                            type="text"
                            value={contentDraft.aboutHeadline || 'MIT WEITSICHT GEGRÜNDET. FÜR VERMIETER GEBAUT.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, aboutHeadline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-spartan font-black uppercase bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Netzwerk-Beschreibung</label>
                          <textarea
                            rows={3}
                            value={contentDraft.aboutText || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, aboutText: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* 3 Pills */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          3 Feature-Pills
                        </span>
                        {(contentDraft.aboutPills || ['1.000+ Fahrzeuge', 'BGB-Musterverträge', 'Starkes Netzwerk']).map((pill, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#889028] text-white font-spartan font-black text-xs flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <input
                              type="text"
                              value={pill}
                              onChange={(e) => {
                                const list = [...(contentDraft.aboutPills || ['1.000+ Fahrzeuge', 'BGB-Musterverträge', 'Starkes Netzwerk'])];
                                list[pIdx] = e.target.value;
                                setContentDraft({ ...contentDraft, aboutPills: list });
                              }}
                              className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-bold text-[#242E05] bg-white"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Link & Firmendetails */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Unternehmenssitz &amp; CVB-Website
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Button-Text</label>
                            <input
                              type="text"
                              value={contentDraft.aboutLinkText || 'Mehr über den CVB erfahren'}
                              onChange={(e) => setContentDraft({ ...contentDraft, aboutLinkText: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">CVB Website-URL</label>
                            <input
                              type="url"
                              value={settingsDraft.cvbWebsiteLink}
                              onChange={(e) => setSettingsDraft({ ...settingsDraft, cvbWebsiteLink: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono bg-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Organisation</label>
                            <input
                              type="text"
                              value={contentDraft.aboutCompany || 'Caravan-Vermieter-Bund (CVB)'}
                              onChange={(e) => setContentDraft({ ...contentDraft, aboutCompany: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Standort / GF</label>
                            <input
                              type="text"
                              value={contentDraft.aboutLocation || 'DS-Caravaning GmbH, Detlef Scheer · Niederkrüchten'}
                              onChange={(e) => setContentDraft({ ...contentDraft, aboutLocation: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Wide Banner */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Grosser Netzwerk-Banner (Unten)
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Banner Titel</label>
                          <input
                            type="text"
                            value={contentDraft.aboutBannerTitle || 'Offizielles Vermieter-Office'}
                            onChange={(e) => setContentDraft({ ...contentDraft, aboutBannerTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Banner Text</label>
                          <textarea
                            rows={3}
                            value={contentDraft.aboutBannerText || 'Gemeinsam stark im Netzwerk – wir geben unabhängigen Wohnmobil- und Caravan-Vermietern die besten Werkzeuge an die Hand. 100 % DSGVO-konform, faire Konditionen und 0 % Buchungsprovision.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, aboutBannerText: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FOOTER */}
                  {editingSection === 'section-footer' && (
                    <div className="space-y-5">
                      {/* Logo & Alt */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-3">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Footer Logo &amp; Bild
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-lg bg-stone-100 border border-stone-300 overflow-hidden shrink-0 flex items-center justify-center">
                            {contentDraft.footerLogo ? (
                              <img src={contentDraft.footerLogo} alt={contentDraft.footerLogoAlt || 'Logo'} className="w-full h-full object-contain p-1" />
                            ) : (
                              <ImageIcon size={18} className="text-stone-400" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              value={contentDraft.footerLogo || '/images/cvb_office_logo.png'}
                              onChange={(e) => setContentDraft({ ...contentDraft, footerLogo: e.target.value })}
                              placeholder="Logo Pfad"
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs font-mono bg-white"
                            />
                            <input
                              type="text"
                              value={contentDraft.footerLogoAlt || 'CVB-Office Logo'}
                              onChange={(e) => setContentDraft({ ...contentDraft, footerLogoAlt: e.target.value })}
                              placeholder="Alt-Text"
                              className="w-full px-2.5 py-1 rounded border border-stone-300 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Spalte 1: Beschreibung & Partner */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Beschreibung &amp; Technologiepartner
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">
                            Footer Beschreibungstext
                          </label>
                          <textarea
                            rows={3}
                            value={contentDraft.footerDescription || ''}
                            onChange={(e) => setContentDraft({ ...contentDraft, footerDescription: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#585828] bg-white leading-relaxed"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Technologiepartner Notiz</label>
                            <input
                              type="text"
                              value={contentDraft.partnerNote || 'Technologiepartner: Smarlps'}
                              onChange={(e) => setContentDraft({ ...contentDraft, partnerNote: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Serverstandort</label>
                            <input
                              type="text"
                              value={contentDraft.footerServerLocation || 'Frankfurt am Main'}
                              onChange={(e) => setContentDraft({ ...contentDraft, footerServerLocation: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Kontakt & Support */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Kontakt &amp; Buttons
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Kontakt Name</label>
                            <input
                              type="text"
                              value={contentDraft.footerContactName || 'Caravan-Vermieter-Bund'}
                              onChange={(e) => setContentDraft({ ...contentDraft, footerContactName: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Kontakt Rolle</label>
                            <input
                              type="text"
                              value={contentDraft.footerContactRole || 'Detlef Scheer (Vorstand)'}
                              onChange={(e) => setContentDraft({ ...contentDraft, footerContactRole: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Kontakt-E-Mail</label>
                            <input
                              type="email"
                              value={contentDraft.contactEmail || settingsDraft.contactEmail || ''}
                              onChange={(e) => {
                                setContentDraft({ ...contentDraft, contactEmail: e.target.value });
                                setSettingsDraft({ ...settingsDraft, contactEmail: e.target.value });
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Button-Text Testphase</label>
                            <input
                              type="text"
                              value={contentDraft.footerCtaText || '14 Tage testen'}
                              onChange={(e) => setContentDraft({ ...contentDraft, footerCtaText: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Copyright & Badges */}
                      <div className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-4">
                        <span className="font-spartan font-black text-xs uppercase text-[#384808] block pb-2 border-b border-[#A09048]/20">
                          Copyright &amp; Compliance Badges
                        </span>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Copyright Zeile</label>
                          <input
                            type="text"
                            value={contentDraft.footerCopyright || 'CARAVAN-VERMIETER-BUND (CVB). ALLE RECHTE VORBEHALTEN.'}
                            onChange={(e) => setContentDraft({ ...contentDraft, footerCopyright: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#242E05] mb-1">Compliance Badges (3 Badges)</label>
                          {(contentDraft.footerBadges || ['100 % DSGVO-KONFORM', 'HOSTING IN DEUTSCHLAND', '0 % PROVISION']).map((badge, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-xs font-bold text-[#889028] w-6 shrink-0">
                                0{bIdx + 1}.
                              </span>
                              <input
                                type="text"
                                value={badge}
                                onChange={(e) => {
                                  const list = [...(contentDraft.footerBadges || ['100 % DSGVO-KONFORM', 'HOSTING IN DEUTSCHLAND', '0 % PROVISION'])];
                                  list[bIdx] = e.target.value;
                                  setContentDraft({ ...contentDraft, footerBadges: list });
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-bold text-[#242E05] bg-white font-mono"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-6 bg-white border-t border-[#A09048]/30 flex items-center justify-between">
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Abbrechen
                  </button>

                  <button
                    onClick={() => {
                      const sec = homepageSections.find((s) => s.id === editingSection);
                      handleUpdateAndApply(sec ? sec.label : 'Sektion');
                    }}
                    className="tech-cta-primary h-11 text-xs px-6 cursor-pointer"
                  >
                    <span>AKTUALISIEREN &amp; ANWENDEN</span>
                    <span className="tech-ci w-7 h-7">
                      <Save size={14} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          5. TAB 4: ADMIN PROFIL & SYSTEM EINSTELLUNGEN
         ========================================================================= */}
      {activeTab === 'profile' && (
        <main className="flex-1 w-full max-w-4xl mx-auto px-6 sm:px-10 py-8 space-y-8 animate-in fade-in duration-200">
          {/* Admin Profile Box */}
          <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs space-y-6">
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

          {/* System Settings Box */}
          <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs space-y-6">
            <div className="pb-6 border-b border-[#A09048]/20">
              <h2 className="font-spartan font-black text-2xl uppercase tracking-tight text-[#242E05]">
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
        </main>
      )}
    </div>
  );
};
