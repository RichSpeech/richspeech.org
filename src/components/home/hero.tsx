import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/home/waveform";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:pt-16">
      <div>
        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.1rem]">
          Rich Speech Processing for the Next Generation of Speech AI.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">{SITE.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/rsml" arrow>
            Get Started
          </Button>
          <Button href="/rsml" variant="outline">
            View Documentation
          </Button>
        </div>
      </div>
      <Waveform />
    </section>
  );
}
