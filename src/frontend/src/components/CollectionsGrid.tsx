import { motion } from "motion/react";

interface Collection {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  ocid: string;
}

const collections: Collection[] = [
  {
    id: 1,
    title: "Clothing",
    subtitle: "Style essentials",
    image: "/assets/generated/collection-clothing.dim_600x400.jpg",
    href: "#featured",
    ocid: "collection.item.1",
  },
  {
    id: 2,
    title: "Home & Kitchen",
    subtitle: "For every space",
    image: "/assets/generated/collection-home-kitchen.dim_600x400.jpg",
    href: "#featured",
    ocid: "collection.item.2",
  },
  {
    id: 3,
    title: "Best Sellers",
    subtitle: "Most loved picks",
    image: "/assets/generated/collection-bestsellers.dim_600x400.jpg",
    href: "#bestsellers",
    ocid: "collection.item.3",
  },
];

export default function CollectionsGrid() {
  return (
    <section
      id="collections"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="eyebrow">Browse</span>
        <h2
          className="font-display font-bold mt-3 tracking-[-0.02em]"
          style={{
            color: "oklch(var(--foreground))",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            lineHeight: "1.08",
          }}
        >
          Collections
        </h2>
        <div
          className="w-8 h-px mx-auto mt-4"
          style={{ backgroundColor: "oklch(var(--maroon))" }}
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
        {collections.map((col, i) => (
          <motion.a
            key={col.id}
            href={col.href}
            data-ocid={col.ocid}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="group relative block overflow-hidden rounded-xl shadow-card cursor-pointer"
            style={{ aspectRatio: "4/3" }}
          >
            {/* Image with zoom */}
            <img
              src={col.image}
              alt={col.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />

            {/* Permanent gradient — rich and dark at base */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.18 0.10 12 / 0.82) 0%, oklch(0.18 0.10 12 / 0.35) 50%, transparent 100%)",
              }}
            />

            {/* Hover maroon overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{
                background:
                  "linear-gradient(to top, oklch(var(--maroon) / 0.80) 0%, oklch(var(--maroon) / 0.45) 60%, transparent 100%)",
              }}
            />

            {/* Text block */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              {/* Subtitle — hidden, slides up on hover */}
              <p
                className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase mb-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-350"
                style={{ color: "oklch(var(--gold) / 0.85)" }}
              >
                {col.subtitle}
              </p>
              <h3
                className="font-display text-xl font-bold leading-tight tracking-[-0.01em]"
                style={{ color: "oklch(var(--primary-foreground))" }}
              >
                {col.title}
              </h3>
              {/* Animated underline */}
              <div
                className="mt-2 h-px w-0 group-hover:w-8 transition-all duration-400"
                style={{ backgroundColor: "oklch(var(--gold))" }}
              />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
