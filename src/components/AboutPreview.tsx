import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutPreviewProps {
  onReadMore: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

function AboutPreview({ onReadMore }: AboutPreviewProps) {
  const handleReadMore = () => {
    onReadMore();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          
          {/* Image Section (Smaller width on desktop to look more elegant) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="md:col-span-2 relative h-[300px] sm:h-[350px] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/5 group"
          >
            <div className="absolute inset-0 bg-[#D4AF37]/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
            <img
              src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Çetin Konak Düğün Salonu"
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
          </motion.div>

          {/* Text Section with Staggered Transition */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="md:col-span-3 flex flex-col justify-center"
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-wide">
              Hakkımızda
            </motion.h2>
            
            <motion.div variants={itemVariants} className="luxury-divider w-16 mb-5" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
            
            <motion.p variants={itemVariants} className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base font-light">
              Çetin Konak Düğün Salonu, 2022 yılında Çetin ailesi tarafından Bursa ili Karacabey ilçesi Esentepe mahallesinde kuruldu. Kaliteli hizmet ve müşteri memnuniyetiyle binlerce çiftin mutluluğuna şahit olduk.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base font-light">
              Amacımız, en özel gününüzü unutulmaz bir anıya dönüştürmek ve her detayda mükemmelliği yakalamaktır.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <button
                onClick={handleReadMore}
                className="group relative inline-flex items-center space-x-2 text-[#D4AF37] text-sm font-medium tracking-wider uppercase hover:text-white transition-colors duration-300"
              >
                <span>Devamını Oku</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
