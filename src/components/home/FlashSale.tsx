import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { flashSaleProducts, formatPrice } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 5, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1">
      <span className="bg-foreground text-background px-2 py-1 rounded font-mono font-bold text-sm">
        {pad(time.hours)}
      </span>
      <span className="font-bold">:</span>
      <span className="bg-foreground text-background px-2 py-1 rounded font-mono font-bold text-sm">
        {pad(time.minutes)}
      </span>
      <span className="font-bold">:</span>
      <span className="bg-foreground text-background px-2 py-1 rounded font-mono font-bold text-sm">
        {pad(time.seconds)}
      </span>
    </div>
  );
}

export function FlashSale() {
  return (
    <section className="py-8 bg-gradient-primary">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary-foreground fill-primary-foreground" />
              <h2 className="text-xl md:text-2xl font-bold text-primary-foreground">
                Flash Sale
              </h2>
            </div>
            <CountdownTimer />
          </div>
          <Link to="/flash-sale">
            <Button variant="outline" size="sm" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Lihat Semua
            </Button>
          </Link>
        </div>

        {/* Products */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {flashSaleProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex-shrink-0 w-36 md:w-44 bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <Badge variant="flash" className="absolute top-2 left-2">
                  -{product.discount}%
                </Badge>
              </div>
              <div className="p-3">
                <p className="text-base font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                <div className="mt-2 relative h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                    style={{ width: `${Math.random() * 40 + 50}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  Tersisa {Math.floor(Math.random() * 50) + 10}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
