"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function AdvancedCinematicHero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax Depth Layers
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.8]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video with Depth Movement */}
      <motion.video
        style={{ y: videoY, scale: 1.1 }}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Cinematic Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"
      />

      {/* Grain Texture (Optional Luxury Effect) */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/grain.png')] mix-blend-overlay pointer-events-none" />

      {/* Content Layer */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-white text-4xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          Elevating Brands Through Cinematic Storytelling
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-gray-300 max-w-2xl text-lg md:text-xl"
        >
          High-impact video production engineered for brands that demand precision, emotion, and measurable results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 flex gap-6"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition duration-300"
          >
            Start Your Project
          </Link>

          <Link
            href="/projects"
            className="px-8 py-4 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
          >
            View Our Work
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-[2px] h-10 bg-white opacity-60" />
      </div>
    </section>
  );
}
