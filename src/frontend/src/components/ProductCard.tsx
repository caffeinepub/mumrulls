import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useAddToCart } from "../hooks/useQueries";
import { formatPrice, getProductImage } from "../utils/productImages";

interface ProductCardProps {
  product: Product;
  index?: number;
  ocid?: string;
  onClick?: (id: bigint) => void;
}

export function ProductCardSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden shadow-card"
      style={{ backgroundColor: "oklch(var(--card))" }}
    >
      <Skeleton
        className="aspect-square w-full"
        style={{ backgroundColor: "oklch(var(--muted))" }}
      />
      <div className="p-5 space-y-3">
        <Skeleton
          className="h-3 w-1/3"
          style={{ backgroundColor: "oklch(var(--muted))" }}
        />
        <Skeleton
          className="h-4 w-5/6"
          style={{ backgroundColor: "oklch(var(--muted))" }}
        />
        <Skeleton
          className="h-4 w-2/3"
          style={{ backgroundColor: "oklch(var(--muted))" }}
        />
        <div className="flex items-center justify-between pt-1">
          <Skeleton
            className="h-5 w-16"
            style={{ backgroundColor: "oklch(var(--muted))" }}
          />
          <Skeleton
            className="h-8 w-16 rounded-md"
            style={{ backgroundColor: "oklch(var(--muted))" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({
  product,
  index = 0,
  ocid,
  onClick,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const addToCart = useAddToCart();

  const imageUrl = imageError
    ? "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop"
    : getProductImage(product.name, product.category, product.imageUrl);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1n });
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Could not add to cart. Please try again.");
    }
  };

  const stars = Math.min(5, Math.max(0, Number(product.rating)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.4) }}
      data-ocid={ocid}
      className="group rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col"
      style={{ backgroundColor: "oklch(var(--card))" }}
      onClick={() => onClick?.(product.id)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <img
          src={imageUrl}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        {/* Subtle bottom fade on image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 opacity-40"
          style={{
            background:
              "linear-gradient(to top, oklch(var(--card)), transparent)",
          }}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <Badge
              className="text-[9px] font-body font-semibold tracking-[0.12em] uppercase text-white px-2 py-0.5 rounded-sm"
              style={{ backgroundColor: "oklch(var(--maroon))" }}
            >
              Bestseller
            </Badge>
          )}
          {!product.inStock && (
            <Badge
              className="text-[9px] font-body font-semibold tracking-[0.12em] uppercase px-2 py-0.5 rounded-sm"
              variant="secondary"
            >
              Sold Out
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-5 flex flex-col flex-1">
        {/* Category + stars row */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="font-body text-[9px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            {product.category}
          </span>
          {stars > 0 && (
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={9}
                  className={star <= stars ? "fill-current" : ""}
                  style={{
                    color:
                      star <= stars
                        ? "oklch(var(--gold))"
                        : "oklch(var(--muted-foreground) / 0.4)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Name — Playfair Display for editorial feel */}
        <h3
          className="font-display text-sm font-semibold leading-snug line-clamp-2 mb-3 flex-1 tracking-[-0.01em]"
          style={{ color: "oklch(var(--card-foreground))" }}
        >
          {product.name}
        </h3>

        {/* Divider */}
        <div
          className="w-full h-px mb-3"
          style={{ backgroundColor: "oklch(var(--border))" }}
        />

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <span
            className="font-display text-base font-bold tracking-[-0.01em]"
            style={{ color: "oklch(var(--maroon))" }}
          >
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            disabled={!product.inStock || addToCart.isPending}
            onClick={handleAddToCart}
            className="font-body text-[10px] font-semibold tracking-[0.08em] uppercase px-3 h-7 rounded-sm transition-all duration-200 hover:scale-105 active:scale-100"
            style={
              product.inStock
                ? {
                    backgroundColor: "oklch(var(--maroon))",
                    color: "oklch(var(--primary-foreground))",
                    boxShadow: "0 2px 8px oklch(var(--maroon) / 0.3)",
                  }
                : {}
            }
          >
            <ShoppingCart size={10} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
