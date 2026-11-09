import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, Sparkles, Check, X } from 'lucide-react';
import { CvbOfficeIcon } from './CvbLogo';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

export const SignUpForm: React.FC<{ onOpenPrivacyModal: () => void }> = ({
  onOpenPrivacyModal,
}) => {
  const { content, priceSettings, generalSettings, submitSignUpRequest, selectedVehicleCount } = useApp();

  const [email, setEmail] = useState('');
  const [vehicles, setVehicles] = useState<number | ''>(selectedVehicleCount || 1);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [priceConsent, setPriceConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Success Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<{ email: string; vehicleCount: number } | null>(null);

  const formOpenedAt = useRef<number>(Date.now());
  const successRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
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
      const res = await submitSignUpRequest(
        trimmedEmail,
        vCount,
        priceConsent,
        privacyConsent,
        honeypot,
        formOpenedAt.current,
        contactName.trim() || undefined,
        phone.trim() || undefined
      );

      if (res.success) {
        setIsSuccess(true);
        setToastData({ email: trimmedEmail, vehicleCount: vCount });
        setShowToast(true);
        if (successRef.current) {
          successRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setErrorMessage(
          res.error ||
            'Das hat leider nicht geklappt. Bitte versuche es später noch einmal oder schreib uns an info@caravan-vermieter-bund.de.'
        );
      }
    } catch {
      setErrorMessage(
        'Das hat leider nicht geklappt. Bitte versuche es später noch einmal oder schreib uns an info@caravan-vermieter-bund.de.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Success Toast Notification (Tech Destination Solar Yellow & Midnight) */}
      <AnimatePresence>
        {showToast && toastData && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 340 }}
            className="fixed top-24 right-4 sm:right-8 z-50 max-w-md w-full bg-[#2D3A06] text-white p-5 border-2 border-[#A09048] shadow-[0_20px_60px_rgba(56,72,8,0.35)] rounded-2xl overflow-hidden"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#A09048] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md font-bold">
                <CheckCircle2 size={24} />
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
                  Deine Anfrage für <strong className="text-white font-bold">{toastData.vehicleCount} Fahrzeug(e)</strong> ist eingegangen. Eine Bestätigung ist an <span className="underline decoration-[#A09048] font-bold text-[#C5CF77]">{toastData.email}</span> unterwegs.
                </p>

                <div className="mt-2 text-[11px] font-mono text-[#C5CF77] flex items-center gap-1.5 font-bold">
                  <ShieldCheck size={13} className="shrink-0 text-[#A09048]" />
                  <span>Detlef Scheer prüft Deine Anfrage persönlich.</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowToast(false)}
                className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
                aria-label="Benachrichtigung schließen"
              >
                <X size={16} />
              </button>
            </div>

            {/* Animated countdown bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 6.5, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-[3px] bg-[#A09048]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section id="buchen" className="relative py-24 lg:py-32 bg-[#283405] text-white border-b border-[#A09048]/25 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-[#889028]/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Zone 1 (Left 4 cols): Editorial Headline & Conversion Points */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full lg:pr-6">
                <div>
                  <div className="tech-tag mb-4 bg-[#384808] border-[#A09048]/30 text-white">
                    <span className="tech-tagn bg-[#A09048] text-white">✦</span>
                    <span className="font-spartan font-bold text-xs uppercase tracking-wider text-white">
                      JETZT STARTEN
                    </span>
                  </div>

                  <h2 className="font-spartan text-3xl sm:text-5xl lg:text-5xl font-black uppercase text-white leading-[1.04] tracking-tight mb-6">
                    DEIN DIGITALES<br />
                    <span className="text-[#A09048]">
                      OFFICE WARTET.
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base text-[#F4F2E6]/90 font-normal leading-relaxed mb-8">
                    {content.formIntro}
                  </p>

                  {/* Conversion Trust Stack */}
                  <div className="space-y-3.5 mb-8 text-xs font-semibold text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>14 Tage kostenlose Testphase</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>Keine Einrichtungsgebühr</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#A09048] text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>Persönliche Betreuung durch den Bund</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 text-xs text-[#C5CF77]/70 font-mono">
                  ANFRAGE // VERBUND-KONDITIONEN
                </div>
              </div>

              {/* Zone 2 (Center 5 cols): Light Tech Destination Form Panel */}
              <div className="lg:col-span-5 bg-white rounded-[32px] p-8 sm:p-10 text-[#384808] shadow-2xl border border-[#A09048]/30">
                {isSuccess ? (
                  <motion.div
                    ref={successRef}
                    tabIndex={-1}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 flex flex-col items-start space-y-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#384808] text-[#A09048] flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={30} />
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
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setEmail('');
                        setVehicles(1);
                        setContactName('');
                        setPhone('');
                        setPriceConsent(false);
                        setPrivacyConsent(false);
                        formOpenedAt.current = Date.now();
                      }}
                      className="mt-4 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#384808] border-2 border-[#384808] hover:bg-[#F4F2E6] transition-colors"
                    >
                      Weitere Anfrage senden
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="company_nickname">Bitte leer lassen</label>
                      <input
                        type="text"
                        id="company_nickname"
                        name="company_nickname"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* German CRO Order Summary Pill (Transparenz vor Eingabe) */}
                    <div className="p-4 bg-[#F4F2E6] border border-[#A09048]/35 rounded-2xl">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[#585828] uppercase font-bold">Gewählte Flotte:</span>
                        <span className="text-[#384808] font-black">{vCountNumber} {vCountNumber === 1 ? 'Fahrzeug' : 'Fahrzeuge'}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#585828] uppercase font-bold">Verbundtarif:</span>
                        <span className="text-[#889028] font-black text-sm">{currentTotalMonthly} € netto / Monat</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#A09048]/20 flex items-center gap-1.5 text-[11px] text-[#384808] font-medium">
                        <ShieldCheck size={13} className="text-[#889028] shrink-0" />
                        <span>14 Tage unverbindliche Testphase · Keine Zahlung heute</span>
                      </div>
                    </div>

                    {errorMessage && (
                      <div
                        role="alert"
                        className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in"
                      >
                        <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="signup-email"
                        className="block text-[11px] font-bold uppercase tracking-wider text-[#384808] mb-1.5"
                      >
                        GESCHÄFTLICHE E-MAIL-ADRESSE <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        required
                        maxLength={254}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@deine-vermietung.de"
                        className="w-full px-4 py-3 bg-[#F4F2E6] rounded-2xl border border-[#A09048]/30 text-[#384808] placeholder-stone-400 text-sm focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/20 transition-all"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Vehicles Field */}
                    <div>
                      <label
                        htmlFor="signup-vehicles"
                        className="block text-[11px] font-bold uppercase tracking-wider text-[#384808] mb-1.5"
                      >
                        ANZAHL FAHRZEUGE <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="signup-vehicles"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        max="999"
                        required
                        value={vehicles}
                        onChange={(e) => {
                          const val = e.target.value;
                          setVehicles(val === '' ? '' : parseInt(val, 10));
                        }}
                        placeholder="z. B. 4"
                        className="w-full px-4 py-3 bg-[#F4F2E6] rounded-2xl border border-[#A09048]/30 text-[#384808] text-sm focus:outline-none focus:border-[#384808] focus:ring-2 focus:ring-[#384808]/20 transition-all font-mono font-bold"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Optional Contact Fields (Mittelstands-Präferenz: Telefon & Name) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label
                          htmlFor="signup-name"
                          className="block text-[11px] font-bold uppercase tracking-wider text-[#585828] mb-1"
                        >
                          ANSPRECHPARTNER <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          id="signup-name"
                          type="text"
                          maxLength={100}
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="z. B. Max Mustermann"
                          className="w-full px-4 py-2.5 bg-[#F4F2E6] rounded-xl border border-[#A09048]/30 text-[#384808] placeholder-stone-400 text-xs focus:outline-none focus:border-[#384808] transition-all"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="signup-phone"
                          className="block text-[11px] font-bold uppercase tracking-wider text-[#585828] mb-1"
                        >
                          TELEFON FÜR RÜCKFRAGEN <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          id="signup-phone"
                          type="tel"
                          maxLength={50}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="z. B. 0170 1234567"
                          className="w-full px-4 py-2.5 bg-[#F4F2E6] rounded-xl border border-[#A09048]/30 text-[#384808] placeholder-stone-400 text-xs focus:outline-none focus:border-[#384808] transition-all"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Checkbox: Price confirmation */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none group">
                        <input
                          type="checkbox"
                          required
                          checked={priceConsent}
                          onChange={(e) => setPriceConsent(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded-md border-stone-300 text-[#384808] accent-[#384808] cursor-pointer shrink-0"
                          disabled={isSubmitting}
                        />
                        <span className="text-xs text-[#585828] group-hover:text-[#384808] leading-relaxed">
                          {priceConsentLabel} <span className="text-red-600 font-bold">*</span>
                        </span>
                      </label>
                    </div>

                    {/* Checkbox: Privacy consent */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer select-none group">
                        <input
                          type="checkbox"
                          required
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded-md border-stone-300 text-[#384808] accent-[#384808] cursor-pointer shrink-0"
                          disabled={isSubmitting}
                        />
                        <span className="text-xs text-[#585828] group-hover:text-[#384808] leading-relaxed">
                          Ich habe die{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onOpenPrivacyModal();
                            }}
                            className="text-[#889028] font-bold underline hover:text-[#384808]"
                          >
                            Datenschutzerklärung
                          </button>{' '}
                          gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
                          gespeichert werden. <span className="text-red-600 font-bold">*</span>
                        </span>
                      </label>
                    </div>

                    {/* Submit CTA */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full tech-cta-primary justify-center cursor-pointer disabled:opacity-60 text-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-white" />
                            <span>Wird übermittelt...</span>
                          </>
                        ) : (
                          <>
                            <span>14 Tage kostenlos testen & anfragen</span>
                            <div className="tech-ci">
                              <ArrowRight size={14} />
                            </div>
                          </>
                        )}
                      </button>
                      <div className="text-[11px] text-center text-[#585828] mt-3 space-y-1">
                        <div>🔒 100 % unverbindlich · Keine automatische Verlängerung</div>
                        <div className="text-[#889028]">Detlef Scheer prüft Deine Verbandsmitgliedschaft und sendet Dir die Zugangsdaten.</div>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Zone 3 (Right 3 cols): Brand & Contact Info Bento */}
              <div className="lg:col-span-3 bg-[#242E05] backdrop-blur-md rounded-[32px] border border-[#A09048]/30 p-8 flex flex-col justify-between h-full shadow-lg">
                <div>
                  <div className="mb-6">
                    <CvbOfficeIcon size={48} />
                    <div className="font-spartan text-xl font-black tracking-wider text-white uppercase mt-3">
                      CVB-OFFICE
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A09048]">
                      VERBUND-PORTAL
                    </div>
                  </div>

                  <div className="space-y-4 text-xs text-[#F4F2E6]/90 leading-relaxed mb-8">
                    <div>
                      <span className="font-bold text-white block uppercase tracking-wider text-[10px] mb-1">
                        Organisation
                      </span>
                      Caravan-Vermieter-Bund (CVB)<br />
                      Detlef Scheer (Gründer)
                    </div>

                    <div>
                      <span className="font-bold text-white block uppercase tracking-wider text-[10px] mb-1">
                        E-Mail
                      </span>
                      <a href={`mailto:${generalSettings.contactEmail}`} className="text-[#A09048] hover:underline">
                        {generalSettings.contactEmail}
                      </a>
                    </div>

                    <div>
                      <span className="font-bold text-white block uppercase tracking-wider text-[10px] mb-1">
                        Offizielle Plattform
                      </span>
                      <a href={generalSettings.cvbWebsiteLink} target="_blank" rel="noopener noreferrer" className="text-[#A09048] hover:underline">
                        caravan-vermieter-bund.de
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 text-[10px] font-bold tracking-widest text-[#C5CF77]/70 uppercase flex items-center gap-3">
                  <span>DSGVO</span>
                  <span>·</span>
                  <span>SSL 256-BIT</span>
                  <span>·</span>
                  <span>DEUTSCHLAND</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};
