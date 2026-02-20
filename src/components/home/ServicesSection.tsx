"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SERVICES } from "@/lib/constants";
import { Film, Tv, Camera, Video, Sparkles, Share2 } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Film,
  Tv,
  Camera,
  Video,
  Sparkles,
  Share2,
};

export function ServicesSection() {
  const t = useTranslations("home.services");

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          tagline={t("tagline")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <ScrollReveal key={service.key} delay={index * 0.1}>
                <div className="group rounded-2xl border border-border bg-background-secondary p-8 transition-all duration-300 hover:border-gold/30 hover:bg-background-tertiary">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {t(`${service.key}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
