import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Перенаправление...",
  robots: "noindex, follow",
};

export default function RedirectPage() {
  permanentRedirect("/");
}
