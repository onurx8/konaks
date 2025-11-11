//onurx
import logoImage from './fotos/logo.png';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'dark' | 'light';
}

function Logo({ className = '', size = 'medium', variant = 'dark' }: LogoProps) {
  const sizeClasses = {
    small: 'h-12',
    medium: 'h-20',
    large: 'h-32',
  };

  return (
    <div className={`${className} flex flex-col items-center justify-center relative`}>
      <div className="relative inline-block logo-wrapper">
        {/* Animasyonlu border efekti - pseudo element ile */}
        <div className="logo-border-effect"></div>
        
        {/* Logo resmi */}
        <div className="relative z-10 logo-image-wrapper">
          <img
            src={logoImage}
            alt="ÇetinKoNaK Düğün Salonu"
            className={`${sizeClasses[size]} w-auto object-contain`}
            style={{
              filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none',
            }}
          />
        </div>
      </div>
      
      <style>{`
        .logo-wrapper {
          padding: 2px;
          position: relative;
        }
        .logo-border-effect {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            transparent 20%,
            #D4AF37 40%, 
            #B8860B 50%, 
            #D4AF37 60%,
            transparent 80%,
            transparent 100%);
          background-size: 200% 100%;
          animation: shimmer-border 3s linear infinite;
          opacity: 0.8;
        }
        .logo-border-effect::before {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 6px;
          background: white;
        }
        .logo-image-wrapper {
          position: relative;
          z-index: 10;
        }
        @keyframes shimmer-border {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Logo;

