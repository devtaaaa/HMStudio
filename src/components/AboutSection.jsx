import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '✦',
    title: 'Bespoke Artistry',
    text: 'Every service is personally curated to your unique hair profile and style vision.',
  },
  {
    icon: '💎',
    title: 'Premium Products',
    text: 'Exclusively stocking L\'Oreal, Matrix, Inoa & luxury professional haircare brands.',
  },
  {
    icon: '🕊',
    title: 'Tranquil Ambiance',
    text: 'A sanctuary designed for total relaxation — from the moment you walk in.',
  },
  {
    icon: '✂️',
    title: 'Master Precision',
    text: 'Years of dedicated craft delivering editorial-grade results every single visit.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(contentRef.current?.children, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
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
    <section className="about section" id="about" ref={sectionRef} aria-label="About The Hair Master">
      <div className="container">
        <div className="about-grid">
          {/* Images */}
          <div className="about-image-wrapper" ref={imageRef}>
            <div className="about-image-main glass-card">
              <img
                src="/images/media__1786956944786.jpg"
                alt="Master styling precision at The Hair Master salon"
                loading="lazy"
              />
            </div>

          </div>

          {/* Content */}
          <div className="about-content" ref={contentRef}>
            <div className="section-label">Our Story</div>

            <h2>
              Where Every Strand<br />
              Tells a <em style={{ color: 'var(--clr-gold)', fontStyle: 'italic' }}>Story</em>
            </h2>

            <p style={{ lineHeight: 1.9 }}>
              THE HAIR MASTER was born from a singular obsession — the pursuit of perfection in every cut, colour, and treatment. Founded with an editorial eye and a master's precision, our salon is a destination for those who demand the extraordinary.
            </p>

            <p style={{ lineHeight: 1.9 }}>
              Nestled in the heart of the city, our sanctuary blends luxurious ambiance with bespoke artistry. From precision haircuts and transformative global colours to indulgent spa treatments and expert skincare, every experience at The Hair Master is crafted exclusively for you.
            </p>

            <div className="about-features">
              {features.map((f) => (
                <div key={f.title} className="about-feature">
                  <div className="about-feature-icon">{f.icon}</div>
                  <div className="about-feature-title">{f.title}</div>
                  <div className="about-feature-text">{f.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
