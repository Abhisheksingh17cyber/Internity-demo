"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CLIENTS = [
  "Emirates", "Expo Dubai", "Etisalat", "ADNOC", "Dubai Tourism",
  "Emaar", "Jumeirah", "Abu Dhabi Media", "Mashreq", "Dubai Holding",
];

export function ClientLogos() {
  const t = useTranslations("home.clients");

  return (
    <section className="border-y border-border py-12 overflow-hidden">
      <Container>
        <ScrollReveal>
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.25em] text-foreground-muted">
            {t("title")}
          </p>
        </ScrollReveal>
      </Container>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background to-transparent" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <span
              key={`${client}-${i}`}
              className="mx-8 inline-block text-lg font-semibold tracking-wide text-foreground-muted/30 transition-colors hover:text-foreground-muted/60 sm:mx-12 sm:text-xl"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
