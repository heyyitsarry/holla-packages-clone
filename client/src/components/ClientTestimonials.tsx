import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    image: '/images/group-photo-1.webp',
    title: 'India Temple Tour Group',
    description: 'An unforgettable spiritual journey through India\'s most sacred temples',
  },
  {
    id: 2,
    image: '/images/group-photo-2.webp',
    title: 'Japan Cultural Experience',
    description: 'Experiencing the beauty and tradition of Japan with our wonderful group',
  },
];

export default function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-600 tracking-widest mb-3">
            OUR CLIENTS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Happy Travelers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the joy and memories our clients create on their journeys with Orchid Vacations
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {testimonial.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-100">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-green-600 w-8'
                    : 'bg-gray-300 w-3 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
