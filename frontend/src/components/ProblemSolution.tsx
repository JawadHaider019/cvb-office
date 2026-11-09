import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, X, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

export const ProblemSolution: React.FC = () => {
  const { content } = useApp();
  const [activeTab, setActiveTab] = useState<'comparison' | 'interactive'>('comparison');
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);

  const solutionMetrics = [
    { highlight: '30–45 Min. gespart', subtitle: 'Mieter steigen vorbereitet ein' },
    { highlight: '100% papierlos', subtitle: 'Rechtsgültige PDF-Signatur auf dem Tablet' },
    { highlight: '0 doppelte Buchungen', subtitle: 'Automatischer Kalenderabgleich' },
    { highlight: '24/7 Mieter-Hilfe', subtitle: 'QR-Codes im Fahrzeug verhindern Notrufe' },
  ];

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#A09048]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  HERAUSFORDERUNG & LÖSUNG
                </span>
              </div>

              <h2 className="font-spartan font-black text-4xl sm:text-5xl lg:text-[56px] leading-[0.98] uppercase tracking-tight text-[#384808] max-w-2xl">
                Vermietung kostet Zeit.<br />
                <span className="text-[#889028]">
                  CVB-Office gibt sie Dir zurück<span className="text-[#A09048]">.</span>
                </span>
              </h2>
            </div>

            {/* Pill Mode Switchers */}
            <div className="flex items-center p-1 bg-white border border-[#A09048]/35 rounded-full self-start md:self-end shadow-xs">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-5 py-2 text-xs font-spartan font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeTab === 'comparison'
                    ? 'bg-[#384808] text-white shadow-xs'
                    : 'text-[#585828] hover:text-[#384808]'
                }`}
              >
                Direktvergleich
              </button>
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-5 py-2 text-xs font-spartan font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'interactive'
                    ? 'bg-[#384808] text-white shadow-xs'
                    : 'text-[#585828] hover:text-[#384808]'
                }`}
              >
                <Zap size={13} className="text-[#A09048]" />
                <span>Effizienz-Check</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Dual Cards */}
        {activeTab === 'comparison' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left: Traditional (Pain points) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#A09048]/30 shadow-[0_15px_40px_-15px_rgba(56,72,8,0.1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-5 mb-8 border-b border-[#A09048]/20">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#585828] font-bold">
                    STATUS QUO // BISHERIGE VERMIETPRAXIS
                  </span>
                  <span className="text-xs font-spartan font-bold text-[#A09048]">01</span>
                </div>

                <ul className="space-y-5">
                  {content.problems.map((prob, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 group">
                      <span className="mt-1 w-5 h-5 rounded-full bg-red-100 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
                        <X size={12} strokeWidth={2.5} />
                      </span>
                      <span className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed group-hover:text-[#384808] transition-colors">
                        {prob}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-[#A09048]/20 text-xs font-mono text-[#585828]/70 flex items-center justify-between">
                <span>MEDIENBRÜCHE // PAPIERKRAM</span>
                <span>HOHE FEHLERQUOTE</span>
              </div>
            </motion.div>

            {/* Right: With CVB-Office (Dark Olive #384808 container with Gold accents) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[32px] p-8 sm:p-12 bg-[#384808] text-white border border-[#A09048] shadow-[0_24px_60px_-15px_rgba(56,72,8,0.35)] flex flex-col justify-between relative overflow-hidden"
            >
              {/* Corner Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#A09048]/15 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-5 mb-8 border-b border-white/15">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#A09048] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A09048] animate-pulse" />
                    CVB-OFFICE // DIGITALER STANDARD
                  </span>
                  <span className="text-xs font-spartan font-bold text-[#A09048]">02</span>
                </div>

                <ul className="space-y-5">
                  {content.solutions.map((sol, idx) => (
                    <li
                      key={idx}
                      onMouseEnter={() => setHoveredSolution(idx)}
                      onMouseLeave={() => setHoveredSolution(null)}
                      className={`flex items-start gap-3.5 p-3 rounded-2xl transition-all cursor-pointer ${
                        hoveredSolution === idx ? 'bg-white/15' : 'bg-white/7'
                      } border border-white/10`}
                    >
                      <span className="mt-1 w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <div className="flex-1">
                        <span className="text-sm sm:text-base text-white font-medium leading-relaxed block">
                          {sol}
                        </span>
                        {solutionMetrics[idx] && (
                          <span className="inline-block mt-1 text-[11px] font-spartan font-bold text-[#A09048]">
                            → {solutionMetrics[idx].highlight}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15 text-xs font-mono text-[#F4F2E6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <span className="font-bold text-[#A09048]">ZEITERSPARNIS BIS ZU 50 %</span>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#A09048] text-white font-spartan font-bold text-xs uppercase tracking-wider hover:bg-[#889028] transition-colors cursor-pointer"
                >
                  <span>Jetzt umsteigen</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Interactive Efficiency Checklist */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[32px] border border-[#A09048]/30 p-8 sm:p-14 shadow-lg"
          >
            <div className="max-w-3xl mx-auto">
              <div className="tech-tag mb-3">
                <span className="tech-tagn">⚡</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  EFFIZIENZ-CHECK
                </span>
              </div>

              <h3 className="font-spartan font-black text-3xl sm:text-4xl text-[#384808] mb-4">
                Wie viel Zeit sparst Du pro Fahrzeugübergabe?
              </h3>
              <p className="text-sm sm:text-base text-[#585828] mb-8 font-body">
                Klicke auf die Arbeitsschritte, die Du bisher manuell vor Ort durchführst:
              </p>

              <div className="space-y-3.5 mb-10">
                {[
                  { label: 'Einweisung in Bordtechnik (Heizung, Gas, Toilette, Wasser)', saving: '25 Min. gespart' },
                  { label: 'Papiervertrag ausdrucken, prüfen und handschriftlich unterzeichnen', saving: '10 Min. gespart' },
                  { label: 'Kaution bar abwickeln oder manuell im Terminal vormerken', saving: '5 Min. gespart' },
                  { label: 'Altschäden auf Zettel suchen und Neuschäden per Notiz notieren', saving: '10 Min. gespart' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F4F2E6] border border-[#A09048]/25 flex items-center justify-between hover:border-[#889028] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#384808] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#384808]">{item.label}</span>
                    </div>
                    <span className="text-xs font-spartan font-extrabold text-[#384808] bg-white border border-[#A09048]/30 px-3 py-1 rounded-full shrink-0 shadow-xs">
                      {item.saving}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#384808] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A09048] font-bold block mb-1">
                    GESAMTERGEBNIS
                  </span>
                  <div className="font-spartan text-3xl font-black text-white">
                    Bis zu 50 Minuten Ersparnis je Kunde
                  </div>
                </div>
                <button
                  onClick={scrollToForm}
                  className="tech-cta-primary group bg-white text-[#384808] hover:bg-[#F4F2E6]"
                >
                  <span>Jetzt anfragen</span>
                  <span className="tech-ci bg-[#384808] text-white">
                    <ArrowRight size={15} />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
