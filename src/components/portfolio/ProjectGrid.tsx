"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  titleAr?: string | null;
  brief: string;
  briefAr?: string | null;
  category: string;
  thumbnailUrl: string;
  year: number;
  client?: string | null;
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const t = useTranslations("portfolio");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered =
    activeCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-gold text-background"
                : "border border-border text-foreground-muted hover:border-gold/50 hover:text-foreground"
            }`}
          >
            {cat === "ALL" ? t("filter_all") : t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block overflow-hidden rounded-2xl bg-background-secondary"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-background opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-gold">
                      {t(`categories.${project.category}`)}
                    </span>
                    <span className="text-xs text-foreground-muted">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-gold">
                    {project.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-foreground-muted">
                    {project.brief}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
