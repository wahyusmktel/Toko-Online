import { products } from "@/data/mockData";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid() {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Rekomendasi Untukmu</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
