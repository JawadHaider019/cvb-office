import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const Hero: React.FC = () => {
  const { content, generalSettings, priceSettings } = useApp();

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

  // Layer 3: Stat Tiles
  const statsX = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const statsY = useTransform(smoothY, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedMonthly = priceSettings.monthlyNet.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#FFFFFF] text-[#384808] pt-4 sm:pt-6 pb-12 sm:pb-16 select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 1. ATMOSPHERIC AMBIENT GLOWS */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] rounded-full bg-[#F4F2E6]/60 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] rounded-full bg-[#A09048]/10 blur-[110px] pointer-events-none z-0" />

      {/* 2. PROMINENT LUXURY HERO BACKGROUND PHOTO (Fully Visible, High-Res) */}
      <motion.div
        style={{ x: bgX, y: bgY, scale: 1.04 }}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform z-0 overflow-hidden"
      >
        <img
          src={content.heroImage || IMAGES.heroMotorhomeAlps}
          alt={content.heroImageAlt || "Modernes Reisemobil vor moderner Vermiet-Station"}
          className="w-full h-full object-cover object-[85%_center] lg:object-[80%_center]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Soft directional gradient: ensures text on left is 100% legible while camper on right is crystal-clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-30% to-white/20 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* 3. HERO CONTENT */}
      <div className="relative z-10 max-w-[1360px] w-full mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-8 sm:gap-10">
        {/* Top Status Pill - Frosted Glass */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(56,72,8,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] text-xs font-bold text-[#384808]">
            <span className="w-2 h-2 rounded-full bg-[#889028] animate-pulse" />
            <span>Offizielles Verbands-Office · {content.trustLine}</span>
          </div>
        </motion.div>

        {/* Editorial Content (Left side, unhindered, spacious) */}
        <motion.div
          style={{ x: contentX, y: contentY }}
          className="max-w-2xl lg:max-w-3xl will-change-transform"
        >
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-spartan font-black uppercase text-5xl sm:text-6xl lg:text-[76px] leading-[0.92] tracking-[-0.025em] mb-4 sm:mb-5 text-[#384808]"
          >
            <span className="block text-[#384808]">
              CVB-OFFICE<span className="text-[#A09048]">.</span>
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight mt-2 text-[#384808]">
              <span className="relative inline-block text-[#384808]">
                DEIN DIGITALES
                {/* Gold Hand-Drawn Swoosh Underline (#A09048) */}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3.5 overflow-visible pointer-events-none"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 17C90 5 250 3 394 12"
                    fill="none"
                    stroke="#A09048"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              <span className="text-[#889028]">VERMIET-OFFICE</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-[#585828] font-normal leading-relaxed mb-6 sm:mb-7 max-w-xl font-body"
          >
            {content.heroText}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection('buchen')}
              className="tech-cta-primary group animate-cta-pulse text-base"
            >
              <span>CVB-Office anfragen</span>
              <span className="tech-ci shadow-md">
                <ArrowRight size={17} />
              </span>
            </button>

            <a
              href={generalSettings.trialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-cta-ghost group"
            >
              <span>14 Tage kostenlos testen</span>
              <ArrowUpRight size={15} className="text-[#889028] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Mobile visible image banner */}
          <div className="md:hidden mt-6 mb-2 w-full h-56 rounded-2xl overflow-hidden border border-[#A09048]/35 shadow-md">
            <img
              src={content.heroImage || IMAGES.heroMotorhomeAlps}
              alt={content.heroImageAlt || "Modernes Reisemobil vor moderner Vermiet-Station"}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* 4. BOTTOM STAT TILES - ULTRA-GLASSY FROSTED LIQUID LOOK */}
        <motion.div
          style={{ x: statsX, y: statsY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 will-change-transform z-10 pt-2"
        >
          {/* Tile 1 */}
          <div className="p-5 rounded-2xl bg-white/45 backdrop-blur-2xl border border-white/75 border-t-white/95 hover:bg-white/65 hover:border-[#A09048]/60 transition-all duration-300 shadow-[0_8px_32px_0_rgba(56,72,8,0.06),inset_0_1px_2px_0_rgba(255,255,255,0.9)] hover:shadow-[0_12px_36px_0_rgba(56,72,8,0.12)] hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#889028]">
                VERBUND
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#889028] animate-pulse" />
            </div>
            <span className="font-spartan text-3xl sm:text-4xl font-black text-[#384808] block leading-none mb-1 group-hover:text-[#2D3A06] transition-colors">
              1.000+
            </span>
            <span className="text-xs font-bold text-[#585828] uppercase tracking-wider block">
              Fahrzeuge im Bund
            </span>
          </div>

          {/* Tile 2 */}
          <div className="p-5 rounded-2xl bg-white/45 backdrop-blur-2xl border border-white/75 border-t-white/95 hover:bg-white/65 hover:border-[#A09048]/60 transition-all duration-300 shadow-[0_8px_32px_0_rgba(56,72,8,0.06),inset_0_1px_2px_0_rgba(255,255,255,0.9)] hover:shadow-[0_12px_36px_0_rgba(56,72,8,0.12)] hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#A09048]">
                MITGLIEDER-TARIF
              </span>
              <span className="text-[9px] font-bold text-[#A09048] bg-[#A09048]/15 px-2 py-0.5 rounded-full">
                NETTO
              </span>
            </div>
            <span className="font-spartan text-3xl sm:text-4xl font-black text-[#889028] block leading-none mb-1 group-hover:text-[#70781D] transition-colors">
              ab {formattedMonthly} €
            </span>
            <span className="text-xs font-bold text-[#585828] uppercase tracking-wider block">
              Netto / Fahrzeug / Monat
            </span>
          </div>

          {/* Tile 3 */}
          <div className="p-5 rounded-2xl bg-white/45 backdrop-blur-2xl border border-white/75 border-t-white/95 hover:bg-white/65 hover:border-[#A09048]/60 transition-all duration-300 shadow-[0_8px_32px_0_rgba(56,72,8,0.06),inset_0_1px_2px_0_rgba(255,255,255,0.9)] hover:shadow-[0_12px_36px_0_rgba(56,72,8,0.12)] hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#384808]">
                EFFIZIENZ
              </span>
              <span className="text-[9px] font-bold text-[#384808] bg-[#384808]/10 px-2 py-0.5 rounded-full">
                QR & VIDEO
              </span>
            </div>
            <span className="font-spartan text-3xl sm:text-4xl font-black text-[#384808] block leading-none mb-1 group-hover:text-[#2D3A06] transition-colors">
              bis 50 %
            </span>
            <span className="text-xs font-bold text-[#585828] uppercase tracking-wider block">
              Zeitersparnis bei Übergabe
            </span>
          </div>

          {/* Tile 4 */}
          <div className="p-5 rounded-2xl bg-white/45 backdrop-blur-2xl border border-white/75 border-t-white/95 hover:bg-white/65 hover:border-[#A09048]/60 transition-all duration-300 shadow-[0_8px_32px_0_rgba(56,72,8,0.06),inset_0_1px_2px_0_rgba(255,255,255,0.9)] hover:shadow-[0_12px_36px_0_rgba(56,72,8,0.12)] hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-emerald-800">
                SICHERHEIT
              </span>
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-700/10 px-2 py-0.5 rounded-full">
                GERMANY
              </span>
            </div>
            <span className="font-spartan text-3xl sm:text-4xl font-black text-[#384808] block leading-none mb-1 group-hover:text-[#2D3A06] transition-colors">
              100 %
            </span>
            <span className="text-xs font-bold text-[#585828] uppercase tracking-wider block">
              DSGVO in Deutschland
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
