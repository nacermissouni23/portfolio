import Link from "next/link";
import type { ComponentType } from "react";
import { Pill, cardCls } from "@/components/site/Bits";
import type { Project } from "@/lib/data";

type IconType = ComponentType<{ className?: string }>;

export function CompanyBadge({ project: p, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-5 w-5 text-[9px]" : "h-10 w-10 text-[13px]";
  const logoBox = size === "sm" ? "h-8 w-8" : "h-14 w-14";
  if (p.logo)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.logo} alt="" className={`${logoBox} shrink-0 rounded-[4px] object-contain`} />;
  return (
    <span className={`grid ${box} shrink-0 place-items-center rounded-full bg-olive font-bold text-sun`}>
      {p.company === "Personal" ? "P" : p.company.slice(0, 2).toUpperCase()}
    </span>
  );
}

/**
 * Cards share their parent's rows (subgrid), so the icon, title, blurb,
 * tags and footer of neighbouring cards always start on the same line.
 */
export function ProjectGrid({
  projects,
  base,
  icons,
  fallback,
  tags = true,
}: {
  projects: Project[];
  base: string;
  icons: Record<string, IconType>;
  fallback: IconType;
  tags?: boolean;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => {
        const Icon = icons[p.slug] ?? fallback;
        return (
          <Link
            key={p.slug}
            href={`${base}/${p.slug}`}
            className={`${cardCls} grid grid-rows-subgrid gap-0 p-6 transition-transform hover:-translate-y-1 ${tags ? "row-span-6" : "row-span-5"}`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-olive bg-[#F6EE7C]">
              <Icon className="h-7 w-7" />
            </span>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-wide text-amber">
              {p.eyebrow}
            </p>
            <h3 className="mt-2 text-[18px] font-bold leading-snug">{p.title}</h3>
            <p className="mt-2 text-[13px] leading-5 text-ink/70">{p.blurb}</p>
            {tags && (
              <div className="mt-4 flex flex-wrap content-start gap-2">
                {p.tags.map((t) => (
                  <Pill key={t} className="px-[14px] py-[6px]">
                    {t}
                  </Pill>
                ))}
              </div>
            )}
            <div className="mt-5 flex items-center gap-2 self-end border-t border-ink/10 pt-4 text-[11px] font-semibold text-olive">
              <CompanyBadge project={p} />
              {p.company}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
