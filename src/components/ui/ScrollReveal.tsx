"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  variant?: "slide" | "fade" | "scale" | "blur";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  variant = "slide",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const getInitial = () => {
    switch (variant) {
      case "fade":
        return { opacity: 0 };
      case "scale":
        return { opacity: 0, scale: 0.9 };
      case "blur":
        return { opacity: 0, filter: "blur(10px)" };
      default: {
        const offsets = {
          up: { y: 40 },
          down: { y: -40 },
          left: { x: 40 },
          right: { x: -40 },
        };
        return { opacity: 0, ...offsets[direction] };
      }
    }
  };

  const getAnimate = () => {
    switch (variant) {
      case "fade":
        return { opacity: 1 };
      case "scale":
        return { opacity: 1, scale: 1 };
      case "blur":
        return { opacity: 1, filter: "blur(0px)" };
      default:
        return { opacity: 1, x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
