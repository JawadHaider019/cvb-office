import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, ArrowUpRight, Lock, ArrowRight } from 'lucide-react';
import { CvbOfficeIcon } from './CvbLogo';

export const Header: React.FC = () => {
  const { generalSettings, isAdminLoggedIn, setCurrentView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT TICKER (Slim Luxury Ribbon) */}
      <div className="bg-[#384808] text-[#F4F2E6] overflow-hidden py-2 px-4 font-spartan font-bold text-[11px] uppercase tracking-[0.12em] select-none border-b border-[#A09048]/35 relative z-50">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          <span className="flex items-center gap-8">
            <span>OFFIZIELLES DIGITALES VERMIET-OFFICE DES CARAVAN-VERMIETER-BUND (CVB)</span>
            <span className="text-[#A09048]">✦</span>
            <span className="text-[#A09048]">14 TAGE VOLLSTÄNDIG KOSTENLOS TESTEN</span>
            <span className="text-[#A09048]">✦</span>
            <span>NUR 8,33 € NETTO PRO FAHRZEUG & MONAT</span>
            <span className="text-[#A09048]">✦</span>
            <span>SMARLPS GO! // 100 % DSGVO IN DEUTSCHLAND</span>
            <span className="text-[#A09048]">✦</span>
          </span>

          {/* Duplicate loop for continuous marquee */}
          <span className="flex items-center gap-8" aria-hidden="true">
            <span>OFFIZIELLES DIGITALES VERMIET-OFFICE DES CARAVAN-VERMIETER-BUND (CVB)</span>
            <span className="text-[#A09048]">✦</span>
            <span className="text-[#A09048]">14 TAGE VOLLSTÄNDIG KOSTENLOS TESTEN</span>
            <span className="text-[#A09048]">✦</span>
            <span>NUR 8,33 € NETTO PRO FAHRZEUG & MONAT</span>
            <span className="text-[#A09048]">✦</span>
            <span>SMARLPS GO! // 100 % DSGVO IN DEUTSCHLAND</span>
            <span className="text-[#A09048]">✦</span>
          </span>
        </div>
      </div>

      {/* 2. SIMPLE & LUXURY NAVBAR (Flush Edge-to-Edge with Gold Hairline & Architectural Geometry) */}
      <header
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled
            ? 'border-[#A09048]/35 shadow-[0_4px_24px_-4px_rgba(56,72,8,0.08)] py-3'
            : 'border-[#A09048]/25 shadow-xs py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6">
          {/* Logo Brand: Architectural Monogram & Clean Typographic Signature */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('top');
            }}
            className="flex items-center gap-3.5 group select-none shrink-0"
            aria-label="CVB-Office Startseite"
          >
            <div className="w-10 h-10 bg-[#384808] text-white flex items-center justify-center border border-[#A09048] shadow-xs group-hover:bg-[#283405] transition-colors">
              <CvbOfficeIcon size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-spartan text-xl sm:text-2xl font-black text-[#384808] tracking-tight leading-none">
                CVB-OFFICE<span className="text-[#A09048]">.</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.24em] text-[#889028] uppercase mt-1">
                CARAVAN-VERMIETER-BUND
              </span>
            </div>
          </a>

          {/* Simple Luxury Desktop Navigation Links */}
          <nav aria-label="Hauptnavigation" className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('funktionen')}
              className="group relative py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer"
            >
              <span>Funktionen</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('ablauf')}
              className="group relative py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer"
            >
              <span>So funktioniert's</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('preis')}
              className="group relative py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer"
            >
              <span>Preise</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="group relative py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer"
            >
              <span>FAQ</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('studio')}
              className="group relative py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer"
            >
              <span>Über CVB</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action CTAs: Rounded pill buttons as in Hero */}
          <div className="flex items-center gap-3">
            {/* Secondary Rounded Pill Button (Hero Style) */}
            <a
              href={generalSettings.trialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 h-[42px] rounded-full text-xs font-spartan font-extrabold uppercase tracking-[0.04em] text-[#384808] bg-white border-[1.5px] border-[#A09048] hover:bg-[#F4F2E6] hover:border-[#384808] transition-all cursor-pointer group shadow-xs"
            >
              <span>14 Tage testen</span>
              <ArrowUpRight
                size={14}
                className="text-[#889028] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>

            {/* Primary Rounded Pill Button (Hero Style with Gold Circular Arrow) */}
            <button
              onClick={() => scrollToSection('buchen')}
              className="tech-cta-primary group animate-cta-pulse text-[13px] !h-[42px] !pl-5 !pr-1.5 cursor-pointer"
            >
              <span>CVB-Office buchen</span>
              <span className="tech-ci shadow-md !w-8 !h-8">
                <ArrowRight size={14} />
              </span>
            </button>

            {/* Discrete Admin Keyhole */}
            <button
              onClick={() => setCurrentView('admin')}
              title={isAdminLoggedIn ? 'Admin angemeldet' : 'Admin Login'}
              className="p-2 text-[#585828]/50 hover:text-[#384808] transition-colors cursor-pointer hidden xl:block"
              aria-label="Admin Bereich"
            >
              <Lock size={15} />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#A09048]/50 bg-white text-[#384808] cursor-pointer"
              aria-label="Navigation umschalten"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Clean, flush architectural drawer) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-6 py-5 bg-white border-t border-b border-[#A09048]/30 shadow-xl flex flex-col gap-3 text-sm animate-in fade-in duration-200">
            <button
              onClick={() => scrollToSection('funktionen')}
              className="text-left py-2 px-3 text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider"
            >
              Funktionen
            </button>
            <button
              onClick={() => scrollToSection('ablauf')}
              className="text-left py-2 px-3 text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider"
            >
              So funktioniert's
            </button>
            <button
              onClick={() => scrollToSection('preis')}
              className="text-left py-2 px-3 text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider"
            >
              Preise
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 px-3 text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('studio')}
              className="text-left py-2 px-3 text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider"
            >
              Über CVB
            </button>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
              <button
                onClick={() => scrollToSection('buchen')}
                className="tech-cta-primary group w-full justify-between !h-12 !px-5 text-sm"
              >
                <span>CVB-Office buchen</span>
                <span className="tech-ci shadow-md !w-8 !h-8">
                  <ArrowRight size={14} />
                </span>
              </button>
              <a
                href={generalSettings.trialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full text-center text-xs font-spartan font-extrabold uppercase tracking-wider text-[#384808] border-[1.5px] border-[#A09048] hover:bg-[#F4F2E6]"
              >
                14 Tage kostenlos testen ↗
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('admin');
                }}
                className="text-center py-1 text-xs text-[#889028] font-bold uppercase tracking-wider"
              >
                Admin-Bereich öffnen
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
