//onurx
import { Sparkles, Images } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onReservation: () => void;
  onGallery?: () => void;
  onTour?: () => void;
}

// Stagger animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Split text into individual letter spans for stagger animation
function AnimatedText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Hero({ onReservation, onGallery, onTour }: HeroProps) {
  const handleReservationClick = () => {
    onReservation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGalleryClick = () => {
    if (onGallery) {
      onGallery();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTourClick = () => {
    if (onTour) {
      onTour();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden safe-area-top">
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0a0a0a] pointer-events-none z-0" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Small decorative badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 sm:mb-8 inline-flex items-center space-x-2 bg-black/60 border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.4)] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-xl"
        >
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#F3E5AB] animate-pulse drop-shadow-[0_0_5px_#D4AF37]" />
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#F3E5AB] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
            Çetin Konak Düğün Salonu
          </span>
        </motion.div>

        {/* Main Heading with premium animations */}
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-7 leading-tight px-2">
          <motion.span
            initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="text-[#F3E5AB] block mb-2 font-black drop-shadow-[0_4px_10px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] tracking-wide"
          >
            Hayallerinizdeki Düğün
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            className="text-[#F3E5AB] block font-extrabold drop-shadow-[0_4px_10px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] tracking-wide"
          >
            İçin İlk Adım
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
          className="text-sm sm:text-lg md:text-xl font-medium mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/40 sm:bg-black/20 rounded-xl py-3 sm:py-2 backdrop-blur-sm shadow-xl"
        >
          900 kişilik toplam kapasitesi, zarif dekorasyonu ve profesyonel hizmet
          anlayışıyla en özel gününüzü unutulmaz kılıyoruz.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          <motion.button
            variants={buttonVariants}
            onClick={handleReservationClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-6 sm:px-8 md:px-10 py-3.5 sm:py-3.5 md:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-[#B8860B] hover:to-[#D4AF37] transition-all shadow-2xl shadow-[#D4AF37]/20 flex items-center justify-center space-x-2 touch-manipulation min-h-[52px] w-full sm:w-auto gold-glow"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Hemen Teklif Alın</span>
          </motion.button>

          {onTour && (
            <motion.button
              variants={buttonVariants}
              onClick={handleTourClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card hover:bg-white/10 text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-base sm:text-lg font-semibold transition-all shadow-2xl inline-flex items-center space-x-2 touch-manipulation min-h-[48px] sm:min-h-[52px] w-full sm:w-auto"
            >
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#D4AF37] animate-pulse" />
              <span>Sinematik Salon Turu</span>
            </motion.button>
          )}

          {onGallery && (
            <motion.button
              variants={buttonVariants}
              onClick={handleGalleryClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card hover:bg-white/10 text-white border border-white/20 hover:border-[#D4AF37]/50 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-base sm:text-lg font-semibold transition-all shadow-2xl inline-flex items-center space-x-2 touch-manipulation min-h-[48px] sm:min-h-[52px] w-full sm:w-auto"
            >
              <Images className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Salon Resimleri</span>
            </motion.button>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 sm:mt-20 flex flex-col items-center text-gray-600"
        >
          <span className="text-xs tracking-widest uppercase mb-3">Keşfetmeye Başla</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center pt-1.5"
          >
            <motion.div className="w-1 h-1.5 bg-[#D4AF37] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
