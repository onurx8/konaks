//onurx
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

type Page = 'home' | 'about' | 'venue' | 'gallery' | 'contact' | 'reservation';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home' as Page, label: 'Ana Sayfa' },
    { id: 'about' as Page, label: 'Hakkımızda' },
    { id: 'venue' as Page, label: 'Salon Detayları' },
    { id: 'gallery' as Page, label: 'Galeri' },
    { id: 'contact' as Page, label: 'İletişim' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-gray-50 shadow-md sticky top-0 z-50 safe-area-top">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group touch-manipulation min-h-[44px] min-w-[44px]"
            aria-label="Ana Sayfa"
          >
            <Logo size="small" className="group-hover:scale-105 transition-transform" />
          </button>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm lg:text-base font-medium transition-colors hover:text-[#D4AF37] min-h-[44px] px-2 lg:px-3 touch-manipulation ${
                  currentPage === item.id ? 'text-[#D4AF37]' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('reservation')}
              className="bg-[#D4AF37] text-white px-4 lg:px-6 py-2.5 rounded-full text-sm lg:text-base font-medium hover:bg-[#B8860B] transition-all shadow-md hover:shadow-lg transform hover:scale-105 touch-manipulation min-h-[44px]"
            >
              Rezervasyon
            </button>
          </nav>

          <button
            className="md:hidden text-gray-700 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü"
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 safe-area-bottom">
          <nav className="px-3 py-3 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors text-base font-medium min-h-[48px] touch-manipulation ${
                  currentPage === item.id
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('reservation')}
              className="block w-full text-left bg-[#D4AF37] text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-[#B8860B] active:bg-[#A67A0A] transition-colors min-h-[48px] touch-manipulation"
            >
              Rezervasyon
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
