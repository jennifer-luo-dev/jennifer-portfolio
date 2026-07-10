import { contact } from "@/data/content";
import { GrooveLine } from "./GrooveLine";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-16 pt-20">
      <GrooveLine className="mb-10" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl text-text">
            Let&apos;s talk.
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Open to full-time SWE roles and research collaborations.
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider sm:items-end">
          <a
            href={`mailto:${contact.email}`}
            className="text-copper hover:text-text transition-colors duration-150"
          >
            {contact.email}
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-text transition-colors duration-150"
          >
            {contact.githubHandle}
          </a>
          <a
            href={contact.resumeHref}
            className="text-muted hover:text-text transition-colors duration-150"
          >
            Resume (PDF)
          </a>
        </div>
      </div>
      <p className="mt-12 font-mono text-[11px] text-muted">
        © {new Date().getFullYear()} Jennifer Luo. Built with Next.js.
      </p>
    </footer>
  );
}
