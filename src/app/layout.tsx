import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import YandexMetrika from "@/components/YandexMetrika";
import { COMPANY_INFO } from "@/data/company_info";
import { asset } from "@/lib/assetPath";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.NEXT_PUBLIC_IS_GH_PAGES === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_INFO.domain),
  title: {
    default: "Пластиковые окна, балконы и остекление во Владивостоке — компания «Окна Центр»",
    template: "%s | Окна Центр Владивосток",
  },
  description: "Производство, продажа и установка пластиковых окон, балконов и лоджий под ключ во Владивостоке и Приморском крае с 2004 года. Замер, подбор профиля и монтаж по договору.",
  keywords: [
    "окна владивосток",
    "пластиковые окна владивосток",
    "установка пластиковых окон во владивостоке",
    "остекление балконов владивосток",
    "лоджия под ключ владивосток",
    "ремонт окон владивосток",
    "алюминиевые окна владивосток",
    "окна центр",
    "окна центр владивосток"
  ],
  authors: [{ name: COMPANY_INFO.name }],
  creator: COMPANY_INFO.name,
  publisher: COMPANY_INFO.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: COMPANY_INFO.domain,
    siteName: COMPANY_INFO.name,
    title: "Пластиковые окна и балконы во Владивостоке — «Окна Центр»",
    description: "Собственное производство и монтаж во Владивостоке и Приморье с 2004 года.",
  },
  robots: isGithubPages
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
};

// Global Schema.org LocalBusiness & Organization JSON-LD
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": COMPANY_INFO.name,
  "legalName": COMPANY_INFO.legalName,
  "url": COMPANY_INFO.domain,
  "logo": `${COMPANY_INFO.domain}/images/logo/logo-original.png`,
  "telephone": COMPANY_INFO.mainPhone,
  "email": COMPANY_INFO.emails[0],
  "foundingDate": "2004",
  "priceRange": "₽₽",
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "Владивосток",
      "addressRegion": "Приморский край",
      "addressCountry": "RU",
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Уссурийск",
      "addressRegion": "Приморский край",
      "addressCountry": "RU",
    },
  ],
  "areaServed": [
    { "@type": "City", "name": "Владивосток" },
    { "@type": "City", "name": "Уссурийск" },
    { "@type": "AdministrativeArea", "name": "Приморский край" },
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00",
    },
  ],
};

import { ModalProvider } from "@/context/ModalContext";
import QuickLeadModal from "@/components/QuickLeadModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} h-full antialiased scroll-smooth`}>
      <head>
        {isGithubPages && <meta name="robots" content="noindex,nofollow" />}
        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
        <link
          rel="preload"
          as="image"
          href={asset("/images/hero/hero-apartment-window-interior.jpg")}
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-cyan-600 selection:text-white">
        <ModalProvider>
          <YandexMetrika />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
          <QuickLeadModal />
        </ModalProvider>
      </body>
    </html>
  );
}
