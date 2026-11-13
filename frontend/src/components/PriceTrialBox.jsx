'use client';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, ArrowRight, ArrowUpRight, Calculator, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
export const PriceTrialBox = () => {
    const { priceSettings, content, generalSettings, selectedVehicleCount, selectVehicleAndScrollToForm } = useApp();
    const [calcVehicles, setCalcVehicles] = useState(selectedVehicleCount || 1);
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
    const estimatedMoneySavedMonth = Math.round(calcVehicles * 280).toLocaleString('de-DE');
    const scrollToForm = () => {
        selectVehicleAndScrollToForm(calcVehicles);
    };
    return (<section id="preis" className="relative py-14 sm:py-20 lg:py-28 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#A09048]/10 rounded-full blur-[150px] pointer-events-none"/>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14">
        {/* Section Header: Split Left (Headline) & Right (Editorial Paragraph) */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-10 sm:mb-12 lg:mb-14 pb-6 sm:pb-8 border-b border-[#A09048]/20">
            {/* Left Column: Tag & Main Title */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  TARIFE & EXKLUSIVKONDITIONEN
                </span>
              </div>

              <h2 className="font-spartan text-[22px] sm:text-5xl lg:text-[42px] xl:text-6xl font-black uppercase text-[#384808] leading-[1.06] sm:leading-[1.02] tracking-tight break-words">
                EINFACHE, TRANSPARENTE PREISSTRUKTUR FÜR{' '}
                <span className="text-[#889028]">
                  CVB-MITGLIEDER<span className="text-[#A09048]">.</span>
                </span>
              </h2>
            </div>

            {/* Right Column: Editorial Paragraph */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-end">
              <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed font-body">
                Fair kalkuliert pro Fahrzeug und Monat – ohne Einrichtungsgebühr, ohne Buchungsprovisionen und 14 Tage unverbindlich testbar. Der volle Funktionsumfang gilt von Anfang an für jede Flottengröße und lässt sich jederzeit flexibel anpassen.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Master Bento Box (Olive-to-Black Architectural Gradient) */}
        <ScrollReveal delay={0.12}>
          <div className="relative bg-gradient-to-br from-[#283505] via-[#1C2603] to-[#0D1201] text-white border border-[#A09048]/40 rounded-[24px] sm:rounded-[32px] p-5 sm:p-11 lg:p-14 shadow-[0_25px_70px_rgba(24,32,4,0.28)] overflow-hidden">
            {/* Subtle ambient gold glow inside card */}
            <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-[#A09048]/15 rounded-full blur-[120px] pointer-events-none"/>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
              {/* Left (6 cols): Pricing Details */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#A09048]/40 text-[#F4F2E6] text-[11px] font-mono font-bold uppercase tracking-widest mb-5 sm:mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#A09048]"/>
                    <span>CVB-MITGLIEDSTARIF</span>
                  </div>

                  {/* Hero Price Lockup */}
                  <div className="pb-5 sm:pb-6 mb-5 sm:mb-6 border-b border-white/10">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                      <span className="font-spartan text-5xl sm:text-7xl font-black text-white tracking-tight tabular-nums leading-none">
                        {formattedMonthly} €
                      </span>
                      <span className="text-xs sm:text-base font-bold uppercase tracking-wider text-[#F4F2E6]/90">
                        netto / Fahrzeug / Monat
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-[11px] sm:text-xs font-mono text-[#F4F2E6]/90">
                      <span>= {formattedYearly} € netto pro Fahrzeug und Jahr</span>
                    </div>

                    <p className="text-sm sm:text-base text-[#F4F2E6]/80 mt-4 font-normal leading-relaxed max-w-lg">
                      {priceSettings.noteText}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 sm:space-y-3.5 text-sm text-white/95 font-medium mb-6">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Check size={12} strokeWidth={3}/>
                      </div>
                      <span>Voller Funktionsumfang & Website-Buchungswidget</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Check size={12} strokeWidth={3}/>
                      </div>
                      <span>Digitale Vorab-Einweisung per QR-Code & Video</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Check size={12} strokeWidth={3}/>
                      </div>
                      <span>Unbegrenzte Buchungen, Verträge und Mieterdaten</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Check size={12} strokeWidth={3}/>
                      </div>
                      <span>{content.trialPromiseLine}</span>
                    </li>
                  </ul>

                  {/* Exclusive CVB Membership Notice Callout */}
                  <div className="mb-6 sm:mb-7 p-4 sm:p-4.5 rounded-2xl bg-white/[0.08] border border-[#A09048]/55 backdrop-blur-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#A09048] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <ShieldCheck size={17} strokeWidth={2.5}/>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F4F2E6]">
                            Voraussetzung: CVB-Mitgliedschaft
                          </div>
                          <p className="text-xs sm:text-sm text-white/95 leading-relaxed mt-0.5">
                            <strong>CVB-Office gibt es exklusiv für CVB-Mitglieder.</strong> Noch kein Mitglied? CVB-Mitglied wirst Du schon ab 249 € netto pro Fahrzeug und Jahr.
                          </p>
                        </div>
                        <div>
                          <a href="https://caravan-vermieter-bund.de/mitglied-werden" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A09048] hover:bg-[#889028] text-white font-spartan font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:-translate-y-0.5 group">
                            <span>Jetzt Mitglied werden</span>
                            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap gap-3 sm:gap-3.5 pt-2">
                  <button onClick={scrollToForm} className="inline-flex items-center justify-center gap-2.5 sm:gap-3 min-h-[48px] px-4 sm:px-6 py-2.5 sm:py-0 rounded-full bg-white text-[#283505] hover:bg-[#F4F2E6] font-spartan font-extrabold text-xs sm:text-sm tracking-tight transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 sm:whitespace-nowrap text-center">
                    <span>CVB-Office unverbindlich anfragen</span>
                    <span className="w-6 h-6 rounded-full bg-[#384808] text-white flex items-center justify-center shrink-0">
                      <ArrowRight size={13}/>
                    </span>
                  </button>

                  <a href={generalSettings.trialLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 sm:gap-3 min-h-[48px] px-4 sm:px-6 py-2.5 sm:py-0 rounded-full bg-white/[0.06] border border-white/25 text-white hover:bg-white/15 hover:border-white/50 font-sans font-bold text-xs sm:text-sm transition-all sm:whitespace-nowrap group text-center">
                    <span>14 Tage kostenlos testen</span>
                    <span className="w-6 h-6 rounded-full bg-white text-[#283505] flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={13} strokeWidth={2.5}/>
                    </span>
                  </a>
                </div>
              </div>

              {/* Right (6 cols): Compact Flotten-Rechner & ROI Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: 0.12 }} className="lg:col-span-6 bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-8 text-[#384808] shadow-2xl border border-[#A09048]/30 flex flex-col justify-between">
                <div className="space-y-4 sm:space-y-5">
                  {/* Card Header */}
                  <div className="flex items-center gap-2.5 pb-3.5 sm:pb-4 border-b border-[#A09048]/20">
                    <div className="w-8 h-8 rounded-xl bg-[#F4F2E6] border border-[#A09048]/30 flex items-center justify-center text-[#384808]">
                      <Calculator size={16}/>
                    </div>
                    <span className="font-spartan font-black text-sm sm:text-base uppercase tracking-wider text-[#384808]">
                      FLOTTEN-RECHNER & ROI
                    </span>
                  </div>

                  {/* Fleet Size Control */}
                  <div>
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                      <label htmlFor="fleet-slider" className="text-xs font-spartan font-bold uppercase tracking-wider text-[#585828]">
                        Deine Flottengröße
                      </label>
                      <span className="font-spartan font-black text-base sm:text-lg text-[#384808] tabular-nums px-3 sm:px-3.5 py-1 bg-[#F4F2E6] rounded-xl border border-[#A09048]/30">
                        {calcVehicles} {calcVehicles === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
                      </span>
                    </div>

                    {/* Crisp 1-Click Fleet Presets */}
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-3.5">
                      {[1, 2, 5, 10].map((count) => (<motion.button key={count} type="button" whileTap={{ scale: 0.96 }} onClick={() => setCalcVehicles(count)} className={`py-2 px-1.5 sm:px-2 rounded-xl text-center border font-spartan font-bold text-[11px] sm:text-xs transition-all cursor-pointer ${calcVehicles === count
                ? 'bg-[#384808] text-white border-[#384808] shadow-sm'
                : 'bg-[#F9F8F3] hover:bg-[#F4F2E6] text-[#384808] border-[#A09048]/25'}`}>
                          {count} Fzg.
                        </motion.button>))}
                    </div>

                    <input id="fleet-slider" type="range" min="1" max="50" value={calcVehicles} onChange={(e) => {
            const val = parseInt(e.target.value, 10) || 1;
            setCalcVehicles(val);
        }} className="w-full accent-[#384808] cursor-pointer h-2 bg-[#E8E4D2] rounded-lg"/>
                  </div>

                  {/* 2-Column Clean Price Result Box */}
                  <div className="grid grid-cols-2 divide-x divide-[#A09048]/25 rounded-2xl bg-[#F4F2E6] border border-[#A09048]/30 p-3.5 sm:p-4">
                    <div className="pr-2.5 sm:pr-3">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#585828] mb-1">
                        Monatlich netto
                      </div>
                      <div className="font-spartan text-lg sm:text-2xl font-black text-[#384808] tabular-nums leading-tight">
                        {totalMonthlyCalc} €
                      </div>
                    </div>

                    <div className="pl-2.5 sm:pl-4 text-right">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#585828] mb-1">
                        Jährlich netto
                      </div>
                      <div className="font-spartan text-lg sm:text-2xl font-black text-[#384808] tabular-nums leading-tight">
                        {totalYearlyCalc} €
                      </div>
                    </div>
                  </div>

                  {/* Single-Line ROI Pill */}
                  <div className="px-3.5 sm:px-4 py-3 bg-[#F9F8F3] border border-[#A09048]/25 rounded-2xl flex items-start sm:items-center gap-2.5 text-xs sm:text-[13px] text-[#585828]">
                    <TrendingUp size={16} className="text-[#889028] shrink-0 mt-0.5 sm:mt-0"/>
                    <span>
                      Zeitersparnis: <strong className="font-bold text-[#384808]">~{estimatedHoursSavedMonth} Std./Monat</strong> (~{estimatedMoneySavedMonth} € Gegenwert)
                    </span>
                  </div>
                </div>

                {/* Calculator Action CTA */}
                <div className="mt-5">
                  <button onClick={() => selectVehicleAndScrollToForm(calcVehicles)} className="w-full min-h-[48px] px-4 sm:px-5 py-2.5 sm:py-0 rounded-full text-xs sm:text-sm font-spartan font-black uppercase tracking-wider text-white bg-[#384808] hover:bg-[#242E05] transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-md hover:-translate-y-0.5 text-center">
                    <span>Für {calcVehicles} {calcVehicles === 1 ? 'Fahrzeug' : 'Fahrzeuge'} anfragen</span>
                    <ArrowRight size={15} className="shrink-0"/>
                  </button>
                  <div className="mt-2.5 text-center">
                    <span className="text-[11px] text-[#585828]">
                      Exklusiv für CVB-Mitglieder.{' '}
                      <a href="https://caravan-vermieter-bund.de/mitglied-werden" target="_blank" rel="noopener noreferrer" className="text-[#384808] font-bold underline hover:text-[#889028] inline-flex items-center gap-0.5">
                        <span>Jetzt Mitglied werden</span>
                        <ArrowUpRight size={11}/>
                      </a>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>);
};
