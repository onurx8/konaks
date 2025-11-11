//onurx
import { useState } from 'react';
import { Images, ArrowRight, X } from 'lucide-react';
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
    <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-3 rounded-full">
              <Images className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Galeri Önizleme
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Salonumuzun en güzel anlarını keşfedin. Tüm görselleri görmek için galeri sayfasını ziyaret edin.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
          {previewImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl active:shadow-xl transition-all duration-300 transform active:scale-[0.98] hover:-translate-y-2 touch-manipulation aspect-square"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold text-xs sm:text-sm p-2 sm:p-3">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-[#B8860B] hover:to-[#D4AF37] active:from-[#A67A0A] active:to-[#B8860B] transition-all shadow-lg hover:shadow-xl active:shadow-md transform active:scale-95 hover:scale-105 touch-manipulation min-h-[48px] sm:min-h-[52px]"
          >
            <span>Tüm Salon Resimleri</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 sm:p-4 safe-area-top safe-area-bottom"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white hover:text-[#D4AF37] active:text-[#B8860B] transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Kapat"
          >
            <X className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>
          <img
            src={selectedImage}
            alt="Büyütülmüş görsel"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default GalleryPreview;

