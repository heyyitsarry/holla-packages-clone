// FilterSection — responsive filter section
// Desktop: dropdowns side-by-side with reset button
// Mobile: dropdowns stack vertically, reset button full-width
// Category chips: always horizontal scrollable carousel

import { useRef, useState, useEffect } from "react";
import { CATEGORIES, COUNTRIES, PRICE_RANGES } from "@/lib/packages-data";
import { ICON_DATA_URIS } from "@/lib/icon-data";

interface FilterSectionProps {
  selectedCategories: string[];
  selectedCountry: string;
  selectedPriceRange: string;
  onCategoryToggle: (id: string) => void;
  onCountryChange: (country: string) => void;
  onPriceRangeChange: (range: string) => void;
  onReset: () => void;
  resultCount: number;
}

const ICON_MAP = ICON_DATA_URIS;

export default function FilterSection({
  selectedCategories,
  selectedCountry,
  selectedPriceRange,
  onCategoryToggle,
  onCountryChange,
  onPriceRangeChange,
  onReset,
  resultCount,
}: FilterSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const selectStyle: React.CSSProperties = {
    width: "100%",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0,0,0,0.23)",
    borderRadius: "100px",
    padding: "14px 48px 14px 24px",
    fontFamily: "'Sora', sans-serif",
    fontSize: "16px",
    color: "rgba(0,0,0,0.87)",
    cursor: "pointer",
    outline: "none",
  };

  return (
    <>
      <div>
        {/* Category section */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "17px", fontWeight: 400, color: "#000000", marginBottom: "0px" }}>
            Categories
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#A3A3A3", marginLeft: "6px" }}>
              You can select multiple
            </span>
          </div>

          {/* Scrollable carousel */}
          <div style={{ position: "relative" }}>
            <div
              ref={scrollRef}
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                padding: "16px 0",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              } as React.CSSProperties}
              onScroll={checkScroll}
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategories.includes(cat.id);
                const iconUrl = ICON_MAP[cat.id] || "";
                return (
                  <div
                    key={cat.id}
                    onClick={() => onCategoryToggle(cat.id)}
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100px",
                      height: "96px",
                      borderRadius: "12px",
                      border: isActive ? "2px solid #00A63E" : "2px solid transparent",
                      backgroundColor: isActive ? "#EAF9EA" : "transparent",
                      cursor: "pointer",
                      transition: "border-color 0.15s, background-color 0.15s",
                    }}
                  >
                    <div style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src={iconUrl}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: "36px",
                          height: "36px",
                          objectFit: "contain",
                          filter: isActive
                            ? "invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)"
                            : "none",
                          transition: "filter 0.15s",
                          opacity: isActive ? 1 : 0.7,
                        }}
                      />
                    </div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", fontWeight: 500, color: "#000000", marginTop: "6px", textAlign: "center" }}>
                      {cat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right scroll indicator */}
            {canScrollRight && (
              <button
                onClick={() => scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" })}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "1px solid #E5E5E5",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                ›
              </button>
            )}
          </div>
        </div>

        {/* Filter row: Country + Price + Reset — responsive via class */}
        <div className="filter-row">
          {/* Country Dropdown */}
          <div className="filter-dropdown">
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px", fontWeight: 400, color: "#000000", margin: "0 0 8px 0" }}>
              Country
            </p>
            <div style={{ position: "relative" }}>
              <select value={selectedCountry} onChange={(e) => onCountryChange(e.target.value)} style={selectStyle}>
                <option value="">Select...</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(0,0,0,0.54)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
              </div>
            </div>
          </div>

          {/* Price Range Dropdown */}
          <div className="filter-dropdown">
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px", fontWeight: 400, color: "#000000", margin: "0 0 8px 0" }}>
              Price Range
            </p>
            <div style={{ position: "relative" }}>
              <select value={selectedPriceRange} onChange={(e) => onPriceRangeChange(e.target.value)} style={selectStyle}>
                {PRICE_RANGES.map((r) => <option key={r.label} value={r.label}>{r.label}</option>)}
              </select>
              <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(0,0,0,0.54)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="filter-reset">
            <p style={{ margin: "0 0 8px 0", visibility: "hidden", fontSize: "16px", fontFamily: "'Sora', sans-serif" }}>x</p>
            <button
              onClick={onReset}
              style={{
                backgroundColor: "#ffffff",
                color: "#333333",
                border: "1px solid #E5E5E5",
                borderRadius: "8px",
                padding: "14px 18px",
                fontFamily: "'Sora', sans-serif",
                fontSize: "15px",
                fontWeight: 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Showing X packages */}
        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#666666", fontWeight: 400, marginTop: "16px", marginBottom: 0 }}>
          Showing {resultCount} package{resultCount !== 1 ? "s" : ""}
        </p>
      </div>

      <style>{`
        .filter-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .filter-dropdown {
          flex: 1;
        }
        .filter-reset {
          flex-shrink: 0;
          min-width: 130px;
        }
        @media (max-width: 767px) {
          .filter-row {
            flex-direction: column;
            gap: 16px;
          }
          .filter-dropdown {
            width: 100%;
          }
          .filter-reset {
            width: 100%;
            min-width: unset;
          }
          .filter-reset p {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
