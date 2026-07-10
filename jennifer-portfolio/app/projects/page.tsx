import type { Metadata } from "next";
import { Tracklist } from "../components/Tracklist";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Jennifer Luo, led by EvoFab — a self-driving lab system for soft robotics research.",
  openGraph: {
    title: "Projects — Jennifer Luo",
    description:
      "Projects by Jennifer Luo, led by EvoFab — a self-driving lab system for soft robotics research.",
  },
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-wider text-copper">
        Tracklist
      </p>
      <h1 className="mt-3 font-display text-4xl text-text sm:text-5xl">
        Projects
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted">
        Selected work, ordered by what I&apos;m most invested in right now.
      </p>

      <div className="mt-12">
        <Tracklist />
      </div>
    </section>
  );
}
