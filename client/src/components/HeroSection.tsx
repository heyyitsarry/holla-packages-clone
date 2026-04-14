// HeroSection — exact clone of hollaamericana.com banner section
// Structure: 550px section with background-image (CSS), title bottom-left
// Title: Sora 56px 600 weight, white, uppercase, padding 0 32px, margin-bottom 32px
// Section is flex align-items:flex-end

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451557766/jkbf5zEb7ZR2fZ38BvZD8g/hero-packages_6bed9359.jpg";

export default function HeroSection() {
  return (
    <section
      style={{
        height: "550px",
        display: "flex",
        alignItems: "flex-end",
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: 0,
        padding: 0,
        width: "100%",
      }}
    >
      {/* Section content with title */}
      <div
        style={{
          maxWidth: "1440px",
          width: "100%",
          margin: "0 auto",
          padding: "0",
        }}
      >
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "56px",
            fontWeight: 600,
            color: "#ffffff",
            textTransform: "uppercase",
            padding: "0 32px",
            margin: "0 0 32px 0",
            letterSpacing: "normal",
          }}
        >
          PACKAGES
        </h1>
      </div>
    </section>
  );
}
