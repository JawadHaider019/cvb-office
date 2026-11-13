'use client';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Inbox, CalendarCheck, FileCheck, ClipboardCheck, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
const iconMap = {
    Inbox,
    CalendarCheck,
    FileCheck,
    ClipboardCheck,
};
export const HowItWorks = () => {
    const { steps } = useApp();
    const visibleSteps = steps.filter((s) => s.visible);
    const [activeStepHover, setActiveStepHover] = useState(null);
    const scrollToForm = () => {
        const el = document.getElementById('buchen');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (<section id="ablauf" className="relative py-14 sm:py-24 lg:py-32 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#A09048]/10 rounded-full blur-[130px] pointer-events-none"/>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14">
        {/* Section Header: Split Left (Headline) & Right (Editorial Paragraph) */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-[#A09048]/20">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  DER VERMIETPROZESS
                </span>
              </div>

              <h2 className="font-spartan text-[26px] sm:text-5xl lg:text-6xl font-black uppercase text-[#384808] leading-[1.05] sm:leading-[1.02] tracking-tight">
                IN 4 SCHRITTEN VON DER ANFRAGE ZUR{' '}
                <span className="text-[#889028]">
                  ÜBERGABE<span className="text-[#A09048]">.</span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-end">
              <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed font-body">
                Von der ersten Buchungsanfrage über den rechtssicheren Mietvertrag bis zum digitalen Übergabeprotokoll greifen alle Schritte nahtlos ineinander – ohne Zettelwirtschaft und Medienbrüche.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Steps Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {visibleSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || FileCheck;
            const isHovered = activeStepHover === index;
            return (<motion.div key={step.id || index} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} onMouseEnter={() => setActiveStepHover(index)} onMouseLeave={() => setActiveStepHover(null)} whileHover={{ y: -6 }} transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }} className={`relative bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-8 border transition-all flex flex-col justify-between group overflow-hidden ${isHovered
                    ? 'border-[#889028] shadow-[0_20px_45px_rgba(56,72,8,0.12)]'
                    : 'border-[#A09048]/25 hover:border-[#889028] shadow-sm'}`}>
                {/* Top Accent Hairline */}
                <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${isHovered ? 'bg-gradient-to-r from-[#384808] via-[#889028] to-[#A09048]' : 'bg-transparent'}`}/>

                <div>
                  {/* Top Row: Icon Badge Left + Architectural Ghost Number Right */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isHovered
                    ? 'bg-[#384808] text-white scale-105 shadow-md'
                    : 'bg-[#F4F2E6] text-[#384808] border border-[#A09048]/25'}`}>
                      <Icon size={22} strokeWidth={2.1}/>
                    </div>

                    <span className={`font-spartan font-black text-3xl sm:text-4xl leading-none tracking-tight select-none transition-colors duration-300 ${isHovered ? 'text-[#A09048]/50' : 'text-[#384808]/12'}`}>
                      0{step.number}
                    </span>
                  </div>

                  <h3 className="font-spartan text-lg sm:text-xl font-black uppercase tracking-tight text-[#242E05] mb-2 sm:mb-2.5 group-hover:text-[#384808] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#585828] leading-relaxed font-sans font-normal">
                    {step.text}
                  </p>
                </div>
              </motion.div>);
        })}
        </div>

        {/* Bottom Interactive Workflow Callout Bento */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 shadow-xl border border-[#A09048]/35">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#384808] text-[#A09048] flex items-center justify-center shrink-0 shadow-md">
                <Sparkles size={22} className="sm:w-6 sm:h-6"/>
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

            <button onClick={scrollToForm} className="tech-cta-primary cursor-pointer shrink-0 w-full md:w-auto justify-between sm:justify-center">
              <span>Jetzt Prozess digitalisieren</span>
              <div className="tech-ci">
                <ArrowRight size={14}/>
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>);
};
