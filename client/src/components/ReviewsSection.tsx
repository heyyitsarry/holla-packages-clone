// Google-style reviews section with star ratings, reviewer names, and testimonials
// Design: White bg, grid layout (2 cols desktop, 1 col mobile), review cards with subtle shadows

interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    date: "2 months ago",
    text: "Absolutely amazing experience! Vandana and her team made our South America trip unforgettable. The attention to detail and personalized service was exceptional. Highly recommended!",
    verified: true,
  },
  {
    name: "Priya Sharma",
    rating: 5,
    date: "1 month ago",
    text: "Best travel company for Indian travelers. The guides were knowledgeable, accommodations were premium, and the itinerary was perfectly balanced. Worth every penny!",
    verified: true,
  },
  {
    name: "Amit Patel",
    rating: 5,
    date: "3 weeks ago",
    text: "Had an incredible Peru trip with Orchid Vacations. The Machu Picchu experience was breathtaking. Vandana's team handled everything seamlessly. Booking again for Argentina!",
    verified: true,
  },
  {
    name: "Neha Gupta",
    rating: 5,
    date: "2 weeks ago",
    text: "Fantastic service from start to finish. The Indian meals were authentic, guides spoke Hindi fluently, and the entire experience felt like a home away from home. Highly satisfied!",
    verified: true,
  },
  {
    name: "Vikram Singh",
    rating: 5,
    date: "1 week ago",
    text: "Orchid Vacations exceeded all my expectations. The 5-country tour was perfectly organized with no stress. Vandana's attention to detail is remarkable. Will definitely return!",
    verified: true,
  },
  {
    name: "Anjali Reddy",
    rating: 5,
    date: "3 days ago",
    text: "Outstanding experience! The team went above and beyond to make our family trip special. Highly professional, responsive, and genuinely caring. Best decision ever!",
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FFC107" : "#E0E0E0"}
          style={{ flexShrink: 0 }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ fontSize: "13px", color: "#666", marginLeft: "4px" }}>({rating}.0)</span>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        padding: "80px 24px",
        width: "100%",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "36px",
              fontWeight: 600,
              color: "#111111",
              margin: 0,
              marginBottom: "12px",
            }}
          >
            What Our Travelers Say
          </h2>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#666666",
              margin: 0,
            }}
          >
            Trusted by hundreds of Indian travelers for unforgettable South American adventures
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E8E8",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Star Rating */}
              <div style={{ marginBottom: "12px" }}>
                <StarRating rating={review.rating} />
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#333333",
                  lineHeight: "1.6",
                  margin: "0 0 16px 0",
                }}
              >
                {review.text}
              </p>

              {/* Reviewer Info */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111111",
                      margin: 0,
                    }}
                  >
                    {review.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#999999",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {review.date}
                  </p>
                </div>
                {review.verified && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#E8F5E9",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#4CAF50">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#4CAF50",
                      }}
                    >
                      Verified
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating Summary */}
        <div
          style={{
            marginTop: "60px",
            padding: "32px",
            backgroundColor: "#F9F9F9",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "48px",
                  fontWeight: 700,
                  color: "#111111",
                  margin: 0,
                }}
              >
                4.9
              </p>
              <div style={{ marginTop: "8px" }}>
                <StarRating rating={5} />
              </div>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#666666",
                  margin: "8px 0 0 0",
                }}
              >
                Based on 200+ reviews
              </p>
            </div>
            <div style={{ height: "60px", width: "1px", backgroundColor: "#E0E0E0" }} />
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "#333333",
                margin: 0,
                maxWidth: "300px",
              }}
            >
              Join hundreds of satisfied travelers who've experienced the magic of South America with Orchid Vacations by Vandana
            </p>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          [data-reviews-grid] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
