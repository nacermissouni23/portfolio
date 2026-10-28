import type { MetadataRoute } from "next";
import {
  aiProjects,
  dataScienceProjects,
  webDevProjects,
  categories,
} from "@/lib/data";

export const siteUrl = "https://nacermissouni.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", ...categories.map((c) => `/work/${c.slug}`)];
  const projects = [
    ...aiProjects.map((p) => `/work/ai/${p.slug}`),
    ...dataScienceProjects.map((p) => `/work/data-science/${p.slug}`),
    ...webDevProjects.map((p) => `/work/web-dev/${p.slug}`),
  ];
  return [...pages, ...projects].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
