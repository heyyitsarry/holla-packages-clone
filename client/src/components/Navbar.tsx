// Navbar — translucent frosted-glass with scroll transition + mobile hamburger
// At top: transparent bg, dark text
// On scroll: rgba(255,255,255,0.88) + backdrop-filter blur(14px) + border-bottom
// Mobile: hamburger icon, slide-down menu overlay
// Transition: all 0.3s ease on background, backdrop-filter, box-shadow

import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const LOGO_URL = "/images/orchid-logo-official.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "DESTINATIONS", href: "/destinations" },
    { label: "CONTACT", href: "/#contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
        } as React.CSSProperties}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 24px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          {/* Brand */}
          <div
            onClick={() => { navigate("/"); setMenuOpen(false); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src={LOGO_URL}
              alt="Orchid Vacations by Vandana Logo"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "999px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#111111",
                  letterSpacing: "0.4px",
                  lineHeight: "17px",
                  display: "block",
                }}
              >
                ORCHID
              </span>
              <span
                style={{
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#E91E63",
                  letterSpacing: "0.3px",
                  lineHeight: "15px",
                  display: "block",
                }}
              >
                by Vandana
              </span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "center",
            }}
            className="desktop-nav"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#111111",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="hamburger-btn"
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                backgroundColor: "#111111",
                borderRadius: "2px",
                transition: "transform 0.25s ease, opacity 0.25s ease",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                backgroundColor: "#111111",
                borderRadius: "2px",
                transition: "opacity 0.25s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                backgroundColor: "#111111",
                borderRadius: "2px",
                transition: "transform 0.25s ease, opacity 0.25s ease",
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? "300px" : "0",
            transition: "max-height 0.3s ease",
            backgroundColor: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderTop: menuOpen ? "1px solid rgba(0,0,0,0.08)" : "none",
          } as React.CSSProperties}
        >
          <nav style={{ display: "flex", flexDirection: "column", padding: "8px 24px 16px" }}>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#111111",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Responsive styles injected via <style> */}
      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
