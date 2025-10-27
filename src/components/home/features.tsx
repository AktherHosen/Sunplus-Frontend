import { Truck, Phone, Percent, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "Bangladesh’s #1 Electrical Brand",
      icon: Zap,
    },
    {
      title: "Shop Tension-Free",
      icon: Truck,
    },
    {
      title: "Fast Delivery",
      icon: Truck,
    },
    {
      title: "Prompt Support",
      icon: Phone,
    },
    {
      title: "Everyday Discounts",
      icon: Percent,
    },
  ];

  // ✅ Explicitly typed variants
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 lg:px-0">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className={cn(
                  "flex items-center gap-4 p-3.5 rounded-lg border border-border bg-muted/80 transition shadow-none hover:border-primary hover:bg-background"
                )}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
