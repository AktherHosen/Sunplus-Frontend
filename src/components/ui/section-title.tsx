import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12",
        align === "center" && "text-center",
        align === "right" && "text-right",
        align === "left" && "text-left",
        className
      )}
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "font-bold tracking-tight text-foreground leading-tight",
          "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        )}
      >
        {title}
      </motion.h2>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn(
          "mt-2 sm:mt-3 h-[2px] sm:h-[3px] w-12 sm:w-16 md:w-20 bg-primary rounded-full origin-left",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto",
          align === "left" && "mr-auto"
        )}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={cn(
            "mt-2 sm:mt-3 text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl",
            "text-sm sm:text-base md:text-lg leading-relaxed",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
            align === "left" && "mr-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
