import type { MetadataRoute } from "next";
import { PAGES_DATA } from "@/data/pages";
import { COMPANY_INFO } from "@/data/company_info";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split("T")[0];

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${COMPANY_INFO.domain}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${COMPANY_INFO.domain}/ghalierieia_rabot/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${COMPANY_INFO.domain}/contacts/`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${COMPANY_INFO.domain}/zaiavka_na_uslughi_kompanii_oknatsientr/`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${COMPANY_INFO.domain}/ceny/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  Object.keys(PAGES_DATA).forEach((slug) => {
    routes.push({
      url: `${COMPANY_INFO.domain}/${slug}/`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: slug.includes("ustanovka") || slug.includes("osteklenie") ? 0.9 : 0.8,
    });
  });

  return routes;
}
