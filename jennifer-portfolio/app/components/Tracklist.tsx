"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects } from "@/data/content";
import { GrooveLine } from "./GrooveLine";
import { StatusTag } from "./StatusTag";

export function Tracklist() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && projects.some((p) => p.slug === hash)) {
      // One-time sync from the URL fragment at mount (deep link from the
      // home page's featured work list) — not a cascading update source.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpanded(hash);
      const el = document.getElementById(hash);
      el?.scrollIntoView({ block: "start" });
    }
  }, []);

  return (
    <div>
      <GrooveLine />
      <ol>
        {projects.map((project, index) => {
          const isExpanded = expanded === project.slug;
          const trackNo = String(index + 1).padStart(2, "0");
          return (
            <li key={project.slug} id={project.slug}>
              <button
                type="button"
                onClick={() =>
                  setExpanded(isExpanded ? null : project.slug)
                }
                aria-expanded={isExpanded}
                aria-controls={`${project.slug}-detail`}
                className="group flex w-full flex-col gap-2 py-6 text-left sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="font-mono text-sm text-muted sm:w-8 sm:shrink-0">
                  {trackNo}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-xl text-text group-hover:text-copper transition-colors duration-150 sm:text-2xl">
                      {project.title}
                    </h2>
                    <StatusTag status={project.status} />
                  </div>
                  <p className="mt-1.5 max-w-2xl text-sm text-muted">
                    {project.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className={`shrink-0 self-start font-mono text-lg text-muted transition-transform duration-150 sm:self-center ${
                    isExpanded ? "rotate-90 text-copper" : "group-hover:translate-x-1"
                  }`}
                >
                  →
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`${project.slug}-detail`}
                    key="detail"
                    initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-2xl pb-8 pl-0 sm:pl-14">
                      <p className="text-sm leading-relaxed text-text/80">
                        {project.description}
                      </p>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-copper hover:text-text transition-colors duration-150"
                        >
                          View project →
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <GrooveLine />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
