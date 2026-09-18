'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroGlassPanels() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // =========================================================================
    // 1. DESKTOP ANIMATION (5 Panels with architectural 3D depth)
    // =========================================================================
    mm.add('(min-width: 768px)', () => {
      const panels = panelsRef.current.filter(Boolean);

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isOdd = i % 2 === 1;
        gsap.set(panel, {
          yPercent: isOdd ? -6 : 6,
          rotateY: isOdd ? 6 : -6,
          scale: 0.96,
          opacity: 0.85,
        });

        const tint = panel.querySelector('.glass-tint');
        if (tint) {
          gsap.set(tint, {
            backgroundColor: 'rgba(2, 6, 23, 0.45)',
            backdropFilter: 'blur(8px)',
          });
        }
      });

      gsap.set(contentRef.current, { opacity: 0, y: 30 });

      // Intro Timeline
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.8 } });
      introTl
        .to(panels, {
          yPercent: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.07,
        })
        .to(
          '.glass-tint',
          {
            backgroundColor: 'rgba(2, 6, 23, 0.22)',
            backdropFilter: 'blur(0px)',
            stagger: 0.07,
          },
          '-=1.4'
        )
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          },
          '-=1.0'
        );

      // ScrollTrigger
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
        },
      });

      scrollTl
        .to(
          panels,
          {
            scale: 1.15,
            z: 150,
            opacity: 0,
            stagger: { amount: 0.4, from: 'center' },
            ease: 'power2.inOut',
          },
          0
        )
        .to(contentRef.current, { opacity: 0, y: -50 }, 0);
    });

    // =========================================================================
    // 2. MOBILE ANIMATION (Optimized smooth 2D/3D performance for phones)
    // =========================================================================
    mm.add('(max-width: 767px)', () => {
      const mobilePanels = panelsRef.current.slice(0, 3).filter(Boolean);

      mobilePanels.forEach((panel, i) => {
        if (!panel) return;
        const isOdd = i % 2 === 1;
        gsap.set(panel, {
          yPercent: isOdd ? -4 : 4,
          scale: 0.98,
          opacity: 0.9,
        });

        const tint = panel.querySelector('.glass-tint');
        if (tint) {
          gsap.set(tint, {
            backgroundColor: 'rgba(2, 6, 23, 0.4)',
            backdropFilter: 'blur(4px)',
          });
        }
      });

      gsap.set(contentRef.current, { opacity: 0, y: 20 });

      // Intro Mobile
      const introTl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1.4 } });
      introTl
        .to(mobilePanels, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.08,
        })
        .to(
          mobilePanels.map((p) => p?.querySelector('.glass-tint')).filter(Boolean),
          {
            backgroundColor: 'rgba(2, 6, 23, 0.25)',
            backdropFilter: 'blur(0px)',
            stagger: 0.08,
          },
          '-=1.0'
        )
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
          },
          '-=0.8'
        );

      // ScrollTrigger Mobile
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=80%',
          scrub: 0.8,
          pin: true,
        },
      });

      scrollTl
        .to(
          mobilePanels,
          {
            scale: 1.08,
            opacity: 0,
            stagger: 0.1,
            ease: 'power1.inOut',
          },
          0
        )
        .to(contentRef.current, { opacity: 0, y: -30 }, 0);
    });
  }, { scope: wrapperRef });

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#020509] select-none [perspective:1200px]"
    >
      {/* ========================================================================= */}
      {/* DESKTOP PANELS (5 Panels, 20% each) - Visible on md+                      */}
      {/* ========================================================================= */}
      <div className="hidden md:flex absolute inset-0 w-full h-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`desktop-${i}`}
            ref={(el) => {
              panelsRef.current[i] = el;
            }}
            className="relative h-full flex-1 overflow-hidden origin-center [transform-style:preserve-3d] will-change-transform border-r border-white/5 last:border-r-0"
          >
            {/* Exactly 500% width with -i * 100% offset for seamless alignment */}
            <div
              className="absolute top-0 h-full w-[500%] will-change-transform"
              style={{
                left: `-${i * 100}%`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Архитектурное фасадное остекление"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="glass-tint absolute inset-0 z-10 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE PANELS (3 Panels, 33.33% each) - Visible on sm/phone               */}
      {/* ========================================================================= */}
      <div className="flex md:hidden absolute inset-0 w-full h-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`mobile-${i}`}
            ref={(el) => {
              panelsRef.current[i] = el;
            }}
            className="relative h-full flex-1 overflow-hidden origin-center will-change-transform border-r border-white/10 last:border-r-0"
          >
            {/* Exactly 300% width with -i * 100% offset for seamless alignment on mobile */}
            <div
              className="absolute top-0 h-full w-[300%] will-change-transform"
              style={{
                left: `-${i * 100}%`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Архитектурное фасадное остекление"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="glass-tint absolute inset-0 z-10 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Global subtle gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020509] via-slate-950/40 to-slate-950/60 pointer-events-none z-15" />

      {/* ========================================================================= */}
      {/* HERO CONTENT                                                              */}
      {/* ========================================================================= */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-6 sm:px-10 lg:px-12 pt-24 pb-16 max-w-5xl mx-auto"
      >
        {/* Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 sm:mb-6 text-[10px] sm:text-xs font-mono text-cyan-300 border border-cyan-400/30 rounded-full bg-slate-950/80 backdrop-blur-xl uppercase tracking-widest shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Владивосток · с 2004 года</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] leading-[1.05] sm:leading-none">
          ОСТЕКЛЕНИЕ <br />
          <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-cyan-300">
            ЛЮБОЙ СЛОЖНОСТИ
          </span>
        </h1>

        <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-200 font-light mb-6 sm:mb-8 drop-shadow max-w-xl sm:max-w-2xl leading-relaxed">
          Фабричные окна ПВХ, балконы под ключ и витражи ALUTECH от производителя
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <a
            href="#contact"
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-pointer text-center"
          >
            Рассчитать стоимость
          </a>
          <a
            href="#prices"
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-slate-900/70 hover:bg-slate-900/95 text-white border border-white/20 backdrop-blur-xl rounded-full font-medium transition-all duration-300 uppercase tracking-wider text-xs hover:border-white/40 cursor-pointer text-center"
          >
            Смотреть цены
          </a>
        </div>
      </div>
    </div>
  );
}
