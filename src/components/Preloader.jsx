import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const crestRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const barRef = useRef(null);
  const barFillRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = 'none';
            }
            onComplete?.();
          },
        });
      },
    });

    tl.to(crestRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.3)
      .to(logoRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.6)
      .to(taglineRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.0)
      .to(barRef.current, { opacity: 1, duration: 0.3 }, 1.1)
      .to(barFillRef.current, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, 1.2)
      .to(
        logoRef.current,
        {
          textShadow: '0 0 30px rgba(212,175,55,0.9), 0 0 80px rgba(212,175,55,0.4)',
          duration: 0.6,
          ease: 'power2.inOut',
        },
        1.8
      )
      .to(
        logoRef.current,
        { textShadow: '0 0 10px rgba(212,175,55,0.2)', duration: 0.4 },
        2.5
      );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div id="preloader" ref={preloaderRef}>
      <div ref={crestRef} className="preloader-crest" style={{ transform: 'translateY(20px)', opacity: 0 }}>
        ✦
      </div>
      <div ref={logoRef} className="preloader-logo" style={{ transform: 'translateY(20px)', opacity: 0 }}>
        The Hair Master
      </div>
      <div ref={taglineRef} className="preloader-tagline" style={{ opacity: 0 }}>
        Precision Craftsmanship · Unrivaled Luxury
      </div>
      <div ref={barRef} className="preloader-bar" style={{ opacity: 0 }}>
        <div ref={barFillRef} className="preloader-bar-fill" />
      </div>
    </div>
  );
}
