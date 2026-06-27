//onurx
import { Users, ParkingCircle, Wind, Music, UtensilsCrossed, Camera, Sparkles, PartyPopper, MapPin } from 'lucide-react';

function VenueDetails() {
  const features = [
    {
      icon: Users,
      title: '900 Kişilik Toplam Kapasite',
      description: 'Alt kat büyük salonumuzda 700 kişi, üst kat küçük salonumuzda 200 kişi olmak üzere toplam 900 misafirinizi konforlu şekilde ağırlayabilirsiniz. Modern masa düzenimiz ve geniş dans pistimiz ile misafirleriniz rahat bir şekilde eğlenebilir.'
    },
    {
      icon: ParkingCircle,
      title: 'Özel Otopark',
      description: 'Salonumuza ait 30 araçlık otoparkımız mevcuttur. Kapasite dolduğunda bir üst caddede park imkanı bulunmaktadır. Araç parkında sorun yaşanmamaktadır.'
    },
    {
      icon: Wind,
      title: 'Klimalı Ortam',
      description: 'Merkezi klima sistemi ile tüm yıl boyunca konforlu sıcaklık kontrolü sağlanmaktadır. Yaz ve kış aylarında misafirlerinizin rahatsız olmaması için ideal ortam koşulları sunuyoruz.'
    },
    {
      icon: Music,
      title: 'Profesyonel Ses Sistemi',
      description: 'Son teknoloji JBL ses sistemleri ve profesyonel ışık show ekipmanları ile unutulmaz bir eğlence. DJ kabini ve sahne düzenimiz ile canlı müzik performanslarına da ev sahipliği yapabiliyoruz.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Özel Yemek Servisi',
      description: 'Deneyimli aşçılarımız ve çeşitli menü seçeneklerimizle lezzet garantisi sunuyoruz. Açık büfe, kokteyl ve oturmalı menü seçenekleri ile damak tadınıza uygun menüler hazırlıyoruz.'
    },
    {
      icon: Camera,
      title: 'Fotoğraf Köşesi',
      description: 'Özel dekore edilmiş fotoğraf köşemizde anılarınızı ölümsüzleştirin. Profesyonel fotoğrafçılarımız için özel aydınlatma ve dekorasyon imkanları mevcuttur.'
    },
    {
      icon: Sparkles,
      title: 'Gelin Odaları',
      description: 'Her salonumuzda kendine ait gelin odaları mevcuttur. Zarif ve konforlu gelin odalarımızda son hazırlıklarınızı tamamlayın. Makyaj masası, gardırop, dinlenme alanı ve özel tuvaleti ile tam donanımlı gelin odalarımız hizmetinizde.'
    },
    {
      icon: PartyPopper,
      title: 'Gece Boyu Eğlence',
      description: 'Profesyonel organizasyon ekibimiz ile sabaha kadar kesintisiz eğlence. Deneyimli servis personelimiz ve koordinatörlerimiz etkinliğinizin her anında yanınızda.'
    }
  ];


  return (
    <div className="bg-transparent min-h-screen">
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
            Salon Detayları
          </h1>
          <div className="luxury-divider w-20 sm:w-24 mx-auto mb-3 sm:mb-4"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Hizmetlerimiz ve Özelliklerimiz
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Çetin Konak Düğün Salonu olarak, en özel gününüzü unutulmaz kılmak için eksiksiz hizmet sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 sm:p-4 rounded-lg">
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8">Konum</h2>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <iframe
                src="https://www.google.com/maps?ll=40.217714,28.372879&z=16&t=m&hl=tr&gl=TR&mapclient=embed&cid=1816434013871570210&output=embed"
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
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
            className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all shadow-2xl shadow-black/50 flex items-center justify-center space-x-2 touch-manipulation min-h-[48px]"
          >
            <MapPin className="h-5 w-5" />
            <span>Google Haritalar'da Aç</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VenueDetails;
