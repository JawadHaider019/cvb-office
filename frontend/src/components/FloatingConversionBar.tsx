import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ArrowUpRight, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingConversionBar: React.FC = () => {
  const { generalSettings, priceSettings } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const formElement = document.getElementById('buchen');
      let nearForm = false;
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        nearForm = rect.top < window.innerHeight && rect.bottom > 0;
      }

      setIsVisible(scrollY > 500 && !nearForm && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedMonthly = priceSettings.monthlyNet.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Schnellbuchung"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 sm:bottom-5 lg:bottom-6 inset-x-3 sm:inset-x-6 md:inset-x-4 lg:inset-x-8 max-w-4xl mx-auto z-40 bg-[#242E05]/95 backdrop-blur-xl border border-[#A09048]/40 shadow-[0_20px_60px_rgba(36,46,5,0.7)] text-white px-4 md:px-5 lg:px-8 py-3 md:py-3.5 lg:py-4 rounded-2xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 md:gap-3 lg:gap-4"
        >
          {/* Left: Value proposition & Live Tariff */}
          <div className="flex items-center justify-between gap-3 w-full md:w-auto min-w-0">
            <div className="flex items-center gap-2.5 lg:gap-3.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 lg:h-3 lg:w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A09048] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 lg:h-3 lg:w-3 bg-[#A09048]" />
              </span>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-spartan text-xs md:text-[13px] lg:text-base font-black tracking-wide uppercase text-white truncate">
                    CVB-OFFICE FÜR DEINE VERMIETUNG
                  </span>
                  <span className="hidden lg:inline-block px-2 py-0.5 text-[9px] font-mono tracking-widest text-white bg-[#A09048] rounded-full font-black uppercase shrink-0">
                    VERBUND
                  </span>
                </div>
                <div className="text-[10.5px] lg:text-[11px] text-[#F4F2E6]/85 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-[#F4F2E6] font-bold">nur {formattedMonthly} € netto / Fzg.</span>
                  <span aria-hidden="true">·</span>
                  <span>14 Tage unverbindlich testen</span>
                </div>
              </div>
            </div>

            {/* Mobile top-right dismiss */}
            <button
              onClick={() => setIsDismissed(true)}
              className="md:hidden p-1.5 -mr-1 text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Hinweisleiste schließen"
            >
              <X size={15} />
            </button>
          </div>

          {/* Right: Dual Action Buttons */}
          <div className="grid grid-cols-2 md:flex items-center gap-2 lg:gap-3 w-full md:w-auto justify-end shrink-0">
            <a
              href={generalSettings.trialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 md:px-3.5 lg:px-4 py-2 rounded-full text-[10.5px] lg:text-[11px] font-bold uppercase tracking-wider text-white hover:text-[#F4F2E6] transition-colors border border-white/20 hover:border-white/50 whitespace-nowrap"
            >
              <span>14 Tage testen</span>
              <ArrowUpRight size={13} className="text-[#A09048] shrink-0" />
            </a>

            <button
              onClick={scrollToForm}
              className="group inline-flex items-center justify-center gap-1.5 lg:gap-2 px-3 md:px-4 lg:px-5 py-2 rounded-full text-[10.5px] lg:text-[11px] font-black uppercase tracking-wider text-[#384808] bg-white hover:bg-[#F4F2E6] active:scale-[0.98] transition-all cursor-pointer shadow-md whitespace-nowrap"
            >
              <span>Jetzt anfragen</span>
              <div className="w-5 h-5 rounded-full bg-[#384808] text-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform shrink-0">
                <ArrowRight size={11} />
              </div>
            </button>

            {/* Subtle dismiss (Tablet & Desktop) */}
            <button
              onClick={() => setIsDismissed(true)}
              className="hidden md:inline-flex p-1 text-white/50 hover:text-white transition-colors ml-0.5 lg:ml-1 cursor-pointer shrink-0"
              aria-label="Hinweisleiste schließen"
            >
              <X size={15} />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
