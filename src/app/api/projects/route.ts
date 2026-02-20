import { NextResponse } from "next/server";

// Placeholder projects data for API
const PROJECTS = [
  { slug: "emirates-brand-film", title: "Emirates Brand Film", category: "CORPORATE", year: 2025, featured: true, thumbnailUrl: "/images/placeholder-thumb-1.jpg", brief: "A cinematic brand film showcasing the essence of luxury travel." },
  { slug: "dubai-expo-highlights", title: "Dubai Expo Highlights", category: "EVENT", year: 2025, featured: true, thumbnailUrl: "/images/placeholder-thumb-2.jpg", brief: "Capturing the innovation and cultural diversity of Dubai Expo." },
  { slug: "luxury-auto-commercial", title: "Luxury Auto Campaign", category: "COMMERCIAL", year: 2024, featured: true, thumbnailUrl: "/images/placeholder-thumb-3.jpg", brief: "A high-octane commercial campaign for a premium automotive brand." },
  { slug: "heritage-documentary", title: "Voices of Heritage", category: "DOCUMENTARY", year: 2024, featured: false, thumbnailUrl: "/images/placeholder-thumb-1.jpg", brief: "An intimate documentary exploring traditional craftsmanship." },
  { slug: "fintech-product-launch", title: "FinTech Product Launch", category: "ANIMATION", year: 2024, featured: false, thumbnailUrl: "/images/placeholder-thumb-2.jpg", brief: "A dynamic product launch film combining motion graphics." },
  { slug: "fashion-week-coverage", title: "Fashion Week Coverage", category: "SOCIAL", year: 2025, featured: true, thumbnailUrl: "/images/placeholder-thumb-3.jpg", brief: "Behind-the-scenes and runway coverage for Dubai Fashion Week." },
];

export async function GET() {
  // When database is connected, replace with:
  // import { getProjects } from "@/lib/db/projects";
  // const projects = await getProjects();

  return NextResponse.json({ projects: PROJECTS });
}
