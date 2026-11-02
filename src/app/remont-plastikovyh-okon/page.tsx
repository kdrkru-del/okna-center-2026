import type { Metadata } from "next";
import RepairLanding from "@/components/RepairLanding";
import { PAGES_DATA } from "@/data/pages";
import { COMPANY_INFO } from "@/data/company_info";
import { REPAIR_FAQ } from "@/data/repair_landing";

const pageData = PAGES_DATA["remont-plastikovyh-okon"] || PAGES_DATA["remont_plastikovyh_okon_vladivostok"];
const CANONICAL = `${COMPANY_INFO.domain}/remont-plastikovyh-okon/`;
const TITLE = "Ремонт пластиковых окон — вызов мастера | Окна Центр";
const DESCRIPTION =
  "Ремонт пластиковых окон: регулировка окон, замена стеклопакетов, уплотнителей, ручек и ремонт фурнитуры. Работаем с 2004 года, гарантия по договору. Вызов мастера: 8 (423) 2-725-725.";
const HERO_IMAGE = pageData?.heroImage || "/images/legacy/db7eeb03b34b1d5a8cb1d52243b0e21f.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
    images: [{ url: HERO_IMAGE }],
  },
};

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ремонт пластиковых окон",
    description: DESCRIPTION,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY_INFO.name,
      legalName: COMPANY_INFO.legalName,
      telephone: COMPANY_INFO.mainPhone,
      url: COMPANY_INFO.domain,
      foundingDate: "2004",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: COMPANY_INFO.domain },
      { "@type": "ListItem", position: 2, name: "Ремонт пластиковых окон", item: CANONICAL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: REPAIR_FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RepairLanding heroImage={HERO_IMAGE} />
    </>
  );
}
