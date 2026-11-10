import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Globe,
  Tag,
  CheckCircle2,
  FileSignature,
  FileText,
  Users,
  Truck,
  LucideIcon,
} from 'lucide-react';
import { IMAGES } from '../assets/images';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';

const featureIconMap: Record<string, LucideIcon> = {
  Calendar,
  Globe,
  Tag,
  CheckCircle2,
  FileSignature,
  FileText,
  Users,
  Truck,
};

export const Features: React.FC = () => {
  const { features } = useApp();
  const visibleFeatures = features.filter((f) => f.visible);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCardStep = () => {
    if (typeof window === 'undefined') return 335;
    if (window.innerWidth < 640) return 276;
    return 335;
  };

  const scrollCarousel = (direction: 'prev' | 'next') => {
    const el = carouselRef.current;
    if (!el) return;
    const cardStep = getCardStep();
    const nextPos = direction === 'next' ? el.scrollLeft + cardStep : el.scrollLeft - cardStep;
    el.scrollTo({ left: nextPos, behavior: 'smooth' });
  };

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el || visibleFeatures.length === 0) return;
    const cardStep = getCardStep();
    const idx = Math.min(
      visibleFeatures.length - 1,
      Math.max(0, Math.round(el.scrollLeft / cardStep))
    );
    setActiveIndex(idx);
  };

  // Top 3 spotlight modules
  const spotlightModules = [
    {
      num: '1',
      title: 'Flotten-Cockpit',
      desc: 'Alle Buchungen, Termine und Fahrzeugzustände in Echtzeit an einem zentralen Ort.',
      image: IMAGES.luxuryCockpitTablet,
    },
    {
      num: '2',
      title: 'Digitaler Vertrag',
      desc: 'Geprüfte Mietverträge papierlos direkt digital unterschreiben & rechtssicher archivieren.',
      image: IMAGES.heroMotorhomeHandover,
    },
    {
      num: '3',
      title: 'Online-Buchungswidget',
      desc: 'Live-Verfügbarkeiten & provisionsfreie Direktanfragen auf Deiner eigenen Domain.',
      image: IMAGES.camperDigitalCockpit,
    },
  ];

  return (
    <section id="funktionen" className="py-14 sm:py-20 lg:py-28 bg-white text-[#242E05] border-b border-[#A09048]/25 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14 relative z-10">

        {/* TOP PART: Split Left (Site-Matching Heading + Intro + CTA) & Right (3 Vertical Photo Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch mb-14 sm:mb-24 lg:mb-28">
          {/* Left Column (5 Cols): Safe width so "KOMPLETTLÖSUNG" never touches the cards */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <ScrollReveal>
              <div>
                <div className="tech-tag mb-4">
                  <span className="tech-tagn">✦</span>
                  <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                    HAUPTFUNKTIONEN & SYSTEM
                  </span>
                </div>

                <h2 className="font-spartan text-[24px] sm:text-4xl lg:text-[32px] xl:text-[44px] font-black uppercase text-[#384808] leading-[1.06] sm:leading-[1.03] tracking-tight mb-5 sm:mb-6">
                  DIE KOMPLETTLÖSUNG FÜR{' '}
                  <span className="text-[#889028]">
                    VERMIETER IM BUND<span className="text-[#A09048]">.</span>
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed font-body mb-6 sm:mb-8 max-w-md">
                  Anfragen, Buchungen, rechtssichere Verträge und Fahrzeugübergaben greifen nahtlos ineinander – speziell entwickelt für Wohnmobil- und Caravan-Vermieter im CVB.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-3.5 w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#242E05] hover:bg-[#384808] text-white font-spartan font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group"
                >
                  <span>CVB-Office anfragen</span>
                  <span className="w-7 h-7 rounded-full bg-[#A09048] text-white flex items-center justify-center font-black group-hover:rotate-45 transition-transform duration-300 shadow-xs">
                    <ArrowUpRight size={14} strokeWidth={3} />
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (7 Cols): 3 Clean Vertical Photo Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
            {spotlightModules.map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -6 }}
                onClick={scrollToForm}
                className={`relative min-h-[250px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[410px] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-lg hover:shadow-2xl border border-[#A09048]/25 cursor-pointer group flex flex-col justify-between bg-[#172002] ${idx === 2 ? 'sm:col-span-2 md:col-span-1' : ''}`}
              >
                {/* Full-Bleed Photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Bottom Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1201] via-[#0D1201]/75 to-black/15" />

                {/* Top Number Circle */}
                <div className="relative z-10 p-4">
                  <span className="w-8 h-8 rounded-full bg-white text-[#1C2405] font-spartan font-black text-xs flex items-center justify-center shadow-md">
                    {item.num}
                  </span>
                </div>

                {/* Bottom Text */}
                <div className="relative z-10 p-5 pt-12 flex flex-col justify-end">
                  <h3 className="font-spartan font-black text-lg sm:text-xl text-white tracking-tight leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F4F2E6]/85 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM PART: 8 Compact Full-Gradient System Cards Carousel */}
        <div className="pt-12 sm:pt-16 border-t border-[#A09048]/20">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
              <div>
                <div className="tech-tag mb-4">
                  <span className="tech-tagn">✦</span>
                  <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                    WEITERE SYSTEMLEISTUNGEN
                  </span>
                </div>

                <h2 className="font-spartan text-[23px] sm:text-5xl lg:text-6xl font-black uppercase text-[#384808] leading-[1.05] sm:leading-[1.02] tracking-tight max-w-3xl">
                  ALLE SYSTEMFUNKTIONEN <br className="hidden sm:block" />
                  IM{' '}
                  <span className="text-[#889028]">
                    ÜBERBLICK<span className="text-[#A09048]">.</span>
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-end">
                <span className="text-xs font-mono font-bold text-[#585828] tabular-nums">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(visibleFeatures.length).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollCarousel('prev')}
                    disabled={activeIndex === 0}
                    aria-label="Vorherige Funktionen"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeIndex === 0
                      ? 'bg-[#EAE7DA] text-[#585828]/50 cursor-not-allowed'
                      : 'bg-[#1C2405] hover:bg-[#384808] text-white shadow-md cursor-pointer'
                      }`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel('next')}
                    disabled={activeIndex >= visibleFeatures.length - 1}
                    aria-label="Nächste Funktionen"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeIndex >= visibleFeatures.length - 1
                      ? 'bg-[#EAE7DA] text-[#585828]/50 cursor-not-allowed'
                      : 'bg-[#1C2405] hover:bg-[#384808] text-white shadow-md cursor-pointer'
                      }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Horizontal Scrollable 8-Card Track (Compact Full-Card Gradient) */}
          <ScrollReveal delay={0.1}>
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:-mr-10 lg:-mr-14 sm:pr-10 lg:pr-14 pb-4 pt-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {visibleFeatures.map((feat, index) => {
                const Icon = featureIconMap[feat.icon] || FileText;
                const numLabel = String(index + 1).padStart(2, '0');
                const isAltGradient = index % 2 === 1;
                return (
                  <motion.div
                    key={feat.id || index}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.22 }}
                    className={`relative shrink-0 w-[260px] sm:w-[295px] snap-start rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 text-white border border-[#A09048]/35 shadow-lg hover:shadow-xl hover:border-[#A09048] transition-colors duration-300 overflow-hidden flex flex-col justify-between min-h-[265px] sm:min-h-[310px] group ${isAltGradient
                      ? 'bg-gradient-to-br from-[#384808] via-[#222E04] to-[#0D1201]'
                      : 'bg-gradient-to-br from-[#283505] via-[#1B2403] to-[#080B01]'
                      }`}
                  >
                    {/* Subtle warm ambient corner glow */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#A09048]/15 rounded-full blur-2xl pointer-events-none" />

                    {/* Faint Outline Watermark Icon */}
                    <div className="absolute -bottom-3 -right-3 text-white/[0.06] pointer-events-none select-none">
                      <Icon size={110} strokeWidth={1.2} />
                    </div>

                    {/* Card Top Row: Icon Badge Left + Ghost Numeral Right */}
                    <div className="relative z-10 flex items-start justify-between mb-8">
                      <div className="w-11 h-11 rounded-xl bg-[#889028] group-hover:bg-[#A09048] text-white flex items-center justify-center shadow-sm transition-colors">
                        <Icon size={20} />
                      </div>

                      <span className="font-spartan font-black text-3xl text-white/15 group-hover:text-[#A09048]/45 transition-colors leading-none select-none">
                        {numLabel}
                      </span>
                    </div>

                    {/* Card Title & Description */}
                    <div className="relative z-10">
                      <h3 className="font-spartan font-black text-lg sm:text-xl uppercase tracking-tight text-white leading-snug mb-2.5">
                        {feat.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#F4F2E6]/80 leading-relaxed">
                        {feat.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
