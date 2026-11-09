import React from 'react';
import { defaultBenefits, defaultAudience } from '../data/defaultContent';
import {
  Clock,
  Zap,
  Eye,
  ShieldCheck,
  Layers,
  Sparkles,
  Caravan,
  Compass,
  Laptop,
  MapPin,
  LucideIcon,
  CheckCircle2,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { motion } from 'motion/react';

const benefitIcons: Record<string, LucideIcon> = {
  Clock,
  Zap,
  Eye,
  ShieldCheck,
  Layers,
  Sparkles,
};

const audienceIcons: Record<string, LucideIcon> = {
  Caravan,
  Compass,
  Laptop,
  MapPin,
};

export const BenefitsAudience: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#2D3A06] text-white border-b border-[#A09048]/25 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#889028]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#A09048]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Part 6: Benefits */}
        <div className="mb-28">
          <ScrollReveal>
            <div className="tech-tag mb-4 bg-[#384808] border-[#A09048]/30 text-white">
              <span className="tech-tagn bg-[#A09048] text-white">✦</span>
              <span className="font-spartan font-bold text-xs uppercase tracking-wider text-white">
                VORTEILE FÜR VERMIETER
              </span>
            </div>

            <h2 className="font-spartan text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white leading-[1.02] tracking-tight mb-16 max-w-3xl">
              WARUM SICH CVB-OFFICE FÜR DEINEN BETRIEB{' '}
              <span className="text-[#A09048]">
                AUSZAHLT.
              </span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultBenefits.map((b, idx) => {
              const Icon = benefitIcons[b.icon] || Sparkles;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="relative bg-[#242E05] backdrop-blur-md rounded-[28px] p-8 border border-[#A09048]/25 hover:border-[#A09048] transition-all flex flex-col justify-between h-full group shadow-xl hover:shadow-[0_16px_40px_rgba(160,144,72,0.18)]"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#384808] border border-[#A09048]/40 flex items-center justify-center text-[#A09048] mb-6 group-hover:bg-[#A09048] group-hover:text-white transition-all shadow-md group-hover:scale-105">
                        <Icon size={22} />
                      </div>

                      <h3 className="font-spartan text-lg font-black uppercase tracking-wider text-white mb-3 group-hover:text-[#C5CF77] transition-colors">
                        {b.title}
                      </h3>

                      <p className="text-sm text-[#F4F2E6]/90 leading-relaxed font-sans font-normal">
                        {b.text}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-[#C5CF77]/80 flex items-center justify-between">
                      <span>SYSTEM // VORTEIL 0{idx + 1}</span>
                      <span className="text-[#A09048] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                        Aktiviert
                      </span>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Part 7: Audience */}
        <div>
          <ScrollReveal>
            <div className="tech-tag mb-4 bg-[#384808] border-[#A09048]/30 text-white">
              <span className="tech-tagn bg-[#A09048] text-white">✦</span>
              <span className="font-spartan font-bold text-xs uppercase tracking-wider text-white">
                ZIELGRUPPEN & FLOTTEN
              </span>
            </div>

            <h2 className="font-spartan text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white leading-[1.02] tracking-tight mb-16 max-w-3xl">
              FÜR WELCHE VERMIETUNGEN CVB-OFFICE{' '}
              <span className="text-[#A09048]">
                KONZIPIERT IST.
              </span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultAudience.map((aud, idx) => {
              const Icon = audienceIcons[aud.icon] || Caravan;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="relative bg-[#242E05] backdrop-blur-md rounded-[28px] p-8 border border-[#A09048]/25 hover:border-[#889028] transition-all flex flex-col justify-between h-full group shadow-xl"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#384808] border border-[#A09048]/40 flex items-center justify-center text-[#C5CF77] mb-6 group-hover:bg-[#889028] group-hover:text-white transition-all shadow-md group-hover:scale-105">
                        <Icon size={22} />
                      </div>

                      <h3 className="font-spartan text-lg font-black uppercase tracking-wider text-white mb-3 group-hover:text-[#C5CF77] transition-colors">
                        {aud.title}
                      </h3>

                      <p className="text-sm text-[#F4F2E6]/90 leading-relaxed font-sans font-normal">
                        {aud.text}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono uppercase text-[#C5CF77] font-bold">
                      <CheckCircle2 size={14} className="text-[#A09048]" />
                      <span>100% KOMPATIBEL</span>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
