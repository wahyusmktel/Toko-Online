import { Link, useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";
import {
  Store,
  Package,
  Flashlight,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/seller", label: "Dashboard", icon: Store },
  { to: "/seller/products", label: "Produk", icon: Package },
  { to: "/seller/flash-sale", label: "Flash Sale", icon: Flashlight },
  { to: "/seller/orders", label: "Pesanan", icon: ClipboardList },
];

export default function SellerLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <aside className="w-64 border-r bg-card hidden md:block">
          <div className="p-4 font-semibold text-lg">Admin Seller</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    active ? "bg-muted" : "hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-card md:hidden">
        <nav className="flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex-1 flex flex-col items-center justify-center py-2 ${
                  active ? "text-primary" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
