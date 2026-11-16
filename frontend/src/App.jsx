'use client';
import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { Features } from './components/Features';
import { BuildingBlocks } from './components/BuildingBlocks';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Audience } from './components/Audience';
import { PriceTrialBox } from './components/PriceTrialBox';
import { SignUpForm } from './components/SignUpForm';
import { FaqAccordion } from './components/FaqAccordion';
import { AboutCvb } from './components/AboutCvb';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModals';
import { AdminPanel } from './components/AdminPanel';
import { NotFoundPage } from './components/NotFoundPage';
import { FloatingConversionBar } from './components/FloatingConversionBar';
import { CustomCursor } from './components/CustomCursor';
import { ArrowLeft } from 'lucide-react';
const MainLayout = () => {
    const { currentView, setCurrentView, isAdminLoggedIn } = useApp();
    const [legalModal, setLegalModal] = useState({
        isOpen: false,
        type: 'impressum',
    });
    if (currentView === 'admin') {
        return <AdminPanel />;
    }
    if (currentView === '404') {
        return (<NotFoundPage onBackToHome={() => {
                window.history.pushState({}, '', '/');
                setCurrentView('public');
            }}/>);
    }
    return (<div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#585828] font-sans antialiased selection:bg-[#A09048] selection:text-white">
      {/* Part 0: Sticky Header */}
      <Header />

      <main className="flex-1">
        {/* Part 1: Hero */}
        <Hero />

        {/* Part 2: Problem and Solution */}
        <ProblemSolution />

        {/* Part 3: Features */}
        <Features />

        {/* Part 4: Two Building Blocks */}
        <BuildingBlocks />

        {/* Part 5: How It Works */}
        <HowItWorks />

        {/* Part 6: Benefits */}
        <Benefits />

        {/* Part 7: Audience & Testimonials */}
        <Audience />

        {/* Part 8: Price and Trial Box */}
        <PriceTrialBox />

        {/* Part 9: Sign-up Form */}
        <SignUpForm onOpenPrivacyModal={() => setLegalModal({ isOpen: true, type: 'privacy' })}/>

        {/* Part 10: FAQ Accordion */}
        <FaqAccordion />

        {/* Part 11: About CVB */}
        <AboutCvb />
      </main>

      {/* Part 12: Footer */}
      <Footer onOpenImpressum={() => setLegalModal({ isOpen: true, type: 'impressum' })} onOpenPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}/>

      {/* Floating Conversion Bar (CRO for Vermieter) */}
      <FloatingConversionBar />

      {/* Back to Admin Center Floating Pill when logged-in admin previews homepage */}
      {isAdminLoggedIn && (
        <button
          type="button"
          onClick={() => setCurrentView('admin')}
          className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#242E05] hover:bg-[#384808] text-white border-2 border-[#A09048] shadow-2xl font-spartan font-black text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
        >
          <ArrowLeft size={14} className="text-[#A09048]" />
          <span>ZURÜCK ZUM ADMIN-CENTER</span>
        </button>
      )}

      {/* Legal Modals for Impressum & Datenschutz */}
      <LegalModal isOpen={legalModal.isOpen} type={legalModal.type} onClose={() => setLegalModal({ ...legalModal, isOpen: false })}/>

      {/* Custom Architectural Cursor */}
      <CustomCursor />
    </div>);
};
export default function App() {
    return (<MotionConfig reducedMotion="user">
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </MotionConfig>);
}
