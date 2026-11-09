import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, ArrowRight, ArrowUpRight, Calculator, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

export const PriceTrialBox: React.FC = () => {
  const { priceSettings, content, generalSettings, selectedVehicleCount, selectVehicleAndScrollToForm } = useApp();
  const [calcVehicles, setCalcVehicles] = useState<number>(selectedVehicleCount || 4);

  const formattedMonthly = priceSettings.monthlyNet.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedYearly = priceSettings.yearlyNet.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const totalMonthlyCalc = (calcVehicles * priceSettings.monthlyNet).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const totalYearlyCalc = (calcVehicles * priceSettings.yearlyNet).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // ROI & Time Savings metrics for conversion
  const estimatedHoursSavedMonth = Math.round(calcVehicles * 7.5);
  const estimatedMoneySavedMonth = Math.round(calcVehicles * 280);

  const scrollToForm = () => {
    selectVehicleAndScrollToForm(calcVehicles);
  };

  return (
    <section id="preis" className="relative py-24 lg:py-32 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#A09048]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <ScrollReveal>
          <div className="tech-tag mb-4">
            <span className="tech-tagn">✦</span>
            <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
              TARIFE & VERBUNDKONDITIONEN
            </span>
          </div>

          <h2 className="font-spartan text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#384808] leading-[1.02] tracking-tight mb-16 max-w-3xl">
            EINFACHE, TRANSPARENTE PREISSTRUKTUR FÜR{' '}
            <span className="text-[#889028]">
              VERBUNDMITGLIEDER<span className="text-[#A09048]">.</span>
            </span>
          </h2>
        </ScrollReveal>

        {/* Master Tech Destination Bento Box */}
        <ScrollReveal delay={0.15}>
          <div className="relative bg-[#384808] text-white border border-[#A09048] rounded-[32px] p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Pricing Details */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2D3A06] border border-[#A09048]/40 text-[#A09048] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#A09048] animate-ping" />
                  CVB-MITGLIEDSTARIF
                </div>

                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                  <span className="font-spartan text-6xl sm:text-7xl lg:text-8xl font-black text-[#A09048] tracking-tight tabular-nums drop-shadow-sm">
                    {formattedMonthly} €
                  </span>
                  <span className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#F4F2E6]">
                    netto / Fahrzeug / Monat
                  </span>
                </div>

                <div className="inline-block px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-[#F4F2E6]/90 mb-6">
                  = {formattedYearly} € netto pro Fahrzeug und Jahr
                </div>

                <p className="text-sm sm:text-base text-[#F4F2E6]/90 mb-8 font-normal leading-relaxed">
                  {priceSettings.noteText}
                </p>

                <ul className="space-y-3.5 text-xs sm:text-sm text-white font-medium mb-10">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>Voller Funktionsumfang & Website-Buchungswidget</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>Digitale Vorab-Einweisung per QR-Code & Video</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>Unbegrenzte Buchungen, Verträge und Mieterdaten</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{content.trialPromiseLine}</span>
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-3 h-12 px-6 rounded-full bg-white text-[#384808] hover:bg-[#F4F2E6] font-spartan font-bold text-sm tracking-tight transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 justify-center"
                  >
                    <span>CVB-Office unverbindlich anfragen</span>
                    <div className="w-7 h-7 rounded-full bg-[#384808] text-white flex items-center justify-center">
                      <ArrowRight size={13} />
                    </div>
                  </button>

                  <a
                    href={generalSettings.trialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-transparent border border-white/40 text-white hover:bg-white/10 hover:border-white font-sans font-bold text-sm transition-all justify-center"
                  >
                    <span>14 Tage kostenlos testen</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>

              {/* Right: Interactive Flotten-Rechner & ROI Card */}
              <div className="lg:col-span-5 bg-white rounded-[28px] p-7 sm:p-9 text-[#384808] shadow-2xl border border-[#A09048]/25">
                <div className="flex items-center justify-between gap-2.5 mb-6 pb-4 border-b border-[#A09048]/20">
                  <div className="flex items-center gap-2">
                    <Calculator size={18} className="text-[#889028]" />
                    <span className="font-spartan font-black text-sm uppercase tracking-wider text-[#384808]">
                      FLOTTEN-RECHNER & ROI
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#F4F2E6] text-[#384808] border border-[#A09048]/35 px-2.5 py-1 rounded-full font-black tracking-wider">
                    LIVE-KALKULATION
                  </span>
                </div>

                {/* Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#585828]">
                      Deine Flottengröße:
                    </label>
                    <span className="font-spartan font-black text-lg text-[#384808] tabular-nums px-3 py-1 bg-[#F4F2E6] rounded-xl border border-[#A09048]/30">
                      {calcVehicles} {calcVehicles === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
                    </span>
                  </div>

                  {/* 1-Click German Fleet Presets (High CRO impact) */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      { count: 2, label: '2 Fzg.', sub: 'Start' },
                      { count: 5, label: '5 Fzg.', sub: 'Beliebt' },
                      { count: 10, label: '10 Fzg.', sub: 'Mittel' },
                      { count: 20, label: '20+ Fzg.', sub: 'Groß' },
                    ].map((preset) => (
                      <button
                        key={preset.count}
                        type="button"
                        onClick={() => setCalcVehicles(preset.count)}
                        className={`py-1.5 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                          calcVehicles === preset.count
                            ? 'bg-[#384808] text-white border-[#384808] shadow-sm'
                            : 'bg-stone-50 hover:bg-[#F4F2E6] text-[#384808] border-stone-200'
                        }`}
                      >
                        <div className="font-spartan font-bold text-xs leading-none">{preset.label}</div>
                        <div className={`text-[9px] mt-0.5 ${calcVehicles === preset.count ? 'text-[#A09048]' : 'text-stone-400'}`}>
                          {preset.sub}
                        </div>
                      </button>
                    ))}
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={calcVehicles}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setCalcVehicles(val);
                    }}
                    className="w-full accent-[#384808] cursor-pointer h-2.5 bg-stone-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#585828] mt-2">
                    <span>1 Fahrzeug</span>
                    <span>25</span>
                    <span>50 Fahrzeuge</span>
                  </div>
                </div>

                {/* Monthly & Yearly Investment */}
                <div className="space-y-3 pt-4 border-t border-[#A09048]/20">
                  <div className="flex justify-between items-center text-xs text-[#585828]">
                    <span className="font-medium">Monatlicher Verbundpreis:</span>
                    <span className="font-mono font-bold text-sm text-[#384808] tabular-nums">
                      {totalMonthlyCalc} € netto
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-2 border-t border-stone-100">
                    <span className="font-bold text-[#384808]">Jährlicher Gesamtbetrag:</span>
                    <span className="font-spartan text-3xl font-black text-[#384808] tabular-nums">
                      {totalYearlyCalc} € <span className="text-xs font-sans font-normal text-[#585828]">netto</span>
                    </span>
                  </div>
                </div>

                {/* Dynamic ROI & Time Savings Banner */}
                <motion.div
                  key={calcVehicles}
                  initial={{ opacity: 0.8, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-[#F4F2E6] border border-[#A09048]/30 rounded-2xl text-xs text-[#384808] space-y-1.5"
                >
                  <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider text-[#889028]">
                    <TrendingUp size={15} />
                    <span>Geschätzte Zeitersparnis für Dein Team:</span>
                  </div>
                  <div className="text-xs leading-relaxed text-[#585828]">
                    ca. <strong className="font-bold text-[#384808]">{estimatedHoursSavedMonth} Stunden weniger Büro- & Übergabeaufwand</strong> pro Monat (Gegenwert ~{estimatedMoneySavedMonth} €).
                  </div>
                </motion.div>

                {/* Pre-fill CTA Button directly syncing to Form */}
                <div className="mt-6">
                  <button
                    onClick={() => selectVehicleAndScrollToForm(calcVehicles)}
                    className="w-full py-3.5 px-4 rounded-full text-xs font-black uppercase tracking-wider text-white bg-[#384808] hover:bg-[#2D3A06] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-98"
                  >
                    <span>Für {calcVehicles} {calcVehicles === 1 ? 'Fahrzeug' : 'Fahrzeuge'} anfragen</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="mt-4 text-[11px] text-[#585828] flex items-start gap-2">
                  <ShieldCheck size={15} className="shrink-0 mt-0.5 text-[#889028]" />
                  <span>
                    Die Abrechnung erfolgt gesammelt und bequem über Deine jährliche CVB-Mitgliedsgebühr.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
