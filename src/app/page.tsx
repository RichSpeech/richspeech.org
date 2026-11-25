import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Objectives } from "@/components/home/objectives";
import { EcosystemCards } from "@/components/home/ecosystem-cards";
import { EditorBanner } from "@/components/home/editor-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Objectives />
      <section aria-labelledby="ecosystem-heading" className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 id="ecosystem-heading" className="text-4xl font-bold tracking-tight">
            <span className="text-blue-700">Ecosystem</span> &amp; Tools
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            The format comes first. The libraries below read and write it, so you can use what you need without the rest.
          </p>
        </div>
      </section>
      <div className="mt-12">
        <EcosystemCards />
      </div>
      <EditorBanner />
    </>
  );
}
