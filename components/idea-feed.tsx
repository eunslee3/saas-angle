import ProductCard from "./product-card"
import type { Products } from "@/lib/types"

export default function IdeaFeed({ products }: { products: Products[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
