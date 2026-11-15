'use client';
import React from 'react';
import { useApp } from '../context/AppContext';
import { defaultAudience } from '../data/defaultContent';
import {
  Clock,
  TrendingUp,
  ShieldCheck,
  Caravan,
  Compass,
  Laptop,
  MapPin,
  ArrowRight,
  MessageSquareQuote,
  Users,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';

const testimonialsData = [
  {
    num: '01',
    icon: Clock,
    title: 'Familienbetrieb (6 Fahrzeuge)',
    region: 'Bayern · 50 % Zeitersparnis',
    quote: '„Die Video-Einweisung vorab spart uns Samstags pro Übergabe mindestens 30 Minuten. Die Mieter wissen bereits, wie Toilette und Gas funktionieren.“',
  },
  {
    num: '02',
    icon: TrendingUp,
    title: 'Wohnmobilvermietung (14 Mobile)',
    region: 'NRW · 0 % Provision',
    quote: '„Mit dem 1-Zeilen-Kalender auf unserer Website buchen Kunden direkt bei uns statt über teure Vermittlungsportale. 0 % Provision ab Tag eins.“',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Camper-Station (3 Vans)',
    region: 'Norddeutschland · Rechtssicher',
    quote: '„Die CVB Mietverträge und die digitale Unterschrift auf dem Tablet oder Smartphone geben uns und unseren Mietern absolute Sicherheit.“',
  },
];

const audienceIcons = {
  Caravan,
  Compass,
  Laptop,
  MapPin,
};

export const Audience = () => {
  const { content, generalSettings } = useApp();

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentTestimonials = content.testimonials || testimonialsData;
  const currentAudience = content.audienceList || defaultAudience;

  return (
    <section id="zielgruppen" className="relative py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-[#283505] via-[#131A02] to-[#060801] text-white border-b border-[#A09048]/25 overflow-hidden">
      {/* Soft centered glow behind cards */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#889028]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-10 lg:px-14">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-[#A09048]/30 mb-4 backdrop-blur-md">
              <span className="w-5 h-5 rounded-full bg-[#889028] text-white flex items-center justify-center">
                <MessageSquareQuote size={12} strokeWidth={2.5} />
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#F4F2E6]">
                {(content.testimonialsTag || 'STIMMEN AUS DER VERMIETPRAXIS').replace(/^[★✦\s]+/, '')}
              </span>
            </div>
            <h2 className="font-spartan text-[26px] sm:text-4xl lg:text-[46px] font-black uppercase text-white tracking-tight leading-[1.06] sm:leading-[1.04]">
              {content.testimonialsHeadline || 'WAS VERMIETER AN CVB-OFFICE SCHÄTZEN.'}
            </h2>
          </div>
        </ScrollReveal>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10">
          {currentTestimonials.map((t, idx) => {
            const fallbackIcons = [Clock, TrendingUp, ShieldCheck];
            const Icon = t.icon || fallbackIcons[idx % fallbackIcons.length] || Clock;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                className="bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#A09048]/40 rounded-[22px] p-5 sm:p-7 flex flex-col justify-between shadow-xl transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#889028] text-white flex items-center justify-center shadow-md">
                      <Icon size={19} />
                    </div>
                    <span className="font-spartan font-black text-3xl text-white/15 tracking-tight leading-none select-none">
                      {t.num || String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-spartan font-bold text-base text-white tracking-tight mb-2 sm:mb-2.5">
                    {t.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#F4F2E6]/75 leading-relaxed font-sans mb-4 sm:mb-5">
                    {t.quote}
                  </p>
                </div>

                <div className="text-[11px] font-mono font-semibold text-[#A09048] tracking-wide">
                  {t.region}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Centered Audience Banner */}
        <ScrollReveal delay={0.1}>
          <div className="relative rounded-[24px] sm:rounded-[32px] py-9 px-5 sm:py-16 sm:px-12 bg-gradient-to-br from-[#3D4F09] via-[#51680B] to-[#889028]/75 border border-[#A09048]/40 shadow-2xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(160,144,72,0.22),transparent_62%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.1] border border-white/20 mb-4 backdrop-blur-md">
                <span className="w-5 h-5 rounded-full bg-[#889028] text-white flex items-center justify-center">
                  <Users size={12} strokeWidth={2.5} />
                </span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#F4F2E6]">
                  {(content.audienceTag || 'ZIELGRUPPEN & FLOTTEN').replace(/^[★✦\s]+/, '')}
                </span>
              </div>

              <h3 className="font-spartan text-[23px] sm:text-4xl lg:text-[46px] font-black uppercase tracking-tight leading-[1.08] sm:leading-[1.06] mb-4">
                <span className="text-white block">
                  {content.audienceHeadline || 'FÜR JEDE VERMIETUNG GEBAUT. VOM EINZELCAMPER BIS ZUR FLOTTE.'}
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-[#F4F2E6]/85 max-w-xl mx-auto leading-relaxed mb-6">
                {content.audienceIntro ||
                  'Ob Wohnmobile, Wohnwagen, Anhänger oder Dachzelte – konzipiert für digitale Direktbuchungen und einen oder mehrere Standorte mit klarer Rechtestruktur.'}
              </p>

              {/* Minimal Inline Audience Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-7 sm:mb-8">
                {currentAudience.map((aud, idx) => {
                  const Icon = audienceIcons[aud.icon] || Caravan;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#172002]/40 border border-white/15 text-[11px] font-medium text-[#F4F2E6]/90"
                    >
                      <Icon size={13} className="text-[#F4F2E6] shrink-0" />
                      <span>{aud.title}</span>
                    </span>
                  );
                })}
              </div>

              {/* Centered 2 Pill CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto h-12 px-7 rounded-full bg-white hover:bg-[#F4F2E6] text-[#172002] font-spartan font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{content.audienceCtaPrimary || 'Jetzt anfragen'}</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href={generalSettings.trialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-7 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/25 text-white font-sans font-bold text-xs sm:text-sm transition-all"
                >
                  {content.audienceCtaSecondary || '14 Tage kostenlos testen'}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Audience;
