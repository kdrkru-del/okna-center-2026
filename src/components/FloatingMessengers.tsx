"use client";

import React from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import MaxButton from "@/components/MaxButton";

export default function FloatingMessengers() {
  return (
    <aside
      aria-label="Быстрая связь в мессенджерах"
      className="hidden md:flex fixed bottom-6 left-6 z-40 flex-col gap-2 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto"
    >
      <WhatsAppButton placement="floating_desktop" variant="floating" />
      <MaxButton placement="floating_desktop" variant="floating" />
    </aside>
  );
}
