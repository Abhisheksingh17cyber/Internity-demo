"use client";

import {
  motion,
  useScroll,
  useTransform,
  useAnimationControls,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Play, Instagram, Youtube, Linkedin } from "lucide-react";

/* ─────────────────────────────────────
   Inline SVG: 3D Realistic Cinema Camera
   ───────────────────────────────────── */
function CinemaCamera({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Camera body gradient */}
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3A3A" />
          <stop offset="30%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#151515" />
        </linearGradient>
        {/* Metallic highlight */}
        <linearGradient id="metalHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#555" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#222" stopOpacity="0" />
        </linearGradient>
        {/* Lens radial gradient */}
        <radialGradient id="lensGlass" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#1a1a3a" />
          <stop offset="60%" stopColor="#0d0d1a" />
          <stop offset="100%" stopColor="#050510" />
        </radialGradient>
        {/* Lens ring metallic */}
        <linearGradient id="lensRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#555" />
          <stop offset="50%" stopColor="#333" />
          <stop offset="100%" stopColor="#444" />
        </linearGradient>
        {/* Gold accent gradient */}
        <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E0C068" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#A08030" />
        </linearGradient>
        {/* Film reel gradient */}
        <radialGradient id="reelGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#333" />
          <stop offset="70%" stopColor="#222" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </radialGradient>
        {/* Shadow filter */}
        <filter id="cameraShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="15" stdDeviation="20" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter="url(#cameraShadow)">
        {/* ── Film Reels (top) ── */}
        {/* Left reel */}
        <circle cx="175" cy="120" r="52" fill="url(#reelGrad)" stroke="#3a3a3a" strokeWidth="2" />
        <circle cx="175" cy="120" r="38" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
        <circle cx="175" cy="120" r="12" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
        {/* Spokes */}
        {[0, 45, 90, 135].map((angle) => (
          <line
            key={`ls${angle}`}
            x1={175 + 12 * Math.cos((angle * Math.PI) / 180)}
            y1={120 + 12 * Math.sin((angle * Math.PI) / 180)}
            x2={175 + 38 * Math.cos((angle * Math.PI) / 180)}
            y2={120 + 38 * Math.sin((angle * Math.PI) / 180)}
            stroke="#333"
            strokeWidth="1.5"
          />
        ))}

        {/* Right reel */}
        <circle cx="305" cy="120" r="52" fill="url(#reelGrad)" stroke="#3a3a3a" strokeWidth="2" />
        <circle cx="305" cy="120" r="38" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
        <circle cx="305" cy="120" r="12" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
        {[0, 45, 90, 135].map((angle) => (
          <line
            key={`rs${angle}`}
            x1={305 + 12 * Math.cos((angle * Math.PI) / 180)}
            y1={120 + 12 * Math.sin((angle * Math.PI) / 180)}
            x2={305 + 38 * Math.cos((angle * Math.PI) / 180)}
            y2={120 + 38 * Math.sin((angle * Math.PI) / 180)}
            stroke="#333"
            strokeWidth="1.5"
          />
        ))}

        {/* ── Camera Body ── */}
        <rect x="110" y="165" width="300" height="175" rx="16" fill="url(#bodyGrad)" stroke="#3a3a3a" strokeWidth="1.5" />
        {/* Top highlight strip */}
        <rect x="110" y="165" width="300" height="30" rx="16" fill="url(#metalHighlight)" />
        {/* Bottom edge */}
        <rect x="120" y="325" width="280" height="8" rx="4" fill="#1a1a1a" />

        {/* ── Viewfinder (back right) ── */}
        <rect x="380" y="180" width="50" height="35" rx="6" fill="#222" stroke="#3a3a3a" strokeWidth="1" />
        <rect x="395" y="185" width="30" height="10" rx="3" fill="#1a1a1a" />
        {/* Viewfinder eyepiece */}
        <rect x="425" y="188" width="18" height="20" rx="4" fill="#2a2a2a" stroke="#444" strokeWidth="1" />

        {/* ── Main Lens Assembly ── */}
        {/* Outer lens housing */}
        <circle cx="240" cy="255" r="68" fill="#222" stroke="url(#lensRing)" strokeWidth="3" />
        {/* Gold accent ring */}
        <circle cx="240" cy="255" r="62" fill="none" stroke="url(#goldAccent)" strokeWidth="2" />
        {/* Middle ring */}
        <circle cx="240" cy="255" r="54" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
        {/* Inner ring */}
        <circle cx="240" cy="255" r="44" fill="url(#lensGlass)" stroke="#2a2a2a" strokeWidth="1.5" />
        {/* Glass reflections */}
        <ellipse cx="228" cy="240" rx="14" ry="8" fill="white" opacity="0.06" transform="rotate(-20 228 240)" />
        <ellipse cx="255" cy="268" rx="8" ry="5" fill="white" opacity="0.04" transform="rotate(-20 255 268)" />
        {/* Center dot */}
        <circle cx="240" cy="255" r="6" fill="#0a0a14" stroke="#333" strokeWidth="1" />

        {/* ── Recording Indicator ── */}
        <circle cx="380" cy="230" r="5" fill="#333" id="rec-dot-bg" />

        {/* ── Gold nameplate ── */}
        <rect x="170" y="310" width="60" height="12" rx="2" fill="url(#goldAccent)" opacity="0.7" />
        <rect x="240" y="310" width="30" height="12" rx="2" fill="url(#goldAccent)" opacity="0.4" />

        {/* ── Corner screws ── */}
        <circle cx="130" cy="185" r="4" fill="#333" stroke="#444" strokeWidth="1" />
        <circle cx="390" cy="185" r="4" fill="#333" stroke="#444" strokeWidth="1" />
        <circle cx="130" cy="320" r="4" fill="#333" stroke="#444" strokeWidth="1" />
        <circle cx="390" cy="320" r="4" fill="#333" stroke="#444" strokeWidth="1" />

        {/* ── Side handle ── */}
        <rect x="85" y="220" width="25" height="70" rx="8" fill="#222" stroke="#3a3a3a" strokeWidth="1" />
        <rect x="90" y="235" width="15" height="40" rx="4" fill="#2a2a2a" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────
   Social Icons
   ───────────────────────────────────── */
const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

/* ─────────────────────────────────────
   Hero Words Config
   ───────────────────────────────────── */
const HERO_WORDS = ["LIGHTS", "CAMERA", "ACTION"];

/* ─────────────────────────────────────
   Main Component
   ───────────────────────────────────── */
export default function AdvancedCinematicHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [projectionActive, setProjectionActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cameraControls = useAnimationControls();

  /* Parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* Projection Animation */
  const triggerProjection = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (projectionActive) {
      // Reset
      setProjectionActive(false);
      await cameraControls.start({ scale: 1 }, { duration: 0.4, ease: "easeOut" });
      setIsAnimating(false);
      return;
    }

    // Phase 1: Camera activation
    await cameraControls.start(
      { scale: 1.03 },
      { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    );

    // Phase 2+3: Beam + Text illuminate
    setProjectionActive(true);

    // Phase 4: Settle camera
    await cameraControls.start(
      { scale: 1.01 },
      { duration: 0.5, delay: 1.5, ease: "easeOut" }
    );

    setIsAnimating(false);
  }, [isAnimating, projectionActive, cameraControls]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#060606]"
    >
      {/* Subtle radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03)_0%,transparent_70%)]" />

      {/* Grain Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.05%22/%3E%3C/svg%3E')] mix-blend-overlay pointer-events-none" />

      {/* ─── Central Glowing Card ─── */}
      <motion.div
        style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
        className="relative z-10 mx-4 w-full max-w-6xl"
      >
        <div className="hero-card-glow relative overflow-hidden rounded-3xl border border-gold/20 bg-[#0B0B0B]">
          {/* Inner background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.04)_0%,transparent_60%)]" />

          {/* Aspect ratio container */}
          <div className="relative aspect-[16/10] md:aspect-video w-full">
            {/* ── Text Layer BEHIND camera (z-10) ── */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16">
              {HERO_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.15,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="block font-black uppercase leading-[0.85] tracking-tighter text-white/90"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 9rem)",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* ── SVG Camera (z-20) ── */}
            <motion.div
              animate={cameraControls}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="absolute right-[2%] top-1/2 z-20 w-[55%] -translate-y-1/2 md:right-[5%] md:w-[42%]"
            >
              <CinemaCamera className="h-auto w-full drop-shadow-2xl" />

              {/* Recording indicator dot */}
              <AnimatePresence>
                {projectionActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="animate-rec-blink absolute right-[24%] top-[51%] h-2.5 w-2.5 rounded-full bg-red-500"
                    style={{ boxShadow: "0 0 8px rgba(239,68,68,0.6)" }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Text Layer IN FRONT of camera (z-30) ── */}
            <div
              className="absolute inset-0 z-30 flex flex-col justify-center px-8 md:px-16"
              style={{ clipPath: "inset(0 55% 0 0)" }}
            >
              {HERO_WORDS.map((word, i) => (
                <motion.span
                  key={`front-${word}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                  className={`block font-black uppercase leading-[0.85] tracking-tighter transition-all duration-1000 ${
                    projectionActive
                      ? "text-gold-gradient animate-gold-pulse"
                      : "text-white/90"
                  }`}
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 9rem)",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* ── Light Beam (z-25) ── */}
            <AnimatePresence>
              {projectionActive && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute right-[18%] top-[30%] z-[25] h-[40%] w-[50%] origin-right"
                  style={{
                    clipPath: "polygon(100% 35%, 100% 65%, 0% 100%, 0% 0%)",
                    background:
                      "radial-gradient(ellipse at right, rgba(201,168,76,0.18), rgba(201,168,76,0.06) 50%, transparent 80%)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* ── Illuminated text overlay (z-35) - shown over camera when projection active ── */}
            <AnimatePresence>
              {projectionActive && (
                <div className="absolute inset-0 z-[35] flex flex-col justify-center px-8 md:px-16 pointer-events-none">
                  {HERO_WORDS.map((word, i) => (
                    <motion.span
                      key={`glow-${word}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3 + i * 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block font-black uppercase leading-[0.85] tracking-tighter text-gold-gradient animate-gold-pulse"
                      style={{
                        fontSize: "clamp(2.5rem, 8vw, 9rem)",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}

                  {/* Spotlight sweep effect */}
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.12) 40%, rgba(201,168,76,0.2) 50%, rgba(201,168,76,0.12) 60%, transparent 100%)",
                      mixBlendMode: "screen",
                    }}
                  />
                </div>
              )}
            </AnimatePresence>

            {/* ── CTA Button (z-40) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-6 left-8 z-40 md:bottom-10 md:left-16"
            >
              <button
                onClick={triggerProjection}
                disabled={isAnimating}
                className="group flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold backdrop-blur-sm transition-all duration-300 hover:border-gold/70 hover:bg-gold/20 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] disabled:opacity-50 md:px-8 md:py-4 md:text-base"
              >
                <Play className="h-4 w-4 fill-current" />
                {projectionActive ? "Reset" : "Roll Camera"}
              </button>
            </motion.div>

            {/* ── Subtitle text ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-6 right-8 z-40 hidden max-w-xs text-right text-xs leading-relaxed text-foreground-muted md:bottom-10 md:right-16 md:block md:text-sm"
            >
              Premium video production crafted for brands that demand cinematic excellence.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* ─── Social Icons (bottom-left) ─── */}
      <div className="absolute bottom-8 left-6 z-30 hidden flex-col gap-3 md:flex lg:left-10">
        {SOCIAL_LINKS.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-foreground-muted transition-all duration-300 hover:border-gold/60 hover:text-gold hover:shadow-[0_0_12px_rgba(201,168,76,0.1)]"
          >
            <social.icon className="h-4 w-4" />
          </motion.a>
        ))}
      </div>

      {/* ─── Scroll Indicator (bottom-right) ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 right-6 z-30 hidden flex-col items-center gap-2 md:flex lg:right-10"
      >
        <span
          className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground-muted"
          style={{ writingMode: "vertical-lr" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-10 w-[1px] bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
