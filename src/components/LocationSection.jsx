import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_LINK = 'https://wa.me/919690604109';
const GMB_LINK = 'https://share.google/gYqa9NwVvwT6Lfk2F';
const PHONE = '+91 96906 04109';

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 8:00 PM', open: true },
  { day: 'Saturday', time: '8:00 AM – 9:00 PM', open: true },
  { day: 'Sunday', time: '10:00 AM – 6:00 PM', open: true },
];

export default function LocationSection() {
  const { openDrawer } = useBooking();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.location-detail', {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from('.location-map-card', {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="location section" id="location" ref={sectionRef} aria-label="Location and Contact">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Find Us</div>
          <h2>
            Visit Our<br />
            <em style={{ color: 'var(--clr-gold)', fontStyle: 'italic' }}>Sanctuary</em>
          </h2>
          <div className="divider" />
        </div>

        <div className="location-grid">
          {/* Info */}
          <div className="location-info">
            <div className="location-detail">
              <div className="location-detail-icon" aria-hidden="true"><MapPin size={18} /></div>
              <div className="location-detail-content">
                <div className="location-detail-label">Address</div>
                <div className="location-detail-value">
                  The Hair Master Salon<br />
                  Luxury Grooming Destination<br />
                  Contact us on WhatsApp for precise directions.
                </div>
              </div>
            </div>

            <div className="location-detail">
              <div className="location-detail-icon" aria-hidden="true"><Phone size={18} /></div>
              <div className="location-detail-content">
                <div className="location-detail-label">Phone / WhatsApp</div>
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="location-detail-value"
                  style={{ color: 'var(--clr-gold)', fontWeight: 600, letterSpacing: '0.05em' }}
                >
                  {PHONE}
                </a>
              </div>
            </div>

            <div className="location-detail">
              <div className="location-detail-icon" aria-hidden="true"><Clock size={18} /></div>
              <div className="location-detail-content">
                <div className="location-detail-label">Opening Hours</div>
                <div className="location-hours">
                  {hours.map((h) => (
                    <div key={h.day} className="location-hours-row">
                      <span className="location-hours-day">{h.day}</span>
                      <span className={`location-hours-time${h.open ? ' open' : ''}`}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="location-ctas">
              <a
                id="call-now-btn"
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Phone size={14} />
                Call Now
              </a>
              <a
                id="whatsapp-contact-btn"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <MessageCircle size={14} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Map Card */}
          <a
            id="google-maps-btn"
            href={GMB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="location-map-card"
            aria-label="Open The Hair Master on Google Maps"
          >
            <div className="location-map-preview">
              <div className="location-map-pin" aria-hidden="true">📍</div>
              <div className="location-map-salon-name">The Hair Master</div>
              <p className="location-map-address">
                Luxury Bespoke Grooming Salon<br />
                Open 7 Days a Week
              </p>
              <div className="location-map-cta">
                <ExternalLink size={12} />
                View on Google Maps
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
