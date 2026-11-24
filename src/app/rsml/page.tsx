import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Code2, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "RSML Specification & Annotation Guide",
  description:
    "Rich Speech Markup Language (RSML) specification, tag reference, and annotation guidelines for rich transcription.",
  alternates: { canonical: "/rsml" },
};

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="my-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-900 text-slate-100">
      {label && (
        <div className="border-b border-slate-800 bg-slate-950/60 px-4 py-1.5 text-xs font-mono text-slate-400">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[13.5px] leading-relaxed font-mono whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div className="mt-14 mb-4 border-b border-slate-200 pb-3">
      <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        <a href={`#${id}`} className="group hover:text-blue-700">
          {title}
          <span className="ml-2 text-slate-400 opacity-0 transition group-hover:opacity-100">#</span>
        </a>
      </h2>
      {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
    </div>
  );
}

export default function RSMLPage() {
  return (
    <article className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Header */}
      <header className="border-b border-slate-200 pb-10">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
          <span>Standard & Specification</span>
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          Rich Speech Markup Language (RSML)
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-slate-700">
          A markup schema designed to capture how people actually speak — disfluencies, paralinguistic
          signals, prosody, accents, and code-switching — without losing standard written readability.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={SITE.editorUrl} external>
            Try in Online Editor
          </Button>
          <Button href="#quick-reference" variant="outline">
            Tag Reference
          </Button>
          <Button href="/rsml-npm" variant="outline">
            npm package
          </Button>
          <Button href="/rsml-py" variant="outline">
            Python library
          </Button>
        </div>
      </header>

      {/* Overview & Dual-layer design */}
      <SectionHeading
        id="why-rsml"
        title="Why RSML?"
        subtitle="The gap between clean text transcripts and raw audio waveforms"
      />
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        <p>
          Standard ASR transcripts sanitize speech. They strip hesitations, ignore speaker hesitations and laughter,
          standardize dialectal variations, and erase false starts. While that yields clean sentences for simple NLP,
          it discards critical acoustic, diagnostic, and conversational information.
        </p>
        <p>
          Audio files preserve everything, but you cannot easily index, parse, search, or train standard text-token models
          directly on audio without structured alignment.
        </p>
        <p>
          <strong>RSML</strong> bridges this gap. It acts as a rich transcription schema that is:
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 pt-2">
          <li className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
            <div>
              <strong className="text-slate-900">Near-lossless:</strong> Preserves nuanced speech characteristics without
              throwing away the raw utterance details.
            </div>
          </li>
          <li className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
            <div>
              <strong className="text-slate-900">Language & Script Agnostic:</strong> Works across multilingual settings,
              code-mixed speech, and non-Latin scripts (Devanagari, Telugu, Arabic, etc.).
            </div>
          </li>
          <li className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
            <div>
              <strong className="text-slate-900">Minimal & Explicit:</strong> Phenomena are marked directly rather than
              inferred from ad-hoc formatting, keeping cognitive load low for human annotators.
            </div>
          </li>
          <li className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
            <div>
              <strong className="text-slate-900">Dual-Read Recoverable:</strong> Both pure verbatim audio transcript and
              canonical normalized text can be deterministically extracted from a single RSML file.
            </div>
          </li>
        </ul>
      </div>

      {/* Core Principle: Verbatim vs Normalized */}
      <SectionHeading
        id="verbatim-vs-normalized"
        title="Core Concept: Verbatim vs. Normalized"
        subtitle="How RSML keeps two distinct representations in one place"
      />
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        <p>
          Every RSML document embeds two parallel views of the speech stream:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">View 1</div>
            <h3 className="mt-1 text-lg font-bold text-slate-950">Verbatim Reading</h3>
            <p className="mt-2 text-sm text-slate-600">
              Captures speech exactly as produced: disfluencies, phonetic slips, repetitions, dialect variants, and local
              pronunciations, with zero editorial cleanup.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">View 2</div>
            <h3 className="mt-1 text-lg font-bold text-slate-950">Normalized Reading</h3>
            <p className="mt-2 text-sm text-slate-600">
              The cleaned, canonical reading of the same utterance: corrected spelling, proper native-script forms of
              code-mixed vocabulary, canonical entity casing, and dropped filler words.
            </p>
          </div>
        </div>
        <p className="pt-2">
          For example, when a speaker mispronounces a word or switches languages mid-sentence:
        </p>
        <CodeBlock
          label="RSML representation"
          code={`क्या आप !en[लोकेशन](location) पर पहुँच गए? उसने [सक्रीन](स्क्रीन) तोड़ दी।`}
        />
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
            <div className="font-semibold text-slate-900">Verbatim extractor yields:</div>
            <code className="mt-1 block text-slate-700">क्या आप लोकेशन पर पहुँच गए? उसने सक्रीन तोड़ दी।</code>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
            <div className="font-semibold text-slate-900">Normalized extractor yields:</div>
            <code className="mt-1 block text-slate-700">क्या आप location पर पहुँच गए? उसने स्क्रीन तोड़ दी।</code>
          </div>
        </div>
      </div>

      {/* Syntax & Structural Categories */}
      <SectionHeading
        id="syntax-structure"
        title="Tag Syntax & Structure"
        subtitle="RSML tags fall into two structural models"
      />
      <div className="space-y-6 text-base leading-relaxed text-slate-700">
        <div>
          <h3 className="text-lg font-bold text-slate-950">1. Isolated Tags</h3>
          <p className="mt-1 text-sm text-slate-600">
            Self-contained single tokens inserted at a specific point in the transcript. They take no closing tag and do
            not wrap words. Used for momentary events like hesitations, articulatory stutter blocks, pauses, and standalone sounds.
          </p>
          <CodeBlock
            label="Isolated tag syntax"
            code={`@tag-name

Example:
मुझे @umm लगता है कि @short-pause यह सही है।`}
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-950">2. Span-Based Tags</h3>
          <p className="mt-1 text-sm text-slate-600">
            Span tags cover one or more words. They take one of two forms depending on whether they mark acoustic/behavioral
            boundaries or lexical mappings:
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="font-semibold text-slate-900">Start / End Pairs</h4>
              <p className="mt-1 text-xs text-slate-600">
                Used for disfluencies (fillers, repetitions, speech repairs), prosodic contours, and paralinguistic stretches.
              </p>
              <div className="mt-2 font-mono text-xs text-blue-700">
                @phenomenon-start ... @phenomenon-end
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="font-semibold text-slate-900">Bracket Constructs</h4>
              <p className="mt-1 text-xs text-slate-600">
                Used when the span requires both a verbatim surface form and a normalized target form.
              </p>
              <div className="mt-2 font-mono text-xs text-blue-700">
                PREFIX[verbatim](normalized)
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border-l-4 border-amber-500 bg-amber-50/60 p-4 text-sm text-amber-900">
            <strong>Contiguous spans rule:</strong> If the same phenomenon covers multiple consecutive words, tag the
            entire multi-word stretch as a single span once. Never tag consecutive words individually.
          </div>
        </div>
      </div>

      {/* Quick Reference Table */}
      <SectionHeading
        id="quick-reference"
        title="Quick Reference"
        subtitle="Complete catalog of RSML tags"
      />
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-900">
            <tr>
              <th className="px-4 py-3 sm:px-6">Category</th>
              <th className="px-4 py-3 sm:px-6">Tag / Pattern</th>
              <th className="px-4 py-3 sm:px-6">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Hesitations</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @umm @uhh @hmm @ugh @huh @tsk @uh-huh @ehh @ooh @uhh-oh @ohh @ho
              </td>
              <td className="px-4 py-3.5 sm:px-6">Non-lexical vocalizations placed in-situ.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Stutter Block</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">@stutter-block</td>
              <td className="px-4 py-3.5 sm:px-6">Silent articulatory block before a word/syllable.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Pauses</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @short-pause<br />@long-pause
              </td>
              <td className="px-4 py-3.5 sm:px-6">Non-articulatory silence or thinking pause.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Unintelligible</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">@unintelligible</td>
              <td className="px-4 py-3.5 sm:px-6">Inaudible or indecipherable audio segment.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Discourse Fillers</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @filler-start ... @filler-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Lexical fillers without propositional meaning.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Repetitions</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @repetition-start ... @repetition-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Repeated utterance words (wraps discarded repeat only).</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Broken Words</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @broken-word-start ... @broken-word-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Incomplete word cut off mid-articulation.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Speech Repairs</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @repair-start reparandum - repair @repair-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Self-correction with optional hyphen separator.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">False Starts</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @false-start-start ... @false-start-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Fully abandoned thought restarted from scratch.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Prolongations</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @prolongation-start ... @prolongation-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Elongated syllables or phonemes transcribed directly.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Mispronunciations</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                [verbatim](normalized)
              </td>
              <td className="px-4 py-3.5 sm:px-6">Word spoken non-standardly (bare brackets, no prefix).</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Code-mixing</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                !lang[verbatim](normalized)<br />![verbatim](normalized)
              </td>
              <td className="px-4 py-3.5 sm:px-6">Cross-language lexical insertions (e.g. !en).</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Named Entities</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                #TYPE[verbatim](normalized)<br />#[verbatim](normalized)
              </td>
              <td className="px-4 py-3.5 sm:px-6">Entity mentions classified into 18 standard types.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Accent</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                $accent-name[verbatim](normalized)<br />$[verbatim](normalized)
              </td>
              <td className="px-4 py-3.5 sm:px-6">Phonological accent variation.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Dialect</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                $$dialect-name[verbatim](normalized)<br />$$[verbatim](normalized)
              </td>
              <td className="px-4 py-3.5 sm:px-6">Regional lexical or grammatical variations.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Domain Terms</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                !!domain-name[verbatim](normalized)<br />!![verbatim](normalized)
              </td>
              <td className="px-4 py-3.5 sm:px-6">Specialized jargon or technical terms.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Isolated Paralinguistics</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @laughter @cry @hum @breathe @sniff @nose-blowing @cough @sneeze @throat-clearing @yawn @eating-sounds @snore @groan @sigh
              </td>
              <td className="px-4 py-3.5 sm:px-6">Non-verbal vocal sounds without speech words.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Span Paralinguistics</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @crying-start/-end @yelling-start/-end @laughing-start/-end @singing-start/-end @humming-start/-end @whistling-start/-end @whispering-start/-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Speech articulated while performing a vocal behavior.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Prosody</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                @emphasis-start/-end<br />
                @falling-pitch-start/-end<br />
                @raising-pitch-start/-end<br />
                @fast-speech-start/-end<br />
                @slow-speech-start/-end<br />
                @high-pitch-start/-end<br />
                @low-pitch-start/-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Pitch contours, rate variations, and stress.</td>
            </tr>
            <tr>
              <td className="px-4 py-3.5 font-medium text-slate-900 sm:px-6">Speakers</td>
              <td className="px-4 py-3.5 font-mono text-xs text-blue-700 sm:px-6">
                &amp;s1-start/-end ... &amp;sn-start/-end
              </td>
              <td className="px-4 py-3.5 sm:px-6">Speaker turns in overlapping multi-speaker speech.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Detailed Tag Guidelines: Isolated */}
      <SectionHeading
        id="isolated-elements"
        title="1. Isolated Elements"
        subtitle="Standalone acoustic events occurring at discrete points"
      />
      <div className="space-y-6 text-base leading-relaxed text-slate-700">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-bold text-slate-950">Hesitations</h3>
          <p className="mt-1 text-sm text-slate-600">
            Non-lexical vocalizations with no propositional content. Insert the tag in place of the sound. Do not also
            transcribe the sound as text.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono">
            {["@umm", "@uhh", "@hmm", "@ugh", "@huh", "@tsk", "@uh-huh", "@ehh", "@ooh", "@uhh-oh", "@ohh", "@ho"].map((t) => (
              <span key={t} className="rounded bg-slate-100 px-2 py-1 text-slate-800">
                {t}
              </span>
            ))}
          </div>
          <CodeBlock
            code={`Hindi:  मुझे @umm लगता है कि यह सही है।
Telugu: నాకు @uhh అనిపిస్తుంది ఇది సరైనది అని।`}
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-bold text-slate-950">Stutter Blocks & Pauses</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li>
              <code className="text-xs font-semibold text-blue-700">@stutter-block</code>: A silent articulatory block
              before a word or syllable with no audible sound. Place directly before the blocked word.
            </li>
            <li>
              <code className="text-xs font-semibold text-blue-700">@short-pause</code> /{" "}
              <code className="text-xs font-semibold text-blue-700">@long-pause</code>: Silence or thinking pauses that
              are not articulatory blocks.
            </li>
          </ul>
          <CodeBlock
            code={`Hindi (Stutter): मैं @stutter-block जाना चाहता हूँ।
Hindi (Pause):   मुझे नहीं पता @short-pause शायद कल आऊंगा।
Telugu (Pause):  నాకు తెలియదు @long-pause బహుశా రేపు వస్తాను।`}
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-bold text-slate-950">Unintelligible Speech & Isolated Paralinguistics</h3>
          <p className="text-sm text-slate-600">
            Use <code className="text-xs font-semibold text-blue-700">@unintelligible</code> once per unrecoverable stretch,
            regardless of duration. For vocal non-speech sounds that occur without accompanying words, use isolated
            paralinguistic tags:
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono">
            {[
              "@laughter",
              "@cry",
              "@hum",
              "@breathe",
              "@sniff",
              "@nose-blowing",
              "@cough",
              "@sneeze",
              "@throat-clearing",
              "@yawn",
              "@eating-sounds",
              "@snore",
              "@groan",
              "@sigh",
            ].map((t) => (
              <span key={t} className="rounded bg-slate-100 px-2 py-0.5 text-slate-800">
                {t}
              </span>
            ))}
          </div>
          <CodeBlock
            code={`Hindi (Unintelligible): मुझे लगता है @unintelligible कल आऊंगा।
Hindi (Paralinguistic): वह @cough करने लगा।
Telugu:                 అతను @cough చేయడం మొదలుపెట్టాడు।`}
          />
        </div>
      </div>

      {/* Detailed Tag Guidelines: Disfluency & Acoustic Spans */}
      <SectionHeading
        id="disfluency-spans"
        title="2. Disfluencies & Acoustic Spans"
        subtitle="Spans wrapped using -start and -end boundary tokens"
      />
      <div className="space-y-6 text-base leading-relaxed text-slate-700">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-950">Discourse Fillers</h3>
            <p className="mt-1 text-xs text-slate-600">
              Discourse words/phrases with no propositional content. The text stays inside the span and drops out in the
              normalized view.
            </p>
            <CodeBlock
              code={`Hindi:
मैं @filler-start मतलब @filler-end कल आऊंगा।

Telugu:
నేను @filler-start ఏమో @filler-end రేపు వస్తాను।`}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-950">Repetitions</h3>
            <p className="mt-1 text-xs text-slate-600">
              Tag <strong>only the discarded repeat(s)</strong>, not the final kept instance.
            </p>
            <CodeBlock
              code={`Hindi:
@repetition-start मैं @repetition-end मैं जा रहा हूँ।

Telugu:
@repetition-start నేను @repetition-end నేను వెళ్తున్నాను।`}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-950">Broken Words</h3>
            <p className="mt-1 text-xs text-slate-600">
              Cut off mid-articulation. Transcribe the audible phonetic fragment, not the intended full word.
            </p>
            <CodeBlock
              code={`Hindi:
मैं @broken-word-start ज @broken-word-end जाना चाहता हूँ।

Telugu:
నేను @broken-word-start వె @broken-word-end వెళ్ళాలి అనుకుంటున్నాను।`}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-950">Prolongations</h3>
            <p className="mt-1 text-xs text-slate-600">
              A sound elongated within a word. Transcribe the elongation orthographically in the span.
            </p>
            <CodeBlock
              code={`Hindi:
मुझे @prolongation-start बहुत @prolongation-end पसंद है।

Telugu:
నాకు @prolongation-start చాలా @prolongation-end ఇష్టం।`}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-bold text-slate-950">Speech Repairs & False Starts</h3>
          <p className="mt-1 text-sm text-slate-600">
            For self-repairs, wrap both the abandoned utterance (reparandum) and the correction (repair), separated by a
            hyphen <code className="text-xs font-semibold text-slate-900">-</code>. If the reparandum cannot be cleanly
            distinguished, omit the hyphen and wrap the repair. False starts wrap completely abandoned sentences.
          </p>
          <CodeBlock
            label="Speech repairs and false starts"
            code={`# Self-repair syntax: @repair-start <reparandum> - <repair> @repair-end
Hindi:  मैं @repair-start दिल्ली मतलब - मुंबई @repair-end गया।
Telugu: నేను @repair-start ఢిల్లీ కాదు - ముంబై @repair-end వెళ్ళాను।

# False start: abandoned syntactic path
Hindi:  @false-start-start हमें वहाँ जाना @false-start-end चलो घर पर ही रहते हैं।
Telugu: @false-start-start మనం అక్కడికి వెళ్దాం @false-start-end ఇలా ఇంట్లోనే ఉందాం।`}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-950">Span Paralinguistics</h3>
            <p className="mt-1 text-xs text-slate-600">
              Used when words are articulated <em>through</em> the vocal action (e.g., laughing while speaking).
            </p>
            <div className="mt-2 text-xs font-mono text-slate-500">
              @crying, @yelling, @laughing, @singing, @humming, @whistling, @whispering
            </div>
            <CodeBlock
              code={`Hindi:
वह @laughing-start बहुत मज़ेदार है @laughing-end बोला।`}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-950">Prosody & Pitch</h3>
            <p className="mt-1 text-xs text-slate-600">
              Wraps words carrying stress/emphasis, pitch contours, or changes in speech rate.
            </p>
            <div className="mt-2 text-xs font-mono text-slate-500">
              @emphasis, @raising-pitch, @falling-pitch, @fast-speech, @slow-speech, @high-pitch, @low-pitch
            </div>
            <CodeBlock
              code={`Hindi:
यह @emphasis-start सच में @emphasis-end अच्छा है।`}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-bold text-slate-950">Speaker Turns in Overlapping Speech</h3>
          <p className="mt-1 text-sm text-slate-600">
            Use <code className="text-xs font-semibold text-blue-700">&amp;s1-start ... &amp;s1-end</code> only when
            transcribing multi-speaker overlap in a continuous stream. Clean non-overlapping dialogues do not need span
            tags; use conventional line breaks with speaker labels instead.
          </p>
          <CodeBlock
            code={`Hindi:  &s1-start आप कैसे हैं? &s1-end &s2-start मैं ठीक हूँ। &s2-end
Telugu: &s1-start మీరు ఎలా ఉన్నారు? &s1-end &s2-start నేను బాగున్నాను। &s2-end`}
          />
        </div>
      </div>

      {/* Detailed Tag Guidelines: Lexical Bracket Tags */}
      <SectionHeading
        id="lexical-bracket-tags"
        title="3. Lexical Annotations (Bracket Syntax)"
        subtitle="Dual-surface tags providing verbatim pronunciation alongside normalized forms"
      />
      <div className="space-y-6 text-base leading-relaxed text-slate-700">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-950">Mispronunciations</h3>
            <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
              [verbatim](normalized)
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Carries no prefix symbol. Used whenever a speaker misarticulates a word that is otherwise standard vocabulary.
          </p>
          <CodeBlock
            code={`Hindi:  उसने [सक्रीन](स्क्रीन) तोड़ दी।
Telugu: అతను [స్క్రీను](స్క్రీన్) పగలగొట్టాడు।`}
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-950">Code-mixing</h3>
            <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
              !lang[verbatim](normalized)
            </span>
          </div>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            <p>
              Marks genuine code-mixing where words from another language retain their source phonology/morphology. If a
              foreign word has been phonetically or morphologically assimilated into the native lexicon, it is considered
              a loan word and left untagged.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>
                <strong>Verbatim:</strong> As spoken, transcribed in the surrounding conversation&apos;s script.
              </li>
              <li>
                <strong>Normalized:</strong> The canonical spelling rendered in the foreign word&apos;s standard native script.
              </li>
              <li>
                <strong>Agglutinative suffixes:</strong> If a native grammatical suffix attaches to a code-mixed stem
                (common in Dravidian languages like Telugu), include the suffix inside the verbatim tag.
              </li>
              <li>
                <strong>Generic fallback:</strong> If the foreign language code cannot be identified, use bare{" "}
                <code className="text-blue-700">![verbatim](normalized)</code>.
              </li>
            </ul>
          </div>
          <CodeBlock
            code={`Hindi:  क्या आप !en[लोकेशन](location) पर पहुँच गए?
Telugu: అతను !en[కార్](car)లో !en[టైమ్](time)కి వచ్చాడు।`}
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-950">Named Entities</h3>
            <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
              #TYPE[verbatim](normalized)
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Wraps named entity mentions. Verbatim stores how the name was articulated (including mispronunciations or
            accents), while normalized contains the canonical written entity name. Grammatical suffixes following an entity
            remain <em>outside</em> the tag.
          </p>
          <div className="mt-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              18 Standard Entity Types:
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5 font-mono text-[11px]">
              {[
                "PER", "GPE", "FAC", "LOC", "ITEM", "WOA", "EVENT", "SPORTS",
                "ORG", "BRAND", "HON", "DATETIME", "MONEY", "QUANT", "NUM",
                "LANG", "LAW", "ID"
              ].map((type) => (
                <span key={type} className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700">
                  {type}
                </span>
              ))}
            </div>
          </div>
          <CodeBlock
            code={`Hindi:  वे #GPE[हैदराबाद](हैदराबाद) में रहते हैं।
Telugu: అతను #ORG[ట్రిపుల్ ఐటీ](IIIT)లో #DATETIME[పంతొమ్మిదొందల తొంభై](1990)లో చేరాడు।`}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-950">Accent</h4>
              <span className="font-mono text-xs text-blue-700">$accent[...]</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Captures systemic regional pronunciation patterns rather than isolated slips.
            </p>
            <CodeBlock
              code={`Hindi:
उसने $[नईं](नहीं) कहा।

Telugu:
అతను $[గాదు](కాదు) అన్నాడు।`}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-950">Dialect</h4>
              <span className="font-mono text-xs text-blue-700">$$dialect[...]</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Used when variation introduces distinct lexical terms or grammar rather than phonology alone.
            </p>
            <CodeBlock
              code={`Hindi:
वह $$bambaiya[अपुन](मैं) जा रहा है।

Telugu:
అతను $$telangana[గినవడటం లేదు](వినబడటం లేదు) అన్నాడు।`}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-950">Domain Terms</h4>
              <span className="font-mono text-xs text-blue-700">!!domain[...]</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Specialized technical or medical vocabulary.
            </p>
            <CodeBlock
              code={`Hindi:
उसने !!medical[इंसुलिन](insulin) ली।

Telugu:
అతను !!medical[ఇన్సులిన్](insulin) తీసుకున్నాడు।`}
            />
          </div>
        </div>
      </div>

      {/* Tag Hierarchy & Composition Rules */}
      <SectionHeading
        id="hierarchy-and-nesting"
        title="4. Tag Hierarchy & Composition Rules"
        subtitle="Disambiguation rules when phenomena intersect"
      />
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        <p>
          To maintain strict parsing simplicity and prevent unmaintainable bracket spaghetti, RSML enforces precise
          nesting and conflict-resolution rules:
        </p>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
          <h3 className="font-bold text-slate-950">1. Nesting Constraints</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>
              <strong>No nested -start/-end tags:</strong> A <code className="text-xs font-semibold">@repetition-start</code> cannot
              contain another <code className="text-xs font-semibold">@repair-start</code>. Tags of the start/end family
              must be flat and sequential.
            </li>
            <li>
              <strong>Bracket tags inside start/end spans are valid:</strong> You can place bracket constructs
              (e.g., mispronunciation, code-mixing, named entities) inside a start/end span.
            </li>
            <li>
              <strong>Bracket tags never nest other tags:</strong> A bracket construct can only enclose flat text. You
              cannot put a code-mix tag inside a named entity bracket tag.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-950">2. Precedence Order (Multi-tag Resolution)</h3>
          <p className="mt-1 text-sm text-slate-600">
            If a single word or phrase meets the criteria for multiple bracket phenomena simultaneously, annotators and
            parsers must apply <strong>only the single highest-ranking tag</strong> based on this strict hierarchy:
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-lg bg-slate-900 p-4 text-xs font-mono text-white">
            <span className="font-bold text-emerald-400"># Named Entities</span>
            <span className="text-slate-500">&gt;</span>
            <span className="font-bold text-cyan-400">!! Domain Terms</span>
            <span className="text-slate-500">&gt;</span>
            <span className="font-bold text-blue-400">! Code-mixing</span>
            <span className="text-slate-500">&gt;</span>
            <span className="font-bold text-violet-400">$$ Dialect</span>
            <span className="text-slate-500">&gt;</span>
            <span className="font-bold text-amber-400">$ Accent</span>
            <span className="text-slate-500">&gt;</span>
            <span className="font-bold text-rose-400">[Mispronunciation]</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            For example: if a person mispronounces an English technical term in an Indian language conversation, you do not
            nest mispronunciation inside code-mixing. Precedence dictates domain/code-mixing priority, with the misarticulation
            preserved in the verbatim slot of that single tag.
          </p>
        </div>
      </div>

      {/* Practical Comprehensive Examples */}
      <SectionHeading
        id="examples"
        title="Comprehensive Examples"
        subtitle="Real-world conversational utterances annotated in RSML"
      />
      <div className="space-y-6 text-base leading-relaxed text-slate-700">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-950">Example 1: Disfluency, Code-mixing & Named Entities</h3>
            <span className="text-xs font-mono text-slate-500">Hindi Utterance</span>
          </div>
          <CodeBlock
            label="RSML Source"
            code={`@repetition-start मैं @repetition-end मैं @umm कल #ORG[गूगल](Google) के !en[ऑफिस](office) में @broken-word-start मी @broken-word-end मीटिंग के लिए गया था।`}
          />
          <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded bg-slate-50 p-2.5">
              <span className="font-semibold text-slate-900 block">Verbatim readout:</span>
              <span className="text-slate-700">मैं मैं कल गूगल के ऑफिस में मी मीटिंग के लिए गया था।</span>
            </div>
            <div className="rounded bg-slate-50 p-2.5">
              <span className="font-semibold text-slate-900 block">Normalized readout:</span>
              <span className="text-slate-700">मैं कल Google के office में मीटिंग के लिए गया था।</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-950">Example 2: Speech Repair & Dialect with Paralinguistics</h3>
            <span className="text-xs font-mono text-slate-500">Multilingual Conversational Turn</span>
          </div>
          <CodeBlock
            label="RSML Source"
            code={`&s1-start @false-start-start मुझे लगा था @false-start-end @repair-start शनिवार - रविवार @repair-end को $$bambaiya[अपुन](मैं) @laughing-start पक्का आएगा @laughing-end &s1-end &s2-start @laughter सही है! &s2-end`}
          />
          <p className="mt-2 text-xs text-slate-600">
            Notice how the false start and self-repair remain cleanly separated from the speaker overlap spans, while the
            paralinguistic laughter wraps both spoken words (<code className="text-blue-700">@laughing-start ... @laughing-end</code>)
            and standalone vocal reaction (<code className="text-blue-700">@laughter</code>).
          </p>
        </div>
      </div>

      {/* Developer Ecosystem & Libraries */}
      <SectionHeading
        id="ecosystem"
        title="Developer Tooling & Next Steps"
        subtitle="Libraries and tools to integrate RSML into your workflows"
      />
      <div className="grid gap-5 sm:grid-cols-3">
        <Link
          href="/rsml-npm"
          className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
        >
          <Code2 className="h-6 w-6 text-blue-700" />
          <h3 className="mt-3 text-lg font-bold text-slate-950">RSML npm</h3>
          <p className="mt-1 flex-1 text-xs text-slate-600">
            TypeScript parser, validator, and tokenizer for extracting verbatim/normalized text streams in browser and Node.js.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
            View package <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        <Link
          href="/rsml-py"
          className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
        >
          <Layers className="h-6 w-6 text-blue-700" />
          <h3 className="mt-3 text-lg font-bold text-slate-950">RSML Python</h3>
          <p className="mt-1 flex-1 text-xs text-slate-600">
            Python tools for dataset processing, ASR evaluation pipelines, aligner integration, and batch normalization.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
            View library <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </Link>

        <a
          href={SITE.editorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
        >
          <ExternalLink className="h-6 w-6 text-blue-700" />
          <h3 className="mt-3 text-lg font-bold text-slate-950">Online RSML Editor</h3>
          <p className="mt-1 flex-1 text-xs text-slate-600">
            Interactive visual annotation editor with live syntax highlighting, waveform playback, and dual-reading preview.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
            Launch Editor <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>

      {/* Footer navigation */}
      <footer className="mt-16 flex flex-wrap items-center justify-between border-t border-slate-200 pt-8 text-sm text-slate-600">
        <div>
          Part of the <Link href="/" className="font-medium text-slate-900 hover:text-blue-700">Rich Speech</Link> open-source project.
        </div>
        <div className="flex gap-4">
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            GitHub
          </a>
          <a href={SITE.editorUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            Editor
          </a>
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
        </div>
      </footer>
    </article>
  );
}
