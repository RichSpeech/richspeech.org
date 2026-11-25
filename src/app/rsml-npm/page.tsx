import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "RSML npm Documentation",
  description:
    "Developer guide and API reference for the rsml npm package (RSMLAnnotator). Installation, React + TypeScript integration, options, and setup notes.",
  alternates: { canonical: "/rsml-npm" },
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
    <div className="mt-12 mb-4 border-b border-slate-200 pb-3">
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

export default function RSMLNpmPage() {
  return (
    <article className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Header */}
      <header className="border-b border-slate-200 pb-10">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
          <span>JavaScript & TypeScript Toolkit</span>
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          <code>rsml</code> npm Package
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-slate-700">
          Client-side annotation UI widget and syntax engine for Rich Speech Markup Language. It connects a source
          textarea to a live preview pane, provides tag auto-completion and syntax highlighting, and supports
          switching between verbatim and normalized views.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={SITE.editorUrl} external>
            Live Demo in Editor
          </Button>
          <Button href="/rsml" variant="outline">
            RSML Syntax Specs
          </Button>
          <Button href="https://www.npmjs.com/package/rsml" variant="outline" external>
            View on npm
          </Button>
        </div>
      </header>

      {/* What it does & When to use it */}
      <SectionHeading
        id="overview"
        title="What RSML npm does"
        subtitle="When to reach for the package in your app"
      />
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        <p>
          The published <code>rsml</code> package provides <code>RSMLAnnotator</code>, a ready-to-use editor widget for
          browsers. When attached to a <code>&lt;textarea&gt;</code> and a preview container, it handles:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>
            <strong>Real-time parsing & rendering:</strong> Transforms raw RSML tokens (like <code>@umm</code>,{" "}
            <code>#ORG[गूगल](Google)</code>, and <code>!en[office](office)</code>) into styled interactive badges.
          </li>
          <li>
            <strong>Dual-mode preview:</strong> Lets annotators toggle between <em>Normalized</em> and <em>Verbatim</em> views,
            with an optional switch to hide disfluencies.
          </li>
          <li>
            <strong>Smart editor enhancements:</strong> Automatically upgrades the textarea with CodeMirror 6 when
            accessible for inline tag syntax highlighting and trigger-based auto-complete (<code>@</code>, <code>#</code>,{" "}
            <code>!</code>, <code>$</code>, <code>$$</code>, <code>!!</code>).
          </li>
          <li>
            <strong>Source jumping:</strong> Double-clicking any rendered token in the output scrolls and focuses the caret
            to the exact tag span in the editor.
          </li>
        </ul>
        <p className="text-sm text-slate-600">
          Use it whenever you are building an annotation portal, a transcription verification UI, or reviewing
          multilingual speech dataset labels in React, Vue, or vanilla web apps.
        </p>
      </div>

      {/* Installation */}
      <SectionHeading
        id="installation"
        title="Installation"
        subtitle="Install via your preferred package manager"
      />
      <div className="space-y-3">
        <CodeBlock label="Terminal" code={`npm install rsml`} />
        <p className="text-xs text-slate-500">
          Also works with yarn (<code>yarn add rsml</code>) or pnpm (<code>pnpm add rsml</code>).
        </p>
      </div>

      {/* Minimal Vanilla Quick-Start */}
      <SectionHeading
        id="quick-start"
        title="Minimal Quick-Start"
        subtitle="Vanilla JavaScript / HTML integration"
      />
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        <p>
          All you need are two DOM nodes: one textarea for typing and one container for rendered output.
        </p>
        <CodeBlock
          label="index.html"
          code={`<textarea id="editor" rows="8" placeholder="Type @ for tags, # for entities..."></textarea>
<div id="preview" style="min-height: 120px; border: 1px solid #ddd; padding: 12px;"></div>

<script type="module">
  import RSMLAnnotator from "rsml";

  const annotator = new RSMLAnnotator({
    textarea: "#editor",
    output: "#preview",
    demoText: true,
  });
</script>`}
        />
      </div>

      {/* React + TypeScript Example */}
      <SectionHeading
        id="react-typescript"
        title="React + TypeScript Example"
        subtitle="Complete, copy-pasteable component with clean lifecycle cleanup"
      />
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        <p>
          In React (Next.js, Vite, or Create React App), wrap the initialization inside a <code>useEffect</code>. Because
          RSML requires browser DOM APIs, run it on the client and always clean up with <code>annotator.destroy()</code>{" "}
          on component unmount.
        </p>

        <CodeBlock
          label="RsmlEditor.tsx"
          code={`"use client";

import React, { useEffect, useRef } from "react";
// rsml publishes ESM default export: RSMLAnnotator
import RSMLAnnotator from "rsml";

interface RsmlEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export function RsmlEditor({ initialValue, onChange }: RsmlEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const annotatorRef = useRef<any>(null);

  useEffect(() => {
    // Ensure both DOM nodes exist and prevent duplicate initialization (e.g. React StrictMode)
    if (!textareaRef.current || !outputRef.current || annotatorRef.current) {
      return;
    }

    const annotator = new RSMLAnnotator({
      textarea: textareaRef.current,
      output: outputRef.current,
      demoText: false,
    });

    annotatorRef.current = annotator;

    if (initialValue) {
      annotator.setValue(initialValue);
    }

    // Optional listener to bubble text changes back to React state
    const handleInput = () => {
      onChange?.(annotator.getValue());
    };
    textareaRef.current.addEventListener("input", handleInput);

    return () => {
      textareaRef.current?.removeEventListener("input", handleInput);
      annotator.destroy();
      annotatorRef.current = null;
    };
  }, [initialValue, onChange]);

  return (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", width: "100%" }}>
      <div style={{ flex: 1, minWidth: "300px" }}>
        <label
          htmlFor="rsml-source"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.875rem" }}
        >
          RSML Source Editor
        </label>
        <textarea
          id="rsml-source"
          ref={textareaRef}
          rows={10}
          placeholder="Type @ for tags, # for entities, ! for languages..."
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #cbd5e1",
            borderRadius: "0.5rem",
            fontFamily: "monospace",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        />
      </div>

      <div style={{ flex: 1, minWidth: "300px" }}>
        <label
          htmlFor="rsml-rendered"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.875rem" }}
        >
          Live Preview
        </label>
        <div
          id="rsml-rendered"
          ref={outputRef}
          style={{
            minHeight: "220px",
            maxHeight: "350px",
            overflowY: "auto",
            padding: "0.75rem",
            background: "#f8fafc",
            border: "1px solid #cbd5e1",
            borderRadius: "0.5rem",
          }}
        />
      </div>
    </div>
  );
}`}
        />
      </div>

      {/* API Reference */}
      <SectionHeading
        id="api-reference"
        title="API Reference"
        subtitle="Constructor options, instance methods, and defaults"
      />
      <div className="space-y-6 text-base leading-relaxed text-slate-700">
        <div>
          <h3 className="text-lg font-bold text-slate-950">
            <code>new RSMLAnnotator(options)</code>
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Initializes the annotator instance, injects core chip styles into the document head, and binds listeners.
          </p>

          <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-900">
                <tr>
                  <th className="px-4 py-2.5">Option</th>
                  <th className="px-4 py-2.5">Type</th>
                  <th className="px-4 py-2.5">Default</th>
                  <th className="px-4 py-2.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-700 text-xs">
                <tr>
                  <td className="px-4 py-2.5 font-mono font-semibold text-slate-900">textarea*</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">string | HTMLElement</td>
                  <td className="px-4 py-2.5 text-slate-400">—</td>
                  <td className="px-4 py-2.5">Target textarea selector or element node. Required.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-semibold text-slate-900">output*</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">string | HTMLElement</td>
                  <td className="px-4 py-2.5 text-slate-400">—</td>
                  <td className="px-4 py-2.5">Target preview container selector or element node. Required.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-slate-900">demoText</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">boolean</td>
                  <td className="px-4 py-2.5 font-mono">false</td>
                  <td className="px-4 py-2.5">Populate the textarea with a sample Hindi utterance on mount.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-slate-900">disableCodeMirror</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">boolean</td>
                  <td className="px-4 py-2.5 font-mono">false</td>
                  <td className="px-4 py-2.5">
                    Skip lazy loading CodeMirror from CDN. Keeps the native plain textarea.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-slate-900">hesitations</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">string[]</td>
                  <td className="px-4 py-2.5 font-mono text-[11px]">[@umm, @uhh, @hmm, ...]</td>
                  <td className="px-4 py-2.5">Array of isolated hesitation tokens.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-slate-900">disfluencySpans</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">string[]</td>
                  <td className="px-4 py-2.5 font-mono text-[11px]">[filler, repetition, repair, ...]</td>
                  <td className="px-4 py-2.5">Span base names (without @ or -start/-end suffixes).</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-slate-900">entities</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">Record&lt;string, string&gt;</td>
                  <td className="px-4 py-2.5 text-[11px]">20 standard types (PER, GPE, ORG, ...)</td>
                  <td className="px-4 py-2.5">Entity codes mapped to display labels for #TYPE markup.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-slate-900">languages</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">Record&lt;string, string&gt;</td>
                  <td className="px-4 py-2.5 text-[11px]">23 Indian & English codes (en, hi, te, ...)</td>
                  <td className="px-4 py-2.5">Language codes mapped to names for !lang markup.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-slate-900">dialects</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">Record&lt;string, string&gt;</td>
                  <td className="px-4 py-2.5 font-mono">{}</td>
                  <td className="px-4 py-2.5">Custom dialect codes mapped to names for $$dialect markup.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-slate-900">domains</td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">Record&lt;string, string&gt;</td>
                  <td className="px-4 py-2.5 font-mono">{}</td>
                  <td className="px-4 py-2.5">Custom domain codes mapped to names for !!domain markup.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-950">Instance Methods</h3>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <code className="font-mono text-sm font-bold text-blue-700">annotator.getValue(): string</code>
              <p className="mt-1 text-xs text-slate-600">Returns the current raw RSML text from the editor.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <code className="font-mono text-sm font-bold text-blue-700">annotator.setValue(text: string): void</code>
              <p className="mt-1 text-xs text-slate-600">
                Updates editor content, dispatches changes to CodeMirror if active, and triggers a re-render.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <code className="font-mono text-sm font-bold text-blue-700">
                annotator.add(category, value, label?): boolean
              </code>
              <p className="mt-1 text-xs text-slate-600">
                Dynamically registers a new tag or code without re-mounting. Returns <code>true</code> if added.
              </p>
              <CodeBlock
                code={`annotator.add("hesitations", "@meh");
annotator.add("entities", "PRODUCT", "Product Name");
annotator.add("dialects", "bambaiya", "Bambaiya Hindi");`}
              />
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <code className="font-mono text-sm font-bold text-blue-700">annotator.remove(category, value): boolean</code>
              <p className="mt-1 text-xs text-slate-600">Unregisters a tag or vocabulary entry dynamically.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <code className="font-mono text-sm font-bold text-blue-700">annotator.destroy(): void</code>
              <p className="mt-1 text-xs text-slate-600">
                Removes input and double-click listeners, cleans up CodeMirror instance, and tears down status bars.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Requirements & Pitfalls */}
      <SectionHeading
        id="pitfalls"
        title="Setup Notes & Common Pitfalls"
        subtitle="Key details to keep in mind when embedding in production"
      />
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 text-sm text-amber-950">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
            1. SSR & Framework Hydration (Next.js / Nuxt)
          </div>
          <p className="mt-2 text-xs leading-relaxed text-amber-900">
            <code>rsml.js</code> relies on browser globals (<code>window</code>, <code>document</code>,{" "}
            <code>DOMParser</code>). In Next.js App Router, ensure the component has the <code>&quot;use client&quot;</code>{" "}
            directive, or dynamically import the component with <code>ssr: false</code>.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
          <div className="font-bold text-slate-950">2. CodeMirror CDN vs. Strict CSP Environments</div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            By default, <code>_bootCM()</code> dynamically imports CodeMirror modules from <code>https://esm.sh</code>.
            If your app operates behind a strict Content Security Policy (CSP) or in offline environments, pass{" "}
            <code className="font-mono text-blue-700">disableCodeMirror: true</code>. The annotator will gracefully use
            the native textarea while keeping live preview and validation completely functional.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
          <div className="font-bold text-slate-950">3. Tooltip Activation (Optional Bootstrap)</div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Hover tooltips on entity chips check for <code>window.bootstrap.Tooltip</code>. If Bootstrap JS is present on
            your page, tooltips initialize automatically; if not, chips display standard HTML titles without throwing
            any errors.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
          <div className="font-bold text-slate-950">4. Preventing Duplicate Instances in React StrictMode</div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            In React 18+ development mode, effects mount twice. Always store the instance in a ref (<code>annotatorRef.current</code>),
            check that an instance does not already exist before calling <code>new RSMLAnnotator()</code>, and call{" "}
            <code>annotator.destroy()</code> in the effect cleanup.
          </p>
        </div>
      </div>

      {/* Footer navigation */}
      <footer className="mt-16 flex flex-wrap items-center justify-between border-t border-slate-200 pt-8 text-sm text-slate-600">
        <div>
          Part of the{" "}
          <Link href="/" className="font-medium text-slate-900 hover:text-blue-700">
            Rich Speech
          </Link>{" "}
          open-source project.
        </div>
        <div className="flex gap-4">
          <Link href="/rsml" className="hover:text-blue-700">
            RSML Specs
          </Link>
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            GitHub
          </a>
          <a href={SITE.editorUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            Editor
          </a>
        </div>
      </footer>
    </article>
  );
}
