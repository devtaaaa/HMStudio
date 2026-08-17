import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { womenServices, menServices } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({ service, categoryId }) {
  const { addToCart, cartItems } = useBooking();

  const handleAdd = (serviceName, price, variantName) => {
    const id = `${categoryId}-${serviceName}-${variantName || ''}`;
    addToCart({ id, name: serviceName, variant: variantName || null, price, category: categoryId });
  };

  const isAdded = (serviceName, variantName) => {
    const id = `${categoryId}-${serviceName}-${variantName || ''}`;
    return cartItems.some((i) => i.id === id);
  };

  return (
    <div className="service-card">
      <div className="service-card-name">{service.name}</div>
      <div className="service-card-variants">
        <div className="service-card-variant">
          <span className="service-card-variant-price">₹{service.price.toLocaleString('en-IN')}</span>
        </div>
      </div>
      <button
        className={`service-card-add${isAdded(service.name, null) ? ' added' : ''}`}
        onClick={() => handleAdd(service.name, service.price, null)}
        aria-label={`Add ${service.name} to booking`}
        id={`add-${categoryId}-${service.name.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {isAdded(service.name, null) ? (
          <><Check size={12} /> Added</>
        ) : (
          <><Plus size={12} /> Add to Booking</>
        )}
      </button>
    </div>
  );
}

function CategoryAccordion({ cat }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="services-category">
      <div
        className={`services-category-header${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
        id={`accordion-${cat.id}`}
      >
        <span className="services-category-title">
          <span className="services-category-icon">{cat.icon}</span>
          {cat.category}
          <span className="services-category-count">{cat.services.length} services</span>
        </span>
        <span className={`services-category-chevron${open ? ' open' : ''}`}>
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </div>

      <div className={`services-category-body${open ? ' open' : ''}`}>
        <div className="services-grid">
          {cat.services.map((s) => (
            <ServiceCard key={s.name} service={s} categoryId={cat.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('women');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const services = activeTab === 'women' ? womenServices : menServices;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children, {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services section" id="services" ref={sectionRef} aria-label="Services Catalog">
      <div className="container">
        {/* Header */}
        <div className="services-header" ref={headerRef}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Service Catalog</div>
          <h2>
            Curated for Your<br />
            <em style={{ color: 'var(--clr-gold)', fontStyle: 'italic' }}>Excellence</em>
          </h2>
          <div className="divider" />
          <p style={{ maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Every service is delivered with master precision using premium professional-grade products.
          </p>
        </div>

        {/* Feature Thumbnails */}
        <div className="services-features">
          <div className="services-feature-card glass-card">
            <img src="/images/media__1786953577102.jpg" alt="Precision haircut service" loading="lazy" />
            <div className="services-feature-overlay">
              <div className="services-feature-label">Signature</div>
              <div className="services-feature-title">Precision Haircuts</div>
            </div>
          </div>
          <div className="services-feature-card glass-card">
            <img src="/images/media__1786953577129.jpg" alt="Global hair colour and balayage" loading="lazy" />
            <div className="services-feature-overlay">
              <div className="services-feature-label">Colour Art</div>
              <div className="services-feature-title">Global Colour & Balayage</div>
            </div>
          </div>
          <div className="services-feature-card glass-card">
            <img src="/images/media__1786953576905.jpg" alt="Luxury head massage and spa" loading="lazy" />
            <div className="services-feature-overlay">
              <div className="services-feature-label">Wellness</div>
              <div className="services-feature-title">Hair Spa & Massage</div>
            </div>
          </div>
        </div>

        {/* Gender Tabs */}
        <div className="services-tabs" role="tablist" aria-label="Service category tabs">
          <button
            id="tab-womens"
            role="tab"
            aria-selected={activeTab === 'women'}
            className={`services-tab${activeTab === 'women' ? ' active' : ''}`}
            onClick={() => setActiveTab('women')}
          >
            Women's Suite
          </button>
          <button
            id="tab-mens"
            role="tab"
            aria-selected={activeTab === 'men'}
            className={`services-tab${activeTab === 'men' ? ' active' : ''}`}
            onClick={() => setActiveTab('men')}
          >
            Men's Lounge
          </button>
        </div>

        {/* Accordion Categories */}
        <div role="tabpanel" aria-labelledby={activeTab === 'women' ? 'tab-womens' : 'tab-mens'}>
          {services.map((cat) => (
            <CategoryAccordion key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
