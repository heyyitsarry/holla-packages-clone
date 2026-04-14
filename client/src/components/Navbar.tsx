// Navbar — pixel-perfect clone of hollaamericana.com header
// Font: Sora 16.8px 700 brand, Sora 16px 400 nav links
// Position: fixed, transparent bg, z-index 999, padding 24px 16px
// Inner: flex space-between, padding 16px 32px, maxWidth 1440px
// Logo: 48x48 circle, border-radius 999px
// Brand lines: Sora 16.8px 700 #111111, letterSpacing 0.4px, lineHeight 17.64px
// Nav: flex, gap 48px
// Nav link: Sora 16px 400 #111111, letterSpacing 2px, uppercase, no underline
// Active nav link: border-bottom 1px solid #111111

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451557766/jkbf5zEb7ZR2fZ38BvZD8g/logo_218f958e.jpg";

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: "transparent",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <img
            src={LOGO_URL}
            alt="Holla Americana Logo"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "999px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontFamily: "'Sora', system-ui, sans-serif",
                fontSize: "16.8px",
                fontWeight: 700,
                color: "#111111",
                letterSpacing: "0.4px",
                lineHeight: "17.64px",
                display: "block",
              }}
            >
              HOLLA
            </span>
            <span
              style={{
                fontFamily: "'Sora', system-ui, sans-serif",
                fontSize: "16.8px",
                fontWeight: 700,
                color: "#111111",
                letterSpacing: "0.4px",
                lineHeight: "17.64px",
                display: "block",
              }}
            >
              AMERICANA
            </span>
          </span>
        </div>

        {/* Nav Links */}
        <nav style={{ display: "flex", gap: "48px", alignItems: "center" }}>
          {[
            { label: "HOME", href: "/", active: false },
            { label: "ABOUT", href: "/about", active: false },
            { label: "DESTINATIONS", href: "/destinations", active: false },
            { label: "CONTACT", href: "/#contact", active: false },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#111111",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: item.active ? "1px solid #111111" : "none",
                paddingBottom: item.active ? "2px" : "0",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
