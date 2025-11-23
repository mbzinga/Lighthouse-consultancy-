export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 140" {...props}>
      {/* Lighthouse Body - Dark Teal */}
      <rect x="50" y="50" width="20" height="60" fill="#1A474B" rx="3"/>
      
      {/* Diagonal Stripes - Light Teal */}
      <rect x="50" y="65" width="20" height="6" fill="#2EC4B6" rx="1"/>
      <rect x="50" y="78" width="20" height="6" fill="#2EC4B6" rx="1"/>
      <rect x="50" y="91" width="20" height="6" fill="#2EC4B6" rx="1"/>
      
      {/* Lantern Room - Dark Teal */}
      <rect x="45" y="40" width="30" height="15" fill="#1A474B" rx="2"/>
      
      {/* Lantern Windows - Light Teal */}
      <rect x="48" y="45" width="6" height="8" fill="#2EC4B6" rx="1"/>
      <rect x="57" y="45" width="6" height="8" fill="#2EC4B6" rx="1"/>
      <rect x="66" y="45" width="6" height="8" fill="#2EC4B6" rx="1"/>
      
      {/* Roof/Cap - Pointed */}
      <path d="M60 20 L75 40 L45 40 Z" fill="#1A474B"/>
      
      {/* Wavy Base - Light Teal */}
      <path d="M35 105 Q40 110 45 108 Q50 110 55 108 Q60 110 65 108 Q70 110 75 108 Q80 110 85 108 Q90 110 95 108 L95 120 L35 120 Z" fill="#2EC4B6"/>
      
      {/* Light glow - Soft Gold */}
      <circle cx="60" cy="50" r="2" fill="#E5B769" opacity="0.8"/>
    </svg>
  )
}
