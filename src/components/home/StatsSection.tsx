"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { STATS } from "@/lib/constants";

export function StatsSection() {
  const t = useTranslations("home.stats");

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading tagline={t("tagline")} title={t("title")} />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <ScrollReveal key={stat.key} delay={index * 0.15}>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-gold md:text-5xl lg:text-6xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-foreground-muted md:text-base">
                  {t(stat.key)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
