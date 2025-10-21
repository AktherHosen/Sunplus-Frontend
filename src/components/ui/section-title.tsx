import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "w-full mb-10",
        align === "center" && "text-center",
        align === "right" && "text-right",
        align === "left" && "text-left",
        className
      )}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>

      {/* Accent line */}
      <div
        className={cn(
          "mt-3 h-[3px] w-16 bg-primary rounded-full",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto",
          align === "left" && "mr-auto"
        )}
      />

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
