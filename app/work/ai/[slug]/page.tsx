import { Calculator, Code2, FileText, MessageSquareText, Search, Smartphone, TrendingUp, Users } from "lucide-react";
import { ProjectDetail, ProjectNotFound } from "@/components/site/ProjectDetail";
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

  if (!p) return <ProjectNotFound category="AI" categoryHref="/work/ai" />;

  const Icon = icons[slug] ?? MessageSquareText;

  return (
    <ProjectDetail
      project={p}
      category="AI"
      categoryHref="/work/ai"
      Icon={Icon}
      workflowSrc={`/diagrams/ai-${slug}.svg`}
    />
  );
}
