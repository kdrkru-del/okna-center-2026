import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageLayout from "@/components/ServicePageLayout";
import { PAGES_DATA } from "@/data/pages";
import { COMPANY_INFO } from "@/data/company_info";

const pageData = PAGES_DATA["ustanovka_plastikovykh_okon_vo_vladivostokie"];

export const metadata: Metadata = {
  title: pageData?.title || "ustanovka_plastikovykh_okon_vo_vladivostokie — Окна Центр",
  description: pageData?.description || "Услуги остекления и отделки во Владивостоке от компании Окна Центр.",
  alternates: {
    canonical: pageData?.canonical || `${COMPANY_INFO.domain}/ustanovka_plastikovykh_okon_vo_vladivostokie/`,
  },
  openGraph: {
    title: pageData?.title,
    description: pageData?.description,
    url: pageData?.canonical || `${COMPANY_INFO.domain}/ustanovka_plastikovykh_okon_vo_vladivostokie/`,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
    images: pageData?.heroImage ? [{ url: pageData.heroImage }] : undefined,
  },
};

export default function Page() {
  if (!pageData) notFound();
  return <ServicePageLayout page={pageData} />;
}
