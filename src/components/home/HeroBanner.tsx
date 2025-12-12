import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="container py-4 md:py-6">
        <div className="relative rounded-xl overflow-hidden aspect-[3/1] md:aspect-[3.5/1]">
          {banners.map((banner, index) => (
            <Link
              key={banner.id}
              to={banner.link}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent flex items-center">
                <div className="pl-6 md:pl-12 max-w-md">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                    {banner.title}
                  </h2>
                  <p className="text-sm md:text-lg text-primary-foreground/90 mb-4">
                    {banner.subtitle}
                  </p>
                  <Button variant="buy" size="lg" className="hidden md:inline-flex">
                    Belanja Sekarang
                  </Button>
                </div>
              </div>
            </Link>
          ))}

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.preventDefault(); prevSlide(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.preventDefault(); nextSlide(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary-foreground w-6"
                    : "bg-primary-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
