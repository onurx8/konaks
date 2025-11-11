//onurx
import { useState } from 'react';
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
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

type Page = 'home' | 'about' | 'venue' | 'gallery' | 'contact' | 'reservation';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

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
      default:
        return (
          <>
            <Hero 
              onReservation={() => setCurrentPage('reservation')} 
              onGallery={() => setCurrentPage('gallery')}
            />
            <Features />
            <GalleryPreview onViewAll={() => setCurrentPage('gallery')} />
            <AboutPreview onReadMore={() => setCurrentPage('about')} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />
      <FloatingButtons />
    </div>
  );
}

export default App;
