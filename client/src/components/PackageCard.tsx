// PackageCard — pixel-perfect clone of hollaamericana.com package-card
// Card: white bg, 1px solid #EEEEEE border, border-radius 12px, box-shadow rgba(0,0,0,0.06) 0px 2px 8px
// Image: 220px height, object-fit cover, no border-radius (overflow hidden on card)
// Body: padding 22px, display flex, flex-direction column, gap 12px
// Title: Sora 22px 600 #000000, line-height 33px
// Duration: Sora 16px 400 #666666
// Price prefix: Sora 13.5px 500 #00A63E
// Price value: Sora 18px 700 #00A63E
// Meta (countries): Sora 14px 400 #777777

import { Link } from "wouter";
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
    <Link
      href={`/packages/${pkg.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        border: "1px solid #EEEEEE",
        borderRadius: "12px",
        boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 8px 0px",
        overflow: "hidden",
        textDecoration: "none",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "rgba(0, 0, 0, 0.12) 0px 4px 16px 0px";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "rgba(0, 0, 0, 0.06) 0px 2px 8px 0px";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
      }}
    >
      {/* Card Media */}
      <div
        style={{
          height: "220px",
          overflow: "hidden",
          display: "block",
        }}
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: "22px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "22px",
            fontWeight: 600,
            color: "#000000",
            lineHeight: "33px",
            margin: 0,
          }}
        >
          {pkg.title}
        </div>

        {/* Duration */}
        <div
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            color: "#666666",
            margin: 0,
          }}
        >
          {pkg.days} Days / {pkg.nights} Nights
        </div>

        {/* Price */}
        {pkg.price !== null ? (
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "18px",
              color: "#00A63E",
              fontWeight: 600,
              margin: 0,
            }}
          >
            <span
              style={{
                fontSize: "13.5px",
                fontWeight: 500,
                color: "#00A63E",
                marginRight: "4px",
              }}
            >
              Starting from
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#00A63E",
              }}
            >
              {formatPrice(pkg.price)}
            </span>
          </div>
        ) : (
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "13.5px",
              fontWeight: 500,
              color: "#00A63E",
            }}
          >
            Price on request
          </div>
        )}

        {/* Countries / Meta */}
        <div
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "#777777",
            margin: 0,
          }}
        >
          {pkg.countries.join(" · ")}
        </div>
      </div>
    </Link>
  );
}
