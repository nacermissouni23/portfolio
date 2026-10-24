import { Megaphone, MessageSquareText, Users, Calculator } from "lucide-react";
import { Crumbs } from "@/components/site/Bits";
import { aiProjects } from "@/lib/data";
const diagramSlugs = new Set([
  "almouhasib",
  "snoc-complaints",
  "hrms",
  "codivizer",
  "rag-optimization",
  "top-applicant",
  "is-viral",
  "mobai",
]);

const icons: Record<string, any> = {
  "almouhasib": Calculator,
  "snoc-complaints": MessageSquareText,
  "hrms": Users,
};

export function generateStaticParams() {
  return aiProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = aiProjects.find((x) => x.slug === slug);

  if (!p) {
    return (
      <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[140px]">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: "AI", to: "/work/ai" }, { label: "Project" }]} />
        <h1 className="mt-8 text-[40px] font-extrabold">Project not found</h1>
      </main>
    );
  }

  const Icon = icons[slug] ?? Megaphone;
  const hasDiagram = diagramSlugs.has(slug);

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[140px]">
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Work", to: "/work" },
          { label: "AI", to: "/work/ai" },
          { label: p.title },
        ]}
      />

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-olive bg-[#F6EE7C]">
          <Icon className="h-12 w-12" strokeWidth={2} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-sun px-3 py-1 text-xs font-semibold text-olive">
              {p.company}
            </span>
            <span className="text-[11.5px] font-medium uppercase tracking-wide text-amber">
              {p.eyebrow}
            </span>
          </div>
          <h1 className="mt-2 text-[40px] font-extrabold leading-tight tracking-tight sm:text-[52px]">
            {p.title}
          </h1>
        </div>
      </div>

      <h2 className="mt-8 text-[28px] font-bold">{p.blurb}</h2>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_330px] md:gap-12">
        <p className="text-[17px] leading-[29px] text-ink/70">
          {p.blurb}
        </p>
        <aside className="border-ink/10 md:border-l md:pl-6">
          <div className="flex items-center gap-4">
            {p.logo ? (
              <img src={p.logo} alt={p.company} className="h-10 w-10 object-contain" />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-full bg-olive text-[13px] font-bold text-sun">
                {p.company === "Personal" ? "P" : p.company.slice(0, 2).toUpperCase()}
              </span>
            )}
            <span className="text-[17px] font-semibold text-olive">{p.company}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t: string) => (
              <span key={t} className="rounded-full border border-olive px-3 py-1 text-xs">{t}</span>
            ))}
          </div>
        </aside>
      </div>

      {hasDiagram && (
        <section className="mt-14">
          <h2 className="text-[34px] font-extrabold tracking-tight">the workflow.</h2>
          <div className="mt-8 rounded-[10px] border-[1.5px] border-olive bg-paper p-5 sm:p-8">
            <img
              src={`/diagrams/ai-${slug}.svg`}
              alt={`${p.title} workflow diagram`}
              className="w-full"
              loading="lazy"
            />
          </div>
        </section>
      )}
    </main>
  );
}
