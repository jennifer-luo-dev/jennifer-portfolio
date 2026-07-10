"use client";

import { useState } from "react";

export function AboutPhoto({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="h-87.5 w-87.5 shrink-0 rounded-full border border-copper p-1.5">
      <div className="h-full w-full overflow-hidden rounded-full bg-muted/20">
        {errored ? (
          <div
            role="img"
            aria-label={alt}
            className="flex h-full w-full items-center justify-center font-display text-7xl text-copper"
          >
            JL
          </div>
        ) : (
          // local circular crop with a runtime fallback; not worth next/image's overhead
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
            className="h-full w-full object-cover"
            style={{ filter: "sepia(0.12) saturate(0.85) contrast(0.95)" }}
          />
        )}
      </div>
    </div>
  );
}
