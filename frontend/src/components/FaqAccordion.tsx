import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

export const FaqAccordion: React.FC = () => {
  const { faqs } = useApp();
  const visibleFaqs = faqs.filter((f) => f.visible);
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [visibleFaqs[0]?.id || '']: true,
  });
  const [faqFilter, setFaqFilter] = useState<'all' | 'prices' | 'features' | 'contract'>('all');

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = visibleFaqs.filter((faq) => {
    if (faqFilter === 'prices') {
      return faq.question.toLowerCase().includes('preis') || faq.question.toLowerCase().includes('kosten') || faq.question.toLowerCase().includes('zahle');
    }
    if (faqFilter === 'features') {
      return faq.question.toLowerCase().includes('video') || faq.question.toLowerCase().includes('einweisung') || faq.question.toLowerCase().includes('eigene');
    }
    if (faqFilter === 'contract') {
      return faq.question.toLowerCase().includes('laufzeit') || faq.question.toLowerCase().includes('dsgvo') || faq.question.toLowerCase().includes('wer steckt');
    }
    return true;
  });

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#A09048]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  FRAGEN & ANTWORTEN
                </span>
              </div>

              <h2 className="font-spartan text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#384808] leading-[1.02] tracking-tight max-w-2xl">
                HÄUFIG GESTELLTE FRAGEN ZU{' '}
                <span className="text-[#889028]">
                  CVB-OFFICE<span className="text-[#A09048]">.</span>
                </span>
              </h2>
            </div>

            {/* Tech Destination Pill Filter */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-[#A09048]/30 flex-wrap self-start sm:self-end shadow-xs">
              <button
                onClick={() => setFaqFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  faqFilter === 'all'
                    ? 'bg-[#384808] text-white shadow-xs font-black'
                    : 'text-[#585828] hover:text-[#384808]'
                }`}
              >
                Alle ({visibleFaqs.length})
              </button>
              <button
                onClick={() => setFaqFilter('prices')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  faqFilter === 'prices'
                    ? 'bg-[#384808] text-white shadow-xs font-black'
                    : 'text-[#585828] hover:text-[#384808]'
                }`}
              >
                Preise & Test
              </button>
              <button
                onClick={() => setFaqFilter('features')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  faqFilter === 'features'
                    ? 'bg-[#384808] text-white shadow-xs font-black'
                    : 'text-[#585828] hover:text-[#384808]'
                }`}
              >
                Einweisung & Videos
              </button>
              <button
                onClick={() => setFaqFilter('contract')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  faqFilter === 'contract'
                    ? 'bg-[#384808] text-white shadow-xs font-black'
                    : 'text-[#585828] hover:text-[#384808]'
                }`}
              >
                Recht & Vertrag
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id || index}
                  className={`bg-white rounded-[24px] border transition-all overflow-hidden ${
                    isOpen ? 'border-[#384808] shadow-[0_12px_35px_rgba(56,72,8,0.12)]' : 'border-[#A09048]/25 hover:border-[#889028] shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-8 py-6 text-left flex items-center justify-between gap-6 cursor-pointer focus:outline-none group"
                  >
                    <span className="font-spartan text-lg sm:text-xl font-bold uppercase text-[#384808] group-hover:text-[#889028] transition-colors">
                      {faq.question}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#384808] text-white' : 'bg-[#F4F2E6] text-[#889028] border border-[#A09048]/30'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-8 pb-6 pt-2 text-sm text-[#585828] leading-relaxed border-t border-[#A09048]/20 bg-[#F4F2E6]/40 overflow-hidden"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Reassurance Prompt with direct conversion link */}
          <div className="mt-12 max-w-4xl p-6 rounded-[28px] bg-white border border-[#A09048]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#384808] text-[#A09048] flex items-center justify-center shrink-0">
                <HelpCircle size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#384808]">
                Deine Frage war nicht dabei oder Du wünschst eine Beratung?
              </span>
            </div>
            <a
              href="mailto:info@caravan-vermieter-bund.de"
              className="text-xs font-bold uppercase tracking-wider text-[#889028] hover:text-[#384808] hover:underline flex items-center gap-1.5 transition-colors"
            >
              <span>info@caravan-vermieter-bund.de</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
