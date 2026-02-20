import { SITE_CONFIG } from "@/lib/constants";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={`text-2xl font-bold tracking-tight ${className || ""}`}>
      <span className="text-foreground">{SITE_CONFIG.name.slice(0, 2)}</span>
      <span className="text-gold">{SITE_CONFIG.name.slice(2)}</span>
    </span>
  );
}
