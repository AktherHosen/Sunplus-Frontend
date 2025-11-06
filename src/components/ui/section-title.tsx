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
        "w-full mb-4 sm:mb-6 md:mb-8 lg:mb-10",
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
          "text-lg sm:text-xl md:text-2xl lg:text-3xl"
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
          "mt-2 sm:mt-3 h-[2px] sm:h-[3px] w-10 sm:w-14 md:w-16 bg-primary rounded-full origin-left",
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
