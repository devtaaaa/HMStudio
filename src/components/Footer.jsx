import { MapPin, Phone, Share2, MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/919690604109';
const INSTAGRAM_LINK = 'https://www.instagram.com/thehairmaster';
const GMB_LINK = 'https://share.google/gYqa9NwVvwT6Lfk2F';

const quickLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#location', label: 'Location' },
];

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site Footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">The Hair Master</div>
            <p className="footer-tagline">
              A sanctuary of precision craftsmanship and unrivaled luxury. Where every detail is mastered and every client is celebrated.
            </p>
            <div className="footer-social" aria-label="Social Media Links">
              <a
                id="footer-whatsapp"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
              <a
                id="footer-instagram"
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Follow us on Instagram"
              >
                <Share2 size={17} />
              </a>
              <a
                id="footer-maps"
                href={GMB_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="View on Google Maps"
              >
                <MapPin size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-section-title">Quick Links</div>
            <ul className="footer-links" role="list">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="footer-link"
                    onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-section-title">Contact</div>
            <div>
              <div className="footer-contact-item">
                <Phone size={14} className="icon" />
                <a href="tel:+919690604109" style={{ color: 'inherit' }}>+91 96906 04109</a>
              </div>
              <div className="footer-contact-item">
                <MessageCircle size={14} className="icon" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  Book via WhatsApp
                </a>
              </div>
              <div className="footer-contact-item">
                <Share2 size={14} className="icon" />
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  @thehairmaster
                </a>
              </div>
              <div className="footer-contact-item" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--clr-border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', lineHeight: 1.6 }}>
                  Open 7 days a week.<br />
                  Monday–Friday: 9am–8pm<br />
                  Sat: 8am–9pm · Sun: 10am–6pm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} The Hair Master. All rights reserved. Crafted with precision.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
