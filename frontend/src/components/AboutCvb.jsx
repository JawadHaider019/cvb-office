'use client';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Mail, Copy, Check, ArrowRight, ArrowUpRight, Truck, Scale, Users, ShieldCheck, } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'motion/react';
export const AboutCvb = () => {
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
    return (<section id="ueber-cvb" className="relative py-12 sm:py-14 lg:py-16 bg-[#f2f2e8] text-[#384808] border-b border-[#A09048]/25 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-[#F4F2E6] rounded-full blur-[140px] pointer-events-none"/>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-6 sm:mb-12 lg:mb-16">
            <div className="tech-tag mb-2 sm:mb-4">
              <span className="tech-tagn">✦</span>
              <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#384808]">
                ÜBER DAS CVB-NETZWERK
              </span>
            </div>


          </div>
        </ScrollReveal>

        {/* Master Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-5 lg:gap-8 items-stretch">

          {/* LEFT SIDE (5 Columns): Narrative, Feature Pills & Action Button */}
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55 }} className="lg:col-span-5 flex flex-col justify-between space-y-4 lg:space-y-2">

            <h2 className="font-spartan text-[26px] sm:text-4xl lg:text-5xl font-black uppercase text-[#384808] leading-[1.06] sm:leading-[1.02] tracking-tight ">
              MIT WEITSICHT GEGRÜNDET. {" "}
              <span className="text-[#889028]">
                FÜR VERMIETER GEBAUT<span className="text-[#A09048]">.</span>
              </span>
            </h2>
            {/* Explanatory Paragraph */}
            <p className="text-sm sm:text-lg text-[#585828] font-normal leading-relaxed font-body">
              Der Caravan-Vermieter-Bund (CVB) stärkt unabhängige Vermieter mit Praxiswissen, Spezialversicherungen und einem starken Netzwerk von über 1.000 betreuten Fahrzeugen in ganz Deutschland.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fff] border border-[#A09048]/30 text-xs font-spartan font-bold text-[#384808]">
                <Truck size={14} className="text-[#889028]"/>
                <span>1.000+ Fahrzeuge</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fff] border border-[#A09048]/30 text-xs font-spartan font-bold text-[#384808]">
                <Scale size={14} className="text-[#889028]"/>
                <span>BGB-Musterverträge</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fff] border border-[#A09048]/30 text-xs font-spartan font-bold text-[#384808]">
                <Users size={14} className="text-[#889028]"/>
                <span>Starkes Netzwerk</span>
              </div>

            </div>

            <div>
              <a href={generalSettings.cvbWebsiteLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mb-4 gap-3 px-6 py-3.5 rounded-full bg-[#242E05] hover:bg-[#384808] text-white font-spartan font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
                <span>{content.aboutLinkText || 'Mehr über den CVB erfahren'}</span>
                <span className="w-6 h-6 rounded-full bg-[#A09048] text-[#242E05] flex items-center justify-center font-black group-hover:rotate-45 transition-transform duration-300 shadow-sm">
                  <ArrowUpRight size={13} strokeWidth={3}/>
                </span>
              </a>
            </div>

          </motion.div>

          {/* RIGHT SIDE (7 Columns): 2 Top Bento Cards + 1 Bottom Wide Banner Card (Compact, unified gap) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">

            {/* TOP ROW: 2 Cards Side-by-Side (Dark Navy/Olive Card + Warm Gold Card) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              {/* Card 1: Unternehmenssitz & Leitung */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} whileHover={{ y: -3 }} transition={{ duration: 0.45, delay: 0.08 }} className="relative bg-[#242E05] text-white rounded-[22px] sm:rounded-[26px] p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-lg border border-[#A09048]/35 group min-h-[150px] sm:min-h-[170px]">
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#A09048]/15 rounded-full blur-2xl pointer-events-none"/>

                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#A09048]">
                      <MapPin size={15}/>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#F4F2E6]/75 uppercase">
                      UNTERNEHMENSSITZ & LEITUNG
                    </span>
                  </div>

                  <h3 className="font-spartan font-black text-lg sm:text-xl text-white uppercase tracking-tight leading-snug">
                    Caravan-Vermieter-Bund (CVB)
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs text-[#F4F2E6]/85 font-mono mt-3 pt-2.5 border-t border-white/10">
                  <span>DS-Caravaning GmbH, Detlef Scheer · Niederkrüchten</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A09048] animate-pulse shrink-0 ml-2"/>
                </div>
              </motion.div>

              {/* Card 2: E-Mail & Persönliche Beratung */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} whileHover={{ y: -3 }} transition={{ duration: 0.45, delay: 0.14 }} className="relative bg-[#A09048] text-[#242E05] rounded-[22px] sm:rounded-[26px] p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-lg border border-[#889028]/35 group min-h-[150px] sm:min-h-[170px]">
                {/* Watermark @ Graphic */}
                <div className="absolute -top-6 -right-6 text-black/10 font-spartan font-black text-9xl pointer-events-none select-none">
                  @
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#242E05] text-white flex items-center justify-center">
                      <Mail size={15}/>
                    </div>
                    <span className="text-[10px] font-mono font-black tracking-widest text-[#242E05]/85 uppercase">
                      PERSÖNLICHE BERATUNG
                    </span>
                  </div>

                  <a href={`mailto:${generalSettings.contactEmail}`} className="font-spartan font-black text-sm sm:text-base text-[#242E05] hover:underline break-all block leading-tight mb-2">
                    {generalSettings.contactEmail}
                  </a>
                </div>

                {/* 2 Action Buttons (Exact Match to "Send an e-mail →" and "Copy") */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-[#242E05]/15">
                  <a href={`mailto:${generalSettings.contactEmail}`} className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#242E05] text-white font-spartan font-bold text-xs uppercase tracking-wider hover:bg-[#384808] transition-colors shadow-xs">
                    <span>E-Mail senden</span>
                    <ArrowRight size={11}/>
                  </a>

                  <button type="button" onClick={handleCopyEmail} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white text-[#242E05] font-spartan font-bold text-xs uppercase tracking-wider transition-colors border border-[#242E05]/20 cursor-pointer shadow-2xs">
                    {copied ? <Check size={12} className="text-emerald-700"/> : <Copy size={12}/>}
                    <span>{copied ? 'Kopiert' : 'Kopieren'}</span>
                  </button>
                </div>
              </motion.div>

            </div>

            {/* BOTTOM ROW: Wide Banner Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} whileHover={{ y: -3 }} transition={{ duration: 0.45, delay: 0.18 }} className="relative bg-[#384808] text-white rounded-[22px] sm:rounded-[26px] p-5 sm:p-7 overflow-hidden shadow-xl border border-[#A09048]/40">
              {/* Subtle background glow */}
              <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#A09048]/15 rounded-full blur-3xl pointer-events-none"/>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#A09048] shrink-0">
                  <ShieldCheck size={20}/>
                </div>
                <h3 className="font-spartan font-black text-lg sm:text-2xl text-white uppercase tracking-tight">
                  Offizielles Vermieter-Office
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#F4F2E6]/90 font-normal leading-relaxed mb-5 sm:mb-6 max-w-xl font-sans">
                Gemeinsam stark im Netzwerk – wir geben unabhängigen Wohnmobil- und Caravan-Vermietern die besten Werkzeuge an die Hand. 100 % DSGVO-konform, faire Konditionen und 0 % Buchungsprovision.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {/* Primary Button: "Mehr über den CVB erfahren →" */}
                <a href={generalSettings.cvbWebsiteLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white text-[#384808] hover:bg-[#F4F2E6] font-spartan font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group">
                  <span>{content.aboutLinkText || 'Mehr über den CVB erfahren'}</span>
                  <ArrowUpRight size={14} className="text-[#889028] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                </a>

                {/* Secondary Ghost Button: "14 Tage testen" */}
                <a href={generalSettings.trialLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-full bg-transparent hover:bg-white/10 border border-white/35 text-white font-spartan font-bold text-xs uppercase tracking-wider transition-colors">
                  <span>14 Tage testen</span>
                </a>

                {/* Tertiary Ghost Button: "CVB-Office anfragen" */}
                <button type="button" onClick={scrollToForm} className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-full bg-transparent hover:bg-white/10 border border-white/35 text-white font-spartan font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                  <span>Jetzt anfragen</span>
                  <ArrowRight size={12}/>
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>);
};
