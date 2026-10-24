import Link from "next/link";
import { ArrowRight, Bot, Calculator, Code2, Database, FileText, MessageSquareText, Search, Smartphone, TrendingUp, Users } from "lucide-react";
import { Crumbs, Eyebrow, Pill, cardCls } from "@/components/site/Bits";
import { aiProjects } from "@/lib/data";

const icons: Record<string, any> = {
  "almouhasib": Calculator,
  "snoc-complaints": MessageSquareText,
  "hrms": Users,
  "codivizer": Code2,
  "rag-optimization": Search,
  "top-applicant": FileText,
  "is-viral": TrendingUp,
  "mobai": Smartphone,
};

export default function WorkAIPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[127px]">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: "AI" }]} />
      <h1 className="mt-10 text-[72px] font-extrabold leading-none tracking-tight text-sun sm:text-[80px]">
        ai.
      </h1>
      <p className="mt-9 max-w-[760px] text-[18px] leading-[30px] sm:text-[20px]">
        Agentic systems, LLM-powered apps and multi-agent workflows that turn complex problems into working software.
      </p>
      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
        {aiProjects.map((p) => {
          const Icon = icons[p.slug] ?? Bot;
          return (
            <Link
              key={p.slug}
              href={`/work/ai/${p.slug}`}
              className={`${cardCls} group flex flex-col p-6 transition-transform hover:-translate-y-1`}
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-olive bg-[#F6EE7C]">
                <Icon className="h-7 w-7" />
              </span>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-wide text-amber">
                {p.eyebrow}
              </p>
              <h2 className="mt-2 text-[18px] font-bold">{p.title}</h2>
              <p className="mt-1 text-[13px] text-ink/70">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t: string) => (
                  <Pill key={t} className="px-[14px] py-[6px]">{t}</Pill>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-2 border-t border-ink/10 pt-4 text-[11px] font-semibold text-olive">
                {p.logo ? (
                  <img src={p.logo} alt={p.company} className="h-5 w-5 object-contain" />
                ) : (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-olive text-[9px] text-sun">
                    {p.company === "Personal" ? "P" : p.company.slice(0, 2).toUpperCase()}
                  </span>
                )}
                {p.company}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
