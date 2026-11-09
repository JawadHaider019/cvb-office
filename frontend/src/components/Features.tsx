import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Smartphone,
  FileCheck,
  Globe,
  Play,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { IMAGES } from '../assets/images';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { TiltCard3D } from './TiltCard3D';

export const Features: React.FC = () => {
  const { features } = useApp();
  const visibleFeatures = features.filter((f) => f.visible);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<number>(0);
  const [isContractSigned, setIsContractSigned] = useState<boolean>(false);
  const [fleetFilter, setFleetFilter] = useState<'all' | 'free' | 'busy'>('all');

  const scrollToSection = (id: string) => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Top 3 featured spotlight modules
  const spotlightModules = [
    {
      title: 'FLOTTEN-COCKPIT',
      category: 'VERWALTUNG',
      desc: 'Alle Buchungen, Termine & Fahrzeugzustände in Echtzeit.',
      image: IMAGES.luxuryCockpitTablet,
    },
    {
      title: 'DIGITALER VERTRAG',
      category: 'RECHTSSICHER',
      desc: 'Mietverträge papierlos direkt digital unterschreiben & archivieren.',
      image: IMAGES.heroMotorhomeHandover,
    },
    {
      title: 'ONLINE-BUCHUNGSWIDGET',
      category: 'WEBSITE',
      desc: 'Live-Verfügbarkeiten & Direktanfragen auf Deiner eigenen Domain.',
      image: IMAGES.camperDigitalCockpit,
    },
  ];

  // Interactive Live Demos
  const interactiveDemos = [
    {
      id: 'fleet',
      label: 'Flotten-Cockpit',
      icon: Calendar,
      title: 'Zentrale Fahrzeugverwaltung in Echtzeit',
      desc: 'Behalte den Status aller Camper, Termine und Übergaben auf einen Blick.',
    },
    {
      id: 'videos',
      label: 'Vorab-Einweisung & QR',
      icon: Smartphone,
      title: 'Digitale Einweisung auf dem Mieter-Smartphone',
      desc: 'Video-Anleitungen und fahrzeugspezifische QR-Codes entlasten Dein Team.',
    },
    {
      id: 'contract',
      label: 'Digitaler Mietvertrag',
      icon: FileCheck,
      title: 'Rechtsgültige Signatur direkt auf dem Tablet',
      desc: 'Sofortige PDF-Erstellung, Kautionsprotokollierung und Archivierung.',
    },
    {
      id: 'widget',
      label: 'Website-Widget',
      icon: Globe,
      title: 'Direktbuchungen auf Deiner eigenen Homepage',
      desc: 'Integriere den Buchungskalender nahtlos in Deinen bestehenden Webauftritt.',
    },
  ];

  const sampleFleet = [
    { name: 'Hymer B-Klasse MasterLine', type: 'Vollintegriert', plate: 'M-CV 2026', status: 'free', dates: 'Frei ab heute' },
    { name: 'Bürstner Lyseo TD 727', type: 'Teilintegriert', plate: 'M-CV 1084', status: 'busy', dates: 'Gebucht bis 14.11.' },
    { name: 'Pössl Summit 640 Prime', type: 'Campervan', plate: 'M-CV 5541', status: 'free', dates: 'Frei ab heute' },
    { name: 'Knaus Sun I 900', type: 'Vollintegriert', plate: 'M-CV 9821', status: 'busy', dates: 'Gebucht bis 21.11.' },
  ];

  const filteredFleet = sampleFleet.filter((camper) => {
    if (fleetFilter === 'free') return camper.status === 'free';
    if (fleetFilter === 'busy') return camper.status === 'busy';
    return true;
  });

  return (
    <section id="funktionen" className="py-20 lg:py-32 bg-white text-[#384808] border-b border-[#A09048]/25 relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-12 border-b border-[#A09048]/25 gap-4">
            <div>
              <div className="tech-tag mb-3">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  HAUPTFUNKTIONEN & SYSTEM
                </span>
              </div>
              <h2 className="font-spartan font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#384808]">
                Die Komplettlösung für Vermieter im Bund<span className="text-[#A09048]">.</span>
              </h2>
            </div>

            <button
              onClick={() => scrollToSection('buchen')}
              className="tech-cta-primary group text-xs py-2 h-10"
            >
              <span>CVB-Office anfragen</span>
              <span className="tech-ci w-7 h-7">
                <ArrowRight size={13} />
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* 3-COLUMN FEATURED CARDS (Warm cream #F4F2E6 bento cards with Gold #A09048 borders) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-20">
          {spotlightModules.map((item, idx) => (
            <StaggerItem key={idx}>
              <TiltCard3D maxTilt={5} className="h-full">
                <motion.div
                  whileHover={{
                    scale: 1.025,
                    y: -6,
                    boxShadow: '0 20px 45px -15px rgba(56, 72, 8, 0.2)',
                    borderColor: '#889028',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  onClick={() => setActiveInteractiveTab(idx)}
                  className="group relative flex flex-col cursor-pointer h-full bg-[#F4F2E6] p-6 rounded-[28px] border border-[#A09048]/30 shadow-xs overflow-hidden transition-all duration-300"
                >
                  {/* Photo Box */}
                  <div className="relative h-60 sm:h-64 overflow-hidden rounded-2xl bg-stone-100 border border-[#A09048]/20 mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 text-[#384808] text-[10px] font-spartan font-bold px-3 py-1 rounded-full tracking-widest backdrop-blur-md border border-[#A09048]/40 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#889028] animate-pulse" />
                      <span>LIVE DEMO</span>
                    </div>
                  </div>

                  {/* Row 1: Title and Category */}
                  <div className="relative z-10 flex items-center justify-between mb-2">
                    <span className="font-spartan font-black text-lg text-[#384808] group-hover:text-[#889028] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#889028] font-bold">
                      {item.category}
                    </span>
                  </div>

                  {/* Row 2: Description and Arrow */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-[#585828] pt-2 mt-auto">
                    <span>{item.desc}</span>
                    <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#384808] group-hover:text-white text-[#384808] border border-[#A09048]/40 flex items-center justify-center transition-all duration-300 shrink-0 ml-3 shadow-xs">
                      <ArrowRight size={14} className="group-hover:rotate-[-45deg] transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              </TiltCard3D>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* INTERACTIVE LIVE COCKPIT EXPERIENCE */}
        <ScrollReveal delay={0.1}>
          <div className="mb-24 bg-white rounded-[32px] p-6 sm:p-10 lg:p-14 border border-[#A09048]/40 shadow-[0_20px_50px_-20px_rgba(56,72,8,0.15)] text-[#384808]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#A09048]/25 mb-8">
              <div>
                <div className="tech-tag mb-2">
                  <span className="tech-tagn">⚡</span>
                  <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                    INTERAKTIVE VORSCHAU // SOFTWARE AUSPROBIEREN
                  </span>
                </div>
                <h3 className="font-spartan font-black text-3xl sm:text-4xl text-[#384808]">
                  Erlebe CVB-Office im Live-Modus
                </h3>
              </div>

              {/* Interactive Tab Switchers */}
              <div className="flex items-center gap-1.5 p-1 bg-[#F4F2E6] border border-[#A09048]/35 rounded-full flex-wrap">
                {interactiveDemos.map((demo, idx) => {
                  const Icon = demo.icon;
                  const isActive = activeInteractiveTab === idx;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => setActiveInteractiveTab(idx)}
                      className={`flex items-center gap-2 px-4 py-2 text-xs font-spartan font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#384808] text-white shadow-xs'
                          : 'text-[#585828] hover:text-[#384808] hover:bg-white'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-[#A09048]' : 'text-[#889028]'} />
                      <span>{demo.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Screen Preview Container */}
            <div className="min-h-[320px] bg-[#F4F2E6] border border-[#A09048]/30 rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* Tab 0: Flotten-Cockpit Simulator */}
                {activeInteractiveTab === 0 && (
                  <motion.div
                    key="tab-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm text-[#384808] uppercase tracking-wider">
                          Flotten-Statusübersicht (Echtzeit-Simulation)
                        </h4>
                        <p className="text-xs text-[#585828] mt-0.5">
                          Klicke auf die Filter, um verfügbare oder gebuchte Fahrzeuge anzuzeigen:
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <button
                          onClick={() => setFleetFilter('all')}
                          className={`px-3 py-1 rounded-lg font-bold transition-colors ${fleetFilter === 'all' ? 'bg-[#384808] text-white' : 'bg-white text-[#384808] border border-[#A09048]/30'}`}
                        >
                          Alle ({sampleFleet.length})
                        </button>
                        <button
                          onClick={() => setFleetFilter('free')}
                          className={`px-3 py-1 rounded-lg font-bold transition-colors ${fleetFilter === 'free' ? 'bg-[#889028] text-white' : 'bg-white text-[#889028] border border-[#A09048]/30'}`}
                        >
                          Frei (2)
                        </button>
                        <button
                          onClick={() => setFleetFilter('busy')}
                          className={`px-3 py-1 rounded-lg font-bold transition-colors ${fleetFilter === 'busy' ? 'bg-[#A09048] text-white' : 'bg-white text-[#A09048] border border-[#A09048]/30'}`}
                        >
                          Gebucht (2)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredFleet.map((camper, idx) => (
                        <motion.div
                          whileHover={{
                            scale: 1.02,
                            y: -2,
                            boxShadow: '0 10px 25px -6px rgba(56, 72, 8, 0.1)',
                            borderColor: '#889028',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          key={idx}
                          className="bg-white p-4 rounded-xl border border-[#A09048]/25 flex items-center justify-between cursor-pointer transition-colors duration-200"
                        >
                          <div>
                            <div className="font-bold text-xs text-[#384808]">{camper.name}</div>
                            <div className="text-[11px] text-[#585828] font-mono mt-0.5">
                              {camper.plate} · {camper.type}
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                camper.status === 'free'
                                  ? 'bg-[#889028]/15 text-[#384808] border border-[#889028]/30'
                                  : 'bg-[#A09048]/15 text-[#585828] border border-[#A09048]/30'
                              }`}
                            >
                              {camper.dates}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tab 1: Vorab-Einweisung Simulator */}
                {activeInteractiveTab === 1 && (
                  <motion.div
                    key="tab-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  >
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#889028] font-bold">
                        SMARTPHONE-ANSICHT FÜR DEN MIETER
                      </span>
                      <h4 className="font-spartan font-black text-2xl text-[#384808]">
                        Keine Erklärungen mehr im Regen.
                      </h4>
                      <p className="text-xs text-[#585828] leading-relaxed">
                        Der Mieter erhält 48 Stunden vor Abholung einen persönlichen Link auf sein Smartphone. Dort sieht er 3-minütige Erklärvideos zu Markise, Heizung und Bordelektronik.
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <div className="p-3 bg-white rounded-xl border border-[#A09048]/30 flex items-center gap-2 text-xs font-bold text-[#384808]">
                          <QrCode size={18} className="text-[#889028]" />
                          <span>Fahrzeug-QR-Codes inklusive</span>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-[#A09048]/30 flex items-center gap-2 text-xs font-bold text-[#384808]">
                          <CheckCircle2 size={18} className="text-[#384808]" />
                          <span>Bestätigter Einweisungshaken</span>
                        </div>
                      </div>
                    </div>

                    {/* Mockup phone frame */}
                    <motion.div
                      whileHover={{
                        scale: 1.03,
                        boxShadow: '0 20px 45px -10px rgba(56, 72, 8, 0.25)',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="max-w-xs mx-auto bg-[#384808] text-white p-4 rounded-3xl border-4 border-[#2D3A06] shadow-xl cursor-pointer"
                    >
                      <div className="text-[10px] font-mono text-center text-[#F4F2E6] pb-2 border-b border-white/10">
                        CVB-EINWEISUNG // BÜRSTNER LYSEO
                      </div>
                      <div className="my-4 aspect-video bg-black/60 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-[#A09048] text-white flex items-center justify-center pl-0.5 group-hover:scale-110 transition-transform">
                          <Play size={16} />
                        </div>
                        <div className="absolute bottom-2 left-2 text-[9px] font-mono bg-black/60 px-1.5 py-0.5 rounded">
                          Kapitel 1: Heizung & Warmwasser (2:40 Min.)
                        </div>
                      </div>
                      <div className="space-y-2 text-[11px]">
                        <div className="flex items-center gap-2 text-[#A09048]">
                          <CheckCircle2 size={13} />
                          <span>Gasflaschen-Bedienung abgeschlossen</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#F4F2E6]/80">
                          <div className="w-3 h-3 rounded-full border border-[#F4F2E6]/50" />
                          <span>Bordtoilette & Kassette</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Tab 2: Digitaler Mietvertrag */}
                {activeInteractiveTab === 2 && (
                  <motion.div
                    key="tab-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  >
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#889028] font-bold">
                        RECHTSSICHER // 100% PAPIERLOS
                      </span>
                      <h4 className="font-spartan font-black text-2xl text-[#384808]">
                        Mietvertrag & Kaution sekundenschnell.
                      </h4>
                      <p className="text-xs text-[#585828] leading-relaxed">
                        Lasse den Mieter direkt auf dem Tablet oder Smartphone unterschreiben. Alle Bedingungen des Caravan-Vermieter-Bund sind bereits rechtssicher hinterlegt.
                      </p>
                      <button
                        onClick={() => setIsContractSigned(!isContractSigned)}
                        className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#384808] hover:bg-[#2D3A06] transition-colors cursor-pointer"
                      >
                        {isContractSigned ? 'Unterschrift zurücksetzen' : 'Live-Unterschrift simulieren'}
                      </button>
                    </div>

                    {/* Tablet Document Mockup */}
                    <div className="bg-white p-6 rounded-2xl border border-[#A09048]/30 shadow-md text-xs space-y-3 font-mono">
                      <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                        <span className="font-bold text-[#384808]">MIETVERTRAG #CVB-2026-084</span>
                        <span className="text-[#889028] font-bold">STATUS: {isContractSigned ? 'GÜLTIG' : 'OFFEN'}</span>
                      </div>
                      <div className="text-[11px] text-[#585828] space-y-1">
                        <div>Mieter: Dr. Martin Weber · München</div>
                        <div>Mietzeitraum: 15.06. – 28.06.2026 (13 Nächte)</div>
                        <div>Fahrzeug: Hymer B-Klasse ML (M-CV 2026)</div>
                        <div>Kaution: 1.500,00 € (Autorisiert)</div>
                      </div>
                      <div className="pt-3 border-t border-stone-200">
                        <div className="text-[10px] uppercase text-stone-400 mb-1">Unterschrift Mieter:</div>
                        <div className="h-12 border border-dashed border-[#A09048]/40 bg-[#F4F2E6] rounded-xl flex items-center justify-center">
                          {isContractSigned ? (
                            <span className="font-serif italic text-lg text-[#384808] tracking-wider">
                              Martin Weber (digital signiert)
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-400">Hier unterschreiben (Button links klicken)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 3: Website-Widget */}
                {activeInteractiveTab === 3 && (
                  <motion.div
                    key="tab-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-[#384808] uppercase tracking-wider">
                          Online-Buchungskalender für Deine Website
                        </h4>
                        <p className="text-xs text-[#585828]">
                          Wird per 1-Zeilen-Code in jede bestehende Website (WordPress, Wix, HTML) eingebunden:
                        </p>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-[#889028]/15 text-[#384808] px-2.5 py-0.5 rounded-full font-bold border border-[#889028]/30">
                        Live-Verbindung aktiv
                      </span>
                    </div>

                    <motion.div
                      whileHover={{
                        scale: 1.015,
                        y: -2,
                        boxShadow: '0 12px 30px -8px rgba(56, 72, 8, 0.12)',
                        borderColor: '#889028',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="bg-white p-6 rounded-2xl border border-[#A09048]/30 shadow-xs cursor-pointer transition-colors duration-200"
                    >
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono pb-4 border-b border-stone-200">
                        <div className="px-3 py-2 bg-[#F4F2E6] rounded-xl text-[#384808]">
                          Reisezeitraum: <span className="font-bold">01.08. – 15.08.2026</span>
                        </div>
                        <div className="px-3 py-2 bg-[#F4F2E6] rounded-xl text-[#384808]">
                          Station: <span className="font-bold">Hauptdepot</span>
                        </div>
                        <button className="px-4 py-2 rounded-full bg-[#384808] text-white font-bold uppercase tracking-wider text-[11px] ml-auto">
                          Verfügbarkeit prüfen
                        </button>
                      </div>
                      <div className="pt-4 flex items-center justify-between text-xs text-[#585828]">
                        <span>3 Fahrzeuge für diesen Zeitraum verfügbar</span>
                        <span className="font-bold text-[#889028]">Keine Buchungsprovision an Vermittler</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        {/* 4-COLUMN BENTO GRID: WEITERE SYSTEMLEISTUNGEN */}
        <div className="pt-16 border-t border-[#A09048]/25">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="tech-tag">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  WEITERE SYSTEMLEISTUNGEN
                </span>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleFeatures.map((feat, index) => (
              <StaggerItem key={feat.id || index}>
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                    boxShadow: '0 20px 45px -15px rgba(56, 72, 8, 0.2)',
                    borderColor: '#889028',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  className="relative flex flex-col justify-between group h-full bg-[#F4F2E6] p-7 sm:p-8 rounded-[28px] border border-[#A09048]/30 shadow-xs overflow-hidden cursor-pointer transition-all duration-300"
                >
                  <div className="relative z-10">
                    {/* Number Badge */}
                    <div className="w-11 h-11 mb-6 flex items-center justify-center text-white bg-[#384808] rounded-2xl font-spartan font-black text-sm group-hover:bg-[#889028] transition-all duration-300 shadow-xs">
                      0{index + 1}
                    </div>

                    <h3 className="font-spartan font-black text-sm uppercase tracking-wider text-[#384808] group-hover:text-[#889028] transition-colors mb-3">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#585828] leading-relaxed font-normal mb-6">
                      {feat.text}
                    </p>
                  </div>

                  <button
                    onClick={() => scrollToSection('buchen')}
                    className="relative z-10 pt-4 border-t border-[#A09048]/25 flex items-center justify-between text-xs font-spartan font-bold tracking-wider uppercase text-[#384808] group-hover:text-[#889028] transition-colors cursor-pointer text-left"
                  >
                    <span>Anfragen</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
