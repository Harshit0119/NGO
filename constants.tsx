
import React from 'react';

export const COLORS = {
  blue: '#1e3a8a',
  saffron: '#f97316',
  white: '#ffffff',
  gray: '#4b5563',
};

export const CONTACT_INFO = {
  phone: '+91 98765 43210',
  email: 'info@samajkalyansociety.org',
  address: '123, कल्याण मार्ग, नई दिल्ली - 110001',
};

export const WaveBackground = () => (
  <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
    <svg className="absolute bottom-0 w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path
        fill="#f1f5f9"
        fillOpacity="1"
        d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,181.3C672,149,768,107,864,117.3C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
);
