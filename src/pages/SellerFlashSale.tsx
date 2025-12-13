import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SellerLayout from "@/components/layout/SellerLayout";

export default function SellerFlashSale() {
  const { toast } = useToast();
  const [productId, setProductId] = useState("");
  const [flashPrice, setFlashPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  async function setFlashSale() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/seller/products/${productId}/flash-sale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ flashPrice, startTime, endTime, quantity }),
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Gagal menyetel flash sale");
      toast({
        title: "Flash Sale disetel",
        description: `Produk ${productId}`,
      });
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    }
  }

  async function removeFlashSale() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/seller/products/${productId}/flash-sale`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Gagal menghapus flash sale");
      toast({
        title: "Flash Sale dihapus",
        description: `Produk ${productId}`,
      });
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    }
  }

  return (
    <SellerLayout>
      <div className="container mx-auto py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Setel Flash Sale Produk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              className="border p-2 w-full"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="number"
                className="border p-2"
                placeholder="Harga Flash"
                value={flashPrice}
                onChange={(e) => setFlashPrice(parseFloat(e.target.value))}
              />
              <input
                type="number"
                className="border p-2"
                placeholder="Kuantitas"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <input
                type="datetime-local"
                className="border p-2"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <input
                type="datetime-local"
                className="border p-2"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={setFlashSale}>Simpan</Button>
              <Button variant="destructive" onClick={removeFlashSale}>
                Hapus
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
}
