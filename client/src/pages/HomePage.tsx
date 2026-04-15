// HomePage — clone of hollaamericana.com/
// Sections:
//   1. Hero — full-screen bg image, "Experience / South America (script) / Like Never Before", BOOK NOW button, country pills
//   2. Our Destinations — light green bg, South America map + destination cards carousel
//   3. Featured Packages — white bg, "PACKAGES" watermark, masonry 4-col grid
//   4. Services (SIDEKICKS) — white bg, "SIDEKICKS" watermark, center image, 6 service items
//   5. Book Your Holidays — aerial bg image, enquiry form card
//   6. FAQ — white bg, accordion
//   7. Footer

import { useState, useRef } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PACKAGES } from "@/lib/packages-data";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451557766/jkbf5zEb7ZR2fZ38BvZD8g/hero-home_7c754bfa.jpg";
const BOOKING_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451557766/jkbf5zEb7ZR2fZ38BvZD8g/booking-bg_561f82d4.jpg";
const SERVICES_MAP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451557766/jkbf5zEb7ZR2fZ38BvZD8g/services-map_f4f16a7e.jpg";

const COUNTRIES = ["Peru", "Brazil", "Argentina", "Chile", "Bolivia", "Colombia", "Costa Rica", "Mexico"];

const DESTINATION_CARDS = [
  { countries: "Peru", label: "Inca Express • Peru", image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80" },
  { countries: "Brazil, Argentina, Chile, Peru", label: "4 Nations Journey", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80" },
  { countries: "Brazil, Argentina, Chile, Bolivia, Peru", label: "5 Countries Grand Tour", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80" },
  { countries: "Brazil, Argentina, Chile, Bolivia, Peru", label: "Latin America Grand Tour", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80" },
  { countries: "Peru", label: "Peru Group Tour", image: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&q=80" },
  { countries: "Brazil, Argentina, Chile, Peru", label: "Brazil • Argentina • Chile • Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80" },
];

const SERVICES = [
  { num: "1", icon: "✈", text: "Personalized airport transfers and seamless arrival assistance" },
  { num: "2", icon: "👥", text: "Private and small-group sightseeing tours infused with Indian cultural insights" },
  { num: "3", icon: "🚗", text: "Indian-operated vehicles and on-ground handling for maximum comfort" },
  { num: "4", icon: "🍽", text: "Guaranteed access to authentic Indian meals during your travels" },
  { num: "5", icon: "💬", text: "Multilingual Indian tour managers ensuring smooth communication" },
  { num: "6", icon: "⭐", text: "Premium luxury travel with dedicated customer support" },
];

const FAQS = [
  { q: "Which countries do you cover?", a: "We offer customized tours in Brazil, Argentina, Peru, Colombia, Costa Rica, and Mexico, focused on Indian travelers." },
  { q: "Are Indian meals available?", a: "Yes, we ensure access to authentic Indian cuisine at every major stop." },
  { q: "Are the tours suitable for NRIs?", a: "Absolutely, we tailor the experience with cultural familiarity and language support for NRIs." },
  { q: "What languages do the guides speak?", a: "Our Indian tour managers speak Hindi, English, Portuguese, and Spanish fluently." },
];

const FEATURED_PACKAGES = PACKAGES.slice(0, 8);

export default function HomePage() {
  const [, navigate] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAgent, setIsAgent] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({ name: "", pax: "", phone: "", email: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const scrollCarousel = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = 300 + 16;
    const maxIndex = DESTINATION_CARDS.length - 3;
    if (dir === "right" && carouselIndex < maxIndex) {
      setCarouselIndex(prev => prev + 1);
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    } else if (dir === "left" && carouselIndex > 0) {
      setCarouselIndex(prev => prev - 1);
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <div style={{ fontFamily: "'Sora', sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>
        <Navbar />

        {/* ── 1. HERO ── */}
        <section className="hp-hero">
          <img src={HERO_BG} alt="South America" className="hp-hero-bg" />
          <div className="hp-hero-overlay" />
          <div className="hp-hero-content">
            <h1 className="hp-hero-title">
              <span style={{ display: "block", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>Experience</span>
              <span style={{ display: "block", fontFamily: "'Dancing Script', cursive", fontWeight: 500, lineHeight: 1.1 }}>South America</span>
              <span style={{ display: "block", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>Like Never Before</span>
            </h1>
            <button
              onClick={() => navigate("/destinations")}
              className="hp-book-btn"
            >
              BOOK NOW
            </button>
          </div>
          {/* Country pills at bottom */}
          <div className="hp-country-pills">
            {COUNTRIES.map((c) => (
              <span key={c} className="hp-country-pill">{c}</span>
            ))}
          </div>
        </section>

        {/* ── 2. OUR DESTINATIONS ── */}
        <section className="hp-destinations">
          <div className="hp-destinations-inner">
            {/* Left: South America map */}
            <div className="hp-map-col">
              <svg viewBox="0 0 300 420" className="hp-map-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified South America outline */}
                <path d="M120,20 L180,15 L220,35 L240,70 L250,110 L245,150 L255,190 L260,230 L250,270 L235,310 L210,350 L185,390 L165,410 L150,415 L135,405 L120,380 L100,340 L85,300 L75,260 L70,220 L65,180 L60,140 L65,100 L75,65 L90,40 Z" fill="#C8EDD6" stroke="#00A63E" strokeWidth="2"/>
                {/* Country dots */}
                <circle cx="155" cy="120" r="6" fill="#00A63E"/>
                <text x="165" y="124" fontSize="11" fill="#333" fontFamily="Sora, sans-serif">Brazil</text>
                <circle cx="130" cy="200" r="6" fill="#00A63E"/>
                <text x="140" y="204" fontSize="11" fill="#333" fontFamily="Sora, sans-serif">Bolivia</text>
                <circle cx="110" cy="260" r="6" fill="#00A63E"/>
                <text x="120" y="264" fontSize="11" fill="#333" fontFamily="Sora, sans-serif">Chile</text>
                <circle cx="155" cy="280" r="6" fill="#00A63E"/>
                <text x="165" y="284" fontSize="11" fill="#333" fontFamily="Sora, sans-serif">Argentina</text>
                <circle cx="130" cy="160" r="6" fill="#00A63E"/>
                <text x="140" y="164" fontSize="11" fill="#333" fontFamily="Sora, sans-serif">Peru</text>
                <circle cx="80" cy="80" r="6" fill="#00A63E"/>
                <text x="90" y="84" fontSize="11" fill="#333" fontFamily="Sora, sans-serif">Colombia</text>
                <circle cx="75" cy="50" r="6" fill="#00A63E"/>
                <text x="85" y="54" fontSize="11" fill="#333" fontFamily="Sora, sans-serif">Costa Rica</text>
                <circle cx="60" cy="30" r="6" fill="#00A63E"/>
                <text x="70" y="34" fontSize="11" fill="#333" fontFamily="Sora, sans-serif">Mexico</text>
              </svg>
            </div>
            {/* Right: Heading + carousel */}
            <div className="hp-dest-right">
              <h2 className="hp-section-title">Our Destinations</h2>
              <div style={{ position: "relative" }}>
                <div ref={carouselRef} className="hp-dest-carousel">
                  {DESTINATION_CARDS.map((card, i) => (
                    <div key={i} className="hp-dest-card" onClick={() => navigate("/destinations")}>
                      <img src={card.image} alt={card.label} className="hp-dest-card-img" />
                      <div className="hp-dest-card-overlay" />
                      <div className="hp-dest-card-content">
                        <div className="hp-dest-card-countries">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {card.countries}
                        </div>
                        <div className="hp-dest-card-label">{card.label}</div>
                        <button className="hp-dest-see-more" onClick={(e) => { e.stopPropagation(); navigate("/destinations"); }}>See more</button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Carousel controls */}
                <div className="hp-carousel-controls">
                  <button className="hp-carousel-btn" onClick={() => scrollCarousel("left")} aria-label="Scroll left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button className="hp-carousel-btn" onClick={() => scrollCarousel("right")} aria-label="Scroll right">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. FEATURED PACKAGES ── */}
        <section className="hp-featured">
          <div className="hp-featured-inner">
            <div className="hp-watermark">PACKAGES</div>
            <div className="hp-featured-header">
              <div className="hp-featured-label">PACKAGES</div>
              <h2 className="hp-section-title">Featured Packages</h2>
              <p className="hp-featured-sub">Explore the most breathtaking places across South America to inspire your next adventure.</p>
            </div>
            <div className="hp-pkg-grid">
              {FEATURED_PACKAGES.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className={`hp-pkg-card hp-pkg-card-${i % 4 === 0 || i % 4 === 3 ? "tall" : "short"}`}
                  onClick={() => navigate(`/packages/${pkg.slug}`)}
                >
                  <img src={pkg.image} alt={pkg.title} className="hp-pkg-card-img" />
                  <div className="hp-pkg-card-overlay" />
                  <div className="hp-pkg-card-content">
                    <div className="hp-pkg-card-title">{pkg.title.replace(" 2026", "")}</div>
                    <div className="hp-pkg-card-duration">{pkg.days} Days / {pkg.nights} Nights</div>
                  </div>
                  <div className="hp-pkg-card-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. SERVICES (SIDEKICKS) ── */}
        <section className="hp-services">
          <div className="hp-services-inner">
            <div className="hp-watermark hp-watermark-services">SIDEKICKS</div>
            <div className="hp-services-label">SIDEKICKS</div>
            <h2 className="hp-section-title" style={{ textAlign: "center", marginBottom: "8px" }}>Services</h2>
            <p className="hp-services-sub">Enhancing Your Travel Experience with Indian Comforts</p>
            <div className="hp-services-grid">
              {/* Left 3 */}
              <div className="hp-services-col">
                {SERVICES.slice(0, 3).map((s) => (
                  <div key={s.num} className="hp-service-item">
                    <div className="hp-service-num">{s.num}</div>
                    <div className="hp-service-text">{s.text}</div>
                  </div>
                ))}
              </div>
              {/* Center image */}
              <div className="hp-services-center-img">
                <img src={SERVICES_MAP} alt="Travel planning" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px" }} />
              </div>
              {/* Right 3 */}
              <div className="hp-services-col">
                {SERVICES.slice(3).map((s) => (
                  <div key={s.num} className="hp-service-item">
                    <div className="hp-service-num">{s.num}</div>
                    <div className="hp-service-text">{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. BOOK YOUR HOLIDAYS ── */}
        <section className="hp-booking">
          <img src={BOOKING_BG} alt="Book your holidays" className="hp-booking-bg" />
          <div className="hp-booking-overlay" />
          <div className="hp-booking-inner">
            <div className="hp-booking-left">
              <h2 className="hp-booking-title">Book Your<br />Holidays Today!</h2>
              <p className="hp-booking-sub">Begin your dream journey with India's top South &amp; Latin America travel experts.</p>
            </div>
            <div className="hp-booking-form-card">
              {formSubmitted ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>Thank you!</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#666" }}>We'll be in touch shortly.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Are you an agent? */}
                  <div className="hp-form-row" style={{ marginBottom: "20px" }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 500, color: "#333", marginRight: "16px" }}>Are you an agent?</span>
                    <label className="hp-radio-label">
                      <input type="radio" name="agent" value="yes" checked={isAgent === true} onChange={() => setIsAgent(true)} style={{ marginRight: "6px" }} />
                      Yes
                    </label>
                    <label className="hp-radio-label">
                      <input type="radio" name="agent" value="no" checked={isAgent === false} onChange={() => setIsAgent(false)} style={{ marginRight: "6px" }} />
                      No
                    </label>
                  </div>
                  {/* Name + PAX */}
                  <div className="hp-form-row hp-form-two-col">
                    <div className="hp-form-group">
                      <label className="hp-form-label">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        required
                        className="hp-form-input"
                      />
                    </div>
                    <div className="hp-form-group">
                      <label className="hp-form-label">Number of PAX *</label>
                      <input
                        type="number"
                        placeholder="Enter number of attendees"
                        value={formData.pax}
                        onChange={e => setFormData(p => ({ ...p, pax: e.target.value }))}
                        required
                        className="hp-form-input"
                      />
                    </div>
                  </div>
                  {/* Phone + Email */}
                  <div className="hp-form-row hp-form-two-col">
                    <div className="hp-form-group">
                      <label className="hp-form-label">Mobile Number *</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", background: "#F5F5F5", border: "1px solid #E0E0E0", borderRadius: "8px", padding: "0 12px", fontSize: "14px", color: "#333", whiteSpace: "nowrap", flexShrink: 0 }}>
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          placeholder="0000000000"
                          value={formData.phone}
                          onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                          required
                          className="hp-form-input"
                          style={{ flex: 1 }}
                        />
                      </div>
                    </div>
                    <div className="hp-form-group">
                      <label className="hp-form-label">Email *</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        required
                        className="hp-form-input"
                      />
                    </div>
                  </div>
                  <button type="submit" className="hp-submit-btn">Submit</button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── 6. FAQ ── */}
        <section className="hp-faq">
          <div className="hp-faq-inner">
            <h2 className="hp-section-title" style={{ textAlign: "center", marginBottom: "8px" }}>Frequently Asked Questions</h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", color: "#666", textAlign: "center", marginBottom: "40px" }}>Your Questions Answered: Everything You Need to Know About Our Tours</p>
            <div className="hp-faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className="hp-faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="hp-faq-question">
                    <span>{faq.q}</span>
                    <span className="hp-faq-icon">{openFaq === i ? "−" : "+"}</span>
                  </div>
                  {openFaq === i && (
                    <div className="hp-faq-answer">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        /* ── HERO ── */
        .hp-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .hp-hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .hp-hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 1;
        }
        .hp-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 24px;
        }
        .hp-hero-title {
          margin: 0 0 32px 0;
          line-height: 1.1;
          color: #fff;
        }
        .hp-hero-title span:nth-child(1) { font-size: 72px; }
        .hp-hero-title span:nth-child(2) { font-size: 88px; color: #fff; }
        .hp-hero-title span:nth-child(3) { font-size: 72px; }
        .hp-book-btn {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          background: rgba(255,255,255,0.21);
          border: 1.5px solid rgba(255,255,255,0.6);
          border-radius: 100px;
          padding: 16px 40px;
          cursor: pointer;
          letter-spacing: 1px;
          transition: background 0.2s ease, border-color 0.2s ease;
          backdrop-filter: blur(4px);
        }
        .hp-book-btn:hover {
          background: rgba(255,255,255,0.35);
          border-color: #fff;
        }
        .hp-country-pills {
          position: absolute;
          bottom: 32px;
          left: 0;
          right: 0;
          z-index: 2;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 24px;
        }
        .hp-country-pill {
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 100px;
          padding: 6px 14px;
          backdrop-filter: blur(4px);
          transition: background 0.2s;
          cursor: default;
        }
        .hp-country-pill:hover { background: rgba(255,255,255,0.28); }

        /* ── DESTINATIONS ── */
        .hp-destinations {
          background: #EAF9EA;
          padding: 80px 0;
        }
        .hp-destinations-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 64px;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 60px;
          align-items: center;
        }
        .hp-map-col { display: flex; align-items: center; justify-content: center; }
        .hp-map-svg { width: 100%; max-width: 280px; height: auto; }
        .hp-dest-right { }
        .hp-section-title {
          font-family: 'Sora', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #111;
          margin: 0 0 24px 0;
        }
        .hp-dest-carousel {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding-bottom: 8px;
        }
        .hp-dest-carousel::-webkit-scrollbar { display: none; }
        .hp-dest-card {
          position: relative;
          width: 300px;
          height: 360px;
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
          scroll-snap-align: start;
          cursor: pointer;
          background: #0B2B1E;
        }
        .hp-dest-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .hp-dest-card:hover .hp-dest-card-img { transform: scale(1.05); }
        .hp-dest-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%);
        }
        .hp-dest-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
        }
        .hp-dest-card-countries {
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .hp-dest-card-label {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .hp-dest-see-more {
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: rgba(0,166,62,0.85);
          border: none;
          border-radius: 100px;
          padding: 8px 18px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .hp-dest-see-more:hover { background: #00A63E; }
        .hp-carousel-controls {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          align-items: center;
        }
        .hp-carousel-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #ccc;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          transition: border-color 0.2s, color 0.2s;
        }
        .hp-carousel-btn:hover { border-color: #00A63E; color: #00A63E; }

        /* ── FEATURED PACKAGES ── */
        .hp-featured {
          background: #fff;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }
        .hp-watermark {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Sora', sans-serif;
          font-size: 120px;
          font-weight: 800;
          color: rgba(0,166,62,0.06);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: 8px;
          z-index: 0;
        }
        .hp-watermark-services {
          top: 10px;
        }
        .hp-featured-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 64px;
          position: relative;
          z-index: 1;
        }
        .hp-featured-label {
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #555;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .hp-featured-header { margin-bottom: 40px; }
        .hp-featured-sub {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          color: #666;
          margin-top: 8px;
          max-width: 600px;
        }
        .hp-pkg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 280px 280px;
          gap: 12px;
        }
        .hp-pkg-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #111;
        }
        .hp-pkg-card-tall { grid-row: span 2; }
        .hp-pkg-card-short { grid-row: span 1; }
        .hp-pkg-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .hp-pkg-card:hover .hp-pkg-card-img { transform: scale(1.05); }
        .hp-pkg-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 60%);
        }
        .hp-pkg-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
        }
        .hp-pkg-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .hp-pkg-card-duration {
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
        }
        .hp-pkg-card-arrow {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .hp-pkg-card:hover .hp-pkg-card-arrow { opacity: 1; }

        /* ── SERVICES ── */
        .hp-services {
          background: #fff;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }
        .hp-services-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 64px;
          position: relative;
          z-index: 1;
        }
        .hp-services-label {
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #555;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 8px;
        }
        .hp-services-sub {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          color: #666;
          text-align: center;
          margin-bottom: 48px;
        }
        .hp-services-grid {
          display: grid;
          grid-template-columns: 1fr 300px 1fr;
          gap: 32px;
          align-items: start;
        }
        .hp-services-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .hp-service-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(230,230,230,0.3);
          border: 1px solid #D9D9D9;
          border-radius: 16px;
          padding: 16px;
        }
        .hp-service-num {
          font-family: 'Sora', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #00A63E;
          line-height: 1;
          flex-shrink: 0;
          min-width: 32px;
        }
        .hp-service-text {
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #333;
          line-height: 1.6;
          padding-top: 4px;
        }
        .hp-services-center-img {
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
        }

        /* ── BOOKING ── */
        .hp-booking {
          position: relative;
          padding: 80px 0;
          overflow: hidden;
        }
        .hp-booking-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .hp-booking-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 1;
        }
        .hp-booking-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 64px;
          display: grid;
          grid-template-columns: 1fr 520px;
          gap: 60px;
          align-items: center;
        }
        .hp-booking-left { }
        .hp-booking-title {
          font-family: 'Sora', sans-serif;
          font-size: 48px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px 0;
          line-height: 1.15;
        }
        .hp-booking-sub {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          max-width: 400px;
        }
        .hp-booking-form-card {
          background: #fff;
          border-radius: 32px;
          padding: 36px;
        }
        .hp-form-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .hp-form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-items: start;
        }
        .hp-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .hp-form-label {
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #333;
        }
        .hp-form-input {
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #333;
          background: #F5F5F5;
          border: 1px solid #E0E0E0;
          border-radius: 8px;
          padding: 12px 14px;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .hp-form-input:focus { border-color: #00A63E; }
        .hp-radio-label {
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .hp-submit-btn {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          background: #222;
          border: none;
          border-radius: 100px;
          padding: 14px;
          width: 100%;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .hp-submit-btn:hover { background: #00A63E; }

        /* ── FAQ ── */
        .hp-faq {
          background: #fff;
          padding: 80px 0;
        }
        .hp-faq-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .hp-faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #E5E5E5;
          border-radius: 12px;
          overflow: hidden;
        }
        .hp-faq-item {
          border-bottom: 1px solid #E5E5E5;
          cursor: pointer;
          transition: background 0.15s;
        }
        .hp-faq-item:last-child { border-bottom: none; }
        .hp-faq-item:hover { background: #FAFAFA; }
        .hp-faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #111;
        }
        .hp-faq-icon {
          font-size: 20px;
          color: #00A63E;
          flex-shrink: 0;
          margin-left: 16px;
        }
        .hp-faq-answer {
          padding: 0 24px 20px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #555;
          line-height: 1.7;
        }

        /* ── TABLET (≤1023px) ── */
        @media (max-width: 1023px) {
          .hp-hero-title span:nth-child(1),
          .hp-hero-title span:nth-child(3) { font-size: 52px; }
          .hp-hero-title span:nth-child(2) { font-size: 64px; }
          .hp-destinations-inner { padding: 0 32px; grid-template-columns: 240px 1fr; gap: 32px; }
          .hp-featured-inner { padding: 0 32px; }
          .hp-pkg-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
          .hp-pkg-card-tall { grid-row: span 1; }
          .hp-services-inner { padding: 0 32px; }
          .hp-services-grid { grid-template-columns: 1fr 220px 1fr; gap: 20px; }
          .hp-booking-inner { padding: 0 32px; grid-template-columns: 1fr; }
          .hp-booking-left { text-align: center; }
          .hp-booking-sub { max-width: 100%; }
        }

        /* ── MOBILE (≤767px) ── */
        @media (max-width: 767px) {
          .hp-hero { height: 100svh; min-height: 500px; }
          .hp-hero-title span:nth-child(1),
          .hp-hero-title span:nth-child(3) { font-size: 32px; }
          .hp-hero-title span:nth-child(2) { font-size: 44px; }
          .hp-hero-title { margin-bottom: 24px; }
          .hp-book-btn { padding: 12px 28px; font-size: 14px; }
          .hp-country-pills { gap: 6px; bottom: 20px; }
          .hp-country-pill { font-size: 11px; padding: 4px 10px; }

          .hp-destinations { padding: 48px 0; }
          .hp-destinations-inner { grid-template-columns: 1fr; padding: 0 20px; gap: 24px; }
          .hp-map-col { display: none; }
          .hp-section-title { font-size: 26px; }
          .hp-dest-card { width: 240px; height: 280px; }

          .hp-featured { padding: 48px 0; }
          .hp-featured-inner { padding: 0 20px; }
          .hp-watermark { font-size: 60px; }
          .hp-pkg-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; gap: 8px; }
          .hp-pkg-card-tall { grid-row: span 1; }

          .hp-services { padding: 48px 0; }
          .hp-services-inner { padding: 0 20px; }
          .hp-services-grid { grid-template-columns: 1fr; }
          .hp-services-center-img { height: 220px; }

          .hp-booking { padding: 48px 0; }
          .hp-booking-inner { padding: 0 20px; grid-template-columns: 1fr; gap: 32px; }
          .hp-booking-title { font-size: 32px; }
          .hp-booking-form-card { padding: 24px 20px; border-radius: 20px; }
          .hp-form-two-col { grid-template-columns: 1fr; }

          .hp-faq { padding: 48px 0; }
          .hp-faq-inner { padding: 0 16px; }
        }
      `}</style>
    </>
  );
}
