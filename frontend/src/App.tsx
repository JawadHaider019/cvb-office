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
import { BenefitsAudience } from './components/BenefitsAudience';
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

const MainLayout: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'impressum' | 'privacy';
  }>({
    isOpen: false,
    type: 'impressum',
  });

  if (currentView === 'admin') {
    return <AdminPanel />;
  }

  if (currentView === '404') {
    return (
      <NotFoundPage
        onBackToHome={() => {
          window.history.pushState({}, '', '/');
          setCurrentView('public');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#585828] font-sans antialiased selection:bg-[#A09048] selection:text-white">
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

        {/* Part 6 + 7: Benefits and Audience */}
        <BenefitsAudience />

        {/* Part 8: Price and Trial Box */}
        <PriceTrialBox />

        {/* Part 9: Sign-up Form */}
        <SignUpForm
          onOpenPrivacyModal={() => setLegalModal({ isOpen: true, type: 'privacy' })}
        />

        {/* Part 10: FAQ Accordion */}
        <FaqAccordion />

        {/* Part 11: About CVB */}
        <AboutCvb />
      </main>

      {/* Part 12: Footer */}
      <Footer
        onOpenImpressum={() => setLegalModal({ isOpen: true, type: 'impressum' })}
        onOpenPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
      />

      {/* Floating Conversion Bar (CRO for Vermieter) */}
      <FloatingConversionBar />

      {/* Legal Modals for Impressum & Datenschutz */}
      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
      />

      {/* Custom Architectural Cursor */}
      <CustomCursor />
    </div>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </MotionConfig>
  );
}
