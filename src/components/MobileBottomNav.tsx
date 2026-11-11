"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, Ruler, Wrench } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import { useMeasurementModal } from "@/context/ModalContext";
import { isRepairPath } from "@/lib/repairPaths";
import WhatsAppButton, { WhatsAppIcon } from "@/components/WhatsAppButton";
import MaxButton from "@/components/MaxButton";

export default function MobileBottomNav() {
  const { openMeasurementModal } = useMeasurementModal();
  const pathname = usePathname();
  const isRepair = isRepairPath(pathname);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-2 pb-safe shadow-[0_-4px_25px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="Быстрые действия"
    >
      {isRepair ? (
        /* На странице ремонта окон: 3 понятных, крупных действия для мобильных пользователей */
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <a
            href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
            data-placement="mobile_bottom_nav_phone"
            className="flex items-center justify-center gap-1.5 py-3 px-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/90 font-bold text-xs active:scale-95 transition-all shadow-2xs cursor-pointer select-none"
            title="Позвонить мастеру"
          >
            <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
            <span className="truncate">Позвонить</span>
          </a>

          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-placement="mobile_bottom_nav_whatsapp"
            className="flex items-center justify-center gap-1.5 py-3 px-1.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200/90 font-bold text-xs active:scale-95 transition-all shadow-2xs cursor-pointer select-none"
            title="Написать в WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => openMeasurementModal("Вызов мастера по ремонту окон")}
            className="flex items-center justify-center gap-1.5 py-3 px-1.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs active:scale-95 transition-all shadow-md shadow-cyan-600/20 cursor-pointer select-none"
          >
            <Wrench className="w-4 h-4 text-white shrink-0" />
            <span className="truncate">Мастер</span>
          </button>
        </div>
      ) : (
        /* На остальных страницах сайта: стандартная 4-кнопочная панель с MAX и Замером */
        <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
          <a
            href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80 transition-colors active:scale-95 cursor-pointer shadow-2xs"
            title="Позвонить в Окна Центр"
          >
            <Phone className="w-4 h-4 text-cyan-600 mb-1 shrink-0" />
            <span className="text-[10px] font-bold leading-none whitespace-nowrap">Позвонить</span>
          </a>

          <WhatsAppButton
            placement="mobile_bottom_nav"
            variant="mobileNav"
            className="shadow-2xs"
          />

          <MaxButton
            placement="mobile_bottom_nav"
            variant="mobileNav"
            className="shadow-2xs"
          />

          <button
            type="button"
            onClick={() => openMeasurementModal("Мобильная панель")}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition-transform active:scale-95 shadow-md shadow-slate-900/10 cursor-pointer"
          >
            <Ruler className="w-4 h-4 text-cyan-300 mb-1 shrink-0" />
            <span className="text-[10px] leading-none whitespace-nowrap">Замер</span>
          </button>
        </div>
      )}
    </nav>
  );
}
