import React from 'react';
import { useApp } from '../context/AppContext';
import { QrCode, Video, Sparkles, LayoutDashboard, FileCheck2, MapPin } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { motion } from 'motion/react';

export const BuildingBlocks: React.FC = () => {
  const { content } = useApp();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header: Split Left (Headline) & Right (Editorial Paragraph) */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-[#A09048]/20">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="tech-tag mb-4">
                <span className="tech-tagn">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                  DIE ZWEI BAUSTEINE
                </span>
              </div>

              <h2 className="font-spartan font-black text-[23px] sm:text-5xl lg:text-[54px] leading-[1.06] sm:leading-[1.02] uppercase tracking-tight text-[#384808]">
                Digitale Vorab-Einweisung &{' '}
                <span className="text-[#889028]">
                  zentrales Vermiet-Cockpit<span className="text-[#A09048]">.</span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-end">
              <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed font-body">
                Zwei perfekt abgestimmte Werkzeuge: Deine Mieter bereiten sich selbstständig auf das Fahrzeug vor – und Du steuerst Anfragen, Verträge und Übergaben zentral.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Block A (Elevated White Bento Card) */}
          <ScrollReveal delay={0.08} distance={30}>
            <div className="bg-white p-5 sm:p-11 lg:p-14 shadow-[0_20px_50px_-20px_rgba(56,72,8,0.12)] border border-[#A09048]/30 rounded-[24px] sm:rounded-[32px] text-[#384808]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-center">
                {/* Left Column (7 Cols): Content + 3 Verified Features */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="tech-tag mb-4">
                    <span className="tech-tagn">A</span>
                    <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                      FÜR DEINE MIETER
                    </span>
                  </div>

                  <h3 className="font-spartan font-black text-2xl sm:text-4xl text-[#242E05] uppercase tracking-tight mb-3 sm:mb-3.5">
                    {content.blockATitle}
                  </h3>

                  <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed mb-5 sm:mb-7 font-body max-w-2xl">
                    {content.blockAText}
                  </p>

                  <StaggerContainer className="space-y-3 sm:space-y-3.5 w-full">
                    <StaggerItem>
                      <div className="p-3.5 sm:p-5 bg-[#F9F8F3] border border-[#A09048]/25 rounded-2xl flex items-center justify-between gap-3 sm:gap-4 hover:border-[#889028] transition-colors group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#384808] text-white flex items-center justify-center shrink-0">
                            <Video size={18} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-spartan font-black uppercase tracking-wider text-[#242E05]">
                              Kurze Videos auf dem Smartphone
                            </div>
                            <div className="text-xs sm:text-[13px] text-[#585828] mt-0.5 leading-snug">
                              Deine Mieter sehen sich die wichtigsten Funktionen bereits vor der Übergabe an.
                            </div>
                          </div>
                        </div>
                        <span className="hidden sm:block font-spartan font-black text-2xl text-[#384808]/12 group-hover:text-[#A09048]/45 transition-colors select-none shrink-0">
                          01
                        </span>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="p-3.5 sm:p-5 bg-[#F9F8F3] border border-[#A09048]/25 rounded-2xl flex items-center justify-between gap-3 sm:gap-4 hover:border-[#889028] transition-colors group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#384808] text-white flex items-center justify-center shrink-0">
                            <QrCode size={18} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-spartan font-black uppercase tracking-wider text-[#242E05]">
                              QR-Codes im Fahrzeug
                            </div>
                            <div className="text-xs sm:text-[13px] text-[#585828] mt-0.5 leading-snug">
                              Direkt im Camper scannen und unterwegs sofort die passende Anleitung finden.
                            </div>
                          </div>
                        </div>
                        <span className="hidden sm:block font-spartan font-black text-2xl text-[#384808]/12 group-hover:text-[#A09048]/45 transition-colors select-none shrink-0">
                          02
                        </span>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="p-3.5 sm:p-5 bg-[#F9F8F3] border border-[#A09048]/25 rounded-2xl flex items-center justify-between gap-3 sm:gap-4 hover:border-[#889028] transition-colors group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#384808] text-white flex items-center justify-center shrink-0">
                            <Sparkles size={18} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-spartan font-black uppercase tracking-wider text-[#242E05]">
                              Digitaler KI-Assistent
                            </div>
                            <div className="text-xs sm:text-[13px] text-[#585828] mt-0.5 leading-snug">
                              Beantwortet Mieterfragen rund um das gemietete Fahrzeug jederzeit direkt.
                            </div>
                          </div>
                        </div>
                        <span className="hidden sm:block font-spartan font-black text-2xl text-[#384808]/12 group-hover:text-[#A09048]/45 transition-colors select-none shrink-0">
                          03
                        </span>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </div>

                {/* Right Column (5 Cols): Clean Framed Motorhome Photo */}
                <div className="lg:col-span-5">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="relative rounded-[20px] sm:rounded-[26px] overflow-hidden border border-[#A09048]/30 shadow-xl bg-[#F4F2E6] aspect-[4/3] lg:aspect-[4/4.2] group"
                  >
                    <img
                      src={content.blockAImage || IMAGES.heroMotorhomeHandover}
                      alt={content.blockAImageAlt || 'Schlüsselübergabe Reisemobil'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C2603]/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between gap-3">
                      <span className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 text-[#242E05] font-spartan font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-md">
                        Vorab per Smartphone & QR-Code
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Block B (Olive-to-Black Architectural Bento Card with Split Layout) */}
          <ScrollReveal delay={0.12} distance={30}>
            <div className="rounded-[24px] sm:rounded-[32px] p-5 sm:p-11 lg:p-14 bg-gradient-to-br from-[#283505] via-[#1C2603] to-[#0D1201] text-white border border-[#A09048]/40 shadow-[0_25px_70px_rgba(24,32,4,0.28)] relative overflow-hidden">
              {/* Subtle ambient glow */}
              <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-[#A09048]/12 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-center">
                {/* Left Column (5 Cols): Narrative */}
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#A09048]/35 mb-4">
                    <span className="w-5 h-5 rounded-full bg-[#889028] text-white font-spartan font-black text-[11px] flex items-center justify-center">
                      B
                    </span>
                    <span className="font-spartan font-bold text-xs uppercase tracking-wider text-white">
                      FÜR DICH ALS VERMIETER
                    </span>
                  </div>

                  <h3 className="font-spartan font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-3 sm:mb-4">
                    {content.blockBTitle}
                  </h3>

                  <p className="text-sm sm:text-base text-[#F4F2E6]/85 font-normal leading-relaxed font-body">
                    {content.blockBText}
                  </p>
                </div>

                {/* Right Column (7 Cols): 3 Clean Architectural Feature Rows */}
                <div className="lg:col-span-7">
                  <StaggerContainer className="space-y-3 sm:space-y-3.5">
                    <StaggerItem>
                      <div className="p-4 sm:p-6 bg-white/[0.04] border border-white/10 hover:border-[#A09048]/50 rounded-2xl transition-colors flex items-center justify-between gap-3 sm:gap-4 group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#889028] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#A09048] group-hover:text-white transition-colors">
                            <LayoutDashboard size={20} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-base font-spartan font-black uppercase tracking-wider text-white mb-1">
                              Zentrales Cockpit
                            </div>
                            <p className="text-xs sm:text-[13px] text-[#F4F2E6]/80 leading-relaxed">
                              Alle Termine, Verträge und Fahrzeugstatus in Echtzeit auf einen Blick.
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:block font-spartan font-black text-3xl text-white/15 group-hover:text-[#A09048]/45 transition-colors select-none shrink-0">
                          01
                        </span>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="p-4 sm:p-6 bg-white/[0.04] border border-white/10 hover:border-[#A09048]/50 rounded-2xl transition-colors flex items-center justify-between gap-3 sm:gap-4 group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#889028] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#A09048] group-hover:text-white transition-colors">
                            <FileCheck2 size={20} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-base font-spartan font-black uppercase tracking-wider text-white mb-1">
                              Digitale Verträge
                            </div>
                            <p className="text-xs sm:text-[13px] text-[#F4F2E6]/80 leading-relaxed">
                              Rechtssichere Mietverträge, Protokolle und Rechnungen sekundenschnell als PDF.
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:block font-spartan font-black text-3xl text-white/15 group-hover:text-[#A09048]/45 transition-colors select-none shrink-0">
                          02
                        </span>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="p-4 sm:p-6 bg-white/[0.04] border border-white/10 hover:border-[#A09048]/50 rounded-2xl transition-colors flex items-center justify-between gap-3 sm:gap-4 group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#889028] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#A09048] group-hover:text-white transition-colors">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <div className="text-xs sm:text-base font-spartan font-black uppercase tracking-wider text-white mb-1">
                              Standorte & Verbünde
                            </div>
                            <p className="text-xs sm:text-[13px] text-[#F4F2E6]/80 leading-relaxed">
                              Mehrere Übergabestationen oder Partnerflotten mit klarer Trennung verwalten.
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:block font-spartan font-black text-3xl text-white/15 group-hover:text-[#A09048]/45 transition-colors select-none shrink-0">
                          03
                        </span>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
