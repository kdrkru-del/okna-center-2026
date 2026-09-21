"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ModalContextType {
  isOpen: boolean;
  serviceTitle: string;
  openMeasurementModal: (title?: string) => void;
  closeMeasurementModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  serviceTitle: "",
  openMeasurementModal: () => {},
  closeMeasurementModal: () => {},
});

export const useMeasurementModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceTitle, setServiceTitle] = useState("");

  const openMeasurementModal = (title?: string) => {
    setServiceTitle(title || "Вызов мастера на замер");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      openMeasurementModal(customEvent.detail?.title);
    };

    // Global listener so any button or link can trigger it
    window.addEventListener("open-measurement-modal", handleCustomEvent);

    // Intercept clicks on links pointing to /zaiavka_na_uslughi_kompanii_oknatsientr
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href*="/zaiavka_na_uslughi_kompanii_oknatsientr"], [data-open-measurement-modal]');
      if (target) {
        // If it's the standalone zaiavka page itself, don't intercept standard navigations if user really wants to open in new tab
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        e.preventDefault();
        const customTitle = target.getAttribute("data-modal-title") || undefined;
        openMeasurementModal(customTitle);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("open-measurement-modal", handleCustomEvent);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        serviceTitle,
        openMeasurementModal,
        closeMeasurementModal: closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
