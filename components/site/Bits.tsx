import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const tones = {
  yellow: "#F6EE7C",
  green: "#9CFB9F",
  orange: "#FFB82E",
};

type StickyButtonProps = {
  tone?: keyof typeof tones;
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
};

export function StickyButton({
  tone = "yellow",
  to,
  href,
  children,
  className,
  ...rest
}: StickyButtonProps) {
  // Exact replica of `button_example.svg` (164x68):
  // shadow rect x6 y7 w158 h61 rx6 in tone color,
  // face rect x0.5 y0.5 w157 h60 rx5.5 paper fill + #474306 stroke.
  const inner = (
    <span className="relative block h-[68px] w-[164px]">
      <span
        aria-hidden
        className="absolute rounded-[6px]"
        style={{
          left: 6, top: 7, width: 158, height: 61, background: tones[tone],
        }}
      />
      <span className="absolute flex items-center justify-center rounded-[5.5px] border border-[#474306] text-[15px] font-medium text-ink"
        style={{ left: 0.5, top: 0.5, width: 157, height: 60, background: "#FDFCDF" }}
      >
        {children}
      </span>
    </span>
  );
  const cls = cn(
    "inline-block transition-transform hover:-translate-y-0.5",
    rest.disabled && "cursor-not-allowed opacity-70 hover:translate-y-0",
    className,
  );
  if (to)
    return to.startsWith("#") ? (
      <a href={to} className={cls}>
        {inner}
      </a>
    ) : (
      <Link href={to} className={cls}>
        {inner}
      </Link>
    );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-olive bg-[#FBF5B5] px-3 py-1 text-xs font-semibold text-olive",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-wide text-amber">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[44px] font-extrabold leading-none tracking-tight text-sun sm:text-[56px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Crumbs({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="inline-flex flex-wrap items-center gap-2 rounded-full border-2 border-olive px-5 py-2.5 text-[14px]"
    >
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-ink/40">/</span>}
          {it.to ? (
            <Link href={it.to} className="hover:underline">
              {it.label}
            </Link>
          ) : (
            <span className="font-bold">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export const cardCls =
  "rounded-[10px] border-[1.5px] border-olive bg-paper shadow-[0_6px_18px_rgba(61,58,10,0.1)]";
