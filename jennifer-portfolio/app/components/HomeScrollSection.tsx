"use client";

import { useRef } from "react";
import { Hero } from "./Hero";
import { FeaturedWork } from "./FeaturedWork";

export function HomeScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef}>
      <Hero scrollRef={sectionRef} />
      <FeaturedWork />
    </div>
  );
}
