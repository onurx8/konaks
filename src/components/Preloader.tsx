import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2 saniye zorunlu yükleme ekranı (sayfa arkada render olurken gözü yormasın diye)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Altın Sarısı Dönen Halka Animasyonu */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6">
              <div className="absolute inset-0 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-r-2 border-[#F3E5AB] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 border-b-2 border-[#B8860B] rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
            
            {/* Marka İsmi */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] tracking-widest uppercase mb-2">
              Çetin Konak
            </h1>
            
            {/* Alt Başlık */}
            <p className="text-gray-400 text-xs sm:text-sm tracking-[0.2em] uppercase">
              Saray Zarafetinde Davetler
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
