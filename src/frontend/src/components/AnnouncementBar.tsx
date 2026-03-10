import { Truck } from "lucide-react";
import { motion } from "motion/react";

export default function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full py-2.5 px-4 text-center"
      style={{ backgroundColor: "oklch(var(--maroon))" }}
    >
      <div className="flex items-center justify-center gap-2">
        <Truck
          size={14}
          className="shrink-0"
          style={{ color: "oklch(var(--primary-foreground))" }}
        />
        <p
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "oklch(var(--primary-foreground))" }}
        >
          Cash On Delivery + Free Shipping all over India
        </p>
        <Truck
          size={14}
          className="shrink-0"
          style={{ color: "oklch(var(--primary-foreground))" }}
        />
      </div>
    </motion.div>
  );
}
