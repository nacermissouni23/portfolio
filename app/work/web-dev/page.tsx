import type { Metadata } from "next";
import { type LucideIcon, Building2, Briefcase, Car, Globe, Heart, Home, Shirt, Store, Utensils, Wrench } from "lucide-react";
import { Crumbs } from "@/components/site/Bits";
import { ProjectGrid } from "@/components/site/ProjectCard";
import { webDevProjects } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  "al-djisr": Building2,
  "auto-manager": Car,
  "chifa": Utensils,
  "clinic": Heart,
  "maskulino": Shirt,
  "real-estate": Home,
  "techmotordz": Wrench,
};

export const metadata: Metadata = {
  title: "Web Dev",
  description: "Websites and stores built to bring in customers.",
};

export default function WebDevPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[127px]">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: "Web Dev" }]} />
      <h1 className="mt-10 text-[72px] font-extrabold leading-none tracking-tight title-sun sm:text-[80px]">
        web dev.
      </h1>
      <p className="mt-9 max-w-[760px] text-[18px] leading-[30px] sm:text-[20px]">
        Fast, clean web apps and interfaces that put intelligent features in front of real users.
      </p>
      <div className="mt-12">
        <ProjectGrid projects={webDevProjects} base="/work/web-dev" icons={icons} fallback={Globe} />
      </div>
    </main>
  );
}
