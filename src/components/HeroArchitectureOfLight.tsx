'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import VolumetricLightCanvas from './VolumetricLightCanvas';
import vladivostokImg from '../../public/images/hero/vladivostok-real-window.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function HeroArchitectureOfLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Step element references
  const introBlockRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const scrollProgress = useRef({ current: 0 });
  const introProgress = useRef({ current: 0 });

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      introProgress.current.current = 1;
      if (introBlockRef.current) gsap.set(introBlockRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    // 1. Initial State: Strictly hide all steps except the intro
    gsap.set(introBlockRef.current, { autoAlpha: 0, y: 25 });
    gsap.set([step1Ref.current, step2Ref.current, step3Ref.current, step4Ref.current], {
      autoAlpha: 0,
      y: 35,
      pointerEvents: 'none'
    });

    // 2. Intro Animation (Volumetric Light Flood -> Reveal Hero Typography)
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    introTl
      .to(introProgress.current, {
        current: 1.0,
        duration: 2.6,
        ease: 'power2.inOut',
      })
      .to(introBlockRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.0');

    // 3. Pinned Multi-Scene Walkthrough (Strict non-overlapping autoAlpha sequence)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=380%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Global scroll uniform & progress indicator
    scrollTl
      .to(scrollProgress.current, {
        current: 1.0,
        ease: 'none',
        duration: 4.0,
      }, 0);

    if (progressBarRef.current) {
      scrollTl.to(progressBarRef.current, {
        scaleX: 1,
        ease: 'none',
        duration: 4.0,
      }, 0);
    }

    // --- Phase 0: Intro Hero Out (0.15 - 0.50) ---
    scrollTl.to(introBlockRef.current, {
      autoAlpha: 0,
      y: -35,
      duration: 0.4,
      ease: 'power2.in',
    }, 0.2);

    // --- Phase 1: Scene 1 · Квартиры (0.60 - 1.30) ---
    scrollTl
      .to(step1Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.6)
      .to(step1Ref.current, {
        autoAlpha: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
      }, 1.2);

    // --- Phase 2: Scene 2 · Частные дома (1.40 - 2.10) ---
    scrollTl
      .to(step2Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 1.4)
      .to(step2Ref.current, {
        autoAlpha: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
      }, 2.0);

    // --- Phase 3: Scene 3 · Балконы и лоджии (2.20 - 2.90) ---
    scrollTl
      .to(step3Ref.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 2.2)
      .to(step3Ref.current, {
        autoAlpha: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
      }, 2.8);

    // --- Phase 4: Scene 4 · Фасады ALUTECH & Философия бренда (3.00 - 4.00) ---
    scrollTl.to(step4Ref.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, 3.0);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#020408] select-none"
    >
      {/* 1. Base Fallback Image */}
      <div className="absolute inset-0 w-full h-full origin-center opacity-25">
        <Image
          src={vladivostokImg}
          alt="Архитектура света Владивосток"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center"
        />
      </div>

      {/* 2. Interactive Three.js WebGL Volumetric Light Canvas */}
      <VolumetricLightCanvas
        scrollProgress={scrollProgress}
        introProgress={introProgress}
        imageUrl={vladivostokImg.src}
      />

      {/* 3. Luxury Vignettes & Depth Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/45 to-transparent w-full md:w-3/5 z-20 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-slate-950/95 via-slate-950/30 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent z-20 pointer-events-none" />

      {/* ========================================================================= */}
      {/* 4. SCENE CONTENT OVERLAYS (Strictly isolated autoAlpha steps)              */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center pointer-events-none">
        
        {/* --- SCENE 0: Свет. Вид. Пространство. (Hero Reveal) --- */}
        <div
          ref={introBlockRef}
          className="absolute inset-0 px-6 sm:px-10 lg:px-12 flex flex-col justify-center max-w-2xl lg:max-w-3xl pt-24 pb-16 pointer-events-auto opacity-0 invisible"
        >
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 mb-5 sm:mb-6 text-[10px] sm:text-xs font-mono text-cyan-300 border border-cyan-400/30 rounded-full bg-slate-950/85 backdrop-blur-xl uppercase tracking-widest shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Architecture of Light · Окна Центр</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extralight text-white tracking-tight leading-[0.96] mb-5 sm:mb-6 drop-shadow-[0_16px_32px_rgba(0,0,0,0.95)]">
            <span className="block font-normal">Свет.</span>
            <span className="block font-light text-slate-200">Вид.</span>
            <span className="block font-extralight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-cyan-300">
              Пространство.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light mb-7 sm:mb-8 max-w-lg leading-relaxed drop-shadow">
            Остекление любой сложности во Владивостоке с 2004 года. Фабричное производство, панорамные конструкции, защита от приморских тайфунов.
          </p>

          <div className="flex flex-row flex-wrap items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
            <a
              href="#contact"
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] cursor-pointer text-center"
            >
              Рассчитать проект
            </a>
            <a
              href="#projects"
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-slate-900/70 hover:bg-slate-900/95 text-white border border-white/20 backdrop-blur-xl rounded-full font-medium transition-all duration-300 uppercase tracking-wider text-xs hover:border-white/40 cursor-pointer text-center"
            >
              Смотреть работы
            </a>
          </div>

          <div className="flex items-center gap-6 text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest">
            <span>↓ Листайте вниз для исследования направлений</span>
          </div>
        </div>

        {/* --- SCENE 1: Остекление квартир --- */}
        <div
          ref={step1Ref}
          className="absolute inset-0 px-6 sm:px-10 lg:px-12 flex flex-col justify-center max-w-xl lg:max-w-2xl pt-24 pb-16 pointer-events-auto opacity-0 invisible"
        >
          <span className="font-mono text-cyan-400 text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3">
            Направление: Квартиры
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            Остекление квартир
          </h2>
          <p className="text-sm sm:text-lg text-cyan-200 font-light mb-3 sm:mb-4">
            Окна в пол и балконные блоки
          </p>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Многокамерные системы Funke (Германия) и KBE с энергоэффективными стеклопакетами. Абсолютная шумоизоляция и сохранение тепла при ветре с залива.
          </p>
          <div>
            <a
              href="#prices"
              className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-cyan-300 hover:text-white transition-colors border-b border-cyan-400/40 pb-1"
            >
              Узнать стоимость от 14 000 ₽ →
            </a>
          </div>
        </div>

        {/* --- SCENE 2: Частные дома и коттеджи --- */}
        <div
          ref={step2Ref}
          className="absolute inset-0 px-6 sm:px-10 lg:px-12 flex flex-col justify-center max-w-xl lg:max-w-2xl pt-24 pb-16 pointer-events-auto opacity-0 invisible"
        >
          <span className="font-mono text-cyan-400 text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3">
            Направление: Коттеджи
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            Частные дома и коттеджи
          </h2>
          <p className="text-sm sm:text-lg text-cyan-200 font-light mb-3 sm:mb-4">
            Панорамное и нестандартное остекление
          </p>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Раздвижные порталы Patio, крупноформатные витражи ALUTECH, ламинация под дерево и архитектурная тонировка для загородных резиденций Приморья.
          </p>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-cyan-300 hover:text-white transition-colors border-b border-cyan-400/40 pb-1"
            >
              Индивидуальный расчет проекта →
            </a>
          </div>
        </div>

        {/* --- SCENE 3: Балконы и лоджии --- */}
        <div
          ref={step3Ref}
          className="absolute inset-0 px-6 sm:px-10 lg:px-12 flex flex-col justify-center max-w-xl lg:max-w-2xl pt-24 pb-16 pointer-events-auto opacity-0 invisible"
        >
          <span className="font-mono text-cyan-400 text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3">
            Направление: Лоджии
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            Балконы и лоджии
          </h2>
          <p className="text-sm sm:text-lg text-cyan-200 font-light mb-3 sm:mb-4">
            Теплый контур и отделка под ключ
          </p>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Превращение балкона в видовой кабинет или лаунж-зону. Фасадные японские панели «Ханьи», утепление пола, встроенная электрика и рулонные евро-жалюзи «Зебра».
          </p>
          <div>
            <a
              href="#prices"
              className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-cyan-300 hover:text-white transition-colors border-b border-cyan-400/40 pb-1"
            >
              Лоджии под ключ от 55 000 ₽ →
            </a>
          </div>
        </div>

        {/* --- SCENE 4: Фасады и коммерция + Философия бренда --- */}
        <div
          ref={step4Ref}
          className="absolute inset-0 px-6 sm:px-10 lg:px-12 flex flex-col justify-center max-w-xl lg:max-w-2xl pt-24 pb-16 pointer-events-auto opacity-0 invisible"
        >
          <span className="font-mono text-cyan-400 text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3">
            Направление: Фасады
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            Фасады и бизнес
          </h2>
          <p className="text-sm sm:text-lg text-cyan-200 font-light mb-3 sm:mb-4">
            Алюминиевые витражи ALUTECH
          </p>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6 max-w-lg">
            Стоечно-ригельные системы, входные группы, огнестойкие конструкции и доставка готовых рам с жесткой обрешеткой по всему Дальнему Востоку.
          </p>
          
          {/* Brand Philosophy Badge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-xl mb-6 shadow-2xl max-w-md">
            <p className="text-xs sm:text-sm text-cyan-300 font-mono leading-relaxed">
              «Ваш вид меняется. Хорошее остекление остаётся незаметным.»
            </p>
          </div>

          <div>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full text-xs uppercase tracking-wider transition-colors shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              Оставить заявку на замер 0 ₽ →
            </a>
          </div>
        </div>

      </div>

      {/* 5. Pinned Bottom Progress Indicator */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10 z-40">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-r from-amber-300 via-cyan-400 to-blue-500 origin-left scale-x-0"
        />
      </div>

    </div>
  );
}
