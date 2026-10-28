import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  /** Save the linked file instead of opening it. */
  download?: boolean;
  children: ReactNode;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
};

/** A paper face with a solid offset shadow in the tone colour. */
export function StickyButton({
  tone = "yellow",
  to,
  href,
  download,
  children,
  className,
  ...rest
}: StickyButtonProps) {
  const cls = cn(
    "inline-flex h-[60px] min-w-[148px] items-center justify-center rounded-[6px] border border-[#474306] bg-[#FDFCDF] px-6 text-[15px] font-medium text-ink transition-transform hover:-translate-y-0.5 sm:min-w-[157px]",
    rest.disabled && "cursor-not-allowed opacity-70 hover:translate-y-0",
    className,
  );
  const style = { boxShadow: `6px 7px 0 ${tones[tone]}` };
  if (to)
    return to.startsWith("#") ? (
      <a href={to} className={cls} style={style}>
        {children}
      </a>
    ) : (
      <Link href={to} className={cls} style={style}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} download={download} className={cls} style={style}>
        {children}
      </a>
    );
  return (
    <button className={cls} style={style} {...rest}>
      {children}
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
        "text-[44px] font-extrabold leading-none tracking-tight title-sun sm:text-[56px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

const crumbCls =
  "items-center gap-2 rounded-full border-2 border-olive px-5 py-2.5 text-[14px]";

/** Full trail on wide screens; a single "back" link on phones. */
export function Crumbs({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  const parent = [...items].reverse().find((it) => it.to);
  return (
    <>
      {parent?.to && (
        <Link href={parent.to} className={`${crumbCls} inline-flex md:hidden`}>
          <ArrowLeft className="h-4 w-4" />
          {parent.label}
        </Link>
      )}
      <nav
        aria-label="Breadcrumb"
        className={`${crumbCls} hidden flex-wrap md:inline-flex`}
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
    </>
  );
}

export const cardCls =
  "rounded-[10px] border-[1.5px] border-olive bg-paper shadow-[0_6px_18px_rgba(61,58,10,0.1)]";
