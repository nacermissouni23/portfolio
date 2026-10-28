import type { Metadata } from "next";
import { type LucideIcon, Bot, Calculator, Code2, Database, FileText, MessageSquareText, Search, Smartphone, TrendingUp, Users } from "lucide-react";
import { Crumbs } from "@/components/site/Bits";
import { ProjectGrid } from "@/components/site/ProjectCard";
import { aiProjects } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  "almouhasib": Calculator,
  "snoc-complaints": MessageSquareText,
  "hrms": Users,
  "codivizer": Code2,
  "rag-optimization": Search,
  "top-applicant": FileText,
  "is-viral": TrendingUp,
  "mobai": Smartphone,
};

export const metadata: Metadata = {
  title: "AI",
  description: "Agents and private AI systems that take real work off people's plates.",
};

export default function WorkAIPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[127px]">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: "AI" }]} />
      <h1 className="mt-10 text-[72px] font-extrabold leading-none tracking-tight title-sun sm:text-[80px]">
        ai.
      </h1>
      <p className="mt-9 max-w-[760px] text-[18px] leading-[30px] sm:text-[20px]">
        Agentic systems, LLM-powered apps and multi-agent workflows that turn complex problems into working software.
      </p>
      <div className="mt-12">
        <ProjectGrid projects={aiProjects} base="/work/ai" icons={icons} fallback={Bot} />
      </div>
    </main>
  );
}
