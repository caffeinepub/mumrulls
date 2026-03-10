import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1440x600.jpg"
          alt="Mumrulls Hero"
          className="w-full h-full object-cover object-center"
        />
        {/* Richer, more directional overlay — strong left vignette fades to reveal image on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, oklch(0.24 0.16 12 / 0.93) 0%, oklch(0.24 0.16 12 / 0.72) 38%, oklch(0.24 0.16 12 / 0.28) 65%, oklch(0.24 0.16 12 / 0.10) 100%)",
          }}
        />
        {/* Bottom fade into page background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28"
          style={{
            background:
              "linear-gradient(to top, oklch(var(--background)), oklch(var(--background) / 0.6), transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[600px] lg:min-h-[680px]">
        <div className="max-w-2xl py-24">
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="inline-flex items-center gap-2 text-[0.65rem] font-body font-semibold tracking-[0.22em] uppercase mb-6 px-3.5 py-1.5 rounded-full border"
              style={{
                color: "oklch(var(--gold))",
                borderColor: "oklch(var(--gold) / 0.5)",
                backgroundColor: "oklch(var(--gold) / 0.10)",
              }}
            >
              <span
                className="w-1 h-1 rounded-full inline-block"
                style={{ backgroundColor: "oklch(var(--gold))" }}
              />
              New Arrivals · Season 2026
            </span>
          </motion.div>

          {/* Main headline — editorial scale with italic accent */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="font-display font-bold leading-[1.04] tracking-[-0.025em] mb-6"
            style={{
              color: "oklch(var(--primary-foreground))",
              fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)",
            }}
          >
            Smart Choices
            <br />
            For Your{" "}
            <em
              className="italic"
              style={{
                color: "oklch(var(--gold))",
                fontStyle: "italic",
              }}
            >
              Home &amp; Style
            </em>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="font-body text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
            style={{ color: "oklch(var(--primary-foreground) / 0.80)" }}
          >
            Premium products curated for the modern Indian home — with Cash on
            Delivery and free shipping everywhere.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              asChild
              data-ocid="hero.primary_button"
              size="lg"
              className="font-body font-semibold tracking-[0.08em] uppercase transition-all duration-200 group shadow-maroon-lg hover:shadow-maroon-lg hover:scale-[1.02] active:scale-100"
              style={{
                backgroundColor: "oklch(var(--primary-foreground))",
                color: "oklch(var(--maroon))",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <a href="#collections">
                Shop Now
                <ChevronRight
                  size={16}
                  className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="font-body font-semibold tracking-[0.08em] uppercase border-2 transition-all duration-200 hover:bg-transparent hover:scale-[1.02]"
              style={{
                color: "oklch(var(--primary-foreground))",
                borderColor: "oklch(var(--primary-foreground) / 0.55)",
              }}
            >
              <a href="#featured">View Featured</a>
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="flex flex-wrap gap-x-5 gap-y-1 mt-10"
          >
            {["Cash on Delivery", "Free Shipping", "Easy Returns"].map(
              (item) => (
                <span
                  key={item}
                  className="font-body text-xs flex items-center gap-1.5"
                  style={{ color: "oklch(var(--primary-foreground) / 0.65)" }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(var(--gold) / 0.8)" }}
                  />
                  {item}
                </span>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
