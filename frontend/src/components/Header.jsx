'use client';
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react';
export const Header = () => {
    const { generalSettings } = useApp();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToSection = (id) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    return (<>
      {/* 1. TOP ANNOUNCEMENT TICKER (Slim Luxury Ribbon) */}
      <div className="bg-[#384808] text-[#F4F2E6] overflow-hidden py-1.5 sm:py-2 px-4 font-spartan font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.12em] select-none border-b border-[#A09048]/35 relative z-50">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap">
          <span className="flex items-center gap-6 sm:gap-8">
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
          <span className="flex items-center gap-6 sm:gap-8" aria-hidden="true">
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
      <header className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${isScrolled
            ? 'border-[#A09048]/35 shadow-[0_4px_24px_-4px_rgba(56,72,8,0.08)] py-2.5 sm:py-3'
            : 'border-[#A09048]/25 shadow-xs py-3 sm:py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-6 xl:px-12 flex items-center justify-between gap-2 sm:gap-4 xl:gap-6">
          {/* Logo Brand: Actual Official CVB-Office Logo from Document */}
          <a href="#top" onClick={(e) => {
            e.preventDefault();
            scrollToSection('top');
        }} className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-2.5 xl:gap-3.5 group select-none shrink-0" aria-label="CVB-Office Startseite">
            <img src="/images/cvb_office_logo.png" alt="CVB-Office Logo" className="w-8 sm:w-11 lg:w-9 xl:w-11 h-8 sm:h-11 lg:h-9 xl:h-11 object-contain drop-shadow-xs group-hover:scale-105 transition-transform shrink-0"/>
            <div className="flex flex-col">
              <span className="font-spartan text-lg sm:text-2xl lg:text-xl xl:text-2xl font-black text-[#384808] tracking-tight leading-none">
                CVB-OFFICE<span className="text-[#A09048]">.</span>
              </span>
              <span className="text-[7.5px] sm:text-[9px] lg:text-[8px] xl:text-[9px] font-bold tracking-[0.13em] sm:tracking-[0.24em] lg:tracking-[0.14em] xl:tracking-[0.24em] text-[#889028] uppercase mt-0.5 sm:mt-1 whitespace-nowrap">
                CARAVAN-VERMIETER-BUND
              </span>
            </div>
          </a>

          {/* Simple Luxury Desktop Navigation Links */}
          <nav aria-label="Hauptnavigation" className="hidden lg:flex items-center lg:gap-4 xl:gap-8">
            <button onClick={() => scrollToSection('funktionen')} className="group relative py-2 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.05em] xl:tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer whitespace-nowrap">
              <span>Funktionen</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full"/>
            </button>
            <button onClick={() => scrollToSection('ablauf')} className="group relative py-2 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.05em] xl:tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer whitespace-nowrap">
              <span>So funktioniert's</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full"/>
            </button>
            <button onClick={() => scrollToSection('preis')} className="group relative py-2 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.05em] xl:tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer whitespace-nowrap">
              <span>Preise</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full"/>
            </button>
            <button onClick={() => scrollToSection('faq')} className="group relative py-2 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.05em] xl:tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer whitespace-nowrap">
              <span>FAQ</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full"/>
            </button>
            <button onClick={() => scrollToSection('ueber-cvb')} className="group relative py-2 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.05em] xl:tracking-[0.08em] text-[#585828] hover:text-[#384808] transition-colors cursor-pointer whitespace-nowrap">
              <span>Über CVB</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A09048] transition-all duration-300 group-hover:w-full"/>
            </button>
          </nav>

          {/* Right Action CTAs: Rounded pill buttons as in Hero */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-2 xl:gap-3 shrink-0">
            {/* Secondary Rounded Pill Button (Hero Style) */}
            <a href={generalSettings.trialLink} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-1.5 xl:gap-2 px-5 lg:px-3.5 xl:px-5 h-[42px] lg:h-[38px] xl:h-[42px] rounded-full text-xs lg:text-[11px] xl:text-xs font-spartan font-extrabold uppercase tracking-[0.04em] text-[#384808] bg-white border-[1.5px] border-[#A09048] hover:bg-[#F4F2E6] hover:border-[#384808] transition-all cursor-pointer group shadow-xs whitespace-nowrap">
              <span>14 Tage testen</span>
              <ArrowUpRight size={14} className="text-[#889028] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
            </a>

            {/* Primary Rounded Pill Button (Hero Style with Gold Circular Arrow) */}
            <button onClick={() => scrollToSection('buchen')} className="tech-cta-primary group animate-cta-pulse text-[11px] sm:text-[13px] lg:text-[12px] xl:text-[13px] !h-9 sm:!h-[42px] lg:!h-[38px] xl:!h-[42px] !pl-3 sm:!pl-5 lg:!pl-4 xl:!pl-5 !pr-1 sm:!pr-1.5 !gap-2 sm:!gap-[12px] lg:!gap-2 xl:!gap-[12px] cursor-pointer whitespace-nowrap">
              <span className="sm:hidden">Buchen</span>
              <span className="hidden sm:inline">CVB-Office buchen</span>
              <span className="tech-ci shadow-md !w-7 sm:!w-8 lg:!w-7 xl:!w-8 !h-7 sm:!h-8 lg:!h-7 xl:!h-8">
                <ArrowRight size={14}/>
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg border border-[#A09048]/50 bg-white text-[#384808] cursor-pointer shrink-0" aria-label="Navigation umschalten">
              {mobileMenuOpen ? <X size={19}/> : <Menu size={19}/>}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Clean, flush architectural drawer) */}
        {mobileMenuOpen && (<div className="lg:hidden mt-2.5 px-4 sm:px-6 py-5 bg-white border-t border-b border-[#A09048]/30 shadow-xl flex flex-col gap-2 text-sm animate-in fade-in duration-200 max-h-[calc(100vh-88px)] overflow-y-auto">
            <button onClick={() => scrollToSection('funktionen')} className="text-left py-2.5 px-3 rounded-xl text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider cursor-pointer">
              Funktionen
            </button>
            <button onClick={() => scrollToSection('ablauf')} className="text-left py-2.5 px-3 rounded-xl text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider cursor-pointer">
              So funktioniert's
            </button>
            <button onClick={() => scrollToSection('preis')} className="text-left py-2.5 px-3 rounded-xl text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider cursor-pointer">
              Preise
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-left py-2.5 px-3 rounded-xl text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider cursor-pointer">
              FAQ
            </button>
            <button onClick={() => scrollToSection('ueber-cvb')} className="text-left py-2.5 px-3 rounded-xl text-[#585828] hover:text-[#384808] hover:bg-[#F4F2E6] font-bold text-xs uppercase tracking-wider cursor-pointer">
              Über CVB
            </button>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
              <button onClick={() => scrollToSection('buchen')} className="tech-cta-primary group w-full justify-between !h-12 !px-5 text-sm">
                <span>CVB-Office buchen</span>
                <span className="tech-ci shadow-md !w-8 !h-8">
                  <ArrowRight size={14}/>
                </span>
              </button>
              <a href={generalSettings.trialLink} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-full text-center text-xs font-spartan font-extrabold uppercase tracking-wider text-[#384808] border-[1.5px] border-[#A09048] hover:bg-[#F4F2E6]">
                14 Tage kostenlos testen ↗
              </a>
            </div>
          </div>)}
      </header>
    </>);
};
