//onurx
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

type Page = 'home' | 'about' | 'venue' | 'gallery' | 'contact' | 'reservation' | 'tour';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home' as Page, label: 'Ana Sayfa' },
    { id: 'tour' as Page, label: 'Sinematik Tur' },
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
    <header className="bg-black/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 safe-area-top">
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
                className={`text-sm lg:text-base font-medium transition-all hover:text-[#D4AF37] min-h-[44px] px-2 lg:px-3 touch-manipulation relative ${
                  currentPage === item.id ? 'text-[#D4AF37]' : 'text-gray-400'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4AF37]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <motion.button
              onClick={() => handleNavClick('reservation')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-4 lg:px-6 py-2.5 rounded-full text-sm lg:text-base font-medium hover:from-[#B8860B] hover:to-[#D4AF37] transition-all shadow-lg shadow-[#D4AF37]/20 touch-manipulation min-h-[44px]"
            >
              Rezervasyon
            </motion.button>
          </nav>

          <button
            className="md:hidden text-gray-400 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü"
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/5 safe-area-bottom overflow-hidden"
          >
            <nav className="px-3 py-3 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all text-base font-medium min-h-[48px] touch-manipulation ${
                    currentPage === item.id
                      ? 'bg-[#D4AF37] text-white'
                      : 'text-gray-400 hover:bg-white/5 active:bg-white/10'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
                onClick={() => handleNavClick('reservation')}
                className="block w-full text-left bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-4 py-3 rounded-lg text-base font-medium hover:from-[#B8860B] hover:to-[#D4AF37] transition-all min-h-[48px] touch-manipulation"
              >
                Rezervasyon
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
