import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, RotateCcw, Shield } from "lucide-react";
import { motion } from "motion/react";

const trustItems = [
  { icon: Shield, label: "100% Refund Guarantee" },
  { icon: MapPin, label: "Live Order Tracking" },
  { icon: RotateCcw, label: "Easy Returns" },
];

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ backgroundColor: "oklch(var(--cream))" }}
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(var(--maroon)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Logo mark */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
            style={{ backgroundColor: "oklch(var(--maroon) / 0.1)" }}
          >
            <span
              className="font-display text-2xl font-bold"
              style={{ color: "oklch(var(--maroon))" }}
            >
              M
            </span>
          </div>

          <span className="eyebrow block mb-4">Our Story</span>

          <h2
            className="font-display font-bold mb-6 tracking-[-0.025em]"
            style={{
              color: "oklch(var(--foreground))",
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: "1.06",
            }}
          >
            About{" "}
            <em className="italic" style={{ color: "oklch(var(--maroon))" }}>
              Mumrulls
            </em>
          </h2>

          <div
            className="w-10 h-px mx-auto mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(var(--maroon)), transparent)",
            }}
          />

          <p
            className="font-body text-base sm:text-lg leading-relaxed mb-8"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Welcome to{" "}
            <strong
              className="font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Mumrulls
            </strong>{" "}
            — your go-to destination for cutting-edge electronic gadgets and
            premium beauty products. We pride ourselves on offering a curated
            selection of high-quality items designed to enhance your lifestyle.
            Enjoy the convenience of cash on delivery, free shipping, live order
            tracking, and a 100% refund guarantee.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{
                  borderColor: "oklch(var(--maroon) / 0.25)",
                  backgroundColor: "oklch(var(--maroon) / 0.05)",
                }}
              >
                <item.icon
                  size={14}
                  style={{ color: "oklch(var(--maroon))" }}
                />
                <span
                  className="font-body text-xs font-medium"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="font-body font-semibold tracking-wide uppercase group shadow-maroon"
            style={{
              backgroundColor: "oklch(var(--maroon))",
              color: "oklch(var(--primary-foreground))",
            }}
          >
            <a href="#collections">
              Shop Now
              <ChevronRight
                size={16}
                className="ml-1 transition-transform group-hover:translate-x-1"
              />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
