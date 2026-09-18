import { CONTACTS } from "@/data/contact";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": CONTACTS.companyName,
    "legalName": CONTACTS.legalName,
    "url": CONTACTS.domain,
    "logo": `${CONTACTS.domain}/images/logo/logo-original.png`,
    "telephone": CONTACTS.phones.mainRaw,
    "email": CONTACTS.emails[0],
    "foundingDate": "2004",
    "priceRange": "₽₽",
    "description": "Производство и монтаж пластиковых окон, остекление балконов и фасадных систем во Владивостоке с 2004 года.",
    "address": CONTACTS.offices.map((off) => ({
      "@type": "PostalAddress",
      "streetAddress": off.address,
      "addressLocality": off.city,
      "addressRegion": "Приморский край",
      "addressCountry": "RU",
    })),
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": CONTACTS.offices[0].coords[0],
      "longitude": CONTACTS.offices[0].coords[1],
    },
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
}

export function getServiceSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": CONTACTS.companyName,
      "telephone": CONTACTS.phones.mainRaw,
      "url": CONTACTS.domain,
    },
    "areaServed": ["Владивосток", "Уссурийск", "Артем", "Приморский край"],
    "url": url,
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };
}
