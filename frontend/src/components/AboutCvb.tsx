import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  ArrowUpRight,
  Truck,
  ShieldCheck,
  Mail,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';
import { IMAGES } from '../assets/images';

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
    <section id="studio" className="relative py-14 lg:py-20 bg-[#F4F2E6] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-[#E3A824]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#384808]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top Header Bar: Matching "02 The programme" & "↳ PSEB IT BOOTCAMP" */}
        <ScrollReveal>
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#A09048]/20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C2405] text-white shadow-xs">
              <span className="w-5 h-5 rounded-full bg-[#E4B53D] text-[#1C2405] font-spartan font-black text-[11px] flex items-center justify-center">
                02
              </span>
              <span className="font-spartan font-bold text-xs uppercase tracking-wider text-white">
                ÜBER DEN BUND
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#585828]">
              <span className="text-sm font-sans font-bold">↳</span>
              <span>CVB-OFFICE // VERBUND-PORTAL</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Master 3-Column Layout: Matching "02 The programme" Pixel-for-Pixel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-10">

          {/* COLUMN 1 (Left 5 Cols): Headline with yellow highlight block, paragraph text, pill CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <h2 className="font-spartan text-3xl sm:text-4xl lg:text-[46px] font-black uppercase text-[#1C2405] leading-[1.08] tracking-tight mb-6">
                Mit Weitsicht <br />
                gegründet. <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 px-3 py-0.5 text-[#1C2405] bg-[#E4B53D] rounded-xl font-black shadow-xs">
                    Für Vermieter gebaut.
                  </span>
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#585828] font-normal leading-relaxed font-body max-w-lg mb-8">
                Der Caravan-Vermieter-Bund (CVB) stärkt unabhängige Wohnmobil- und Caravan-Vermieter mit Praxiswissen, Spezialversicherungen und einem starken Verbundnetzwerk in ganz Deutschland.
              </p>
            </div>

            <div>
              <a
                href={generalSettings.cvbWebsiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-[#1C2405] hover:bg-[#384808] text-white font-spartan font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group w-fit"
              >
                <span>{content.aboutLinkText || 'Mehr über den CVB erfahren'}</span>
                <span className="w-7 h-7 rounded-full bg-[#E4B53D] text-[#1C2405] flex items-center justify-center font-black group-hover:rotate-45 transition-transform duration-300 shadow-xs">
                  <ArrowUpRight size={14} strokeWidth={3} />
                </span>
              </a>
            </div>
          </div>

          {/* COLUMN 2 (Middle 3.5 Cols): 2 Stacked Rounded Stat Cards */}
          <div className="lg:col-span-3 flex flex-col gap-5 justify-between">

            {/* Top Card: Dark Forest Olive (Matching purple "12 Weeks" card) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[#1C2405] text-white rounded-[28px] p-6 sm:p-7 flex-1 flex flex-col justify-between overflow-hidden shadow-lg border border-[#A09048]/30 group min-h-[190px]"
            >
              {/* Subtle background clock/truck watermark */}
              <div className="absolute -bottom-4 -right-4 text-white/5 font-black pointer-events-none select-none">
                <Clock size={110} strokeWidth={1.5} />
              </div>

              <div>
                <div className="font-spartan font-black text-5xl sm:text-6xl text-white leading-none tracking-tight">
                  1.000+
                </div>
                <div className="font-spartan font-black text-xl text-white mt-1.5 uppercase tracking-wide">
                  Fahrzeuge
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#F4F2E6]/85 font-sans leading-relaxed relative z-10 mt-4">
                Betreute Wohnmobile & Caravans bundesweit im starken CVB-Verbund.
              </p>
            </motion.div>

            {/* Bottom Card: Warm Gold/Yellow (Matching yellow "10 Programs" card) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[#E4B53D] text-[#1C2405] rounded-[28px] p-6 sm:p-7 flex-1 flex flex-col justify-between overflow-hidden shadow-lg border border-[#A09048]/40 group min-h-[190px]"
            >
              {/* Subtle pin/shield watermark */}
              <div className="absolute -bottom-4 -right-4 text-black/8 font-black pointer-events-none select-none">
                <ShieldCheck size={110} strokeWidth={1.5} />
              </div>

              <div>
                <div className="font-spartan font-black text-5xl sm:text-6xl text-[#1C2405] leading-none tracking-tight">
                  0 %
                </div>
                <div className="font-spartan font-black text-xl text-[#1C2405] mt-1.5 uppercase tracking-wide">
                  Provision
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#1C2405]/85 font-sans font-medium leading-relaxed relative z-10 mt-4">
                Direktbuchungen ohne Portalabzüge. Faire Konditionen auf Augenhöhe.
              </p>
            </motion.div>

          </div>

          {/* COLUMN 3 (Right 4 Cols): Tall Photo Card with Top-Right Arrow Cutout & Bottom Quote Overlay */}
          <div className="lg:col-span-4">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="relative h-full min-h-[460px] sm:min-h-[500px] rounded-[32px] overflow-hidden shadow-xl border border-[#A09048]/30 flex flex-col justify-between group bg-[#1C2405]"
            >
              {/* Background Photo */}
              <img
                src={IMAGES.heroMotorhomeHandover}
                alt="Caravan Vermieter Bund Übergabe"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
              />

              {/* Top-Right Circular Arrow Button (Matching reference corner cutout button) */}
              <div className="relative z-20 flex justify-end p-5">
                <a
                  href={generalSettings.cvbWebsiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CVB Verbundseite öffnen"
                  className="w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#1C2405] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#E4B53D] transition-all border border-black/10 group-hover:rotate-45"
                >
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </a>
              </div>

              {/* Bottom Dark Gradient Overlay with Highlighter Text & Quote */}
              <div className="relative z-10 p-6 sm:p-8 mt-auto bg-gradient-to-t from-[#0C1201]/95 via-[#0C1201]/75 to-transparent pt-24 text-white">
                <h3 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none mb-1.5">
                  Einfach. Fair.
                </h3>

                <div className="mb-4">
                  <span className="bg-[#E4B53D] text-[#1C2405] font-spartan font-black text-lg sm:text-xl uppercase px-2.5 py-0.5 rounded-lg inline-block shadow-xs">
                    Auf Augenhöhe.
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/90 font-sans italic leading-relaxed mb-3">
                  „Unser Ziel ist es, unabhängigen Wohnmobil- und Caravan-Vermietern die besten Werkzeuge an die Hand zu geben – einfach, fair und ohne Hürden.“
                </p>

                <div className="text-[11px] font-mono font-bold text-[#E4B53D] tracking-wider uppercase">
                  — Detlef Scheer · Gründer CVB
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* BOTTOM ROW: Integrated Contact Bar (Matching "03 Contact our team" with Verbandssitz, Email & Copy) */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white rounded-[24px] p-5 sm:p-6 border border-[#A09048]/30 shadow-sm">
            {/* Verbandssitz info */}
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1C2405] text-[#E4B53D] flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold tracking-widest text-[#585828] uppercase">
                  VERBANDSSITZ & LEITUNG
                </div>
                <div className="font-spartan font-black text-sm text-[#1C2405]">
                  Caravan-Vermieter-Bund (CVB)
                </div>
                <div className="text-xs text-[#585828]">Detlef Scheer · Deutschland</div>
              </div>
            </div>

            {/* Email Contact with Copy */}
            <div className="md:col-span-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E4B53D] text-[#1C2405] flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono font-bold tracking-widest text-[#585828] uppercase">
                  PERSÖNLICHE BERATUNG
                </div>
                <a
                  href={`mailto:${generalSettings.contactEmail}`}
                  className="font-spartan font-black text-sm text-[#1C2405] hover:underline block truncate"
                >
                  {generalSettings.contactEmail}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F2E6] hover:bg-[#E4B53D] text-[#1C2405] font-spartan font-bold text-xs uppercase tracking-wider transition-colors border border-[#A09048]/30 cursor-pointer shadow-2xs shrink-0"
              >
                {copied ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                <span>{copied ? 'Kopiert' : 'Kopieren'}</span>
              </button>
            </div>

            {/* Direct CTA */}
            <div className="md:col-span-3 flex justify-start md:justify-end gap-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1C2405] hover:bg-[#384808] text-white font-spartan font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg w-full md:w-auto cursor-pointer"
              >
                <span>Jetzt anfragen</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
