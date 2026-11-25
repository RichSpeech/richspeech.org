export const SITE = {
  name: "Rich Speech",
  url: "https://richspeech.org",
  docsUrl: "https://docs.richspeech.org",
  editorUrl: "https://editor.richspeech.org",
  githubUrl: "https://github.com/richspeech",
  description:
    "Rich Speech is an open-source initiative for Rich Speech Processing, which is an emerging direction of speech processing with rich transcription, representations, and evaluation across all down-stream applications like ASR, TTS, Speech Translation, Speech LLMs, etc.",
} as const;

export type IconName = "file-text" | "code" | "package" | "layers";

export interface EcosystemItem {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  comingSoon?: boolean;
}

export const ECOSYSTEM: readonly EcosystemItem[] = [
  {
    title: "RSML",
    description: "Rich Speech Markup Language (RSML) is a rich transcription schema and file format for speech.",
    href: "/rsml",
    icon: "file-text",
  },
  {
    title: "RSML npm",
    description: "A JavaScript library with a widget for editing RSML in web apps.",
    href: "/rsml-npm",
    icon: "code",
  },
  {
    title: "PreSpeech",
    description: "A Python library for speech preprocessing.",
    href: "/prespeech",
    icon: "package",
    comingSoon: true,
  },
  {
    title: "RSML (Py)",
    description: "A Python library for reading and editing RSML transcripts along with evaluation metrics.",
    href: "/rsml-py",
    icon: "layers",
    comingSoon: true,
  },
];

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  hideExternalIcon?: boolean;
}

export interface NavItem extends NavLink {
  children?: readonly NavLink[];
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "RSML", href: "/rsml", children: [{ label: "RSML", href: "/rsml" }] },
  {
    label: "Libraries",
    href: "#",
    children: [
      { label: "RSML npm", href: "/rsml-npm" },
      { label: "PreSpeech Python", href: "/prespeech-py" },
      { label: "RSML Python", href: "/rsml-py" },
    ],
  },
  { label: "Editor", href: SITE.editorUrl, external: true, hideExternalIcon: true },
  { label: "Documentation", href: "/rsml" },
];
