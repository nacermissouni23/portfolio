import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { ProjectDetail, ProjectNotFound } from "@/components/site/ProjectDetail";
import { dataScienceProjects } from "@/lib/data";

export function generateStaticParams() {
  return dataScienceProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = dataScienceProjects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.blurb } : { title: "Project not found" };
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
    />
  );
}
