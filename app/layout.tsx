import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Nacer Eddine Missouni — AI Engineer",
  description:
    "AI Engineer & Data Scientist specializing in agentic AI, LLM-powered applications, and multi-agent systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-ink font-sans antialiased">
        <div className="min-h-screen bg-cream text-ink">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
