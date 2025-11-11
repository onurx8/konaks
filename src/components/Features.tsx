//onurx
import { Users, ParkingCircle, Wind, Music, UtensilsCrossed, Camera, Sparkles, PartyPopper } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: '900 Kişilik Kapasite',
    description: 'Alt kat 700, üst kat 200 kişi kapasiteli salonlarımızda toplam 900 misafirinizi ağırlayabiliriz.'
  },
  {
    icon: ParkingCircle,
    title: 'Özel Otopark',
    description: 'Misafirleriniz için geniş ve güvenli özel otopark alanı mevcuttur.'
  },
  {
    icon: Wind,
    title: 'Klimalı Ortam',
    description: 'Tüm yıl boyunca konforlu sıcaklık kontrolü ile rahat bir atmosfer.'
  },
  {
    icon: Music,
    title: 'Profesyonel Ses Sistemi',
    description: 'Son teknoloji ses ve ışık sistemleri ile unutulmaz bir eğlence.'
  },
  {
    icon: UtensilsCrossed,
    title: 'Özel Yemek Servisi',
    description: 'Deneyimli aşçılarımız ve çeşitli menü seçeneklerimizle lezzet garantisi.'
  },
  {
    icon: Camera,
    title: 'Fotoğraf Köşesi',
    description: 'Özel dekore edilmiş fotoğraf köşesinde anılarınızı ölümsüzleştirin.'
  },
  {
    icon: Sparkles,
    title: 'Gelin Odası',
    description: 'Zarif ve konforlu gelin odamızda hazırlıklarınızı tamamlayın.'
  },
  {
    icon: PartyPopper,
    title: 'Gece Boyu Eğlence',
    description: 'Profesyonel ekibimiz ile sabaha kadar kesintisiz eğlence.'
  }
];

function Features() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Öne Çıkan Özelliklerimiz
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-300 transform active:scale-[0.98] hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 sm:p-3.5 md:p-4 rounded-full group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
