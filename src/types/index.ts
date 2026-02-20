import type { Project, GalleryImage, ProjectMetric } from "@prisma/client";

export type ProjectWithRelations = Project & {
  galleryImages: GalleryImage[];
  metrics: ProjectMetric[];
};

export type ProjectWithMetrics = Project & {
  metrics: ProjectMetric[];
};

export interface Metric {
  label: string;
  labelAr?: string | null;
  value: number;
  suffix?: string | null;
  prefix?: string | null;
}
