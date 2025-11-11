//onurx
import { Phone, MapPin } from 'lucide-react';

function FloatingButtons() {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+905414513806';
  };

  const handleLocationClick = () => {
    window.open('https://maps.google.com/?q=Esentepe,226.+Sk.+No:11,16700+Karacabey/Bursa', '_blank');
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col space-y-3 z-40 safe-area-bottom safe-area-right">
      <button
        onClick={handleLocationClick}
        className="bg-[#D4AF37] hover:bg-[#B8860B] active:bg-[#A67A0A] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:shadow-[#D4AF37]/50 active:shadow-lg transition-all transform active:scale-95 hover:scale-110 group touch-manipulation min-h-[56px] min-w-[56px] flex items-center justify-center"
        aria-label="Konum"
      >
        <MapPin className="h-6 w-6 sm:h-7 sm:w-7 group-hover:animate-pulse" />
      </button>

      <button
        onClick={handlePhoneClick}
        className="bg-[#D4AF37] hover:bg-[#B8860B] active:bg-[#A67A0A] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:shadow-[#D4AF37]/50 active:shadow-lg transition-all transform active:scale-95 hover:scale-110 group touch-manipulation min-h-[56px] min-w-[56px] flex items-center justify-center"
        aria-label="Telefon"
      >
        <Phone className="h-6 w-6 sm:h-7 sm:w-7 group-hover:animate-pulse" />
      </button>
    </div>
  );
}

export default FloatingButtons;
