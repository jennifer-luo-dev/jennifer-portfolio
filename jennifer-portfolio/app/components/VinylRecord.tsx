"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

export function VinylRecord({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [needleDown, setNeedleDown] = useState(false);
  const hasScrolledRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value > 0.01 && !hasScrolledRef.current) {
        hasScrolledRef.current = true;
        setNeedleDown(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, prefersReducedMotion]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      <motion.svg
        viewBox="0 0 300 300"
        className="h-full w-full"
        style={prefersReducedMotion ? undefined : { rotate }}
        role="img"
        aria-label="Illustration of a spinning vinyl record"
      >
        <circle cx="150" cy="150" r="148" fill="#0f0d0a" stroke="var(--muted)" strokeWidth="1" />

        {[130, 112, 96, 82, 70, 60].map((r) => (
          <circle
            key={r}
            cx="150"
            cy="150"
            r={r}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="0.75"
            opacity="0.5"
          />
        ))}

        <circle cx="150" cy="150" r="52" fill="var(--accent-label)" />
        <circle cx="150" cy="150" r="52" fill="none" stroke="#17140f" strokeWidth="1" opacity="0.4" />
        <circle cx="150" cy="150" r="4" fill="#17140f" />

        <path
          d="M 60 90 A 130 130 0 0 1 150 20"
          fill="none"
          stroke="var(--accent-copper)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 300 300"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        initial={false}
        animate={{ rotate: prefersReducedMotion || !needleDown ? -28 : -4 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.6, ease: "easeOut" }
        }
      >
        <g transform="translate(248, 40)">
          <circle cx="0" cy="0" r="9" fill="var(--muted)" />
          <line
            x1="0"
            y1="4"
            x2="-58"
            y2="72"
            stroke="var(--accent-copper)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="-58" cy="72" r="3.5" fill="var(--accent-copper)" />
        </g>
      </motion.svg>
    </div>
  );
}
