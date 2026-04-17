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

// All local image paths — no external CDN dependency
const LOGO_URL = "/images/logo.jpg";
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
  { countries: "Brazil, Argentina, Chile, Bolivia, Peru", title: "Brazil • Argentina • Chile • Bolivia • Peru", image: "/images/tours/photo-1547558902-c0e053ade894.jpg", slug: "5-countries-tour" },
];

const SERVICES = [
  { num: "1", icon: "plane", pos: "top-left", text: "Personalized airport transfers and seamless arrival assistance" },
  { num: "2", icon: "people", pos: "left-center", text: "Private and small-group sightseeing tours infused with Indian cultural insights" },
  { num: "3", icon: "cab", pos: "bottom-left", text: "Indian-operated vehicles and on-ground handling for maximum comfort" },
  { num: "4", icon: "cutlery", pos: "top-center", text: "Guaranteed access to authentic Indian meals during your travels" },
  { num: "5", icon: "manager", pos: "right-center", text: "Multilingual Indian tour managers ensuring smooth communication" },
  { num: "6", icon: "luxury", pos: "bottom-right", text: "Premium luxury travel with dedicated customer support" },
];

const FAQS = [
  { q: "Which countries do you cover?", a: "We offer customized tours in Brazil, Argentina, Peru, Colombia, Costa Rica, and Mexico, focused on Indian travelers." },
  { q: "Are Indian meals available?", a: "Yes, we ensure access to authentic Indian cuisine at every major stop." },
  { q: "Are the tours suitable for NRIs?", a: "Absolutely, we tailor the experience with cultural familiarity and language support for NRIs." },
  { q: "What languages do the guides speak?", a: "Our Indian tour managers speak Hindi, English, Portuguese, and Spanish fluently." },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "DESTINATIONS", href: "/destinations" },
    { label: "CONTACT", href: "/#contact" },
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
        <div style={{
          width: "100%", maxWidth: "1280px", margin: "0 auto",
        }}>
          {/* Inner container — gets bg/shadow when scrolled */}
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
                <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: linkColor, textTransform: "uppercase", letterSpacing: "0.4px", transition: "color 0.3s" }}>HOLLA</span>
                <span style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", fontWeight: 700, color: linkColor, textTransform: "uppercase", letterSpacing: "0.4px", transition: "color 0.3s" }}>AMERICANA</span>
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

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(v => !v)} className="ha-hamburger"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "none", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center", color: linkColor }}>
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: linkColor, borderRadius: "2px", transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: linkColor, borderRadius: "2px", transition: "opacity 0.25s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: linkColor, borderRadius: "2px", transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile overlay backdrop */}
        {menuOpen && (
          <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 998 }} />
        )}

        {/* Mobile slide-in menu from right */}
        <div style={{
          position: "fixed", top: 0, right: menuOpen ? 0 : "-100%",
          width: "70%", height: "100vh",
          background: "#0D0D0D",
          display: "flex", flexDirection: "column", gap: "2rem",
          padding: "5rem 2rem",
          transition: "right 0.3s ease",
          zIndex: 999,
        }}>
          {navLinks.map(item => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "Sora, sans-serif", fontSize: "1.2rem", color: "#ffffff", textDecoration: "none", fontWeight: location === item.href ? 600 : 400 }}
            >{item.label}</a>
          ))}
          {/* Social icons in mobile menu */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "auto" }}>
            <a href="https://instagram.com/hollaamericana" target="_blank" rel="noreferrer" style={{ color: "#ffffff" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://linkedin.com/company/hollaamericana" target="_blank" rel="noreferrer" style={{ color: "#ffffff" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://facebook.com/hollaamericana" target="_blank" rel="noreferrer" style={{ color: "#ffffff" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </header>

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
    <section style={{ width: "100%", height: "100dvh", position: "relative", overflow: "hidden" }}>
      {/* Video background */}
      {/* Static background image instead of video */}
      <div
        style={{
          backgroundImage: `url(${SERVICES_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Dark overlay + content */}
      <div style={{
        textAlign: "center", zIndex: 1, color: "#ffffff",
        background: "linear-gradient(rgba(2,2,2,0.5) 0%, rgba(2,2,2,0.5) 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        gap: "2rem", height: "100%", position: "relative",
      }}>
        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 600, color: "#ffffff", margin: 0, lineHeight: "40px" }}>
            Experience
          </h1>
          <h1 style={{ fontFamily: "'Brittany Signature', cursive", fontSize: "clamp(60px, 10vw, 88px)", fontWeight: 400, color: "#ffffff", margin: 0, lineHeight: 1.1 }}>
            South America
          </h1>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 600, color: "#ffffff", margin: 0, lineHeight: "40px" }}>
            Like Never Before
          </h1>
        </div>

        {/* BOOK NOW button */}
        <button
          onClick={() => navigate("/destinations")}
          style={{
            cursor: "pointer", color: "#ffffff", border: "none",
            borderRadius: "100px", padding: "16px 32px",
            fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 400,
            backgroundColor: "rgba(255,255,255,0.21)",
            transition: "0.25s", display: "inline-flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "rgba(0,0,0,0.3) 0px 1px 4px")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
        >
          BOOK NOW
        </button>

        {/* Country pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", padding: "0 1rem" }}>
          {COUNTRIES.map(c => (
            <span key={c} style={{
              fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 400,
              color: "#ffffff", border: "1px solid rgba(255,255,255,0.6)",
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
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                    <p style={{ fontFamily: "Sora, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)", margin: "0 0 0.3rem 0" }}>
                      © {dest.countries}
                    </p>
                    <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 600, color: "#ffffff", margin: "0 0 1rem 0" }}>
                      {dest.title}
                    </h3>
                    <button style={{
                      fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 500,
                      color: "#ffffff", background: "#00A63E",
                      border: "none", borderRadius: "100px", padding: "0.5rem 1.2rem",
                      cursor: "pointer", transition: "0.2s",
                    }}>See more</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel nav buttons */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              <button onClick={() => scroll("left")} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #ccc", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>‹</button>
              <button onClick={() => scroll("right")} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #ccc", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>›</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .ha-map-container { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Featured Packages Section ────────────────────────────────────────────────
function PackagesSection() {
  const [, navigate] = useLocation();
  const featured: Package[] = packages.slice(0, 8);

  return (
    <section style={{ position: "relative", padding: "6rem 0", background: "#ffffff", overflow: "hidden" }}>
      {/* PACKAGES watermark */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Bebas Neue', cursive",
        fontSize: "clamp(60px, 12vw, 120px)",
        letterSpacing: "1rem",
        color: "#E1F7CF",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}>PACKAGES</div>

      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative" }}>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 500, color: "#00A63E", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 0.5rem 0" }}>PACKAGES</p>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", fontWeight: 600, color: "#111111", margin: "0 0 0.75rem 0" }}>Featured Packages</h2>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "15px", fontWeight: 400, color: "#555555", maxWidth: "700px", margin: "0 auto" }}>
            Explore the most breathtaking places across South America to inspire your next adventure.
          </p>
        </div>

        {/* Package cards grid */}
        <div className="ha-pkg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {featured.map(pkg => (
            <div key={pkg.id}
              onClick={() => navigate(`/packages/${pkg.slug}`)}
              style={{
                background: "#ffffff", borderRadius: "12px",
                border: "1px solid #EEEEEE",
                boxShadow: "rgba(0,0,0,0.06) 0px 2px 8px",
                overflow: "hidden", cursor: "pointer",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "rgba(0,0,0,0.12) 0px 8px 24px"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "rgba(0,0,0,0.06) 0px 2px 8px"; }}
            >
              <img src={pkg.image} alt={pkg.title} style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "15px", fontWeight: 600, color: "#111111", margin: "0 0 0.4rem 0", lineHeight: 1.3 }}>{pkg.title}</h3>
                <p style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#666666", margin: "0 0 0.75rem 0" }}>{pkg.duration}</p>
                <div>
                  <span style={{ fontFamily: "Sora, sans-serif", fontSize: "12px", color: "#00A63E" }}>Starting from</span>
                  <div style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 700, color: "#00A63E" }}>{pkg.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button onClick={() => navigate("/destinations")} style={{
            fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 500,
            color: "#111111", background: "transparent",
            border: "1px solid #111111", borderRadius: "100px",
            padding: "0.75rem 2rem", cursor: "pointer", transition: "0.25s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#111111"; (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#111111"; }}
          >View All Packages</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .ha-pkg-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 599px) { .ha-pkg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section style={{ padding: "96px 32px", position: "relative", overflow: "visible" }}>
      {/* SIDEKICKS watermark */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Bebas Neue', cursive",
        fontSize: "clamp(60px, 12vw, 120px)",
        letterSpacing: "1rem",
        color: "#E1F7CF",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}>SIDEKICKS</div>

      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", fontWeight: 600, color: "#111111", margin: "0 0 0.5rem 0" }}>Services</h2>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "15px", fontWeight: 400, color: "#555555" }}>Enhancing Your Travel Experience with Indian Comforts</p>
        </div>

        {/* Services grid: 3 cards | center image | 3 cards */}
        <div className="ha-services-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 280px 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "1rem",
          gridTemplateAreas: `"card1 card1 card2 image card4 card4 card5"
                               "card1 card1 card3 image card6 card6 card5"`,
          alignItems: "stretch",
        }}>
          {SERVICES.map((svc, i) => {
            const iconPos = svc.pos;
            const iconStyle: React.CSSProperties = {
              position: "absolute",
              width: "48px", height: "48px",
              ...(iconPos === "top-left" ? { top: 0, left: 0, transform: "translate(-40%, -40%)" } :
                iconPos === "left-center" ? { top: "50%", left: 0, transform: "translate(-45%, -50%)" } :
                iconPos === "bottom-left" ? { bottom: 0, left: 0, transform: "translate(-40%, 40%)" } :
                iconPos === "top-center" ? { top: 0, left: "50%", transform: "translate(-50%, -45%)" } :
                iconPos === "right-center" ? { top: "50%", right: 0, transform: "translate(45%, -50%)" } :
                { bottom: 0, right: 0, transform: "translate(40%, 40%)" }),
            };
            return (
              <div key={i} style={{
                gridArea: `card${i + 1}`,
                backdropFilter: "blur(7.8px)",
                background: "rgba(230,230,230,0.3)",
                border: "1px solid #D9D9D9",
                borderRadius: "1rem",
                padding: "1rem",
                display: "flex", flexDirection: "column", gap: "1rem",
                position: "relative", overflow: "visible",
              }}>
                <div style={iconStyle}>
                  <img src={ICONS[svc.icon as keyof typeof ICONS]} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ fontFamily: "Sora, sans-serif", fontSize: "24px", fontWeight: 600 }}>{svc.num}</div>
                <div style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 400 }}>{svc.text}</div>
              </div>
            );
          })}

          {/* Center image */}
          <div style={{ gridArea: "image", borderRadius: "1rem", overflow: "hidden" }}>
            <img src={SERVICES_IMG} alt="Services" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .ha-services-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
            grid-template-areas: none !important;
          }
          .ha-services-grid > div[style*="grid-area: image"],
          .ha-services-grid > div[style*="gridArea: image"] { display: none !important; }
        }
        @media (max-width: 599px) {
          .ha-services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Enquiry / Book Section ───────────────────────────────────────────────────
function EnquirySection() {
  const [isAgent, setIsAgent] = useState<"yes" | "no">("no");
  const [form, setForm] = useState({ name: "", pax: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" style={{ position: "relative", overflow: "hidden", minHeight: "600px" }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1600&q=80)",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.5)",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "600px", padding: "4rem 1rem" }}>
        <div style={{ width: "100%", maxWidth: "560px" }}>
          {/* White card */}
          <div style={{ background: "#ffffff", borderRadius: "2rem", padding: "2.5rem", boxShadow: "rgba(0,0,0,0.2) 0px 20px 60px" }}>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "28px", fontWeight: 700, color: "#111111", margin: "0 0 0.25rem 0", lineHeight: 1.2 }}>
              Book Your <br />Holidays Today!
            </h2>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#777777", margin: "0 0 1.5rem 0" }}>
              Begin your dream journey with India's top South & Latin America travel experts.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Are you an agent? */}
              <div>
                <label style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#555", display: "block", marginBottom: "0.5rem" }}>Are you an agent?</label>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  {(["yes", "no"] as const).map(v => (
                    <label key={v} style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontFamily: "Sora, sans-serif", fontSize: "14px" }}>
                      <input type="radio" name="agent" value={v} checked={isAgent === v} onChange={() => setIsAgent(v)} style={{ accentColor: "#00A63E" }} />
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#555", display: "block", marginBottom: "0.4rem" }}>Full Name *</label>
                <input type="text" placeholder="Enter your full name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{ width: "100%", fontFamily: "Sora, sans-serif", fontSize: "14px", padding: "0.75rem 1rem", border: "1px solid #E0E0E0", borderRadius: "0.75rem", outline: "none", boxSizing: "border-box" }} />
              </div>

              {/* PAX + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#555", display: "block", marginBottom: "0.4rem" }}>Number of PAX *</label>
                  <input type="number" placeholder="Enter number of attendees" required value={form.pax} onChange={e => setForm(f => ({ ...f, pax: e.target.value }))}
                    style={{ width: "100%", fontFamily: "Sora, sans-serif", fontSize: "14px", padding: "0.75rem 1rem", border: "1px solid #E0E0E0", borderRadius: "0.75rem", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#555", display: "block", marginBottom: "0.4rem" }}>Mobile Number *</label>
                  <div style={{ display: "flex", border: "1px solid #E0E0E0", borderRadius: "0.75rem", overflow: "hidden" }}>
                    <span style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", padding: "0.75rem 0.75rem", background: "#f5f5f5", borderRight: "1px solid #E0E0E0", whiteSpace: "nowrap" }}>🇮🇳 +91</span>
                    <input type="tel" placeholder="0000000000" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      style={{ flex: 1, fontFamily: "Sora, sans-serif", fontSize: "14px", padding: "0.75rem 0.75rem", border: "none", outline: "none", minWidth: 0 }} />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#555", display: "block", marginBottom: "0.4rem" }}>Email *</label>
                <input type="email" placeholder="Enter email address" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ width: "100%", fontFamily: "Sora, sans-serif", fontSize: "14px", padding: "0.75rem 1rem", border: "1px solid #E0E0E0", borderRadius: "0.75rem", outline: "none", boxSizing: "border-box" }} />
              </div>

              <button type="submit" style={{
                fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 600,
                color: "#ffffff", background: "#111111",
                border: "none", borderRadius: "100px", padding: "0.9rem 2rem",
                cursor: "pointer", transition: "0.25s", marginTop: "0.5rem",
              }}>
                {submitted ? "Submitted! ✓" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section style={{ background: "#ffffff", paddingTop: "6rem", paddingBottom: "6rem", position: "relative" }}>
      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "32px", fontWeight: 600, color: "#111111", margin: "0 0 0.5rem 0" }}>Frequently Asked Questions</h2>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "15px", color: "#555555" }}>Your Questions Answered: Everything You Need to Know About Our Tours</p>
        </div>

        {/* FAQ list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {FAQS.map((faq, i) => (
            <div key={i}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              style={{
                cursor: "pointer",
                border: activeIdx === i ? "1px solid #E1F7CF" : "1px solid rgba(0,0,0,0.1)",
                borderRadius: "1rem",
                padding: "1.25rem 1.5rem",
                transition: "0.3s",
                boxShadow: activeIdx === i ? "rgba(0,166,62,0.08) 0px 6px 20px" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 400, color: "#000000", margin: 0 }}>{faq.q}</h3>
                <span style={{
                  fontFamily: "Sora, sans-serif", fontSize: "1.5rem", fontWeight: 400,
                  color: activeIdx === i ? "#E1F7CF" : "#999999",
                  transition: "transform 0.3s, color 0.3s",
                  transform: activeIdx === i ? "rotate(45deg)" : "none",
                  display: "inline-block",
                }}>+</span>
              </div>
              <div style={{
                maxHeight: activeIdx === i ? "200px" : "0",
                opacity: activeIdx === i ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s, opacity 0.3s",
              }}>
                <p style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "#444444", paddingTop: "0.75rem", margin: 0 }}>{faq.a}</p>
              </div>
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
    <footer style={{ color: "#000000", background: "#ffffff", padding: "4rem 2rem", position: "relative", zIndex: 10 }}>
      <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="ha-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
          {/* Col 1: Logo + description + socials */}
          <div>
            <img src={LOGO_URL} alt="Holla Americana" style={{ width: "80px", height: "80px", borderRadius: "999px", objectFit: "cover", marginBottom: "1rem" }} />
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 200, color: "#333333", marginBottom: "1rem", maxWidth: "320px", lineHeight: 1.6 }}>
              India's premier travel company specializing in South & Latin America tours, crafted exclusively for Indian travelers.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {[
                { href: "https://instagram.com/hollaamericana", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                { href: "https://linkedin.com/company/hollaamericana", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { href: "https://facebook.com/hollaamericana", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                { href: "https://wa.me/911234567890", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
              ].map(({ href, icon }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  style={{ color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #E0E0E0", transition: "0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#111111"; (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#111111"; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 600, color: "#111111", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.25rem" }}>Quick Links</h4>
            {["Home", "Destinations", "Contact", "About Us", "FAQ"].map(link => (
              <a key={link} href={link === "Home" ? "/" : link === "Destinations" ? "/destinations" : `/#${link.toLowerCase().replace(" ", "")}`}
                style={{ display: "block", fontFamily: "Sora, sans-serif", fontSize: "14px", color: "#555555", textDecoration: "none", marginBottom: "0.75rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00A63E")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
              >{link}</a>
            ))}
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 600, color: "#111111", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.25rem" }}>Contact</h4>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "#555555", marginBottom: "0.75rem" }}>info@hollaamericana.com</p>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", color: "#555555", marginBottom: "1.5rem" }}>+91 98765 43210</p>
            <button style={{
              fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 500,
              color: "#ffffff", background: "#111111",
              border: "none", borderRadius: "100px", padding: "0.75rem 1.5rem",
              cursor: "pointer", transition: "0.25s",
            }}>Contact Us</button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #E0E0E0", marginTop: "3rem", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#999999", margin: 0 }}>© 2024 Holla Americana. All rights reserved.</p>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", color: "#999999", margin: 0 }}>Designed with ♥ for Indian travelers</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .ha-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// ─── Main HomePage ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "Sora, sans-serif" }}>
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <PackagesSection />
      <ServicesSection />
      <EnquirySection />
      <FAQSection />
      <Footer />
    </div>
  );
}
