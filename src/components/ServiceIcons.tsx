// Custom 3D-style SVG icons for services
// These icons can be customized with colors via props

type IconProps = {
  color?: string;
  size?: number;
  className?: string;
};

export const AvatarIcon = ({ color = '#C41E3A', size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </linearGradient>
      <filter id="avatarShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color} floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="16" cy="12" r="6" fill="url(#avatarGrad)" filter="url(#avatarShadow)" />
    <path d="M8 26 C8 20, 12 18, 16 18 C20 18, 24 20, 24 26" stroke="url(#avatarGrad)" strokeWidth="2" fill="none" filter="url(#avatarShadow)" />
  </svg>
);

export const HumanIcon = ({ color = '#C41E3A', size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="humanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </linearGradient>
      <filter id="humanShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color} floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="12" y="6" width="8" height="8" rx="1" fill="url(#humanGrad)" filter="url(#humanShadow)" />
    <rect x="10" y="16" width="12" height="10" rx="1" fill="url(#humanGrad)" filter="url(#humanShadow)" />
  </svg>
);

export const GameIcon = ({ color = '#C41E3A', size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </linearGradient>
      <filter id="gameShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color} floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="6" y="8" width="20" height="16" rx="2" fill="url(#gameGrad)" filter="url(#gameShadow)" />
    <circle cx="12" cy="14" r="1.5" fill="white" opacity="0.8" />
    <circle cx="20" cy="14" r="1.5" fill="white" opacity="0.8" />
    <rect x="14" y="18" width="4" height="2" rx="1" fill="white" opacity="0.8" />
  </svg>
);

export const VirtualIcon = ({ color = '#C41E3A', size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="virtualGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </linearGradient>
      <filter id="virtualShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color} floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="4" y="6" width="24" height="18" rx="1" fill="url(#virtualGrad)" filter="url(#virtualShadow)" />
    <rect x="8" y="10" width="16" height="10" rx="0.5" fill="rgba(0,0,0,0.3)" />
    <circle cx="16" cy="15" r="2" fill="white" opacity="0.6" />
  </svg>
);

export const KidsIcon = ({ color = '#C41E3A', size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kidsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </linearGradient>
      <filter id="kidsShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color} floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="16" cy="10" r="5" fill="url(#kidsGrad)" filter="url(#kidsShadow)" />
    <path d="M10 22 Q16 18, 22 22" stroke="url(#kidsGrad)" strokeWidth="2" fill="none" filter="url(#kidsShadow)" />
    <circle cx="13" cy="9" r="1" fill="white" opacity="0.9" />
    <circle cx="19" cy="9" r="1" fill="white" opacity="0.9" />
    <path d="M14 12 Q16 13, 18 12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8" />
  </svg>
);

export const WebIcon = ({ color = '#C41E3A', size = 32 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </linearGradient>
      <filter id="webShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color} floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="6" y="8" width="20" height="16" rx="1" fill="url(#webGrad)" filter="url(#webShadow)" />
    <line x1="6" y1="14" x2="26" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    <line x1="6" y1="18" x2="26" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    <rect x="10" y="10" width="6" height="2" rx="0.5" fill="white" opacity="0.6" />
  </svg>
);

