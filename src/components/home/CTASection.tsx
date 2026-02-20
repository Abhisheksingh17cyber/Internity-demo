"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="py-24 md:py-32">
      <Container>
        <ScrollReveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl bg-background-tertiary px-8 py-24 text-center md:px-16">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">
                {t("tagline")}
              </p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">
                {t("title")}
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-base text-foreground-muted md:text-lg">
                {t("description")}
              </p>
              <Button variant="gold" size="lg" href="/contact" className="gap-2">
                {t("button")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
