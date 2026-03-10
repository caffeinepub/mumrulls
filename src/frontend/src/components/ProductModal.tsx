import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Package, Plus, ShoppingCart, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddToCart, useGetProduct } from "../hooks/useQueries";
import { formatPrice, getProductImage } from "../utils/productImages";

interface ProductModalProps {
  productId: bigint | null;
  onClose: () => void;
}

export default function ProductModal({
  productId,
  onClose,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const addToCart = useAddToCart();

  const { data: product, isLoading } = useGetProduct(productId);

  const imageUrl = product
    ? imgError
      ? "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=600&fit=crop"
      : getProductImage(product.name, product.category, product.imageUrl)
    : "";

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity: BigInt(quantity),
      });
      toast.success(`${quantity}x ${product.name} added to cart!`);
      onClose();
    } catch {
      toast.error("Could not add to cart. Please try again.");
    }
  };

  const stars = product ? Math.min(5, Math.max(0, Number(product.rating))) : 0;

  return (
    <AnimatePresence>
      {productId !== null && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              data-ocid="product.modal"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-h-[90vh] overflow-auto rounded-2xl shadow-2xl"
              style={{
                backgroundColor: "oklch(var(--background))",
                maxWidth: "820px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                data-ocid="product.close_button"
                aria-label="Close product modal"
                className="absolute top-4 right-4 z-10 hover:bg-accent rounded-full"
              >
                <X size={18} style={{ color: "oklch(var(--foreground))" }} />
              </Button>

              {isLoading ? (
                <ProductModalSkeleton />
              ) : product ? (
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Image */}
                  <div
                    className="relative overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                    style={{
                      backgroundColor: "oklch(var(--muted))",
                      minHeight: "300px",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={product.name}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "300px" }}
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isBestSeller && (
                        <Badge
                          className="text-xs font-semibold text-white"
                          style={{ backgroundColor: "oklch(var(--maroon))" }}
                        >
                          Bestseller
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary">Out of Stock</Badge>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 sm:p-8 flex flex-col">
                    {/* Category */}
                    <span
                      className="font-body text-xs font-semibold tracking-wider uppercase mb-2"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {product.category}
                    </span>

                    {/* Name */}
                    <h2
                      className="font-display text-xl sm:text-2xl font-bold leading-tight mb-3"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {product.name}
                    </h2>

                    {/* Stars */}
                    {stars > 0 && (
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={star <= stars ? "fill-current" : ""}
                            style={{
                              color:
                                star <= stars
                                  ? "oklch(var(--gold))"
                                  : "oklch(var(--muted-foreground))",
                            }}
                          />
                        ))}
                        <span
                          className="font-body text-xs ml-1"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          {stars}.0 / 5
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="mb-4">
                      <span
                        className="font-display text-2xl font-bold"
                        style={{ color: "oklch(var(--maroon))" }}
                      >
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Description */}
                    {product.description && (
                      <>
                        <Separator className="mb-4" />
                        <p
                          className="font-body text-sm leading-relaxed mb-4 flex-1"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          {product.description}
                        </p>
                      </>
                    )}

                    {/* Stock status */}
                    <div className="flex items-center gap-2 mb-5">
                      <Package
                        size={13}
                        style={{
                          color: product.inStock
                            ? "oklch(0.55 0.15 145)"
                            : "oklch(var(--destructive))",
                        }}
                      />
                      <span
                        className="font-body text-xs font-medium"
                        style={{
                          color: product.inStock
                            ? "oklch(0.45 0.12 145)"
                            : "oklch(var(--destructive))",
                        }}
                      >
                        {product.inStock
                          ? "In Stock — Ready to ship"
                          : "Currently Out of Stock"}
                      </span>
                    </div>

                    <Separator className="mb-5" />

                    {/* Quantity + Add to Cart */}
                    <div className="flex flex-wrap gap-3 items-center">
                      {/* Quantity */}
                      <div
                        className="flex items-center rounded-lg border overflow-hidden"
                        style={{ borderColor: "oklch(var(--border))" }}
                      >
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-2.5 hover:bg-accent transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus
                            size={12}
                            style={{ color: "oklch(var(--foreground))" }}
                          />
                        </button>
                        <span
                          data-ocid="product.quantity_input"
                          className="px-4 py-2.5 font-body text-sm font-semibold min-w-[2.5rem] text-center"
                          style={{ color: "oklch(var(--foreground))" }}
                        >
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((q) => Math.min(10, q + 1))
                          }
                          className="px-3 py-2.5 hover:bg-accent transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus
                            size={12}
                            style={{ color: "oklch(var(--foreground))" }}
                          />
                        </button>
                      </div>

                      <Button
                        onClick={handleAddToCart}
                        disabled={!product.inStock || addToCart.isPending}
                        data-ocid="product.add_button"
                        className="flex-1 font-body font-semibold tracking-wide uppercase transition-all duration-200"
                        style={
                          product.inStock
                            ? {
                                backgroundColor: "oklch(var(--maroon))",
                                color: "oklch(var(--primary-foreground))",
                              }
                            : {}
                        }
                      >
                        <ShoppingCart size={14} className="mr-2" />
                        {addToCart.isPending ? "Adding..." : "Add to Cart"}
                      </Button>
                    </div>

                    <p
                      className="font-body text-xs mt-3"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      ✓ Cash on Delivery · ✓ Free Shipping · ✓ Easy Returns
                    </p>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function ProductModalSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <Skeleton className="min-h-[300px] rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none" />
      <div className="p-8 space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-2/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
