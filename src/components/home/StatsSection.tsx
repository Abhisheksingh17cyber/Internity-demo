"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { STATS } from "@/lib/constants";
import { Clapperboard, Users, Award, Clock } from "lucide-react";

const STAT_ICONS = [Clapperboard, Users, Award, Clock];

export function StatsSection() {
  const t = useTranslations("home.stats");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-linear-to-b from-background via-background-secondary/50 to-background" />

      <Container className="relative z-10">
        <SectionHeading tagline={t("tagline")} title={t("title")} />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, index) => {
            const Icon = STAT_ICONS[index];
            return (
              <ScrollReveal key={stat.key} delay={index * 0.15}>
                <div className="relative text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mb-2 text-4xl font-bold text-gold md:text-5xl lg:text-6xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-foreground-muted md:text-base">
                    {t(stat.key)}
                  </p>
                  {index < STATS.length - 1 && (
                    <div className="absolute -right-4 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-linear-to-b from-transparent via-border to-transparent md:block" />
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
