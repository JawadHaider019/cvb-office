import React from 'react';
import { useApp } from '../context/AppContext';
import { QrCode, Video, Clock, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { motion } from 'motion/react';

export const BuildingBlocks: React.FC = () => {
  const { content } = useApp();

  return (
    <section className="py-20 lg:py-32 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="tech-tag mb-4">
            <span className="tech-tagn">✦</span>
            <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
              DIE ZWEI BAUSTEINE
            </span>
          </div>

          <h2 className="font-spartan font-black text-4xl sm:text-5xl lg:text-[56px] leading-[0.98] uppercase tracking-tight text-[#384808] mb-16 max-w-3xl">
            Digitale Vorab-Einweisung & zentrales Vermiet-Cockpit<span className="text-[#A09048]">.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {/* Block A (White Bento Card) */}
          <ScrollReveal delay={0.1} distance={40}>
            <div className="bg-white p-8 sm:p-14 lg:p-16 shadow-[0_20px_50px_-20px_rgba(56,72,8,0.12)] border border-[#A09048]/35 rounded-[32px] text-[#384808]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="tech-tag mb-3">
                    <span className="tech-tagn">A</span>
                    <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                      FÜR DEINE MIETER
                    </span>
                  </div>

                  <h3 className="font-spartan font-black text-3xl sm:text-4xl text-[#384808] mb-4">
                    {content.blockATitle}
                  </h3>

                  <p className="text-base text-[#585828] font-normal leading-relaxed mb-8 font-body">
                    {content.blockAText}
                  </p>

                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                    <StaggerItem>
                      <div className="p-4 bg-[#F4F2E6] border border-[#A09048]/25 rounded-2xl flex items-start gap-3 hover:border-[#889028] transition-colors">
                        <Video size={18} className="text-[#889028] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-spartan font-bold uppercase tracking-wider text-[#384808]">Video-Module</div>
                          <div className="text-xs text-[#585828] mt-0.5">Vorab auf dem Smartphone ansehen.</div>
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="p-4 bg-[#F4F2E6] border border-[#A09048]/25 rounded-2xl flex items-start gap-3 hover:border-[#889028] transition-colors">
                        <QrCode size={18} className="text-[#889028] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-spartan font-bold uppercase tracking-wider text-[#384808]">QR-Codes im Camper</div>
                          <div className="text-xs text-[#585828] mt-0.5">Sofortige Hilfe im Fahrzeug.</div>
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="p-4 bg-[#F4F2E6] border border-[#A09048]/25 rounded-2xl flex items-start gap-3 hover:border-[#889028] transition-colors">
                        <Clock size={18} className="text-[#889028] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-spartan font-bold uppercase tracking-wider text-[#384808]">50% Zeitersparnis</div>
                          <div className="text-xs text-[#585828] mt-0.5">Keine langen Erklärungen im Regen.</div>
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="p-4 bg-[#F4F2E6] border border-[#A09048]/25 rounded-2xl flex items-start gap-3 hover:border-[#889028] transition-colors">
                        <Sparkles size={18} className="text-[#889028] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-spartan font-bold uppercase tracking-wider text-[#384808]">Digitaler Assistent</div>
                          <div className="text-xs text-[#585828] mt-0.5">Beantwortet Fragen 24/7.</div>
                        </div>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </div>

                <div className="lg:col-span-5">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative h-72 sm:h-80 overflow-hidden rounded-2xl bg-stone-100 shadow-md border border-[#A09048]/30"
                  >
                    <img
                      src={content.blockAImage || IMAGES.heroMotorhomeHandover}
                      alt={content.blockAImageAlt || "Schlüsselübergabe Reisemobil"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Block B (Dark Olive Green #384808 Container with Gold Accents) */}
          <ScrollReveal delay={0.15} distance={40}>
            <div className="rounded-[32px] p-8 sm:p-14 lg:p-16 bg-[#384808] text-white border border-[#A09048] shadow-2xl relative overflow-hidden">
              <div className="tech-tag mb-3 bg-[#2D3A06] border-white/20">
                <span className="tech-tagn bg-[#A09048] text-white">B</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-white">
                  FÜR DICH ALS VERMIETER
                </span>
              </div>

              <h3 className="font-spartan font-black text-3xl sm:text-4xl text-white mb-4">
                {content.blockBTitle}
              </h3>

              <p className="text-base text-[#F4F2E6] font-normal leading-relaxed mb-8 max-w-2xl font-body">
                {content.blockBText}
              </p>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <StaggerItem>
                  <div className="p-6 bg-white/10 border border-white/15 rounded-2xl hover:bg-white/15 transition-colors">
                    <div className="text-xs font-spartan font-bold uppercase tracking-wider text-[#A09048] mb-2">
                      Zentrales Cockpit
                    </div>
                    <p className="text-xs text-[#F4F2E6]/90 leading-relaxed">
                      Alle Termine, Verträge und Fahrzeugstatus in Echtzeit auf einen Blick.
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="p-6 bg-white/10 border border-white/15 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="text-xs font-spartan font-bold uppercase tracking-wider text-[#A09048] mb-2">
                      Digitale Verträge
                    </div>
                    <p className="text-xs text-[#F4F2E6]/90 leading-relaxed">
                      Rechtssichere Mietverträge, Protokolle und Rechnungen sekundenschnell als PDF.
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="p-6 bg-white/10 border border-white/15 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="text-xs font-spartan font-bold uppercase tracking-wider text-[#A09048] mb-2">
                      Standorte & Verbünde
                    </div>
                    <p className="text-xs text-[#F4F2E6]/90 leading-relaxed">
                      Mehrere Übergabestationen oder Partnerflotten mit klarer Trennung verwalten.
                    </p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
