"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { VideoBackground } from "@/components/shared/VideoBackground";
import { GradientOverlay } from "@/components/shared/GradientOverlay";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Play, X } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const [showReel, setShowReel] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background with parallax */}
      <motion.div style={{ scale: heroScale }} className="absolute inset-0">
        <VideoBackground
          src="/videos/showreel.mp4"
          srcWebm="/videos/showreel.webm"
          poster="/images/placeholder-thumb-1.jpg"
          className="absolute inset-0"
          preloadStrategy="auto"
        />
      </motion.div>
      <GradientOverlay variant="deep" />

      {/* Main hero content */}
      <motion.div
        style={{ opacity: heroOpacity, y: textY }}
        className="relative z-10 flex h-full items-center justify-center"
      >
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
            className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="text-gold-gradient">{t("headline")}</span>
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
            <button
              onClick={() => setShowReel(true)}
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 px-8 py-4 text-base font-medium text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 transition-colors group-hover:bg-gold/30">
                <Play className="h-4 w-4 fill-current text-gold" />
              </span>
              {t("cta_secondary")}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground-muted">
          {t("scroll_label")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-gold/60" />
        </motion.div>
      </motion.div>

      {/* Showreel overlay */}
      {showReel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          <button
            onClick={() => setShowReel(false)}
            className="absolute right-6 top-6 rounded-full border border-border p-3 text-foreground-muted transition-colors hover:border-gold hover:text-gold"
            aria-label="Close showreel"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="mx-4 aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-background-tertiary">
            <video
              autoPlay
              controls
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/showreel.webm" type="video/webm" />
              <source src="/videos/showreel.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      )}
    </section>
  );
}
