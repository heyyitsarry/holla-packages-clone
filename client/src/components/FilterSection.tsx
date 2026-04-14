// FilterSection — categories, country dropdown, price range, reset button
// Design: white bg, green active chips, yellow reset button, DM Sans typography

import { useState, useRef, useEffect } from "react";
import { CATEGORIES, COUNTRIES, PRICE_RANGES } from "@/lib/packages-data";

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
  }, []);

  // Category icon mapping (SVG-like icons using emoji for simplicity matching original)
  const getCategoryIcon = (id: string) => {
    const icons: Record<string, string> = {
      adventure: "⛺",
      amazon: "🌿",
      beaches: "🏖️",
      cities: "🏙️",
      culture: "🎭",
      desert: "🏜️",
      "eco-lodge": "🌱",
      glaciers: "🧊",
      "grand-tours": "🗺️",
      "group-tours": "👥",
      heritage: "🏛️",
      history: "📜",
      lakes: "💧",
      luxury: "💎",
      mountains: "⛰️",
      "multi-country": "🌎",
      nature: "🌳",
      patagonia: "🦅",
      "salt-flats": "🪨",
      wildlife: "🦜",
      wonders: "✨",
    };
    return icons[id] || "🌍";
  };

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Categories Row */}
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-semibold text-gray-900"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}
            >
              Categories
            </span>
            <span
              className="text-gray-400"
              style={{ fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}
            >
              You can select multiple
            </span>
          </div>

          {/* Scrollable categories strip */}
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={() => {
                  scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center border border-gray-200 hover:bg-gray-50"
              >
                ‹
              </button>
            )}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onScroll={checkScroll}
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => onCategoryToggle(cat.id)}
                    className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all duration-200 min-w-[72px]"
                    style={{
                      borderColor: isActive ? "#00C853" : "#E5E7EB",
                      backgroundColor: isActive ? "#F0FFF4" : "#FAFAFA",
                      color: isActive ? "#00C853" : "#6B7280",
                    }}
                  >
                    <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>
                      {getCategoryIcon(cat.id)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        color: isActive ? "#00C853" : "#374151",
                      }}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {canScrollRight && (
              <button
                onClick={() => {
                  scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center border border-gray-200 hover:bg-gray-50"
              >
                ›
              </button>
            )}
          </div>
        </div>

        {/* Country + Price + Reset Row */}
        <div className="flex flex-wrap items-end gap-4">
          {/* Country Dropdown */}
          <div className="flex-1 min-w-[200px] max-w-sm">
            <label
              className="block text-gray-700 font-medium mb-1.5"
              style={{ fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif" }}
            >
              Country
            </label>
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => onCountryChange(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2.5 pr-10 bg-white text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}
              >
                <option value="">Select...</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price Range Dropdown */}
          <div className="flex-1 min-w-[200px] max-w-sm">
            <label
              className="block text-gray-700 font-medium mb-1.5"
              style={{ fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif" }}
            >
              Price Range
            </label>
            <div className="relative">
              <select
                value={selectedPriceRange}
                onChange={(e) => onPriceRangeChange(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2.5 pr-10 bg-white text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}
              >
                {PRICE_RANGES.map((r) => (
                  <option key={r.label} value={r.label}>
                    {r.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="flex flex-col justify-end">
            <button
              onClick={onReset}
              className="px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:brightness-95 active:scale-95"
              style={{
                backgroundColor: "#FFD600",
                color: "#1A1A1A",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                border: "none",
                marginBottom: "0px",
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4">
          <p
            className="text-gray-500"
            style={{ fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}
          >
            Showing{" "}
            <span className="font-semibold text-gray-700">{resultCount}</span>{" "}
            package{resultCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
