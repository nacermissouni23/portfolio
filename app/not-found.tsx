import { StickyButton } from "@/components/site/Bits";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col items-start px-6 pb-24 pt-10 md:px-[127px]">
      <h1 className="text-[72px] font-extrabold leading-none tracking-tight title-sun sm:text-[80px]">
        404.
      </h1>
      <p className="mt-9 text-[18px] leading-[30px] sm:text-[20px]">
        That page doesn&apos;t exist.
      </p>
      <StickyButton tone="yellow" to="/" className="mt-10">
        back home
      </StickyButton>
    </main>
  );
}
