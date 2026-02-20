"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const [current, setCurrent] = useState(0);

  const testimonials = [0, 1, 2].map((i) => ({
    quote: t(`items.${i}.quote`),
    author: t(`items.${i}.author`),
    role: t(`items.${i}.role`),
    company: t(`items.${i}.company`),
  }));

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-background-secondary py-24 md:py-32">
      <Container>
        <SectionHeading tagline={t("tagline")} title={t("title")} />

        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <div className="relative min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <Quote className="mx-auto mb-6 h-8 w-8 text-gold/40" />
                  <p className="mb-8 text-lg leading-relaxed text-foreground md:text-xl lg:text-2xl">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonials[current].author}
                    </p>
                    <p className="text-sm text-foreground-muted">
                      {testimonials[current].role}, {testimonials[current].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-gold hover:text-gold"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === current ? "w-8 bg-gold" : "w-2 bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-gold hover:text-gold"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
