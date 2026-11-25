import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/home/waveform";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[520px] max-w-4xl rounded-full bg-gradient-to-b from-blue-100/70 via-indigo-50/40 to-transparent blur-3xl"
      />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-medium text-blue-800 shadow-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Open-source initiative for Voice AI
          </p>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-[4.25rem]">
            Beyond <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Flat Text.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            <strong className="font-semibold text-slate-900">Rich Speech</strong> is an open-source initiative for Rich
            Speech Processing. Towards speech processing that replaces flat-text transcription with <b>Rich Transcription</b>.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/rsml" arrow>
              Get Started
            </Button>
            <Button href="/rsml" variant="outline">
              Read the spec
            </Button>
          </div>
        </div>
        <Waveform />
      </div>
    </section>
  );
}
