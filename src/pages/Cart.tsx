import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/mockData";
import { useState } from "react";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>(
    items.map((item) => item.product.id)
  );

  const toggleItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.product.id));
    }
  };

  const selectedTotal = items
    .filter((item) => selectedItems.includes(item.product.id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Keranjang Kosong</h2>
            <p className="text-muted-foreground mb-6">
              Yuk, mulai belanja dan temukan produk favoritmu!
            </p>
            <Link to="/products">
              <Button variant="buy" size="lg">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/products">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select All */}
              <div className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedItems.length === items.length}
                    onCheckedChange={toggleAll}
                  />
                  <span className="text-sm font-medium">
                    Pilih Semua ({items.length} produk)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus
                </Button>
              </div>

              {/* Items */}
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-card rounded-xl p-4 shadow-card"
                >
                  <div className="flex gap-4">
                    <Checkbox
                      checked={selectedItems.includes(item.product.id)}
                      onCheckedChange={() => toggleItem(item.product.id)}
                    />
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      {item.selectedVariants && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {Object.entries(item.selectedVariants)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(", ")}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(item.product.price)}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
                <h2 className="font-semibold mb-4">Ringkasan Belanja</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Harga ({selectedItems.length} produk)
                    </span>
                    <span>{formatPrice(selectedTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Diskon</span>
                    <span className="text-success">-Rp0</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(selectedTotal)}</span>
                  </div>
                </div>
                <Link to="/checkout">
                  <Button
                    variant="buy"
                    size="lg"
                    className="w-full mt-6"
                    disabled={selectedItems.length === 0}
                  >
                    Checkout ({selectedItems.length})
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
