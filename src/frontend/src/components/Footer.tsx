import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Contact", href: "#footer" },
  { label: "Shipping Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed! Thank you for joining Mumrulls.");
    setEmail("");
  };

  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer id="footer" style={{ backgroundColor: "oklch(var(--maroon))" }}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Brand side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/assets/generated/mumrulls-logo-transparent.dim_400x120.png"
              alt="Mumrulls"
              className="h-12 w-auto object-contain mb-4 brightness-0 invert"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <span
              className="hidden font-display text-2xl font-bold"
              style={{ color: "oklch(var(--primary-foreground))" }}
            >
              Mumrulls
            </span>
            <p
              className="font-body text-sm leading-relaxed max-w-xs mt-3"
              style={{ color: "oklch(var(--primary-foreground) / 0.75)" }}
            >
              Your go-to destination for premium lifestyle products. Cash on
              Delivery · Free Shipping · Easy Returns.
            </p>
          </motion.div>

          {/* Subscribe side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              className="font-display text-xl font-bold mb-2"
              style={{ color: "oklch(var(--primary-foreground))" }}
            >
              Subscribe to our emails
            </h3>
            <p
              className="font-body text-sm mb-4"
              style={{ color: "oklch(var(--primary-foreground) / 0.7)" }}
            >
              Get the latest updates on new products and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "oklch(var(--maroon))" }}
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  data-ocid="footer.input"
                  className="pl-9 font-body text-sm"
                  style={{
                    backgroundColor: "oklch(var(--primary-foreground))",
                    color: "oklch(var(--foreground))",
                    borderColor: "transparent",
                  }}
                />
              </div>
              <Button
                type="submit"
                data-ocid="footer.submit_button"
                className="font-body font-semibold tracking-wide uppercase shrink-0"
                style={{
                  backgroundColor: "oklch(var(--primary-foreground))",
                  color: "oklch(var(--maroon))",
                }}
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "oklch(var(--primary-foreground) / 0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p
              className="font-body text-xs text-center sm:text-left"
              style={{ color: "oklch(var(--primary-foreground) / 0.65)" }}
            >
              © {year}, Mumrulls · Built with{" "}
              <Heart
                size={10}
                className="inline mx-0.5 fill-current"
                style={{ color: "oklch(var(--primary-foreground) / 0.65)" }}
              />{" "}
              using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-100 transition-opacity"
                style={{ color: "oklch(var(--primary-foreground) / 0.65)" }}
              >
                caffeine.ai
              </a>
            </p>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-xs transition-opacity hover:opacity-100"
                  style={{ color: "oklch(var(--primary-foreground) / 0.65)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
