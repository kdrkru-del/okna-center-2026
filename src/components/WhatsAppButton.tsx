"use client";

import React from "react";
import { COMPANY_INFO } from "@/data/company_info";
import { reachGoal } from "@/components/YandexMetrika";

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.47 0-2.92-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.187 8.187 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.59.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  placement: string;
  variant?: "header" | "mobileNav" | "compact" | "floating" | "outline";
  className?: string;
  iconClassName?: string;
}

export default function WhatsAppButton({
  placement,
  variant = "compact",
  className = "",
  iconClassName = "w-4 h-4",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    reachGoal("whatsapp_click", { placement });
  };

  if (variant === "mobileNav") {
    return (
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-whatsapp-button="true"
        data-placement={placement}
        title="Написать в WhatsApp"
        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 transition-colors active:scale-95 cursor-pointer ${className}`}
      >
        <WhatsAppIcon className={`text-[#25D366] mb-1 ${iconClassName}`} />
        <span className="text-[10.5px] font-bold leading-none whitespace-nowrap">
          WhatsApp
        </span>
      </a>
    );
  }

  if (variant === "header") {
    return (
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-whatsapp-button="true"
        data-placement={placement}
        title="Написать в WhatsApp: +7 (994) 010-03-00"
        className={`px-3 py-2 xl:px-3.5 xl:py-2 rounded-xl bg-emerald-50/95 hover:bg-emerald-100 text-emerald-950 border border-emerald-200/90 font-bold text-xs tracking-tight shadow-2xs transition-all inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${className}`}
      >
        <WhatsAppIcon className={`text-[#25D366] ${iconClassName}`} />
        <span>WhatsApp</span>
      </a>
    );
  }

  if (variant === "floating") {
    return (
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-whatsapp-button="true"
        data-placement={placement}
        title="Написать в WhatsApp"
        className={`px-3.5 py-2.5 rounded-2xl bg-white/95 hover:bg-emerald-50 text-slate-900 hover:text-emerald-950 border border-slate-200/90 hover:border-emerald-300 shadow-md backdrop-blur-md transition-all inline-flex items-center gap-2 cursor-pointer ${className}`}
      >
        <span className="w-6 h-6 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
          <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold leading-tight">WhatsApp</span>
          <span className="text-[10px] text-slate-500 leading-none">Быстрый ответ</span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={COMPANY_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-whatsapp-button="true"
      data-placement={placement}
      title="Написать в WhatsApp"
      className={`px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-xs tracking-wide transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer ${className}`}
    >
      <WhatsAppIcon className={`text-[#25D366] ${iconClassName}`} />
      <span>WhatsApp</span>
    </a>
  );
}
