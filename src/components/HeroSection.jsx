import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '../context/BookingContext';
import { ChevronDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { openDrawer } = useBooking();
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctasRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const scrollRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0)
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.15)
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.35)
      .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.5)
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.65)
      .to(imageRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, 0.3)
      .to(scrollRef.current, { opacity: 1, duration: 0.5 }, 1.2);

    // Subtle parallax on scroll
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => tl.kill();
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero Section">
      <div className="hero-bg-image" ref={parallaxRef}>
        <img src="/images/media__1786956944786.jpg" alt="Luxury salon interior background" loading="eager" />
      </div>
      <div className="hero-overlay" />

      <div className="container">
        <div className="hero-inner">
          {/* Content */}
          <div className="hero-content">
            <div ref={eyebrowRef} className="hero-eyebrow" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              Est. Since 2020 · Luxury Grooming
            </div>

            <h1 ref={headlineRef} className="hero-headline" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              Precision<br />
              <em>Craftsmanship,</em><br />
              Unrivaled Luxury.
            </h1>

            <p ref={descRef} className="hero-description" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              Step into a world where every detail is mastered. THE HAIR MASTER — where bespoke artistry meets editorial elegance, crafting transformations that define your signature.
            </p>

            <div ref={ctasRef} className="hero-ctas" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <button
                id="hero-explore-btn"
                className="btn btn-primary"
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles size={15} />
                Explore Services
              </button>
              <button
                id="hero-book-btn"
                className="btn btn-outline"
                onClick={openDrawer}
              >
                Book Master Stylist
              </button>
            </div>

            <div ref={statsRef} className="hero-stats" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div className="hero-stat-item">
                <span className="hero-stat-number">5K+</span>
                <span className="hero-stat-label">Happy Clients</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">6+</span>
                <span className="hero-stat-label">Years Mastery</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">50+</span>
                <span className="hero-stat-label">Services</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="hero-image-wrapper"
            style={{ opacity: 0, transform: 'translateX(40px)' }}
          >
            <div className="hero-image-frame glass-card">
              <img
                src="/images/media__1786956944116.jpg"
                alt="Master Stylist at The Hair Master luxury salon"
                loading="eager"
              />
              <div className="hero-image-badge">
                <div className="hero-image-badge-name">The Hair Master</div>
                <div className="hero-image-badge-role">✦ Master Stylist & Founder</div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="hero-parallax-element hero-parallax-element--scissors">✂</div>
            <div className="hero-parallax-element hero-parallax-element--star">✦</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="hero-scroll-indicator" style={{ opacity: 0 }}>
        <span className="hero-scroll-indicator-text">Scroll</span>
        <div className="hero-scroll-indicator-line" />
        <ChevronDown size={14} color="var(--clr-gold)" style={{ marginTop: '-12px' }} />
      </div>
    </section>
  );
}
