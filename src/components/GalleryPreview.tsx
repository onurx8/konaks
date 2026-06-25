//onurx
import { useState } from 'react';
import { Images, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import salonic1Image from './fotos/saloniç/saloniç1.jpg';
import salonsahneImage from './fotos/saloniç/salonsahne.jpg';
import salonikigirisImage from './fotos/saloniç/salonikigiris.jpg';
import gelinodasiImage from './fotos/saloniç/gelinodası.jpg';

interface GalleryPreviewProps {
  onViewAll: () => void;
}

function GalleryPreview({ onViewAll }: GalleryPreviewProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const previewImages = [
    { id: 1, url: salonic1Image, alt: 'Salon Genel Görünüm' },
    { id: 2, url: salonsahneImage, alt: 'Salon İç Mekan' },
    { id: 3, url: salonikigirisImage, alt: 'Çiçek Dekorasyonu' },
    { id: 4, url: gelinodasiImage, alt: 'Düğün Çifti' },
  ];

  const handleViewAll = () => {
    onViewAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 px-3 sm:px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center mb-5">
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 rounded-full gold-glow">
              <Images className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">
            Galeri Önizleme
          </h2>
          <div className="luxury-divider w-24 sm:w-32 mx-auto mb-5" />
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            Salonumuzun en güzel anlarını keşfedin. Tüm görselleri görmek için galeri sayfasını ziyaret edin.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group cursor-pointer overflow-hidden rounded-xl glass-card border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 touch-manipulation aspect-square shadow-2xl shadow-black/50"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold text-xs sm:text-sm p-2 sm:p-3">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={handleViewAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-[#B8860B] hover:to-[#D4AF37] transition-all shadow-2xl shadow-[#D4AF37]/20 transform touch-manipulation min-h-[48px] sm:min-h-[52px] gold-glow"
          >
            <span>Tüm Salon Resimleri</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 sm:p-4 safe-area-top safe-area-bottom"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white hover:text-[#D4AF37] transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Kapat"
            >
              <X className="h-7 w-7 sm:h-8 sm:w-8" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Büyütülmüş görsel"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GalleryPreview;
