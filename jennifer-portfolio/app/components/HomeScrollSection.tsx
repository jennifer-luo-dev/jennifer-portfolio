import { Hero } from "./Hero";
import { FeaturedWork } from "./FeaturedWork";
import { VinylRecord } from "./VinylRecord";

export function HomeScrollSection() {
  return (
    // One row, so the record's column stretches to the full height of the
    // reading column beside it — that stretch is what gives the sticky record
    // something to travel through while the tonearm tracks inward.
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 px-6 pb-24 pt-16 sm:grid-cols-5 sm:pt-24">
      <div className="order-1 sm:order-2 sm:col-span-2">
        <VinylRecord />
      </div>
      <div className="order-2 sm:order-1 sm:col-span-3">
        <Hero />
        <FeaturedWork />
      </div>
    </div>
  );
}
