'use client';
import React from 'react';
/**
 * CVB-Office Icon:
 * Rounded square with gold border (#A09048), motorhome silhouette, letters "CVB" and word "Office" in gold.
 * Main product mark for header, hero trust cues, and favicon.
 */
export const CvbOfficeIcon = ({ className = '', size = 48, }) => {
    return (<div className={`relative inline-flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }} aria-label="CVB-Office Logo Icon">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        {/* Rounded square container with gold border */}
        <rect x="3" y="3" width="94" height="94" rx="22" fill="#384808" stroke="#A09048" strokeWidth="4"/>

        {/* Subtle interior glow ring */}
        <rect x="7" y="7" width="86" height="86" rx="18" fill="none" stroke="#A09048" strokeWidth="1" strokeOpacity="0.4"/>

        {/* Modern Motorhome Silhouette outline */}
        <path d="M22 46H58C63 46 67 48 70 51L77 58V69H72C72 72.8 68.8 76 65 76C61.2 76 58 72.8 58 69H38C38 72.8 34.8 76 31 76C27.2 76 24 72.8 24 69H20V51C20 48.2 20.8 46 22 46Z" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Cab Window */}
        <path d="M60 51H69L73 57H60V51Z" fill="#A09048" fillOpacity="0.85"/>
        {/* Living area side window */}
        <rect x="28" y="51" width="14" height="7" rx="1.5" fill="#FFFFFF" fillOpacity="0.9"/>
        {/* Wheels */}
        <circle cx="31" cy="69" r="4.5" fill="#A09048" stroke="#FFFFFF" strokeWidth="2"/>
        <circle cx="65" cy="69" r="4.5" fill="#A09048" stroke="#FFFFFF" strokeWidth="2"/>

        {/* CVB Brand Letters */}
        <text x="50" y="33" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="23" letterSpacing="0.05em">
          CVB
        </text>

        {/* Office in Gold Script/Serif font */}
        <text x="50" y="88" textAnchor="middle" fill="#A09048" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="12.5" letterSpacing="0.12em">
          OFFICE
        </text>
      </svg>
    </div>);
};
/**
 * Wide CVB Logo:
 * CARAVAN (dark green #384808) & VERMIETER BUND (olive green #889028) with motorhome icon.
 * Used in Footer and About CVB section.
 */
export const CvbWideLogo = ({ className = '', light = false, }) => {
    return (<div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Icon portion */}
      <div className="shrink-0 w-11 h-11 rounded-xl bg-[#384808] p-1.5 flex items-center justify-center border border-[#A09048]/40 shadow-sm">
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-white">
          <path d="M6 18H24C27 18 29 19.5 31 22L34 26V32H32C32 34 30.5 35.5 28.5 35.5C26.5 35.5 25 34 25 32H15C15 34 13.5 35.5 11.5 35.5C9.5 35.5 8 34 8 32H6V21C6 19.3 6.7 18 8 18H6Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 21H30L32.5 25H25V21Z" fill="#A09048"/>
          <circle cx="11.5" cy="32" r="2.5" fill="#A09048" stroke="white" strokeWidth="1.2"/>
          <circle cx="28.5" cy="32" r="2.5" fill="#A09048" stroke="white" strokeWidth="1.2"/>
          <text x="20" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
            CVB
          </text>
        </svg>
      </div>

      {/* Text lockup */}
      <div className="flex flex-col leading-none">
        <span className={`font-black tracking-tight text-lg uppercase ${light ? 'text-white' : 'text-[#384808]'}`} style={{ letterSpacing: '0.04em' }}>
          CARAVAN
        </span>
        <span className={`font-bold text-xs uppercase tracking-wider ${light ? 'text-[#F4F2E6]/80' : 'text-[#889028]'}`} style={{ letterSpacing: '0.14em' }}>
          VERMIETER BUND
        </span>
      </div>
    </div>);
};
