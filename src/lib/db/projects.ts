import { prisma } from "@/lib/prisma";
import type { ProjectCategory } from "@prisma/client";

export async function getProjects(category?: string) {
  return prisma.project.findMany({
    where: {
      publishedAt: { not: null },
      ...(category && category !== "ALL"
        ? { category: category as ProjectCategory }
        : {}),
    },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { publishedAt: "desc" }],
    include: {
      metrics: { orderBy: { order: "asc" } },
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      galleryImages: { orderBy: { order: "asc" } },
      metrics: { orderBy: { order: "asc" } },
    },
  });
}

export async function getFeaturedProjects(limit = 4) {
  return prisma.project.findMany({
    where: { featured: true, publishedAt: { not: null } },
    orderBy: { order: "asc" },
    take: limit,
  });
}

export async function getRelatedProjects(
  excludeId: string,
  category: ProjectCategory,
  limit = 3
) {
  return prisma.project.findMany({
    where: {
      id: { not: excludeId },
      category,
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getAllProjectSlugs() {
  const projects = await prisma.project.findMany({
    where: { publishedAt: { not: null } },
    select: { slug: true },
  });
  return projects.map((p) => p.slug);
}
