'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RequestStatus, SignUpRequest } from '../types';
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
  Clock,
  Check,
  ChevronRight,
  Shield,
  KeyRound,
} from 'lucide-react';

type AdminTab =
  | 'dashboard'
  | 'requests'
  | 'content'
  | 'prices'
  | 'faq'
  | 'settings'
  | 'account';

export const AdminPanel: React.FC = () => {
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
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('detlef@caravan-vermieter-bund.de');
  const [loginPassword, setLoginPassword] = useState('cvb-office-2026');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  // Request list state
  const [searchEmail, setSearchEmail] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | RequestStatus>('all');
  const [selectedRequest, setSelectedRequest] = useState<SignUpRequest | null>(null);
  const [tempNote, setTempNote] = useState('');

  // Save feedback state
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

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

  const showSaveNotice = (msg = 'Gespeichert.') => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // If not logged in, show Login Screen (Section 8.2 Login)
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F4F2E6] flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#384808]/20 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#384808] text-white flex items-center justify-center font-black text-xl mb-3 shadow-md">
              CVB
            </div>
            <h1 className="text-2xl font-black text-[#384808]">CVB-Office Verwaltung</h1>
            <p className="text-xs text-[#585828] mt-1">
              Melde Dich an, um Anfragen einzusehen und Texte zu ändern.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {showForgotNotice && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-xl">
              Ein Link zum Zurücksetzen wurde an {loginEmail} gesendet (Simulation).
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoginError(null);
              const res = loginAdmin(loginPassword);
              if (!res.success) {
                setLoginError(res.error || 'Fehler beim Anmelden.');
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-[#384808] mb-1">E-Mail</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#384808] focus:border-[#384808] focus:ring-1 focus:ring-[#384808]"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-[#384808]">Passwort</label>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(true)}
                  className="text-[11px] text-[#889028] hover:underline"
                >
                  Passwort vergessen?
                </button>
              </div>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#384808] focus:border-[#384808] focus:ring-1 focus:ring-[#384808]"
                required
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Standard-Passwort: <code className="font-mono text-[#384808]">cvb-office-2026</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#384808] hover:bg-[#283405] text-white font-bold text-sm rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2"
            >
              <KeyRound size={16} />
              <span>Anmelden</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('public')}
              className="w-full py-2 text-xs font-semibold text-[#585828] hover:text-[#384808] text-center mt-2"
            >
              ← Zurück zur öffentlichen Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesEmail = r.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesEmail && matchesStatus;
  });

  const newRequestsCount = requests.filter((r) => r.status === 'neu').length;
  const inProgressCount = requests.filter((r) => r.status === 'in_bearbeitung').length;
  const doneCount = requests.filter((r) => r.status === 'erledigt').length;

  return (
    <div className="min-h-screen bg-stone-50 text-[#585828] flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-[#384808] text-white px-4 sm:px-6 py-3.5 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A09048] text-[#384808] font-black flex items-center justify-center text-sm shadow-xs">
              CVB
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base leading-none block">
                CVB-Office Verwaltung
              </span>
              <span className="text-[11px] text-[#F4F2E6]/85">Eingeloggt als Detlef Scheer</span>
            </div>
          </div>

          {/* Quick links & Exit */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentView('public')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <span>Seite ansehen</span>
              <ExternalLink size={13} />
            </button>

            <button
              onClick={logoutAdmin}
              className="p-1.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
              title="Abmelden"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Save Toast */}
      {saveSuccessMsg && (
        <div className="fixed top-16 right-6 z-50 bg-[#384808] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top duration-200 text-sm font-bold border border-[#A09048]">
          <CheckCircle size={18} className="text-[#A09048]" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-60 shrink-0">
          <nav className="bg-white rounded-2xl p-2 border border-stone-200 shadow-xs flex md:flex-col gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left w-full whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-[#384808] text-white shadow-xs'
                  : 'text-[#585828] hover:bg-stone-100 hover:text-[#384808]'
              }`}
            >
              <LayoutDashboard size={17} />
              <span>Übersicht</span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left w-full whitespace-nowrap ${
                activeTab === 'requests'
                  ? 'bg-[#384808] text-white shadow-xs'
                  : 'text-[#585828] hover:bg-stone-100 hover:text-[#384808]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox size={17} />
                <span>Anfragen</span>
              </div>
              {newRequestsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-[#A09048] text-[#384808]">
                  {newRequestsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left w-full whitespace-nowrap ${
                activeTab === 'content'
                  ? 'bg-[#384808] text-white shadow-xs'
                  : 'text-[#585828] hover:bg-stone-100 hover:text-[#384808]'
              }`}
            >
              <FileEdit size={17} />
              <span>Seite bearbeiten</span>
            </button>

            <button
              onClick={() => setActiveTab('prices')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left w-full whitespace-nowrap ${
                activeTab === 'prices'
                  ? 'bg-[#384808] text-white shadow-xs'
                  : 'text-[#585828] hover:bg-stone-100 hover:text-[#384808]'
              }`}
            >
              <DollarSign size={17} />
              <span>Preise</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left w-full whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'bg-[#384808] text-white shadow-xs'
                  : 'text-[#585828] hover:bg-stone-100 hover:text-[#384808]'
              }`}
            >
              <HelpCircle size={17} />
              <span>FAQ verwalten</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left w-full whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-[#384808] text-white shadow-xs'
                  : 'text-[#585828] hover:bg-stone-100 hover:text-[#384808]'
              }`}
            >
              <Settings size={17} />
              <span>Einstellungen</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left w-full whitespace-nowrap ${
                activeTab === 'account'
                  ? 'bg-[#384808] text-white shadow-xs'
                  : 'text-[#585828] hover:bg-stone-100 hover:text-[#384808]'
              }`}
            >
              <User size={17} />
              <span>Mein Konto</span>
            </button>
          </nav>

          <div className="mt-4 p-4 bg-white rounded-2xl border border-stone-200 text-xs space-y-2 hidden md:block">
            <span className="font-bold text-[#384808] block">Technischer Support</span>
            <p className="text-stone-500">
              Bei Fragen zur Landing Page oder zum Smarlps-Partnerzugang wende Dich an Web Mavien.
            </p>
          </div>
        </aside>

        {/* Tab Content Panels */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                  <div className="text-xs font-bold text-stone-500 uppercase">Neue Anfragen</div>
                  <div className="text-3xl font-black text-[#384808] mt-1 tabular-nums">
                    {newRequestsCount}
                  </div>
                  <div className="text-[11px] text-amber-700 font-semibold mt-1">
                    Müssen noch bearbeitet werden
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                  <div className="text-xs font-bold text-stone-500 uppercase">In Bearbeitung</div>
                  <div className="text-3xl font-black text-[#889028] mt-1 tabular-nums">
                    {inProgressCount}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Smarlps-Setup läuft</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                  <div className="text-xs font-bold text-stone-500 uppercase">Erledigt</div>
                  <div className="text-3xl font-black text-emerald-700 mt-1 tabular-nums">
                    {doneCount}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Zugang aktiv</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                  <div className="text-xs font-bold text-stone-500 uppercase">Gesamtanfragen</div>
                  <div className="text-3xl font-black text-stone-900 mt-1 tabular-nums">
                    {requests.length}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Seit Start der Seite</div>
                </div>
              </div>

              {/* Big Action Buttons (Section 8.2) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('content')}
                  className="p-6 bg-white rounded-2xl border-2 border-stone-200 hover:border-[#384808] text-left transition-all group shadow-xs hover:shadow-md cursor-pointer"
                >
                  <FileEdit className="text-[#384808] mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <div className="font-bold text-base text-[#384808]">Seite bearbeiten</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Texte, Überschriften und Abschnitte der 12 Teile anpassen.
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('requests')}
                  className="p-6 bg-white rounded-2xl border-2 border-stone-200 hover:border-[#384808] text-left transition-all group shadow-xs hover:shadow-md cursor-pointer"
                >
                  <Inbox className="text-[#384808] mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <div className="font-bold text-base text-[#384808]">Anfragen einsehen</div>
                  <div className="text-xs text-stone-500 mt-1">
                    E-Mails, Fahrzeugzahlen und bestätigte Preise verwalten.
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('prices')}
                  className="p-6 bg-white rounded-2xl border-2 border-stone-200 hover:border-[#384808] text-left transition-all group shadow-xs hover:shadow-md cursor-pointer"
                >
                  <DollarSign className="text-[#384808] mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <div className="font-bold text-base text-[#384808]">Preise anpassen</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Aktueller Satz: {priceSettings.monthlyNet.toFixed(2).replace('.', ',')} € / Monat.
                  </div>
                </button>
              </div>

              {/* Last 5 requests preview */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-[#384808]">Die letzten Anfragen</h3>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs font-bold text-[#889028] hover:underline"
                  >
                    Alle ansehen ({requests.length}) →
                  </button>
                </div>

                <div className="divide-y divide-stone-100">
                  {requests.slice(0, 5).map((req) => (
                    <div
                      key={req.id}
                      onClick={() => {
                        setSelectedRequest(req);
                        setTempNote(req.notes || '');
                        setActiveTab('requests');
                      }}
                      className="py-3 flex items-center justify-between cursor-pointer hover:bg-stone-50 px-2 rounded-lg transition-colors"
                    >
                      <div>
                        <div className="font-bold text-sm text-[#384808]">{req.email}</div>
                        <div className="text-xs text-stone-500">
                          {req.vehicle_count} Fahrzeug(e) · {req.created_at}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            req.status === 'neu'
                              ? 'bg-amber-100 text-amber-900'
                              : req.status === 'in_bearbeitung'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {req.status === 'neu'
                            ? 'Neu'
                            : req.status === 'in_bearbeitung'
                            ? 'In Bearbeitung'
                            : 'Erledigt'}
                        </span>
                        <ChevronRight size={16} className="text-stone-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REQUESTS (LIST & DETAIL) */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-black text-[#384808]">Mietanfragen</h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Alle über das Formular auf cvb-office.de eingegangenen Anträge.
                    </p>
                  </div>

                  <button
                    onClick={exportRequestsCsv}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#384808] hover:bg-[#283405] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                  >
                    <Download size={15} />
                    <span>Als CSV exportieren (Excel)</span>
                  </button>
                </div>

                {/* Filter and search bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 text-stone-400" size={16} />
                    <input
                      type="text"
                      placeholder="Nach E-Mail suchen..."
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-sm focus:border-[#384808] focus:ring-1 focus:ring-[#384808]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl text-xs">
                    <button
                      onClick={() => setStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                        statusFilter === 'all' ? 'bg-white text-[#384808] shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Alle ({requests.length})
                    </button>
                    <button
                      onClick={() => setStatusFilter('neu')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                        statusFilter === 'neu' ? 'bg-white text-amber-800 shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Neu ({newRequestsCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('in_bearbeitung')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                        statusFilter === 'in_bearbeitung'
                          ? 'bg-white text-blue-800 shadow-xs'
                          : 'text-stone-600'
                      }`}
                    >
                      In Bearbeitung ({inProgressCount})
                    </button>
                    <button
                      onClick={() => setStatusFilter('erledigt')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                        statusFilter === 'erledigt'
                          ? 'bg-white text-emerald-800 shadow-xs'
                          : 'text-stone-600'
                      }`}
                    >
                      Erledigt ({doneCount})
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-stone-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-4 py-3">Datum</th>
                        <th className="px-4 py-3">E-Mail</th>
                        <th className="px-4 py-3 text-center">Fahrzeuge</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Aktion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {filteredRequests.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-stone-400">
                            Keine Anfragen gefunden.
                          </td>
                        </tr>
                      ) : (
                        filteredRequests.map((req) => (
                          <tr
                            key={req.id}
                            className="hover:bg-stone-50 transition-colors cursor-pointer"
                            onClick={() => {
                              setSelectedRequest(req);
                              setTempNote(req.notes || '');
                            }}
                          >
                            <td className="px-4 py-3 text-stone-500 whitespace-nowrap tabular-nums">
                              {req.created_at}
                            </td>
                            <td className="px-4 py-3 font-bold text-[#384808]">
                              {req.email}
                            </td>
                            <td className="px-4 py-3 text-center font-bold tabular-nums">
                              {req.vehicle_count}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  req.status === 'neu'
                                    ? 'bg-amber-100 text-amber-900'
                                    : req.status === 'in_bearbeitung'
                                    ? 'bg-blue-100 text-blue-900'
                                    : 'bg-emerald-100 text-emerald-900'
                                }`}
                              >
                                {req.status === 'neu'
                                  ? 'Neu'
                                  : req.status === 'in_bearbeitung'
                                  ? 'In Bearbeitung'
                                  : 'Erledigt'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRequest(req);
                                  setTempNote(req.notes || '');
                                }}
                                className="px-2.5 py-1 text-xs font-semibold text-[#384808] hover:bg-[#F4F2E6] rounded-lg border border-stone-200"
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

              {/* Request Detail Modal (Section 8.2 Request Detail) */}
              {selectedRequest && (
                <div
                  role="dialog"
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
                >
                  <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-4">
                    <div className="flex justify-between items-start border-b border-stone-200 pb-3">
                      <div>
                        <h3 className="font-bold text-lg text-[#384808]">Anfrage Details</h3>
                        <span className="text-xs text-stone-400">ID: {selectedRequest.id}</span>
                      </div>
                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="text-stone-400 hover:text-stone-800 text-xl font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100">
                        <div>
                          <span className="text-xs font-bold text-stone-500 block">E-Mail-Adresse</span>
                          <span className="font-bold text-[#384808]">{selectedRequest.email}</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-stone-500 block">Fahrzeuge</span>
                          <span className="font-bold text-[#384808]">{selectedRequest.vehicle_count}</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-stone-500 block">Eingegangen am</span>
                          <span>{selectedRequest.created_at}</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-stone-500 block">E-Mail Benachrichtigung</span>
                          <span className="text-emerald-700 font-semibold">Erfolgreich zugestellt</span>
                        </div>
                      </div>

                      {/* Status selector */}
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Bearbeitungsstatus
                        </label>
                        <select
                          value={selectedRequest.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as RequestStatus;
                            updateRequestStatus(selectedRequest.id, newStatus);
                            setSelectedRequest({ ...selectedRequest, status: newStatus });
                            showSaveNotice('Status aktualisiert.');
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-bold bg-white"
                        >
                          <option value="neu">Neu</option>
                          <option value="in_bearbeitung">In Bearbeitung (Smarlps Zugang wird eingerichtet)</option>
                          <option value="erledigt">Erledigt (Zugang an Kunden übermittelt)</option>
                        </select>
                      </div>

                      {/* Price consent text accepted */}
                      <div>
                        <label className="block text-xs font-bold text-stone-500 mb-1">
                          Bestätigter Preistext (Nachweis):
                        </label>
                        <div className="p-3 bg-[#F4F2E6]/60 rounded-xl border border-[#A09048]/30 text-xs text-[#585828] italic">
                          „{selectedRequest.price_consent_text}“
                        </div>
                      </div>

                      {/* Private notes */}
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Interne Notiz (nur für Dich sichtbar)
                        </label>
                        <textarea
                          rows={3}
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="z. B. Telefoniert am 10.11., 5 Fahrzeuge..."
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-[#384808]"
                        />
                        <button
                          onClick={() => {
                            updateRequestNote(selectedRequest.id, tempNote);
                            showSaveNotice('Notiz gespeichert.');
                          }}
                          className="mt-1 px-3 py-1.5 bg-[#384808] text-white text-xs font-bold rounded-lg hover:bg-[#283405]"
                        >
                          Notiz speichern
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                      <button
                        onClick={() => {
                          if (window.confirm('Wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
                            deleteRequest(selectedRequest.id);
                            setSelectedRequest(null);
                            showSaveNotice('Anfrage gelöscht.');
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Trash2 size={14} />
                        <span>Anfrage löschen</span>
                      </button>

                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold"
                      >
                        Schließen
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTENT EDITOR (SEITE BEARBEITEN) */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-200">
                  <div>
                    <h2 className="text-xl font-black text-[#384808]">Texte der Landing Page</h2>
                    <p className="text-xs text-stone-500">
                      Passe Überschriften, Einführungstexte und Bausteine direkt an.
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
                            showSaveNotice('Vorherige Version erfolgreich wiederhergestellt.');
                          } else {
                            // Revert to default site content
                            setContentDraft({ ...contentDraft, ...content });
                            showSaveNotice('Keine ältere Version gefunden – aktueller Stand geladen.');
                          }
                        } catch {
                          showSaveNotice('Wiederherstellung nicht möglich.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs sm:text-sm font-bold border border-stone-300"
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
                        showSaveNotice('Alle Text- & Bildänderungen übernommen.');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#384808] hover:bg-[#283405] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md"
                    >
                      <Save size={16} />
                      <span>Änderungen speichern</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Teil 1: Hero */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4">
                    <span className="font-bold text-xs uppercase text-[#889028] block">
                      Teil 1: Hero-Bereich (Kopfzeile)
                    </span>

                    <div>
                      <label className="block text-xs font-bold text-[#384808] mb-1">
                        Hauptüberschrift (H1)
                      </label>
                      <input
                        type="text"
                        value={contentDraft.heroHeadline}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, heroHeadline: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold"
                      />
                      <span className="text-[11px] text-stone-400 mt-1 block">
                        So wird dieser Text ganz oben auf der Seite als Haupttitel angezeigt.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#384808] mb-1">
                        Einführungstext (Subheadline)
                      </label>
                      <textarea
                        rows={2}
                        value={contentDraft.heroText}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, heroText: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#384808] mb-1">
                        Vertrauenszeile (Kicker über dem Titel)
                      </label>
                      <input
                        type="text"
                        value={contentDraft.trustLine}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, trustLine: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Hero-Bildpfad (Image URL / Placeholder)
                        </label>
                        <input
                          type="text"
                          value={contentDraft.heroImage || ''}
                          placeholder="/images/luxury_camper_hero.jpg"
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, heroImage: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Alt-Text für Screenreader & SEO
                        </label>
                        <input
                          type="text"
                          value={contentDraft.heroImageAlt || ''}
                          placeholder="Modernes Reisemobil vor moderner Vermiet-Station"
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, heroImageAlt: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Teil 2: Problem & Lösung */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4">
                    <span className="font-bold text-xs uppercase text-[#889028] block">
                      Teil 2: Problem & Lösung
                    </span>

                    <div>
                      <label className="block text-xs font-bold text-[#384808] mb-1">
                        Abschnittsüberschrift
                      </label>
                      <input
                        type="text"
                        value={contentDraft.problemHeadline}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, problemHeadline: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  {/* Teil 4: Bausteine A & B */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4">
                    <span className="font-bold text-xs uppercase text-[#889028] block">
                      Teil 4: Die 2 Bausteine
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Titel Baustein A (Vorab-Einweisung)
                        </label>
                        <input
                          type="text"
                          value={contentDraft.blockATitle}
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, blockATitle: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold"
                        />
                        <label className="block text-xs font-bold text-[#384808] mt-2 mb-1">
                          Beschreibungstext A
                        </label>
                        <textarea
                          rows={3}
                          value={contentDraft.blockAText}
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, blockAText: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                        />
                        <div className="mt-2 space-y-1.5">
                          <label className="block text-[11px] font-bold text-[#384808]">
                            Bildpfad A (Image URL)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.blockAImage || ''}
                            placeholder="/images/hero_motorhome_handover.jpg"
                            onChange={(e) =>
                              setContentDraft({ ...contentDraft, blockAImage: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-mono"
                          />
                          <input
                            type="text"
                            value={contentDraft.blockAImageAlt || ''}
                            placeholder="Alt-Text: Schlüsselübergabe Reisemobil"
                            onChange={(e) =>
                              setContentDraft({ ...contentDraft, blockAImageAlt: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Titel Baustein B (Vermiet-Office)
                        </label>
                        <input
                          type="text"
                          value={contentDraft.blockBTitle}
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, blockBTitle: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold"
                        />
                        <label className="block text-xs font-bold text-[#384808] mt-2 mb-1">
                          Beschreibungstext B
                        </label>
                        <textarea
                          rows={3}
                          value={contentDraft.blockBText}
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, blockBText: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                        />
                        <div className="mt-2 space-y-1.5">
                          <label className="block text-[11px] font-bold text-[#384808]">
                            Bildpfad B (Cockpit Image URL)
                          </label>
                          <input
                            type="text"
                            value={contentDraft.blockBImage || ''}
                            placeholder="/images/camper_digital_cockpit.jpg"
                            onChange={(e) =>
                              setContentDraft({ ...contentDraft, blockBImage: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-mono"
                          />
                          <input
                            type="text"
                            value={contentDraft.blockBImageAlt || ''}
                            placeholder="Alt-Text: Digitales Vermiet-Cockpit"
                            onChange={(e) =>
                              setContentDraft({ ...contentDraft, blockBImageAlt: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teil 11: Über CVB */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4">
                    <span className="font-bold text-xs uppercase text-[#889028] block">
                      Teil 11: Über den Caravan-Vermieter-Bund
                    </span>

                    <div>
                      <label className="block text-xs font-bold text-[#384808] mb-1">
                        Beschreibungstext Netzwerk
                      </label>
                      <textarea
                        rows={2}
                        value={contentDraft.aboutText}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, aboutText: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Gründer & Zitatgeber
                        </label>
                        <input
                          type="text"
                          value={contentDraft.aboutFounder}
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, aboutFounder: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Kennzahl / Fakt
                        </label>
                        <input
                          type="text"
                          value={contentDraft.aboutFact}
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, aboutFact: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Über-CVB Bildpfad (Image URL)
                        </label>
                        <input
                          type="text"
                          value={contentDraft.aboutImage || ''}
                          placeholder="/images/camper_digital_cockpit.jpg"
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, aboutImage: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#384808] mb-1">
                          Alt-Text für Über-CVB Bild
                        </label>
                        <input
                          type="text"
                          value={contentDraft.aboutImageAlt || ''}
                          placeholder="Digitales Cockpit und Camper Innenraum"
                          onChange={(e) =>
                            setContentDraft({ ...contentDraft, aboutImageAlt: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Teil 5: Ablauf in 4 Schritten */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4">
                    <span className="font-bold text-xs uppercase text-[#889028] block">
                      Teil 5: Wie es funktioniert (Die 4 Schritte)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {steps.map((st) => (
                        <div key={st.id} className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#384808] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                              {st.number}
                            </span>
                            <input
                              type="text"
                              value={st.title}
                              onChange={(e) => updateStep(st.id, { title: e.target.value })}
                              className="w-full px-2 py-1 text-xs font-bold text-[#384808] border border-stone-200 rounded"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={st.text}
                            onChange={(e) => updateStep(st.id, { text: e.target.value })}
                            className="w-full px-2 py-1 text-xs text-stone-600 border border-stone-200 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      updateContent(contentDraft);
                      showSaveNotice('Alle Textänderungen übernommen.');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#384808] hover:bg-[#283405] text-white rounded-xl text-sm font-bold shadow-md"
                  >
                    <Save size={16} />
                    <span>Änderungen speichern</span>
                  </button>
                </div>
              </div>

              {/* Feature Cards Manager (Section 8.2 & 5 Part 3) */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-base text-[#384808]">
                      Funktions-Karten (Features)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Aktuell {features.length} Karten hinterlegt. Du kannst Karten ausblenden oder neue hinzufügen.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddFeature(!showAddFeature)}
                    className="px-3.5 py-1.5 bg-[#889028] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Neue Karte</span>
                  </button>
                </div>

                {showAddFeature && (
                  <div className="mb-6 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                    <h4 className="font-bold text-xs text-[#384808]">Neue Funktionskarte anlegen</h4>
                    <div>
                      <input
                        type="text"
                        placeholder="Titel der Karte"
                        value={newFeatureTitle}
                        onChange={(e) => setNewFeatureTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        placeholder="1-2 Sätze Erklärung..."
                        value={newFeatureText}
                        onChange={(e) => setNewFeatureText(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                      />
                    </div>
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
                            showSaveNotice('Funktionskarte hinzugefügt.');
                          }
                        }}
                        className="px-4 py-1.5 bg-[#384808] text-white text-xs font-bold rounded-lg"
                      >
                        Hinzufügen
                      </button>
                      <button
                        onClick={() => setShowAddFeature(false)}
                        className="px-4 py-1.5 bg-stone-200 text-stone-700 text-xs font-bold rounded-lg"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feat) => (
                    <div
                      key={feat.id}
                      className={`p-3.5 rounded-xl border transition-colors ${
                        feat.visible
                          ? 'border-stone-200 bg-white'
                          : 'border-stone-200 bg-stone-50 opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="font-bold text-xs text-[#384808]">{feat.title}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleFeatureVisibility(feat.id)}
                            className="p-1 text-stone-400 hover:text-[#384808]"
                            title={feat.visible ? 'Ausblenden' : 'Einblenden'}
                          >
                            {feat.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Funktionskarte löschen?')) {
                                deleteFeature(feat.id);
                                showSaveNotice('Karte gelöscht.');
                              }
                            }}
                            className="p-1 text-stone-400 hover:text-red-600"
                            title="Löschen"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-2">{feat.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRICES (Section 8.2 Prices) */}
          {activeTab === 'prices' && (
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#384808]">Preise & Tarifangaben</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Wenn Du hier die Preise änderst, werden die Preisbox und die Bestätigung im Buchungsformular automatisch synchronisiert.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#384808] mb-1">
                    Monatspreis netto pro Fahrzeug (€)
                  </label>
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
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold text-[#384808] tabular-nums"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Beispiel: 8.33 € netto
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#384808] mb-1">
                    Jahrespreis netto pro Fahrzeug (€)
                  </label>
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
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold text-[#384808] tabular-nums"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Beispiel: 100.00 € netto (wird mit dem CVB-Jahresbeitrag abgerechnet)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#384808] mb-1">
                    Hinweistext zur Abrechnung
                  </label>
                  <textarea
                    rows={2}
                    value={priceDraft.noteText}
                    onChange={(e) =>
                      setPriceDraft({ ...priceDraft, noteText: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-[#585828]"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    So wird dieser Text auf der Seite unter dem Preis angezeigt.
                  </span>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 bg-[#F4F2E6] rounded-xl border border-[#A09048]/30">
                <span className="text-[11px] font-bold text-[#889028] uppercase block mb-1">
                  Vorschau des Formular-Bestätigungstextes:
                </span>
                <p className="text-xs text-[#384808] italic">
                  „Ich bestätige, dass CVB-Office{' '}
                  {priceDraft.monthlyNet.toFixed(2).replace('.', ',')} € netto pro Fahrzeug und
                  Monat kostet ({priceDraft.yearlyNet.toFixed(2).replace('.', ',')} € netto pro
                  Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen
                  CVB-Mitgliedsgebühr berechnet wird.“
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    updatePriceSettings(priceDraft);
                    showSaveNotice('Preise erfolgreich aktualisiert.');
                  }}
                  className="px-6 py-2.5 bg-[#384808] hover:bg-[#283405] text-white rounded-xl text-sm font-bold shadow-md flex items-center gap-2"
                >
                  <Save size={16} />
                  <span>Preise speichern</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ (Section 8.2 FAQ) */}
          {activeTab === 'faq' && (
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-[#384808]">Häufige Fragen (FAQ)</h2>
                  <p className="text-xs text-stone-500">
                    Fragen und Antworten bearbeiten, ausblenden oder neue hinzufügen.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddFaq(!showAddFaq)}
                  className="px-4 py-2 bg-[#384808] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus size={15} />
                  <span>Frage hinzufügen</span>
                </button>
              </div>

              {showAddFaq && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <h4 className="font-bold text-xs text-[#384808]">Neue Frage erfassen</h4>
                  <input
                    type="text"
                    placeholder="Frage..."
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                  />
                  <textarea
                    rows={2}
                    placeholder="Antwort..."
                    value={newFaqA}
                    onChange={(e) => setNewFaqA(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (newFaqQ && newFaqA) {
                          addFaq({ question: newFaqQ, answer: newFaqA, visible: true });
                          setNewFaqQ('');
                          setNewFaqA('');
                          setShowAddFaq(false);
                          showSaveNotice('FAQ hinzugefügt.');
                        }
                      }}
                      className="px-4 py-1.5 bg-[#384808] text-white text-xs font-bold rounded-lg"
                    >
                      Speichern
                    </button>
                    <button
                      onClick={() => setShowAddFaq(false)}
                      className="px-4 py-1.5 bg-stone-200 text-stone-700 text-xs font-bold rounded-lg"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <div
                    key={f.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      f.visible ? 'border-stone-200 bg-white' : 'border-stone-200 bg-stone-50 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <span className="font-bold text-sm text-[#384808]">
                        {i + 1}. {f.question}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => toggleFaqVisibility(f.id)}
                          className="p-1 text-stone-400 hover:text-[#384808]"
                          title={f.visible ? 'Ausblenden' : 'Einblenden'}
                        >
                          {f.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Diese Frage wirklich löschen?')) {
                              deleteFaq(f.id);
                              showSaveNotice('Frage gelöscht.');
                            }
                          }}
                          className="p-1 text-stone-400 hover:text-red-600"
                          title="Löschen"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#585828] leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS (Section 8.2 Settings) */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#384808]">System-Einstellungen</h2>
                <p className="text-xs text-stone-500">
                  E-Mail-Zustellung, Links und SEO-Texte für cvb-office.de.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#384808] mb-1">
                    E-Mail für neue Anfragen (Alarm)
                  </label>
                  <input
                    type="email"
                    value={settingsDraft.alertEmail}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, alertEmail: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    An diese Adresse wird Detlef benachrichtigt, sobald ein Mitglied anfragt.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#384808] mb-1">
                    Smarlps Testphase-Link (Trial Link)
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.trialLink}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, trialLink: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Öffnet sich beim Klick auf „14 Tage kostenlos testen“ im neuen Tab.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#384808] mb-1">
                    CVB Hauptwebsite
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.cvbWebsiteLink}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, cvbWebsiteLink: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#384808] mb-1">
                    Kontakt-E-Mail (auf der Website sichtbar)
                  </label>
                  <input
                    type="email"
                    value={settingsDraft.contactEmail}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, contactEmail: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                <button
                  onClick={() => {
                    if (window.confirm('Wirklich alle Inhalte auf den Auslieferungszustand zurücksetzen?')) {
                      resetAllToDefaults();
                      showSaveNotice('Auf Standardinhalte zurückgesetzt.');
                    }
                  }}
                  className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  <span>Auf Standard zurücksetzen</span>
                </button>

                <button
                  onClick={() => {
                    updateGeneralSettings(settingsDraft);
                    showSaveNotice('Einstellungen gespeichert.');
                  }}
                  className="px-6 py-2.5 bg-[#384808] hover:bg-[#283405] text-white rounded-xl text-sm font-bold shadow-md flex items-center gap-2"
                >
                  <Save size={16} />
                  <span>Speichern</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: ACCOUNT */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs max-w-md space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#384808]">Admin-Zugang</h2>
                <p className="text-xs text-stone-500">
                  Benutzerdaten für den Administrator Detlef Scheer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-stone-500 block">Benutzer:</span>
                  <span className="font-bold text-[#384808]">Detlef Scheer (Inhaber)</span>
                </div>
                <div>
                  <span className="font-bold text-stone-500 block">E-Mail:</span>
                  <span>detlef@caravan-vermieter-bund.de</span>
                </div>
                <div>
                  <span className="font-bold text-stone-500 block">Sicherheit:</span>
                  <span className="text-emerald-700 font-semibold">
                    15 Min. Sperre nach 5 Fehlversuchen aktiv
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => showSaveNotice('Passwort-Änderungslink gesendet.')}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-300 text-xs font-bold text-[#384808] hover:bg-stone-50"
                >
                  Neues Passwort per E-Mail anfordern
                </button>

                <button
                  onClick={logoutAdmin}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold flex items-center justify-center gap-2"
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
