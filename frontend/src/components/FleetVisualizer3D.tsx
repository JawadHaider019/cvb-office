import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  QrCode,
  Laptop,
  CheckCircle2,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { motion } from 'motion/react';

interface FeatureHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof QrCode;
  tag: string;
}

const HIGHLIGHTS: FeatureHighlight[] = [
  {
    id: 'qr-entry',
    title: 'Digitale Vorab-Einweisung',
    subtitle: 'Wohnmobil-Eingangstür // QR-Code',
    description:
      'Der Mieter scannt den QR-Code am Fahrzeug und schaut vorab kurze 2-Minuten Erklärvideos (Wasser, Strom, Heizung). Spart Dir 45 Minuten Vor-Ort-Erklärung.',
    icon: QrCode,
    tag: 'BAUSTEIN A',
  },
  {
    id: 'cockpit-cloud',
    title: 'CVB-Office Cockpit',
    subtitle: 'Armaturenbrett // Live-Synchronisation',
    description:
      'Zentrales Management für Mietverträge, Belegungskalender und Mieterdaten in Kooperation mit Smarlps Go!. Vollautomatisiert auf Smartphone und Desktop.',
    icon: Laptop,
    tag: 'BAUSTEIN B',
  },
  {
    id: 'solar-fleet',
    title: 'Autarkie & Solartelemetrie',
    subtitle: 'Dachaufbau // Flotten-Status',
    description:
      'Erfasse Fahrzeugzustand, Zubehör und Ausstattungsmerkmale digital im Flottenprofil. Mieter sehen genaue Spezifikationen direkt bei der Buchung.',
    icon: Sparkles,
    tag: 'FLOTTEN-STATUS',
  },
  {
    id: 'security-deposit',
    title: 'Kautions- & Schadens-Scan',
    subtitle: 'Heckbereich // Digitale Protokollierung',
    description:
      'Digitale Übergabe- und Rücknahmeprotokolle mit Fotodokumentation von Alt- und Neuschäden per Tablet. Klare Kautionsverwaltung ohne Streitigkeiten.',
    icon: Shield,
    tag: 'SICHERHEIT',
  },
];

export const FleetVisualizer3D: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  return (
    <section id="flotte-3d" className="py-20 lg:py-28 bg-[#242E05] text-white border-b border-[#A09048]/25 relative overflow-hidden select-none">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-[#889028]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#A09048]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="tech-tag mb-3 bg-[#2D3A06] border-white/20 text-white">
                <span className="tech-tagn bg-[#A09048] text-white">✦</span>
                <span className="font-spartan font-bold text-xs uppercase tracking-wider text-white">
                  DIGITALER FLOTTEN-ZWILLING
                </span>
              </div>

              <h2 className="font-spartan font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[0.98] uppercase tracking-tight text-white max-w-2xl">
                Dein Vermiet-Office als 3D-Zwilling<span className="text-[#A09048]">.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#F4F2E6]/90 max-w-md font-normal leading-relaxed font-body">
              Erlebe, wie CVB-Office und die digitale Einweisung nahtlos mit jedem Fahrzeug Deiner Flotte verschmelzen. Volle Transparenz über Ausstattung, Übergaben und Zustand.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Feature Bento Cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((spot) => {
            const Icon = spot.icon;
            const isSelected = activeHighlight === spot.id;
            return (
              <StaggerItem key={spot.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActiveHighlight(isSelected ? null : spot.id)}
                  className={`p-7 rounded-[26px] bg-[#2D3A06] border transition-all cursor-pointer group shadow-lg flex flex-col justify-between h-full ${
                    isSelected
                      ? 'border-[#A09048] shadow-[0_20px_45px_-15px_rgba(160,144,72,0.35)]'
                      : 'border-[#A09048]/25 hover:border-[#A09048]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#384808] text-[#A09048] group-hover:bg-[#A09048] group-hover:text-white transition-colors flex items-center justify-center shrink-0 border border-white/10 shadow-sm">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-spartan font-extrabold tracking-widest uppercase text-[#C5CF77] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                        {spot.tag}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-[#C5CF77] mb-2">
                      {spot.subtitle}
                    </div>

                    <h4 className="font-spartan font-bold text-xl text-white mb-3 group-hover:text-[#C5CF77] transition-colors">
                      {spot.title}
                    </h4>

                    <p className="text-xs text-[#F4F2E6]/85 leading-relaxed font-body">
                      {spot.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-spartan font-bold text-[#A09048]">
                    <span className="flex items-center gap-1.5 text-[#C5CF77]">
                      <CheckCircle2 size={14} className="text-[#A09048]" />
                      <span>Inklusive in CVB-Office</span>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
