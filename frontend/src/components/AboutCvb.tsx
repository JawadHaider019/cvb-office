import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Mail,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
  Truck,
  Scale,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';

export const AboutCvb: React.FC = () => {
  const { content, generalSettings } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(generalSettings.contactEmail || 'info@caravan-vermieter-bund.de');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToForm = () => {
    const el = document.getElementById('buchen');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="studio" className="relative py-20 lg:py-28 bg-[#FFFFFF] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-[#F4F2E6] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top Header Row (Matching Reference Header: Pill badge on left, breadcrumb on right) */}
        <ScrollReveal>
          <div className="flex items-center justify-between pb-8 mb-10 border-b border-[#A09048]/20">
            {/* Left Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#242E05] text-white text-xs font-spartan font-bold tracking-wider uppercase shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#A09048] text-[#242E05] flex items-center justify-center font-black text-[10px]">
                ✦
              </span>
              <span>ÜBER DEN BUND</span>
            </div>

            {/* Right Breadcrumb Tag */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#889028] uppercase">
              <span>↳ CVB-OFFICE // VERBUND-PORTAL</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Master Bento Grid (Exact structural match to uploaded Reference Design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT SIDE (5 Columns): Headline, Narrative, Quote & Feature Pills */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Highlighted Headline with Accent Box */}
              <h2 className="font-spartan text-3xl sm:text-4xl lg:text-[44px] font-black uppercase text-[#384808] leading-[1.04] tracking-tight mb-6">
                <span className="block text-[#384808]">MIT WEITSICHT GEGRÜNDET.</span>
                <span className="inline-block bg-[#A09048] text-white px-3 py-1 rounded-xl mt-1.5 shadow-sm">
                  FÜR VERMIETER GEBAUT.
                </span>
              </h2>

              {/* Explanatory Paragraph */}
              <p className="text-sm sm:text-base text-[#585828] font-normal leading-relaxed mb-6 font-body">
                {content.aboutText ||
                  'Der Caravan-Vermieter-Bund unterstützt Wohnmobil-Vermieter mit Wissen, Versicherungen und einem starken Netzwerk. Heute betreuen wir mehr als 1.000 Fahrzeuge in ganz Deutschland.'}
              </p>

              {/* Founder Quote Card */}
              <div className="p-5 rounded-2xl bg-[#F4F2E6] border border-[#A09048]/35 mb-6 shadow-xs">
                <p className="font-sans italic text-xs sm:text-sm text-[#384808] mb-3 leading-relaxed">
                  „Unser Ziel ist es, unabhängigen Wohnmobil- und Caravan-Vermietern die besten Werkzeuge an die Hand zu geben – einfach, fair und ohne komplizierte Hürden.“
                </p>
                <div className="text-xs font-bold tracking-wider uppercase text-[#889028] font-mono">
                  — {content.aboutFounder || 'Detlef Scheer (Gründer & Geschäftsführer)'} (Gründer CVB)
                </div>
              </div>
            </div>

            {/* Bottom Row of Pill Tags (Matching Reference Bottom Left Pills) */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F2E6] border border-[#A09048]/30 text-xs font-spartan font-bold text-[#384808]">
                <Truck size={14} className="text-[#889028]" />
                <span>1.000+ Fahrzeuge</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F2E6] border border-[#A09048]/30 text-xs font-spartan font-bold text-[#384808]">
                <Scale size={14} className="text-[#889028]" />
                <span>BGB-Musterverträge</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F2E6] border border-[#A09048]/30 text-xs font-spartan font-bold text-[#384808]">
                <Users size={14} className="text-[#889028]" />
                <span>Starkes Netzwerk</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (7 Columns): 2 Top Bento Cards + 1 Bottom Wide Banner Card */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* TOP ROW: 2 Cards Side-by-Side (Dark Navy/Olive Card + Warm Gold Card) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1: Verbandssitz (Matching "ADMISSIONS OFFICE" Card) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="relative bg-[#242E05] text-white rounded-[28px] p-7 flex flex-col justify-between overflow-hidden shadow-xl border border-[#A09048]/35 group min-h-[200px]"
              >
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#A09048]/15 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#A09048]">
                      <MapPin size={16} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#F4F2E6]/75 uppercase">
                      VERBANDSSITZ & LEITUNG
                    </span>
                  </div>

                  <h3 className="font-spartan font-black text-xl sm:text-2xl text-white uppercase tracking-tight leading-snug">
                    Caravan-Vermieter-Bund (CVB)
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs text-[#F4F2E6]/80 font-mono mt-4 pt-3 border-t border-white/10">
                  <span>Detlef Scheer · Deutschland</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A09048] animate-pulse" />
                </div>
              </motion.div>

              {/* Card 2: E-Mail & Beratung (Matching Yellow "WRITE TO US" Card) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="relative bg-[#A09048] text-[#242E05] rounded-[28px] p-7 flex flex-col justify-between overflow-hidden shadow-xl border border-[#889028]/35 group min-h-[200px]"
              >
                {/* Watermark @ Graphic */}
                <div className="absolute -top-6 -right-6 text-black/10 font-spartan font-black text-9xl pointer-events-none select-none">
                  @
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-[#242E05] text-white flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                    <span className="text-[10px] font-mono font-black tracking-widest text-[#242E05]/85 uppercase">
                      PERSÖNLICHE BERATUNG
                    </span>
                  </div>

                  <a
                    href={`mailto:${generalSettings.contactEmail}`}
                    className="font-spartan font-black text-base sm:text-lg text-[#242E05] hover:underline break-all block leading-tight mb-2"
                  >
                    {generalSettings.contactEmail}
                  </a>
                </div>

                {/* 2 Action Buttons (Exact Match to "Send an e-mail →" and "Copy") */}
                <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-[#242E05]/15">
                  <a
                    href={`mailto:${generalSettings.contactEmail}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#242E05] text-white font-spartan font-bold text-xs uppercase tracking-wider hover:bg-[#384808] transition-colors shadow-sm"
                  >
                    <span>E-Mail senden</span>
                    <ArrowRight size={12} />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/80 hover:bg-white text-[#242E05] font-spartan font-bold text-xs uppercase tracking-wider transition-colors border border-[#242E05]/20 cursor-pointer shadow-xs"
                  >
                    {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                    <span>{copied ? 'Kopiert' : 'Kopieren'}</span>
                  </button>
                </div>
              </motion.div>

            </div>

            {/* BOTTOM ROW: Wide Banner Card (Matching Purple "Applicant Support" Card) */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="relative bg-[#384808] text-white rounded-[28px] p-7 sm:p-8 overflow-hidden shadow-2xl border border-[#A09048]/40"
            >
              {/* Subtle background glow */}
              <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#A09048]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#A09048]">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-spartan font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                  Offizielles Verbands-Office
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#F4F2E6]/90 font-normal leading-relaxed mb-6 max-w-xl font-sans">
                Gemeinsam stark im Verbund – wir geben unabhängigen Wohnmobil- und Caravan-Vermietern die besten Werkzeuge an die Hand. 100 % DSGVO-konform, faire Verbundkonditionen und 0 % Buchungsprovision.
              </p>

              {/* 3 Action Buttons (Matching reference: Primary white pill + Ghost pills) */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary Button: "Mehr über den CVB erfahren →" */}
                <a
                  href={generalSettings.cvbWebsiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#384808] hover:bg-[#F4F2E6] font-spartan font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group"
                >
                  <span>{content.aboutLinkText || 'Mehr über den CVB erfahren'}</span>
                  <ArrowUpRight size={14} className="text-[#889028] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Secondary Ghost Button: "14 Tage testen" */}
                <a
                  href={generalSettings.trialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-transparent hover:bg-white/10 border border-white/35 text-white font-spartan font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>14 Tage testen</span>
                </a>

                {/* Tertiary Ghost Button: "CVB-Office anfragen" */}
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-transparent hover:bg-white/10 border border-white/35 text-white font-spartan font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Jetzt anfragen</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
