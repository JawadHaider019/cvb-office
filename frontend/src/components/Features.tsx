import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { motion } from 'motion/react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { TiltCard3D } from './TiltCard3D';

export const Features: React.FC = () => {
  const { features } = useApp();
  const visibleFeatures = features.filter((f) => f.visible);

  const scrollToSection = (id: string) => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Top 3 featured spotlight modules
  const spotlightModules = [
    {
      title: 'FLOTTEN-COCKPIT',
      category: 'VERWALTUNG',
      desc: 'Alle Buchungen, Termine & Fahrzeugzustände in Echtzeit.',
      image: IMAGES.luxuryCockpitTablet,
    },
    {
      title: 'DIGITALER VERTRAG',
      category: 'RECHTSSICHER',
      desc: 'Mietverträge papierlos direkt digital unterschreiben & archivieren.',
      image: IMAGES.heroMotorhomeHandover,
    },
    {
      title: 'ONLINE-BUCHUNGSWIDGET',
      category: 'WEBSITE',
      desc: 'Live-Verfügbarkeiten & Direktanfragen auf Deiner eigenen Domain.',
      image: IMAGES.camperDigitalCockpit,
    },
  ];

  return (
    <section id="funktionen" className="py-20 lg:py-32 bg-white text-[#384808] border-b border-[#A09048]/25 relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-12 border-b border-[#A09048]/25 gap-4">
            <div>
              <div className="tech-tag mb-3">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  HAUPTFUNKTIONEN & SYSTEM
                </span>
              </div>
              <h2 className="font-spartan font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#384808]">
                Die Komplettlösung für Vermieter im Bund<span className="text-[#A09048]">.</span>
              </h2>
            </div>

            <button
              onClick={() => scrollToSection('buchen')}
              className="tech-cta-primary group text-xs py-2 h-10"
            >
              <span>CVB-Office anfragen</span>
              <span className="tech-ci w-7 h-7">
                <ArrowRight size={13} />
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* 3-COLUMN FEATURED CARDS (Warm cream #F4F2E6 bento cards with Gold #A09048 borders) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-20">
          {spotlightModules.map((item, idx) => (
            <StaggerItem key={idx}>
              <TiltCard3D maxTilt={5} className="h-full">
                <motion.div
                  whileHover={{
                    scale: 1.025,
                    y: -6,
                    boxShadow: '0 20px 45px -15px rgba(56, 72, 8, 0.2)',
                    borderColor: '#889028',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  onClick={() => scrollToSection('buchen')}
                  className="group relative flex flex-col cursor-pointer h-full bg-[#F4F2E6] p-6 rounded-[28px] border border-[#A09048]/30 shadow-xs overflow-hidden transition-all duration-300"
                >
                  {/* Photo Box */}
                  <div className="relative h-60 sm:h-64 overflow-hidden rounded-2xl bg-stone-100 border border-[#A09048]/20 mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 text-[#384808] text-[10px] font-spartan font-bold px-3 py-1 rounded-full tracking-widest backdrop-blur-md border border-[#A09048]/40 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#889028] animate-pulse" />
                      <span>CVB-OFFICE</span>
                    </div>
                  </div>

                  {/* Row 1: Title and Category */}
                  <div className="relative z-10 flex items-center justify-between mb-2">
                    <span className="font-spartan font-black text-lg text-[#384808] group-hover:text-[#889028] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#889028] font-bold">
                      {item.category}
                    </span>
                  </div>

                  {/* Row 2: Description and Arrow */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-[#585828] pt-2 mt-auto">
                    <span>{item.desc}</span>
                    <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#384808] group-hover:text-white text-[#384808] border border-[#A09048]/40 flex items-center justify-center transition-all duration-300 shrink-0 ml-3 shadow-xs">
                      <ArrowRight size={14} className="group-hover:rotate-[-45deg] transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              </TiltCard3D>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* 4-COLUMN BENTO GRID: WEITERE SYSTEMLEISTUNGEN */}
        <div className="pt-20 border-t border-[#A09048]/25">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="tech-tag">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  WEITERE SYSTEMLEISTUNGEN
                </span>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleFeatures.map((feat, index) => (
              <StaggerItem key={feat.id || index}>
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                    boxShadow: '0 20px 45px -15px rgba(56, 72, 8, 0.2)',
                    borderColor: '#889028',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  className="relative flex flex-col justify-between group h-full bg-[#F4F2E6] p-7 sm:p-8 rounded-[28px] border border-[#A09048]/30 shadow-xs overflow-hidden cursor-pointer transition-all duration-300"
                >
                  <div className="relative z-10">
                    {/* Number Badge */}
                    <div className="w-11 h-11 mb-6 flex items-center justify-center text-white bg-[#384808] rounded-2xl font-spartan font-black text-sm group-hover:bg-[#889028] transition-all duration-300 shadow-xs">
                      0{index + 1}
                    </div>

                    <h3 className="font-spartan font-black text-sm uppercase tracking-wider text-[#384808] group-hover:text-[#889028] transition-colors mb-3">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#585828] leading-relaxed font-normal mb-6">
                      {feat.text}
                    </p>
                  </div>

                  <button
                    onClick={() => scrollToSection('buchen')}
                    className="relative z-10 pt-4 border-t border-[#A09048]/25 flex items-center justify-between text-xs font-spartan font-bold tracking-wider uppercase text-[#384808] group-hover:text-[#889028] transition-colors cursor-pointer text-left"
                  >
                    <span>Anfragen</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
