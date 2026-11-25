import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EcosystemIcon } from "@/components/ui/icons";
import { ECOSYSTEM } from "@/lib/constants";

export function EcosystemCards() {
  return (
    <section aria-label="Ecosystem" className="mx-auto w-full max-w-7xl px-5 sm:px-8">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ECOSYSTEM.map((item) => (
          <li key={item.href} className="flex">
            <Link
              href={item.href}
              className="group flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <EcosystemIcon name={item.icon} size={36} strokeWidth={1.5} className="text-slate-800" aria-hidden="true" />
                {item.comingSoon && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                    Coming Soon
                  </span>
                )}
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{item.title}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{item.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-blue-700">
                {item.comingSoon ? "Coming soon" : "Learn more"}
                <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
