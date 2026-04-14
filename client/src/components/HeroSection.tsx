// HeroSection — responsive banner section
// Desktop: 550px height, title 56px
// Mobile: 320px height, title 36px, padding reduced

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451557766/jkbf5zEb7ZR2fZ38BvZD8g/hero-packages_6bed9359.jpg";

export default function HeroSection() {
  return (
    <>
      <section
        className="hero-section"
        style={{
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
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", padding: "0" }}>
          <h1 className="hero-title">PACKAGES</h1>
        </div>
      </section>

      <style>{`
        .hero-section {
          height: 550px;
        }
        .hero-title {
          font-family: 'Sora', sans-serif;
          font-size: 56px;
          font-weight: 600;
          color: #ffffff;
          text-transform: uppercase;
          padding: 0 32px;
          margin: 0 0 32px 0;
          letter-spacing: normal;
        }
        @media (max-width: 767px) {
          .hero-section {
            height: 300px;
          }
          .hero-title {
            font-size: 36px;
            padding: 0 20px;
            margin: 0 0 20px 0;
          }
        }
      `}</style>
    </>
  );
}
