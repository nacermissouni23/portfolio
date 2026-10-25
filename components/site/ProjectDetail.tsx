import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { Crumbs } from "@/components/site/Bits";
import { GithubIcon } from "@/components/site/Icons";
import type { Project } from "@/lib/data";

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
  workflowSrc,
}: {
  project: Project;
  category: string;
  categoryHref: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  workflowSrc?: string;
}) {
  const showScreenshots = Boolean(p.live && p.screenshots);
  const showWorkflow = !showScreenshots && Boolean(workflowSrc);

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

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-olive bg-[#F6EE7C]">
          <Icon className="h-12 w-12" strokeWidth={2} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-sun px-3 py-1 text-xs font-semibold text-olive">
              {p.company}
            </span>
            <span className="text-[11.5px] font-medium uppercase tracking-wide text-amber">
              {p.eyebrow}
            </span>
          </div>
          <h1 className="mt-2 text-[40px] font-extrabold leading-tight tracking-tight sm:text-[52px]">
            {p.title}
          </h1>
        </div>
      </div>

      <p className="mt-8 max-w-[980px] text-[22px] font-semibold leading-[34px] text-ink/80 sm:text-[26px] sm:leading-[38px]">
        {p.blurb}
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_330px] md:gap-12">
        <div>
          <p className="text-[17px] leading-[29px] text-ink/70">{p.summary}</p>

          <div className="mt-8 rounded-[10px] border-[1.5px] border-olive bg-sun/60 p-6">
            <p className="text-[10px] font-bold uppercase tracking-wide text-amber">
              The outcome
            </p>
            <p className="mt-2 text-[19px] font-bold leading-[29px] text-olive">
              {p.impact}
            </p>
          </div>

          <h2 className="mt-10 text-[28px] font-extrabold tracking-tight">
            what&apos;s inside.
          </h2>
          <ul className="mt-5 space-y-4">
            {p.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 text-[16px] leading-[28px] text-ink/75"
              >
                <span
                  aria-hidden
                  className="mt-[11px] h-[7px] w-[7px] shrink-0 rounded-full bg-amber"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="border-ink/10 md:border-l md:pl-6">
          <div className="flex items-center gap-4">
            {p.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.logo}
                alt={p.company}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-full bg-olive text-[13px] font-bold text-sun">
                {p.company === "Personal"
                  ? "P"
                  : p.company.slice(0, 2).toUpperCase()}
              </span>
            )}
            <span className="text-[17px] font-semibold text-olive">
              {p.company}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-olive px-3 py-1 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
          {(p.live || p.github) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionCls}
                >
                  Live site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionCls}
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          )}
        </aside>
      </div>

      {showScreenshots && p.live && p.screenshots && (
        <section className="mt-14">
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
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_260px]">
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-[10px] border-[1.5px] border-olive bg-paper"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.screenshots.desktop}
                alt={`${p.title} desktop screenshot`}
                className="w-full"
                loading="lazy"
              />
            </a>
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto block w-full max-w-[260px] self-start overflow-hidden rounded-[10px] border-[1.5px] border-olive bg-paper md:mx-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.screenshots.mobile}
                alt={`${p.title} mobile screenshot`}
                className="w-full"
                loading="lazy"
              />
            </a>
          </div>
        </section>
      )}

      {showWorkflow && (
        <section className="mt-14">
          <h2 className="text-[34px] font-extrabold tracking-tight">
            the workflow.
          </h2>
          <div className="mt-8 rounded-[10px] border-[1.5px] border-olive bg-paper p-5 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={workflowSrc}
              alt={`${p.title} workflow diagram`}
              className="w-full"
              loading="lazy"
            />
          </div>
        </section>
      )}
    </main>
  );
}
