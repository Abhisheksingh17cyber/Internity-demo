import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://internity.ae";

const PROJECT_SLUGS = [
  "luxury-automotive-brand-film",
  "emirates-brand-film",
  "dubai-expo-highlights",
  "luxury-auto-commercial",
  "heritage-documentary",
  "fintech-product-launch",
  "fashion-week-coverage",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/ar`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/ar/portfolio`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/ar/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/ar/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const projects = PROJECT_SLUGS.flatMap((slug) => [
    { url: `${BASE_URL}/portfolio/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/ar/portfolio/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ]);

  return [...pages, ...projects];
}
