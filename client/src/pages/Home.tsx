// Home Page — pixel-perfect clone of hollaamericana.com/packages/
// DOM structure mirrors original:
//   <header fixed> (Navbar)
//   <main class="listing-page">
//     <section class="banner section"> (hero 550px, img absolute z-1, h1 bottom-left)
//     <div class="content section"> (padding 64px 16px)
//       <div class="section-content" maxWidth 1440px>
//         <div class="filters-section">
//           <div class="category-section"> (gesture-carousel)
//           <div class="filters"> (country + price + reset)
//           <p showing count>
//         <div class="cards-section"> (grid 4 cols, gap 24px, padding 24px 16px)
//   <footer>

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterSection from "@/components/FilterSection";
import PackageCard from "@/components/PackageCard";
import Footer from "@/components/Footer";
import { PACKAGES, PRICE_RANGES } from "@/lib/packages-data";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All Prices");

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedCountry("");
    setSelectedPriceRange("All Prices");
  };

  const filteredPackages = useMemo(() => {
    let result = PACKAGES;

    if (selectedCategories.length > 0) {
      result = result.filter((pkg) =>
        selectedCategories.some((cat) => pkg.categories.includes(cat))
      );
    }

    if (selectedCountry) {
      result = result.filter((pkg) =>
        pkg.countries.includes(selectedCountry)
      );
    }

    if (selectedPriceRange !== "All Prices") {
      const range = PRICE_RANGES.find((r) => r.label === selectedPriceRange);
      if (range) {
        result = result.filter((pkg) => {
          if (pkg.price === null) return false;
          return pkg.price >= range.min && pkg.price <= range.max;
        });
      }
    }

    return result;
  }, [selectedCategories, selectedCountry, selectedPriceRange]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'Sora', sans-serif" }}>
      {/* Fixed Header */}
      <Navbar />

      {/* Main content — listing-page */}
      <main>
        {/* Banner section */}
        <HeroSection />

        {/* Content section */}
        <div style={{ padding: "64px 16px", backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
            {/* Filters section */}
            <FilterSection
              selectedCategories={selectedCategories}
              selectedCountry={selectedCountry}
              selectedPriceRange={selectedPriceRange}
              onCategoryToggle={handleCategoryToggle}
              onCountryChange={setSelectedCountry}
              onPriceRangeChange={setSelectedPriceRange}
              onReset={handleReset}
              resultCount={filteredPackages.length}
            />

            {/* Cards section */}
            {filteredPackages.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: "24px",
                  marginTop: "24px",
                  alignItems: "start",
                }}
              >
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 0",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "18px",
                    color: "#666666",
                    marginBottom: "16px",
                  }}
                >
                  No packages found matching your filters.
                </p>
                <button
                  onClick={handleReset}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#333333",
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    cursor: "pointer",
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
