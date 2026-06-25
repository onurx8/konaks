//onurx
import { MapPin, Phone } from 'lucide-react';

type Page = 'home' | 'about' | 'venue' | 'gallery' | 'contact';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 safe-area-bottom">
      {/* Subtle glass background */}
      <div className="bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 drop-shadow-[0_1px_4px_rgba(212,175,55,0.35)] flex-shrink-0">
                  <defs>
                    <linearGradient id="gold-grad-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B8860B" />
                      <stop offset="35%" stopColor="#D4AF37" />
                      <stop offset="50%" stopColor="#F3E5AB" />
                      <stop offset="65%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#8B6508" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M2 17.5L5 8.5L9.5 13L12 5L14.5 13L19 8.5L22 17.5H2Z"
                    fill="url(#gold-grad-footer)"
                    stroke="url(#gold-grad-footer)"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17.5C2 17.5 7 19.5 12 19.5C17 19.5 22 17.5 22 17.5V19C22 19 17 21 12 21C7 21 2 19V17.5Z"
                    fill="url(#gold-grad-footer)"
                  />
                  <circle cx="5" cy="8" r="0.8" fill="#FFFFFF" />
                  <circle cx="9.5" cy="12.5" r="0.8" fill="#FFFFFF" />
                  <circle cx="12" cy="4.5" r="1" fill="#FFFFFF" />
                  <circle cx="14.5" cy="12.5" r="0.8" fill="#FFFFFF" />
                  <circle cx="19" cy="8" r="0.8" fill="#FFFFFF" />
                </svg>
                <span className="text-lg font-bold text-white tracking-wider">Çetin Konak</span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm leading-snug">
                2022 yılından beri kaliteli hizmet ve müşteri memnuniyetiyle binlerce çiftin mutluluğuna şahit oluyoruz.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-[#D4AF37]">Hızlı Menü</h3>
              <ul className="space-y-1">
                {[
                  { page: 'home' as Page, label: 'Ana Sayfa' },
                  { page: 'about' as Page, label: 'Hakkımızda' },
                  { page: 'gallery' as Page, label: 'Galeri' },
                  { page: 'contact' as Page, label: 'İletişim' },
                ].map((item) => (
                  <li key={item.page}>
                    <button
                      onClick={() => handleNavClick(item.page)}
                      className="text-gray-500 hover:text-[#D4AF37] active:text-[#B8860B] transition-colors text-xs touch-manipulation py-1 text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-[#D4AF37]">İletişim Bilgileri</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500 text-xs leading-relaxed">
                    Esentepe, 226. Sk. No:11, 16700 Karacabey/Bursa
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                  <a
                    href="tel:+905414513806"
                    className="text-gray-500 hover:text-[#D4AF37] active:text-[#B8860B] transition-colors text-xs touch-manipulation flex items-center py-1"
                  >
                    +90 541 451 38 06
                  </a>
                </li>
                <li className="mt-3">
                  <p className="text-gray-600 text-[10px] mb-1">Sosyal Medya</p>
                  <div className="flex items-center space-x-2">
                    <a
                      href="https://www.facebook.com/cetinkonaksalon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-[#D4AF37] border border-white/10 hover:border-[#D4AF37] text-gray-500 hover:text-white p-2 rounded transition-all flex items-center justify-center touch-manipulation"
                      aria-label="Facebook"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/cetinkonaksalon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-[#D4AF37] border border-white/10 hover:border-[#D4AF37] text-gray-500 hover:text-white p-2 rounded transition-all flex items-center justify-center touch-manipulation"
                      aria-label="Instagram"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-[#D4AF37]">Çalışma Saatleri</h3>
              <p className="text-gray-500 text-xs leading-snug mb-2">
                Pazartesi - Pazar<br />
                09:00 - 22:00
              </p>
              <p className="text-gray-600 text-[10px]">
                Randevu için lütfen arayınız
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 mt-6 pt-6 text-center">
            <p className="text-gray-600 text-[11px]">
              © {currentYear} Çetin Konak Düğün Salonu. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
