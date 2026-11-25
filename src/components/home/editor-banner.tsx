import { ExternalLink, SquarePen } from "lucide-react";
import { SITE } from "@/lib/constants";

export function EditorBanner() {
  return (
    <section aria-labelledby="editor-heading" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl"
        />
        <div className="relative flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <SquarePen size={26} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <h2 id="editor-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Try the Rich Speech Editor
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-300">
              Create, view and annotate RSML transcripts right in your browser. No install required.
            </p>
          </div>
        </div>
        <div className="relative mt-8 flex flex-wrap items-center gap-5 lg:mt-0 lg:shrink-0">
          <a
            href={SITE.editorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold text-slate-950 transition-colors hover:bg-blue-50"
          >
            Open Editor
            <ExternalLink size={16} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <span className="font-mono text-sm text-slate-400">editor.richspeech.org</span>
        </div>
      </div>
    </section>
  );
}
