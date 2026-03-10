import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetCart } from "../hooks/useQueries";

interface NavbarProps {
  scrolled: boolean;
  onCartClick: () => void;
}

const navLinks = [
  { label: "Home", href: "#home", ocid: "nav.home_link" },
  { label: "Catalog", href: "#collections", ocid: "nav.catalog_link" },
  { label: "Contact", href: "#footer", ocid: "nav.contact_link" },
];

export default function Navbar({ scrolled, onCartClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: cartItems = [] } = useGetCart();

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-[0_2px_24px_rgba(80,10,20,0.10)] backdrop-blur-md"
          : "border-b"
      }`}
      style={{
        backgroundColor: "oklch(var(--cream) / 0.97)",
        borderColor: "oklch(var(--border))",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center shrink-0">
            <img
              src="/assets/generated/mumrulls-logo-transparent.dim_400x120.png"
              alt="Mumrulls"
              className="h-10 lg:h-12 w-auto object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <span
              className="hidden font-display text-2xl font-bold"
              style={{ color: "oklch(var(--maroon))" }}
            >
              Mumrulls
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={link.ocid}
                className="font-body text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200 relative group"
                style={{ color: "oklch(var(--foreground))" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "oklch(var(--maroon))" }}
                />
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              data-ocid="nav.cart_button"
              className="relative hover:bg-accent"
              aria-label="Open cart"
            >
              <ShoppingCart
                size={20}
                style={{ color: "oklch(var(--maroon))" }}
              />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: "#dc2626" }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </Button>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={20} style={{ color: "oklch(var(--maroon))" }} />
              ) : (
                <Menu size={20} style={{ color: "oklch(var(--maroon))" }} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              backgroundColor: "oklch(var(--cream))",
              borderColor: "oklch(var(--border))",
            }}
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={link.ocid}
                  className="py-3 px-2 font-body text-sm font-medium tracking-wider uppercase border-b last:border-b-0 transition-colors"
                  style={{
                    color: "oklch(var(--foreground))",
                    borderColor: "oklch(var(--border))",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
