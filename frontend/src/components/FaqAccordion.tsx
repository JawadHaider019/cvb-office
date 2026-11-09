import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutGrid,
  Layers,
  CreditCard,
  Globe,
  ShieldCheck,
  Plus,
  ArrowRight,
  Mail,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface FaqCategory {
  id: string;
  name: string;
  icon: React.ElementType;
}

export const FaqAccordion: React.FC = () => {
  const { faqs, generalSettings } = useApp();
  const visibleFaqs = faqs.filter((f) => f.visible);

  const categories: FaqCategory[] = [
    { id: 'all', name: 'Alle Fragen', icon: LayoutGrid },
    { id: 'software', name: 'Software & Einstieg', icon: Layers },
    { id: 'pricing', name: 'Preise & Tarife', icon: CreditCard },
    { id: 'features', name: 'Funktionen & Widget', icon: Globe },
    { id: 'legal', name: 'Recht & Sicherheit', icon: ShieldCheck },
  ];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    faq1: true,
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Map each FAQ item into a structured category
  const categorizedFaqs = useMemo(() => {
    return visibleFaqs.map((faq) => {
      const q = faq.question.toLowerCase();
      let categoryId = 'software';

      if (q.includes('preis') || q.includes('kosten') || q.includes('bezahlt') || q.includes('testen') || q.includes('gebühr')) {
        categoryId = 'pricing';
      } else if (q.includes('website') || q.includes('widget') || q.includes('video') || q.includes('standort') || q.includes('einweisung')) {
        categoryId = 'features';
      } else if (q.includes('dsgvo') || q.includes('vertrag') || q.includes('recht') || q.includes('laufzeit') || q.includes('sicher')) {
        categoryId = 'legal';
      } else {
        categoryId = 'software';
      }

      return {
        ...faq,
        categoryId,
      };
    });
  }, [visibleFaqs]);

  // Filter based on active tab
  const displayCategories = useMemo(() => {
    const mainCategories = categories.filter((c) => c.id !== 'all');
    if (activeCategory === 'all') {
      return mainCategories;
    }
    return mainCategories.filter((c) => c.id === activeCategory);
  }, [activeCategory, categories]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: categorizedFaqs.length,
      software: 0,
      pricing: 0,
      features: 0,
      legal: 0,
    };
    categorizedFaqs.forEach((f) => {
      if (counts[f.categoryId] !== undefined) {
        counts[f.categoryId] += 1;
      }
    });
    return counts;
  }, [categorizedFaqs]);

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#A09048]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header: Split Left (Headline) & Right (Editorial Paragraph) */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 pb-8 border-b border-[#A09048]/20">
            {/* Left Column: Tag & Main Title */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  HÄUFIG GESTELLTE FRAGEN
                </span>
              </div>

              <h2 className="font-spartan text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#384808] leading-[1.02] tracking-tight">
                ALLES, WAS DU ZU CVB-OFFICE WISSEN{' '}
                <span className="text-[#889028]">
                  MUSST<span className="text-[#A09048]">.</span>
                </span>
              </h2>
            </div>

            {/* Right Column: Editorial Paragraph */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-end">
              <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed font-body">
                Hier findest Du verlässliche Antworten auf die wichtigsten Fragen rund um die Einführung, Verbundtarife, die digitale Vorab-Einweisung und die rechtssichere Digitalisierung Deiner Vermietung.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Master Layout (Matching the user screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Filter Sidebar & "Still have a question?" Bento Card */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            {/* Category Navigation Pills */}
            <div className="bg-white/80 backdrop-blur-md p-2 rounded-[28px] border border-[#A09048]/25 shadow-xs space-y-1.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-[#384808] text-white shadow-md'
                        : 'text-[#384808] hover:bg-[#F4F2E6] hover:text-[#2D3A06]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#A09048] text-white'
                            : 'bg-[#F4F2E6] text-[#889028] group-hover:bg-white'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <span className="font-spartan font-bold text-sm tracking-tight">
                        {cat.name}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-100 text-[#585828] group-hover:bg-white'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* "Still have a question?" Dark Bento Card (Exact match to screenshot bottom card) */}
            <div className="relative rounded-[28px] p-7 bg-[#242E05] text-white border border-[#A09048]/35 shadow-xl overflow-hidden">
              {/* Subtle ambient corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A09048]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-spartan font-black text-xl text-white uppercase tracking-tight mb-2">
                  Noch Fragen offen?
                </h3>
                <p className="text-xs text-[#F4F2E6]/85 leading-relaxed mb-5 font-sans">
                  Unser Verbandsteam hilft Dir gerne bei Fragen zu Funktionen, Preisen und der Umstellung Deiner Vermietung.
                </p>

                <div className="text-xs font-mono text-[#C5CF77] font-bold mb-6 break-all">
                  {generalSettings.contactEmail}
                </div>

                <button
                  onClick={scrollToForm}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#384808] hover:bg-[#F4F2E6] font-spartan font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md group"
                >
                  <span>Team kontaktieren</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#889028]" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Accordion Grouped by Category */}
          <div className="lg:col-span-8 space-y-10">
            {displayCategories.map((cat) => {
              const catFaqs = categorizedFaqs.filter((f) => f.categoryId === cat.id);
              if (catFaqs.length === 0) return null;

              const CategoryIcon = cat.icon;

              return (
                <div key={cat.id} className="space-y-4">
                  {/* Category Header with Gold/Yellow Rounded Icon Badge */}
                  <div className="flex items-center gap-3 pt-2 pb-1">
                    <div className="w-9 h-9 rounded-xl bg-[#A09048] text-white flex items-center justify-center shadow-sm">
                      <CategoryIcon size={18} />
                    </div>
                    <h3 className="font-spartan font-black text-xl sm:text-2xl text-[#384808] uppercase tracking-tight">
                      {cat.name}
                    </h3>
                  </div>

                  {/* Accordion Questions List */}
                  <div className="space-y-3">
                    {catFaqs.map((faq) => {
                      const isOpen = !!openIds[faq.id];

                      return (
                        <div
                          key={faq.id}
                          className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                            isOpen
                              ? 'border-[#384808] shadow-[0_8px_25px_rgba(56,72,8,0.08)]'
                              : 'border-[#A09048]/25 hover:border-[#889028] shadow-xs'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggle(faq.id)}
                            aria-expanded={isOpen}
                            className="w-full px-6 sm:px-8 py-5 sm:py-5.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group select-none"
                          >
                            <span className="font-spartan text-base sm:text-lg font-bold text-[#384808] group-hover:text-[#889028] transition-colors leading-snug">
                              {faq.question}
                            </span>

                            {/* Circular Plus/Minus Toggle Icon Button */}
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                isOpen
                                  ? 'bg-[#384808] text-white rotate-45 shadow-sm'
                                  : 'bg-[#F4F2E6] text-[#889028] group-hover:bg-[#A09048] group-hover:text-white'
                              }`}
                            >
                              <Plus size={16} strokeWidth={2.5} />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 sm:px-8 pb-6 pt-1 text-sm text-[#585828] leading-relaxed border-t border-[#A09048]/15 font-body">
                                  <p>{faq.answer}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
