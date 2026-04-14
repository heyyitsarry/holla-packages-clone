// PackageDetail — pixel-perfect clone of hollaamericana.com/packages/[slug]/
// Design: Sora font, #00A63E green, white bg, 4 tabs (Information, Tour Plan, Gallery, Rating)
// Hero: full-width image with dark overlay, breadcrumb, title, star rating
// Tabs: pill-shaped, active = green bg white text, inactive = white bg dark text
// Information: overview + price, description, highlights, included, categories
// Tour Plan: vertical timeline with day circles
// Gallery: masonry-style grid
// Rating: large score + progress bars

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
    <div style={{ fontFamily: "'Sora', sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "480px",
          overflow: "hidden",
          marginTop: "0",
        }}
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        {/* Hero content */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "0",
            right: "0",
            padding: "0 80px",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <span
              onClick={() => navigate("/")}
              style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: 400, cursor: "pointer" }}
            >
              Packages
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>›</span>
            {pkg.countries.map((country, i) => (
              <span key={country} style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: 400 }}>
                {country}{i < pkg.countries.length - 1 ? " · " : ""}
              </span>
            ))}
          </div>
          {/* Title */}
          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "40px",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 12px 0",
              lineHeight: "1.2",
              maxWidth: "700px",
            }}
          >
            {pkg.title}
          </h1>
          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {renderStars(pkg.rating)}
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", fontWeight: 500 }}>
              {pkg.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div
        style={{
          borderBottom: "1px solid #EEEEEE",
          backgroundColor: "#fff",
          position: "sticky",
          top: "72px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px",
            display: "flex",
            gap: "8px",
            paddingTop: "16px",
            paddingBottom: "0",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                padding: "10px 24px",
                borderRadius: "100px 100px 0 0",
                border: activeTab === tab.id ? "1px solid #EEEEEE" : "1px solid transparent",
                borderBottom: activeTab === tab.id ? "1px solid #fff" : "1px solid transparent",
                backgroundColor: activeTab === tab.id ? "#fff" : "transparent",
                color: activeTab === tab.id ? "#00A63E" : "#555555",
                cursor: "pointer",
                transition: "all 0.15s ease",
                marginBottom: activeTab === tab.id ? "-1px" : "0",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "48px 80px",
        }}
      >
        {/* ── INFORMATION TAB ── */}
        {activeTab === "information" && (
          <div>
            {/* Overview header + price */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "32px",
                gap: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#111111",
                    margin: "0 0 8px 0",
                  }}
                >
                  Tour Overview
                </h2>
                <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {pkg.days} Days / {pkg.nights} Nights
                  </span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A63E" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {pkg.countries.join(", ")}
                  </span>
                </div>
              </div>
              {/* Price box */}
              <div
                style={{
                  backgroundColor: "#F0FBF4",
                  border: "1px solid #C8EDD6",
                  borderRadius: "12px",
                  padding: "20px 28px",
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {pkg.price !== null ? (
                  <>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", color: "#00A63E", fontWeight: 500, marginBottom: "4px" }}>
                      Starting from
                    </div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "28px", color: "#00A63E", fontWeight: 700 }}>
                      {formatPrice(pkg.price)}
                    </div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", color: "#888", marginTop: "4px" }}>
                      per person
                    </div>
                  </>
                ) : (
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "18px", color: "#00A63E", fontWeight: 600 }}>
                    Price on request
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "16px",
                lineHeight: "1.8",
                color: "#444444",
                marginBottom: "40px",
                maxWidth: "800px",
              }}
            >
              {pkg.description}
            </p>

            {/* Two-column: Highlights + Included */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                marginBottom: "40px",
              }}
            >
              {/* Tour Highlights */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "20px",
                  }}
                >
                  Tour Highlights
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {pkg.highlights.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontFamily: "'Sora', sans-serif",
                        fontSize: "15px",
                        color: "#444444",
                        lineHeight: "1.5",
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#00A63E",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Included */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "20px",
                  }}
                >
                  What's Included
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {pkg.included.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontFamily: "'Sora', sans-serif",
                        fontSize: "15px",
                        color: "#444444",
                        lineHeight: "1.5",
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#E8F5E9",
                          border: "1px solid #00A63E",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#00A63E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "16px",
                }}
              >
                Categories
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {pkg.categories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#00A63E",
                      backgroundColor: "#EAF9EA",
                      border: "1px solid #C8EDD6",
                      borderRadius: "100px",
                      padding: "6px 16px",
                      textTransform: "capitalize",
                    }}
                  >
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
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "40px",
              }}
            >
              Tour Plan
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {pkg.tourPlan.map((day, index) => {
                const isFirst = index === 0;
                const isLast = index === pkg.tourPlan.length - 1;
                const isSpecial = isFirst || isLast;
                return (
                  <div
                    key={day.day}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "60px 1fr",
                      gap: "0",
                      position: "relative",
                    }}
                  >
                    {/* Timeline column */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      {/* Vertical line above circle */}
                      {!isFirst && (
                        <div
                          style={{
                            width: "2px",
                            height: "24px",
                            backgroundColor: "#E0E0E0",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {isFirst && <div style={{ height: "24px" }} />}
                      {/* Circle */}
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: isSpecial ? "#00A63E" : "#ffffff",
                          border: isSpecial ? "none" : "2px solid #CCCCCC",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Sora', sans-serif",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: isSpecial ? "#ffffff" : "#666666",
                          flexShrink: 0,
                          zIndex: 1,
                        }}
                      >
                        {day.day}
                      </div>
                      {/* Vertical line below circle */}
                      {!isLast && (
                        <div
                          style={{
                            width: "2px",
                            flex: 1,
                            backgroundColor: "#E0E0E0",
                            minHeight: "40px",
                          }}
                        />
                      )}
                    </div>

                    {/* Content column */}
                    <div
                      style={{
                        paddingLeft: "24px",
                        paddingBottom: "40px",
                        paddingTop: "16px",
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#111111",
                          margin: "0 0 8px 0",
                        }}
                      >
                        {day.title}
                      </h4>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 280px",
                          gap: "24px",
                          alignItems: "start",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: "15px",
                            lineHeight: "1.7",
                            color: "#555555",
                            margin: 0,
                          }}
                        >
                          {day.description}
                        </p>
                        <img
                          src={day.image}
                          alt={day.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "160px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
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
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "32px",
              }}
            >
              Gallery
            </h2>
            {pkg.gallery.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "auto auto",
                  gap: "12px",
                }}
              >
                {/* Large image — left, spans 2 rows */}
                <div
                  style={{
                    gridRow: "1 / 3",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={pkg.gallery[0].src}
                    alt={pkg.gallery[0].alt}
                    style={{
                      width: "100%",
                      height: "480px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                {/* Right column: smaller images */}
                {pkg.gallery.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "228px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {/* Additional images row */}
            {pkg.gallery.length > 5 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginTop: "12px",
                }}
              >
                {pkg.gallery.slice(5).map((img, i) => (
                  <div
                    key={i}
                    style={{ borderRadius: "12px", overflow: "hidden" }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── RATING TAB ── */}
        {activeTab === "rating" && (
          <div>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "40px",
              }}
            >
              Rating
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                gap: "64px",
                alignItems: "start",
              }}
            >
              {/* Overall score */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#F0FBF4",
                  border: "1px solid #C8EDD6",
                  borderRadius: "16px",
                  padding: "40px 32px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "72px",
                    fontWeight: 800,
                    color: "#00A63E",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {pkg.rating.toFixed(1)}
                </div>
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#888",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  OVERALL RATING
                </div>
                <div style={{ marginBottom: "8px" }}>
                  {renderStars(pkg.rating)}
                </div>
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "13px",
                    color: "#888",
                  }}
                >
                  Based on traveller reviews
                </div>
              </div>

              {/* Rating breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "28px", paddingTop: "8px" }}>
                {[
                  { label: "Accommodation", value: pkg.ratingBreakdown.accommodation },
                  { label: "Meals", value: pkg.ratingBreakdown.meals },
                  { label: "Transport", value: pkg.ratingBreakdown.transport },
                  { label: "Overall Experience", value: pkg.ratingBreakdown.overall },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#333333",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#00A63E",
                        }}
                      >
                        {value.toFixed(1)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        backgroundColor: "#EEEEEE",
                        borderRadius: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(value / 5) * 100}%`,
                          backgroundColor: "#00A63E",
                          borderRadius: "100px",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div
        style={{
          backgroundColor: "#111111",
          padding: "64px 80px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "12px",
          }}
        >
          Ready to get started?
        </h2>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "16px",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "32px",
          }}
        >
          Contact us today and let us craft your perfect South American adventure.
        </p>
        <a
          href="mailto:info@hollaamericana.com"
          style={{
            display: "inline-block",
            fontFamily: "'Sora', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#111111",
            backgroundColor: "#ffffff",
            borderRadius: "100px",
            padding: "14px 36px",
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
        >
          Contact Us
        </a>
      </div>

      <Footer />
    </div>
  );
}
