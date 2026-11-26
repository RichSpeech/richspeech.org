"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { GithubIcon } from "@/components/ui/icons";
import { DOCS_LINKS, NAV_ITEMS, SITE, type NavItem, type NavLink } from "@/lib/constants";

const LINK = "rounded-md px-1 py-1 text-[15px] font-medium text-slate-800 hover:text-blue-700";

function Anchor({ link, className, onClick }: { link: NavLink; className?: string; onClick?: () => void }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        <span className="inline-flex items-center gap-1.5">
          {link.label}
          {!link.hideExternalIcon && <ExternalLink size={14} aria-hidden="true" />}
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  );
}

function Dropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <button
        type="button"
        className={`${LINK} inline-flex items-center gap-1`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <ChevronDown size={16} aria-hidden="true" className={open ? "rotate-180 transition" : "transition"} />
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-20 mt-2 min-w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
          {item.children?.map((c) => (
            <li key={c.href}>
              <Anchor
                link={c}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 hover:text-blue-700"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <Dropdown item={item} />
              ) : (
                <Anchor link={item} className={`${LINK} ${item.href === "/" ? "text-blue-700" : ""}`} />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rich Speech on GitHub"
            className="rounded-md p-1 text-slate-900 hover:text-blue-700"
          >
            <GithubIcon width={28} height={28} />
          </a>
          <Link
            href={DOCS_LINKS.rsml}
            className="hidden rounded-lg bg-blue-700 px-5 py-2.5 text-[15px] font-medium text-white hover:bg-blue-800 sm:inline-block"
          >
            Get Started
          </Link>
          <button
            type="button"
            className="rounded-md p-1.5 text-slate-900 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <p className="px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.label}
                    </p>
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Anchor link={c} onClick={close} className="block px-2 py-2 text-slate-800" />
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Anchor link={item} onClick={close} className="block px-2 py-2 font-medium text-slate-800" />
                )}
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={DOCS_LINKS.rsml}
                onClick={close}
                className="block rounded-lg bg-blue-700 px-5 py-3 text-center font-medium text-white sm:hidden"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
