import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SellerLayout from "@/components/layout/SellerLayout";

export default function SellerProducts() {
  const { toast } = useToast();
  const [shopId, setShopId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  async function createProduct() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/seller/shops/${shopId}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price, stock, category, description }),
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Gagal membuat produk");
      toast({ title: "Produk dibuat", description: data.data.name });
      setProducts((prev) => [data.data, ...prev]);
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    }
  }

  async function loadProducts() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/seller/shops/${shopId}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Gagal memuat produk");
      setProducts(data.data);
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    }
  }

  useEffect(() => {
    if (shopId) loadProducts();
  }, [shopId]);

  return (
    <SellerLayout>
      <div className="container mx-auto py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pilih Toko & Buat Produk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              className="border p-2 w-full"
              placeholder="Shop ID"
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className="border p-2"
                placeholder="Nama Produk"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                className="border p-2"
                placeholder="Harga"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
              <input
                type="number"
                className="border p-2"
                placeholder="Stok"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
              />
              <input
                className="border p-2"
                placeholder="Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <textarea
              className="border p-2 w-full"
              placeholder="Deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={createProduct}>Simpan Produk</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produk di Toko</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.id} className="border p-2 rounded">
                  {p.name} - Rp {p.price}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
}
