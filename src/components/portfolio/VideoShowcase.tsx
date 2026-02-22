"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

const PLACEHOLDER_VIDEOS: VideoItem[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Emirates Brand Film 2025",
    description:
      "A cinematic journey through luxury travel and world-class hospitality, filmed across five international locations.",
    category: "Corporate",
  },
  {
    id: "jNQXAC9IVRw",
    title: "Dubai Expo Highlights",
    description:
      "Capturing innovation and cultural diversity through a series of short films at the world's greatest showcase.",
    category: "Event",
  },
  {
    id: "9bZkp7q19f0",
    title: "Luxury Auto Campaign",
    description:
      "High-octane commercial production for a premium automotive launch across the UAE desert and Dubai cityscape.",
    category: "Commercial",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Voices of Heritage",
    description:
      "An intimate documentary exploring the preservation of traditional craftsmanship in the UAE.",
    category: "Documentary",
  },
];

/* ─────────────────────────────────────
   Individual Video Card
   ───────────────────────────────────── */
function VideoCard({
  video,
  index,
  isActive,
  onBecomeVisible,
}: {
  video: VideoItem;
  index: number;
  isActive: boolean;
  onBecomeVisible: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy loading: load iframe when near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "300px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Active detection: report when 60% visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onBecomeVisible();
        }
      },
      { threshold: 0.6, rootMargin: "-5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onBecomeVisible]);

  // Control playback via postMessage
  useEffect(() => {
    if (!iframeRef.current || !isLoaded) return;

    const command = isActive ? "playVideo" : "pauseVideo";
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*"
    );
  }, [isActive, isLoaded]);

  return (
    <ScrollReveal delay={index * 0.1}>
      <div ref={containerRef} className="group">
        {/* Video number + metadata */}
        <div className="mb-4 flex items-center gap-4">
          <span className="text-5xl font-black text-border/40 md:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {video.category}
            </span>
            <h3 className="text-lg font-semibold md:text-2xl">{video.title}</h3>
          </div>
        </div>

        {/* Video embed */}
        <div
          className={cn(
            "relative aspect-video overflow-hidden rounded-2xl border transition-all duration-500",
            isActive
              ? "border-gold/30 video-active-glow"
              : "border-border"
          )}
        >
          {/* Lazy loaded iframe */}
          {shouldLoad && (
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoaded(true)}
              title={video.title}
            />
          )}

          {/* Thumbnail placeholder before load */}
          {!shouldLoad && (
            <div className="absolute inset-0 flex items-center justify-center bg-background-tertiary">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                  <Play className="h-6 w-6 text-gold" />
                </div>
                <span className="text-sm text-foreground-muted">
                  Scroll to play
                </span>
              </div>
            </div>
          )}

          {/* Active indicator bar */}
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </div>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-sm text-foreground-muted md:text-base">
          {video.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

/* ─────────────────────────────────────
   Main VideoShowcase Component
   ───────────────────────────────────── */
export function VideoShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleBecomeVisible = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section className="border-t border-border py-24 md:py-32">
      <Container>
        <SectionHeading
          tagline="Showreel"
          title="Our Work in Motion"
          description="Watch our latest productions come to life. Videos auto-play as you scroll."
        />

        <div className="space-y-16 md:space-y-24">
          {PLACEHOLDER_VIDEOS.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              isActive={activeIndex === index}
              onBecomeVisible={() => handleBecomeVisible(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
