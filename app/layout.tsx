import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { siteUrl } from "./sitemap";

const description =
  "AI engineer building agents, private AI systems and data products that take real work off people's plates.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nacer Eddine Missouni, AI Engineer",
    template: "%s · Nacer Eddine Missouni",
  },
  description,
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: "Nacer Eddine Missouni",
    title: "Nacer Eddine Missouni, AI Engineer",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
