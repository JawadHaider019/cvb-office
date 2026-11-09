import React from 'react';
import { useApp } from '../context/AppContext';
import { Lock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC<{
  onOpenImpressum: () => void;
  onOpenPrivacy: () => void;
}> = ({ onOpenImpressum, onOpenPrivacy }) => {
  const { setCurrentView, isAdminLoggedIn } = useApp();

  return (
    <footer className="bg-[#242E05] text-[#C5CF77]/80 py-10 text-[11px] font-mono tracking-wider uppercase border-t border-[#A09048]/30">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A09048]" />
          <span>© {new Date().getFullYear()} CARAVAN-VERMIETER-BUND (CVB). ALLE RECHTE VORBEHALTEN.</span>
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={onOpenImpressum}
            className="hover:text-[#A09048] transition-colors cursor-pointer"
          >
            IMPRESSUM
          </button>
          <button
            onClick={onOpenPrivacy}
            className="hover:text-[#A09048] transition-colors cursor-pointer"
          >
            DATENSCHUTZ
          </button>
          <button
            onClick={() => setCurrentView('admin')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#A09048] hover:text-white transition-all cursor-pointer text-[#C5CF77]"
          >
            {isAdminLoggedIn ? <ShieldCheck size={13} className="text-[#A09048]" /> : <Lock size={12} />}
            <span>{isAdminLoggedIn ? 'ADMIN AKTIV' : 'ADMIN PORTAL'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
