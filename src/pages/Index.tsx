import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FlashSale } from "@/components/home/FlashSale";
import { ProductGrid } from "@/components/home/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <CategoryGrid />
        <FlashSale />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
