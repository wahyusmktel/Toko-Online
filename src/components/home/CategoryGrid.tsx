import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import {
  Smartphone,
  Shirt,
  ShoppingBag,
  Sparkles,
  Heart,
  Home,
  Dumbbell,
  UtensilsCrossed,
  Gamepad2,
  Car,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Shirt,
  ShoppingBag,
  Sparkles,
  Heart,
  Home,
  Dumbbell,
  UtensilsCrossed,
  Gamepad2,
  Car,
};

export function CategoryGrid() {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Kategori</h2>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Smartphone;
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-secondary transition-colors"
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon
                    className="h-6 w-6 md:h-7 md:w-7"
                    style={{ color: category.color }}
                  />
                </div>
                <span className="text-xs text-center text-foreground font-medium line-clamp-2">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
