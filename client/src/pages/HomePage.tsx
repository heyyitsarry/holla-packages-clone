/**
 * HomePage — exact clone of hollaamericana.com
 *
 * Design specs extracted from original site CSS:
 * - Hero: 100dvh, video bg (autoplay/loop/muted), dark overlay rgba(2,2,2,0.5)
 * - Title: "Experience" + "Like Never Before" = Sora 40px/600/white
 *          "South America" = Brittany Signature 88px/400/white
 * - BOOK NOW: border-radius 100px, bg rgba(255,255,255,0.21), Sora 16px, padding 16px 32px
 * - Country pills: white border, white text, transparent bg, border-radius 100px
 * - Nav: fixed, transparent → scrolled: inner div gets bg rgba(255,255,255,0.9) + border-radius 40px + box-shadow
 * - Nav links: white, uppercase, letter-spacing 2px, hover → #00A63E, active → white + border-bottom 2px white
 * - Scrolled nav links: #111111
 * - Mobile menu: slides from right, 70% width, bg #0D0D0D
 * - Destinations: bg #EAF9EA, padding 128px 0
 * - Destinations card: dark bg, border-radius 16px, 360px height, white text, green "See more" btn
 * - Packages section: bg transparent, PACKAGES watermark in Bebas Neue 80px #E1F7CF
 * - Section header title: Sora 32px/600
 * - Section header bg-title: Bebas Neue 80px, letter-spacing 1rem, color #E1F7CF
 * - Feature cards: backdrop-filter blur(7.8px), bg rgba(230,230,230,0.3), border 1px #D9D9D9, border-radius 1rem
 * - FAQ: border 1px rgba(0,0,0,0.1), border-radius 1rem, active border #E1F7CF
 * - Footer: white bg, padding 4rem 2rem, Sora font
 */

import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { PACKAGES as packages, type Package } from "@/lib/packages-data";
import ReviewsSection from "@/components/ReviewsSection";
import ClientTestimonials from "@/components/ClientTestimonials";

// All local image paths — no external CDN dependency
const LOGO_URL = "/images/orchid-logo-official.png";
const SERVICES_IMG = "/images/hero-packages.jpg"; // Using local hero image as services section background
const ICONS = {
  plane: "/images/plane.png",
  people: "/images/people.png",
  cab: "/images/cab.png",
  cutlery: "/images/cutlery.png",
  manager: "/images/manager.png",
  luxury: "/images/luxury.png",
};

const COUNTRIES = ["Peru", "Brazil", "Argentina", "Chile", "Bolivia", "Colombia", "Costa Rica", "Mexico"];

