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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="relative h-[300px] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        ></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Salon Detayları</h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Hizmetlerimiz ve Özelliklerimiz
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Çetin Konak Düğün Salonu olarak, en özel gününüzü unutulmaz kılmak için eksiksiz hizmet sunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-4 rounded-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Konum</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-[500px] md:h-[600px]">
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
            className="w-full mt-4 bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8860B] transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
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
