'use client';
import React, { useState, useMemo } from 'react';
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
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                activeTab === 'content' ? 'bg-[#A09048] text-[#172002]' : 'bg-[#A09048]/20 text-[#384808]'
              }`}
            >
              Live Editor
            </span>
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
            <span>Content Management (Live Editor)</span>
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
          {/* Sticky Sub-Navbar: Section Jump Navigation & Actions */}
          <div className="sticky top-[69px] z-40 w-full bg-[#242E05] text-[#F4F2E6] border-b border-[#A09048]/30 px-4 sm:px-8 py-2.5 shadow-md flex items-center justify-between overflow-x-auto gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-spartan font-black text-[11px] uppercase tracking-widest text-[#A09048] flex items-center gap-1.5">
                <Layers size={14} />
                <span>SEKTIONEN:</span>
              </span>
            </div>

            {/* Jump links for each section */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {homepageSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.anchorId)}
                  className="px-2.5 py-1 rounded-lg text-xs font-spartan font-bold uppercase tracking-wider text-stone-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span className="text-[#A09048] font-mono mr-1">{sec.num}</span>
                  <span>{sec.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Live Reload Action */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleReloadHomePage}
                className="px-3.5 py-1.5 bg-[#A09048] hover:bg-[#8D7F3E] text-[#172002] rounded-xl text-xs font-spartan font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Startseite im Browser neu laden"
              >
                <RefreshCw size={12} />
                <span className="hidden sm:inline">Startseite neu laden</span>
              </button>
            </div>
          </div>

          {/* Full Continuous Homepage View */}
          <div className="w-full bg-white divide-y-4 divide-[#F4F2E6]">
            {homepageSections.map((sec) => (
              <div
                key={sec.id}
                id={sec.anchorId}
                className="relative group transition-all"
              >
                {/* Floating Admin Section Control Pill Banner */}
                <div className="bg-[#242E05] border-y border-[#A09048]/30 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs sticky top-[114px] z-30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#A09048] text-[#172002]">
                      TEIL {sec.num}
                    </span>
                    <h3 className="font-spartan font-black text-sm sm:text-base uppercase tracking-wider text-white">
                      {sec.label}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingSection(sec.id)}
                      className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-spartan font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors border border-white/20"
                    >
                      <FileEdit size={13} className="text-[#A09048]" />
                      <span>Sektion bearbeiten</span>
                    </button>

                    <button
                      onClick={() => handleUpdateAndApply(sec.label)}
                      className="px-4 py-1.5 bg-[#A09048] hover:bg-[#8D7F3E] text-[#172002] rounded-xl text-xs font-spartan font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    >
                      <Check size={14} />
                      <span>Aktualisieren &amp; Anwenden</span>
                    </button>
                  </div>
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
                {/* Drawer Header */}
                <div className="p-6 bg-[#242E05] text-white flex items-center justify-between border-b border-[#A09048]/30">
                  <div>
                    <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-1">
                      SCHNELL-EDITOR
                    </span>
                    <h3 className="font-spartan font-black text-xl uppercase tracking-tight text-white">
                      {homepageSections.find((s) => s.id === editingSection)?.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setEditingSection(null)}
                    className="p-2 text-stone-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
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
                  {editingSection === 'section-problem' && (
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
                  {editingSection === 'section-features' && (
                    <div className="space-y-4">
                      <span className="font-spartan font-bold text-xs uppercase text-[#242E05] block">
                        Funktions-Karten bearbeiten ({features.length} Karten im System):
                      </span>
                      <div className="space-y-3">
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
                  {editingSection === 'section-blocks' && (
                    <div className="space-y-5">
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
                  {editingSection === 'section-steps' && (
                    <div className="space-y-3">
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
                  {editingSection === 'section-prices' && (
                    <div className="space-y-4">
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
                      <div>
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
                  {editingSection === 'section-form' && (
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
                  {editingSection === 'section-faq' && (
                    <div className="space-y-3">
                      <span className="font-spartan font-bold text-xs uppercase text-[#242E05] block">
                        FAQ Fragen anpassen ({faqs.length} Fragen):
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
                  {editingSection === 'section-about' && (
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
                  {editingSection === 'section-footer' && (
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
                    className="tech-cta-primary h-11 text-xs px-5 cursor-pointer"
                  >
                    <span>ÄNDERUNGEN ANWENDEN</span>
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
