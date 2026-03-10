import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Package, Plus, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddToCart } from "../hooks/useQueries";

interface TopSellerSpotlightProps {
  onProductClick: (id: bigint) => void;
}

const TOP_SELLER = {
  id: 9n,
  name: "Portable Air Duster Wireless Vacuum Cleaner",
  description:
    "Compact and powerful cordless vacuum cleaner — perfect for keyboards, car interiors, and tight spaces. Features a rechargeable battery and multiple attachments for versatile cleaning.",
  price: 599n,
  category: "Electronics",
  rating: 5n,
  isBestSeller: true,
  inStock: true,
  imageUrl: "/assets/generated/product-vacuum-cleaner.dim_600x600.jpg",
  features: [
    "Wireless & Rechargeable",
    "Multiple Attachments",
    "Powerful Suction",
    "Compact Design",
  ],
};

export default function TopSellerSpotlight({
  onProductClick,
}: TopSellerSpotlightProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({
        productId: TOP_SELLER.id,
        quantity: BigInt(quantity),
      });
      toast.success(`${quantity}x ${TOP_SELLER.name} added to cart!`);
    } catch {
      toast.error("Could not add to cart. Please try again.");
    }
  };

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="eyebrow">Most Loved</span>
          <h2
            className="font-display font-bold mt-3 tracking-[-0.02em]"
            style={{
              color: "oklch(var(--foreground))",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              lineHeight: "1.08",
            }}
          >
            Top Seller
          </h2>
          <div
            className="w-8 h-px mx-auto mt-4"
            style={{ backgroundColor: "oklch(var(--maroon))" }}
          />
        </motion.div>

        {/* 2-column layout */}
        <div
          className="rounded-2xl overflow-hidden shadow-card-hover"
          style={{ backgroundColor: "oklch(var(--card))" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden cursor-pointer group"
              style={{
                backgroundColor: "oklch(var(--muted))",
                minHeight: "400px",
              }}
              onClick={() => onProductClick(TOP_SELLER.id)}
            >
              <img
                src={TOP_SELLER.imageUrl}
                alt={TOP_SELLER.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: "400px" }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "oklch(var(--maroon) / 0.15)" }}
              >
                <span
                  className="font-body text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: "oklch(var(--primary-foreground) / 0.9)",
                    color: "oklch(var(--maroon))",
                  }}
                >
                  View Details
                </span>
              </div>
            </motion.div>

            {/* Details side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 lg:p-12 flex flex-col justify-center"
            >
              {/* Bestseller badge */}
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  className="font-body text-xs font-semibold tracking-wider uppercase px-3 py-1 text-white"
                  style={{ backgroundColor: "oklch(var(--maroon))" }}
                >
                  Bestseller
                </Badge>
                <Badge variant="outline" className="font-body text-xs">
                  {TOP_SELLER.category}
                </Badge>
              </div>

              <h3
                className="font-display font-bold leading-tight mb-4 tracking-[-0.018em]"
                style={{
                  color: "oklch(var(--foreground))",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  lineHeight: "1.12",
                }}
              >
                {TOP_SELLER.name}
              </h3>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className="fill-current"
                    style={{ color: "oklch(var(--gold))" }}
                  />
                ))}
                <span
                  className="font-body text-sm ml-2"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  5.0 · Highly rated
                </span>
              </div>

              <p
                className="font-body text-sm leading-relaxed mb-6"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {TOP_SELLER.description}
              </p>

              {/* Features */}
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {TOP_SELLER.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 font-body text-xs"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    <Package
                      size={12}
                      style={{ color: "oklch(var(--maroon))", flexShrink: 0 }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mb-6 flex items-baseline gap-2">
                <span
                  className="font-display font-bold tracking-[-0.02em]"
                  style={{
                    color: "oklch(var(--maroon))",
                    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  }}
                >
                  Rs. 599
                </span>
                <span
                  className="font-body text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  incl. all taxes
                </span>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Quantity selector */}
                <div
                  className="flex items-center rounded-lg overflow-hidden border"
                  style={{ borderColor: "oklch(var(--border))" }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 transition-colors hover:bg-accent"
                    aria-label="Decrease quantity"
                  >
                    <Minus
                      size={14}
                      style={{ color: "oklch(var(--foreground))" }}
                    />
                  </button>
                  <span
                    data-ocid="product.quantity_input"
                    className="px-4 py-2 font-body text-sm font-semibold min-w-[3rem] text-center"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="px-3 py-2 transition-colors hover:bg-accent"
                    aria-label="Increase quantity"
                  >
                    <Plus
                      size={14}
                      style={{ color: "oklch(var(--foreground))" }}
                    />
                  </button>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={addToCart.isPending}
                  className="flex-1 sm:flex-none font-body font-semibold tracking-wide uppercase transition-all duration-200 shadow-maroon"
                  style={{
                    backgroundColor: "oklch(var(--maroon))",
                    color: "oklch(var(--primary-foreground))",
                  }}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  {addToCart.isPending ? "Adding..." : "Add to Cart"}
                </Button>
              </div>

              {/* Shipping note */}
              <p
                className="font-body text-xs mt-4"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                ✓ Cash on Delivery available · ✓ Free shipping all over India
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
