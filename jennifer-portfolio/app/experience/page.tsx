import type { Metadata } from "next";
import { experience } from "@/data/content";
import { GrooveLine } from "../components/GrooveLine";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Jennifer Luo's experience: Nemitz Lab, JumboCode, Tufts CS TA, and an incoming AWS internship.",
  openGraph: {
    title: "Experience — Jennifer Luo",
    description:
      "Jennifer Luo's experience: Nemitz Lab, JumboCode, Tufts CS TA, and an incoming AWS internship.",
  },
};

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-wider text-copper">
        Reverse-chronological
      </p>
      <h1 className="mt-3 font-display text-4xl text-text sm:text-5xl">
        Experience
      </h1>

      <div className="mt-12">
        <GrooveLine />
        <ol>
          {experience.map((entry) => (
            <li key={entry.slug} className="py-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h2 className="font-display text-2xl text-text">
                    {entry.role}
                  </h2>
                  <p className="mt-1 text-sm text-copper">{entry.org}</p>
                </div>
                <div className="shrink-0 text-left font-mono text-xs text-muted sm:text-right">
                  <p>
                    {entry.dates}
                    {entry.upcoming && (
                      <span className="ml-2 uppercase tracking-wider text-label">
                        Upcoming
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5">{entry.location}</p>
                </div>
              </div>

              {entry.bullets.length > 0 && (
                <ul className="mt-4 max-w-2xl space-y-2">
                  {entry.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-text/80"
                    >
                      <span aria-hidden="true" className="text-copper">
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {entry.tech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {entry.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              )}

              <GrooveLine className="mt-8" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
