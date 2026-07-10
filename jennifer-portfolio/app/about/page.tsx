import type { Metadata } from "next";
import { About } from "../components/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jennifer Luo — CS student at Tufts, software researcher at the Nemitz Lab, incoming AWS SDE intern.",
  openGraph: {
    title: "About — Jennifer Luo",
    description:
      "About Jennifer Luo — CS student at Tufts, software researcher at the Nemitz Lab, incoming AWS SDE intern.",
  },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-wider text-copper">
        About
      </p>
      <h1 className="mt-3 font-display text-4xl text-text sm:text-5xl">
        Jennifer Luo
      </h1>

      <div className="mt-12">
        <About />
      </div>
    </section>
  );
}
