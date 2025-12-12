import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-primary shadow-md">
      {/* Top Bar */}
      <div className="hidden md:block border-b border-primary-foreground/10">
        <div className="container flex items-center justify-between py-1 text-xs text-primary-foreground/80">
          <div className="flex items-center gap-4">
            <span>Seller Centre</span>
            <span>Mulai Berjualan</span>
            <span>Download App</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Bantuan</span>
            <span>Bahasa</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container py-3">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="text-primary font-extrabold text-xl">S</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary-foreground hidden sm:block">
              ShopRed
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-20 rounded-lg bg-primary-foreground border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 h-8 px-4 bg-primary hover:bg-primary-dark"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/auth/login" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <User className="h-5 w-5 mr-2" />
                Masuk
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories Bar - Desktop */}
        <nav className="hidden md:flex items-center gap-6 mt-3 text-sm text-primary-foreground/90">
          <Link to="/products" className="hover:text-primary-foreground transition-colors flex items-center gap-1">
            Semua Kategori <ChevronDown className="h-4 w-4" />
          </Link>
          <Link to="/products?category=elektronik" className="hover:text-primary-foreground transition-colors">
            Elektronik
          </Link>
          <Link to="/products?category=fashion" className="hover:text-primary-foreground transition-colors">
            Fashion
          </Link>
          <Link to="/products?category=kecantikan" className="hover:text-primary-foreground transition-colors">
            Kecantikan
          </Link>
          <Link to="/flash-sale" className="hover:text-primary-foreground transition-colors font-semibold">
            🔥 Flash Sale
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t animate-slide-down">
          <nav className="container py-4 flex flex-col gap-2">
            <Link
              to="/products"
              className="py-2 px-4 hover:bg-secondary rounded-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Semua Kategori
            </Link>
            <Link
              to="/products?category=elektronik"
              className="py-2 px-4 hover:bg-secondary rounded-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Elektronik
            </Link>
            <Link
              to="/products?category=fashion"
              className="py-2 px-4 hover:bg-secondary rounded-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Fashion
            </Link>
            <Link
              to="/flash-sale"
              className="py-2 px-4 hover:bg-secondary rounded-lg text-foreground font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              🔥 Flash Sale
            </Link>
            <hr className="my-2" />
            <Link
              to="/auth/login"
              className="py-2 px-4 hover:bg-secondary rounded-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Masuk / Daftar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
