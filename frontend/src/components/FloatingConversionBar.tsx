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
          className="fixed bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 max-w-4xl mx-auto z-40 bg-[#242E05]/95 backdrop-blur-xl border border-[#A09048]/40 shadow-[0_20px_60px_rgba(36,46,5,0.7)] text-white px-5 sm:px-8 py-3.5 sm:py-4 rounded-full flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Left: Value proposition & Live Tariff */}
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A09048] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A09048]" />
            </span>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-spartan text-sm sm:text-base font-black tracking-wide uppercase text-white">
                  CVB-OFFICE FÜR DEINE VERMIETUNG
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[9px] font-mono tracking-widest text-white bg-[#A09048] rounded-full font-black uppercase">
                  VERBUND
                </span>
              </div>
              <div className="text-[11px] text-[#F4F2E6]/85 flex items-center gap-2">
                <span className="text-[#C5CF77] font-bold">nur {formattedMonthly} € netto / Fzg.</span>
                <span>·</span>
                <span>14 Tage unverbindlich testen</span>
              </div>
            </div>
          </div>

          {/* Right: Dual Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href={generalSettings.trialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-white hover:text-[#C5CF77] transition-colors border border-white/20 hover:border-white/50"
            >
              <span>14 Tage testen</span>
              <ArrowUpRight size={13} className="text-[#A09048]" />
            </a>

            <button
              onClick={scrollToForm}
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider text-[#384808] bg-white hover:bg-[#F4F2E6] active:scale-[0.98] transition-all cursor-pointer shadow-md"
            >
              <span>Jetzt buchen</span>
              <div className="w-5 h-5 rounded-full bg-[#384808] text-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform">
                <ArrowRight size={11} />
              </div>
            </button>

            {/* Subtle dismiss */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-white/50 hover:text-white transition-colors ml-1 cursor-pointer"
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
