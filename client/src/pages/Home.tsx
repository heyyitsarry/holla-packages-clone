// Home Page — responsive clone of hollaamericana.com/packages/
// Cards: 4 cols desktop, 2 cols tablet (≥640px), 1 col mobile
// Content padding: 64px 32px desktop, 32px 16px mobile

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
      result = result.filter((pkg) => pkg.countries.includes(selectedCountry));
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
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'Sora', sans-serif" }}>
        <Navbar />
        <main>
          <HeroSection />

          <div className="home-content">
            <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
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

              {filteredPackages.length > 0 ? (
                <div className="cards-grid">
                  {filteredPackages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "18px", color: "#666666", marginBottom: "16px" }}>
                    No packages found matching your filters.
                  </p>
                  <button
                    onClick={handleReset}
                    style={{ backgroundColor: "#ffffff", color: "#333333", border: "1px solid #E5E5E5", borderRadius: "8px", padding: "10px 18px", fontFamily: "'Sora', sans-serif", fontSize: "15px", cursor: "pointer" }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <style>{`
        .home-content {
          padding: 56px 32px;
          background-color: #ffffff;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          margin-top: 24px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 767px) {
          .home-content {
            padding: 28px 16px;
          }
          .cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }
        }
        @media (max-width: 479px) {
          .cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}
