import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-ink/60">Oops! Page not found</p>
        <Link href="/" className="text-amber underline hover:opacity-80">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
