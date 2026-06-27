//onurx
import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AboutPreview from './components/AboutPreview';
import GalleryPreview from './components/GalleryPreview';
import About from './pages/About';
import VenueDetails from './pages/VenueDetails';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import CinematicTour from './pages/CinematicTour';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Preloader from './components/Preloader';

// Lazy-load the heavy 3D scene so the initial paint is fast
const Scene3D = lazy(() => import('./components/Scene3D'));

type Page = 'home' | 'about' | 'venue' | 'gallery' | 'contact' | 'reservation' | 'tour';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for the 3D scene
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
      setScrollProgress(0);
      return;
    }
    const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'venue':
        return <VenueDetails />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact onNavigate={setCurrentPage} />;
      case 'reservation':
        return <Reservation />;
      case 'tour':
        return <CinematicTour onNavigate={setCurrentPage} />;
      default:
        return (
          <>
            <Hero 
              onReservation={() => setCurrentPage('reservation')} 
              onGallery={() => setCurrentPage('gallery')}
              onTour={() => setCurrentPage('tour')}
            />
            <Features />
            <GalleryPreview onViewAll={() => setCurrentPage('gallery')} />
            {/* 3D yazının ve simgenin net görünmesi için boşluk (eski Hakkımızda alanının yeri) */}
            <div className="h-[55vh] sm:h-[70vh] md:h-[70vh] w-full pointer-events-none" />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative">
      <Preloader />
      
      {/* Global 3D Background Canvas */}
      <Suspense fallback={null}>
        <Scene3D scrollProgress={scrollProgress} currentPage={currentPage} />
      </Suspense>

      {/* Content Layer — sits above the 3D scene */}
      <div className="relative z-10">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        {renderPage()}
        <Footer onNavigate={setCurrentPage} />
        <FloatingButtons />
      </div>
    </div>
  );
}

export default App;
