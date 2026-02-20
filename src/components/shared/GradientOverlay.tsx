import { cn } from "@/lib/utils";

interface GradientOverlayProps {
  className?: string;
}

export function GradientOverlay({ className }: GradientOverlayProps) {
  return <div className={cn("video-overlay absolute inset-0 z-[1]", className)} />;
}
