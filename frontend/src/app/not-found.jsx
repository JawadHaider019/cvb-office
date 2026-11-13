'use client';
import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { CvbOfficeIcon } from '../components/CvbLogo';
export default function NotFound() {
    return (<div className="min-h-screen bg-[#F4F2E6] text-[#384808] flex flex-col justify-between p-6">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#384808] text-white flex items-center justify-center shadow-md">
            <CvbOfficeIcon size={24}/>
          </div>
          <span className="font-spartan font-black text-xl text-[#384808]">CVB-OFFICE</span>
        </div>
        <Link href="/" className="text-xs font-bold uppercase tracking-wider text-[#384808] hover:text-[#889028] flex items-center gap-2 cursor-pointer">
          <ArrowLeft size={16}/>
          <span>Zurück zur Übersicht</span>
        </Link>
      </header>

      <main className="max-w-xl w-full mx-auto text-center py-16 px-4">
        <div className="inline-block p-4 rounded-3xl bg-white border border-[#A09048]/30 shadow-md mb-6">
          <span className="font-spartan font-black text-6xl sm:text-7xl text-[#889028]">404</span>
        </div>

        <h1 className="font-spartan font-black text-3xl sm:text-4xl uppercase text-[#384808] mb-4">
          Seite nicht gefunden
        </h1>

        <p className="text-sm sm:text-base text-[#585828] leading-relaxed mb-8 max-w-md mx-auto">
          Die von Dir aufgerufene Seite existiert leider nicht oder wurde verschoben.
        </p>

        <div className="flex justify-center">
          <Link href="/" className="tech-cta-primary cursor-pointer justify-center">
            <Home size={16}/>
            <span>Zurück zur Startseite</span>
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs font-mono text-[#585828]/70 py-4">
        © {new Date().getFullYear()} Caravan-Vermieter-Bund (CVB)
      </footer>
    </div>);
}
