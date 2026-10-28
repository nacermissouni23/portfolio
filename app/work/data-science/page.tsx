import type { Metadata } from "next";
import { type LucideIcon, Activity, BarChart3, Briefcase, Cloud, DollarSign, GraduationCap, LineChart, Target, TrendingUp, UserMinus, Zap } from "lucide-react";
import { Crumbs } from "@/components/site/Bits";
import { ProjectGrid } from "@/components/site/ProjectCard";
import { dataScienceProjects } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
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

export const metadata: Metadata = {
  title: "Data Science",
  description: "Models that answer business questions: who will leave, who to call, what will sell.",
};

export default function DataSciencePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[127px]">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: "Data Science" }]} />
      <h1 className="mt-10 text-[72px] font-extrabold leading-none tracking-tight title-sun sm:text-[80px]">
        data science.
      </h1>
      <p className="mt-9 max-w-[760px] text-[18px] leading-[30px] sm:text-[20px]">
        Predictive models, forecasting and analysis that turn raw data into decisions you can act on.
      </p>
      <div className="mt-12">
        <ProjectGrid projects={dataScienceProjects} base="/work/data-science" icons={icons} fallback={BarChart3} />
      </div>
    </main>
  );
}
