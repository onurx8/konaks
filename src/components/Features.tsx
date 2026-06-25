//onurx
import { Users, ParkingCircle, Wind, Music, UtensilsCrossed, Camera, Sparkles, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

function Features() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-3 sm:px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">
            Öne Çıkan Özelliklerimiz
          </h2>
          <div className="luxury-divider w-24 sm:w-32 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-card-hover p-5 sm:p-6 md:p-8 group cursor-default"
              >
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 sm:p-3.5 md:p-4 rounded-full group-hover:scale-110 transition-transform gold-glow">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-center text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
