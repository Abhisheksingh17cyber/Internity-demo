"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Trophy, Star, Medal, Award } from "lucide-react";

const AWARDS = [
  { icon: "Trophy", title: "Gulf Media Awards", subtitle: "Best Branded Film 2025", year: "2025" },
  { icon: "Star", title: "Dubai Lynx", subtitle: "Gold - Film Craft", year: "2024" },
  { icon: "Medal", title: "MENA Effie Awards", subtitle: "Silver - Video Production", year: "2024" },
  { icon: "Award", title: "Abu Dhabi Film Festival", subtitle: "Official Selection", year: "2023" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  Star,
  Medal,
  Award,
};

export function AwardsSection() {
  const t = useTranslations("home.awards");

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading tagline={t("tagline")} title={t("title")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.map((award, index) => {
            const Icon = iconMap[award.icon];
            return (
              <ScrollReveal key={award.title} delay={index * 0.1}>
                <div className="group rounded-2xl border border-border bg-background-secondary p-8 text-center transition-all duration-300 hover:border-gold/30 hover:bg-background-tertiary">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <p className="mb-1 text-xs font-medium text-gold">{award.year}</p>
                  <h3 className="mb-2 text-lg font-semibold">{award.title}</h3>
                  <p className="text-sm text-foreground-muted">{award.subtitle}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
