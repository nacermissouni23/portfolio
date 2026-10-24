import Link from "next/link";
import { ArrowRight, Activity, BarChart3, Briefcase, Cloud, DollarSign, GraduationCap, LineChart, Target, TrendingUp, UserMinus, Zap } from "lucide-react";
import { Crumbs, Eyebrow, Pill, cardCls } from "@/components/site/Bits";
import { dataScienceProjects } from "@/lib/data";

const icons: Record<string, any> = {
  "appliance-classification": Zap,
  "clv": DollarSign,
  "customer-retention": UserMinus,
  "iniesta": Activity,
  "is-viral": TrendingUp,
  "pm25-air-quality": Cloud,
  "smart-parking": BarChart3,
  "top-applicant": Briefcase,
  "tsac-sales-forecasting": LineChart,
  "uplift-modeling": Target,
  "adaptive-exam-active-learning": GraduationCap,
};

export default function DataSciencePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[127px]">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: "Data Science" }]} />
      <h1 className="mt-10 text-[72px] font-extrabold leading-none tracking-tight text-sun sm:text-[80px]">
        data science.
      </h1>
      <p className="mt-9 max-w-[760px] text-[18px] leading-[30px] sm:text-[20px]">
        Predictive models, forecasting and analysis that turn raw data into decisions you can act on.
      </p>
      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
        {dataScienceProjects.map((p) => {
          const Icon = icons[p.slug] ?? BarChart3;
          return (
            <Link
              key={p.slug}
              href={`/work/data-science/${p.slug}`}
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
