'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroFrostedGlass() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frostLayerRef = useRef<HTMLDivElement>(null);
  const gleamRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initial State
    gsap.set(frostLayerRef.current, {
      opacity: 0.95,
      backdropFilter: 'blur(20px)',
    });
    gsap.set(gleamRef.current, {
      xPercent: -150,
      opacity: 0,
    });
    gsap.set(contentRef.current, {
      opacity: 0,
      y: 30,
    });

    // 2. Intro: The Thermal Wave & Light Sweep
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    introTl
      .to(gleamRef.current, {
        opacity: 0.8,
        duration: 0.4,
      })
      .to(gleamRef.current, {
        xPercent: 200,
        duration: 1.8,
        ease: 'power2.inOut',
      }, '-=0.2')
      .to(frostLayerRef.current, {
        opacity: 0.15,
        backdropFilter: 'blur(2px)',
        duration: 1.6,
        ease: 'power2.inOut',
      }, '-=1.5')
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.8');

    // 3. ScrollTrigger
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
      }
    });

    scrollTl
      .to(frostLayerRef.current, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.5,
      }, 0)
      .to(bgImageRef.current, {
        scale: 1.12,
        duration: 1,
        ease: 'power1.inOut',
      }, 0)
      .to(contentRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.6,
      }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-[#020509]">
      
      {/* Background Image: Crisp Warm Interior */}
      <div ref={bgImageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
          alt="Теплое остекление"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      {/* Frosted Layer */}
      <div 
        ref={frostLayerRef}
        className="absolute inset-0 z-10 pointer-events-none bg-slate-900/30"
      />

      {/* Light Sweep (Gleam) */}
      <div
        ref={gleamRef}
        className="absolute inset-0 z-15 pointer-events-none transform -skew-x-25 w-[40vw] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
        style={{ filter: 'blur(30px)' }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4 md:px-8 pt-20">
        
        {/* Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-mono text-cyan-300 border border-cyan-400/30 rounded-full bg-slate-950/80 backdrop-blur-xl uppercase tracking-widest shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Владивосток · с 2004 года</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] leading-none">
          ТЕПЛО И ТИШИНА <br />
          <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-cyan-300">
            В КАЖДОМ ОКНЕ
          </span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-slate-200 font-light mb-8 drop-shadow max-w-2xl leading-relaxed">
          Энергосберегающие стеклопакеты и надежная защита от приморских ветров
        </p>

        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-pointer"
          >
            Рассчитать стоимость
          </a>
          <a
            href="#prices"
            className="px-8 py-4 bg-slate-900/70 hover:bg-slate-900/95 text-white border border-white/20 backdrop-blur-xl rounded-full font-medium transition-all duration-300 uppercase tracking-wider text-xs hover:border-white/40 cursor-pointer"
          >
            Смотреть цены
          </a>
        </div>

      </div>

    </div>
  );
}
