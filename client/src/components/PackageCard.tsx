// PackageCard — individual tour package card
// Design: white card, image top, title/duration/price/countries below
// Green price accent (#00C853), hover lift effect

import type { Package } from "@/lib/packages-data";

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <a
      href="#"
      className="group block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      style={{ textDecoration: "none" }}
    >
      {/* Card Image */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3
          className="font-bold text-gray-900 mb-1 leading-snug"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {pkg.title}
        </h3>

        {/* Duration */}
        <p
          className="text-gray-500 mb-2"
          style={{ fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}
        >
          {pkg.days} Days / {pkg.nights} Nights
        </p>

        {/* Price */}
        {pkg.price !== null ? (
          <p
            className="mb-1"
            style={{ fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="text-gray-500">Starting from </span>
            <span
              className="font-bold"
              style={{ color: "#00C853", fontSize: "1rem" }}
            >
              {formatPrice(pkg.price)}
            </span>
          </p>
        ) : (
          <p
            className="mb-1 text-gray-400 italic"
            style={{ fontSize: "0.85rem" }}
          >
            Price on request
          </p>
        )}

        {/* Countries */}
        <p
          className="text-gray-500"
          style={{ fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}
        >
          {pkg.countries.join(" · ")}
        </p>
      </div>
    </a>
  );
}
