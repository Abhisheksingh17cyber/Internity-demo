import { cn } from "@/lib/utils";

interface GradientOverlayProps {
  className?: string;
  variant?: "default" | "deep" | "subtle";
}

export function GradientOverlay({ className, variant = "default" }: GradientOverlayProps) {
  const overlayClass = variant === "deep"
    ? "video-overlay-deep"
    : variant === "subtle"
      ? "opacity-60 video-overlay"
      : "video-overlay";

  return <div className={cn(overlayClass, "absolute inset-0 z-1", className)} />;
}
