import React from 'react';

const Logo = ({ size = 40, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0px 4px 10px rgba(212, 175, 55, 0.3))' }}
      >
        {/* Aerodynamic train silhouette / track lines */}
        <path 
          d="M10 70C10 70 30 65 50 65C70 65 90 70 90 70" 
          stroke="url(#gold-gradient)" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        <path 
          d="M15 80C15 80 35 75 50 75C65 75 85 80 85 80" 
          stroke="url(#gold-gradient)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeOpacity="0.5"
        />
        <path 
          d="M20 45L40 30H80V60H40L20 45Z" 
          fill="var(--primary)" 
          stroke="url(#gold-gradient)" 
          strokeWidth="2" 
        />
        <rect x="45" y="38" width="8" height="8" rx="1" fill="var(--secondary)" fillOpacity="0.8" />
        <rect x="58" y="38" width="8" height="8" rx="1" fill="var(--secondary)" fillOpacity="0.8" />
        <rect x="71" y="38" width="8" height="8" rx="1" fill="var(--secondary)" fillOpacity="0.8" />
        
        {/* Speed lines */}
        <line x1="5" y1="40" x2="15" y2="40" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="50" x2="18" y2="50" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="gold-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d4af37" />
            <stop offset="1" stopColor="#fed65b" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
        <span style={{ 
          fontSize: size * 0.5, 
          fontWeight: '900', 
          color: 'var(--primary)', 
          letterSpacing: '-0.5px',
          textTransform: 'uppercase'
        }}>
          Elite <span style={{ color: 'var(--secondary)' }}>Rail</span>
        </span>
        <span style={{ 
          fontSize: size * 0.18, 
          fontWeight: '500', 
          color: '#666', 
          letterSpacing: '2px', 
          textTransform: 'uppercase',
          marginTop: '2px'
        }}>
          Excellence in Motion
        </span>
      </div>
    </div>
  );
};

export default Logo;
