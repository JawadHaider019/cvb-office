'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ArrowUpRight, ShieldCheck, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
export const SignUpForm = ({ onOpenPrivacyModal, }) => {
    const { content, priceSettings, submitSignUpRequest, selectedVehicleCount } = useApp();
    const [email, setEmail] = useState('');
    const [vehicles, setVehicles] = useState(selectedVehicleCount || 1);
    const [contactName, setContactName] = useState('');
    const [phone, setPhone] = useState('');
    const [priceConsent, setPriceConsent] = useState(false);
    const [privacyConsent, setPrivacyConsent] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    // Success Toast state
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState(null);
    const formOpenedAt = useRef(Date.now());
    const successRef = useRef(null);
    // Auto-dismiss toast after 6.5 seconds
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 6500);
            return () => clearTimeout(timer);
        }
    }, [showToast]);
    useEffect(() => {
        formOpenedAt.current = Date.now();
    }, []);
    // Sync when user picks a vehicle count in the calculator above
    useEffect(() => {
        if (selectedVehicleCount && selectedVehicleCount > 0) {
            setVehicles(selectedVehicleCount);
        }
    }, [selectedVehicleCount]);
    const formattedMonthly = priceSettings.monthlyNet.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const formattedYearly = priceSettings.yearlyNet.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const vCountNumber = typeof vehicles === 'number' && vehicles > 0 ? vehicles : 1;
    const currentTotalMonthly = (vCountNumber * priceSettings.monthlyNet).toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const priceConsentLabel = `Ich bestätige, dass CVB-Office ${formattedMonthly} € netto pro Fahrzeug und Monat kostet (${formattedYearly} € netto pro Fahrzeug und Jahr) und dass dieser Betrag zusätzlich zur jährlichen CVB-Mitgliedsgebühr berechnet wird.`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        const trimmedEmail = email.trim();
        if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
            return;
        }
        const vCount = Number(vehicles);
        if (!vCount || vCount < 1 || vCount > 999) {
            setErrorMessage('Bitte gib die Anzahl Deiner Fahrzeuge an (Zahl ab 1).');
            return;
        }
        if (!priceConsent) {
            setErrorMessage('Bitte bestätige den Preis, damit wir Deine Anfrage bearbeiten können.');
            return;
        }
        if (!privacyConsent) {
            setErrorMessage('Bitte stimme der Datenschutzerklärung zu.');
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await submitSignUpRequest(trimmedEmail, vCount, priceConsent, privacyConsent, honeypot, formOpenedAt.current, contactName.trim() || undefined, phone.trim() || undefined);
            if (res.success) {
                setIsSuccess(true);
                setToastData({ email: trimmedEmail, vehicleCount: vCount });
                setShowToast(true);
                if (successRef.current) {
                    successRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }
            else {
                setErrorMessage(res.error ||
                    'Das hat leider nicht geklappt. Bitte versuche es später noch einmal oder schreib uns an info@caravan-vermieter-bund.de.');
            }
        }
        catch {
            setErrorMessage('Das hat leider nicht geklappt. Bitte versuche es später noch einmal oder schreib uns an info@caravan-vermieter-bund.de.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<>
      {/* Floating Success Toast Notification */}
      <AnimatePresence>
        {showToast && toastData && (<motion.div role="status" aria-live="polite" initial={{ opacity: 0, y: -30, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ type: 'spring', damping: 25, stiffness: 340 }} className="fixed top-20 sm:top-24 left-4 right-4 sm:left-auto sm:right-8 z-50 sm:max-w-md w-auto sm:w-full bg-[#2D3A06] text-white p-4 sm:p-5 border-2 border-[#A09048] shadow-[0_20px_60px_rgba(56,72,8,0.35)] rounded-2xl overflow-hidden">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#A09048] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md font-bold">
                <CheckCircle2 size={24}/>
              </div>

              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-spartan text-base font-black uppercase text-white tracking-wide">
                    ANFRAGE ERFOLGREICH!
                  </span>
                  <span className="text-[9px] font-mono tracking-widest uppercase bg-[#A09048]/20 text-[#A09048] px-2 py-0.5 rounded-full font-bold">
                    CVB-PORTAL
                  </span>
                </div>

                <p className="text-xs text-[#F4F2E6]/90 leading-relaxed">
                  Deine Anfrage für <strong className="text-white font-bold">{toastData.vehicleCount} Fahrzeug(e)</strong> ist eingegangen. Eine Bestätigung ist an <span className="underline decoration-[#A09048] font-bold text-white">{toastData.email}</span> unterwegs.
                </p>

                <div className="mt-2 text-[11px] font-mono text-[#F4F2E6] flex items-center gap-1.5 font-bold">
                  <ShieldCheck size={13} className="shrink-0 text-[#A09048]"/>
                  <span>Detlef Scheer prüft Deine Anfrage persönlich.</span>
                </div>
              </div>

              {/* Close Button */}
              <button onClick={() => setShowToast(false)} className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer" aria-label="Benachrichtigung schließen">
                <X size={16}/>
              </button>
            </div>

            {/* Animated countdown bar */}
            <motion.div initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 6.5, ease: 'linear' }} className="absolute bottom-0 left-0 h-[3px] bg-[#A09048]"/>
          </motion.div>)}
      </AnimatePresence>

      <section id="buchen" className="relative py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-[#283505] via-[#172002] to-[#080B01] text-white border-b border-[#A09048]/25 overflow-hidden">
        {/* Ambient radial lighting matching Footer */}
        <div className="absolute top-0 left-1/4 w-[650px] h-[450px] bg-[#A09048]/10 rounded-full blur-[160px] pointer-events-none"/>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-[#889028]/10 rounded-full blur-[150px] pointer-events-none"/>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-14">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
              {/* Section 1 (Left 5 cols): Editorial Headline, Trust Stack & Vermieter-Portal Info */}
              <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-7 lg:pr-4">
                <div>
                  <div className="tech-tag mb-4 sm:mb-5 bg-[#384808] border-[#A09048] text-white">
                    <span className="tech-tagn bg-[#A09048] text-white">✦</span>
                    <span className="font-spartan font-bold text-xs uppercase tracking-wider text-[#283505]">
                      JETZT STARTEN
                    </span>
                  </div>

                  <h2 className="font-spartan text-[30px] sm:text-5xl lg:text-[54px] font-black uppercase text-white leading-[1.04] sm:leading-[1.03] tracking-tight mb-4 sm:mb-5">
                    DEIN DIGITALES{' '}
                    <span className="text-[#A09048]">
                      OFFICE WARTET.
                    </span>
                  </h2>

                  <p className="text-sm sm:text-lg text-[#F4F2E6]/90 font-normal leading-relaxed mb-6 sm:mb-7 max-w-lg">
                    {content.formIntro}
                  </p>

                  {/* Conversion Trust Stack */}
                  <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base font-semibold text-white">
                    <div className="flex items-center gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                        <Check size={14} strokeWidth={3}/>
                      </div>
                      <span>14 Tage kostenlose Testphase</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                        <Check size={14} strokeWidth={3}/>
                      </div>
                      <span>Keine Einrichtungsgebühr</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                        <Check size={14} strokeWidth={3}/>
                      </div>
                      <span>Persönliche Betreuung durch das CVB-Team</span>
                    </div>
                  </div>
                </div>

                {/* Exclusive CVB Membership Notice Callout */}
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="bg-white/[0.08] backdrop-blur-md rounded-[22px] sm:rounded-[26px] border border-[#A09048]/45 p-5 sm:p-6 shadow-xl space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#A09048] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck size={17} strokeWidth={2.5}/>
                    </div>
                    <span className="font-spartan font-black text-xs uppercase tracking-wider text-[#F4F2E6]">
                      EXKLUSIV FÜR CVB-MITGLIEDER
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F4F2E6]/95 leading-relaxed">
                    CVB-Office gibt es exklusiv für CVB-Mitglieder. Noch kein Mitglied? CVB-Mitglied wirst Du schon ab 249 € netto pro Fahrzeug und Jahr.
                  </p>
                  <div>
                    <a href="https://caravan-vermieter-bund.de/mitglied-werden" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A09048] hover:bg-[#889028] text-white font-spartan font-bold text-xs uppercase tracking-wider transition-all shadow-md group">
                      <span>Jetzt Mitglied werden</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                    </a>
                  </div>
                </motion.div>

                {/* Integrated Brand & Contact Info Card */}
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="bg-white/[0.05] backdrop-blur-md rounded-[22px] sm:rounded-[26px] border border-[#A09048]/30 hover:border-[#A09048]/55 p-5 sm:p-7 shadow-xl space-y-4 sm:space-y-5 transition-colors">
                  <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
                    <img src="/images/cvb_office_logo.png" alt="CVB-Office Logo" className="w-11 h-11 object-contain drop-shadow-md rounded-xl shrink-0"/>
                    <div>
                      <div className="font-spartan text-xl sm:text-2xl font-black tracking-wider text-white uppercase leading-none">
                        CVB-OFFICE
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A09048] mt-1">
                        VERMIETER-PORTAL
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-[#F4F2E6]/90 leading-relaxed">
                    <div>
                      <span className="font-bold text-white/60 block uppercase tracking-wider text-[11px] mb-1">
                        Organisation
                      </span>
                      <span className="font-semibold text-white block">Caravan-Vermieter-Bund (CVB)</span>
                      <div className="text-[#F4F2E6]/80 mt-0.5">DS-Caravaning GmbH, Detlef Scheer</div>
                      <div className="text-[#F4F2E6]/60 text-xs">Niederkrüchten</div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-white/60 block uppercase tracking-wider text-[11px] mb-1">
                          E-Mail
                        </span>
                        <a href="mailto:info@cvb-office.de" className="text-[#A09048] hover:underline font-semibold break-all">
                          info@cvb-office.de
                        </a>
                      </div>
                      <div>
                        <span className="font-bold text-white/60 block uppercase tracking-wider text-[11px] mb-1">
                          Offizielle Plattform
                        </span>
                        <a href="https://cvb-office.de" target="_blank" rel="noopener noreferrer" className="text-[#A09048] hover:underline font-semibold">
                          cvb-office.de
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Section 2 (Right 7 cols): Elevated Light Form Panel */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: 0.1 }} className="lg:col-span-7 bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 text-[#384808] shadow-[0_25px_70px_rgba(0,0,0,0.45)] border border-[#A09048]/35 flex flex-col justify-center">
                {isSuccess ? (<motion.div ref={successRef} tabIndex={-1} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 flex flex-col items-start space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#384808] text-[#A09048] flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={30}/>
                    </div>
                    <h3 className="font-spartan text-2xl sm:text-3xl font-black uppercase text-[#384808]">
                      ANFRAGE ERFOLGREICH ÜBERMITTELT.
                    </h3>
                    <p className="text-sm text-[#585828] leading-relaxed">
                      {content.successMessage}
                    </p>
                    <div className="p-4 bg-[#F4F2E6] rounded-2xl text-xs font-mono text-[#585828] w-full border border-[#A09048]/30">
                      Bestätigung für: <strong className="text-[#384808]">{email}</strong> ({vehicles} Fahrzeuge)
                    </div>
                    <button onClick={() => {
                setIsSuccess(false);
                setEmail('');
                setVehicles(1);
                setContactName('');
                setPhone('');
                setPriceConsent(false);
                setPrivacyConsent(false);
                formOpenedAt.current = Date.now();
            }} className="mt-4 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#384808] border-2 border-[#384808] hover:bg-[#F4F2E6] transition-colors">
                      Weitere Anfrage senden
                    </button>
                  </motion.div>) : (<form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="company_nickname">Bitte leer lassen</label>
                      <input type="text" id="company_nickname" name="company_nickname" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off"/>
                    </div>

                    {/* Clean Architectural Order Summary Header */}
                    <div className="rounded-2xl bg-[#F4F2E6] border border-[#A09048]/35 overflow-hidden">
                      <div className="grid grid-cols-2 divide-x divide-[#A09048]/25 p-3.5 sm:p-5">
                        <div className="pr-3 sm:pr-4">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#585828] mb-1">
                            Gewählte Flotte
                          </div>
                          <div className="font-spartan text-base sm:text-xl font-black text-[#384808] leading-tight">
                            {vCountNumber} {vCountNumber === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
                          </div>
                        </div>

                        <div className="pl-3 sm:pl-4 text-right">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#585828] mb-1">
                            Mitgliedstarif
                          </div>
                          <div className="font-spartan text-base sm:text-xl font-black text-[#384808] leading-tight">
                            {currentTotalMonthly} €{' '}
                            <span className="block sm:inline text-[11px] sm:text-xs font-sans font-semibold text-[#585828]">netto / Mon.</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-3.5 sm:px-5 py-2.5 bg-[#EAE6D3]/70 border-t border-[#A09048]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-[#384808]">
                        <div className="flex items-center gap-2 font-medium">
                          <ShieldCheck size={14} className="text-[#889028] shrink-0"/>
                          <span>Exklusiv für CVB-Mitglieder (ab 249 € netto/Fzg./Jahr)</span>
                        </div>
                        <a href="https://caravan-vermieter-bund.de/mitglied-werden" target="_blank" rel="noopener noreferrer" className="font-bold text-[#384808] hover:text-[#889028] underline inline-flex items-center gap-1 shrink-0">
                          <span>Jetzt Mitglied werden</span>
                          <ArrowUpRight size={12}/>
                        </a>
                      </div>
                    </div>

                    {errorMessage && (<div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
                        <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5"/>
                        <span>{errorMessage}</span>
                      </div>)}

                    {/* Primary Required Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <div className="sm:col-span-8">
                        <label htmlFor="signup-email" className="block text-[11px] font-spartan font-bold uppercase tracking-wider text-[#384808] mb-1.5">
                          GESCHÄFTLICHE E-MAIL-ADRESSE <span className="text-red-600">*</span>
                        </label>
                        <input id="signup-email" type="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@deine-vermietung.de" className="w-full h-12 px-4 bg-[#F9F8F3] rounded-2xl border border-[#A09048]/35 text-[#384808] placeholder-stone-400 text-sm focus:bg-white focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15 transition-all" disabled={isSubmitting}/>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="signup-vehicles" className="block text-[11px] font-spartan font-bold uppercase tracking-wider text-[#384808] mb-1.5">
                          ANZAHL FAHRZEUGE <span className="text-red-600">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <input id="signup-vehicles" type="number" inputMode="numeric" min="1" max="999" required value={vehicles} onChange={(e) => {
                const val = e.target.value;
                setVehicles(val === '' ? '' : parseInt(val, 10));
            }} placeholder="z. B. 1" className="w-full h-12 px-4 bg-[#F9F8F3] rounded-2xl border border-[#A09048]/35 text-[#384808] text-sm focus:bg-white focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15 transition-all font-mono font-bold" disabled={isSubmitting}/>
                        </div>
                      </div>
                    </div>

                    {/* Optional Contact Fields (Identical Input Geometry for Clean Alignment) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="signup-name" className="block text-[11px] font-spartan font-bold uppercase tracking-wider text-[#585828] mb-1.5">
                          ANSPRECHPARTNER <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input id="signup-name" type="text" maxLength={100} value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="z. B. Max Mustermann" className="w-full h-12 px-4 bg-[#F9F8F3] rounded-2xl border border-[#A09048]/35 text-[#384808] placeholder-stone-400 text-sm focus:bg-white focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15 transition-all" disabled={isSubmitting}/>
                      </div>

                      <div>
                        <label htmlFor="signup-phone" className="block text-[11px] font-spartan font-bold uppercase tracking-wider text-[#585828] mb-1.5">
                          TELEFON FÜR RÜCKFRAGEN <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input id="signup-phone" type="tel" maxLength={50} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="z. B. 0170 1234567" className="w-full h-12 px-4 bg-[#F9F8F3] rounded-2xl border border-[#A09048]/35 text-[#384808] placeholder-stone-400 text-sm focus:bg-white focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/15 transition-all" disabled={isSubmitting}/>
                      </div>
                    </div>

                    {/* Grouped Consent Checkboxes */}
                    <div className="rounded-2xl bg-[#F9F8F3] border border-[#A09048]/25 p-4 space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer select-none group">
                        <input type="checkbox" required checked={priceConsent} onChange={(e) => setPriceConsent(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-stone-300 text-[#384808] accent-[#384808] cursor-pointer shrink-0" disabled={isSubmitting}/>
                        <span className="text-xs text-[#585828] group-hover:text-[#384808] leading-relaxed">
                          {priceConsentLabel} <span className="text-red-600 font-bold">*</span>
                        </span>
                      </label>

                      <div className="border-t border-[#A09048]/15 pt-3">
                        <label className="flex items-start gap-3 cursor-pointer select-none group">
                          <input type="checkbox" required checked={privacyConsent} onChange={(e) => setPrivacyConsent(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-stone-300 text-[#384808] accent-[#384808] cursor-pointer shrink-0" disabled={isSubmitting}/>
                          <span className="text-xs text-[#585828] group-hover:text-[#384808] leading-relaxed">
                            Ich habe die{' '}
                            <button type="button" onClick={(e) => {
                e.preventDefault();
                onOpenPrivacyModal();
            }} className="text-[#384808] font-bold underline hover:text-[#889028]">
                              Datenschutzerklärung
                            </button>{' '}
                            gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
                            gespeichert werden. <span className="text-red-600 font-bold">*</span>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Balanced Submit CTA */}
                    <div className="pt-1">
                      <button type="submit" disabled={isSubmitting} className="w-full min-h-[54px] sm:h-14 py-1.5 sm:py-0 px-2 pl-4 sm:pl-6 rounded-full bg-[#384808] hover:bg-[#242E05] text-white font-spartan font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between gap-2 shadow-[0_12px_28px_-6px_rgba(56,72,8,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-60 group">
                        <span className="w-10 hidden sm:block" aria-hidden="true"/>
                        <span className="flex items-center justify-center gap-2 mx-auto sm:mx-0 text-center">
                          {isSubmitting ? (<>
                              <Loader2 size={16} className="animate-spin text-white"/>
                              <span>Wird übermittelt...</span>
                            </>) : (<span>14 Tage kostenlos testen & anfragen</span>)}
                        </span>
                        <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A09048] group-hover:bg-[#889028] text-white flex items-center justify-center shrink-0 transition-all group-hover:-rotate-45 shadow-sm">
                          <ArrowRight size={16}/>
                        </span>
                      </button>
                    </div>
                  </form>)}
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>);
};
