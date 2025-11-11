//onurx
import { ArrowRight } from 'lucide-react';

interface AboutPreviewProps {
  onReadMore: () => void;
}

function AboutPreview({ onReadMore }: AboutPreviewProps) {
  const handleReadMore = () => {
    onReadMore();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Çetin Konak Düğün Salonu"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Hakkımızda
            </h2>
            <div className="w-20 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Çetin Konak Düğün Salonu, 2022 yılında Çetin ailesi tarafından Bursa ili Karacabey ilçesi Esentepe mahallesinde kuruldu. Kaliteli hizmet ve müşteri memnuniyetiyle binlerce çiftin mutluluğuna şahit olduk.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              Amacımız, en özel gününüzü unutulmaz bir anıya dönüştürmek ve her detayda mükemmelliği yakalamaktır.
            </p>
            <button
              onClick={handleReadMore}
              className="inline-flex items-center space-x-2 bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#B8860B] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Devamını Oku</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
