import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Inbox, CalendarCheck, FileCheck, ClipboardCheck, LucideIcon, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

const iconMap: Record<string, LucideIcon> = {
  Inbox,
  CalendarCheck,
  FileCheck,
  ClipboardCheck,
};

export const HowItWorks: React.FC = () => {
  const { steps } = useApp();
  const visibleSteps = steps.filter((s) => s.visible);
  const [activeStepHover, setActiveStepHover] = useState<number | null>(null);

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ablauf" className="relative py-24 lg:py-32 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#A09048]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  DER VERMIETPROZESS
                </span>
              </div>

              <h2 className="font-spartan text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#384808] leading-[1.02] tracking-tight max-w-3xl">
                IN 4 SCHRITTEN VON DER ANFRAGE ZUR{' '}
                <span className="text-[#889028]">
                  ÜBERGABE<span className="text-[#A09048]">.</span>
                </span>
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#A09048]/30 text-xs font-mono uppercase tracking-widest text-[#585828] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#889028] animate-ping" />
              <span>VOLLAUTOMATISIERTE PROZESSKETTE</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Steps Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visibleSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || FileCheck;
            const isHovered = activeStepHover === index;
            return (
              <motion.div
                key={step.id || index}
                onMouseEnter={() => setActiveStepHover(index)}
                onMouseLeave={() => setActiveStepHover(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className={`relative bg-white rounded-[28px] p-8 border transition-all flex flex-col justify-between group overflow-hidden ${
                  isHovered
                    ? 'border-[#889028] shadow-[0_16px_40px_rgba(56,72,8,0.12)]'
                    : 'border-[#A09048]/25 hover:border-[#889028] shadow-sm'
                }`}
              >
                {/* Top Step Number Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#A09048]/20">
                    <div className="tech-tagn">
                      0{step.number}
                    </div>

                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                        isHovered
                          ? 'bg-[#384808] text-[#A09048] scale-110 shadow-md'
                          : 'bg-[#F4F2E6] text-[#889028] border border-[#A09048]/25'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="font-spartan text-lg font-black uppercase tracking-wider text-[#384808] mb-3 group-hover:text-[#889028] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#585828] leading-relaxed font-sans font-normal">
                    {step.text}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#A09048]/20 flex items-center justify-between text-[11px] font-mono text-[#585828]/70">
                  <span>PHASE 0{index + 1} // 04</span>
                  <span className={`flex items-center gap-1 font-bold ${isHovered ? 'text-[#889028]' : 'text-transparent'}`}>
                    <CheckCircle2 size={13} />
                    <span>Aktiv</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Interactive Workflow Callout Bento */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#A09048]/35">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#384808] text-[#A09048] flex items-center justify-center shrink-0 shadow-md">
                <Sparkles size={24} />
              </div>
              <div>
                <strong className="font-spartan text-base sm:text-lg font-black uppercase text-[#384808] block">
                  KEIN SYSTEMBRUCH MEHR:
                </strong>
                <span className="text-xs sm:text-sm text-[#585828] font-medium">
                  Alle Schritte von der ersten Buchungsanfrage bis zum unterschriebenen Übergabeprotokoll greifen nahtlos ineinander.
                </span>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="tech-cta-primary cursor-pointer shrink-0 w-full sm:w-auto justify-center"
            >
              <span>Jetzt Prozess digitalisieren</span>
              <div className="tech-ci">
                <ArrowRight size={14} />
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
