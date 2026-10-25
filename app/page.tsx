"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bot, Calculator, MessageSquareText, Users } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from "@/components/site/Icons";
import { aiProjects } from "@/lib/data";
import {
  Eyebrow,
  Pill,
  SectionTitle,
  StickyButton,
  cardCls,
} from "@/components/site/Bits";

const services = [
  {
    eyebrow: "Intelligent automation",
    title: "AI Agents & Workflow Automation",
    body: "Build AI-powered workflows that handle complex tasks, connect business tools, and automate processes with minimal manual intervention.",
    tags: [
      "AI agents",
      "Multi-step workflows",
      "API integrations",
      "Human-in-the-loop systems",
    ],
  },
  {
    eyebrow: "Knowledge & language",
    title: "LLM-Powered Applications",
    body: "Turn language models into practical applications that understand documents, retrieve relevant information, and generate useful outputs.",
    tags: [
      "AI assistants",
      "Document intelligence",
      "RAG",
      "Structured data extraction",
    ],
  },
  {
    eyebrow: "Data & prediction",
    title: "Machine Learning & Predictive Systems",
    body: "Build data-driven systems that identify patterns, make predictions, and support better decisions using machine learning.",
    tags: [
      "Predictive modeling",
      "Classification",
      "Forecasting",
      "Data analysis",
    ],
  },
];

const projectIcons: Record<string, typeof Bot> = {
  almouhasib: Calculator,
  "snoc-complaints": MessageSquareText,
  hrms: Users,
};

const featuredProjects = aiProjects.slice(0, 3);

const steps = [
  {
    n: "01",
    title: "Audit & Identify",
    body: "I analyze your current workflow, uncover bottlenecks and flaws, and identify what can be automated, improved, or rebuilt.",
  },
  {
    n: "02",
    title: "Prototype & Validate",
    body: "I build a working prototype quickly so you can test it, share feedback, and help shape the solution before full development.",
  },
  {
    n: "03",
    title: "Build & Deliver",
    body: "I turn the validated prototype into a complete solution, refining its functionality, reliability, and integration with your workflow.",
  },
];

const fieldCls =
  "w-full rounded-md border-[1.5px] border-olive bg-paper px-4 py-3 text-[14px] placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-sun";

