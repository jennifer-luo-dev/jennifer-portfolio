import { bio, contact } from "@/data/content";
import { VinylRecord } from "./VinylRecord";
import { StatusLine } from "./StatusLine";

export function Hero({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
      <div className="grid grid-cols-1 items-center gap-12 sm:grid-cols-5 sm:gap-8">
        <div className="order-2 sm:order-1 sm:col-span-3">
          <p className="font-mono text-xs uppercase tracking-wider text-copper">
            Software Engineer
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] text-text sm:text-6xl">
            {bio.name}
          </h1>
          <p className="mt-5 max-w-md text-base text-text/80 sm:text-lg">
            {bio.tagline}
          </p>

          <div className="mt-8">
            <StatusLine text={bio.nowBuilding} />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider">
            <a
              href={`mailto:${contact.email}`}
              className="text-text hover:text-copper transition-colors duration-150"
            >
              Email
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-text hover:text-copper transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href={contact.resumeHref}
              className="text-text hover:text-copper transition-colors duration-150"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="order-1 sm:order-2 sm:col-span-2">
          <VinylRecord scrollRef={scrollRef} />
        </div>
      </div>
    </section>
  );
}
