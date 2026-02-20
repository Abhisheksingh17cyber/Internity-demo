"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const PLACEHOLDER_PROJECTS = [
  { slug: "emirates-brand-film", title: "Emirates Brand Film", category: "Corporate", thumb: "/images/portfolio-2.png" },
  { slug: "dubai-expo-highlights", title: "Dubai Expo Highlights", category: "Event", thumb: "/images/placeholder-thumb-2.jpg" },
  { slug: "luxury-auto-commercial", title: "Luxury Auto Campaign", category: "Commercial", thumb: "/images/placeholder-thumb-3.jpg" },
  { slug: "fashion-week-coverage", title: "Fashion Week Coverage", category: "Social Media", thumb: "/images/placeholder-thumb-1.jpg" },
];

export function FeaturedWork() {
  const t = useTranslations("home.featured");

  return (
    <section className="bg-background-secondary py-24 md:py-32">
      <Container>
        <SectionHeading
          tagline={t("tagline")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {PLACEHOLDER_PROJECTS.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.1}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative block aspect-video overflow-hidden rounded-2xl bg-background-tertiary"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={project.thumb}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gold">
                    {project.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all group-hover:border-gold group-hover:text-gold">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" href="/portfolio">
            {t("view_all")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
