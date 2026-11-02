import type { MetadataRoute } from "next";
import { PAGES_DATA } from "@/data/pages";
import { KEY_OBJECTS } from "@/data/gallery_data";
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
      url: `${COMPANY_INFO.domain}/klyuchevye-obekty/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
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

  // Individual key object pages
  KEY_OBJECTS.forEach((obj) => {
    routes.push({
      url: `${COMPANY_INFO.domain}/klyuchevye-obekty/${obj.id}/`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  });

  Object.keys(PAGES_DATA).forEach((slug) => {
    const page = PAGES_DATA[slug];
    const selfUrl = `${COMPANY_INFO.domain}/${slug}/`;
    // Не включаем в sitemap неканонические зеркала (например, /remont_plastikovyh_okon_vladivostok/, где canonical ведёт на /remont-plastikovyh-okon/)
    if (page?.canonical && page.canonical !== selfUrl) {
      return;
    }
    routes.push({
      url: selfUrl,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: slug.includes("ustanovka") || slug.includes("osteklenie") || slug === "remont-plastikovyh-okon" ? 0.9 : 0.8,
    });
  });

  return routes;
}
