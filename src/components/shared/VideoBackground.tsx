"use client";

import { useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoBackground({ src, poster, className }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: containerRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.25,
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!videoRef.current || isMobile) return;
    if (isIntersecting) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isIntersecting, isMobile]);

  if (isMobile && poster) {
    return (
      <div ref={containerRef} className={cn("bg-background-secondary", className)}>
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn(className)}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
