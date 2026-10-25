import { BarChart3 } from "lucide-react";
import { ProjectDetail, ProjectNotFound } from "@/components/site/ProjectDetail";
import { dataScienceProjects } from "@/lib/data";

export function generateStaticParams() {
  return dataScienceProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = dataScienceProjects.find((x) => x.slug === slug);

  if (!p) {
    return <ProjectNotFound category="Data Science" categoryHref="/work/data-science" />;
  }

  return (
    <ProjectDetail
      project={p}
      category="Data Science"
      categoryHref="/work/data-science"
      Icon={BarChart3}
      workflowSrc={`/diagrams/data-science-${slug}.svg`}
    />
  );
}
