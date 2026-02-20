"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { VideoBackground } from "@/components/shared/VideoBackground";
import { GradientOverlay } from "@/components/shared/GradientOverlay";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <VideoBackground
        src="/videos/hero-placeholder.mp4"
        poster="/images/placeholder-thumb-1.jpg"
        className="absolute inset-0"
      />
      <GradientOverlay />

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold"
          >
            {t("tagline")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto mb-10 max-w-2xl text-base text-foreground-muted sm:text-lg md:text-xl"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button variant="gold" size="lg" href="/portfolio">
              {t("cta_primary")}
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              {t("cta_secondary")}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-foreground-muted" />
      </motion.div>
    </section>
  );
}
