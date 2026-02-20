"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function InlineCTA() {
  const t = useTranslations("home.inline_cta");

  return (
    <section className="py-12">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gold/10 bg-linear-to-r from-gold/5 via-transparent to-gold/5 px-8 py-10 sm:flex-row">
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">{t("title")}</h3>
              <p className="mt-1 text-foreground-muted">{t("description")}</p>
            </div>
            <Button variant="gold" href="/contact" className="shrink-0">
              {t("button")}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
