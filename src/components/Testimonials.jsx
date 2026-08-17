import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ count }) {
  return (
    <div className="testimonial-stars" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials section" id="testimonials" ref={sectionRef} aria-label="Client Testimonials">
      <div className="container">
        <div className="testimonials-header">
          <div className="section-label" style={{ justifyContent: 'center' }}>Client Love</div>
          <h2>
            What Our Clients<br />
            <em style={{ color: 'var(--clr-gold)', fontStyle: 'italic' }}>Say</em>
          </h2>
          <div className="divider" />
          <p style={{ maxWidth: '440px', margin: '0 auto' }}>
            5-star experiences, every time. Don't just take our word for it.
          </p>
        </div>

        <div className="testimonials-slider" role="list">
          {testimonials.map((t) => (
            <article key={t.id} className="testimonial-card glass-card" role="listitem" aria-label={`Review by ${t.author}`}>
              <StarRating count={t.rating} />
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-author-avatar" aria-hidden="true">{t.initial}</div>
                <div>
                  <div className="testimonial-author-name">{t.author}</div>
                  <div className="testimonial-author-service">{t.service}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
