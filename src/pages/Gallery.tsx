//onurx
import { useState } from 'react';
import { X } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Galeri</h1>
          <div className="w-20 sm:w-24 h-1 bg-[#D4AF37] mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-200 text-base sm:text-lg px-2">Çetin Konak Düğün Salonu'nun Görselleri</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all transform active:scale-95 hover:scale-105 touch-manipulation min-h-[44px] ${
                selectedCategory === category.id
                  ? 'bg-[#D4AF37] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl active:shadow-xl transition-all duration-300 transform active:scale-[0.98] hover:-translate-y-2 touch-manipulation"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-56 sm:h-64 md:h-72 object-cover group-hover:scale-110 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold text-sm sm:text-base p-3 sm:p-4">{image.alt}</p>
              </div>
            </div>
          ))}
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
    </div>
  );
}

export default Gallery;
