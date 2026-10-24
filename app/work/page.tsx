import Link from "next/link";
import { ArrowRight, Ring } from "@/components/site/Icons";
import { Crumbs, Eyebrow, Pill, cardCls } from "@/components/site/Bits";
import { categories } from "@/lib/data";

export default function WorkPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-[127px]">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work" }]} />
      <h1 className="mt-10 text-[72px] font-extrabold leading-none tracking-tight text-sun sm:text-[80px]">
        work.
      </h1>
      <p className="mt-9 max-w-[680px] text-[18px] leading-[30px] sm:text-[20px]">
        A few things I&apos;ve built, grouped by what they do. Pick a category
        to dive in.
      </p>
      <div className="mt-9 grid items-stretch gap-6 md:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            className={`${cardCls} group flex h-full flex-col p-8`}
          >
            <Eyebrow>Category {c.n}</Eyebrow>
            <h2 className="mt-5 text-[38px] font-extrabold leading-tight">
              {c.title}
            </h2>
            <p className="mt-5 text-[16px] leading-[26px]">{c.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-end">
              <ArrowRight className="h-4 w-11 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
