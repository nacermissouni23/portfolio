import Link from "next/link";
import { ArrowRight, Building2, Briefcase, Car, Globe, Heart, Home, Shirt, Store, Utensils, Wrench } from "lucide-react";
import { Crumbs, Eyebrow, Pill, cardCls } from "@/components/site/Bits";
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

export default function WebDevPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[127px]">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: "Web Dev" }]} />
      <h1 className="mt-10 text-[72px] font-extrabold leading-none tracking-tight text-sun sm:text-[80px]">
        web dev.
      </h1>
      <p className="mt-9 max-w-[760px] text-[18px] leading-[30px] sm:text-[20px]">
        Fast, clean web apps and interfaces that put intelligent features in front of real users.
      </p>
      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
        {webDevProjects.map((p) => {
          const Icon = icons[p.slug] ?? Globe;
          return (
            <Link
              key={p.slug}
              href={`/work/web-dev/${p.slug}`}
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
