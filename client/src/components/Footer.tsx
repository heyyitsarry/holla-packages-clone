// Footer — pixel-perfect clone of hollaamericana.com footer
// Background: white (#ffffff)
// Padding: 64px 32px
// Logo: 100x100 circle, margin-bottom 16px
// Footer text: Sora 14px 200 #000000, max-width 250px
// Socials: flex gap 12.8px, links are 36x36 black icons (no bg, no border-radius)
// Grid: 3 columns equal width, gap 40px
// Heading: Sora 18px 600 #000000, margin-bottom 16px
// Nav link: Sora 14px 200 #414141, no underline
// Col3 text: Sora 18px #000000
// Contact button: black bg #000000, white text, border-radius 100px, padding 16px 32px, Sora 16px 400
// Copyright: Sora 13.6px #000000

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451557766/jkbf5zEb7ZR2fZ38BvZD8g/logo_218f958e.jpg";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        padding: "64px 32px",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {/* 3-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "40px",
          }}
        >
          {/* Column 1: Logo + Text + Socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <img
              src={LOGO_URL}
              alt="Brand Logo"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "999px",
                objectFit: "cover",
                marginBottom: "0px",
              }}
            />
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "14px",
                fontWeight: 200,
                color: "#000000",
                maxWidth: "250px",
                margin: 0,
                lineHeight: "1.6",
              }}
            >
              Explore the best destinations with our expert-crafted travel experiences.
            </p>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12.8px", alignItems: "center" }}>
              {/* Instagram */}
              <a
                href="https://instagram.com/hollaamericana"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#000000", display: "block", width: "36px", height: "36px" }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ width: "24px", height: "24px" }}>
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sunil-kallyat-777674316/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#000000", display: "block", width: "36px", height: "36px" }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ width: "24px", height: "24px" }}>
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#000000", display: "block", width: "36px", height: "36px" }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ width: "24px", height: "24px" }}>
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#000000", display: "block", width: "36px", height: "36px" }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ width: "24px", height: "24px" }}>
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
                marginBottom: "16px",
                marginTop: 0,
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "Home", href: "/" },
                { label: "Destinations", href: "/destinations" },
                { label: "Contact", href: "/#contact" },
                { label: "About Us", href: "/about" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "14px",
                      fontWeight: 200,
                      color: "#414141",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Stay updated + Contact Us button */}
          <div>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "18px",
                color: "#000000",
                margin: "0 0 16px 0",
                lineHeight: "1.5",
              }}
            >
              Stay updated with our latest offers and travel insights.
            </p>
            <button
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                borderRadius: "100px",
                padding: "16px 32px",
                fontFamily: "'Sora', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                border: "none",
                cursor: "pointer",
              }}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "13.6px",
            color: "#000000",
            marginTop: "40px",
            marginBottom: 0,
          }}
        >
          © 2026 Holla Americana. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
