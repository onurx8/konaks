import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import salonic1Image from '../components/fotos/saloniç/saloniç1.jpg';
import salonsahneImage from '../components/fotos/saloniç/salonsahne.jpg';
import salonikigirisImage from '../components/fotos/saloniç/salonikigiris.jpg';
import gelinodasiImage from '../components/fotos/saloniç/gelinodası.jpg';

type Category = 'all' | 'salon' | 'smallSalon' | 'decoration' | 'wedding' | 'food';

interface GalleryImage {
  id: number;
  url: string;
  category: Category;
  alt: string;
}

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Touch/swipe state for lightbox
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const categories = [
    { id: 'all' as Category, label: 'Tümü' },
    { id: 'salon' as Category, label: 'Salon' },
    { id: 'smallSalon' as Category, label: 'Küçük Salon' },
    { id: 'decoration' as Category, label: 'Dekorasyon' },
    { id: 'wedding' as Category, label: 'Düğünler' },
    { id: 'food' as Category, label: 'Yemek' },
  ];

  const images: GalleryImage[] = [
    { id: 1, url: salonic1Image, category: 'salon', alt: 'Salon Genel Görünüm' },
    { id: 2, url: salonsahneImage, category: 'salon', alt: 'Salon İç Mekan' },
    { id: 13, url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'smallSalon', alt: 'Küçük Salon Genel Görünüm' },
    { id: 14, url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'smallSalon', alt: 'Küçük Salon İç Mekan' },
    { id: 15, url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'smallSalon', alt: 'Küçük Salon Detay' },
    { id: 3, url: salonikigirisImage, category: 'decoration', alt: 'Çiçek Dekorasyonu' },
    { id: 4, url: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'decoration', alt: 'Masa Düzeni' },
    { id: 5, url: gelinodasiImage, category: 'wedding', alt: 'Düğün Çifti' },
    { id: 6, url: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'wedding', alt: 'Düğün Anı' },
    { id: 7, url: 'https://images.pexels.com/photos/1788948/pexels-photo-1788948.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'food', alt: 'Yemek Sunumu' },
    { id: 8, url: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'food', alt: 'Yemek Servisi' },
    { id: 9, url: 'https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'decoration', alt: 'Işık Dekorasyonu' },
    { id: 10, url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'wedding', alt: 'Etkinlik Anı' },
    { id: 11, url: 'https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'salon', alt: 'Sahne Görünümü' },
    { id: 12, url: 'https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'food', alt: 'Aperatif İkramlar' },
  ];

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return images;
    return images.filter(img => img.category === selectedCategory);
  }, [selectedCategory, images]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  }, [selectedIndex, filteredImages.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1);
    }
  }, [selectedIndex, filteredImages.length]);

  // Swipe handlers for lightbox
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    // Only trigger if horizontal swipe is dominant and > 50px
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartRef.current = null;
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  useEffect(() => {
    // Prevent scrolling when lightbox is open
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Banner */}
      <div className="relative h-[250px] sm:h-[300px] flex items-center justify-center mt-20 overflow-hidden border-b border-white/5">
        
        {/* Massive Static Text Background (Watermark) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 select-none">
          <span className="text-[45px] sm:text-[80px] md:text-[130px] lg:text-[200px] xl:text-[280px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] tracking-tighter whitespace-nowrap drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            ÇETİN KONAK
          </span>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F3E5AB] drop-shadow-[0_4px_10px_rgba(0,0,0,1)] tracking-wide mb-3 sm:mb-4"
          >
            Galeri
          </motion.h1>
          <div className="luxury-divider w-20 sm:w-24 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-300 text-base sm:text-lg px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            Çetin Konak Düğün Salonu'nun En Özel Kareleri
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedIndex(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-8 py-2 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all shadow-lg touch-manipulation min-h-[44px] ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-[#D4AF37]/30 border border-transparent'
                  : 'glass-card text-gray-300 hover:text-white hover:border-[#D4AF37]/50 hover:bg-white/5'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Premium Grid Gallery */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] bg-black/40 border border-white/10 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500"
                onClick={() => setSelectedIndex(index)}
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                
                {/* Overlay on hover & active (touch) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end pb-6 sm:pb-8">
                  <ZoomIn className="text-[#D4AF37] h-8 w-8 sm:h-10 sm:w-10 mb-3 transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 transition-all duration-500" />
                  <p className="text-white font-bold text-sm sm:text-base tracking-wide transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 transition-all duration-500 delay-75">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-6"
            onClick={() => setSelectedIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-black/50 hover:bg-[#D4AF37] text-gray-300 hover:text-white border border-white/20 hover:border-[#D4AF37] rounded-full p-2 sm:p-3 transition-all duration-300 z-50 touch-manipulation"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              aria-label="Kapat"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </motion.button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-1 sm:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#D4AF37] text-gray-300 hover:text-white border border-white/20 hover:border-[#D4AF37] rounded-full p-1.5 sm:p-4 transition-all duration-300 z-50 touch-manipulation"
                  onClick={handlePrev}
                  aria-label="Önceki"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-8 sm:w-8" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-1 sm:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#D4AF37] text-gray-300 hover:text-white border border-white/20 hover:border-[#D4AF37] rounded-full p-1.5 sm:p-4 transition-all duration-300 z-50 touch-manipulation"
                  onClick={handleNext}
                  aria-label="Sonraki"
                >
                  <ChevronRight className="h-5 w-5 sm:h-8 sm:w-8" />
                </motion.button>
              </>
            )}

            {/* Full Size Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.8, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: -50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] w-full flex justify-center items-center px-2 sm:px-8 md:px-16 lg:px-24"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedIndex].url}
                alt={filteredImages[selectedIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,1)] border border-white/10"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="bg-black/70 text-white px-4 py-2 rounded-full text-xs sm:text-sm backdrop-blur-md border border-white/10">
                  {filteredImages[selectedIndex].alt} ({selectedIndex + 1} / {filteredImages.length})
                </span>
              </div>
            </motion.div>

            {/* Swipe hint on mobile */}
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none sm:hidden">
              <span className="text-gray-500 text-xs">← Kaydırarak gezin →</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
