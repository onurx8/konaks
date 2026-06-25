//onurx
import { Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

function FloatingButtons() {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+905414513806';
  };

  const handleLocationClick = () => {
    window.open('https://maps.google.com/?q=Esentepe,226.+Sk.+No:11,16700+Karacabey/Bursa', '_blank');
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col space-y-3 z-40 safe-area-bottom safe-area-right">
      <motion.button
        onClick={handleLocationClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white p-3.5 sm:p-4 rounded-full shadow-2xl shadow-[#D4AF37]/30 transition-all group touch-manipulation min-h-[56px] min-w-[56px] flex items-center justify-center gold-glow"
        aria-label="Konum"
      >
        <MapPin className="h-6 w-6 sm:h-7 sm:w-7 group-hover:animate-pulse" />
      </motion.button>

      <motion.button
        onClick={handlePhoneClick}
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            "0px 0px 0px rgba(212,175,55,0)",
            "0px 0px 25px rgba(212,175,55,0.7)",
            "0px 0px 0px rgba(212,175,55,0)"
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all group touch-manipulation min-h-[56px] min-w-[56px] flex items-center justify-center gold-glow"
        aria-label="Telefon"
      >
        <Phone className="h-6 w-6 sm:h-7 sm:w-7 group-hover:animate-pulse" />
      </motion.button>
    </div>
  );
}

export default FloatingButtons;
