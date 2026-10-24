"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./Icons";

const nav = [
  { label: "Home", href: "/", key: "home" },
  { label: "Work", href: "/work", key: "work" },
  { label: "About", href: "/#about", key: "about" },
  { label: "Contact", href: "/#contact", key: "contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/nacermissouni23", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nacer-eddine-missouni-345836291/", Icon: LinkedinIcon },
  { label: "WhatsApp", href: "https://wa.me/213672807755", Icon: WhatsAppIcon },
];

const Squiggle = () => (
  // Exact Figma asset: underline_header.svg (50x6, #FFDA46)
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/assets/underline_header.svg"
    alt=""
    aria-hidden
    className="absolute left-1/2 -bottom-1 h-[6px] w-[50px] -translate-x-1/2"
  />
);

export default function Header() {
  const pathname = usePathname() ?? "/";
  const isWork = pathname.startsWith("/work");
  const [section, setSection] = useState<"home" | "about" | "contact">("home");

  useEffect(() => {
    if (isWork) return;
    const about = document.getElementById("about");
    const contact = document.getElementById("contact");
    if (!about && !contact) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSection(e.target.id as "about" | "contact");
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    if (about) obs.observe(about);
    if (contact) obs.observe(contact);
    const onScroll = () => {
      if (window.scrollY < 200) setSection("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isWork, pathname]);

  const active = isWork ? "work" : section;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-y-3 px-6 py-5 md:px-[97px] md:py-8">
        <Link href="/" className="text-[22px] font-bold tracking-tight">
          Nacer
        </Link>
        <nav className="order-3 flex w-full justify-center gap-8 md:absolute md:left-1/2 md:order-none md:w-auto md:-translate-x-1/2 md:gap-14">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={cn(
                "relative text-[15px] md:text-[17px]",
                active === n.key ? "font-medium" : "",
              )}
            >
              {n.label}
              {active === n.key && <Squiggle />}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 md:gap-6">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="transition-transform hover:-translate-y-0.5"
            >
              <Icon className="h-6 w-6 md:h-[27px] md:w-[27px]" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
