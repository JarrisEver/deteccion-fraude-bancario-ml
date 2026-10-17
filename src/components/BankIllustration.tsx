import React from 'react';

export const BankIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-32' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          <linearGradient id="cardGrad" x1="20" y1="30" x2="220" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="0.6" stopColor="#1D4ED8" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="160" y1="40" x2="260" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="0.5" stopColor="#0284C7" />
            <stop offset="1" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="chipGrad" x1="45" y1="70" x2="75" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCD34D" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
          <filter id="glow" x="120" y="20" width="160" height="170" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Bank Architecture Silhouette Background */}
        <path d="M210 170 H300 V105 L255 80 L210 105 Z" fill="#1E293B" opacity="0.6" />
        <rect x="220" y="112" width="10" height="48" rx="2" fill="#334155" opacity="0.8" />
        <rect x="245" y="112" width="10" height="48" rx="2" fill="#334155" opacity="0.8" />
        <rect x="270" y="112" width="10" height="48" rx="2" fill="#334155" opacity="0.8" />
        <rect x="205" y="160" width="100" height="10" rx="2" fill="#475569" opacity="0.7" />

        {/* Credit Card (Isometric Angle) */}
        <g transform="rotate(-7 130 110)">
          <rect
            x="20"
            y="45"
            width="190"
            height="115"
            rx="12"
            fill="url(#cardGrad)"
            stroke="#60A5FA"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          {/* Card Magnetic Stripe / Circuit lines */}
          <path
            d="M20 78 Q115 88 210 78"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <path
            d="M20 95 Q115 105 210 95"
            stroke="#60A5FA"
            strokeWidth="1"
            opacity="0.2"
          />

          {/* EMV Chip */}
          <rect x="42" y="70" width="30" height="24" rx="4" fill="url(#chipGrad)" />
          <line x1="42" y1="82" x2="72" y2="82" stroke="#92400E" strokeWidth="0.75" />
          <line x1="57" y1="70" x2="57" y2="94" stroke="#92400E" strokeWidth="0.75" />

          {/* Contactless / NFC waves */}
          <path d="M85 75 A 10 10 0 0 1 85 89" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M90 71 A 16 16 0 0 1 90 93" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Card Mock Numbers */}
          <rect x="42" y="115" width="22" height="4" rx="2" fill="#93C5FD" opacity="0.6" />
          <rect x="70" y="115" width="22" height="4" rx="2" fill="#93C5FD" opacity="0.6" />
          <rect x="98" y="115" width="22" height="4" rx="2" fill="#93C5FD" opacity="0.6" />
          <rect x="126" y="115" width="22" height="4" rx="2" fill="#93C5FD" opacity="0.8" />

          {/* Bank logo circles */}
          <circle cx="178" cy="132" r="10" fill="#EF4444" opacity="0.85" />
          <circle cx="190" cy="132" r="10" fill="#F59E0B" opacity="0.85" />
        </g>

        {/* Protection Shield with Padlock */}
        <g filter="url(#glow)">
          <path
            d="M200 48 L248 34 C248 34 262 76 248 116 C238 144 200 162 200 162 C200 162 162 144 152 116 C138 76 152 34 152 34 L200 48 Z"
            fill="url(#shieldGrad)"
            stroke="#BAE6FD"
            strokeWidth="2"
          />
          {/* Inner Shield Bevel */}
          <path
            d="M200 55 L240 43 C240 43 252 78 240 110 C231 133 200 148 200 148 C200 148 169 133 160 110 C148 78 160 43 160 43 L200 55 Z"
            fill="#0369A1"
            opacity="0.35"
          />

          {/* Padlock */}
          <rect x="187" y="92" width="26" height="22" rx="4" fill="#FFFFFF" />
          <path
            d="M192 92 V82 C192 77 196 74 200 74 C204 74 208 77 208 82 V92"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Keyhole */}
          <circle cx="200" cy="101" r="2.5" fill="#0284C7" />
          <path d="M199 101 L198.5 107 H201.5 L201 101 Z" fill="#0284C7" />
        </g>

        {/* AI & Random Forest Sparkles/Nodes */}
        <circle cx="270" cy="50" r="3" fill="#38BDF8" />
        <circle cx="130" cy="35" r="2.5" fill="#60A5FA" />
        <circle cx="110" cy="170" r="2" fill="#38BDF8" opacity="0.6" />
        <circle cx="290" cy="120" r="2.5" fill="#60A5FA" opacity="0.5" />
      </svg>
    </div>
  );
};
