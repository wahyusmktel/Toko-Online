import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, Heart, Share2, ShoppingCart, Store, Star, MapPin, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/product/RatingStars";
import { products, formatPrice, formatSold } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produk Tidak Ditemukan</h1>
            <Link to="/products">
              <Button>Kembali ke Produk</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock multiple images
  const images = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
    toast({
      title: "Ditambahkan ke Keranjang",
      description: `${product.name} x${quantity}`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariants);
    window.location.href = "/cart";
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-primary">Produk</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.category}</span>
          </nav>

          {/* Product Info */}
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        idx === selectedImage
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl md:text-2xl font-semibold mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm">
                    <RatingStars rating={product.rating} />
                    <span className="text-muted-foreground">|</span>
                    <span className="text-muted-foreground">
                      {formatSold(product.sold)} terjual
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-secondary rounded-lg p-4">
                  {product.discount && (
                    <Badge variant="discount" className="mb-2">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Variants */}
                {product.variants?.map((variant) => (
                  <div key={variant.name}>
                    <h3 className="text-sm font-medium mb-2">{variant.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [variant.name]: option,
                            }))
                          }
                          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                            selectedVariants[variant.name] === option
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Jumlah</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Stok: {product.stock}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Keranjang
                  </Button>
                  <Button variant="buy" size="lg" className="flex-1" onClick={handleBuyNow}>
                    Beli Sekarang
                  </Button>
                </div>

                {/* Share & Wishlist */}
                <div className="flex items-center gap-4 pt-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Info */}
          <div className="bg-card rounded-xl shadow-card p-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{product.shop.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {product.shop.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    {product.shop.rating} Rating Toko
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button variant="outline" size="sm">
                  <Store className="h-4 w-4 mr-2" />
                  Kunjungi Toko
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-card rounded-xl shadow-card p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Detail Produk</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{product.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 not-prose">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-5 w-5 text-success" />
                  <span>100% Original</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Gratis Ongkir</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-card rounded-xl shadow-card p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Ulasan Pembeli</h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{product.rating}</div>
                <RatingStars rating={product.rating} size="lg" showValue={false} />
                <p className="text-sm text-muted-foreground mt-1">
                  {formatSold(product.sold)} ulasan
                </p>
              </div>
            </div>
            {/* Mock Reviews */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-muted" />
                    <div>
                      <p className="text-sm font-medium">Pembeli {i}</p>
                      <RatingStars rating={5} size="sm" showValue={false} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Produk sangat bagus, sesuai deskripsi. Pengiriman cepat dan packaging aman.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
