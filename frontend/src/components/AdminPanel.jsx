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
  Download,
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
  Filter,
  Copy,
  Check,
  Car,
  Sparkles,
  Building2,
  Bell,
  ShieldCheck,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Calendar,
  FileText,
  Clock,
  X,
  Layers,
  Sliders,
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
    exportRequestsCsv,
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

  // If not logged in, show Executive Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#182003] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Subtle architectural background gradients */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#A09048]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#384808]/40 blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#A09048]/30 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#242E05] border-2 border-[#A09048] text-white flex items-center justify-center font-black text-2xl mb-4 shadow-lg">
              <span className="text-[#A09048]">CVB</span>
            </div>
            <h1 className="text-2xl font-black text-[#242E05] tracking-tight">CVB-Office Verwaltung</h1>
            <p className="text-xs text-[#585828] mt-1.5 leading-relaxed">
              Internes Management-Portal für Detlef Scheer &amp; das CVB-Team
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2.5">
              <AlertTriangle size={18} className="shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          {showForgotNotice && (
            <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-xl leading-relaxed">
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
              <label className="block text-xs font-bold text-[#384808] uppercase tracking-wider mb-1.5">
                Administrator E-Mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-stone-400" size={17} />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#384808] uppercase tracking-wider">
                  Zugangspasswort
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(true)}
                  className="text-[11px] text-[#A09048] hover:text-[#384808] font-bold underline"
                >
                  Passwort vergessen?
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3 text-stone-400" size={17} />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Passwort eingeben..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15"
                  required
                />
              </div>
            </div>

            {/* Quick Demo Credentials Pill */}
            <div className="p-3 bg-[#F4F2E6] border border-[#A09048]/30 rounded-xl text-[11px] text-[#585828] flex items-center justify-between">
              <span>Standard-Passwort: <strong className="font-mono text-[#242E05]">cvb-office-2026</strong></span>
              <button
                type="button"
                onClick={() => setLoginPassword('cvb-office-2026')}
                className="text-[10px] font-black uppercase text-[#384808] hover:underline bg-white px-2 py-0.5 rounded shadow-xs"
              >
                Einfügen
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#242E05] hover:bg-[#384808] text-white rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck size={18} className="text-[#A09048]" />
              <span>Sicher Anmelden</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('public')}
              className="w-full py-2.5 text-xs font-bold text-[#585828] hover:text-[#242E05] text-center transition-colors block cursor-pointer"
            >
              ← Zurück zur öffentlichen Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Nav Items Definition
  const navGroups = [
    {
      group: 'ÜBERSICHT & CRM',
      items: [
        { id: 'dashboard', label: 'Übersicht', icon: LayoutDashboard },
        { id: 'requests', label: 'Mietanfragen', icon: Inbox, badge: newRequestsCount },
      ],
    },
    {
      group: 'CONTENT & TARIFE',
      items: [
        { id: 'content', label: 'Landing Page CMS', icon: FileEdit },
        { id: 'prices', label: 'Preise & Tarife', icon: DollarSign },
        { id: 'faq', label: 'FAQ Wissensbasis', icon: HelpCircle },
      ],
    },
    {
      group: 'SYSTEM & KONTO',
      items: [
        { id: 'settings', label: 'Einstellungen', icon: Settings },
        { id: 'account', label: 'Admin-Konto', icon: User },
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F5F6F1] flex text-stone-800 font-sans antialiased">
      {/* =========================================================================
          1. LEFT ENTERPRISE SIDEBAR (Full Height, Fixed, Full Control)
         ========================================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1A2304] text-[#F4F6EE] flex flex-col justify-between border-r border-[#2B380A] shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:h-screen md:sticky md:top-0 md:shadow-none`}
      >
        {/* Top Branding */}
        <div>
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#2C380A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#242E05] border border-[#A09048]/60 text-white flex items-center justify-center font-black text-base shadow-md">
                <span className="text-[#A09048]">CVB</span>
              </div>
              <div>
                <span className="font-spartan font-black text-base tracking-tight text-white block leading-tight">
                  CVB-OFFICE
                </span>
                <span className="text-[11px] font-semibold text-[#A09048] uppercase tracking-wider block">
                  Verwaltung Konsole
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-stone-400 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Pending Alert Pill */}
          {newRequestsCount > 0 && (
            <div className="mx-4 mt-4 p-3 rounded-xl bg-[#A09048]/15 border border-[#A09048]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A09048] animate-pulse" />
                <span className="text-xs font-bold text-white">Neue Anfragen</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-[#A09048] text-[#1A2304]">
                {newRequestsCount}
              </span>
            </div>
          )}

          {/* Nav Categories */}
          <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-250px)]">
            {navGroups.map((group) => (
              <div key={group.group}>
                <div className="px-3 text-[10px] font-black uppercase tracking-wider text-[#A09048]/80 mb-2">
                  {group.group}
                </div>
                <div className="space-y-1">
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
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-[#A09048] text-[#1A2304] shadow-md font-black'
                            : 'text-[#D0D6C0] hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={isActive ? 'text-[#1A2304]' : 'text-[#A09048]'} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                              isActive ? 'bg-[#1A2304] text-white' : 'bg-[#A09048] text-[#1A2304]'
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
        <div className="p-4 border-t border-[#2C380A] bg-[#141C03]/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#A09048] text-[#1A2304] font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                DS
              </div>
              <div className="min-w-0">
                <span className="font-bold text-xs text-white block truncate">Detlef Scheer</span>
                <span className="text-[10px] text-[#A09048] block truncate">Inhaber &amp; Admin</span>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              className="p-2 text-stone-400 hover:text-red-400 hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
              title="Abmelden"
            >
              <LogOut size={16} />
            </button>
          </div>

          <button
            onClick={() => setCurrentView('public')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.07] hover:bg-white/[0.12] text-xs font-bold text-white transition-colors cursor-pointer"
          >
            <span>Öffentliche Website</span>
            <ExternalLink size={13} className="text-[#A09048]" />
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* =========================================================================
          2. FLUID FULL-WIDTH MAIN WORKSPACE
         ========================================================================= */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Sticky Top Header Navbar */}
        <header className="h-16 px-4 sm:px-8 bg-white/95 backdrop-blur-md border-b border-stone-200/90 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-stone-100 text-stone-600"
            >
              <Sliders size={20} />
            </button>

            {/* Breadcrumb path */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="text-stone-400">Verwaltung</span>
              <ChevronRight size={13} className="text-stone-300" />
              <span className="text-[#242E05] font-bold uppercase tracking-wider">
                {activeTab === 'dashboard' && 'Übersicht & KPIs'}
                {activeTab === 'requests' && 'Mietanfragen & Kontakte'}
                {activeTab === 'content' && 'Landing Page Text-CMS'}
                {activeTab === 'prices' && 'Tarife & Konditionen'}
                {activeTab === 'faq' && 'FAQ Wissensbasis'}
                {activeTab === 'settings' && 'System-Einstellungen'}
                {activeTab === 'account' && 'Administrator Profil'}
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            {/* System Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Aktiv · PostgreSQL &amp; API Online</span>
            </div>

            {/* CSV Export shortcut */}
            <button
              onClick={exportRequestsCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-[#384808] text-xs font-bold text-stone-700 hover:text-[#384808] transition-colors cursor-pointer bg-white"
            >
              <Download size={14} className="text-[#A09048]" />
              <span>CSV Export</span>
            </button>

            {/* Direct Link to Public Site */}
            <button
              onClick={() => setCurrentView('public')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#242E05] hover:bg-[#384808] text-xs font-bold text-white transition-all shadow-xs cursor-pointer"
            >
              <Eye size={14} className="text-[#A09048]" />
              <span className="hidden sm:inline">Live-Seite ansehen</span>
              <span className="sm:hidden">Seite</span>
            </button>
          </div>
        </header>

        {/* Floating Save Toast */}
        {saveSuccessMsg && (
          <div className="fixed top-20 right-6 z-50 bg-[#242E05] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200 text-sm font-bold border border-[#A09048]">
            <CheckCircle size={18} className="text-[#A09048]" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* =========================================================================
            3. TAB CONTENT PANELS (Wide Fluid Grid Layouts)
           ========================================================================= */}
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-10 py-8 space-y-8">
          {/* -----------------------------------------------------------------------
              TAB 1: DASHBOARD (EXECUTIVE OVERVIEW)
             ----------------------------------------------------------------------- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#242E05] tracking-tight">
                    Willkommen zurück, Detlef!
                  </h1>
                  <p className="text-xs sm:text-sm text-[#585828] mt-1">
                    Hier ist der aktuelle Überblick über alle Mietanfragen, Flottengrößen und Seiteninhalte.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="px-4 py-2.5 bg-[#A09048] hover:bg-[#8D7F3E] text-[#1A2304] rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-2"
                  >
                    <Inbox size={16} />
                    <span>Anfragen verwalten</span>
                  </button>
                </div>
              </div>

              {/* 4 Premium Metric Cards (Full Width 4-Col Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {/* Metric 1 */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-[#A09048]/50 transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                      Neue Anfragen
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <Inbox size={19} />
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#242E05] tabular-nums tracking-tight">
                      {newRequestsCount}
                    </div>
                    <div className="text-xs text-amber-700 font-bold mt-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>Erfordern Deine Kontaktaufnahme</span>
                    </div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-[#A09048]/50 transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                      In Bearbeitung
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Clock size={19} />
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#242E05] tabular-nums tracking-tight">
                      {inProgressCount}
                    </div>
                    <div className="text-xs text-blue-700 font-bold mt-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Smarlps-Setup im Gange</span>
                    </div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-[#A09048]/50 transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                      Erledigt
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <CheckCircle size={19} />
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#242E05] tabular-nums tracking-tight">
                      {doneCount}
                    </div>
                    <div className="text-xs text-emerald-700 font-bold mt-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Zugang vollständig eingerichtet</span>
                    </div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-[#A09048]/50 transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                      Erfasste Flotte
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#F4F2E6] text-[#384808] flex items-center justify-center font-bold">
                      <Car size={19} />
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#384808] tabular-nums tracking-tight">
                      {totalVehiclesCount} <span className="text-base font-bold text-stone-400">Wohnmobile</span>
                    </div>
                    <div className="text-xs text-[#585828] font-bold mt-1.5">
                      Gesamtanzahl über alle {requests.length} Anfragen
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Action Cards (Full-Width 3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div
                  onClick={() => setActiveTab('content')}
                  className="p-6 bg-white rounded-3xl border border-stone-200 hover:border-[#384808] transition-all group shadow-xs hover:shadow-lg cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#384808]/10 text-[#384808] flex items-center justify-center mb-4 group-hover:bg-[#384808] group-hover:text-white transition-all">
                      <FileEdit size={22} />
                    </div>
                    <h3 className="font-bold text-base text-[#242E05]">Landing Page Texte bearbeiten</h3>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                      Überschriften, Einleitungstexte, 4-Schritte-Ablauf und die 2 Kern-Bausteine direkt anpassen.
                    </p>
                  </div>
                  <div className="mt-5 text-xs font-black uppercase tracking-wider text-[#A09048] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Zum CMS Editor</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('requests')}
                  className="p-6 bg-white rounded-3xl border border-stone-200 hover:border-[#384808] transition-all group shadow-xs hover:shadow-lg cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#384808]/10 text-[#384808] flex items-center justify-center mb-4 group-hover:bg-[#384808] group-hover:text-white transition-all">
                      <Inbox size={22} />
                    </div>
                    <h3 className="font-bold text-base text-[#242E05]">Mietanfragen einsehen</h3>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                      E-Mail-Adressen, Flottengrößen, Preiseinwilligungen und Notizen im CRM verwalten.
                    </p>
                  </div>
                  <div className="mt-5 text-xs font-black uppercase tracking-wider text-[#A09048] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Anfragen öffnen ({requests.length})</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('prices')}
                  className="p-6 bg-white rounded-3xl border border-stone-200 hover:border-[#384808] transition-all group shadow-xs hover:shadow-lg cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#384808]/10 text-[#384808] flex items-center justify-center mb-4 group-hover:bg-[#384808] group-hover:text-white transition-all">
                      <DollarSign size={22} />
                    </div>
                    <h3 className="font-bold text-base text-[#242E05]">Tarife &amp; Preise anpassen</h3>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                      Aktuell hinterlegt: {priceSettings.monthlyNet.toFixed(2).replace('.', ',')} € netto / Fahrzeug / Monat.
                    </p>
                  </div>
                  <div className="mt-5 text-xs font-black uppercase tracking-wider text-[#A09048] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Preistabelle verwalten</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

              {/* Full-Width Recent Requests Preview Table */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-[#242E05]">Die neuesten Anfragen</h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Schnellzugriff auf die zuletzt eingegangenen Vermieter-Anfragen
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs font-black uppercase tracking-wider text-[#384808] hover:text-[#A09048] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Alle {requests.length} Anfragen ansehen</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-stone-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8F9F5] border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-5 py-3.5">Datum</th>
                        <th className="px-5 py-3.5">Vermieter / E-Mail</th>
                        <th className="px-5 py-3.5 text-center">Fahrzeuge</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Aktion</th>
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
                          className="hover:bg-stone-50/80 transition-colors cursor-pointer"
                        >
                          <td className="px-5 py-4 text-stone-500 whitespace-nowrap tabular-nums">
                            {req.created_at}
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-bold text-[#242E05] block">{req.email}</span>
                            {req.notes && (
                              <span className="text-[11px] text-stone-400 truncate block max-w-xs">
                                Notiz: {req.notes}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-[#384808] font-bold text-xs tabular-nums">
                              <Car size={13} className="text-[#A09048]" />
                              <span>{req.vehicle_count}</span>
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                req.status === 'neu'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                  : req.status === 'in_bearbeitung'
                                  ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              }`}
                            >
                              {req.status === 'neu'
                                ? 'Neu eingegangen'
                                : req.status === 'in_bearbeitung'
                                ? 'In Bearbeitung'
                                : 'Erledigt & Aktiv'}
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
                              className="px-3 py-1.5 text-xs font-bold text-[#384808] hover:bg-[#F4F2E6] rounded-xl border border-stone-200 transition-colors"
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
              TAB 2: REQUESTS (FULL-WIDTH MODERN CRM)
             ----------------------------------------------------------------------- */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                {/* Header with Title and Export */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
                  <div>
                    <h2 className="text-2xl font-black text-[#242E05] tracking-tight">Mietanfragen CRM</h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Alle über das Buchungsformular auf cvb-office.de eingegangenen Anträge von Vermietern.
                    </p>
                  </div>

                  <button
                    onClick={exportRequestsCsv}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#242E05] hover:bg-[#384808] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Download size={16} className="text-[#A09048]" />
                    <span>Als CSV exportieren (Excel)</span>
                  </button>
                </div>

                {/* Filter and search bar */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  {/* Search input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 text-stone-400" size={17} />
                    <input
                      type="text"
                      placeholder="Nach E-Mail, Notiz oder ID suchen..."
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15 bg-white"
                    />
                    {searchEmail && (
                      <button
                        onClick={() => setSearchEmail('')}
                        className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Status Pills */}
                  <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl text-xs overflow-x-auto shrink-0">
                    <button
                      onClick={() => setStatusFilter('all')}
                      className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter === 'all'
                          ? 'bg-white text-[#242E05] shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Alle ({requests.length})
                    </button>
                    <button
                      onClick={() => setStatusFilter('neu')}
                      className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter === 'neu'
                          ? 'bg-white text-amber-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Neu ({newRequestsCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('in_bearbeitung')}
                      className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter === 'in_bearbeitung'
                          ? 'bg-white text-blue-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      In Bearbeitung ({inProgressCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('erledigt')}
                      className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter === 'erledigt'
                          ? 'bg-white text-emerald-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Erledigt ({doneCount})
                    </button>
                  </div>
                </div>

                {/* Full Width Table */}
                <div className="overflow-x-auto rounded-2xl border border-stone-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#F8F9F5] border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-5 py-4">Eingangsdatum</th>
                        <th className="px-5 py-4">Vermieter / E-Mail</th>
                        <th className="px-5 py-4 text-center">Flottengröße</th>
                        <th className="px-5 py-4">Bearbeitungsstatus</th>
                        <th className="px-5 py-4">Preiseinwilligung</th>
                        <th className="px-5 py-4 text-right">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                      {filteredRequests.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-12 text-center text-stone-400">
                            Keine Anfragen für diesen Filter gefunden.
                          </td>
                        </tr>
                      ) : (
                        filteredRequests.map((req) => (
                          <tr
                            key={req.id}
                            className="hover:bg-stone-50/80 transition-colors cursor-pointer"
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
                                  className="text-stone-400 hover:text-[#384808] p-1"
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
                                <span className="text-[11px] text-stone-400 block truncate max-w-sm">
                                  Notiz: {req.notes}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-center">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100 font-black text-xs text-[#242E05] tabular-nums">
                                <Car size={14} className="text-[#A09048]" />
                                <span>{req.vehicle_count} Fahrzeug(e)</span>
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                  req.status === 'neu'
                                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                    : req.status === 'in_bearbeitung'
                                    ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
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
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                                <CheckCircle size={13} />
                                <span>Akzeptiert</span>
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRequest(req);
                                  setTempNote(req.notes || '');
                                }}
                                className="px-3.5 py-1.5 text-xs font-bold text-[#242E05] hover:bg-[#F4F2E6] rounded-xl border border-stone-200 transition-colors"
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
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto space-y-6">
                    <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                      <div>
                        <h3 className="font-black text-xl text-[#242E05]">Anfrage Details</h3>
                        <span className="text-xs font-mono text-stone-400">Vorgangs-ID: {selectedRequest.id}</span>
                      </div>
                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="text-stone-400 hover:text-stone-800 p-2 text-xl font-bold leading-none cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4 text-sm">
                      {/* Metric Card Overview */}
                      <div className="grid grid-cols-2 gap-4 bg-[#F8F9F5] p-4 rounded-2xl border border-stone-200">
                        <div>
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                            E-Mail-Adresse
                          </span>
                          <span className="font-bold text-[#242E05] text-base">{selectedRequest.email}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                            Gemeldete Fahrzeuge
                          </span>
                          <span className="font-bold text-[#242E05] text-base">
                            {selectedRequest.vehicle_count} Camper
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                            Eingegangen am
                          </span>
                          <span className="font-medium text-stone-700">{selectedRequest.created_at}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                            System-Status
                          </span>
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle size={14} /> In Datenbank erfasst
                          </span>
                        </div>
                      </div>

                      {/* Status selector */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-[#242E05] mb-1.5">
                          Bearbeitungsstatus ändern
                        </label>
                        <select
                          value={selectedRequest.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            updateRequestStatus(selectedRequest.id, newStatus);
                            setSelectedRequest({ ...selectedRequest, status: newStatus });
                            showSaveNotice('Bearbeitungsstatus aktualisiert.');
                          }}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold bg-white text-[#242E05] focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        >
                          <option value="neu">Neu (Erfordert Kontaktaufnahme)</option>
                          <option value="in_bearbeitung">In Bearbeitung (Smarlps Zugang wird eingerichtet)</option>
                          <option value="erledigt">Erledigt (Zugangsdaten an Kunden übermittelt)</option>
                        </select>
                      </div>

                      {/* Price consent text accepted */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-stone-500 mb-1.5">
                          Bestätigte Preiseinwilligung (Rechtsnachweis):
                        </label>
                        <div className="p-4 bg-[#F4F2E6]/80 rounded-2xl border border-[#A09048]/30 text-xs text-[#585828] leading-relaxed italic">
                          „{selectedRequest.price_consent_text}“
                        </div>
                      </div>

                      {/* Private notes */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-[#242E05] mb-1.5">
                          Interne Notiz (nur für Dich als Administrator sichtbar)
                        </label>
                        <textarea
                          rows={3}
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="z. B. Am 10.11. telefoniert. Möchte 5 Wohnmobile für 2026 einbinden..."
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-[#242E05] focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        />
                        <button
                          onClick={() => {
                            updateRequestNote(selectedRequest.id, tempNote);
                            showSaveNotice('Interne Notiz erfolgreich gespeichert.');
                          }}
                          className="mt-2 px-4 py-2 bg-[#242E05] text-white text-xs font-bold rounded-xl hover:bg-[#384808] transition-colors cursor-pointer"
                        >
                          Notiz speichern
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-5 border-t border-stone-200">
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
                        className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
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
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                {/* CMS Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
                  <div>
                    <h2 className="text-2xl font-black text-[#242E05] tracking-tight">Landing Page Text-CMS</h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Passe alle Abschnitte, Überschriften, Einführungstexte und Bildpfade der öffentlichen Seite an.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
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
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs sm:text-sm font-bold border border-stone-300 transition-colors cursor-pointer"
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#242E05] hover:bg-[#384808] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                    >
                      <Save size={16} className="text-[#A09048]" />
                      <span>Änderungen speichern</span>
                    </button>
                  </div>
                </div>

                {/* Section Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-stone-200 pb-3 mb-6 overflow-x-auto text-xs font-bold">
                  {[
                    { id: 'hero', label: 'Teil 1: Hero' },
                    { id: 'problem', label: 'Teil 2: Problem & Lösung' },
                    { id: 'blocks', label: 'Teil 4: Die 2 Bausteine' },
                    { id: 'steps', label: 'Teil 5: 4 Schritte' },
                    { id: 'about', label: 'Teil 11: Über den CVB' },
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setCmsSection(sec.id)}
                      className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                        cmsSection === sec.id
                          ? 'bg-[#242E05] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>

                {/* Section Editor Panes */}
                <div className="space-y-6">
                  {/* Teil 1: Hero */}
                  {cmsSection === 'hero' && (
                    <div className="p-6 rounded-2xl border border-stone-200 bg-[#FBFBFA] space-y-4">
                      <span className="font-black text-xs uppercase tracking-wider text-[#A09048] block">
                        Teil 1: Hero-Bereich (Haupttitel ganz oben)
                      </span>

                      <div>
                        <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                          Hauptüberschrift (H1)
                        </label>
                        <input
                          type="text"
                          value={contentDraft.heroHeadline}
                          onChange={(e) => setContentDraft({ ...contentDraft, heroHeadline: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold text-[#242E05] bg-white focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                          Einführungstext (Subheadline)
                        </label>
                        <textarea
                          rows={3}
                          value={contentDraft.heroText}
                          onChange={(e) => setContentDraft({ ...contentDraft, heroText: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#242E05] bg-white focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                          Vertrauenszeile (Kicker über dem Titel)
                        </label>
                        <input
                          type="text"
                          value={contentDraft.trustLine}
                          onChange={(e) => setContentDraft({ ...contentDraft, trustLine: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#242E05] bg-white focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                        <div>
                          <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                            Hero-Bildpfad (Image URL)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.heroImage || ''}
                            placeholder="/images/luxury_motorhome_alps_1794219057461.jpg"
                            onChange={(e) => setContentDraft({ ...contentDraft, heroImage: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-stone-300 text-xs font-mono bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                            Alt-Text für SEO
                          </label>
                          <input
                            type="text"
                            value={contentDraft.heroImageAlt || ''}
                            placeholder="Modernes Wohnmobil in Alpenkulisse"
                            onChange={(e) => setContentDraft({ ...contentDraft, heroImageAlt: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Teil 2: Problem & Lösung */}
                  {cmsSection === 'problem' && (
                    <div className="p-6 rounded-2xl border border-stone-200 bg-[#FBFBFA] space-y-4">
                      <span className="font-black text-xs uppercase tracking-wider text-[#A09048] block">
                        Teil 2: Problem &amp; Lösung
                      </span>

                      <div>
                        <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                          Abschnittsüberschrift
                        </label>
                        <input
                          type="text"
                          value={contentDraft.problemHeadline}
                          onChange={(e) => setContentDraft({ ...contentDraft, problemHeadline: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold text-[#242E05] bg-white focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                        />
                      </div>
                    </div>
                  )}

                  {/* Teil 4: Bausteine A & B */}
                  {cmsSection === 'blocks' && (
                    <div className="p-6 rounded-2xl border border-stone-200 bg-[#FBFBFA] space-y-6">
                      <span className="font-black text-xs uppercase tracking-wider text-[#A09048] block">
                        Teil 4: Die 2 Kern-Bausteine
                      </span>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Block A */}
                        <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3">
                          <span className="px-2.5 py-1 rounded bg-[#242E05] text-white text-[10px] font-black uppercase">
                            Baustein A: Für Deine Mieter
                          </span>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Titel Baustein A</label>
                            <input
                              type="text"
                              value={contentDraft.blockATitle}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockATitle: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Beschreibung A</label>
                            <textarea
                              rows={3}
                              value={contentDraft.blockAText}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockAText: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs leading-relaxed"
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

                        {/* Block B */}
                        <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3">
                          <span className="px-2.5 py-1 rounded bg-[#A09048] text-[#1A2304] text-[10px] font-black uppercase">
                            Baustein B: Für Dich als Vermieter
                          </span>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Titel Baustein B</label>
                            <input
                              type="text"
                              value={contentDraft.blockBTitle}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBTitle: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#242E05] mb-1">Beschreibung B</label>
                            <textarea
                              rows={3}
                              value={contentDraft.blockBText}
                              onChange={(e) => setContentDraft({ ...contentDraft, blockBText: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs leading-relaxed"
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
                    </div>
                  )}

                  {/* Teil 5: 4 Schritte */}
                  {cmsSection === 'steps' && (
                    <div className="p-6 rounded-2xl border border-stone-200 bg-[#FBFBFA] space-y-4">
                      <span className="font-black text-xs uppercase tracking-wider text-[#A09048] block">
                        Teil 5: Der Ablauf in 4 Schritten
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {steps.map((st) => (
                          <div key={st.id} className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#242E05] text-white text-xs font-bold flex items-center justify-center shrink-0">
                                {st.number}
                              </span>
                              <input
                                type="text"
                                value={st.title}
                                onChange={(e) => updateStep(st.id, { title: e.target.value })}
                                className="w-full px-2.5 py-1.5 text-xs font-bold text-[#242E05] border border-stone-200 rounded-lg"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={st.text}
                              onChange={(e) => updateStep(st.id, { text: e.target.value })}
                              className="w-full px-2.5 py-1.5 text-xs text-stone-600 border border-stone-200 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Teil 11: Über den CVB */}
                  {cmsSection === 'about' && (
                    <div className="p-6 rounded-2xl border border-stone-200 bg-[#FBFBFA] space-y-4">
                      <span className="font-black text-xs uppercase tracking-wider text-[#A09048] block">
                        Teil 11: Über das Netzwerk &amp; Gründer Detlef Scheer
                      </span>

                      <div>
                        <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                          Netzwerk-Beschreibung
                        </label>
                        <textarea
                          rows={3}
                          value={contentDraft.aboutText}
                          onChange={(e) => setContentDraft({ ...contentDraft, aboutText: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#242E05] bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
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
                          <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
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
                </div>

                {/* Save CTA */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      updateContent(contentDraft);
                      showSaveNotice('Alle Textänderungen erfolgreich live geschaltet.');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#242E05] hover:bg-[#384808] text-white rounded-xl text-sm font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    <Save size={16} className="text-[#A09048]" />
                    <span>Änderungen speichern</span>
                  </button>
                </div>
              </div>

              {/* Feature Cards Manager */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-[#242E05]">Funktions-Karten (Features)</h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Aktuell {features.length} Karten im System. Du kannst Karten ein- oder ausblenden.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddFeature(!showAddFeature)}
                    className="px-4 py-2 bg-[#889028] hover:bg-[#727920] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Plus size={15} />
                    <span>Neue Karte hinzufügen</span>
                  </button>
                </div>

                {showAddFeature && (
                  <div className="mb-6 p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#242E05]">
                      Neue Funktionskarte erstellen
                    </h4>
                    <input
                      type="text"
                      placeholder="Kartentitel (z. B. Automatisierte Kautionsabrechnung)"
                      value={newFeatureTitle}
                      onChange={(e) => setNewFeatureTitle(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="1-2 kurze Sätze Erklärung für Vermieter..."
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white"
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
                        className="px-4 py-2 bg-[#242E05] text-white text-xs font-bold rounded-xl"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((feat) => (
                    <div
                      key={feat.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        feat.visible
                          ? 'border-stone-200 bg-white shadow-xs'
                          : 'border-stone-200 bg-stone-50 opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-bold text-xs sm:text-sm text-[#242E05]">{feat.title}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => toggleFeatureVisibility(feat.id)}
                            className="p-1 text-stone-400 hover:text-[#242E05]"
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
                      <p className="text-xs text-stone-600 leading-relaxed">{feat.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 4: PRICES & KONDITIONEN (SIDE-BY-SIDE INTERACTIVE LAYOUT)
             ----------------------------------------------------------------------- */}
          {activeTab === 'prices' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Settings (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-[#242E05] tracking-tight">Preise &amp; Tarifangaben</h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Änderungen an den Preisen werden in Echtzeit in der öffentlichen Preisbox und im Formular übernommen.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
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
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-lg font-black text-[#242E05] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                      />
                      <span className="absolute right-4 top-3 text-stone-400 text-sm font-bold">€ / Monat netto</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
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
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-lg font-black text-[#242E05] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                      />
                      <span className="absolute right-4 top-3 text-stone-400 text-sm font-bold">€ / Jahr netto</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1.5 block">
                      Wird jährlich gebündelt mit der CVB-Mitgliedschaft abgerechnet.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                      Hinweistext zur Abrechnung
                    </label>
                    <textarea
                      rows={3}
                      value={priceDraft.noteText}
                      onChange={(e) => setPriceDraft({ ...priceDraft, noteText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#384808]/20"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-stone-100">
                  <button
                    onClick={() => {
                      updatePriceSettings(priceDraft);
                      showSaveNotice('Tarife & Preise erfolgreich synchronisiert.');
                    }}
                    className="px-6 py-3 bg-[#242E05] hover:bg-[#384808] text-white rounded-xl text-sm font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save size={16} className="text-[#A09048]" />
                    <span>Preise speichern</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Card (5 cols) */}
              <div className="lg:col-span-5 bg-[#242E05] text-white rounded-3xl p-6 sm:p-8 border border-[#A09048]/40 shadow-xl space-y-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-[#A09048]">
                    Live Vorschau für Besucher
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#A09048] text-[#242E05]">
                    Echtzeit
                  </span>
                </div>

                <div>
                  <div className="text-xs uppercase text-[#A09048] font-bold">Monatlicher Beitrag</div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1 tabular-nums">
                    {priceDraft.monthlyNet.toFixed(2).replace('.', ',')} €
                    <span className="text-sm font-medium text-stone-300 block sm:inline"> / Monat netto</span>
                  </div>
                  <div className="text-xs text-stone-300 mt-2">
                    Entspricht {priceDraft.yearlyNet.toFixed(2).replace('.', ',')} € netto pro Fahrzeug und Jahr.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.08] border border-white/10 text-xs text-stone-200 leading-relaxed italic">
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
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                <div>
                  <h2 className="text-2xl font-black text-[#242E05] tracking-tight">FAQ Wissensbasis</h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Aktuell {faqs.length} Fragen und Antworten für interessierte Vermieter hinterlegt.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddFaq(!showAddFaq)}
                  className="px-4 py-2.5 bg-[#889028] hover:bg-[#727920] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus size={16} />
                  <span>Neue Frage anlegen</span>
                </button>
              </div>

              {showAddFaq && (
                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#242E05]">Neue Frage verfassen</h4>
                  <input
                    type="text"
                    placeholder="Frage (z. B. Welche Voraussetzungen benötigt mein Fahrzeug?)"
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white"
                  />
                  <textarea
                    rows={3}
                    placeholder="Ausführliche, verständliche Antwort..."
                    value={newFaqA}
                    onChange={(e) => setNewFaqA(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white"
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
                      className="px-4 py-2 bg-[#242E05] text-white text-xs font-bold rounded-xl cursor-pointer"
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
                    className={`p-5 rounded-2xl border transition-all ${
                      f.visible
                        ? 'border-stone-200 bg-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <span className="font-bold text-sm sm:text-base text-[#242E05]">
                        {i + 1}. {f.question}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => toggleFaqVisibility(f.id)}
                          className="p-1.5 text-stone-400 hover:text-[#242E05] rounded-lg hover:bg-stone-100"
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
                    <p className="text-xs sm:text-sm text-[#585828] leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 6: SYSTEM EINSTELLUNGEN
             ----------------------------------------------------------------------- */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs max-w-4xl space-y-6">
              <div className="pb-6 border-b border-stone-100">
                <h2 className="text-2xl font-black text-[#242E05] tracking-tight">System-Einstellungen</h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  E-Mail-Benachrichtigungen, externe Verlinkungen und Systemkontrollen für cvb-office.de.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                    Benachrichtigungs-E-Mail (Admin-Alarm)
                  </label>
                  <input
                    type="email"
                    value={settingsDraft.alertEmail}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, alertEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    An diese Adresse wird Detlef unverzüglich informiert, sobald ein Vermieter ein Formular ausfüllt.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                    Smarlps Testphase-Link (Trial Link)
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.trialLink}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, trialLink: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium font-mono text-xs"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Ziel-URL bei Klick auf „14 Tage kostenlos testen“ auf der Startseite.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                    CVB Hauptwebsite
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.cvbWebsiteLink}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, cvbWebsiteLink: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#242E05] mb-1.5">
                    Öffentliche Kontakt-E-Mail
                  </label>
                  <input
                    type="email"
                    value={settingsDraft.contactEmail}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, contactEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                  className="px-6 py-2.5 bg-[#242E05] hover:bg-[#384808] text-white rounded-xl text-sm font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save size={16} className="text-[#A09048]" />
                  <span>Einstellungen speichern</span>
                </button>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 7: MEIN ADMIN-KONTO
             ----------------------------------------------------------------------- */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs max-w-2xl space-y-6">
              <div className="pb-6 border-b border-stone-100">
                <h2 className="text-2xl font-black text-[#242E05] tracking-tight">Administrator Profil</h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Sicherheitsangaben und Authentifizierung für Detlef Scheer.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F9F5] border border-stone-200 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="font-bold text-stone-500">Angemeldeter Benutzer:</span>
                  <span className="font-black text-[#242E05]">Detlef Scheer (Inhaber)</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="font-bold text-stone-500">E-Mail-Adresse:</span>
                  <span className="font-mono text-stone-700">detlef@caravan-vermieter-bund.de</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-500">Brute-Force-Schutz:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck size={15} /> Aktiv (15 Min. Sperre nach 5 Fehlversuchen)
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => showSaveNotice('Ein neuer Passwort-Link wurde an detlef@caravan-vermieter-bund.de gesendet.')}
                  className="w-full py-3 px-4 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold text-[#242E05] hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Neues Passwort per E-Mail anfordern
                </button>

                <button
                  onClick={logoutAdmin}
                  className="w-full py-3 px-4 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
