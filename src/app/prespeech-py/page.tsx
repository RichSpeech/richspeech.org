import type { Metadata } from "next";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "PreSpeech (Py)",
  description: "Python library for preprocessing and preparing speech data.",
  alternates: { canonical: "/prespeech-py" },
};

export default function Page() {
  return (
    <PageShell
      title="PreSpeech (Py)"
      summary="Python library for preprocessing and preparing speech data. This package is currently under development and coming soon."
    >
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
        <span className="font-semibold">Status: Coming Soon.</span> We are finalizing the initial release for audio
        segmentation, normalization, and speech dataset pipelines.
      </div>
    </PageShell>
  );
}
