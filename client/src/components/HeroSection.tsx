// Hero Section — full-width background image with "PACKAGES" title
// Design: Expedition Cartography — dark overlay, bold white heading bottom-left

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451557766/jkbf5zEb7ZR2fZ38BvZD8g/hero-rio-C9MsLGNys8EQrnhMAhFbgS.webp";

export default function HeroSection() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "400px" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.3) 100%)" }}
      />
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* PACKAGES title — bottom left */}
      <div className="absolute bottom-8 left-8 md:left-12">
        <h1
          className="text-white font-bold tracking-wide"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 5rem)",
            letterSpacing: "0.05em",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            lineHeight: 1,
          }}
        >
          PACKAGES
        </h1>
      </div>
    </div>
  );
}
