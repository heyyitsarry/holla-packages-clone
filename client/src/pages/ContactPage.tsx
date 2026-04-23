import { useState } from "react";
import { useLocation } from "wouter";

const LOGO_URL = "/images/logo.jpg";
const CONTACT_HERO_IMG = "/images/tours/photo-1580502304784-8985b7eb7260.jpg";

const CONTACT_INFO = [
  { country: "India", phone: "+91 99207 24274", email: "sunil@hollaamericana.com" },
  { country: "USA", phone: "+1 (703)-994 1928", email: "rakhee@hollaamericana.com" },
  { country: "Brazil", phone: "+55 (45) 99992-2576", email: "pradeep@hollaamericana.com" },
  { country: "UAE", phone: "+971 50 340 5766", email: "sales@kosmosme.com" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const [location] = useLocation();

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "DESTINATIONS", href: "/destinations" },
    { label: "CONTACT", href: "/contact" },
  ];

  const linkColor = scrolled ? "#111111" : "#ffffff";
  const hoverColor = "#00A63E";

  return (
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
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }}>
            <img src={LOGO_URL} alt="Holla Americana" style={{ width: "36px", height: "36px", borderRadius: "999px", objectFit: "cover" }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.05" }}>
              <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: linkColor, textTransform: "uppercase", letterSpacing: "0.4px" }}>ORCHID</span>
              <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: linkColor, textTransform: "uppercase", letterSpacing: "0.4px" }}>by Vandana</span>
            </div>
          </div>

          <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {navLinks.map(item => (
              <a key={item.label} href={item.href}
                style={{
                  fontFamily: "Sora, sans-serif", fontSize: "1rem", fontWeight: 400,
                  color: linkColor,
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
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#ffffff", padding: "4rem 2rem", borderTop: "1px solid #EEEEEE", marginTop: "4rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <img src={LOGO_URL} alt="Holla Americana" style={{ width: "50px", height: "50px", borderRadius: "999px", objectFit: "cover", marginBottom: "1rem" }} />
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
              <a href="https://instagram.com/hollaamericana" target="_blank" rel="noreferrer" style={{ color: "#111111", fontSize: "1.5rem" }}>📷</a>
              <a href="https://linkedin.com/company/hollaamericana" target="_blank" rel="noreferrer" style={{ color: "#111111", fontSize: "1.5rem" }}>💼</a>
              <a href="https://facebook.com/hollaamericana" target="_blank" rel="noreferrer" style={{ color: "#111111", fontSize: "1.5rem" }}>👍</a>
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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{
        height: "400px",
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${CONTACT_HERO_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "2rem",
        marginTop: "80px",
      }}>
        <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "3.5rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>CONTACT US</h1>
      </section>

      {/* Contact Info Cards */}
      <section style={{ padding: "4rem 2rem", background: "#F9F9F9" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "2rem", fontWeight: 700, marginBottom: "3rem", textAlign: "center" }}>Get in Touch</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {CONTACT_INFO.map((info, i) => (
              <div key={i} style={{ background: "#ffffff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem", color: "#00A63E" }}>{info.country}</h3>
                <div style={{ marginBottom: "1rem" }}>
                  <p style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: "#999999", margin: "0 0 0.3rem 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Phone</p>
                  <a href={`tel:${info.phone}`} style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#00A63E", textDecoration: "none", fontWeight: 600 }}>{info.phone}</a>
                </div>
                <div>
                  <p style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: "#999999", margin: "0 0 0.3rem 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</p>
                  <a href={`mailto:${info.email}`} style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#00A63E", textDecoration: "none", fontWeight: 600 }}>{info.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: "4rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "2rem", fontWeight: 700, marginBottom: "3rem", textAlign: "center" }}>Send us a Message</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", background: "#F9F9F9", padding: "2.5rem", borderRadius: "12px", border: "1px solid #EEEEEE" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#333333", display: "block", marginBottom: "0.5rem" }}>Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontFamily: "Sora, sans-serif",
                fontSize: "1rem",
                border: "1px solid #EEEEEE",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
              placeholder="Enter your full name"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#333333", display: "block", marginBottom: "0.5rem" }}>Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontFamily: "Sora, sans-serif",
                fontSize: "1rem",
                border: "1px solid #EEEEEE",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#333333", display: "block", marginBottom: "0.5rem" }}>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontFamily: "Sora, sans-serif",
                fontSize: "1rem",
                border: "1px solid #EEEEEE",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
              placeholder="Enter your phone number"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#333333", display: "block", marginBottom: "0.5rem" }}>Message *</label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontFamily: "Sora, sans-serif",
                fontSize: "1rem",
                border: "1px solid #EEEEEE",
                borderRadius: "8px",
                boxSizing: "border-box",
                minHeight: "150px",
                resize: "vertical",
              }}
              placeholder="Enter your message"
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              fontFamily: "Sora, sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              background: "#00A63E",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#008a32")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#00A63E")}
          >
            Send Message
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
