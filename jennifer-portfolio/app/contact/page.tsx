import type { Metadata } from "next";
import { contact, skills } from "@/data/content";
import { GrooveLine } from "../components/GrooveLine";

export const metadata: Metadata = {
  title: "Resume & Contact",
  description:
    "Get in touch with Jennifer Luo, or download her resume — email, GitHub, and skills.",
  openGraph: {
    title: "Resume & Contact — Jennifer Luo",
    description:
      "Get in touch with Jennifer Luo, or download her resume — email, GitHub, and skills.",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-wider text-copper">
        Get in touch
      </p>
      <h1 className="mt-3 font-display text-4xl text-text sm:text-5xl">
        Resume &amp; contact
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted">
        The fastest way to reach me is email. Resume is one click away below.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={contact.resumeHref}
          className="inline-flex items-center gap-2 rounded bg-label px-5 py-3 font-mono text-xs uppercase tracking-wider text-text hover:opacity-90 transition-opacity duration-150"
        >
          Download résumé (PDF)
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 rounded border border-muted px-5 py-3 font-mono text-xs uppercase tracking-wider text-text hover:border-copper hover:text-copper transition-colors duration-150"
        >
          {contact.email}
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded border border-muted px-5 py-3 font-mono text-xs uppercase tracking-wider text-text hover:border-copper hover:text-copper transition-colors duration-150"
        >
          {contact.githubHandle}
        </a>
      </div>

      <GrooveLine className="mt-16" />

      <div className="mt-10">
        <h2 className="font-display text-2xl text-text">Skills</h2>
        <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.label}>
              <dt className="font-mono text-xs uppercase tracking-wider text-copper">
                {group.label}
              </dt>
              <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-text/80">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
