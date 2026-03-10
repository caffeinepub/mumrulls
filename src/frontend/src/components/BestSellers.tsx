import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import { useGetBestSellers } from "../hooks/useQueries";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

interface BestSellersProps {
  onProductClick: (id: bigint) => void;
}

const FALLBACK_BEST_SELLERS: Product[] = [
  {
    id: 10n,
    name: "Sopami Car Coating Spray 50ml Pack of 2",
    description: "Premium ceramic coating spray for lasting car shine",
    price: 499n,
    category: "Automobile",
    rating: 4n,
    isFeatured: false,
    isBestSeller: true,
    inStock: true,
    imageUrl: "",
  },
  {
    id: 9n,
    name: "Portable Air Duster Wireless Vacuum Cleaner",
    description: "Compact cordless vacuum for home and car",
    price: 599n,
    category: "Electronics",
    rating: 5n,
    isFeatured: false,
    isBestSeller: true,
    inStock: true,
    imageUrl: "/assets/generated/product-vacuum-cleaner.dim_600x600.jpg",
  },
  {
    id: 8n,
    name: "Multipurpose Wire Dishwashing Rags Pack of 10",
    description: "Wet and dry use, durable and reusable",
    price: 499n,
    category: "Home and Kitchen",
    rating: 4n,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    imageUrl: "",
  },
  {
    id: 7n,
    name: "Multifunctional Cleaner Pack of 4 (100 ml)",
    description: "All-purpose cleaner for every surface",
    price: 599n,
    category: "Home and Kitchen",
    rating: 4n,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    imageUrl: "",
  },
];

export default function BestSellers({ onProductClick }: BestSellersProps) {
  const { data: products = [], isLoading } = useGetBestSellers();
  const displayProducts =
    products.length > 0 ? products : isLoading ? [] : FALLBACK_BEST_SELLERS;

  return (
    <section
      id="bestsellers"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="eyebrow">Top Picks</span>
            <h2
              className="font-display font-bold mt-3 tracking-[-0.02em]"
              style={{
                color: "oklch(var(--foreground))",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                lineHeight: "1.08",
              }}
            >
              Best Sellers
            </h2>
            <div
              className="w-8 h-px mt-4"
              style={{ backgroundColor: "oklch(var(--maroon))" }}
            />
          </div>
          <a
            href="#featured"
            className="hidden sm:flex items-center gap-1 font-body text-sm font-medium group hover:gap-2 transition-all duration-200"
            style={{ color: "oklch(var(--maroon))" }}
          >
            View All
            <ChevronRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no stable identity
                <ProductCardSkeleton key={i} />
              ))
            : displayProducts
                .slice(0, 4)
                .map((product, i) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={i}
                    onClick={onProductClick}
                  />
                ))}
        </div>
      </div>
    </section>
  );
}
