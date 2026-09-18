"use client";

import React, { useState } from "react";
import { Info, CheckCircle2 } from "lucide-react";

interface LayerInfo {
  id: string;
  name: string;
  role: string;
  features: string[];
}

const LAYERS: Record<string, LayerInfo> = {
  outer: {
    id: "outer",
    name: "Внешний слой: паропроницаемая лента (ПСУЛ)",
    role: "Защита монтажной пены от осадков и ультрафиолета с выводом пара наружу",
    features: [
      "Саморасширяющаяся уплотнительная лента с гидрофобной пропиткой",
      "Заполняет неровности проема четверти стены",
      "Защищает центральный слой пены от разрушения солнечными лучами и дождем"
    ]
  },
  middle: {
    id: "middle",
    name: "Центральный слой: монтажная пена",
    role: "Тепло- и звукоизоляция зазора между рамой и стеновым проемом",
    features: [
      "Профессиональная полиуретановая монтажная пена",
      "Заполнение монтажного зазора по всему периметру оконного блока",
      "Обеспечивает теплоизоляцию монтажного шва"
    ]
  },
  inner: {
    id: "inner",
    name: "Внутренний слой: пароизоляционная лента",
    role: "Защита монтажного шва от проникновения влаги из помещения",
    features: [
      "Пароизоляционная лента для внутренних работ",
      "Плотное прилегание к стеновому проему и раме",
      "Предотвращает увлажнение утеплителя комнатным воздухом"
    ]
  },
  subframe: {
    id: "subframe",
    name: "Подставочный профиль, подоконник и отлив",
    role: "Опорный узел и отвод дождевой воды",
    features: [
      "Базовый профиль для надежного крепления подоконника и отлива",
      "Герметизация стыка подставочного профиля и рамы",
      "Водоотлив для свободного схода атмосферных осадков"
    ]
  }
};

