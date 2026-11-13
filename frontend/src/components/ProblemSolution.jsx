'use client';
import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, X, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
export const ProblemSolution = () => {
    const { content } = useApp();
    const rowCount = Math.max(content.problems.length, content.solutions.length);
    const pairs = Array.from({ length: rowCount }, (_, idx) => ({
        num: String(idx + 1).padStart(2, '0'),
        problem: content.problems[idx] || '',
        solution: content.solutions[idx] || '',
    })).filter((p) => p.problem || p.solution);
    const scrollToForm = () => {
        const el = document.getElementById('buchen');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (<section className="py-14 sm:py-20 lg:py-28 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#A09048]/10 blur-[130px] pointer-events-none"/>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header: Matching All Other Split Headers */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-[#A09048]/20">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  HERAUSFORDERUNG & LÖSUNG
                </span>
              </div>

              <h2 className="font-spartan font-black text-[26px] sm:text-5xl lg:text-[54px] leading-[1.04] sm:leading-[1.02] uppercase tracking-tight text-[#384808]">
                Vermietung kostet Zeit.<br />
                <span className="text-[#889028]">
                  CVB-Office gibt sie Dir zurück<span className="text-[#A09048]">.</span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-end">
              <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed font-body">
                Schluss mit Zettelwirtschaft, unklaren Preisen und langen Erklärungen vor Ort – jede tägliche Hürde wird durch einen klaren digitalen Ablauf ersetzt.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Column Labels (Tablet & Desktop) */}
        <ScrollReveal delay={0.04}>
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 mb-4 px-2">
            <div className="md:col-span-1 lg:col-span-5 flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#585828]">
              <span className="w-2 h-2 rounded-full bg-red-500/80"/>
              <span>BISHERIGE VERMIETPRAXIS</span>
            </div>
            <div className="hidden lg:block lg:col-span-1"/>
            <div className="md:col-span-1 lg:col-span-6 flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#384808]">
              <span className="w-2 h-2 rounded-full bg-[#889028]"/>
              <span>MIT DEM CVB-OFFICE</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 1-to-1 Transformation Rows */}
        <div className="space-y-4">
          {pairs.map((pair, idx) => (<ScrollReveal key={idx} delay={idx * 0.06}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 lg:gap-4 items-stretch group">
                {/* Problem Side (White Surface) */}
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.18 }} className="md:col-span-1 lg:col-span-5 bg-white rounded-2xl p-4 sm:p-6 border border-[#A09048]/25 shadow-xs flex items-center gap-3.5 sm:gap-4">
                  <span className="w-7 h-7 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
                    <X size={14} strokeWidth={2.5}/>
                  </span>
                  <p className="text-sm sm:text-[15px] text-[#585828] font-medium leading-snug">
                    {pair.problem}
                  </p>
                </motion.div>

                {/* Connecting Transformation Arrow (Desktop) */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#A09048]/35 text-[#384808] group-hover:bg-[#889028] group-hover:border-[#889028] group-hover:text-white flex items-center justify-center shadow-xs transition-colors">
                    <ArrowRight size={15} strokeWidth={2.5}/>
                  </div>
                </div>

                {/* Solution Side (Olive-to-Black Gradient Surface) */}
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.18 }} className="md:col-span-1 lg:col-span-6 rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-[#283505] via-[#1C2603] to-[#0D1201] text-white border border-[#A09048]/40 shadow-md flex items-center justify-between gap-3.5 sm:gap-4 relative overflow-hidden">
                  <div className="flex items-center gap-3.5 sm:gap-4 relative z-10 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-[#889028] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check size={14} strokeWidth={3}/>
                    </span>
                    <p className="text-sm sm:text-[15px] text-white font-semibold leading-snug">
                      {pair.solution}
                    </p>
                  </div>

                  <span className="hidden sm:block font-spartan font-black text-2xl text-white/15 group-hover:text-[#A09048]/50 transition-colors select-none shrink-0 relative z-10">
                    {pair.num}
                  </span>
                </motion.div>
              </div>
            </ScrollReveal>))}
        </div>

        {/* Clean Bottom Action Row */}
        <ScrollReveal delay={0.15}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-[#A09048]/20">
            <p className="text-xs sm:text-sm font-medium text-[#585828] text-center sm:text-left">
              Alle Abläufe von der ersten Anfrage bis zur Übergabe in einem zentralen System.
            </p>

            <button type="button" onClick={scrollToForm} className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#242E05] hover:bg-[#384808] text-white font-spartan font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer shrink-0 group">
              <span>Jetzt umsteigen</span>
              <span className="w-6 h-6 rounded-full bg-[#A09048] text-white flex items-center justify-center font-black transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={13} strokeWidth={3}/>
              </span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>);
};
