import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Crumbs, Pill, cardCls } from "@/components/site/Bits";
import { CompanyBadge } from "@/components/site/ProjectCard";
import { Diagram } from "@/components/site/Diagram";
import { GithubIcon } from "@/components/site/Icons";
import {
  aiProjects,
  dataScienceProjects,
  webDevProjects,
  type Project,
} from "@/lib/data";
import { diagrams } from "@/lib/diagrams";

const lists: Record<string, Project[]> = {
  "/work/ai": aiProjects,
  "/work/data-science": dataScienceProjects,
  "/work/web-dev": webDevProjects,
};

const actionCls =
  "inline-flex items-center gap-2 rounded-full border border-olive px-4 py-2 text-[13px] font-semibold text-olive transition-colors hover:bg-sun";

export function ProjectNotFound({
  category,
  categoryHref,
}: {
  category: string;
  categoryHref: string;
}) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[140px]">
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Work", to: "/work" },
          { label: category, to: categoryHref },
          { label: "Project" },
        ]}
      />
      <h1 className="mt-8 text-[40px] font-extrabold">Project not found</h1>
    </main>
  );
}

export function ProjectDetail({
  project: p,
  category,
  categoryHref,
  Icon,
}: {
  project: Project;
  category: string;
  categoryHref: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  const showScreenshots = Boolean(p.live && p.screenshots);
  const diagram = diagrams[p.slug];
  const list = lists[categoryHref] ?? [];
  const i = list.findIndex((x) => x.slug === p.slug);
  const prev = list.length > 1 ? list[(i - 1 + list.length) % list.length] : null;
  const next = list.length > 1 ? list[(i + 1) % list.length] : null;

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[140px]">
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Work", to: "/work" },
          { label: category, to: categoryHref },
          { label: p.title },
        ]}
      />

      <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-olive bg-[#F6EE7C]">
              <Icon className="h-8 w-8" strokeWidth={2} />
            </span>
            <span className="text-[12px] font-bold uppercase tracking-wide text-amber">
              {p.eyebrow}
            </span>
          </div>
          <h1 className="mt-5 text-[44px] font-extrabold leading-[1.05] tracking-tight sm:text-[60px]">
            {p.title}
          </h1>
          <p className="mt-5 max-w-[760px] text-[20px] font-semibold leading-[31px] text-ink/80 sm:text-[24px] sm:leading-[36px]">
            {p.blurb}
          </p>
        </div>

        <aside className={`${cardCls} p-6`}>
          <dl className="space-y-5">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-amber">
                Built for
              </dt>
              <dd className="mt-2 flex items-center gap-3 text-[16px] font-semibold text-olive">
                <CompanyBadge project={p} size="md" />
                {p.company === "Personal" ? "Personal project" : p.company}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-amber">
                Built with
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </dd>
            </div>
          </dl>
          {(p.live || p.github) && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/10 pt-5">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className={actionCls}>
                  Live site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className={actionCls}>
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          )}
        </aside>
      </header>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
        <div>
          <h2 className="text-[34px] font-extrabold tracking-tight">the story.</h2>
          <p className="mt-5 max-w-[760px] text-[17px] leading-[30px] text-ink/75">
            {p.summary}
          </p>
        </div>
        <div className="rounded-[10px] border-[1.5px] border-olive bg-[#F6EE7C] p-6 shadow-[6px_7px_0_#FFB82E] lg:mt-16">
          <p className="text-[10px] font-bold uppercase tracking-wide text-olive/70">
            The outcome
          </p>
          <p className="mt-2 text-[19px] font-bold leading-[29px] text-olive">
            {p.impact}
          </p>
        </div>
      </section>

      {diagram && !showScreenshots && (
        <section className="mt-20">
          <h2 className="text-[34px] font-extrabold tracking-tight">
            how it works.
          </h2>
          <div className="mt-8 rounded-[10px] border-[1.5px] border-olive bg-paper p-4 sm:p-8">
            <Diagram id={p.slug} spec={diagram} />
          </div>
        </section>
      )}

      {showScreenshots && p.live && p.screenshots && (
        <section className="mt-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[34px] font-extrabold tracking-tight">
              the screenshots.
            </h2>
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className={actionCls}
            >
              visit live site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative mt-10 flex flex-col-reverse items-center gap-10 md:mb-[11%] md:block md:pr-[13%]">
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full overflow-hidden rounded-[12px] border-[1.5px] border-olive bg-paper shadow-[8px_9px_0_#FFD93D] transition-transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-3 border-b-[1.5px] border-olive px-4 py-2.5">
                <span aria-hidden className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-olive bg-[#FFB82E]" />
                  <span className="h-2.5 w-2.5 rounded-full border border-olive bg-sun" />
                  <span className="h-2.5 w-2.5 rounded-full border border-olive bg-[#9CFB9F]" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-full border border-olive/40 bg-cream px-3 py-1 text-center text-[12px] text-ink/70">
                  {new URL(p.live).host}
                </span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.screenshots.desktop}
                alt={`${p.title} on desktop`}
                width={1440}
                height={900}
                className="block aspect-[16/10] w-full object-cover object-top"
                loading="lazy"
              />
            </a>
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[62%] max-w-[250px] rounded-[30px] border-[1.5px] border-olive bg-ink p-[7px] shadow-[8px_9px_0_#9CFB9F] transition-transform hover:-translate-y-1 md:absolute md:-bottom-[12%] md:right-0 md:w-[24%] md:max-w-none"
            >
              <span className="relative block overflow-hidden rounded-[23px] bg-paper">
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1.5 z-10 h-[3.5%] max-h-4 w-[26%] -translate-x-1/2 rounded-full bg-ink"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.screenshots.mobile}
                  alt={`${p.title} on mobile`}
                  width={780}
                  height={1688}
                  className="block w-full"
                  loading="lazy"
                />
              </span>
            </a>
          </div>
        </section>
      )}
      <section className="mt-20">
        <h2 className="text-[34px] font-extrabold tracking-tight">
          what&apos;s inside.
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {p.highlights.map((h, k) => {
            const cut = h.indexOf(": ");
            const title = cut > 0 && cut < 70 ? h.slice(0, cut) : null;
            const body = title ? h.slice(cut + 2) : h;
            return (
              <li
                key={h}
                className={`${cardCls} row-span-3 grid grid-rows-subgrid gap-0 p-6`}
              >
                <span className="text-[13px] font-bold text-amber">0{k + 1}</span>
                <h3 className="mt-3 text-[18px] font-bold leading-snug">
                  {title ?? ""}
                </h3>
                <p className="mt-2 text-[15px] leading-[25px] text-ink/75">
                  {title ? body.charAt(0).toUpperCase() + body.slice(1) : body}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {prev && next && (
        <nav
          aria-label="More projects"
          className="mt-20 grid gap-4 border-t border-ink/10 pt-10 sm:grid-cols-2"
        >
          {[
            { q: prev, label: "previous", right: false },
            { q: next, label: "next", right: true },
          ].map(({ q, label, right }) => (
            <Link
              key={label}
              href={`${categoryHref}/${q.slug}`}
              className={`${cardCls} row-span-3 grid grid-rows-subgrid gap-0 p-5 transition-transform hover:-translate-y-1 ${right ? "text-right" : ""}`}
            >
              <span
                className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-amber ${right ? "justify-end" : ""}`}
              >
                {!right && <ArrowLeft className="h-3.5 w-3.5" />}
                {label}
                {right && <ArrowRight className="h-3.5 w-3.5" />}
              </span>
              <span className="mt-2 text-[18px] font-bold">{q.title}</span>
              <span className="mt-1 text-[13px] leading-5 text-ink/65">{q.blurb}</span>
            </Link>
          ))}
        </nav>
      )}
    </main>
  );
}
