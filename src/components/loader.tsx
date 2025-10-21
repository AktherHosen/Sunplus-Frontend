import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

interface LoaderProps {
  message?: string;
  fullscreen?: boolean;
  className?: string;
}

export default function Loader({
  message = "Loading...",
  fullscreen = true,
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-muted-foreground",
        fullscreen ? "min-h-[60vh]" : "",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-12 h-12 rounded-full border-2 border-primary/20 animate-ping" />
        <Spinner className="w-6 h-6 text-primary relative z-10" />
      </div>

      <p className="text-sm font-medium text-foreground animate-pulse">
        {message}
      </p>
    </div>
  );
}
