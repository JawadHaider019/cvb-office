import React from 'react';
import { useApp } from '../context/AppContext';
import { Lock, ShieldCheck, ArrowUpRight, Mail, MapPin, Heart, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC<{
  onOpenImpressum: () => void;
  onOpenPrivacy: () => void;
}> = ({ onOpenImpressum, onOpenPrivacy }) => {
  const { setCurrentView, isAdminLoggedIn, generalSettings } = useApp();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#283505] via-[#172002] to-[#080B01] text-white border-t border-[#A09048]/35 overflow-hidden">
      {/* Background radial ambient lighting */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#A09048]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-[#889028]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Footer Content Grid */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-14 border-b border-white/10">

          {/* Column 1 (5 cols): Brand Identity, Mission & Logo */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/cvb_office_logo.png"
                alt="CVB-Office Logo"
                className="w-11 h-11 object-contain drop-shadow-md rounded-xl"
              />
              <div className="flex flex-col">
                <span className="font-spartan text-2xl font-black tracking-tight text-white leading-none">
                  CVB-OFFICE<span className="text-[#A09048]">.</span>
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#A09048] uppercase mt-1">
                  CARAVAN-VERMIETER-BUND
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F4F2E6]/80 leading-relaxed font-sans max-w-md">
              Das offizielle digitale Vermiet-Office des Caravan-Vermieter-Bund (CVB). Entwickelt für unabhängige Wohnmobil- und Caravan-Vermieter in ganz Deutschland: rechtssichere BGB-Musterverträge, digitale Vorab-Einweisung per QR & Video, Website-Widget und zentrales Cockpit.
            </p>

            {/* Partnership Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#F4F2E6]/85">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A09048] animate-pulse" />
              <span>Technologiepartner: <strong className="text-white font-bold">Smarlps</strong></span>
            </div>
          </div>

          {/* Column 2 (2.5 cols): Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-spartan font-black text-xs uppercase tracking-[0.18em] text-[#A09048]">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4F2E6]/85 font-medium">
              <li>
                <button
                  onClick={() => scrollToSection('top')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Startseite
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('funktionen')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Funktionen & Cockpit
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('ablauf')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Ablauf in 4 Schritten
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('preis')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Tarife & Flotten-Rechner
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Häufige Fragen (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('ueber-cvb')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Über den Bund (CVB)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (2 cols): Verband & Recht */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-spartan font-black text-xs uppercase tracking-[0.18em] text-[#A09048]">
              RECHT & SICHERHEIT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4F2E6]/85 font-medium">
              <li>
                <button
                  onClick={onOpenImpressum}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Impressum (§ 5 TMG)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                >
                  Datenschutz (DSGVO)
                </button>
              </li>
              <li>
                <a
                  href={generalSettings.cvbWebsiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors inline-flex items-center gap-1"
                >
                  <span>CVB Verband</span>
                  <ArrowUpRight size={12} className="text-[#A09048]" />
                </a>
              </li>
              <li className="pt-2 text-[11px] font-mono text-[#F4F2E6]/75 leading-snug">
                🇩🇪 Serverstandort:<br />
                <span className="text-white">Frankfurt am Main</span>
              </li>
            </ul>
          </div>

          {/* Column 4 (2.5 cols): Kontakt & Betreuung */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-spartan font-black text-xs uppercase tracking-[0.18em] text-[#A09048]">
              KONTAKT & SUPPORT
            </h4>

            <div className="space-y-2 text-xs text-[#F4F2E6]/90">
              <div className="font-bold text-white">Caravan-Vermieter-Bund</div>
              <div className="text-[11px] text-[#F4F2E6]/80">Detlef Scheer (Vorstand)</div>

              <a
                href={`mailto:${generalSettings.contactEmail}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#A09048] hover:text-white underline font-mono break-all pt-1"
              >
                <Mail size={13} className="shrink-0" />
                <span>{generalSettings.contactEmail}</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href={generalSettings.trialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto lg:w-full px-4 py-2.5 sm:py-2 rounded-full bg-[#A09048] hover:bg-[#889028] text-white font-spartan font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>14 Tage testen</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Admin Keyhole */}
            <div className="pt-1">
              <button
                onClick={() => setCurrentView('admin')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#A09048] hover:text-white transition-all cursor-pointer text-[10px] font-mono uppercase text-[#F4F2E6]/85"
              >
                {isAdminLoggedIn ? <ShieldCheck size={12} className="text-[#A09048]" /> : <Lock size={11} />}
                <span>{isAdminLoggedIn ? 'ADMIN AKTIV' : 'ADMIN BEREICH'}</span>
              </button>
            </div>
          </div>

          </div>
        </ScrollReveal>

        {/* Bottom Bar: Copyright & Compliance */}
        <ScrollReveal delay={0.08}>
          <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-[10.5px] sm:text-[11px] font-mono text-[#F4F2E6]/70">
            <div className="flex items-center justify-center md:justify-start gap-2 text-center md:text-left">
              <span className="w-2 h-2 rounded-full bg-[#A09048] shrink-0" />
              <span>© {new Date().getFullYear()} CARAVAN-VERMIETER-BUND (CVB). ALLE RECHTE VORBEHALTEN.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 sm:gap-x-4 gap-y-1 text-center md:text-right">
              <span>100 % DSGVO-KONFORM</span>
              <span aria-hidden="true">·</span>
              <span>HOSTING IN DEUTSCHLAND</span>
              <span aria-hidden="true">·</span>
              <span>0 % PROVISION</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
