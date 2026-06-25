//onurx
import { MapPin, Phone, Clock, Share2 } from 'lucide-react';

interface ContactProps {
  onNavigate?: (page: 'reservation') => void;
}

function Contact({ onNavigate }: ContactProps) {
  const handleReservationClick = () => {
    if (onNavigate) {
      onNavigate('reservation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <div className="min-h-screen bg-transparent">
      <div className="relative h-[250px] sm:h-[300px] flex items-center justify-center mt-20 overflow-hidden border-b border-white/5">
        {/* Massive Static Text Background (Watermark) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 select-none">
          <span className="text-[45px] sm:text-[80px] md:text-[130px] lg:text-[200px] xl:text-[280px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] tracking-tighter whitespace-nowrap drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            ÇETİN KONAK
          </span>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F3E5AB] drop-shadow-[0_4px_10px_rgba(0,0,0,1)] tracking-wide mb-3 sm:mb-4">
            İletişim
          </h1>
          <div className="luxury-divider w-20 sm:w-24 mx-auto mb-3 sm:mb-4"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Bize Ulaşın</h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 md:p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 active:shadow-md transition-all">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-2.5 sm:p-3 rounded-lg">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">Telefon</h3>
                  <a
                    href="tel:+905414513806"
                    className="text-gray-400 hover:text-[#D4AF37] active:text-[#B8860B] transition-colors text-sm sm:text-base touch-manipulation min-h-[44px] flex items-center"
                  >
                    +90 541 451 38 06
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 md:p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 active:shadow-md transition-all">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-2.5 sm:p-3 rounded-lg">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">Çalışma Saatleri</h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    Pazartesi - Pazar: 09:00 - 22:00<br />
                    Randevu için lütfen arayınız
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 md:p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 active:shadow-md transition-all">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-2.5 sm:p-3 rounded-lg">
                    <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Sosyal Medya</h3>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <a
                      href="https://www.facebook.com/cetinkonaksalon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] active:from-[#A67A0A] active:to-[#B8860B] text-white px-4 sm:px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 active:shadow-sm transform active:scale-95 hover:scale-105 flex items-center justify-center space-x-2 touch-manipulation min-h-[44px]"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>
                    <a
                      href="https://www.instagram.com/cetinkonaksalon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] active:from-[#A67A0A] active:to-[#B8860B] text-white px-4 sm:px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 active:shadow-sm transform active:scale-95 hover:scale-105 flex items-center justify-center space-x-2 touch-manipulation min-h-[44px]"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-6 sm:p-7 md:p-8 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-2xl shadow-2xl shadow-[#D4AF37]/20 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Rezervasyon Yapmak İster misiniz?</h3>
              <p className="text-white mb-5 sm:mb-6 text-sm sm:text-base">
                Özel gününüz için hemen rezervasyon yapın ve detaylı bilgi alın.
              </p>
              <button
                onClick={handleReservationClick}
                className="bg-white text-[#B8860B] px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-100 active:bg-gray-200 transition-all shadow-lg transform active:scale-95 hover:scale-105 touch-manipulation min-h-[48px]"
              >
                Rezervasyon Formu
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Konum</h2>
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
              <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
                <iframe
                  src="https://www.google.com/maps?ll=40.217714,28.372879&z=16&t=m&hl=tr&gl=TR&mapclient=embed&cid=1816434013871570210&output=embed"
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Çetin Konak Düğün Salonu Konumu"
                ></iframe>
              </div>
            </div>
            <button
              onClick={() => window.open('https://www.google.com/maps?ll=40.217714,28.372879&z=16&t=m&hl=tr&gl=TR&mapclient=embed&cid=1816434013871570210', '_blank')}
              className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-[#B8860B] hover:to-[#D4AF37] active:from-[#A67A0A] active:to-[#B8860B] transition-all shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 active:shadow-sm flex items-center justify-center space-x-2 touch-manipulation min-h-[48px]"
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Google Haritalar'da Aç</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
