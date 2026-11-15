'use client';
import React from 'react';
import { useApp } from '../context/AppContext';
import { defaultBenefits } from '../data/defaultContent';
import { Clock, Zap, Eye, ShieldCheck, Layers, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';

const benefitIcons = {
  Clock,
  Zap,
  Eye,
  ShieldCheck,
  Layers,
  Sparkles,
};

export const Benefits = () => {
  const { content } = useApp();

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentBenefits = content.benefitsList || defaultBenefits;

  return (
    <section id="vorteile" className="relative py-14 sm:py-20 lg:py-28 bg-white text-[#242E05] border-b border-[#A09048]/20 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <div className="tech-tag mb-4">
                <span className="tech-tagn">
                  <TrendingUp size={13} strokeWidth={2.5} />
                </span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  {content.benefitsTag || 'VORTEILE FÜR VERMIETER'}
                </span>
              </div>

              <h2 className="font-spartan text-[26px] sm:text-5xl lg:text-[50px] font-black uppercase text-[#242E05] leading-[1.05] sm:leading-[1.03] tracking-tight mb-4 sm:mb-5">
                {content.benefitsHeadline || 'WARUM SICH CVB-OFFICE FÜR DEINEN BETRIEB AUSZAHLT.'}
              </h2>

              <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed mb-6 sm:mb-7 max-w-md font-body">
                {content.benefitsIntro || 'Automatisierte Abläufe, volle Kostenkontrolle und digitale Rechtssicherheit – entwickelt für den Vermietalltag ohne IT-Ballast.'}
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto h-12 px-6 rounded-full bg-[#242E05] hover:bg-[#384808] text-white font-spartan font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{content.benefitsCta || 'Jetzt starten'}</span>
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
              {currentBenefits.map((b, idx) => {
                const isLast = idx === currentBenefits.length - 1;
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
  );
};

export default Benefits;
