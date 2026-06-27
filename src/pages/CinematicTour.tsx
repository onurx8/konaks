//onurx
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface CinematicTourProps {
  onNavigate: (page: 'home' | 'about' | 'venue' | 'gallery' | 'contact' | 'reservation') => void;
}

function CinematicTour({ onNavigate }: CinematicTourProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [loadedCount, setLoadedCount] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Images cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const TOTAL_FRAMES = 277;

  // Animation values (Refs to prevent re-renders on scroll loop)
  const targetFrameRef = useRef(0);
  const interpolatedFrameRef = useRef(0);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Preload all 277 images
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(3, '0');
      img.src = `/fotos/tour/ezgif-frame-${frameStr}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Setup the canvas rendering and lerp loop
  useEffect(() => {
    if (!isImagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      // Smooth interpolation (lerp) for the frame index
      const diff = targetFrameRef.current - interpolatedFrameRef.current;
      interpolatedFrameRef.current += diff * 0.1; // Smoothness factor (lower = smoother)

      const currentFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(interpolatedFrameRef.current)));
      const img = imagesRef.current[currentFrame];

      if (img && img.complete) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Resize canvas to match screen dimensions if needed
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        ctx.clearRect(0, 0, width, height);

        // Enable standard image smoothing for fast rendering
        ctx.imageSmoothingEnabled = true;

        // Aspect-ratio cover calculation (similar to CSS object-cover)
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
        } else {
          drawHeight = width / imgRatio;
          offsetY = (height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isImagesLoaded]);

  // Scroll listener mapped to frame index
  useEffect(() => {
    if (!isImagesLoaded) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const progress = window.scrollY / scrollHeight;
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      targetFrameRef.current = clampedProgress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isImagesLoaded]);

  const handleSkip = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preloader UI Screen (Minimal, clean, dark)
  if (!isImagesLoaded) {
    const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center text-white font-serif">
        <div className="relative flex flex-col items-center space-y-6">
          <div className="absolute w-64 h-64 bg-[#D4AF37]/5 blur-3xl rounded-full" />
          
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-white/5" />
            <div 
              className="absolute inset-0 rounded-full border-2 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent animate-spin" 
              style={{ animationDuration: '1s' }}
            />
            <span className="font-mono text-sm text-[#D4AF37]">{percent}%</span>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-sm tracking-widest uppercase text-white font-bold">Sinematik Tur Yükleniyor</h2>
            <p className="text-xs text-neutral-500 font-sans">Kareler hazırlanıyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-[#0a0a0a] ${isMobile ? 'min-h-[350vh]' : 'min-h-[550vh]'}`}>
      {/* FIXED CANVAS FOR 3D IMAGE SEQUENCE */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-neutral-950 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-opacity duration-700 opacity-100"
        />
        {/* Soft color-grading dark overlays for premium aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-neutral-950/40 pointer-events-none" />
      </div>

      {/* Skip / Exit Button */}
      <button
        onClick={handleSkip}
        className="fixed top-20 sm:top-24 right-3 sm:right-6 z-50 bg-black/60 hover:bg-[#D4AF37] text-gray-300 hover:text-white border border-white/20 hover:border-[#D4AF37] rounded-full px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-300 touch-manipulation min-h-[44px] flex items-center space-x-1.5 sm:space-x-2 backdrop-blur-md"
        aria-label="Turu Atla"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-xs sm:text-sm font-medium">Turu Atla</span>
      </button>
    </div>
  );
}

export default CinematicTour;
