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
                    className="relative rounded-2xl bg-white shadow-xl border border-[#A09048]/35 overflow-hidden p-5 flex flex-col justify-between"
                  >
                    {/* Simulated Mobile Smartphone / App Screen for Mieter */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#A09048]/20">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#384808]">
                          Mieter-Web-App (ohne Download)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#889028] bg-[#F4F2E6] px-2 py-0.5 rounded-full font-bold">
                        QR-Aktiv
                      </span>
                    </div>

                    {/* Video Pre-Briefing Card */}
                    <div className="relative rounded-xl overflow-hidden mb-3 bg-[#384808] aspect-video flex items-center justify-center border border-[#A09048]/30 group">
                      <img
                        src={content.blockAImage || IMAGES.heroMotorhomeHandover}
                        alt={content.blockAImageAlt || "Schlüsselübergabe Reisemobil"}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#A09048]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Video size={20} className="ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                        <span>Truma Combi: Heizung & Warmwasser</span>
                        <span className="font-mono text-[10px] bg-black/60 px-2 py-0.5 rounded">03:45 Min.</span>
                      </div>
                    </div>

                    {/* Pre-check status badges */}
                    <div className="space-y-2 bg-[#F4F2E6] p-3 rounded-xl border border-[#A09048]/20 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#384808] font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Vorab-Einweisung abgeschlossen
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          100 % erledigt
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#585828]">
                        <span>Mieter: Thomas & Sabine M.</span>
                        <span className="font-mono">Reisebeginn: Heute</span>
                      </div>
                    </div>
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

              {/* Realistic German Vermieter-Cockpit Live Snapshot Bar */}
              <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-black/25 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE-COCKPIT
                  </span>
                  <span className="text-[#F4F2E6]">Fahrzeug #04: Sunlight Cliff 600</span>
                  <span className="text-white/40">|</span>
                  <span className="text-[#A09048]">Übergabe: 15:30 Uhr</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#F4F2E6]/80 self-end md:self-auto">
                  <span className="text-emerald-300 font-bold">✓ PDF-Vertrag digital signiert</span>
                  <span className="text-white/40">·</span>
                  <span className="text-stone-300">Kaution 1.500 € autorisiert</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
