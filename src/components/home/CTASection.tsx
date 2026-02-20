"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-background-tertiary px-8 py-20 text-center md:px-16">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5" />
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                {t("title")}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base text-foreground-muted md:text-lg">
                {t("description")}
              </p>
              <Button variant="gold" size="lg" href="/contact">
                {t("button")}
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
