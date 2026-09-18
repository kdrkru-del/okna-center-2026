'use client';
import { useEffect, useRef, RefObject } from 'react';
import * as THREE from 'three';

interface LivingViewCanvasProps {
  scrollProgress: RefObject<{ current: number }>;
  introProgress: RefObject<{ current: number }>;
  imageUrl?: string;
}

export default function LivingViewCanvas({
  scrollProgress,
  introProgress,
  imageUrl = '/okna-center-demo/_next/static/media/vladivostok-real-window.385d2c3a.jpg'
}: LivingViewCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isMobileRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check device capability
    isMobileRef.current = window.innerWidth < 768;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 2. WebGL Renderer with graceful fallback
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        powerPreference: 'high-performance',
        antialias: true,
        alpha: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileRef.current ? 1.5 : 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
    } catch {
      console.warn('WebGL initialization failed, using CSS fallback');
      return;
    }

    // 3. Texture Loading with direct fallback handling
    const textureLoader = new THREE.TextureLoader();
    const imageSrc = imageUrl.startsWith('/') ? imageUrl : `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${imageUrl}`;
    
    const texture = textureLoader.load(imageSrc, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      if (material) {
        material.uniforms.uTexture.value = tex;
        material.uniforms.uHasTexture.value = 1.0;
      }
    });

    // 4. Custom GLSL Depth & Atmosphere Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float uHasTexture;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uScroll;
      uniform float uIntro;
      uniform vec2 uResolution;
      uniform vec2 uImageRes;
      uniform float uIsMobile;
      varying vec2 vUv;

      // Cover scaling math to preserve aspect ratio without stretching
      vec2 getCoverUv(vec2 uv, vec2 res, vec2 texRes) {
        float screenRatio = res.x / res.y;
        float imageRatio = texRes.x / texRes.y;
        vec2 newUv = uv;
        if (screenRatio > imageRatio) {
          float scale = screenRatio / imageRatio;
          newUv.y = (uv.y - 0.5) / scale + 0.5;
        } else {
          float scale = imageRatio / screenRatio;
          newUv.x = (uv.x - 0.5) / scale + 0.5;
        }
        return newUv;
      }

      void main() {
        vec2 baseUv = getCoverUv(vUv, uResolution, uImageRes);

        // Natural depth approximation:
        // Sky (top) is far depth (~0.1), Golden Horn Bridge (center) is mid depth (~0.5), bottom is near (~0.9)
        float depth = clamp(baseUv.y * 1.1 - 0.1, 0.05, 0.95);

        // Living subtle camera breathing & depth parallax
        float breathX = sin(uTime * 0.4) * 0.003;
        float breathY = cos(uTime * 0.3) * 0.002;
        
        vec2 parallax = uMouse * (depth * 0.025 + 0.005) + vec2(breathX, breathY);

        // Scroll zoom transition (camera floating into the city)
        float zoom = 1.0 - (uScroll * 0.15) - ((1.0 - uIntro) * 0.04);
        vec2 centeredUv = (baseUv - 0.5) * zoom + 0.5;
        
        // Displaced UV with chromatic aberration on glass highlights
        vec2 displacedUv = centeredUv - parallax;
        
        float rOffset = 0.0015 * (1.0 - depth) * length(uMouse);
        vec4 colR = texture2D(uTexture, displacedUv + vec2(rOffset, 0.0));
        vec4 colG = texture2D(uTexture, displacedUv);
        vec4 colB = texture2D(uTexture, displacedUv - vec2(rOffset, 0.0));
        
        vec4 color = vec4(colR.r, colG.g, colB.b, 1.0);

        // Atmospheric maritime haze & golden twilight bloom
        float haze = sin(vUv.x * 3.0 + uTime * 0.2) * 0.02 + sin(vUv.y * 2.0 - uTime * 0.15) * 0.02;
        vec3 hazeColor = vec3(0.7, 0.9, 1.0);
        
        // Gentle living mist over bay water
        color.rgb = mix(color.rgb, hazeColor, haze * (1.0 - depth) * 0.35 * uIntro);

        // Glass reflection sheen passing subtly
        float reflection = smoothstep(0.3, 0.7, sin(vUv.x * 2.0 - vUv.y * 1.5 + uTime * 0.15 + uMouse.x * 2.0));
        color.rgb += vec3(0.06, 0.12, 0.18) * reflection * depth;

        // Intro fade & contrast polish
        color.rgb = color.rgb * (0.85 + uIntro * 0.2);

        gl_FragColor = color;
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uHasTexture: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uIntro: { value: 0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uImageRes: { value: new THREE.Vector2(1920, 1080) },
        uIsMobile: { value: isMobileRef.current ? 1.0 : 0.0 },
      },
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // 5. Mouse Move Handler with smooth dampening
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      isMobileRef.current = width < 768;
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileRef.current ? 1.5 : 2));
      
      material.uniforms.uResolution.value.set(width, height);
      material.uniforms.uIsMobile.value = isMobileRef.current ? 1.0 : 0.0;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 7. Animation Loop (60 FPS with lerp damping)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uScroll.value = scrollProgress.current?.current ?? 0;
      material.uniforms.uIntro.value = introProgress.current?.current ?? 0;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [imageUrl, introProgress, scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ overflow: 'hidden' }}
    />
  );
}
