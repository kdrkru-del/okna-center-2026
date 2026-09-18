import type { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/data/company_info";

export const dynamic = "force-static";

const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.NEXT_PUBLIC_IS_GH_PAGES === 'true';

export default function robots(): MetadataRoute.Robots {
  if (isGithubPages) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_not-found/", "/undefined", "/variants/"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/_not-found/", "/undefined", "/variants/"],
      },
    ],
    sitemap: `${COMPANY_INFO.domain}/sitemap.xml`,
    host: COMPANY_INFO.domain,
  };
}
