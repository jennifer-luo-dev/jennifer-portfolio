import Link from "next/link";
import { featuredProjectSlugs, projects } from "@/data/content";
import { GrooveLine } from "./GrooveLine";
import { StatusTag } from "./StatusTag";

export function FeaturedWork() {
  const featured = featuredProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="pt-20">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl text-text sm:text-3xl">
          Featured work
        </h2>
        <Link
          href="/projects"
          className="font-mono text-xs uppercase tracking-wider text-copper hover:text-text transition-colors duration-150"
        >
          All projects →
        </Link>
      </div>

      <GrooveLine className="mt-8" />
      <ul>
        {featured.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects#${project.slug}`}
              className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-xl text-text group-hover:text-copper transition-colors duration-150">
                    {project.title}
                  </h3>
                  <StatusTag status={project.status} />
                </div>
                <p className="mt-1.5 max-w-xl text-sm text-muted">
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
                className="font-mono text-lg text-muted group-hover:text-copper group-hover:translate-x-1 transition-all duration-150"
              >
                →
              </span>
            </Link>
            <GrooveLine />
          </li>
        ))}
      </ul>
    </section>
  );
}
