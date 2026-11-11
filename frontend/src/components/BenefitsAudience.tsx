import React from 'react';
import { useApp } from '../context/AppContext';
import { defaultBenefits, defaultAudience } from '../data/defaultContent';
import {
  Clock,
  Zap,
  Eye,
  TrendingUp,
  ShieldCheck,
  Layers,
  Sparkles,
  Caravan,
  Compass,
  Laptop,
  MapPin,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';

const benefitIcons: Record<string, LucideIcon> = {
  Clock,
  Zap,
  Eye,
  ShieldCheck,
  Layers,
  Sparkles,
};

const testimonials = [
  {
    num: '01',
    icon: Clock,
    title: 'Familienbetrieb (6 Fahrzeuge)',
    region: 'Bayern · 50 % Zeitersparnis',
    quote:
      '„Die Video-Einweisung vorab spart uns samstags pro Übergabe mindestens 30 Minuten. Die Mieter wissen bereits, wie Toilette und Gas funktionieren.“',
  },
  {
    num: '02',
    icon: TrendingUp,
    title: 'Wohnmobilvermietung (14 Mobile)',
    region: 'NRW · 0 % Provision',
    quote:
      '„Mit dem 1-Zeilen-Kalender auf unserer Website buchen Kunden direkt bei uns statt über teure Vermittlungsportale. 0 % Provision ab Tag eins.“',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Camper-Station (3 Vans)',
    region: 'Norddeutschland · Rechtssicher',
    quote:
      '„Die geprüften Verbands-Mietverträge und die digitale Unterschrift auf dem Tablet geben uns und unseren Mietern volle Rechtssicherheit.“',
  },
];

const audienceIcons: Record<string, LucideIcon> = {
  Caravan,
  Compass,
  Laptop,
  MapPin,
};

export const BenefitsAudience: React.FC = () => {
  const { generalSettings } = useApp();

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* BAND 1: White Background — Split Left Headline + Numbered 1-6 Benefit Track Right */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-white text-[#242E05] border-b border-[#A09048]/20 overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            {/* Left Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal>
                <div className="tech-tag mb-4">
                  <span className="tech-tagn">✦</span>
                  <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                    VORTEILE FÜR VERMIETER
                  </span>
                </div>

                <h2 className="font-spartan text-[26px] sm:text-5xl lg:text-[50px] font-black uppercase text-[#242E05] leading-[1.05] sm:leading-[1.03] tracking-tight mb-4 sm:mb-5">
                  WARUM SICH CVB-OFFICE FÜR DEINEN BETRIEB{' '}
                  <span className="text-[#889028]">
                    AUSZAHLT<span className="text-[#A09048]">.</span>
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed mb-6 sm:mb-7 max-w-md font-body">
                  Automatisierte Abläufe, volle Kostenkontrolle und digitale Rechtssicherheit – entwickelt für den Vermietalltag ohne IT-Ballast.
                </p>

                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto h-12 px-6 rounded-full bg-[#242E05] hover:bg-[#384808] text-white font-spartan font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Jetzt starten</span>
                  <ArrowRight size={15} />
                </button>
              </ScrollReveal>
            </div>

            {/* Right Column (7 Cols): Vertical Numbered Step List */}
            <div className="lg:col-span-7 relative">
              {/* Vertical Connecting Line */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute left-5 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#384808]/25 via-[#889028]/45 to-[#384808]"
              />

              <div className="space-y-3 sm:space-y-3.5">
                {defaultBenefits.map((b, idx) => {
                  const isLast = idx === defaultBenefits.length - 1;
                  const Icon = benefitIcons[b.icon] || Sparkles;
                  return (
                    <ScrollReveal key={idx} delay={idx * 0.05}>
                      <div className="flex items-center gap-3 sm:gap-5">
                        {/* Number Circle */}
                        <div
                          className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-spartan font-black text-xs sm:text-sm shrink-0 shadow-sm ${
                            isLast
                              ? 'bg-[#889028] text-white ring-4 ring-[#889028]/25'
                              : idx < 3
                                ? 'bg-[#384808] text-white'
                                : 'bg-[#889028] text-white'
                          }`}
                        >
                          {idx + 1}
                        </div>

                        {/* Pill Row Card */}
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.18 }}
                          className={`flex-1 rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 transition-colors ${
                            isLast
                              ? 'bg-[#242E05] text-white shadow-xl'
                              : 'bg-[#F9F8F3] border border-[#A09048]/25 text-[#242E05] shadow-xs hover:shadow-md hover:border-[#A09048]/45'
                          }`}
                        >
                          <div className="min-w-0">
                            <h3
                              className={`font-spartan font-black text-xs sm:text-base uppercase tracking-tight leading-snug ${
                                isLast ? 'text-white' : 'text-[#242E05]'
                              }`}
                            >
                              {b.title}
                            </h3>
                            <p
                              className={`text-xs sm:text-[13px] leading-snug mt-0.5 ${
                                isLast ? 'text-[#F4F2E6]/85' : 'text-[#585828]'
                              }`}
                            >
                              {b.text}
                            </p>
                          </div>

                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isLast
                                ? 'bg-[#889028] text-white'
                                : 'bg-white text-[#384808] border border-[#A09048]/25 shadow-2xs'
                            }`}
                            aria-hidden="true"
                          >
                            <Icon size={17} strokeWidth={2.2} className="sm:w-[18px] sm:h-[18px]" />
                          </div>
                        </motion.div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 2: Dark Olive Gradient — Praxis-Stimmen Cards + Zielgruppen Banner */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-[#283505] via-[#131A02] to-[#060801] text-white border-b border-[#A09048]/25 overflow-hidden">
        {/* Soft centered glow behind cards */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#889028]/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-10 lg:px-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-12">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#A09048] block mb-3">
                ★ STIMMEN AUS DER VERMIETPRAXIS
              </span>
              <h2 className="font-spartan text-[26px] sm:text-4xl lg:text-[46px] font-black uppercase text-white tracking-tight leading-[1.06] sm:leading-[1.04]">
                WAS VERMIETER AN <br className="hidden sm:block" />
                <span className="text-[#A09048]">CVB-OFFICE SCHÄTZEN.</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* 3 Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10">
            {testimonials.map((t, idx) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#A09048]/40 rounded-[22px] p-5 sm:p-7 flex flex-col justify-between shadow-xl transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#889028] text-white flex items-center justify-center shadow-md">
                        <Icon size={19} />
                      </div>
                      <span className="font-spartan font-black text-3xl text-white/15 tracking-tight leading-none select-none">
                        {t.num}
                      </span>
                    </div>

                    <h3 className="font-spartan font-bold text-base text-white tracking-tight mb-2 sm:mb-2.5">
                      {t.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-[#F4F2E6]/75 leading-relaxed font-sans mb-4 sm:mb-5">
                      {t.quote}
                    </p>
                  </div>

                  <div className="text-[11px] font-mono font-semibold text-[#A09048] tracking-wide">
                    {t.region}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Centered Audience Banner */}
          <ScrollReveal delay={0.1}>
            <div className="relative rounded-[24px] sm:rounded-[32px] py-9 px-5 sm:py-16 sm:px-12 bg-gradient-to-br from-[#3D4F09] via-[#51680B] to-[#889028]/75 border border-[#A09048]/40 shadow-2xl overflow-hidden text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(160,144,72,0.22),transparent_62%)] pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#F4F2E6]/80 block mb-3">
                  ✦ ZIELGRUPPEN & FLOTTEN
                </span>

                <h3 className="font-spartan text-[23px] sm:text-4xl lg:text-[46px] font-black uppercase tracking-tight leading-[1.08] sm:leading-[1.06] mb-4">
                  <span className="text-white block">FÜR JEDE VERMIETUNG GEBAUT.</span>
                  <span className="text-[#F4F2E6]/90 block mt-1 sm:mt-0">VOM EINZELCAMPER BIS ZUM VERBUND.</span>
                </h3>

                <p className="text-xs sm:text-sm text-[#F4F2E6]/85 max-w-xl mx-auto leading-relaxed mb-6">
                  Ob Wohnmobile, Wohnwagen, Anhänger oder Dachzelte – konzipiert für digitale Direktbuchungen und einen oder mehrere Standorte mit klarer Rechtestruktur.
                </p>

                {/* Minimal Inline Audience Pills (Zero Box Clutter) */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-7 sm:mb-8">
                  {defaultAudience.map((aud, idx) => {
                    const Icon = audienceIcons[aud.icon] || Caravan;
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#172002]/40 border border-white/15 text-[11px] font-medium text-[#F4F2E6]/90"
                      >
                        <Icon size={13} className="text-[#F4F2E6] shrink-0" />
                        <span>{aud.title}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Centered 2 Pill CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto h-12 px-7 rounded-full bg-white hover:bg-[#F4F2E6] text-[#172002] font-spartan font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Jetzt anfragen</span>
                    <ArrowRight size={15} />
                  </button>

                  <a
                    href={generalSettings.trialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-7 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/25 text-white font-sans font-bold text-xs sm:text-sm transition-all"
                  >
                    14 Tage kostenlos testen
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};
