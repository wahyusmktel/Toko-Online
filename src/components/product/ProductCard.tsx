import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Product, formatPrice, formatSold } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  showFlashSale?: boolean;
}

export function ProductCard({ product, showFlashSale }: ProductCardProps) {
  const discountedPrice = product.originalPrice
    ? product.price
    : product.price;
  
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-lg border overflow-hidden hover-lift shadow-card"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.discount && (
          <Badge
            variant={showFlashSale ? "flash" : "discount"}
            className="absolute top-2 left-2"
          >
            -{product.discount}%
          </Badge>
        )}
        {showFlashSale && (
          <div className="absolute bottom-0 left-0 right-0 bg-primary/90 py-1">
            <div className="relative h-2 mx-2 bg-primary-foreground/30 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-primary-foreground rounded-full"
                style={{ width: `${Math.random() * 40 + 30}%` }}
              />
            </div>
            <p className="text-center text-xs text-primary-foreground mt-1 font-medium">
              Sedang terjual
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-card-foreground line-clamp-2 min-h-[2.5rem] leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-2">
          <p className="text-lg font-bold text-primary">
            {formatPrice(discountedPrice)}
          </p>
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>

        {/* Rating & Sold */}
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span>{product.rating}</span>
          </div>
          <span>|</span>
          <span>Terjual {formatSold(product.sold)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{product.shop.location}</span>
        </div>
      </div>
    </Link>
  );
}
