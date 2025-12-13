import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SellerLayout from "@/components/layout/SellerLayout";

export default function SellerDashboard() {
  const { toast } = useToast();
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [shops, setShops] = useState<any[]>([]);

  async function createShop() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/seller/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: shopName, description }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Gagal membuat toko");
      toast({ title: "Toko dibuat", description: data.data.name });
      setShops((prev) => [data.data, ...prev]);
      setShopName("");
      setDescription("");
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    }
  }

  return (
    <SellerLayout>
      <div className="container mx-auto py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Buat Toko</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              className="border p-2 w-full"
              placeholder="Nama Toko"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <textarea
              className="border p-2 w-full"
              placeholder="Deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={createShop}>Simpan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Toko Saya</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {shops.map((s) => (
                <li key={s.id} className="border p-2 rounded">
                  {s.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
}
