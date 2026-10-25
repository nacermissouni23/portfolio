import { Building2, Briefcase, Car, Globe, Heart, Home, Shirt, Store, Utensils, Wrench } from "lucide-react";
import { ProjectDetail, ProjectNotFound } from "@/components/site/ProjectDetail";
import { webDevProjects } from "@/lib/data";

const icons: Record<string, any> = {
  "al-djisr": Building2,
  "auto-manager": Car,
  "chifa": Utensils,
  "clinic": Heart,
  "maskulino": Shirt,
  "profile-agency": Briefcase,
  "real-estate": Home,
  "saint-raphael": Building2,
  "techmotordz": Wrench,
};

export function generateStaticParams() {
  return webDevProjects.map((p) => ({ slug: p.slug }));
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
      workflowSrc={`/diagrams/web-dev-${slug}.svg`}
    />
  );
}
