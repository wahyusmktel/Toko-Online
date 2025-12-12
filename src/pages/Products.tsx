import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some((c) =>
          p.category.toLowerCase().includes(c.toLowerCase())
        )
      );
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by rating
    result = result.filter((p) => p.rating >= minRating);

    // Sort
    switch (sortBy) {
      case "newest":
        // Mock: reverse order for "newest"
        result.reverse();
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.sold - a.sold);
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, minRating, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4">
            <span>Beranda</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">
              {searchQuery
                ? `Hasil pencarian "${searchQuery}"`
                : categoryParam
                ? categoryParam
                : "Semua Produk"}
            </span>
          </nav>

          <div className="flex gap-6">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-card rounded-lg p-4 sticky top-24 shadow-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Kategori</h4>
                  <div className="space-y-2">
                    {categories.slice(0, 6).map((category) => (
                      <div key={category.id} className="flex items-center gap-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(
                            category.name.toLowerCase()
                          )}
                          onCheckedChange={() =>
                            toggleCategory(category.name.toLowerCase())
                          }
                        />
                        <Label
                          htmlFor={category.id}
                          className="text-sm cursor-pointer"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Harga</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={50000000}
                    step={100000}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Rp{(priceRange[0] / 1000000).toFixed(1)}jt</span>
                    <span>Rp{(priceRange[1] / 1000000).toFixed(1)}jt</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Rating Minimal</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex items-center gap-2 w-full p-2 rounded text-sm transition-colors ${
                          minRating === rating
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary"
                        }`}
                      >
                        {"⭐".repeat(rating)} ke atas
                      </button>
                    ))}
                    <button
                      onClick={() => setMinRating(0)}
                      className={`w-full p-2 rounded text-sm transition-colors ${
                        minRating === 0
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      Semua Rating
                    </button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 50000000]);
                    setMinRating(0);
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-card rounded-lg p-4 mb-4 flex items-center justify-between shadow-card">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {filteredProducts.length} produk ditemukan
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm hidden sm:inline">Urutkan:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Terpopuler</SelectItem>
                      <SelectItem value="newest">Terbaru</SelectItem>
                      <SelectItem value="price-low">Harga Terendah</SelectItem>
                      <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                      <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden bg-card rounded-lg p-4 mb-4 animate-slide-down shadow-card">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Kategori</h4>
                      <div className="space-y-1">
                        {categories.slice(0, 4).map((category) => (
                          <div key={category.id} className="flex items-center gap-2">
                            <Checkbox
                              id={`m-${category.id}`}
                              checked={selectedCategories.includes(
                                category.name.toLowerCase()
                              )}
                              onCheckedChange={() =>
                                toggleCategory(category.name.toLowerCase())
                              }
                            />
                            <Label htmlFor={`m-${category.id}`} className="text-xs">
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Rating</h4>
                      <Select
                        value={minRating.toString()}
                        onValueChange={(v) => setMinRating(Number(v))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Semua</SelectItem>
                          <SelectItem value="4">⭐4+</SelectItem>
                          <SelectItem value="3">⭐3+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg p-12 text-center shadow-card">
                  <p className="text-lg text-muted-foreground">
                    Tidak ada produk ditemukan
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 50000000]);
                      setMinRating(0);
                    }}
                  >
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
