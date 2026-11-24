import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  summary: string;
  children?: React.ReactNode;
}

export function PageShell({ title, summary, children }: Props) {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-slate-700">{summary}</p>
      {children}
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/rsml">
          Read the documentation
        </Button>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </section>
  );
}
