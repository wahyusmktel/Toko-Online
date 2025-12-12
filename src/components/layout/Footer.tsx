import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, CreditCard, Wallet, Building2, Truck, ShieldCheck, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t">
      {/* Features Bar */}
      <div className="border-b">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Gratis Ongkir</p>
                <p className="text-xs text-muted-foreground">Min. belanja Rp50.000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">100% Original</p>
                <p className="text-xs text-muted-foreground">Produk asli bergaransi</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Bantuan 24/7</p>
                <p className="text-xs text-muted-foreground">Tim support siap membantu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Pembayaran Aman</p>
                <p className="text-xs text-muted-foreground">Transaksi terlindungi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-extrabold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">ShopRed</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Platform belanja online terpercaya dengan jutaan produk berkualitas dan harga terbaik.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Layanan Pelanggan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">Pusat Bantuan</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Cara Belanja</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Pengiriman</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Pengembalian</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* About ShopRed */}
          <div>
            <h4 className="font-semibold mb-4">Tentang ShopRed</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Karir</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="font-semibold mb-4">Jual di ShopRed</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">Mulai Berjualan</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Seller Centre</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Edukasi Seller</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Promosi</Link></li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="font-semibold mb-4">Pembayaran</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-background rounded border flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="p-2 bg-background rounded border flex items-center justify-center">
                <Wallet className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="p-2 bg-background rounded border flex items-center justify-center">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <h4 className="font-semibold mt-6 mb-4">Pengiriman</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-background rounded border flex items-center justify-center text-xs font-semibold text-muted-foreground">
                JNE
              </div>
              <div className="p-2 bg-background rounded border flex items-center justify-center text-xs font-semibold text-muted-foreground">
                J&T
              </div>
              <div className="p-2 bg-background rounded border flex items-center justify-center text-xs font-semibold text-muted-foreground">
                SiCepat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2024 ShopRed. Hak cipta dilindungi.</p>
          <p className="mt-2 md:mt-0">Negara: Indonesia | Bahasa: Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
