import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Truck, CreditCard, Wallet, Building2, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    shipping: "regular",
    payment: "transfer",
  });

  const shippingOptions = [
    { id: "regular", name: "Reguler", price: 12000, days: "3-5 hari" },
    { id: "express", name: "Express", price: 25000, days: "1-2 hari" },
    { id: "same-day", name: "Same Day", price: 50000, days: "Hari ini" },
  ];

  const paymentMethods = [
    { id: "transfer", name: "Transfer Bank", icon: Building2 },
    { id: "e-wallet", name: "E-Wallet", icon: Wallet },
    { id: "card", name: "Kartu Kredit/Debit", icon: CreditCard },
  ];

  const selectedShipping = shippingOptions.find((s) => s.id === formData.shipping);
  const shippingCost = selectedShipping?.price || 0;
  const grandTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua data yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pesanan Berhasil!</h2>
            <p className="text-muted-foreground mb-6">
              Terima kasih telah berbelanja di ShopRed.<br />
              Pesanan Anda sedang diproses.
            </p>
            <div className="bg-card rounded-xl p-6 max-w-md mx-auto shadow-card mb-6">
              <p className="text-sm text-muted-foreground mb-2">No. Pesanan</p>
              <p className="text-xl font-mono font-bold text-primary">
                SR{Date.now().toString().slice(-10)}
              </p>
            </div>
            <Link to="/">
              <Button variant="buy" size="lg">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold mb-2">Keranjang Kosong</h2>
            <p className="text-muted-foreground mb-6">
              Tidak ada produk untuk checkout
            </p>
            <Link to="/products">
              <Button variant="buy" size="lg">
                Belanja Sekarang
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
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Address */}
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Alamat Pengiriman</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Nama penerima"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">No. Telepon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="08xxxxxxxxxx"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Alamat Lengkap</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, address: e.target.value }))
                        }
                        placeholder="Nama jalan, nomor rumah, RT/RW"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, city: e.target.value }))
                        }
                        placeholder="Kota/Kabupaten"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, postalCode: e.target.value }))
                        }
                        placeholder="12345"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Metode Pengiriman</h2>
                  </div>
                  <RadioGroup
                    value={formData.shipping}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, shipping: value }))
                    }
                    className="space-y-3"
                  >
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                          formData.shipping === option.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.id} />
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Estimasi: {option.days}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold">{formatPrice(option.price)}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Metode Pembayaran</h2>
                  </div>
                  <RadioGroup
                    value={formData.payment}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, payment: value }))
                    }
                    className="space-y-3"
                  >
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                          formData.payment === method.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-muted-foreground"
                        }`}
                      >
                        <RadioGroupItem value={method.id} />
                        <method.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{method.name}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
                  <h2 className="font-semibold mb-4">Ringkasan Pesanan</h2>
                  
                  {/* Items */}
                  <div className="space-y-3 max-h-48 overflow-y-auto mb-4 scrollbar-thin">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity}x {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ongkos Kirim</span>
                      <span>{formatPrice(shippingCost)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <Button type="submit" variant="buy" size="lg" className="w-full mt-6">
                    Bayar Sekarang
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
