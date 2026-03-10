import { CreditCard, RefreshCw, Truck } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: CreditCard,
    title: "Cash On Delivery",
    description:
      "Pay only when your order arrives. No online payments required — pure convenience, zero risk.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description:
      "We ship to every corner of India at no extra charge. Your order, delivered to your door.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description:
      "Not satisfied? Returns are simple, stress-free, and fully supported by our customer team.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-maroon-section py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle decorative arch at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.4), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="eyebrow"
            style={{ color: "oklch(var(--gold) / 0.85)" }}
          >
            Our Promise
          </span>
          <h2
            className="font-display font-bold mt-3 leading-[1.08] tracking-[-0.02em]"
            style={{
              color: "oklch(var(--primary-foreground))",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            Why Choose{" "}
            <em className="italic" style={{ color: "oklch(var(--gold))" }}>
              Mumrulls?
            </em>
          </h2>
          <div
            className="w-12 h-px mx-auto mt-5"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.7), transparent)",
            }}
          />
        </motion.div>

        {/* Feature cards — on maroon, use glass/translucent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-7">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative p-8 rounded-xl text-center group transition-all duration-300"
              style={{
                backgroundColor: "oklch(var(--primary-foreground) / 0.07)",
                border: "1px solid oklch(var(--primary-foreground) / 0.12)",
                backdropFilter: "blur(4px)",
              }}
            >
              {/* Gold line top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.7), transparent)",
                }}
              />

              {/* Icon — on maroon background, use gold tint ring */}
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: "oklch(var(--gold) / 0.12)",
                  border: "1px solid oklch(var(--gold) / 0.25)",
                }}
              >
                <feature.icon
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "oklch(var(--gold))" }}
                />
              </div>

              <h3
                className="font-display text-lg font-bold mb-3 tracking-[-0.01em]"
                style={{ color: "oklch(var(--primary-foreground))" }}
              >
                {feature.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(var(--primary-foreground) / 0.65)" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(var(--gold) / 0.35), transparent)",
        }}
      />
    </section>
  );
}
