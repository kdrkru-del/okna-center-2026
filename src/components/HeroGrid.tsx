import React from "react";

export default function HeroGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* 40px Blueprint drafting grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Architectural Axis Coordinates */}
      <div className="absolute top-28 right-8 text-[10px] font-mono text-cyan-500/40 uppercase tracking-widest hidden md:block">
        <div>LAT: 43.1155° N</div>
        <div>LON: 131.8855° E</div>
        <div>VLADIVOSTOK</div>
      </div>

      <div className="absolute bottom-12 left-8 text-[10px] font-mono text-cyan-500/40 uppercase tracking-widest hidden md:block">
        <div>PROD: OKNA-CENTER</div>
        <div>STD: ГОСТ</div>
        <div>SINCE: 2004</div>
      </div>
    </div>
  );
}
