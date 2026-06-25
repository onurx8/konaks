import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Logo({ variant = 'dark', size = 'medium', className = '' }: LogoProps) {
  // Use mix-blend-mode screen to make white background transparent,
  // then invert and hue-rotate to make the dark logo gold
  const filterStyle = {
    mixBlendMode: 'screen' as const, 
    filter: 'invert(1) sepia(1) saturate(5) hue-rotate(15deg) brightness(1.2)'
  };

  const sizeClasses = {
    small: 'h-10 sm:h-12',
    medium: 'h-16 sm:h-20',
    large: 'h-24 sm:h-32'
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="/src/components/fotos/logo.png"
        alt="Çetin Konak"
        className={`object-contain transition-transform duration-500 hover:scale-105 ${sizeClasses[size]}`}
        style={filterStyle}
      />
    </div>
  );
}

export default Logo;
