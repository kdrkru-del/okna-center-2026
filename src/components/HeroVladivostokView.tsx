'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import vladivostokImg from '../../public/images/hero/vladivostok-real-window.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVladivostokView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const hazeLayer1Ref = useRef<HTMLDivElement>(null);
  const hazeLayer2Ref = useRef<HTMLDivElement>(null);
  const glassReflectionsRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const bottomVeilRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (hazeLayer1Ref.current) gsap.set(hazeLayer1Ref.current, { opacity: 0.15 });
      if (hazeLayer2Ref.current) gsap.set(hazeLayer2Ref.current, { opacity: 0.1 });
      if (contentWrapperRef.current) gsap.set(contentWrapperRef.current, { opacity: 1, y: 0 });
      return;
    }

    // --- 1. INTRO TIMELINE ---
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial state: City clearly visible, atmospheric soft mist and reflections
    gsap.set(sceneWrapperRef.current, {
      scale: 1.04,
      filter: 'brightness(0.94) contrast(1.04) saturate(0.96) blur(2px)',
    });
    gsap.set(hazeLayer1Ref.current, { opacity: 0.65, xPercent: -10 });
    gsap.set(hazeLayer2Ref.current, { opacity: 0.55, xPercent: 10 });
    gsap.set(glassReflectionsRef.current, { opacity: 0.35, xPercent: -10 });
    gsap.set(contentWrapperRef.current, { opacity: 0, y: 25 });
    gsap.set(bottomVeilRef.current, { opacity: 0 });

    // Phase 1: Maritime Haze clears softly, Golden Horn Bridge & bay water sharpen into vivid crystal clarity
    introTl
      .to(sceneWrapperRef.current, {
        filter: 'brightness(1.02) contrast(1.08) saturate(1.12) blur(0px)',
        scale: 1.0,
        duration: 2.2,
        ease: 'power2.inOut',
      })
      .to(hazeLayer1Ref.current, {
        opacity: 0.15,
        xPercent: 0,
        duration: 2.0,
        ease: 'power2.inOut',
      }, '-=1.8')
      .to(hazeLayer2Ref.current, {
        opacity: 0.12,
        xPercent: 0,
        duration: 2.0,
        ease: 'power2.inOut',
      }, '-=1.8')
      .to(glassReflectionsRef.current, {
        opacity: 0.18,
        xPercent: 2,
        duration: 1.6,
        ease: 'power2.out',
      }, '-=1.4')
      // Phase 2: Smooth architectural typography reveal
      .to(contentWrapperRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
      }, '-=0.8');

    // Phase 3: Ambient living atmosphere (slow coastal mist breathing)
    gsap.to(hazeLayer1Ref.current, {
      xPercent: 12,
      opacity: 0.22,
      duration: 16,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(hazeLayer2Ref.current, {
      xPercent: -12,
      opacity: 0.18,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Slow cinematic drift of the panoramic scene
    gsap.to(sceneWrapperRef.current, {
      scale: 1.02,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // --- 2. SCROLL TRIGGER: ULTRA-SMOOTH CINEMATIC WALKTHROUGH ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=130%',
        scrub: 1.0,
        pin: true,
        anticipatePin: 1,
      },
    });

    scrollTl
      // Left content gently fades & floats up early in scroll
      .to(contentWrapperRef.current, {
        opacity: 0,
        y: -35,
        ease: 'power1.out',
        duration: 0.45,
      }, 0)
      // Camera smoothly floats forward towards the Golden Horn Bridge
      .to(sceneWrapperRef.current, {
        scale: 1.16,
        yPercent: -2,
        ease: 'power1.inOut',
        duration: 1.0,
      }, 0)
      // Haze dissolves away completely
      .to([hazeLayer1Ref.current, hazeLayer2Ref.current], {
        opacity: 0,
        ease: 'power1.inOut',
        duration: 0.5,
      }, 0)
      // Soft transition veil smoothly melts into the next section
      .to(bottomVeilRef.current, {
        opacity: 0.95,
        ease: 'power2.in',
        duration: 0.5,
      }, 0.5);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#020509] select-none"
    >
      {/* ============================================================ */}
      {/* LAYER 1: AUTHENTIC VLADIVOSTOK PANORAMIC VIEW                */}
      {/* ============================================================ */}
      <div ref={sceneWrapperRef} className="absolute inset-0 w-full h-full origin-center">
        <Image
          src={vladivostokImg}
          alt="Панорамный вид через остекление на Золотой мост и бухту Золотой Рог во Владивостоке"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center md:object-[center_42%]"
        />

        {/* Localized Left Vignette: Soft & natural for crystal-clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/30 to-transparent w-full md:w-3/5 z-10 pointer-events-none" />
        
        {/* Top Gradient for Header contrast */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent z-10 pointer-events-none" />

        {/* Bottom Gradient for grounding */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent z-10 pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: COASTAL MARITIME HAZE / MIST                        */}
      {/* ============================================================ */}
      <div
        ref={hazeLayer1Ref}
        className="absolute inset-0 pointer-events-none z-15 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse 110% 65% at 35% 55%, rgba(186, 230, 253, 0.3), transparent 75%)',
          filter: 'blur(35px)',
        }}
      />
      <div
        ref={hazeLayer2Ref}
        className="absolute inset-0 pointer-events-none z-15 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse 130% 50% at 75% 65%, rgba(224, 242, 254, 0.2), transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* ============================================================ */}
      {/* LAYER 3: CLEAN GLASS REFLECTIONS                             */}
      {/* ============================================================ */}
      <div
        ref={glassReflectionsRef}
        className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-white/10 via-cyan-400/5 to-transparent transform -skew-x-12"
      />

      {/* ============================================================ */}
      {/* LAYER 4: SEAMLESS SCROLL TRANSITION VEIL                    */}
      {/* ============================================================ */}
      <div
        ref={bottomVeilRef}
        className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-b from-transparent via-slate-950/60 to-[#03070f]"
      />

      {/* ============================================================ */}
      {/* LAYER 5: HERO CONTENT (Vertically centered, zero overlap)   */}
      {/* ============================================================ */}
      <div
        ref={contentWrapperRef}
        className="relative z-30 flex flex-col justify-center w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 pb-16"
      >
        <div className="max-w-xl lg:max-w-2xl flex flex-col justify-center">
          
          {/* Heritage Badge - Placed cleanly below header */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 mb-4 sm:mb-6 text-[10px] sm:text-xs font-mono text-cyan-300 border border-cyan-400/30 rounded-full bg-slate-950/80 backdrop-blur-xl uppercase tracking-widest shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Владивосток · Золотой Рог · с 2004 года</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] font-extrabold text-white tracking-tight leading-[0.98] md:leading-[0.95] mb-4 sm:mb-5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]">
            <span>ВЛАДИВОСТОК</span> <br />
            <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-cyan-300">
              НАЧИНАЕТСЯ С ВИДА
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light mb-2.5 drop-shadow leading-relaxed max-w-lg">
            Панорамное и теплое остекление любой сложности для квартир, коттеджей и видовых лоджий.
          </p>

          {/* Key Product Line */}
          <p className="text-[11px] sm:text-xs md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest mb-6 sm:mb-8 drop-shadow">
            ПВХ · Алюминий · Балконы под ключ · Фасады
          </p>

          {/* Action Buttons: Clean side-by-side with non-overlapping flex layout */}
          <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <a
              href="#contact"
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] cursor-pointer text-center"
            >
              Рассчитать стоимость
            </a>
            <a
              href="#projects"
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-slate-900/70 hover:bg-slate-900/95 text-white border border-white/20 backdrop-blur-xl rounded-full font-medium transition-all duration-300 uppercase tracking-wider text-xs hover:border-white/40 cursor-pointer text-center"
            >
              Смотреть проекты
            </a>
          </div>

          {/* Trust Badges: Clean inline badges integrated inside the content column */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-cyan-400 font-bold text-xs sm:text-sm">22</span> ГОДА В ПРИМОРЬЕ
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              РЕАЛЬНЫЕ ОБЪЕКТЫ
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              МОРСКАЯ ЗАЩИТА
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