export default function HomePage() {
  const [form, setForm] = useState({ name: "", email: "", problem: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      // Submit directly from the visitor's browser to FormSubmit.
      // This bypasses Vercel serverless IP blocks by Cloudflare.
      const res = await fetch("https://formsubmit.co/ajax/missouni23@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.problem,
          _subject: `Portfolio inquiry from ${form.name}`,
          _replyto: form.email,
          _template: "table",
          _captcha: false,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        success?: string;
        message?: string;
      } | null;

      if (!res.ok || data?.success !== "true") {
        throw new Error(data?.message ?? "Something went wrong. Please try again.");
      }
      setStatus("sent");
      setForm({ name: "", email: "", problem: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const mailtoFallback = () => {
    const body = `${form.problem}\n\nFrom: ${form.name} (${form.email})`;
    window.location.href = `mailto:missouni23@gmail.com?subject=${encodeURIComponent(
      "Project inquiry",
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-[127px]">
      <section className="flex flex-col items-center pt-8 text-center sm:pt-12">
        <p className="text-[15px] font-semibold sm:text-[17px]">
          Hey, I&apos;m Nacer Eddine MISSOUNI
        </p>
        <h1 className="mx-auto mt-6 max-w-[900px] text-left text-[38px] font-extrabold leading-[1.15] tracking-tight sm:text-[56px] md:text-[64px]">
          I make a{" "}
          <span className="relative inline-block">
            custom
            <img
              src="/assets/underline_custom.svg"
              alt=""
              aria-hidden
              className="absolute -bottom-1 left-0 h-[13px] w-full"
              style={{ maxWidth: 246 }}
            />
          </span>{" "}
          AI solution for your <span className="text-amber">exact</span>{" "}
          problem.
        </h1>
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <StickyButton tone="yellow" to="/work">
            my work
          </StickyButton>
          <StickyButton tone="green" to="#contact">
            let&apos;s talk
          </StickyButton>
        </div>
      </section>

      <section
        id="about"
        className="grid scroll-mt-28 items-center gap-10 pt-20 md:grid-cols-[1fr_auto] md:pt-28"
      >
        <div>
          <SectionTitle>about.</SectionTitle>
          <h2 className="mt-5 text-[26px] font-bold sm:text-[32px]">
            AI Engineer & Data Scientist
          </h2>
          <p className="mt-4 max-w-[640px] text-[15px] leading-6">
            I specialize in agentic AI, LLM-powered applications, and
            multi-agent systems, turning complex problems into intelligent,
            practical software.
          </p>
          <div className="mt-5 flex max-w-[640px] flex-wrap gap-2">
            {[
              "Agentic AI",
              "Multi-Agent Systems",
              "AI Automation",
              "Generative AI",
              "LLM-Powered Apps",
            ].map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
          <StickyButton tone="orange" className="mt-6">
            Resume
          </StickyButton>
        </div>
        <div className="mx-auto w-full max-w-[386px]">
          <Image
            src="/nacer.png"
            alt="Nacer Eddine Missouni"
            width={386}
            height={373}
            className="h-auto w-full"
            priority
          />
        </div>
      </section>

      <section className="pt-20 md:pt-28">
        <SectionTitle className="!text-[40px] sm:!text-[52px]">
          what I can build for you.
        </SectionTitle>
        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className={`${cardCls} p-6`}>
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h3 className="mt-3 text-[19px] font-bold leading-[26px]">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-6 text-ink/80">{s.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </article>
          ))}
        </div>
        <StickyButton tone="green" to="#contact" className="mt-8">
          something else?
        </StickyButton>
      </section>

      <section className="pt-20 md:pt-28">
        <SectionTitle>work.</SectionTitle>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((p) => {
            const Icon = projectIcons[p.slug] ?? Bot;
            return (
              <Link
                key={p.slug}
                href={`/work/ai/${p.slug}`}
                className={`${cardCls} group flex flex-col p-6 transition-transform hover:-translate-y-1`}
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-olive bg-[#F6EE7C]">
                  <Icon className="h-7 w-7" />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-wide text-amber">
                  {p.eyebrow}
                </p>
                <h3 className="mt-2 text-[18px] font-bold">{p.title}</h3>
                <p className="mt-1 text-[13px] text-ink/70">{p.blurb}</p>
                <div className="mt-auto flex items-center gap-2 border-t border-ink/10 pt-4 text-[11px] font-semibold text-olive">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.company}
                      className="h-5 w-5 object-contain"
                    />
                  ) : (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-olive text-[9px] text-sun">
                      {p.company === "Personal"
                        ? "P"
                        : p.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  {p.company}
                </div>
              </Link>
            );
          })}
        </div>
        <StickyButton tone="yellow" to="/work" className="mt-8">
          see all
        </StickyButton>
      </section>

      <section className="pt-20 md:pt-28">
        <SectionTitle>how I work.</SectionTitle>
        <ol className="mt-10 space-y-10">
          {steps.map((s) => (
            <li key={s.n} className="flex items-center gap-6">
              <span className="relative grid h-[72px] w-[72px] shrink-0 place-items-center text-[24px] font-bold">
                <img src="/assets/brush_circle.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full" />
                <span className="relative">{s.n}</span>
              </span>
              <div className="max-w-[560px]">
                <h3 className="text-[20px] font-bold">{s.title}</h3>
                <p className="mt-1 text-[14px] leading-6">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className="scroll-mt-28 pt-16 text-center md:pt-20">
        <span className="mx-auto block w-[61px]">
          <img src="/assets/arrow_down_contact.svg" alt="" aria-hidden className="mx-auto block h-[133px] w-[20px]" />
          <img src="/assets/arrow_down_contact_2nd_element.svg" alt="" aria-hidden className="-mt-4 block h-[42px] w-[61px]" />
        </span>
        <h2 className="mt-4 text-[34px] font-extrabold leading-tight tracking-tight text-sun sm:text-[48px]">
          have a problem worth solving?
        </h2>

        <div className="mx-auto mt-10 grid max-w-[1120px] gap-8 text-left md:grid-cols-[minmax(0,560px)_1fr] md:gap-10">
          <form onSubmit={submit} className={`${cardCls} space-y-3 p-5`}>
            <label className="block">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-wide text-amber">
                Name
              </span>
              <input
                required
                className={fieldCls}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-wide text-amber">
                Email
              </span>
              <input
                required
                type="email"
                className={fieldCls}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-wide text-amber">
                Problem or question
              </span>
              <textarea
                required
                rows={3}
                className={fieldCls}
                placeholder="Tell me what you're trying to solve..."
                value={form.problem}
                onChange={(e) => setForm({ ...form, problem: e.target.value })}
              />
            </label>
            <StickyButton tone="green" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "sending..." : "send"}
            </StickyButton>

            {/* FormSubmit domain verification for nacermissouni.vercel.app */}
            <input
              type="hidden"
              name="_domain"
              value="nacermissouni.vercel.app"
            />
            <input type="hidden" name="_captcha" value="false" />

            {status === "sent" && (
              <p className="text-[13px] font-semibold text-olive">
                Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-[13px] font-semibold text-red-700">
                {error} You can also{" "}
                <button
                  type="button"
                  onClick={mailtoFallback}
                  className="underline"
                >
                  email me directly
                </button>
                .
              </p>
            )}
          </form>

          <div className="flex flex-col justify-start gap-5">
            <div>
              <h3 className="text-[34px] font-extrabold leading-tight sm:text-[40px]">
                Nacer Eddine
                <br />
                MISSOUNI
              </h3>
              <p className="mt-6 text-[18px] font-bold">+213 672 80 77 55</p>
              <p className="mt-2 text-[18px] font-bold">+213 780 38 12 40</p>
              <div className="mt-4 flex gap-4">
                <a
                  href="https://github.com/nacermissouni23"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nacer-eddine-missouni-345836291/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://wa.me/213672807755"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                </a>
              </div>
              <a
                href="mailto:missouni23@gmail.com"
                className="mt-3 block text-[16px]"
              >
                missouni23@gmail.com
              </a>
            </div>
            <p className="flex items-center gap-3 text-[15px] font-bold">
              feel free to contact me anytime
              <img src="/assets/brush_smiley.svg" alt="" aria-hidden className="h-9 w-9" />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

