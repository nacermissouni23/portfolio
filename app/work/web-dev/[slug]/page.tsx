import type { Metadata } from "next";
import { Building2, Briefcase, Car, Globe, Heart, Home, Shirt, Store, Utensils, Wrench } from "lucide-react";
import { ProjectDetail, ProjectNotFound } from "@/components/site/ProjectDetail";
import { webDevProjects } from "@/lib/data";

const icons: Record<string, any> = {
  "al-djisr": Building2,
  "auto-manager": Car,
  "chifa": Utensils,
  "clinic": Heart,
  "maskulino": Shirt,
  "real-estate": Home,
  "techmotordz": Wrench,
};

export function generateStaticParams() {
  return webDevProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = webDevProjects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.blurb } : { title: "Project not found" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = webDevProjects.find((x) => x.slug === slug);

  if (!p) {
    return <ProjectNotFound category="Web Dev" categoryHref="/work/web-dev" />;
  }

  const Icon = icons[slug] ?? Globe;

  return (
    <ProjectDetail
      project={p}
      category="Web Dev"
      categoryHref="/work/web-dev"
      Icon={Icon}
    />
  );
}
