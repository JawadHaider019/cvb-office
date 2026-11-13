'use client';
import React from 'react';
import { X, Shield } from 'lucide-react';
export const LegalModal = ({ isOpen, onClose, type }) => {
    if (!isOpen)
        return null;
    return (<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#242E05]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[22px] sm:rounded-[28px] max-w-2xl w-full max-h-[88vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl border border-[#A09048]/35 flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#A09048]/20 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#384808] text-[#A09048] flex items-center justify-center">
              <Shield size={16}/>
            </div>
            <h3 className="font-spartan font-black text-lg uppercase text-[#384808]">
              {type === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer" aria-label="Schließen">
            <X size={20}/>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-sm text-[#585828] space-y-4 leading-relaxed">
          {type === 'impressum' ? (<>
              <div>
                <h4 className="font-bold text-[#384808] text-base mb-1">Angaben gemäß § 5 DDG</h4>
                <p>
                  Caravan-Vermieter-Bund (CVB)<br />
                  DS-Caravaning GmbH<br />
                  Vertreten durch: Detlef Scheer<br />
                  Niederkrüchten, Deutschland
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#384808] text-base mb-1">Kontakt</h4>
                <p>
                  E-Mail: info@caravan-vermieter-bund.de<br />
                  Web: caravan-vermieter-bund.de / cvb-office.de
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#384808] text-base mb-1">Technologiepartner</h4>
                <p>
                  Die technologische Plattform für CVB-Office wird in Kooperation mit Smarlps bereitgestellt (Smarlps, Deutschland).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#384808] text-base mb-1">Haftung für Inhalte und Links</h4>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>
            </>) : (<>
              <div>
                <h4 className="font-bold text-[#384808] text-base mb-1">Datenschutz auf einen Blick</h4>
                <p>
                  Wir freuen uns über Dein Interesse an CVB-Office. Der Schutz Deiner persönlichen Daten ist uns ein hohes Anliegen. Wir erheben und verarbeiten personenbezogene Daten ausschließlich im Rahmen der gesetzlichen Vorschriften der DSGVO.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#384808] text-base mb-1">Keine Drittanbieter-Tracker oder Analyse-Cookies</h4>
                <p>
                  Diese Landing Page verzichtet vollständig auf externe Tracking-Pixel, Werbenetzwerke, Drittanbieter-Schriftarten (keine Google Fonts von externen Servern) und zustimmungspflichtige Analyse-Cookies. Ein Cookie-Banner ist daher nicht erforderlich.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#384808] text-base mb-1">Datenerhebung über das Anfrageformular</h4>
                <p>
                  Wenn Du über unser Formular eine Anfrage für CVB-Office stellst, speichern wir:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Deine angegebene E-Mail-Adresse</li>
                  <li>Die gemeldete Anzahl an Fahrzeugen</li>
                  <li>Den Zeitpunkt und Wortlaut der Preis- und Datenschutzbestätigung</li>
                  <li>Bearbeitungsstatus und interne Notizen</li>
                </ul>
                <p className="mt-2">
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie Deine erteilte Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#384808] text-base mb-1">Deine Rechte</h4>
                <p>
                  Du hast jederzeit das Recht auf unentgeltliche Auskunft über Deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Kontaktiere uns hierzu gern unter: info@caravan-vermieter-bund.de.
                </p>
              </div>
            </>)}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#F4F2E6] px-6 py-3 border-t border-[#A09048]/20 flex justify-end">
          <button onClick={onClose} className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#384808] hover:bg-[#2D3A06] rounded-full transition-colors cursor-pointer">
            Schließen
          </button>
        </div>
      </div>
    </div>);
};
