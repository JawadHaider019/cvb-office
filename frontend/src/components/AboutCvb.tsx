import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { motion } from 'motion/react';

export const AboutCvb: React.FC = () => {
  const { content, generalSettings, priceSettings } = useApp();

  const formattedMonthly = priceSettings.monthlyNet.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section id="studio" className="relative py-24 lg:py-32 bg-[#FFFFFF] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#F4F2E6] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left: Rounded Tech Cockpit Frame */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" distance={36}>
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4 }}
                className="relative h-[380px] sm:h-[460px] overflow-hidden rounded-[32px] border border-[#A09048]/35 shadow-2xl group bg-[#F4F2E6]"
              >
                <img
                  src={content.aboutImage || IMAGES.camperDigitalCockpit}
                  alt={content.aboutImageAlt || "Digitales Cockpit und Camper Innenraum"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#384808]/70 via-transparent to-transparent pointer-events-none opacity-80" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#384808]/90 backdrop-blur-md border border-[#A09048]/40 text-white text-xs font-mono tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#A09048] animate-ping" />
                  <span>CVB-OFFICE // VERBUND-PORTAL</span>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Right: Editorial Story & Blueprint Background */}
          <div className="lg:col-span-6 flex flex-col items-start relative pl-0 lg:pl-6">
            <ScrollReveal direction="right" distance={36}>
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  ÜBER DEN BUND
                </span>
              </div>

              <h2 className="font-spartan text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#384808] leading-[1.02] tracking-tight mb-6">
                MIT WEITSICHT GEGRÜNDET.{' '}
                <span className="text-[#889028]">
                  FÜR VERMIETER GEBAUT<span className="text-[#A09048]">.</span>
                </span>
              </h2>

              <p className="text-base text-[#585828] font-normal leading-relaxed mb-8 max-w-lg font-body">
                {content.aboutText}
              </p>

              <div className="p-6 rounded-[24px] bg-[#F4F2E6] border border-[#A09048]/35 mb-8 max-w-lg shadow-sm">
                <p className="font-sans italic text-sm sm:text-base text-[#384808] mb-3 leading-relaxed">
                  „Unser Ziel ist es, unabhängigen Wohnmobil- und Caravan-Vermietern die besten Werkzeuge an die Hand zu geben – einfach, fair und ohne komplizierte Hürden.“
                </p>
                <div className="text-xs font-bold tracking-wider uppercase text-[#889028] font-mono mb-3">
                  — {content.aboutFounder} (Gründer CVB)
                </div>
                <div className="pt-3 border-t border-[#A09048]/20 flex items-center gap-2 text-xs text-[#585828]">
                  <span>Persönliche Verbandsberatung:</span>
                  <a href={`mailto:${generalSettings.contactEmail}`} className="font-bold text-[#384808] hover:underline">
                    {generalSettings.contactEmail}
                  </a>
                </div>
              </div>

              {/* Tech Destination CTA Ghost */}
              <a
                href={generalSettings.cvbWebsiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-cta-ghost group inline-flex items-center gap-3"
              >
                <span>{content.aboutLinkText}</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#889028]" />
              </a>
            </ScrollReveal>
          </div>
        </div>

        {/* Tech Destination 4-Column Bento Stat Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerItem>
            <div className="bg-[#F4F2E6] rounded-[28px] p-7 border border-[#A09048]/25 hover:border-[#889028] transition-all group flex flex-col justify-center">
              <span className="font-spartan text-4xl sm:text-5xl lg:text-6xl font-black text-[#384808] leading-none mb-2 group-hover:text-[#889028] transition-colors">
                1.000+
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#585828] font-mono">
                BETREUTE FAHRZEUGE
              </span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-[#384808] text-white rounded-[28px] p-7 border border-[#A09048] group flex flex-col justify-center shadow-lg">
              <span className="font-spartan text-4xl sm:text-5xl lg:text-6xl font-black text-[#A09048] leading-none mb-2 drop-shadow-sm">
                {formattedMonthly} €
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4F2E6] font-mono">
                NETTO / MONAT / FAHRZEUG
              </span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-[#F4F2E6] rounded-[28px] p-7 border border-[#A09048]/25 hover:border-[#889028] transition-all group flex flex-col justify-center">
              <span className="font-spartan text-4xl sm:text-5xl lg:text-6xl font-black text-[#384808] leading-none mb-2 group-hover:text-[#889028] transition-colors">
                50 %
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#585828] font-mono">
                ZEITERSPARNIS BEI ÜBERGABE
              </span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-[#F4F2E6] rounded-[28px] p-7 border border-[#A09048]/25 hover:border-[#889028] transition-all group flex flex-col justify-center">
              <span className="font-spartan text-4xl sm:text-5xl lg:text-6xl font-black text-[#384808] leading-none mb-2 group-hover:text-[#889028] transition-colors">
                100 %
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#585828] font-mono">
                DSGVO IN DEUTSCHLAND
              </span>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
