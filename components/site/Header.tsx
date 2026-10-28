"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  // Same brush stroke as the hero headline underline, stretched to the label.
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/assets/underline_brush.svg"
    alt=""
    aria-hidden
    className="pointer-events-none absolute -bottom-1.5 -left-[3%] h-[6px] w-[106%]"
  />
);

export default function Header() {
  const pathname = usePathname() ?? "/";
  const isWork = pathname.startsWith("/work");
  const [section, setSection] = useState<"home" | "about" | "work" | "contact">("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Publish the sticky bar height so anchor scrolling can line a section up
  // exactly under it (see scroll-padding-top in globals.css).
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const setHeight = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth-scroll same-page anchors ourselves so the section top always lands
  // flush under the header, and so repeat clicks on the same hash still work.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download"))
        return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash && url.pathname !== "/") return;

      const target = url.hash
        ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
        : document.documentElement;
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      setMenuOpen(false);

      const offset = barRef.current?.offsetHeight ?? 0;
      const top =
        target === document.documentElement
          ? 0
          : target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: "smooth" });
      history.replaceState(null, "", `${url.pathname}${url.hash}`);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

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
      <div
        ref={barRef}
        className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-y-3 px-6 py-5 md:px-[97px] md:py-8"
      >
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
            aria-expanded={menuOpen}
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
