import SellerLayout from "@/components/layout/SellerLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SellerOrders() {
  return (
    <SellerLayout>
      <div className="container mx-auto py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Coming soon: daftar pesanan dan update status.</p>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
}
