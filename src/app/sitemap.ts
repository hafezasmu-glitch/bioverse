import type { MetadataRoute } from "next";
import { getAllOrgans, getAllTerms, getAllQuizzes } from "@/lib/content";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bioverse-asmu.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/human-body",
    "/cell-world",
    "/genetics",
    "/dictionary",
    "/quiz",
    "/micro-world",
    "/plant-biology",
    "/virtual-lab",
    "/virtual-microscope",
    "/ecology",
    "/neuroscience",
    "/ai-tutor",
    "/dashboard",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  const organRoutes = getAllOrgans().map((o) => ({
    url: `${base}/human-body/${o.slug}`,
    lastModified: new Date(),
  }));
  const termRoutes = getAllTerms().map((t) => ({
    url: `${base}/dictionary/${t.slug}`,
    lastModified: new Date(),
  }));
  const quizRoutes = getAllQuizzes().map((q) => ({
    url: `${base}/quiz/${q.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...organRoutes, ...termRoutes, ...quizRoutes];
}
