//onurx
import { Sparkles, Images } from 'lucide-react';
import konakGirisImage from './fotos/konakdış/konakgiriş.jpg';

interface HeroProps {
  onReservation: () => void;
  onGallery?: () => void;
}

function Hero({ onReservation, onGallery }: HeroProps) {
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

  return (
    <section className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden safe-area-top">
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        style={{
          backgroundImage: `url(${konakGirisImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2 relative">
          <span className="golden-text-shimmer inline-block">
            Hayallerinizdeki Düğün<br className="hidden sm:block" /> İçin İlk Adım
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2 leading-relaxed relative">
          <span className="golden-text-shimmer-delayed inline-block">
            900 kişilik toplam kapasitesi, zarif dekorasyonu ve profesyonel hizmet anlayışıyla en özel gününüzü unutulmaz kılıyoruz.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handleReservationClick}
            className="bg-[#D4AF37] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#B8860B] active:bg-[#A67A0A] transition-all shadow-2xl hover:shadow-[#D4AF37]/50 transform active:scale-95 hover:scale-105 inline-flex items-center space-x-2 touch-manipulation min-h-[48px] sm:min-h-[52px] w-full sm:w-auto"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Hemen Teklif Alın</span>
          </button>
          
          {onGallery && (
            <button
              onClick={handleGalleryClick}
              className="bg-white/90 backdrop-blur-sm text-[#D4AF37] border-2 border-[#D4AF37] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white active:bg-gray-50 transition-all shadow-2xl hover:shadow-white/50 transform active:scale-95 hover:scale-105 inline-flex items-center space-x-2 touch-manipulation min-h-[48px] sm:min-h-[52px] w-full sm:w-auto"
            >
              <Images className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Salon Resimleri</span>
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-white to-transparent safe-area-bottom"></div>
    </section>
  );
}

export default Hero;
