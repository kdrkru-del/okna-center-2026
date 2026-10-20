"use client";

import React, { useEffect, useState } from "react";
import { MAX_BRAND, MAX_MANAGERS, MaxManager } from "@/data/max_config";
import {
  allocateVisitorMaxManager,
  getStickyVisitorManager,
  peekNextManagerPreview,
  AssignedManagerRecord,
} from "@/lib/maxRotator";
import { asset } from "@/lib/assetPath";

export function MaxIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(MAX_BRAND.iconPath)}
      alt="MAX"
      width={24}
      height={24}
      className={`inline-block shrink-0 select-none object-contain ${className}`}
    />
  );
}

interface MaxButtonProps {
  placement: string;
  variant?: "primary" | "outline" | "dark" | "header" | "compact" | "mobileNav";
  className?: string;
  iconClassName?: string;
  onClickAfter?: (record: AssignedManagerRecord) => void;
}

export default function MaxButton({
  placement,
  variant = "primary",
  className = "",
  iconClassName = "w-4 h-4",
  onClickAfter,
}: MaxButtonProps) {
  const [stickyRecord, setStickyRecord] = useState<AssignedManagerRecord | null>(null);
  const [previewManager, setPreviewManager] = useState<MaxManager>(MAX_MANAGERS[0]);

  useEffect(() => {
    const existing = getStickyVisitorManager();
    if (existing) {
      setStickyRecord(existing);
    } else {
      peekNextManagerPreview().then((mgr) => {
        setPreviewManager(mgr);
      });
    }

    const handleStorageUpdate = () => {
      const updated = getStickyVisitorManager();
      if (updated) setStickyRecord(updated);
    };

    window.addEventListener("max-manager-assigned", handleStorageUpdate);
    return () => window.removeEventListener("max-manager-assigned", handleStorageUpdate);
  }, []);

  const currentUrl = stickyRecord ? stickyRecord.url : previewManager.url;
  const currentManagerId = stickyRecord ? stickyRecord.managerId : previewManager.id;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Check if sticky manager already exists
    const existing = getStickyVisitorManager();
    if (existing) {
      window.open(existing.url, "_blank", "noopener,noreferrer");
      const rec = await allocateVisitorMaxManager("max_click", placement);
      setStickyRecord(rec);
      onClickAfter?.(rec);
      return;
    }

    // Open blank tab synchronously on user gesture to avoid popup blockers,
    // then direct it to the atomically allocated Round Robin manager URL
    const newWin = window.open("about:blank", "_blank");
    try {
      const assigned = await allocateVisitorMaxManager("max_click", placement);
      setStickyRecord(assigned);
      window.dispatchEvent(new CustomEvent("max-manager-assigned", { detail: assigned }));
      onClickAfter?.(assigned);

      if (newWin && !newWin.closed) {
        newWin.location.href = assigned.url;
      } else {
        window.location.href = assigned.url;
      }
    } catch {
      const fallbackUrl = previewManager.url;
      if (newWin && !newWin.closed) {
        newWin.location.href = fallbackUrl;
      } else {
        window.location.href = fallbackUrl;
      }
    }
  };

  const variantClasses: Record<NonNullable<MaxButtonProps["variant"]>, string> = {
    primary:
      "px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#168BFF] via-[#3B35FF] to-[#7116FF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer",
    outline:
      "px-5 py-3 rounded-xl bg-indigo-50/90 hover:bg-indigo-100 text-indigo-950 border border-indigo-200/90 font-bold text-xs uppercase tracking-wider shadow-xs transition-all inline-flex items-center justify-center gap-2 cursor-pointer",
    dark:
      "px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer",
    header:
      "px-3 py-2 xl:px-3.5 xl:py-2 rounded-xl bg-indigo-50/95 hover:bg-indigo-100 text-indigo-950 border border-indigo-200/90 font-bold text-xs tracking-tight shadow-2xs transition-all inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0",
    compact:
      "px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#168BFF] to-[#5821FF] hover:brightness-110 text-white font-bold text-xs tracking-wide shadow-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer",
    mobileNav:
      "flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-200 transition-colors active:scale-95 cursor-pointer",
  };

  if (variant === "mobileNav") {
    return (
      <a
        href={currentUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-max-button="true"
        data-placement={placement}
        data-manager-id={currentManagerId}
        className={`${variantClasses.mobileNav} ${className}`}
      >
        <MaxIcon className="w-4 h-4 mb-1" />
        <span className="text-[10.5px] font-bold leading-none whitespace-nowrap">
          {MAX_BRAND.buttonText}
        </span>
      </a>
    );
  }

  return (
    <a
      href={currentUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-max-button="true"
      data-placement={placement}
      data-manager-id={currentManagerId}
      className={`${variantClasses[variant]} ${className}`}
    >
      <MaxIcon className={iconClassName} />
      <span>{MAX_BRAND.buttonText}</span>
    </a>
  );
}
