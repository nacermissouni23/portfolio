import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs, Pill, cardCls } from "@/components/site/Bits";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description: "AI, data science and web projects by Nacer Eddine Missouni.",
};

export default function WorkPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[127px]">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work" }]} />
      <h1 className="mt-10 text-[72px] font-extrabold leading-none tracking-tight title-sun sm:text-[80px]">
        work.
      </h1>
      <p className="mt-9 max-w-[680px] text-[18px] leading-[30px] sm:text-[20px]">
        A few things I&apos;ve built, grouped by what they do. Pick a category
        to dive in.
      </p>
      <div className="mt-9 grid gap-6 md:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            className={`${cardCls} row-span-3 grid grid-rows-subgrid gap-0 p-8 transition-transform hover:-translate-y-1`}
          >
            <h2 className="text-[38px] font-extrabold leading-tight">
              {c.title}
            </h2>
            <p className="mt-5 text-[16px] leading-[26px]">{c.blurb}</p>
            <div className="mt-5 flex flex-wrap content-start gap-2">
              {c.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
