import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import {
  useGetCart,
  useGetProducts,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "../hooks/useQueries";
import { formatPrice, getProductImage } from "../utils/productImages";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (id: bigint) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  onProductClick,
}: CartDrawerProps) {
  const { data: cartItems = [], isLoading: cartLoading } = useGetCart();
  const { data: products = [] } = useGetProducts();
  const removeFromCart = useRemoveFromCart();
  const updateCartQuantity = useUpdateCartQuantity();

  const productMap = new Map<string, Product>(
    products.map((p) => [p.id.toString(), p]),
  );

  const cartWithDetails = cartItems.map((item) => ({
    item,
    product: productMap.get(item.productId.toString()),
  }));

  const subtotal = cartWithDetails.reduce((sum, { item, product }) => {
    if (!product) return sum;
    return sum + Number(product.price) * Number(item.quantity);
  }, 0);

  const handleRemove = async (productId: bigint, name?: string) => {
    try {
      await removeFromCart.mutateAsync(productId);
      toast.success(`${name ?? "Item"} removed from cart`);
    } catch {
      toast.error("Could not remove item. Try again.");
    }
  };

  const handleQuantityChange = async (
    productId: bigint,
    currentQty: bigint,
    delta: number,
  ) => {
    const newQty = Number(currentQty) + delta;
    if (newQty <= 0) {
      await handleRemove(productId);
      return;
    }
    try {
      await updateCartQuantity.mutateAsync({
        productId,
        quantity: BigInt(newQty),
      });
    } catch {
      toast.error("Could not update quantity.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col shadow-2xl"
            style={{
              width: "min(420px, 100vw)",
              backgroundColor: "oklch(var(--background))",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "oklch(var(--border))" }}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart
                  size={18}
                  style={{ color: "oklch(var(--maroon))" }}
                />
                <h2
                  className="font-display text-lg font-bold"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  Your Cart
                </h2>
                {cartItems.length > 0 && (
                  <span
                    className="text-xs font-body font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: "oklch(var(--maroon))" }}
                  >
                    {cartItems.reduce((s, i) => s + Number(i.quantity), 0)}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                data-ocid="cart.close_button"
                aria-label="Close cart"
                className="hover:bg-accent"
              >
                <X size={18} style={{ color: "oklch(var(--foreground))" }} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {cartLoading ? (
                <div className="p-5 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : cartWithDetails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "oklch(var(--muted))" }}
                  >
                    <ShoppingBag
                      size={24}
                      style={{ color: "oklch(var(--maroon))" }}
                    />
                  </div>
                  <h3
                    className="font-display text-lg font-bold mb-1"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Your cart is empty
                  </h3>
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Add some products to get started!
                  </p>
                  <Button
                    className="mt-5 font-body font-semibold tracking-wide uppercase"
                    style={{
                      backgroundColor: "oklch(var(--maroon))",
                      color: "oklch(var(--primary-foreground))",
                    }}
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="p-5 space-y-4">
                  {cartWithDetails.map(({ item, product }, idx) => (
                    <CartItemRow
                      key={item.productId.toString()}
                      item={item}
                      product={product}
                      ocid={`cart.item.${idx + 1}`}
                      onRemove={() =>
                        handleRemove(item.productId, product?.name)
                      }
                      onQuantityChange={(delta) =>
                        handleQuantityChange(
                          item.productId,
                          item.quantity,
                          delta,
                        )
                      }
                      onProductClick={() => {
                        onProductClick(item.productId);
                        onClose();
                      }}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartWithDetails.length > 0 && (
              <div
                className="border-t px-5 py-5 space-y-4"
                style={{ borderColor: "oklch(var(--border))" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-body text-sm font-medium"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="font-display text-lg font-bold"
                    style={{ color: "oklch(var(--maroon))" }}
                  >
                    Rs. {subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <Separator />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="block w-full">
                        <Button
                          disabled
                          className="w-full font-body font-semibold tracking-wide uppercase opacity-50 cursor-not-allowed"
                          style={{
                            backgroundColor: "oklch(var(--maroon))",
                            color: "oklch(var(--primary-foreground))",
                          }}
                        >
                          Checkout
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Checkout available on the main store</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="ghost"
                  className="w-full font-body text-sm"
                  style={{ color: "oklch(var(--maroon))" }}
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

interface CartItemRowProps {
  item: { productId: bigint; quantity: bigint };
  product?: Product;
  ocid: string;
  onRemove: () => void;
  onQuantityChange: (delta: number) => void;
  onProductClick: () => void;
}

function CartItemRow({
  item,
  product,
  ocid,
  onRemove,
  onQuantityChange,
  onProductClick,
}: CartItemRowProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = product
    ? imgError
      ? "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=80&h=80&fit=crop"
      : getProductImage(product.name, product.category, product.imageUrl)
    : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=80&h=80&fit=crop";

  const lineTotal = product ? Number(product.price) * Number(item.quantity) : 0;

  return (
    <li data-ocid={ocid} className="flex gap-3 items-start">
      {/* Thumbnail */}
      <button
        type="button"
        onClick={onProductClick}
        className="shrink-0 rounded-lg overflow-hidden border hover:opacity-80 transition-opacity"
        style={{ borderColor: "oklch(var(--border))" }}
        aria-label="View product"
      >
        <img
          src={imageUrl}
          alt={product?.name ?? "Product"}
          onError={() => setImgError(true)}
          className="w-16 h-16 object-cover"
        />
      </button>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <button type="button" onClick={onProductClick} className="text-left">
          <p
            className="font-body text-sm font-medium line-clamp-2 hover:underline"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {product?.name ?? `Product #${item.productId.toString()}`}
          </p>
        </button>

        {product && (
          <p
            className="font-display text-sm font-bold mt-0.5"
            style={{ color: "oklch(var(--maroon))" }}
          >
            {formatPrice(product.price)}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          {/* Qty controls */}
          <div
            className="flex items-center rounded border"
            style={{ borderColor: "oklch(var(--border))" }}
          >
            <button
              type="button"
              onClick={() => onQuantityChange(-1)}
              className="px-2 py-1 hover:bg-accent transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={10} style={{ color: "oklch(var(--foreground))" }} />
            </button>
            <span
              className="px-2 py-1 font-body text-xs font-semibold min-w-[2rem] text-center"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {Number(item.quantity)}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(1)}
              className="px-2 py-1 hover:bg-accent transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={10} style={{ color: "oklch(var(--foreground))" }} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {product && lineTotal > 0 && (
              <span
                className="font-body text-xs font-semibold"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                = Rs. {lineTotal.toLocaleString("en-IN")}
              </span>
            )}
            <button
              type="button"
              onClick={onRemove}
              className="p-1 rounded hover:bg-destructive/10 transition-colors"
              aria-label="Remove item"
            >
              <Trash2
                size={13}
                style={{ color: "oklch(var(--destructive))" }}
              />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
