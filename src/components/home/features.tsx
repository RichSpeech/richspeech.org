import {
  Activity,
  AudioWaveform,
  BookOpen,
  FileText,
  Globe,
  Languages,
  Mic,
  SpellCheck,
  Tag,
  type LucideIcon,
} from "lucide-react";

const CHARACTERISTICS: readonly { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Verbatim and Normalized",
    description:
      "Retaining both the spoken form and the intended/standard written form for all rich speech characteristics.",
    icon: FileText,
  },
  {
    title: "Disfluencies",
    description:
      "Hesitations, fillers, repetitions, broken words, repairs, false starts, prolongations, stutter blocks and pauses.",
    icon: Mic,
  },
  {
    title: "Mispronunciations",
    description: "Incorrect pronunciations of the words captured alongside the intended spelling.",
    icon: SpellCheck,
  },
  {
    title: "Code-mixing",
    description: "Switches between languages within an utterance, marked so multilingual speech stays faithful.",
    icon: Languages,
  },
  {
    title: "Named entities",
    description: "People, places, organizations and other named entities.",
    icon: Tag,
  },
  {
    title: "Paralinguistics",
    description: "Laughter, breaths and other non-lexical vocal events.",
    icon: Activity,
  },
  {
    title: "Accents and dialects",
    description: "Speaker accents and regional dialect forms, kept alongside normalized text.",
    icon: Globe,
  },
  {
    title: "Domain terms",
    description: "Domain-specific vocabulary tagged for specific domains, such as medical, legal, or technical terms.",
    icon: BookOpen,
  },
  {
    title: "Prosody",
    description: "Emphasis, pauses, speech rate, rhythm and intonation",
    icon: AudioWaveform,
  },
];

export function Features() {
  return (
    <section aria-labelledby="features-heading" className="border-y border-slate-200 bg-slate-50/70 py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight"><span className="text-blue-700">Rich Speech</span> Characteristics</h2>
        </div>

        <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {CHARACTERISTICS.map(({ title, description, icon: Icon }) => (
            <li key={title} className="flex flex-col bg-white p-6">
              <Icon size={24} strokeWidth={1.75} className="text-blue-700" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
