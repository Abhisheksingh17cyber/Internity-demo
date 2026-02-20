"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CinematicHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl md:text-6xl font-bold tracking-tight"
        >
          Crafting Cinematic Stories That Convert
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-gray-300 max-w-2xl text-lg"
        >
          Premium video production engineered for brands that demand impact, emotion, and measurable results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 flex gap-6"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition"
          >
            Start Your Project
          </Link>

          <Link
            href="/projects"
            className="px-8 py-4 border border-white text-white rounded-full hover:bg-white hover:text-black transition"
          >
            View Our Work
          </Link>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[2px] h-10 bg-white opacity-60" />
      </div>

    </section>
  );
}
