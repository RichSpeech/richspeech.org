import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { GithubIcon } from "@/components/ui/icons";
import { DOCS_LINKS, SITE } from "@/lib/constants";

const LINKS = [
  { label: "Documentation", href: DOCS_LINKS.rsml, internal: true },
  { label: "Rich Speech Editor", href: SITE.editorUrl },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-sm text-slate-500">© 2026 Rich Speech. Open source.</p>
          <p className="text-sm text-slate-500">
            Contact:{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="break-all text-blue-700 hover:underline">
              {SITE.contactEmail}
            </a>
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px] text-slate-700">
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.internal ? (
                <Link href={l.href} className="inline-flex items-center gap-1.5 hover:text-blue-700">
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-700"
                >
                  {l.label}
                  <ExternalLink size={14} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </li>
          ))}
          <li>
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium hover:text-blue-700"
            >
              <GithubIcon width={22} height={22} />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
