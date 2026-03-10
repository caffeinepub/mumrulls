import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useGetFeaturedProducts } from "../hooks/useQueries";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

interface FeaturedProductsProps {
  onProductClick: (id: bigint) => void;
}

export default function FeaturedProducts({
  onProductClick,
}: FeaturedProductsProps) {
  const { data: products = [], isLoading } = useGetFeaturedProducts();

  const displayProducts =
    products.length > 0 ? products : isLoading ? [] : getFallbackProducts();

  return (
    <section
      id="featured"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "oklch(var(--muted))" }}
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
            <span className="eyebrow">Handpicked for you</span>
            <h2
              className="font-display font-bold mt-3 tracking-[-0.02em]"
              style={{
                color: "oklch(var(--foreground))",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                lineHeight: "1.08",
              }}
            >
              Featured Products
            </h2>
            <div
              className="w-8 h-px mt-4"
              style={{ backgroundColor: "oklch(var(--maroon))" }}
            />
          </div>
          <a
            href="#collections"
            className="hidden sm:flex items-center gap-1 font-body text-sm font-medium transition-all duration-200 group hover:gap-2"
            style={{ color: "oklch(var(--maroon))" }}
          >
            View All
            <ChevronRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        {/* Grid */}
        <div
          data-ocid="featured.list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no stable identity
                <ProductCardSkeleton key={i} />
              ))
            : displayProducts
                .slice(0, 8)
                .map((product, i) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={i}
                    ocid={`featured.item.${i + 1}`}
                    onClick={onProductClick}
                  />
                ))}
        </div>
      </div>
    </section>
  );
}

// Fallback products if backend returns empty
function getFallbackProducts() {
  return [
    {
      id: 1n,
      name: "4-in-1 Shaper Seamless Tummy Tucker",
      description: "Quick Slim Shape Wear for Tummy, Back, Thighs, Hips",
      price: 499n,
      category: "Clothing",
      rating: 4n,
      isFeatured: true,
      isBestSeller: false,
      inStock: true,
      imageUrl: "",
    },
    {
      id: 2n,
      name: "Adjustable Waist Trimmer Belt",
      description: "Premium neoprene waist trimmer for effective workouts",
      price: 499n,
      category: "Clothing",
      rating: 4n,
      isFeatured: true,
      isBestSeller: false,
      inStock: true,
      imageUrl: "",
    },
    {
      id: 3n,
      name: "Combo Men's NS Lycra Track Pants",
      description: "Pack of 2 comfortable track pants for daily use",
      price: 699n,
      category: "Clothing",
      rating: 4n,
      isFeatured: true,
      isBestSeller: false,
      inStock: true,
      imageUrl: "",
    },
    {
      id: 4n,
      name: "Cupid Pheromone Cologne for Men 50 ML",
      description: "Exotic fragrance for the modern Indian man",
      price: 499n,
      category: "Beauty",
      rating: 4n,
      isFeatured: true,
      isBestSeller: false,
      inStock: true,
      imageUrl: "",
    },
    {
      id: 5n,
      name: "Fabric Stain Remover",
      description: "Powerful formula removes tough stains instantly",
      price: 499n,
      category: "Home and Kitchen",
      rating: 4n,
      isFeatured: true,
      isBestSeller: false,
      inStock: true,
      imageUrl: "",
    },
    {
      id: 6n,
      name: "Knee Patches (Pack of 10)",
      description: "Therapeutic patches for knee pain relief",
      price: 499n,
      category: "Health",
      rating: 5n,
      isFeatured: true,
      isBestSeller: false,
      inStock: true,
      imageUrl: "",
    },
    {
      id: 7n,
      name: "Multifunctional Cleaner Pack of 4",
      description: "100ml each, suitable for all surfaces",
      price: 599n,
      category: "Home and Kitchen",
      rating: 4n,
      isFeatured: true,
      isBestSeller: true,
      inStock: true,
      imageUrl: "",
    },
    {
      id: 8n,
      name: "Multipurpose Wire Dishwashing Rags Pack of 10",
      description: "Wet and dry use, durable and reusable",
      price: 499n,
      category: "Home and Kitchen",
      rating: 4n,
      isFeatured: true,
      isBestSeller: false,
      inStock: true,
      imageUrl: "",
    },
  ];
}
