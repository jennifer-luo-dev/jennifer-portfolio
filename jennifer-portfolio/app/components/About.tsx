import { about } from "@/data/content";
import { AboutPhoto } from "./AboutPhoto";

export function About() {
  return (
    <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
      <AboutPhoto src={about.photoSrc} alt={about.photoAlt} />
      <p className="min-w-0 flex-1 text-sm leading-relaxed text-text/80 sm:text-base">
        {about.paragraph}{" "}
      </p>
    </div>
  );
}
