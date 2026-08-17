import { useState } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import BookingDrawer from './components/BookingDrawer';
import Testimonials from './components/Testimonials';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import { ShoppingBag, MessageCircle } from 'lucide-react';

const marqueeItems = [
  'Precision Haircuts', 'Global Colour', 'Keratin Treatments',
  'Luxury Head Massage', 'Premium Waxing', 'Skin Facials',
  'Beard Styling', 'Nano Plastia', 'Botox Treatments',
  'Manicure & Pedicure', 'Hair Spa', 'Threading',
];

function FloatingActions() {
  const { cartItems, openDrawer } = useBooking();
  return (
    <>
      {/* Floating Booking Button */}
      <button
        id="floating-book-btn"
        className="floating-book-btn"
        onClick={openDrawer}
        aria-label={`Open booking, ${cartItems.length} services selected`}
      >
        <ShoppingBag size={16} />
        Book Now
        {cartItems.length > 0 && (
          <span className="floating-book-btn-badge">{cartItems.length}</span>
        )}
      </button>

      {/* WhatsApp Sticky */}
      <a
        id="whatsapp-sticky-btn"
        href="https://wa.me/919690604109"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-sticky"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={22} color="white" />
      </a>
    </>
  );
}

function AppContent() {
  return (
    <>
      <div className="glow-bg"></div>
      <Navbar />
      <main>
        <HeroSection />

        {/* Marquee Strip */}
        <div className="marquee-strip" aria-hidden="true">
          <div className="marquee-inner">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="marquee-item">{item}</div>
            ))}
          </div>
        </div>

        <AboutSection />
        <ServicesSection />
        <Testimonials />
        <LocationSection />
      </main>
      <Footer />
      <BookingDrawer />
      <FloatingActions />
    </>
  );
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <BookingProvider>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      {preloaderDone && <AppContent />}
    </BookingProvider>
  );
}
