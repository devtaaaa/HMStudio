import { useState, useEffect, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import { ShoppingBag, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#location', label: 'Location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, openDrawer } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main Navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
            <span className="navbar-logo-title">The Hair Master</span>
            <span className="navbar-logo-sub">Luxury Bespoke Salon</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar-link"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              id="navbar-booking-btn"
              className="btn btn-primary navbar-cta"
              onClick={openDrawer}
              aria-label={`Open booking drawer, ${cartItems.length} items in cart`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ShoppingBag size={14} />
              Book Now
              {cartItems.length > 0 && (
                <span className="floating-book-btn-badge">{cartItems.length}</span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              className="navbar-mobile-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close mobile menu">
          <X size={24} />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-menu-link"
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
          >
            {link.label}
          </a>
        ))}
        <button
          className="btn btn-primary"
          onClick={() => { setMenuOpen(false); openDrawer(); }}
          style={{ marginTop: '1rem' }}
        >
          Book Appointment
        </button>
      </div>
    </>
  );
}
