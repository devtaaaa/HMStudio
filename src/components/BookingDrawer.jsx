import { useState, useEffect, useRef } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const WHATSAPP_NUMBER = '919690604109';

const timeSlots = [
  { id: 'morning', label: 'Morning', icon: '🌅', range: '9am–12pm' },
  { id: 'afternoon', label: 'Afternoon', icon: '☀️', range: '12pm–4pm' },
  { id: 'evening', label: 'Evening', icon: '🌆', range: '4pm–8pm' },
];

function buildWhatsAppMessage({ name, phone, date, time, cartItems, total }) {
  const serviceLines = cartItems
    .map((i) => `- ${i.name}${i.variant ? ` (${i.variant})` : ''} (₹${i.price.toLocaleString('en-IN')})`)
    .join('\n');

  const msg = `✨ *NEW APPOINTMENT BOOKING - THE HAIR MASTER* ✨
----------------------------------------
👤 *Client Name:* ${name}
📞 *Phone:* ${phone}
📅 *Date:* ${date}
⏰ *Preferred Time:* ${time}

✂️ *Selected Services:*
${serviceLines}

💰 *Estimated Total:* ₹${total.toLocaleString('en-IN')}
----------------------------------------
📍 *Source:* Website Booking Engine
Please confirm my slot availability.`;

  return encodeURIComponent(msg);
}

export default function BookingDrawer() {
  const { cartItems, removeFromCart, clearCart, total, isDrawerOpen, closeDrawer } = useBooking();

  const [form, setForm] = useState({ name: '', phone: '', date: '', time: 'morning' });
  const [errors, setErrors] = useState({});
  const drawerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeDrawer(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeDrawer]);

  // Get tomorrow's date as default minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your full name.';
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit number.';
    if (!form.date) errs.date = 'Please select a date.';
    if (cartItems.length === 0) errs.cart = 'Please add at least one service.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const timeLabel = timeSlots.find((t) => t.id === form.time)?.label + ' ' + timeSlots.find((t) => t.id === form.time)?.range;
    const encoded = buildWhatsAppMessage({ ...form, time: timeLabel, cartItems, total });
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`booking-overlay${isDrawerOpen ? ' open' : ''}`}
        onClick={closeDrawer}
        aria-hidden={!isDrawerOpen}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`booking-drawer${isDrawerOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Booking Drawer"
        id="booking-drawer"
      >
        {/* Header */}
        <div className="booking-drawer-header">
          <div className="booking-drawer-title">
            Book Your <span>Session</span>
          </div>
          <button className="booking-drawer-close" onClick={closeDrawer} aria-label="Close booking drawer">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="booking-drawer-body">
          {/* Cart Section */}
          <div className="booking-section-title">Selected Services</div>

          {cartItems.length === 0 ? (
            <div className="booking-cart-empty">
              <div className="booking-cart-empty-icon">
                <ShoppingBag size={40} color="var(--clr-text-muted)" />
              </div>
              <p className="booking-cart-empty-text">
                No services added yet.<br />Browse our catalog and click "Add to Booking".
              </p>
              {errors.cart && (
                <p style={{ color: '#ff6b6b', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.cart}</p>
              )}
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="booking-cart-item">
                  <div className="booking-cart-item-info">
                    <div className="booking-cart-item-name">{item.name}</div>
                    {item.variant && (
                      <div className="booking-cart-item-variant">{item.variant}</div>
                    )}
                  </div>
                  <div className="booking-cart-item-price">₹{item.price.toLocaleString('en-IN')}</div>
                  <button
                    className="booking-cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Total */}
              <div className="booking-total">
                <span className="booking-total-label">Estimated Total</span>
                <span className="booking-total-amount">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={clearCart}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  color: 'var(--clr-text-muted)', fontSize: '0.75rem',
                  marginBottom: '1.5rem', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b6b'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--clr-text-muted)'}
              >
                <Trash2 size={12} /> Clear all
              </button>
            </>
          )}

          {/* Form */}
          <div className="booking-section-title">Your Details</div>

          <form className="booking-form" onSubmit={handleSubmit} noValidate id="booking-form">
            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="booking-name">Full Name *</label>
              <input
                id="booking-name"
                type="text"
                className="form-input"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                autoComplete="name"
              />
              {errors.name && <span style={{ color: '#ff6b6b', fontSize: '0.75rem' }}>{errors.name}</span>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="booking-phone">Phone Number *</label>
              <input
                id="booking-phone"
                type="tel"
                className="form-input"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                autoComplete="tel"
                maxLength={10}
              />
              {errors.phone && <span style={{ color: '#ff6b6b', fontSize: '0.75rem' }}>{errors.phone}</span>}
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="booking-date">Preferred Date *</label>
              <input
                id="booking-date"
                type="date"
                className="form-input"
                min={minDate}
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
              {errors.date && <span style={{ color: '#ff6b6b', fontSize: '0.75rem' }}>{errors.date}</span>}
            </div>

            {/* Time Slot */}
            <div className="form-group">
              <label className="form-label">Preferred Time Slot *</label>
              <div className="form-radio-group">
                {timeSlots.map((slot) => (
                  <div key={slot.id} className="form-radio-option">
                    <input
                      type="radio"
                      id={`time-${slot.id}`}
                      name="time-slot"
                      value={slot.id}
                      checked={form.time === slot.id}
                      onChange={() => setForm((f) => ({ ...f, time: slot.id }))}
                    />
                    <label className="form-radio-label" htmlFor={`time-${slot.id}`}>
                      <span className="time-icon">{slot.icon}</span>
                      {slot.label}
                      <span className="time-range">{slot.range}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer / Submit */}
        <div className="booking-drawer-footer">
          <button
            id="whatsapp-book-btn"
            className="booking-whatsapp-btn"
            onClick={handleSubmit}
            disabled={cartItems.length === 0}
          >
            <MessageCircle size={18} />
            Confirm &amp; Book via WhatsApp
          </button>
          <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
            You'll be redirected to WhatsApp with your booking details pre-filled.
          </p>
        </div>
      </aside>
    </>
  );
}
