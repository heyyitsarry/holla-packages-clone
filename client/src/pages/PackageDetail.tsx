// PackageDetail — fully responsive clone of hollaamericana.com/packages/[slug]/
// Mobile fixes:
//   - Hero: 300px on mobile, padding 0 20px, title 28px
//   - Tabs: horizontally scrollable on mobile, smaller font
//   - Content: 24px 16px padding on mobile
//   - Overview: stacks price box below header on mobile
//   - Highlights/Included: single column on mobile
//   - Tour Plan: image hidden on mobile, single column
//   - Gallery: single column on mobile
//   - Rating: stacks on mobile

import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { PACKAGES } from "@/lib/packages-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Tab = "information" | "tourplan" | "gallery" | "rating";

export default function PackageDetail() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("information");

  const pkg = PACKAGES.find((p) => p.slug === params.slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!pkg) {
    return (
      <div style={{ fontFamily: "'Sora', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <div style={{ fontSize: "24px", fontWeight: 600, color: "#111" }}>Package not found</div>
        <button
          onClick={() => navigate("/")}
          style={{ background: "#00A63E", color: "#fff", border: "none", borderRadius: "100px", padding: "12px 28px", fontFamily: "'Sora', sans-serif", fontSize: "16px", fontWeight: 600, cursor: "pointer" }}
        >
          Back to Packages
        </button>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <span style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) return <span key={i} style={{ color: "#FFB800", fontSize: "18px" }}>★</span>;
          if (i === full && half) return <span key={i} style={{ color: "#FFB800", fontSize: "18px" }}>★</span>;
          return <span key={i} style={{ color: "#E0E0E0", fontSize: "18px" }}>★</span>;
        })}
      </span>
    );
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "information", label: "Information" },
    { id: "tourplan", label: "Tour Plan" },
    { id: "gallery", label: "Gallery" },
    { id: "rating", label: "Rating" },
  ];

  return (
    <>
      <div style={{ fontFamily: "'Sora', sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>
        <Navbar />

        {/* Hero Section */}
        <div className="detail-hero">
          <img
            src={pkg.image}
            alt={pkg.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)" }} />
          <div className="detail-hero-content">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span onClick={() => navigate("/")} style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 400, cursor: "pointer" }}>
                Packages
              </span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>›</span>
              {pkg.countries.map((country, i) => (
                <span key={country} style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 400 }}>
                  {country}{i < pkg.countries.length - 1 ? " · " : ""}
                </span>
              ))}
            </div>
            <h1 className="detail-hero-title">{pkg.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {renderStars(pkg.rating)}
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", fontWeight: 500 }}>{pkg.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div style={{ borderBottom: "1px solid #EEEEEE", backgroundColor: "#fff", position: "sticky", top: "72px", zIndex: 10 }}>
          <div className="detail-tabs-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "10px 18px",
                  borderRadius: "100px 100px 0 0",
                  border: activeTab === tab.id ? "1px solid #EEEEEE" : "1px solid transparent",
                  borderBottom: activeTab === tab.id ? "1px solid #fff" : "1px solid transparent",
                  backgroundColor: activeTab === tab.id ? "#fff" : "transparent",
                  color: activeTab === tab.id ? "#00A63E" : "#555555",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  marginBottom: activeTab === tab.id ? "-1px" : "0",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="detail-content">

          {/* ── INFORMATION TAB ── */}
          {activeTab === "information" && (
            <div>
              {/* Overview header + price — stacks on mobile */}
              <div className="detail-overview-row">
                <div>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 700, color: "#111111", margin: "0 0 10px 0" }}>
                    Tour Overview
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {pkg.days} Days / {pkg.nights} Nights
                    </span>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {pkg.countries.join(", ")}
                    </span>
                  </div>
                </div>
                {/* Price box */}
                <div style={{ backgroundColor: "#F0FBF4", border: "1px solid #C8EDD6", borderRadius: "12px", padding: "16px 22px", textAlign: "right", flexShrink: 0 }}>
                  {pkg.price !== null ? (
                    <>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", color: "#00A63E", fontWeight: 500, marginBottom: "4px" }}>Starting from</div>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "26px", color: "#00A63E", fontWeight: 700 }}>{formatPrice(pkg.price)}</div>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", color: "#888", marginTop: "4px" }}>per person</div>
                    </>
                  ) : (
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px", color: "#00A63E", fontWeight: 600 }}>Price on request</div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", lineHeight: "1.8", color: "#444444", marginBottom: "36px", maxWidth: "800px" }}>
                {pkg.description}
              </p>

              {/* Two-column: Highlights + Included — stacks on mobile */}
              <div className="detail-two-col">
                <div>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "18px", fontWeight: 700, color: "#111111", marginBottom: "16px" }}>Tour Highlights</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {pkg.highlights.map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#444444", lineHeight: "1.5" }}>
                        <span style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#00A63E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "18px", fontWeight: 700, color: "#111111", marginBottom: "16px" }}>What's Included</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {pkg.included.map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#444444", lineHeight: "1.5" }}>
                        <span style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#E8F5E9", border: "1px solid #00A63E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Categories */}
              <div style={{ marginTop: "32px" }}>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "18px", fontWeight: 700, color: "#111111", marginBottom: "14px" }}>Categories</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {pkg.categories.map((cat) => (
                    <span key={cat} style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: 500, color: "#00A63E", backgroundColor: "#EAF9EA", border: "1px solid #C8EDD6", borderRadius: "100px", padding: "6px 14px", textTransform: "capitalize" }}>
                      {cat.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TOUR PLAN TAB ── */}
          {activeTab === "tourplan" && (
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 700, color: "#111111", marginBottom: "32px" }}>Tour Plan</h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {pkg.tourPlan.map((day, index) => {
                  const isFirst = index === 0;
                  const isLast = index === pkg.tourPlan.length - 1;
                  const isSpecial = isFirst || isLast;
                  return (
                    <div key={day.day} style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "0", position: "relative" }}>
                      {/* Timeline column */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                        {!isFirst && <div style={{ width: "2px", height: "24px", backgroundColor: "#E0E0E0", flexShrink: 0 }} />}
                        {isFirst && <div style={{ height: "24px" }} />}
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "50%",
                          backgroundColor: isSpecial ? "#00A63E" : "#ffffff",
                          border: isSpecial ? "none" : "2px solid #CCCCCC",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Sora', sans-serif", fontSize: "12px", fontWeight: 700,
                          color: isSpecial ? "#ffffff" : "#666666", flexShrink: 0, zIndex: 1,
                        }}>
                          {day.day}
                        </div>
                        {!isLast && <div style={{ width: "2px", flex: 1, backgroundColor: "#E0E0E0", minHeight: "40px" }} />}
                      </div>
                      {/* Content column */}
                      <div style={{ paddingLeft: "20px", paddingBottom: "32px", paddingTop: "12px" }}>
                        <h4 style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px", fontWeight: 700, color: "#111111", margin: "0 0 8px 0" }}>{day.title}</h4>
                        <div className="tourplan-row">
                          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", lineHeight: "1.7", color: "#555555", margin: 0 }}>{day.description}</p>
                          <img src={day.image} alt={day.title} loading="lazy" className="tourplan-img" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── GALLERY TAB ── */}
          {activeTab === "gallery" && (
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 700, color: "#111111", marginBottom: "24px" }}>Gallery</h2>
              {pkg.gallery.length > 0 && (
                <>
                  <div className="gallery-main-grid">
                    <div style={{ borderRadius: "12px", overflow: "hidden", gridRow: "1 / 3" }}>
                      <img src={pkg.gallery[0].src} alt={pkg.gallery[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "300px" }} />
                    </div>
                    {pkg.gallery.slice(1, 5).map((img, i) => (
                      <div key={i} style={{ borderRadius: "12px", overflow: "hidden" }}>
                        <img src={img.src} alt={img.alt} loading="lazy" className="gallery-thumb" />
                      </div>
                    ))}
                  </div>
                  {pkg.gallery.length > 5 && (
                    <div className="gallery-extra-grid">
                      {pkg.gallery.slice(5).map((img, i) => (
                        <div key={i} style={{ borderRadius: "12px", overflow: "hidden" }}>
                          <img src={img.src} alt={img.alt} loading="lazy" style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ── RATING TAB ── */}
          {activeTab === "rating" && (
            <div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 700, color: "#111111", marginBottom: "32px" }}>Rating</h2>
              <div className="rating-grid">
                {/* Overall score */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#F0FBF4", border: "1px solid #C8EDD6", borderRadius: "16px", padding: "32px 24px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "64px", fontWeight: 800, color: "#00A63E", lineHeight: 1, marginBottom: "8px" }}>{pkg.rating.toFixed(1)}</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "11px", fontWeight: 600, color: "#888", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>OVERALL RATING</div>
                  <div style={{ marginBottom: "8px" }}>{renderStars(pkg.rating)}</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", color: "#888" }}>Based on traveller reviews</div>
                </div>
                {/* Rating breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "8px" }}>
                  {[
                    { label: "Accommodation", value: pkg.ratingBreakdown.accommodation },
                    { label: "Meals", value: pkg.ratingBreakdown.meals },
                    { label: "Transport", value: pkg.ratingBreakdown.transport },
                    { label: "Overall Experience", value: pkg.ratingBreakdown.overall },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", fontWeight: 600, color: "#333333" }}>{label}</span>
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", fontWeight: 700, color: "#00A63E" }}>{value.toFixed(1)}</span>
                      </div>
                      <div style={{ height: "8px", backgroundColor: "#EEEEEE", borderRadius: "100px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(value / 5) * 100}%`, backgroundColor: "#00A63E", borderRadius: "100px", transition: "width 0.6s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="detail-cta">
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "28px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
            Ready to get started?
          </h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "28px" }}>
            Contact us today and let us craft your perfect South American adventure.
          </p>
          <a
            href="mailto:info@hollaamericana.com"
            style={{ display: "inline-block", fontFamily: "'Sora', sans-serif", fontSize: "15px", fontWeight: 600, color: "#111111", backgroundColor: "#ffffff", borderRadius: "100px", padding: "13px 32px", textDecoration: "none" }}
          >
            Contact Us
          </a>
        </div>

        <Footer />
      </div>

      <style>{`
        /* Hero */
        .detail-hero {
          position: relative;
          width: 100%;
          height: 480px;
          overflow: hidden;
        }
        .detail-hero-content {
          position: absolute;
          bottom: 36px;
          left: 0;
          right: 0;
          padding: 0 64px;
        }
        .detail-hero-title {
          font-family: 'Sora', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 10px 0;
          line-height: 1.2;
          max-width: 700px;
        }

        /* Tabs */
        .detail-tabs-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 64px;
          display: flex;
          gap: 4px;
          padding-top: 14px;
          padding-bottom: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .detail-tabs-inner::-webkit-scrollbar { display: none; }

        /* Content */
        .detail-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 64px;
        }

        /* Overview row */
        .detail-overview-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
          gap: 20px;
        }

        /* Two column */
        .detail-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 32px;
        }

        /* Tour plan */
        .tourplan-row {
          display: grid;
          grid-template-columns: 1fr 240px;
          gap: 20px;
          align-items: start;
        }
        .tourplan-img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 10px;
        }

        /* Gallery */
        .gallery-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 10px;
        }
        .gallery-thumb {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }
        .gallery-extra-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 10px;
        }

        /* Rating */
        .rating-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 48px;
          align-items: start;
        }

        /* CTA */
        .detail-cta {
          background-color: #111111;
          padding: 56px 64px;
          text-align: center;
        }

        /* ── TABLET (≤1023px) ── */
        @media (max-width: 1023px) {
          .detail-hero-content { padding: 0 32px; }
          .detail-tabs-inner { padding: 14px 32px 0; }
          .detail-content { padding: 32px 32px; }
          .detail-cta { padding: 48px 32px; }
        }

        /* ── MOBILE (≤767px) ── */
        @media (max-width: 767px) {
          .detail-hero { height: 300px; }
          .detail-hero-content { bottom: 20px; padding: 0 18px; }
          .detail-hero-title { font-size: 22px; }

          .detail-tabs-inner { padding: 10px 16px 0; gap: 2px; }

          .detail-content { padding: 24px 16px; }

          .detail-overview-row {
            flex-direction: column;
            align-items: stretch;
          }
          .detail-overview-row > div:last-child {
            text-align: left;
          }

          .detail-two-col {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .tourplan-row {
            grid-template-columns: 1fr;
          }
          .tourplan-img { display: none; }

          .gallery-main-grid {
            grid-template-columns: 1fr;
          }
          .gallery-main-grid > div:first-child {
            grid-row: auto;
          }
          .gallery-thumb { height: 200px; }
          .gallery-extra-grid {
            grid-template-columns: 1fr 1fr;
          }

          .rating-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .detail-cta { padding: 40px 20px; }
          .detail-cta h2 { font-size: 22px; }
        }
      `}</style>
    </>
  );
}
