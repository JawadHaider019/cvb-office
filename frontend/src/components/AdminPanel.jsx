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
} from 'lucide-react';

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

  // Tab navigation
  const [activeTab, setActiveTab] = useState('dashboard');

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

  // Local form drafts
  const [contentDraft, setContentDraft] = useState(content);
  const [priceDraft, setPriceDraft] = useState(priceSettings);
  const [settingsDraft, setSettingsDraft] = useState(generalSettings);

  // CMS sub-tab selector
  const [cmsSection, setCmsSection] = useState('hero');

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
    setTimeout(() => setSaveSuccessMsg(null), 3200);
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

  // If not logged in, show Executive Login Screen with Home page styling
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#1A2304] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-body">
        {/* Ambient Warm Golden & Olive Lighting */}
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

            {/* Quick Demo Credentials Pill */}
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

  // Navigation definition
  const navGroups = [
    {
      group: 'ÜBERSICHT & CRM',
      items: [
        { id: 'dashboard', label: 'Dashboard Übersicht', icon: LayoutDashboard },
        { id: 'requests', label: 'Mietanfragen CRM', icon: Inbox, badge: newRequestsCount },
      ],
    },
    {
      group: 'CONTENT & TARIFE',
      items: [
        { id: 'content', label: 'Landing Page CMS', icon: FileEdit },
        { id: 'prices', label: 'Tarife & Konditionen', icon: DollarSign },
        { id: 'faq', label: 'FAQ Wissensbasis', icon: HelpCircle },
      ],
    },
    {
      group: 'SYSTEM & KONTO',
      items: [
        { id: 'settings', label: 'System-Einstellungen', icon: Settings },
        { id: 'account', label: 'Administrator Profil', icon: User },
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F8F7F0] text-[#384808] font-body flex antialiased selection:bg-[#A09048] selection:text-white">
      {/* =========================================================================
          1. LUXURY ENTERPRISE SIDEBAR (Dark Olive with Gold Accents)
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
                  OFFICE COCKPIT
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
          <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-270px)]">
            {navGroups.map((group) => (
              <div key={group.group}>
                <div className="px-3.5 text-[10px] font-spartan font-black uppercase tracking-widest text-[#A09048]/80 mb-2">
                  {group.group}
                </div>
                <div className="space-y-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-spartan uppercase tracking-wider transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-[#A09048] text-[#172002] font-black shadow-lg shadow-[#A09048]/20'
                            : 'text-[#E1E5D5] hover:bg-white/[0.08] hover:text-white font-bold'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={isActive ? 'text-[#172002]' : 'text-[#A09048]'} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                              isActive ? 'bg-[#172002] text-white' : 'bg-[#A09048] text-[#172002]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Profile & Exit Area */}
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
          2. FLUID FULL-WIDTH WORKSPACE
         ========================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Sticky Frosted Header matching Home Header */}
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
              {activeTab === 'content' && 'Landing Page CMS'}
              {activeTab === 'prices' && 'Tarife & Konditionen'}
              {activeTab === 'faq' && 'FAQ Wissensbasis'}
              {activeTab === 'settings' && 'System-Einstellungen'}
              {activeTab === 'account' && 'Administrator Profil'}
            </h1>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-4">
            {/* Direct Link to Public Site (Signature tech-cta-primary) */}
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

        {/* =========================================================================
            3. TAB CONTENT PANELS (Full-Width Responsive Bento Architecture)
           ========================================================================= */}
        <main className="flex-1 w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 py-8 space-y-8">
          {/* -----------------------------------------------------------------------
              TAB 1: DASHBOARD (HOME-PAGE LUXURY BENTO DESIGN)
             ----------------------------------------------------------------------- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Executive Welcome Card (Cream Bento) */}
              <div className="bg-[#F4F2E6] p-7 sm:p-10 rounded-[30px] border border-[#A09048]/35 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#A09048]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h1 className="font-spartan font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#242E05]">
                      WILLKOMMEN, DETLEF<span className="text-[#889028]">.</span>
                    </h1>
                    <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed mt-2 max-w-2xl font-body">
                      Verwalte hier alle eingegangenen Mietanfragen, passe die Texte der 12 Landingpage-Abschnitte an und steuere die Tarife.
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

              {/* 4 Premium Metric KPI Cards (Home Page Bento Cards with Faint Watermark Numbers) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Metric 1: Neue Anfragen */}
                <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
                  <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                    01
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">NEUE ANFRAGEN</span>
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

                {/* Metric 2: In Bearbeitung */}
                <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
                  <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                    02
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">IN SETUP</span>
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

                {/* Metric 3: Erledigt */}
                <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
                  <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                    03
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">AKTIV</span>
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

                {/* Metric 4: Flotte Gesamt */}
                <div className="bg-white p-7 rounded-[28px] border border-[#A09048]/30 shadow-[0_12px_35px_-15px_rgba(56,72,8,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col justify-between">
                  <span className="absolute -bottom-3 -right-2 font-spartan font-black text-7xl text-[#384808]/10 group-hover:text-[#A09048]/25 transition-colors select-none pointer-events-none">
                    04
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#585828]">GESAMTFLOTTE</span>
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

              {/* Bento 3 Action Modules (Home Page Bento Cards with Rotating Icons) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  onClick={() => setActiveTab('content')}
                  className="bg-white p-8 rounded-[30px] border border-[#A09048]/30 hover:border-[#384808] hover:shadow-2xl transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#F4F2E6] border border-[#A09048]/30 text-[#384808] flex items-center justify-center mb-5 group-hover:bg-[#384808] group-hover:text-white transition-all shadow-xs">
                      <FileEdit size={24} />
                    </div>
                    <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-2">
                      12 TEILE CMS
                    </span>
                    <h3 className="font-spartan font-black text-xl text-[#242E05] uppercase tracking-tight mb-2">
                      SEITE BEARBEITEN
                    </h3>
                    <p className="text-xs sm:text-sm text-[#585828] leading-relaxed">
                      Überschriften, Einleitungstexte, Bausteine A &amp; B sowie Bildpfade für die gesamte Landing Page anpassen.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#A09048] group-hover:text-[#384808]">
                      Zum Content-Editor
                    </span>
                    <span className="tech-ci w-8 h-8">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('requests')}
                  className="bg-white p-8 rounded-[30px] border border-[#A09048]/30 hover:border-[#384808] hover:shadow-2xl transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#F4F2E6] border border-[#A09048]/30 text-[#384808] flex items-center justify-center mb-5 group-hover:bg-[#384808] group-hover:text-white transition-all shadow-xs">
                      <Inbox size={24} />
                    </div>
                    <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-2">
                      VERTRÄGE &amp; ANFRAGEN
                    </span>
                    <h3 className="font-spartan font-black text-xl text-[#242E05] uppercase tracking-tight mb-2">
                      ANFRAGEN CRM
                    </h3>
                    <p className="text-xs sm:text-sm text-[#585828] leading-relaxed">
                      Vollständige Einsicht in eingereichte E-Mails, Flottengrößen, Preiseinwilligungen und Notizen.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#A09048] group-hover:text-[#384808]">
                      CRM öffnen
                    </span>
                    <span className="tech-ci w-8 h-8">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('prices')}
                  className="bg-white p-8 rounded-[30px] border border-[#A09048]/30 hover:border-[#384808] hover:shadow-2xl transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#F4F2E6] border border-[#A09048]/30 text-[#384808] flex items-center justify-center mb-5 group-hover:bg-[#384808] group-hover:text-white transition-all shadow-xs">
                      <DollarSign size={24} />
                    </div>
                    <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-2">
                      NETTO TARIFE
                    </span>
                    <h3 className="font-spartan font-black text-xl text-[#242E05] uppercase tracking-tight mb-2">
                      TARIFE ANPASSEN
                    </h3>
                    <p className="text-xs sm:text-sm text-[#585828] leading-relaxed">
                      Aktuell hinterlegt: {priceSettings.monthlyNet.toFixed(2).replace('.', ',')} € netto / Fahrzeug / Monat.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#A09048] group-hover:text-[#384808]">
                      Preistabelle konfigurieren
                    </span>
                    <span className="tech-ci w-8 h-8">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Requests Bento Table */}
              <div className="bg-white rounded-[32px] p-7 sm:p-9 border border-[#A09048]/30 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
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
              TAB 2: MIETANFRAGEN CRM (FULL-WIDTH MODERN BENTO CRM)
             ----------------------------------------------------------------------- */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs">
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-[#A09048]/20">
                  <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                    MIETANFRAGEN CRM
                  </h2>
                  <p className="text-xs sm:text-sm text-[#585828] mt-1">
                    Alle über das Registrierungsformular auf cvb-office.de eingegangenen Anträge von Wohnmobil-Vermietern.
                  </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  {/* Search input with home style */}
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

                  {/* Status Pills */}
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

                {/* Full Width Table */}
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

              {/* Elevated Request Detail Modal */}
              {selectedRequest && (
                <div
                  role="dialog"
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
                >
                  <div className="bg-[#F4F2E6] rounded-[32px] max-w-2xl w-full p-7 sm:p-10 shadow-2xl border-2 border-[#A09048]/40 max-h-[92vh] overflow-y-auto space-y-6 text-[#384808]">
                    <div className="flex justify-between items-start border-b border-[#A09048]/25 pb-4">
                      <div>
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
                      {/* Overview Grid */}
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

                      {/* Status Selector */}
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

                      {/* Price Consent Evidence */}
                      <div>
                        <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#585828] mb-1.5">
                          Bestätigte Preiseinwilligung (BGB Nachweis):
                        </label>
                        <div className="p-4 bg-white rounded-2xl border border-[#A09048]/30 text-xs text-[#585828] leading-relaxed italic">
                          „{selectedRequest.price_consent_text}“
                        </div>
                      </div>

                      {/* Private Notes */}
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
              TAB 3: CONTENT EDITOR (LANDING PAGE CMS)
             ----------------------------------------------------------------------- */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs">
                {/* CMS Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#A09048]/20">
                  <div>
                    <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                      LANDING PAGE TEXT-CMS
                    </h2>
                    <p className="text-xs sm:text-sm text-[#585828] mt-1">
                      Passe alle Abschnitte, Überschriften, Einführungstexte und Bildpfade der öffentlichen Seite an.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        try {
                          const backup = localStorage.getItem('cvb_office_content_backup_v1');
                          if (backup) {
                            const parsed = JSON.parse(backup);
                            setContentDraft(parsed);
                            updateContent(parsed);
                            showSaveNotice('Vorherige Textversion erfolgreich wiederhergestellt.');
                          } else {
                            setContentDraft({ ...content });
                            showSaveNotice('Aktueller Stand geladen.');
                          }
                        } catch {
                          showSaveNotice('Wiederherstellung nicht möglich.');
                        }
                      }}
                      className="tech-cta-ghost h-11 text-xs px-4"
                      title="Vorherige Version wiederherstellen"
                    >
                      <RotateCcw size={15} />
                      <span>Version wiederherstellen</span>
                    </button>

                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem('cvb_office_content_backup_v1', JSON.stringify(content));
                        } catch {}
                        updateContent(contentDraft);
                        showSaveNotice('Alle Text- & Bildänderungen live geschaltet.');
                      }}
                      className="tech-cta-primary h-11 text-xs px-4"
                    >
                      <span>ÄNDERUNGEN SPEICHERN</span>
                      <span className="tech-ci w-7 h-7">
                        <Save size={14} />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Section Navigation Tabs (styled as home tags) */}
                <div className="flex items-center gap-2 border-b border-[#A09048]/20 pb-4 mb-8 overflow-x-auto">
                  {[
                    { id: 'hero', label: 'Teil 1: Hero-Bereich' },
                    { id: 'problem', label: 'Teil 2: Problem & Lösung' },
                    { id: 'blocks', label: 'Teil 4: Die 2 Bausteine' },
                    { id: 'steps', label: 'Teil 5: 4-Schritte-Ablauf' },
                    { id: 'about', label: 'Teil 11: Über den CVB' },
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setCmsSection(sec.id)}
                      className={`px-4 py-2.5 rounded-2xl font-spartan font-bold uppercase tracking-wider text-xs transition-all cursor-pointer whitespace-nowrap ${
                        cmsSection === sec.id
                          ? 'bg-[#384808] text-white shadow-md'
                          : 'bg-[#F4F2E6] text-[#585828] hover:text-[#384808] border border-[#A09048]/30'
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>

                {/* Section Editors */}
                <div className="space-y-6">
                  {/* Teil 1: Hero */}
                  {cmsSection === 'hero' && (
                    <div className="p-7 rounded-[26px] border border-[#A09048]/30 bg-[#F4F2E6] space-y-4">
                      <div>
                        <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                          Hauptüberschrift (H1)
                        </label>
                        <input
                          type="text"
                          value={contentDraft.heroHeadline}
                          onChange={(e) => setContentDraft({ ...contentDraft, heroHeadline: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/30 text-base font-spartan font-black uppercase text-[#242E05] bg-white focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
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
                          className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/30 text-sm font-body text-[#242E05] bg-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
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
                          className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/30 text-sm font-body text-[#242E05] bg-white focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#A09048]/25">
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                            Hero-Bildpfad (Image URL)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.heroImage || ''}
                            placeholder="/images/luxury_motorhome_alps_1794219057461.jpg"
                            onChange={(e) => setContentDraft({ ...contentDraft, heroImage: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-2xl border border-[#A09048]/30 text-xs font-mono bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                            Alt-Text für Screenreader &amp; SEO
                          </label>
                          <input
                            type="text"
                            value={contentDraft.heroImageAlt || ''}
                            placeholder="Modernes Wohnmobil in Alpenkulisse"
                            onChange={(e) => setContentDraft({ ...contentDraft, heroImageAlt: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-2xl border border-[#A09048]/30 text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Teil 2: Problem & Lösung */}
                  {cmsSection === 'problem' && (
                    <div className="p-7 rounded-[26px] border border-[#A09048]/30 bg-[#F4F2E6] space-y-4">
                      <div>
                        <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                          Abschnittsüberschrift
                        </label>
                        <input
                          type="text"
                          value={contentDraft.problemHeadline}
                          onChange={(e) => setContentDraft({ ...contentDraft, problemHeadline: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/30 text-base font-spartan font-black uppercase text-[#242E05] bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Teil 4: Bausteine A & B */}
                  {cmsSection === 'blocks' && (
                    <div className="p-7 rounded-[26px] border border-[#A09048]/30 bg-[#F4F2E6] space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Block A */}
                        <div className="p-6 bg-white rounded-3xl border border-[#A09048]/30 space-y-4 shadow-xs">
                          <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#384808] block mb-2">
                            FÜR DEINE MIETER
                          </span>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                              Titel Baustein A
                            </label>
                            <input
                              type="text"
                              value={contentDraft.blockATitle}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockATitle: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-2xl border border-[#A09048]/30 text-sm font-spartan font-bold text-[#242E05]"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                              Beschreibung A
                            </label>
                            <textarea
                              rows={3}
                              value={contentDraft.blockAText}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockAText: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-2xl border border-[#A09048]/30 text-xs sm:text-sm text-[#585828] leading-relaxed"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                              Bildpfad A
                            </label>
                            <input
                              type="text"
                              value={contentDraft.blockAImage || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockAImage: e.target.value })}
                              className="w-full px-4 py-2 rounded-xl border border-[#A09048]/30 text-xs font-mono"
                            />
                          </div>
                        </div>

                        {/* Block B */}
                        <div className="p-6 bg-white rounded-3xl border border-[#A09048]/30 space-y-4 shadow-xs">
                          <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048] block mb-2">
                            FÜR DICH ALS VERMIETER
                          </span>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                              Titel Baustein B
                            </label>
                            <input
                              type="text"
                              value={contentDraft.blockBTitle}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBTitle: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-2xl border border-[#A09048]/30 text-sm font-spartan font-bold text-[#242E05]"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                              Beschreibung B
                            </label>
                            <textarea
                              rows={3}
                              value={contentDraft.blockBText}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBText: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-2xl border border-[#A09048]/30 text-xs sm:text-sm text-[#585828] leading-relaxed"
                            />
                          </div>
                          <div>
                            <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1">
                              Bildpfad B
                            </label>
                            <input
                              type="text"
                              value={contentDraft.blockBImage || ''}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBImage: e.target.value })}
                              className="w-full px-4 py-2 rounded-xl border border-[#A09048]/30 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Teil 5: 4 Schritte */}
                  {cmsSection === 'steps' && (
                    <div className="p-7 rounded-[26px] border border-[#A09048]/30 bg-[#F4F2E6] space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {steps.map((st) => (
                          <div key={st.id} className="p-5 bg-white rounded-2xl border border-[#A09048]/30 space-y-2 shadow-xs">
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-full bg-[#384808] text-white font-spartan font-black text-xs flex items-center justify-center shrink-0">
                                {st.number}
                              </span>
                              <input
                                type="text"
                                value={st.title}
                                onChange={(e) => updateStep(st.id, { title: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs font-spartan font-bold text-[#242E05] border border-stone-200 rounded-xl"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={st.text}
                              onChange={(e) => updateStep(st.id, { text: e.target.value })}
                              className="w-full px-3 py-2 text-xs text-[#585828] border border-stone-200 rounded-xl leading-relaxed"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Teil 11: Über den CVB */}
                  {cmsSection === 'about' && (
                    <div className="p-7 rounded-[26px] border border-[#A09048]/30 bg-[#F4F2E6] space-y-4">
                      <div>
                        <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1.5">
                          Netzwerk-Beschreibung
                        </label>
                        <textarea
                          rows={3}
                          value={contentDraft.aboutText}
                          onChange={(e) => setContentDraft({ ...contentDraft, aboutText: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/30 text-sm text-[#242E05] bg-white leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1.5">
                            Gründer &amp; Zitatgeber
                          </label>
                          <input
                            type="text"
                            value={contentDraft.aboutFounder}
                            onChange={(e) => setContentDraft({ ...contentDraft, aboutFounder: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/30 text-sm text-[#242E05] bg-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-spartan font-bold text-xs uppercase text-[#242E05] mb-1.5">
                            Kennzahl / Fakt
                          </label>
                          <input
                            type="text"
                            value={contentDraft.aboutFact}
                            onChange={(e) => setContentDraft({ ...contentDraft, aboutFact: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/30 text-sm text-[#242E05] bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Save CTA */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      updateContent(contentDraft);
                      showSaveNotice('Alle Textänderungen erfolgreich live geschaltet.');
                    }}
                    className="tech-cta-primary h-12 text-xs"
                  >
                    <span>ÄNDERUNGEN SPEICHERN</span>
                    <span className="tech-ci">
                      <Save size={15} />
                    </span>
                  </button>
                </div>
              </div>

              {/* Feature Cards Manager */}
              <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-spartan font-black text-xl sm:text-2xl uppercase tracking-tight text-[#242E05]">
                      FUNKTIONS-KARTEN (FEATURES)
                    </h3>
                  </div>

                  <button
                    onClick={() => setShowAddFeature(!showAddFeature)}
                    className="tech-cta-ghost h-10 text-xs px-4 self-start sm:self-auto"
                  >
                    <Plus size={15} className="text-[#A09048]" />
                    <span>Neue Karte hinzufügen</span>
                  </button>
                </div>

                {showAddFeature && (
                  <div className="mb-6 p-6 bg-[#F4F2E6] rounded-2xl border border-[#A09048]/35 space-y-3">
                    <h4 className="font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05]">
                      Neue Funktionskarte erstellen
                    </h4>
                    <input
                      type="text"
                      placeholder="Kartentitel (z. B. Automatisierte Kautionsabrechnung)"
                      value={newFeatureTitle}
                      onChange={(e) => setNewFeatureTitle(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#A09048]/30 bg-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="1-2 kurze Sätze Erklärung für Vermieter..."
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#A09048]/30 bg-white"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (newFeatureTitle && newFeatureText) {
                            addFeature({
                              title: newFeatureTitle,
                              text: newFeatureText,
                              icon: 'Sparkles',
                              visible: true,
                            });
                            setNewFeatureTitle('');
                            setNewFeatureText('');
                            setShowAddFeature(false);
                            showSaveNotice('Neue Funktionskarte hinzugefügt.');
                          }
                        }}
                        className="px-4 py-2 bg-[#384808] text-white text-xs font-spartan font-bold uppercase rounded-xl"
                      >
                        Hinzufügen
                      </button>
                      <button
                        onClick={() => setShowAddFeature(false)}
                        className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-bold rounded-xl"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {features.map((feat) => (
                    <div
                      key={feat.id}
                      className={`p-6 rounded-[24px] border transition-all ${
                        feat.visible
                          ? 'border-[#A09048]/30 bg-white shadow-xs hover:border-[#889028]'
                          : 'border-stone-200 bg-stone-50 opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-spartan font-black text-sm uppercase text-[#242E05]">
                          {feat.title}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => toggleFeatureVisibility(feat.id)}
                            className="p-1 text-stone-400 hover:text-[#384808]"
                            title={feat.visible ? 'Ausblenden' : 'Einblenden'}
                          >
                            {feat.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Diese Funktionskarte wirklich löschen?')) {
                                deleteFeature(feat.id);
                                showSaveNotice('Karte gelöscht.');
                              }
                            }}
                            className="p-1 text-stone-400 hover:text-red-600"
                            title="Löschen"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#585828] leading-relaxed font-body">{feat.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 4: PRICES & TARIFE (AUTHENTIC HOME PRICE BOX PREVIEW)
             ----------------------------------------------------------------------- */}
          {activeTab === 'prices' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Settings (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs space-y-6">
                <div>
                  <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                    PREISE &amp; TARIFANGABEN
                  </h2>
                  <p className="text-xs sm:text-sm text-[#585828] mt-1">
                    Änderungen an den Beiträgen werden sofort in der Preisbox und im Formular der Startseite synchronisiert.
                  </p>
                </div>

                <div className="space-y-5 font-body">
                  <div>
                    <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                      Monatspreis netto pro Fahrzeug (€)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={priceDraft.monthlyNet}
                        onChange={(e) =>
                          setPriceDraft({
                            ...priceDraft,
                            monthlyNet: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full px-5 py-3.5 rounded-2xl border border-[#A09048]/35 text-xl font-spartan font-black text-[#242E05] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#384808]/20 bg-white"
                      />
                      <span className="absolute right-5 top-3.5 text-stone-400 font-bold text-sm">
                        € / Monat netto
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                      Jahrespreis netto pro Fahrzeug (€)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={priceDraft.yearlyNet}
                        onChange={(e) =>
                          setPriceDraft({
                            ...priceDraft,
                            yearlyNet: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full px-5 py-3.5 rounded-2xl border border-[#A09048]/35 text-xl font-spartan font-black text-[#242E05] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#384808]/20 bg-white"
                      />
                      <span className="absolute right-5 top-3.5 text-stone-400 font-bold text-sm">
                        € / Jahr netto
                      </span>
                    </div>
                    <span className="text-[11px] text-[#585828] mt-1.5 block">
                      Wird jährlich gebündelt mit dem CVB-Jahresbeitrag abgerechnet.
                    </span>
                  </div>

                  <div>
                    <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05] mb-1.5">
                      Hinweistext zur Abrechnung
                    </label>
                    <textarea
                      rows={3}
                      value={priceDraft.noteText}
                      onChange={(e) => setPriceDraft({ ...priceDraft, noteText: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-[#A09048]/35 text-xs sm:text-sm text-[#585828] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#384808]/20 bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-stone-100">
                  <button
                    onClick={() => {
                      updatePriceSettings(priceDraft);
                      showSaveNotice('Tarife & Preise erfolgreich synchronisiert.');
                    }}
                    className="tech-cta-primary h-12 text-xs"
                  >
                    <span>PREISE SPEICHERN</span>
                    <span className="tech-ci">
                      <Save size={15} />
                    </span>
                  </button>
                </div>
              </div>

              {/* Exact Home Price Box Preview (5 cols) */}
              <div className="lg:col-span-5 bg-[#242E05] text-white rounded-[32px] p-7 sm:p-9 border-2 border-[#A09048]/40 shadow-2xl space-y-6 sticky top-24">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#A09048]">ECHTZEIT VORSCHAU</span>
                  <span className="text-[10px] uppercase font-spartan font-black px-2.5 py-1 rounded-full bg-[#A09048] text-[#242E05]">
                    LIVE-SYNC
                  </span>
                </div>

                <div>
                  <div className="text-xs font-spartan font-bold uppercase tracking-wider text-[#A09048]">
                    EXKLUSIVPREIS FÜR CVB-MITGLIEDER
                  </div>
                  <div className="font-spartan font-black text-5xl sm:text-6xl tracking-tight text-white mt-1 tabular-nums">
                    {priceDraft.monthlyNet.toFixed(2).replace('.', ',')} €
                    <span className="text-base font-normal text-stone-300 block sm:inline"> / Monat netto</span>
                  </div>
                  <div className="text-xs text-stone-300 mt-2">
                    Entspricht <strong>{priceDraft.yearlyNet.toFixed(2).replace('.', ',')} €</strong> netto pro Fahrzeug und Jahr.
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    'Voller Funktionsumfang für alle gemeldeten Fahrzeuge',
                    'Digitale Vorab-Einweisung & Mieter-App inklusive',
                    'DSGVO-konforme Serverinfrastruktur in Deutschland',
                    '30 Tage kostenfreie Testphase zum Start',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-stone-200">
                      <span className="w-5 h-5 rounded-full bg-[#A09048] text-[#242E05] flex items-center justify-center font-bold text-[11px] shrink-0">
                        <Check size={13} />
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 text-xs text-stone-200 leading-relaxed italic">
                  „Ich bestätige, dass CVB-Office{' '}
                  <strong className="text-white">{priceDraft.monthlyNet.toFixed(2).replace('.', ',')} €</strong> netto pro
                  Fahrzeug und Monat kostet (
                  <strong className="text-white">{priceDraft.yearlyNet.toFixed(2).replace('.', ',')} €</strong> netto pro
                  Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.“
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 5: FAQ WISSENSBASIS
             ----------------------------------------------------------------------- */}
          {activeTab === 'faq' && (
            <div className="bg-white rounded-[32px] p-7 sm:p-10 border border-[#A09048]/30 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#A09048]/20">
                <div>
                  <h2 className="font-spartan font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#242E05]">
                    FAQ WISSENSBASIS
                  </h2>
                  <p className="text-xs sm:text-sm text-[#585828] mt-1">
                    Aktuell {faqs.length} Fragen und Antworten für interessierte Vermieter hinterlegt.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddFaq(!showAddFaq)}
                  className="tech-cta-ghost h-10 text-xs px-4 self-start sm:self-auto"
                >
                  <Plus size={15} className="text-[#A09048]" />
                  <span>Neue Frage anlegen</span>
                </button>
              </div>

              {showAddFaq && (
                <div className="p-6 bg-[#F4F2E6] rounded-2xl border border-[#A09048]/35 space-y-3">
                  <h4 className="font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05]">
                    Neue Frage verfassen
                  </h4>
                  <input
                    type="text"
                    placeholder="Frage (z. B. Welche Voraussetzungen benötigt mein Fahrzeug?)"
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#A09048]/30 bg-white"
                  />
                  <textarea
                    rows={3}
                    placeholder="Ausführliche, verständliche Antwort..."
                    value={newFaqA}
                    onChange={(e) => setNewFaqA(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#A09048]/30 bg-white"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (newFaqQ && newFaqA) {
                          addFaq({ question: newFaqQ, answer: newFaqA, visible: true });
                          setNewFaqQ('');
                          setNewFaqA('');
                          setShowAddFaq(false);
                          showSaveNotice('Neue FAQ-Frage erfolgreich angelegt.');
                        }
                      }}
                      className="px-4 py-2 bg-[#384808] text-white text-xs font-spartan font-bold uppercase rounded-xl cursor-pointer"
                    >
                      Speichern
                    </button>
                    <button
                      onClick={() => setShowAddFaq(false)}
                      className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div
                    key={f.id}
                    className={`p-6 rounded-[24px] border transition-all ${
                      f.visible
                        ? 'border-[#A09048]/30 bg-white shadow-xs hover:border-[#889028]'
                        : 'border-stone-200 bg-stone-50 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#F4F2E6] border border-[#A09048]/35 font-spartan font-black text-xs text-[#384808] flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="font-spartan font-black text-base text-[#242E05]">
                          {f.question}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => toggleFaqVisibility(f.id)}
                          className="p-1.5 text-stone-400 hover:text-[#384808] rounded-lg hover:bg-stone-100"
                          title={f.visible ? 'Ausblenden' : 'Einblenden'}
                        >
                          {f.visible ? <Eye size={17} /> : <EyeOff size={17} />}
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Diese Frage wirklich löschen?')) {
                              deleteFaq(f.id);
                              showSaveNotice('Frage gelöscht.');
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          title="Löschen"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#585828] leading-relaxed font-body pl-10">
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 6: SYSTEM EINSTELLUNGEN
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
              TAB 7: MEIN ADMIN-KONTO
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
