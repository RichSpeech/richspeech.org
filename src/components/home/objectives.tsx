const OBJECTIVES: readonly { title: string; description: string }[] = [
  {
    title: "Rich Transcription Schema",
    description: "Define rich speech characteristics and the schemas that encode them.",
  },
  {
    title: "Editor and file formats",
    description: "Provide an editor and file formats for rich transcription.",
  },
  {
    title: "Metrics beyond WER",
    description: "Establish metrics for evaluating rich transcription beyond word error rate.",
  },
  {
    title: "Libraries",
    description: "Build libraries for processing and evalating rich transcripts.",
  },
  {
    title: "Models and datasets",
    description: "Develop models, datasets and benchmarks for rich speech.",
  },
  {
    title: "Tools and standards",
    description: "Publish tools and standards that the community can adopt and extend.",
  },
];

export function Objectives() {
  return (
    <section aria-labelledby="objectives-heading" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="max-w-2xl">

      <h2 className="text-4xl font-bold tracking-tight"><span className="text-blue-700">Objectives</span> & Deliverables</h2>
      </div>

      <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {OBJECTIVES.map((o, i) => (
          <li key={o.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">{o.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{o.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
