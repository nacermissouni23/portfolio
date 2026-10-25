"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./Icons";

const nav = [
  { label: "Home", href: "/", key: "home" },
  { label: "About", href: "/#about", key: "about" },
  { label: "Work", href: "/work", key: "work" },
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
  const [section, setSection] = useState<"home" | "about" | "work" | "contact">("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isWork) return;
    const about = document.getElementById("about");
    const contact = document.getElementById("contact");
    const update = () => {
      if (!about || !contact) {
        if (window.scrollY < 200) setSection("home");
        return;
      }
      const aboutTop = about.offsetTop;
      const contactTop = contact.offsetTop;
      const y = window.scrollY;
      if (y < aboutTop - 120) setSection("home");
      else if (y < aboutTop + about.offsetHeight - 120) setSection("about");
      else if (y < contactTop - 120) setSection("work");
      else setSection("contact");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isWork, pathname]);

  const active = isWork ? "work" : section;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-y-3 px-6 py-5 md:px-[97px] md:py-8">
        <Link href="/" className="text-[22px] font-bold tracking-tight">
          Nacer
        </Link>
        <nav className="hidden w-full justify-center gap-8 md:absolute md:left-1/2 md:order-none md:flex md:w-auto md:-translate-x-1/2 md:gap-14">
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
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-6 w-6 flex-col items-center justify-center gap-1 md:hidden"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>
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
      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-black/10 px-6 py-4 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className={cn("text-[16px]", active === n.key ? "font-medium" : "")}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