const DESTINATIONS = [
  { countries: "Peru", title: "Inca Express • Peru", image: "/images/tours/photo-1526392060635-9d6019884377.jpg", slug: "inca-express-peru" },
  { countries: "Brazil, Argentina, Chile, Peru", title: "4 Nations Journey", image: "/images/tours/photo-1483729558449-99ef09a8c325.jpg", slug: "4-nations-journey" },
  { countries: "Brazil, Argentina, Chile, Bolivia, Peru", title: "5 Countries Grand Tour", image: "/images/tours/photo-1469854523086-cc02fe5d8800.jpg", slug: "5-countries-grand-tour" },
  { countries: "Brazil, Argentina, Chile, Bolivia, Peru", title: "Latin America Grand Tour", image: "/images/tours/photo-1501854140801-50d01698950b.jpg", slug: "latin-america-grand-tour" },
  { countries: "Peru", title: "Peru Group Tour", image: "/images/tours/photo-1580502304784-8985b7eb7260.jpg", slug: "peru-group-tour" },
  { countries: "Brazil, Argentina, Chile, Peru", title: "Brazil • Argentina • Chile • Peru", image: "/images/tours/photo-1518639192441-8fce0a366e2e.jpg", slug: "brazil-argentina-chile-peru" },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "DESTINATIONS", href: "/destinations" },
    { label: "CONTACT", href: "/contact" },
  ];

  const linkColor = scrolled ? "#111111" : "#ffffff";
  const hoverColor = "#00A63E";

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        padding: "1.5rem 1rem",
        background: "transparent",
        width: "100%",
        marginTop: "1rem",
        transition: "0.3s",
      }}>
        <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: scrolled ? "0.6rem 1.5rem" : "0",
            background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
            borderRadius: scrolled ? "40px" : "0",
            boxShadow: scrolled ? "rgba(0,0,0,0.2) 0px 4px 30px" : "none",
            transition: "background 0.3s, border-radius 0.3s, box-shadow 0.3s, padding 0.3s",
          }}>
            {/* Brand */}
            <div onClick={() => { navigate("/"); setMenuOpen(false); }} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", textDecoration: "none" }}>
              <img src={LOGO_URL} alt="Holla Americana" style={{ width: "36px", height: "36px", borderRadius: "999px", objectFit: "cover", transition: "0.2s" }} />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", lineHeight: "1.05" }}>
                <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: linkColor, textTransform: "uppercase", letterSpacing: "0.4px", transition: "color 0.3s" }}>ORCHID</span>
                <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#E91E63", letterSpacing: "0.3px", transition: "color 0.3s" }}>by Vandana</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="ha-desktop-nav" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
              {navLinks.map(item => (
                <a key={item.label} href={item.href}
                  style={{
                    fontFamily: "Sora, sans-serif", fontSize: "1rem", fontWeight: 400,
                    color: location === item.href ? linkColor : linkColor,
                    letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none",
                    transition: "color 0.2s",
                    borderBottom: location === item.href ? `2px solid ${linkColor}` : "none",
                    paddingBottom: location === item.href ? "4px" : "0",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
                  onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
                >{item.label}</a>
              ))}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="ha-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "none", flexDirection: "column", gap: "6px", background: "none", border: "none",
                cursor: "pointer", padding: "8px",
              }}
            >
              <div style={{ width: "24px", height: "2px", background: linkColor, transition: "0.3s" }} />
              <div style={{ width: "24px", height: "2px", background: linkColor, transition: "0.3s" }} />
              <div style={{ width: "24px", height: "2px", background: linkColor, transition: "0.3s" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, right: 0, width: "70%", height: "100vh", background: "#0D0D0D", zIndex: 998,
          display: "flex", flexDirection: "column", padding: "6rem 2rem 2rem", gap: "1.5rem",
        }}>
          {navLinks.map(item => (
            <a key={item.label} href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "Sora, sans-serif", fontSize: "1rem", fontWeight: 400,
                color: "#ffffff", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none",
              }}
            >{item.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .ha-desktop-nav { display: none !important; }
          .ha-hamburger { display: flex !important; }
        }
        @media (min-width: 768px) {
          .ha-desktop-nav { display: flex !important; }
          .ha-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [, navigate] = useLocation();
  return (
    <section style={{ width: "100%", height: "100dvh", position: "relative", overflow: "hidden", background: "#ffffff" }}>
      {/* Orchid flower background - watermark style */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <img
          src={LOGO_URL}
          alt="Orchid Vacations"
          style={{
            maxWidth: "70%",
            maxHeight: "90%",
            objectFit: "contain",
            opacity: 0.08,
          }}
        />
      </div>

      {/* Content overlay */}
      <div style={{
        textAlign: "center", zIndex: 1, color: "#111111",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        gap: "3rem", height: "100%", position: "relative",
      }}>
        {/* Title - ORCHID VACATIONS with logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <img src={LOGO_URL} alt="Orchid Logo" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
            <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 700, color: "#111111", margin: 0, lineHeight: 1.2, letterSpacing: "3px" }}>
              ORCHID<br />VACATIONS
            </h1>
          </div>
        </div>

        {/* BOOK NOW button */}
        <button
          onClick={() => navigate("/destinations")}
          style={{
            cursor: "pointer", color: "#ffffff", border: "none",
            borderRadius: "100px", padding: "16px 32px",
            fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 400,
            backgroundColor: "#00A63E",
            transition: "0.25s", display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#008a31")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#00A63E")}
        >
          BOOK NOW
        </button>

        {/* Country pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", padding: "0 1rem" }}>
          {COUNTRIES.map(c => (
            <span key={c} style={{
              fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 400,
              color: "#111111", border: "1px solid #00A63E",
              borderRadius: "100px", padding: "0.3rem 0.9rem",
              cursor: "pointer", transition: "0.2s",
            }}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Destinations Section ─────────────────────────────────────────────────────
function DestinationsSection() {
  const [, navigate] = useLocation();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
    }
  };

  return (
    <section style={{ background: "#EAF9EA", padding: "128px 0", position: "relative" }}>
      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", fontWeight: 600, color: "#111111", marginBottom: "2rem", textAlign: "center" }}>
          Our Destinations
        </h2>

        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          {/* South America SVG Map */}
          <div className="ha-map-container" style={{ flexShrink: 0 }}>
            <svg viewBox="0 0 220 380" width="200" height="340" style={{ display: "block" }}>
              {/* Simplified South America outline */}
              <path
                d="M110,10 C130,8 155,15 165,30 C175,45 178,60 175,75 C172,90 168,100 170,115 C172,130 178,140 175,155 C172,170 165,180 168,195 C171,210 178,220 175,235 C172,250 162,265 158,280 C154,295 155,310 148,322 C141,334 130,342 118,348 C106,354 95,355 85,350 C75,345 68,335 65,322 C62,309 65,295 60,282 C55,269 45,260 42,247 C39,234 43,220 40,207 C37,194 28,185 28,172 C28,159 35,148 35,135 C35,122 28,112 30,99 C32,86 40,76 42,63 C44,50 40,37 48,26 C56,15 78,8 95,8 Z"
                fill="#C8F0C8" stroke="#00A63E" strokeWidth="1.5"
              />
              {/* Country dots */}
              {[
                { name: "Mexico", x: 55, y: 28 },
                { name: "Costa Rica", x: 62, y: 55 },
                { name: "Colombia", x: 75, y: 80 },
                { name: "Brazil", x: 130, y: 140 },
                { name: "Peru", x: 80, y: 155 },
                { name: "Bolivia", x: 105, y: 195 },
                { name: "Chile", x: 80, y: 260 },
                { name: "Argentina", x: 100, y: 295 },
              ].map(({ name, x, y }) => (
                <g key={name}>
                  <circle cx={x} cy={y} r="4" fill="#00A63E" />
                  <text x={x + 8} y={y + 4} fontFamily="Sora, sans-serif" fontSize="9" fill="#333">{name}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* Destinations carousel */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div ref={carouselRef} style={{ display: "flex", gap: "1rem", overflowX: "auto", scrollBehavior: "smooth", scrollbarWidth: "none", paddingBottom: "1rem" }}>
              {DESTINATIONS.map((dest, i) => (
                <div key={i} style={{
                  flexShrink: 0, width: "300px", height: "360px",
                  borderRadius: "16px", overflow: "hidden",
                  position: "relative", cursor: "pointer",
                  background: "#1a1a1a",
                }}
                  onClick={() => navigate(`/packages/${dest.slug}`)}
                >
                  <img src={dest.image} alt={dest.title} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, transition: "transform 0.4s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    padding: "2rem 1rem 1rem", color: "#ffffff", zIndex: 2,
                  }}>
                    <p style={{ fontFamily: "Sora, sans-serif", fontSize: "12px", color: "#00A63E", margin: "0 0 0.5rem", fontWeight: 600 }}>© {dest.countries}</p>
                    <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 600, margin: 0 }}>{dest.title}</h3>
                    <button style={{
                      marginTop: "1rem", background: "#00A63E", color: "#ffffff", border: "none",
                      borderRadius: "100px", padding: "0.5rem 1rem", fontFamily: "Sora, sans-serif", fontSize: "13px",
                      cursor: "pointer", fontWeight: 600,
                    }}>See more</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scroll("left")} style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.8)", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontSize: "20px" }}>‹</button>
            <button onClick={() => scroll("right")} style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.8)", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontSize: "20px" }}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Featured Packages Section ────────────────────────────────────────────────
function FeaturedPackagesSection() {
  const [, navigate] = useLocation();

  return (
    <section style={{ padding: "128px 0", background: "#ffffff", position: "relative" }}>
      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Section header */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "80px", letterSpacing: "1rem", color: "#E1F7CF", margin: "0 0 -1rem", fontWeight: 400 }}>PACKAGES</p>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", fontWeight: 600, color: "#111111", margin: 0 }}>Featured Packages</h2>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#666666", marginTop: "1rem" }}>Explore the most breathtaking places across South America to inspire your next adventure.</p>
        </div>

        {/* 4-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginTop: "2rem" }}>
          {packages.slice(0, 8).map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => navigate(`/packages/${pkg.slug}`)}
              style={{
                cursor: "pointer", borderRadius: "12px", overflow: "hidden",
                background: "#ffffff", border: "1px solid #E5E5E5",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div style={{ height: "200px", overflow: "hidden", background: "#f0f0f0" }}>
                <img src={pkg.image} alt={pkg.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 600, color: "#111111", margin: "0 0 0.5rem" }}>{pkg.title}</h3>
                <p style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#666666", margin: "0 0 1rem" }}>{pkg.days} Days / {pkg.nights} Nights</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "#00A63E", fontWeight: 600 }}>Starting from</span>
                  <span style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", color: "#00A63E", fontWeight: 700 }}>${pkg.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All button */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button
            onClick={() => navigate("/destinations")}
            style={{
              fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 600,
              color: "#00A63E", background: "#ffffff", border: "2px solid #00A63E",
              borderRadius: "100px", padding: "12px 32px", cursor: "pointer", transition: "0.3s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#00A63E";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.color = "#00A63E";
            }}
          >
            View All Packages
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
function ServicesSection() {
  const services = [
    { icon: ICONS.plane, title: "Personalized airport transfers and seamless connectivity", number: 1 },
    { icon: ICONS.people, title: "Guaranteed access to authentic cultural experiences", number: 2 },
    { icon: ICONS.cutlery, title: "Curated dining experiences with Indian culinary insights", number: 3 },
    { icon: ICONS.cab, title: "Indian-operated vehicles and on-ground handling for maximum comfort", number: 4 },
    { icon: ICONS.manager, title: "Dedicated customer support and smooth communication", number: 5 },
    { icon: ICONS.luxury, title: "Premium luxury travel with dedicated customer support", number: 6 },
  ];

  return (
    <section style={{ padding: "128px 0", background: "#F9F9F9" }}>
      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", fontWeight: 600, color: "#111111", marginBottom: "1rem", textAlign: "center" }}>Services</h2>
        <p style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#666666", marginBottom: "3rem", textAlign: "center" }}>Enhancing Your Travel Experience with Indian Comforts</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {services.map((svc) => (
            <div key={svc.number} style={{
              padding: "2rem", background: "#ffffff", borderRadius: "12px",
              border: "1px solid #E5E5E5", textAlign: "center",
            }}>
              <img src={svc.icon} alt={svc.title} style={{ width: "60px", height: "60px", marginBottom: "1rem", objectFit: "contain" }} />
              <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 600, color: "#111111", margin: "0 0 1rem" }}>{svc.title}</h3>
              <div style={{ width: "40px", height: "40px", background: "#00A63E", color: "#ffffff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora, sans-serif", fontWeight: 700, margin: "0 auto" }}>{svc.number}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Booking Form Section ────────────────────────────────────────────────────
function BookingFormSection() {
  const [formData, setFormData] = useState({ name: "", attendees: "", phone: "", email: "", message: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", attendees: "", phone: "", email: "", message: "" });
  };

  return (
    <section style={{ padding: "128px 0", background: "#ffffff" }}>
      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "3rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", fontWeight: 600, color: "#111111", marginBottom: "1rem", textAlign: "center" }}>Book Your Holidays Today!</h2>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", color: "#666666", marginBottom: "2rem", textAlign: "center" }}>Begin your dream journey with India's top South & Latin America travel experts.</p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} style={{ padding: "12px", border: "1px solid #E5E5E5", borderRadius: "8px", fontFamily: "Sora, sans-serif" }} required />
            <input type="number" name="attendees" placeholder="Enter number of attendees" value={formData.attendees} onChange={handleChange} style={{ padding: "12px", border: "1px solid #E5E5E5", borderRadius: "8px", fontFamily: "Sora, sans-serif" }} required />
            <input type="tel" name="phone" placeholder="0000000000" value={formData.phone} onChange={handleChange} style={{ padding: "12px", border: "1px solid #E5E5E5", borderRadius: "8px", fontFamily: "Sora, sans-serif" }} required />
            <input type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} style={{ padding: "12px", border: "1px solid #E5E5E5", borderRadius: "8px", fontFamily: "Sora, sans-serif" }} required />
            <textarea name="message" placeholder="Enter your message" value={formData.message} onChange={handleChange} style={{ padding: "12px", border: "1px solid #E5E5E5", borderRadius: "8px", fontFamily: "Sora, sans-serif", gridColumn: "1 / -1", minHeight: "120px", resize: "vertical" }} />
            <button type="submit" style={{ gridColumn: "1 / -1", padding: "12px", background: "#00A63E", color: "#ffffff", border: "none", borderRadius: "8px", fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 600, cursor: "pointer" }}>Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "What is the best time to visit South America?", a: "The best time varies by region. Generally, April-May and September-October offer pleasant weather." },
    { q: "Do I need a visa for South America?", a: "Visa requirements depend on your nationality and destination. We can help with visa guidance." },
    { q: "What is included in your tour packages?", a: "Our packages include accommodation, guided tours, meals, and transportation as specified in the itinerary." },
    { q: "Can I customize my tour package?", a: "Yes! We offer fully customizable packages tailored to your preferences and budget." },
  ];

  return (
    <section style={{ padding: "128px 0", background: "#F9F9F9" }}>
      <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
        <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", fontWeight: 600, color: "#111111", marginBottom: "3rem", textAlign: "center" }}>Frequently Asked Questions</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", overflow: "hidden" }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%", padding: "1.5rem", background: "#ffffff", border: "none",
                  cursor: "pointer", textAlign: "left", fontFamily: "Sora, sans-serif", fontSize: "16px",
                  fontWeight: 600, color: "#111111", display: "flex", justifyContent: "space-between", alignItems: "center",
                  borderBottom: openIndex === i ? "2px solid #E1F7CF" : "none",
                }}
              >
                {faq.q}
                <span style={{ fontSize: "20px", transition: "0.3s", transform: openIndex === i ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "1.5rem", background: "#F9F9F9", fontFamily: "Sora, sans-serif", fontSize: "15px", color: "#666666", lineHeight: "1.6" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#ffffff", padding: "4rem 2rem", borderTop: "1px solid #EEEEEE" }}>
      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <img src={LOGO_URL} alt="Orchid Vacations" style={{ width: "50px", height: "50px", borderRadius: "999px", objectFit: "cover", marginBottom: "1rem" }} />
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", color: "#666666", lineHeight: "1.6" }}>
              Orchid Vacations by Vandana is dedicated to opening a world of South American travel for adventurous holidaymakers from India, the GCC, and the global Indian diaspora.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><a href="/" style={{ fontFamily: "Sora, sans-serif", color: "#666666", textDecoration: "none", fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Home</a></li>
              <li><a href="/destinations" style={{ fontFamily: "Sora, sans-serif", color: "#666666", textDecoration: "none", fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Destinations</a></li>
              <li><a href="/contact" style={{ fontFamily: "Sora, sans-serif", color: "#666666", textDecoration: "none", fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Contact</a></li>
              <li><a href="/about" style={{ fontFamily: "Sora, sans-serif", color: "#666666", textDecoration: "none", fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Follow Us</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://instagram.com/orchidvacations" target="_blank" rel="noreferrer" style={{ color: "#111111", fontSize: "1.5rem" }}>📷</a>
              <a href="https://linkedin.com/company/orchidvacations" target="_blank" rel="noreferrer" style={{ color: "#111111", fontSize: "1.5rem" }}>💼</a>
              <a href="https://facebook.com/orchidvacations" target="_blank" rel="noreferrer" style={{ color: "#111111", fontSize: "1.5rem" }}>👍</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #EEEEEE", paddingTop: "2rem", textAlign: "center", fontSize: "0.85rem", color: "#999999", fontFamily: "Sora, sans-serif" }}>
          © 2024 Orchid Vacations by Vandana. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'Sora', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <FeaturedPackagesSection />
      <ServicesSection />
      <BookingFormSection />
      <ClientTestimonials />
      <ReviewsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
