'use client';

import React from 'react';
import { ShieldCheck, Server, Scale, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TrustBar: React.FC = () => {
  const trustItems = [
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

  return (
    <section aria-label="Sicherheits- und Vertrauensstandards" className="bg-[#2D3A06] text-white border-y border-[#A09048]/35 py-6 sm:py-8 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#384808] border border-[#A09048]/40 flex items-center justify-center shrink-0 text-[#A09048] group-hover:bg-[#A09048] group-hover:text-white transition-all shadow-sm">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-spartan font-black text-xs sm:text-sm uppercase tracking-wider text-white group-hover:text-[#F4F2E6] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#F4F2E6]/75 mt-0.5 leading-snug">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

