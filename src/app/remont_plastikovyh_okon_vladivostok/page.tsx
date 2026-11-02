import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RepairLanding from "@/components/RepairLanding";
import { PAGES_DATA } from "@/data/pages";
import { COMPANY_INFO } from "@/data/company_info";

const pageData = PAGES_DATA["remont_plastikovyh_okon_vladivostok"];
/**
 * Канонический адрес указывает на единую страницу /remont-plastikovyh-okon/,
 * чтобы избежать дублирования в поисковых системах, при этом сама страница
 * открывается с кодом 200 OK и поддерживает все 8 якорей для действующих кампаний Директа.
 */
const CANONICAL = `${COMPANY_INFO.domain}/remont-plastikovyh-okon/`;

export const metadata: Metadata = {
  title: pageData?.title || "Ремонт пластиковых окон во Владивостоке и Уссурийске | Окна Центр",
  description:
    pageData?.description ||
    "Ремонт пластиковых окон во Владивостоке и Уссурийске: регулировка, замена стеклопакетов, уплотнителей, фурнитуры и ручек.",
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: pageData?.title,
    description: pageData?.description,
    url: CANONICAL,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
    images: pageData?.heroImage ? [{ url: pageData.heroImage }] : undefined,
  },
};

export default function Page() {
  if (!pageData) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pageData.h1,
    description: pageData.description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY_INFO.name,
      legalName: COMPANY_INFO.legalName,
      telephone: COMPANY_INFO.mainPhone,
      url: COMPANY_INFO.domain,
      foundingDate: "2004",
      address: COMPANY_INFO.offices.map((o) => ({
        "@type": "PostalAddress",
        streetAddress: o.address,
        addressLocality: o.city,
        addressRegion: "Приморский край",
        addressCountry: "RU",
      })),
    },
    areaServed: [
      { "@type": "City", name: "Владивосток" },
      { "@type": "City", name: "Уссурийск" },
      { "@type": "AdministrativeArea", name: "Приморский край" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: COMPANY_INFO.domain },
      { "@type": "ListItem", position: 2, name: pageData.h1, item: CANONICAL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pageData.faq.map((f) => ({
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
      <RepairLanding heroImage={pageData.heroImage} />
    </>
  );
}
