// Home Page — Holla Americana Packages Clone
// Assembles: Navbar, HeroSection, FilterSection, PackageGrid, Footer
// Design: Expedition Cartography — dark hero, green accents, DM Sans body

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

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((pkg) =>
        selectedCategories.some((cat) => pkg.categories.includes(cat))
      );
    }

    // Filter by country
    if (selectedCountry) {
      result = result.filter((pkg) =>
        pkg.countries.includes(selectedCountry)
      );
    }

    // Filter by price range
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero with Navbar overlaid */}
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>

      {/* Filter Section */}
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

      {/* Package Grid */}
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4">🌎</div>
              <h3
                className="text-gray-700 font-semibold mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem" }}
              >
                No packages found
              </h3>
              <p
                className="text-gray-400"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}
              >
                Try adjusting your filters to find the perfect tour.
              </p>
              <button
                onClick={handleReset}
                className="mt-5 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:brightness-95"
                style={{ backgroundColor: "#FFD600", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
