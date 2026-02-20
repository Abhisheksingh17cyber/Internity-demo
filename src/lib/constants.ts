export const SITE_CONFIG = {
  name: "Internity",
  description: "Premium Video Production Company based in UAE",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://internity.ae",
  ogImage: "/images/og-image.jpg",
} as const;

export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "portfolio", href: "/portfolio" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const SERVICES = [
  { key: "corporate", icon: "Film" },
  { key: "commercial", icon: "Tv" },
  { key: "documentary", icon: "Camera" },
  { key: "event", icon: "Video" },
  { key: "animation", icon: "Sparkles" },
  { key: "social", icon: "Share2" },
] as const;

export const STATS = [
  { value: 200, suffix: "+", key: "projects" },
  { value: 50, suffix: "+", key: "clients" },
  { value: 15, suffix: "+", key: "awards" },
  { value: 8, suffix: "+", key: "years" },
] as const;

export const PROJECT_CATEGORIES = [
  "ALL",
  "CORPORATE",
  "COMMERCIAL",
  "DOCUMENTARY",
  "EVENT",
  "SOCIAL",
  "ANIMATION",
] as const;