export default function InstallationDiagram() {
  const [activeLayer, setActiveLayer] = useState<string>("middle");
  const current = LAYERS[activeLayer] || LAYERS.middle;

  return (
    <div className="rounded-3xl bg-[#070D18] border border-white/10 p-6 sm:p-8 lg:p-10 overflow-hidden shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Info className="w-3.5 h-3.5" />
            <span>Инженерно-техническая схема</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Схема типового монтажного узла оконного блока
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Конструктивная схема сопряжения оконного блока со стеновым проемом с применением ленты ПСУЛ, монтажной пены и пароизоляции.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(LAYERS).map(([key]) => (
            <button
              key={key}
              onClick={() => setActiveLayer(key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                activeLayer === key
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {key === "outer" && "1. Улица (ПСУЛ)"}
              {key === "middle" && "2. Пена (Тепло)"}
              {key === "inner" && "3. Комната (Пароизоляция)"}
              {key === "subframe" && "4. Отлив и подставочник"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 bg-[#03060B] rounded-2xl p-4 sm:p-6 border border-white/5 relative overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 600 420" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="concrete" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#0E1626" />
                <circle cx="5" cy="5" r="1.5" fill="#1E293B" />
                <circle cx="15" cy="12" r="1.2" fill="#1E293B" />
                <circle cx="12" cy="18" r="1" fill="#334155" />
              </pattern>
              <linearGradient id="foamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Wall */}
            <path d="M 20 20 L 220 20 L 220 380 L 20 380 Z" fill="url(#concrete)" stroke="#334155" strokeWidth="2" />
            <text x="50" y="200" fill="#64748B" fontSize="13" fontFamily="monospace" transform="rotate(-90 50 200)">СТЕНОВОЙ ПРОЕМ (БЕТОН/КИРПИЧ)</text>

            {/* Window Profile */}
            <rect x="340" y="40" width="140" height="260" rx="4" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
            <rect x="355" y="60" width="30" height="220" fill="#0F172A" stroke="#475569" strokeWidth="1" />
            <rect x="395" y="60" width="40" height="220" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
            <rect x="400" y="100" width="30" height="140" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
            <text x="415" y="175" fill="#E2E8F0" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 415 175)">СТАЛЬНОЕ АРМИРОВАНИЕ</text>
            <rect x="445" y="60" width="20" height="220" fill="#0F172A" stroke="#475569" strokeWidth="1" />

            {/* Glazing Unit */}
            <rect x="480" y="70" width="100" height="180" rx="2" fill="url(#glassGrad)" stroke="#06B6D4" strokeWidth="2" />
            <line x1="510" y1="70" x2="510" y2="250" stroke="#38BDF8" strokeWidth="2" />
            <line x1="545" y1="70" x2="545" y2="250" stroke="#38BDF8" strokeWidth="2" />
            <text x="530" y="160" fill="#A5F3FC" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">СТЕКЛОПАКЕТ</text>

            {/* LAYER 1: OUTER PSUL TAPE */}
            <g
              onClick={() => setActiveLayer("outer")}
              className="cursor-pointer transition-all hover:opacity-80"
            >
              <rect
                x="220"
                y="40"
                width="35"
                height="60"
                fill={activeLayer === "outer" ? "#06B6D4" : "#0284C7"}
                stroke="#38BDF8"
                strokeWidth={activeLayer === "outer" ? 3 : 1}
                rx="2"
              />
              <text x="237" y="75" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">ПСУЛ</text>
            </g>

            {/* LAYER 2: FOAM (MIDDLE) */}
            <g
              onClick={() => setActiveLayer("middle")}
              className="cursor-pointer transition-all hover:opacity-80"
            >
              <rect
                x="220"
                y="100"
                width="120"
                height="150"
                fill={activeLayer === "middle" ? "#F59E0B" : "url(#foamGrad)"}
                stroke={activeLayer === "middle" ? "#FBBF24" : "#B45309"}
                strokeWidth={activeLayer === "middle" ? 3 : 1}
                rx="3"
              />
              <circle cx="250" cy="140" r="10" fill="#FEF3C7" opacity="0.3" />
              <circle cx="290" cy="170" r="14" fill="#FEF3C7" opacity="0.3" />
              <circle cx="260" cy="210" r="12" fill="#FEF3C7" opacity="0.3" />
              <circle cx="310" cy="130" r="8" fill="#FEF3C7" opacity="0.3" />
              <text x="280" y="180" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">МОНТАЖНАЯ ПЕНА</text>
            </g>

            {/* LAYER 3: INNER VAPOR TAPE */}
            <g
              onClick={() => setActiveLayer("inner")}
              className="cursor-pointer transition-all hover:opacity-80"
            >
              <rect
                x="220"
                y="250"
                width="120"
                height="30"
                fill={activeLayer === "inner" ? "#10B981" : "#059669"}
                stroke="#34D399"
                strokeWidth={activeLayer === "inner" ? 3 : 1}
                rx="2"
              />
              <text x="280" y="270" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">ПАРОИЗОЛЯЦИЯ</text>
            </g>

            {/* SUBFRAME & SILL / FLASHING */}
            <g
              onClick={() => setActiveLayer("subframe")}
              className="cursor-pointer transition-all hover:opacity-80"
            >
              <rect
                x="340"
                y="300"
                width="140"
                height="45"
                fill={activeLayer === "subframe" ? "#8B5CF6" : "#475569"}
                stroke="#A78BFA"
                strokeWidth={activeLayer === "subframe" ? 2 : 1}
              />
              <text x="410" y="328" fill="#FFFFFF" fontSize="9" textAnchor="middle">ПОДСТАВОЧНЫЙ ПРОФИЛЬ</text>

              <polygon points="340,300 240,300 230,320 340,320" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
              <text x="285" y="315" fill="#0F172A" fontSize="9" fontWeight="bold" textAnchor="middle">ПОДОКОННИК</text>

              <polygon points="480,300 580,340 575,346 480,306" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="1" />
              <text x="530" y="320" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle">ОТЛИВ</text>
            </g>

            <text x="235" y="30" fill="#38BDF8" fontSize="12" fontFamily="monospace" fontWeight="bold">← УЛИЦА</text>
            <text x="360" y="390" fill="#34D399" fontSize="12" fontFamily="monospace" fontWeight="bold">ПОМЕЩЕНИЕ →</text>
          </svg>
        </div>

        <div className="lg:col-span-5 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
            <Info className="w-4 h-4" />
            <span>Конструктивный элемент узла</span>
          </div>

          <h4 className="text-xl font-bold text-white mb-2 leading-snug">
            {current.name}
          </h4>

          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            {current.role}
          </p>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Назначение и свойства:
            </span>
            {current.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400">Гарантия на выполненные работы:</span>
            <span className="text-emerald-400 font-bold font-mono">по договору</span>
          </div>
        </div>
      </div>
    </div>
  );
}