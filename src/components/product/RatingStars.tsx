import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function RatingStars({ rating, size = "md", showValue = true }: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= Math.floor(rating)
                ? "fill-warning text-warning"
                : star - 0.5 <= rating
                ? "fill-warning/50 text-warning"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className={`${textClasses[size]} text-muted-foreground ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
