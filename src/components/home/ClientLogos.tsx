"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ClientLogos() {
  const t = useTranslations("home.clients");

  const clients = [
    "Emirates", "Expo Dubai", "Etisalat", "ADNOC", "Dubai Tourism",
    "Emaar", "Jumeirah", "Abu Dhabi Media",
  ];

  return (
    <section className="border-y border-border py-12">
      <Container>
        <ScrollReveal>
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.25em] text-foreground-muted">
            {t("title")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((client) => (
              <span
                key={client}
                className="text-sm font-medium text-foreground-muted/50 transition-colors hover:text-foreground-muted"
              >
                {client}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
