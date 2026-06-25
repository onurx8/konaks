//onurx
import { Target, Heart, Award, Users, MapPin, Users as UsersIcon, Home, Car, Trees, Baby } from 'lucide-react';

function About() {
  const values = [
    {
      icon: Heart,
      title: 'Müşteri Memnuniyeti',
      description: 'Her müşterimizin mutluluğu bizim en büyük başarımızdır.'
    },
    {
      icon: Award,
      title: 'Kaliteli Hizmet',
      description: 'Profesyonel ekibimiz ve yüksek standartlarımızla hizmet veriyoruz.'
    },
    {
      icon: Users,
      title: 'Deneyim',
      description: '20+ yıllık tecrübemizle binlerce mutlu çiftin anılarına ortak olduk.'
    },
    {
      icon: Target,
      title: 'Detaycılık',
      description: 'Her detayı titizlikle planlıyor, mükemmelliği hedefliyoruz.'
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
            Hakkımızda
          </h1>
          <div className="luxury-divider w-20 sm:w-24 mx-auto mb-3 sm:mb-4"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Hikayemiz</h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              Çetin Konak Düğün Salonu, 2022 yılında Çetin ailesi tarafından Bursa ili Karacabey ilçesi Esentepe mahallesi 224 Sk. No:14 konumunda kurulmuştur. Kurulduğumuz günden bu yana kaliteli hizmet ve müşteri memnuniyeti ilkesiyle hareket ederek, binlerce çiftin en özel gününe ev sahipliği yaptık.
            </p>
            <p>
              20 yılı aşkın deneyimimiz boyunca, düğün organizasyonunda sadece bir mekan olmaktan öte, çiftlerin hayallerini gerçeğe dönüştüren bir partner olduk. Her etkinlikte gösterdiğimiz özen ve profesyonellik, bölgedeki en güvenilir düğün salonlarından biri olmamızı sağladı.
            </p>
            <p>
              Salonlarımız her türlü düğün, toplantı, söz, nişan, doğum günü vb. organizasyonlarınızda yemekli ve yemeksiz paketlerimizle hizmetinizdedir. Modern mimarimiz, geniş kapasitemiz ve deneyimli ekibimizle size en iyi hizmeti sunmak için çalışıyoruz.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Salon Özelliklerimiz</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 rounded-lg flex-shrink-0">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Salon Kapasiteleri</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Alt kat büyük salonumuzda 700 kişi, üst kat küçük salonumuzda 200 kişi kapasiteye sahibiz.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 rounded-lg flex-shrink-0">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Gelin Odaları</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Her salonumuzda kendine ait gelin odaları mevcuttur.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 rounded-lg flex-shrink-0">
                  <Trees className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Bahçe Alanı</h3>
                  <p className="text-gray-400 leading-relaxed">
                    400 metrekare büyüklüğünde çim zeminli bahçemiz organizasyonlarda kafe olarak hizmet vermektedir.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 rounded-lg flex-shrink-0">
                  <Baby className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Çocuk Dostu</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Bahçemizde çocuklarınız için güvenli bir ortam mevcuttur.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 rounded-lg flex-shrink-0">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Otopark</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Salonumuza ait 30 araçlık otoparkımız mevcuttur. Kapasite dolduğunda bir üst caddede park imkanı bulunmaktadır.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Konum</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Bursa ili Karacabey ilçesi Esentepe mahallesi 224 Sk. No:14 konumunda bulunmaktayız.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Vizyonumuz ve Misyonumuz</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/40 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-8 shadow-2xl shadow-black/50 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/10">
              <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">Vizyonumuz</h3>
              <p className="leading-relaxed text-gray-300">
                Bölgenin en çok tercih edilen, kaliteli hizmet ve mükemmel müşteri deneyimi sunan öncü düğün salonu olmak. Sürekli gelişim ve yeniliklerle, her çiftin hayallerini en üst düzeyde gerçekleştirmek.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">Misyonumuz</h3>
              <p className="leading-relaxed text-gray-400">
                En özel gününüzü unutulmaz kılmak için her detayı titizlikle planlamak, profesyonel hizmet ve samimi yaklaşımla müşterilerimizin beklentilerini aşmak ve güvenilir bir partner olmak.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Değerlerimiz</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl shadow-black/50 hover:border-[#D4AF37]/50 transition-all duration-300 transform hover:-translate-y-2 text-center"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-4 rounded-full">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
