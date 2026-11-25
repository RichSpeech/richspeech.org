import type { Metadata } from "next";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "RSML (Py)",
  description: "Python library for reading, writing, and manipulating RSML.",
  alternates: { canonical: "/rsml-py" },
};

export default function Page() {
  return (
    <PageShell
      title="RSML (Py)"
      summary="Python library for reading, writing, and manipulating RSML transcripts. This package is currently under development and coming soon."
    >
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
        <span className="font-semibold">Status: Coming Soon.</span> The Python implementation will provide dataset parsing,
        verbatim/normalized extraction, alignment utilities, and ASR benchmark integrations.
      </div>
    </PageShell>
  );
}
