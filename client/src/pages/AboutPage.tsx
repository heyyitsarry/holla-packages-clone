import { useState } from "react";
import { useLocation } from "wouter";

const LOGO_URL = "/images/logo.jpg";
const ABOUT_HERO_IMG = "/images/tours/photo-1506905925346-21bda4d32df4.jpg";
const FOUNDER_IMG = "/images/tours/photo-1547558902-c0e053ade894.jpg";
const TEAM_MEMBERS = [
  { name: "Sunil Kallyat", role: "Founder & CEO", image: "/images/tours/photo-1526392060635-9d6019884377.jpg", bio: "Visionary leader with aviation expertise" },
  { name: "Sharmili Khiani", role: "Director Business Development (GCC)", image: "/images/tours/photo-1531761535209-180857e963b9.jpg", bio: "Operations expert" },
  { name: "Pradeep V", role: "Director Business Development (Brazil)", image: "/images/tours/photo-1589909202802-8f4aadce1849.jpg", bio: "Regional specialist" },
  { name: "Rakhee Mankar", role: "Director Business Development (USA)", image: "/images/tours/photo-1587595431973-160d0d94add1.jpg", bio: "Market strategist" },
];

const OFFICES = [
  { country: "India", address: "1404- Ghanshyam Enclave, New Link Road, Kandivali West, Mumbai- 400067", phone: "+91 99207 24274", email: "sunil@hollaamericana.com" },
  { country: "USA", address: "5473 JOSEPH JOHNSTON LANE, CENTREVILLE, VA-20120", phone: "+1 (703)-994 1928", email: "rakhee@hollaamericana.com" },
  { country: "Brazil", address: "SAN FRANSISCO, FOZ DO IGUAÇU, STATE OF PARANA, Brazil", phone: "+55 (45) 99992-2576", email: "pradeep@hollaamericana.com" },
  { country: "UAE", address: "Dubai", phone: "+971 50 340 5766", email: "sales@kosmosme.com" },
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
              <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: linkColor, textTransform: "uppercase", letterSpacing: "0.4px" }}>HOLLA</span>
              <span style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", fontWeight: 700, color: linkColor, textTransform: "uppercase", letterSpacing: "0.4px" }}>AMERICANA</span>
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
              Holla Americana is dedicated to opening a world of South American travel for adventurous holidaymakers from India, the GCC, and the global Indian diaspora.
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
          © 2024 Holla Americana. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  const [teamIndex, setTeamIndex] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{
        height: "400px",
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${ABOUT_HERO_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "2rem",
        marginTop: "80px",
      }}>
        <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "3.5rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>ABOUT US</h1>
      </section>

      {/* Mission Section */}
      <section style={{ padding: "4rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: "1.5rem", lineHeight: "1.3" }}>
              We make South America feel like home.
            </h2>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#555555", lineHeight: "1.8", marginBottom: "1.5rem" }}>
              Founded in August 2024, Holla Americana is dedicated to opening a world of South American travel for adventurous holidaymakers from India, the GCC, and the global Indian diaspora. Our mission is to make this vibrant continent feel familiar, welcoming, and effortlessly accessible through well-crafted, trustworthy travel experiences.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Handpicked South American Destinations",
                "Local On-Ground Travel Partners",
                "Thoughtfully Designed Itineraries",
                "Hassle-Free End-to-End Travel Support"
              ].map((item, i) => (
                <li key={i} style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#555555", marginBottom: "0.8rem", paddingLeft: "1.5rem", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#00A63E", fontWeight: "bold" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <img src={ABOUT_HERO_IMG} alt="Our mission" style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px" }} />
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{ padding: "4rem 2rem", background: "#F9F9F9" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: "2rem" }}>Our Story</h2>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#555555", lineHeight: "1.8", marginBottom: "1.5rem" }}>
            Holla Americana was created to bridge the gap between curious travelers from India and the Middle East and the extraordinary diversity of South America. While the continent is rich in nature, color, and culture, it still remains underexplored by many travelers from this region.
          </p>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#555555", lineHeight: "1.8" }}>
            Our team works closely with trusted local partners to curate reliable, ready-reference holiday options for both direct travelers and B2B partners. Through our exclusive website, we help travel agents and tour operators confidently promote and sell South America with strong product knowledge, excellent service standards, and competitive pricing.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section style={{ padding: "4rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <img src={FOUNDER_IMG} alt="Founder" style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "12px" }} />
          <div>
            <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Meet Our Founder</h3>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#00A63E", fontWeight: 600, marginBottom: "1.5rem" }}>Sunil Kallyat</p>
            <p style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#555555", lineHeight: "1.8", marginBottom: "1.5rem" }}>
              Sunil Kallyat is a visionary whose life and leadership have been shaped by a deep respect for travel as a force for understanding, connection, and transformation. With an exceptional foundation in aviation leadership and years of experience guiding complex travel operations, he built Holla Americana on an unwavering principle: true reliability is the cornerstone of every meaningful journey.
            </p>
            <blockquote style={{ fontFamily: "Sora, sans-serif", fontSize: "1.1rem", fontStyle: "italic", color: "#00A63E", borderLeft: "4px solid #00A63E", paddingLeft: "1.5rem", margin: "1.5rem 0" }}>
              "South America is a continent of surprises. Our goal is to make discovering it feel effortless and exciting for travelers from our part of the world."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: "4rem 2rem", background: "#F9F9F9" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: "0.5rem", textAlign: "center" }}>Meet Our Team</h2>
          <p style={{ fontFamily: "Sora, sans-serif", fontSize: "1rem", color: "#666666", textAlign: "center", marginBottom: "3rem" }}>A passionate team dedicated to crafting unforgettable South American journeys.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} style={{ background: "#ffffff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <img src={member.image} alt={member.name} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.3rem 0" }}>{member.name}</h3>
                  <p style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", color: "#00A63E", fontWeight: 600, margin: "0 0 0.5rem 0" }}>{member.role}</p>
                  <p style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: "#666666", margin: 0 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section style={{ padding: "4rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: "3rem", textAlign: "center" }}>Our Offices</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {OFFICES.map((office, i) => (
            <div key={i} style={{ background: "#F9F9F9", padding: "2rem", borderRadius: "12px", border: "1px solid #EEEEEE" }}>
              <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem", color: "#00A63E" }}>{office.country}</h3>
              <p style={{ fontFamily: "Sora, sans-serif", fontSize: "0.95rem", color: "#555555", lineHeight: "1.6", marginBottom: "1rem" }}>{office.address}</p>
              <p style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", color: "#666666", margin: "0.5rem 0" }}>
                <strong>Phone:</strong> <a href={`tel:${office.phone}`} style={{ color: "#00A63E", textDecoration: "none" }}>{office.phone}</a>
              </p>
              <p style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", color: "#666666", margin: "0.5rem 0" }}>
                <strong>Email:</strong> <a href={`mailto:${office.email}`} style={{ color: "#00A63E", textDecoration: "none" }}>{office.email}</a>
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
