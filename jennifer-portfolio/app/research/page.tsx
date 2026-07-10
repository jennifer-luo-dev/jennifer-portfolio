import type { Metadata } from "next";
import { research } from "@/data/content";
import { GrooveLine } from "../components/GrooveLine";
import { StatusTag } from "../components/StatusTag";

export const metadata: Metadata = {
  title: "Research",
  description:
    "In-progress research on self-driving labs for soft robotics, led by Jennifer Luo at the Nemitz Lab.",
  openGraph: {
    title: "Research — Jennifer Luo",
    description:
      "In-progress research on self-driving labs for soft robotics, led by Jennifer Luo at the Nemitz Lab.",
  },
};

export default function ResearchPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-wider text-copper">
        Research
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl text-text sm:text-5xl">
          {research.title}
        </h1>
        <StatusTag status="in progress" />
      </div>
      <p className="mt-4 max-w-xl text-sm text-muted">{research.status}</p>

      <GrooveLine className="mt-12" />

      <div className="mt-10 max-w-2xl space-y-12">
        <div>
          <h2 className="font-display text-xl text-text">
            Motivation &amp; problem
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text/80">
            {research.motivation}
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-text">
            My contribution
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text/80">
            {research.contribution}
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-text">Current status</h2>
          <p className="mt-3 text-sm leading-relaxed text-text/80">
            {research.status_detail}
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-text">Abstract &amp; PDF</h2>
          <div className="mt-3 rounded border border-dashed border-muted px-5 py-6">
            <p className="text-sm text-muted">
              A manuscript is in progress. The abstract and PDF will be linked
              here once the paper is submitted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
