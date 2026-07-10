import Link from "next/link";
import { experience } from "@/data/content";
import { GrooveLine } from "./GrooveLine";

export function ExperienceStrip() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl text-text sm:text-3xl">
          Experience
        </h2>
        <Link
          href="/experience"
          className="font-mono text-xs uppercase tracking-wider text-copper hover:text-text transition-colors duration-150"
        >
          Full history →
        </Link>
      </div>

      <GrooveLine className="mt-8" />
      <ul>
        {experience.map((entry) => (
          <li key={entry.slug}>
            <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <p className="text-text">
                  <span className="font-medium">{entry.role}</span>
                  <span className="text-muted"> · {entry.org}</span>
                  {entry.upcoming && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-label">
                      Upcoming
                    </span>
                  )}
                </p>
              </div>
              <p className="shrink-0 font-mono text-xs text-muted">
                {entry.dates}
              </p>
            </div>
            <GrooveLine />
          </li>
        ))}
      </ul>
    </section>
  );
}
