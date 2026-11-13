'use client';
import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ArrowUpRight, Server, ShieldCheck, Scale, Award, Check } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
const heroTrustItems = [
    {
        icon: Server,
        title: 'Serverstandort Deutschland',
        subtitle: 'Hosting in Frankfurt am Main · Höchste Ausfallsicherheit',
    },
    {
        icon: ShieldCheck,
        title: '100 % DSGVO-konform',
        subtitle: 'Keine Datenweitergabe · Verschlüsselte Übertragung',
    },
    {
        icon: Scale,
        title: 'Rechtssichere BGB-Muster',
        subtitle: 'Speziell für Reisemobil- & Caravan-Vermietung',
    },
    {
        icon: Award,
        title: 'Offizieller CVB-Standard',
        subtitle: 'Entwickelt von Vermietern für Vermieter',
    },
];
export const Hero = () => {
    const { content, generalSettings } = useApp();
    // Mouse-move 3D Parallax Values (Normalized -0.5 to 0.5)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    // Smooth physical spring kinematics with damping
    const springConfig = { damping: 28, stiffness: 130, mass: 0.55 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);
    // Layer 1: Background Image subtle parallax
    const bgX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
    const bgY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
    // Layer 2: Editorial Content
    const contentX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
    const contentY = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);
    const handleMouseMove = (e) => {
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };
    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (<section id="top" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative min-h-[77vh] lg:min-h-[88vh] flex flex-col justify-between overflow-hidden bg-[#FFFFFF] text-[#384808] pt-3 sm:pt-6 select-none" style={{ perspective: '1200px' }}>
      {/* 1. ATMOSPHERIC AMBIENT GLOW (Left edge only, keeping right camper image crisp) */}
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] rounded-full bg-[#A09048]/10 blur-[110px] pointer-events-none z-0"/>

      {/* 2. PROMINENT LUXURY HERO BACKGROUND PHOTO (Always in Background across Mobile & Desktop) */}
      <motion.div style={{ x: bgX, y: bgY, scale: 1.04 }} className="absolute inset-0 w-full h-full pointer-events-none will-change-transform z-0 overflow-hidden">
        <img src={content.heroImage || IMAGES.heroMotorhomeAlps} alt={content.heroImageAlt || "Modernes Reisemobil vor moderner Vermiet-Station"} className="w-full h-full object-cover object-[68%_center] md:object-[80%_center] lg:object-[75%_center]" loading="eager" referrerPolicy="no-referrer"/>
        {/* Readable fade for mobile/tablet text while keeping desktop right-side photo crystal-clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 via-60% to-white/25 md:bg-gradient-to-r md:from-white md:via-white/88 md:via-55% md:to-white/35 lg:via-white/85 lg:via-45% lg:to-white/15 xl:via-white/80 xl:via-30% xl:to-transparent pointer-events-none"/>
      </motion.div>

      {/* 3. HERO CONTENT */}
      <div className="relative z-10 max-w-[1360px] w-full mx-auto px-4 sm:px-10 lg:px-12 flex-1 flex flex-col justify-between py-5 sm:py-6 lg:py-8">
        {/* Top Status Pill - Frosted Glass */}


        {/* Editorial Content (Left side, unhindered, spacious) */}
        <motion.div style={{ x: contentX, y: contentY }} className="max-w-4xl lg:max-w-5xl my-auto py-2 sm:py-4 lg:py-6 will-change-transform">
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-3 mb-4 rounded-full bg-white/75 md:bg-white/60 backdrop-blur-xl border border-[#A09048]/25 md:border-white/80 shadow-[0_4px_20px_rgba(56,72,8,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] text-[11px] sm:text-xs font-bold text-[#384808] max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#889028] animate-pulse shrink-0"/>
            <span className="leading-snug">Offizielles Vermieter-Office · {content.trustLine}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="font-spartan font-black uppercase text-[42px] sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.94] sm:leading-[0.92] tracking-[-0.025em] mb-5 sm:mb-6 text-[#384808]">
            <span className="block text-[#384808]">
              CVB-OFFICE<span className="text-[#A09048]">.</span>
            </span>
            <span className="block text-[26px] sm:text-4xl lg:text-[44px] xl:text-6xl font-bold tracking-tight mt-2 text-[#384808] leading-[1.08] sm:leading-[1.02]">
              <span className="relative inline-block text-[#A09048]">
                DEIN DIGITALES
                {/* Gold Hand-Drawn Swoosh Underline (#A09048) */}
                <svg className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-2.5 sm:h-3.5 overflow-visible pointer-events-none" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M6 17C90 5 250 3 394 12" fill="none" stroke="#384808" strokeWidth="7" strokeLinecap="round"/>
                </svg>
              </span>{' '}
              <span className="text-[#384808] block sm:inline mt-2.5 sm:mt-0">VERMIET-OFFICE</span>
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mb-4 max-w-2xl">
            <p className="text-sm sm:text-lg text-[#585828] font-normal leading-relaxed font-body">
              {content.heroText}{' '}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.38 }} className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-[#384808] mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#384808] text-white flex items-center justify-center shrink-0">
                <Check size={10} strokeWidth={3}/>
              </span>
              <span>Website-Buchungswidget</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#384808] text-white flex items-center justify-center shrink-0">
                <Check size={10} strokeWidth={3}/>
              </span>
              <span>Digitale Verträge als PDF</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#384808] text-white flex items-center justify-center shrink-0">
                <Check size={10} strokeWidth={3}/>
              </span>
              <span>Vorab-Einweisung per QR & Video</span>
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <button onClick={() => scrollToSection('buchen')} className="tech-cta-primary group animate-cta-pulse text-sm sm:text-base w-full sm:w-auto justify-between sm:justify-start">
              <span>CVB-Office anfragen</span>
              <span className="tech-ci shadow-md">
                <ArrowRight size={17}/>
              </span>
            </button>

            <a href={generalSettings.trialLink} target="_blank" rel="noopener noreferrer" className="tech-cta-ghost group w-full sm:w-auto justify-center">
              <span>14 Tage kostenlos testen</span>
              <ArrowUpRight size={15} className="text-[#889028] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. SOLID 4-COLUMN TRUST BAR (Calm, perfectly balanced across desktop and mobile, no edge cutoff) */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} aria-label="Sicherheits- und Vertrauensstandards" className="relative z-10 w-full bg-gradient-to-r from-[#283505]/95 via-[#1B2403]/95 to-[#0D1201]/95 backdrop-blur-md text-white border-t border-[#A09048]/35 py-4 sm:py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center">
            {heroTrustItems.map((item, idx) => {
            const Icon = item.icon;
            return (<div key={idx} className="flex items-center gap-3 sm:gap-3.5 group">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#384808] border border-[#A09048]/40 flex items-center justify-center shrink-0 text-[#A09048] group-hover:bg-[#889028] group-hover:text-white transition-colors shadow-sm">
                    <Icon size={19} strokeWidth={2.2}/>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-spartan font-black text-xs sm:text-[13px] uppercase tracking-wider text-white group-hover:text-[#F4F2E6] transition-colors leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#F4F2E6]/75 mt-0.5 leading-snug">
                      {item.subtitle}
                    </span>
                  </div>
                </div>);
        })}
          </div>
        </div>
      </motion.div>
    </section>);
};
