'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LivingViewCanvas from './LivingViewCanvas';
import vladivostokImg from '../../public/images/hero/vladivostok-real-window.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function HeroLivingView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const glassReflectionsRef = useRef<HTMLDivElement>(null);
  const bottomVeilRef = useRef<HTMLDivElement>(null);

  const scrollProgress = useRef({ current: 0 });
  const introProgress = useRef({ current: 0 });

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      introProgress.current.current = 1;
      if (contentWrapperRef.current) gsap.set(contentWrapperRef.current, { opacity: 1, y: 0 });
      return;
    }

    // 1. Intro Reveal Timeline
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(contentWrapperRef.current, { opacity: 0, y: 25 });
    gsap.set(glassReflectionsRef.current, { opacity: 0.4, xPercent: -15 });

    introTl
      // Awaken the WebGL depth volume
      .to(introProgress.current, {
        current: 1.0,
        duration: 2.4,
        ease: 'power2.inOut',
      })
      // Light sheen sweep over the architectural glass
      .to(glassReflectionsRef.current, {
        opacity: 0.2,
        xPercent: 0,
        duration: 2.0,
        ease: 'power2.out',
      }, '-=1.8')
      // Floating typography reveal
      .to(contentWrapperRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.0');

    // 2. Cinematic ScrollTrigger: Floating through the panoramic glass into the city
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=140%',
        scrub: 1.0,
        pin: true,
        anticipatePin: 1,
      },
    });

    scrollTl
      // Fade out left text early during scroll
      .to(contentWrapperRef.current, {
        opacity: 0,
        y: -40,
        ease: 'power1.out',
        duration: 0.45,
      }, 0)
      // Pass scroll depth to the WebGL shader
      .to(scrollProgress.current, {
        current: 1.0,
        ease: 'power1.inOut',
        duration: 1.0,
      }, 0)
      // Soft transition veil into the content below
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
      {/* LAYER 1: CSS FALLBACK / PRELOAD BASE IMAGE                   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full origin-center opacity-40">
        <Image
          src={vladivostokImg}
          alt="Владивосток Золотой мост панорама"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center md:object-[center_42%]"
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: INTERACTIVE WebGL 3D DEPTH CANVAS (Three.js Shader) */}
      {/* ============================================================ */}
      <LivingViewCanvas
        scrollProgress={scrollProgress}
        introProgress={introProgress}
        imageUrl={vladivostokImg.src}
      />

      {/* ============================================================ */}
      {/* LAYER 3: ARCHITECTURAL VIGNETTES & LIGHT GRADIENTS           */}
      {/* ============================================================ */}
      {/* Left Vignette for crystal-clear text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/35 to-transparent w-full md:w-3/5 z-20 pointer-events-none" />
      
      {/* Top Gradient for Header contrast */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent z-20 pointer-events-none" />

      {/* Bottom Gradient for grounding */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 to-transparent z-20 pointer-events-none" />

      {/* ============================================================ */}
      {/* LAYER 4: GLASS REFLECTION ACCENT                             */}
      {/* ============================================================ */}
      <div
        ref={glassReflectionsRef}
        className="absolute inset-0 pointer-events-none z-22 bg-gradient-to-tr from-white/10 via-cyan-400/5 to-transparent transform -skew-x-12"
      />

      {/* ============================================================ */}
      {/* LAYER 5: SEAMLESS SCROLL TRANSITION VEIL                    */}
      {/* ============================================================ */}
      <div
        ref={bottomVeilRef}
        className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-b from-transparent via-slate-950/60 to-[#03070f] opacity-0"
      />

      {/* ============================================================ */}
      {/* LAYER 6: HERO CONTENT (Vertically centered, non-overlapping)*/}
      {/* ============================================================ */}
      <div
        ref={contentWrapperRef}
        className="relative z-30 flex flex-col justify-center w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 pb-16"
      >
        <div className="max-w-xl lg:max-w-2xl flex flex-col justify-center">
          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[74px] xl:text-[82px] font-extrabold text-white tracking-tight leading-[0.98] md:leading-[0.95] mb-4 sm:mb-5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]">
            <span>ОСТЕКЛЕНИЕ</span> <br />
            <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-cyan-300">
              В ЖИВОМ ОБЪЕМЕ
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light mb-2.5 drop-shadow leading-relaxed max-w-lg">
            Панорамное, фасадное и теплое остекление квартир, коттеджей и видовых балконов под ключ.
          </p>

          {/* Key Product Line */}
          <p className="text-[11px] sm:text-xs md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest mb-6 sm:mb-8 drop-shadow">
            ПВХ · Алюминий ALUTECH · Балконы под ключ · Фасады
          </p>

          {/* Action Buttons */}
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

          {/* Trust Badges */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-cyan-400 font-bold text-xs sm:text-sm">22</span> ГОДА В ПРИМОРЬЕ
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              LIVING DEPTH SCENE
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
