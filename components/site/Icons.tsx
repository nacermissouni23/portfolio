import type { SVGProps } from "react";

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  // Exact Figma asset (26x26, #03045E)
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/assets/whatsapp-26.svg" alt="" className={className ?? "h-6 w-6"} />
);

export const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

export const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2zM8 19H5V9.5h3V19zM6.5 8.2a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5S12.9 13.1 12.9 14.3V19h-3V9.5h2.9v1.3h.04c.4-.76 1.4-1.56 2.86-1.56 3.06 0 3.6 2 3.6 4.6V19z" />
  </svg>
);

export const ArrowRight = ({ className }: { className?: string }) => (
  // Exact Figma asset: arrow_right_in_cards.svg (44x24, #090C59)
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/assets/arrow_right_in_cards.svg" alt="" className={className ?? "h-6 w-11"} />
);

export const Ring = ({ className }: { className?: string }) => (
  // Exact Figma asset: brush_circle.svg (128x128, #FFDA46)
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/assets/brush_circle.svg" alt="" aria-hidden className={className} />
);
