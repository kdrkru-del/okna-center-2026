'use client';
import { useEffect, useRef, RefObject } from 'react';
import * as THREE from 'three';

interface VolumetricLightCanvasProps {
  scrollProgress: RefObject<{ current: number }>;
  introProgress: RefObject<{ current: number }>;
  imageUrl?: string;
}

export default function VolumetricLightCanvas({
  scrollProgress,
  introProgress,
  imageUrl = '/okna-center-demo/_next/static/media/vladivostok-real-window.385d2c3a.jpg'
}: VolumetricLightCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isMobileRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    isMobileRef.current = window.innerWidth < 768;

    // 1. Scene & Orthographic Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

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

    // 2. Texture Loading with safe edge clamping & filtering
    const textureLoader = new THREE.TextureLoader();
    const imageSrc = imageUrl.startsWith('/') ? imageUrl : `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${imageUrl}`;
    
    const texture = textureLoader.load(imageSrc, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      if (material) {
        material.uniforms.uTexture.value = tex;
        material.uniforms.uHasTexture.value = 1.0;
      }
    });

    // 3. Custom Volumetric Light & Panoramic Glazing Shader
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

      // Robust aspect ratio cover calculation
      vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 texRes) {
        float sRatio = screenRes.x / screenRes.y;
        float tRatio = texRes.x / texRes.y;
        vec2 newUv = uv;
        if (sRatio > tRatio) {
          float scale = sRatio / tRatio;
          newUv.y = (uv.y - 0.5) / scale + 0.5;
        } else {
          float scale = tRatio / sRatio;
          newUv.x = (uv.x - 0.5) / scale + 0.5;
        }
        return newUv;
      }

      // Procedural noise for air particles
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      void main() {
        // Zoom factor to eliminate any out-of-bounds edge stretching
        float zoom = 1.16;
        float maxPan = 0.06;
        float cameraPan = (uScroll - 0.5) * maxPan;
        
        vec2 centeredUv = (vUv - 0.5) / zoom + 0.5 + vec2(cameraPan, 0.0);
        vec2 baseUv = getCoverUv(centeredUv, uResolution, uImageRes);

        // Safe clamp to ensure pristine edges
        baseUv = clamp(baseUv, 0.002, 0.998);

        // Depth parallax
        float depth = clamp(baseUv.y * 1.1 - 0.05, 0.05, 0.95);
        vec2 parallax = uMouse * (depth * 0.015 + 0.004);
        vec2 finalUv = clamp(baseUv - parallax, 0.001, 0.999);

        // Sample scenic city view
        vec4 sceneColor = texture2D(uTexture, finalUv);

        // Progressive light entrance (Intro 0.0 -> 1.0)
        float lightIntensity = smoothstep(0.02, 1.0, uIntro);

        // Dynamic Time-of-Day Temperature shift with scroll
        vec3 morningTint  = vec3(0.88, 0.96, 1.06);
        vec3 dayTint      = vec3(1.0, 1.0, 1.0);
        vec3 goldenTint   = vec3(1.06, 0.97, 0.88);
        vec3 twilightTint = vec3(0.92, 0.95, 1.05);

        vec3 currentTint = mix(
          mix(morningTint, dayTint, smoothstep(0.0, 0.35, uScroll)),
          mix(goldenTint, twilightTint, smoothstep(0.7, 1.0, uScroll)),
          smoothstep(0.35, 0.7, uScroll)
        );

        vec3 color = sceneColor.rgb * currentTint;

        // =========================================================================
        // VOLUMETRIC LIGHT SHAFT
        // =========================================================================
        float beamPos = (vUv.x * 0.65 + vUv.y * 0.45) - (0.42 + uScroll * 0.15);
        float beamWidth = 0.38 + sin(uTime * 0.2) * 0.02;
        float beamMask = smoothstep(beamWidth, 0.0, abs(beamPos));

        // Atmospheric dust particles in light ray
        vec2 dustUv = vUv * 7.0 + vec2(uTime * 0.04, -uTime * 0.06);
        float dust = noise(dustUv) * noise(dustUv * 1.8 + 1.2);
        float dustMotes = smoothstep(0.48, 0.82, dust) * beamMask * 0.35;

        vec3 beamColor = mix(vec3(0.92, 0.96, 1.0), vec3(1.0, 0.94, 0.85), smoothstep(0.3, 0.8, uScroll));
        vec3 volumetricLight = (beamColor * beamMask * 0.28 + beamColor * dustMotes) * lightIntensity;
        color += volumetricLight;

        // =========================================================================
        // POLISHED FLOOR REFLECTION SHEEN
        // =========================================================================
        float floorMask = smoothstep(0.68, 0.98, vUv.y);
        vec2 floorReflectUv = vec2(finalUv.x, clamp(1.0 - (finalUv.y * 0.38), 0.001, 0.999));
        vec4 floorReflection = texture2D(uTexture, floorReflectUv);
        vec3 floorColor = floorReflection.rgb * vec3(0.35, 0.45, 0.55) * floorMask * lightIntensity * 0.4;
        color += floorColor;

        // Start from atmospheric darkness and open with pure light
        float startDarkness = mix(0.15, 1.0, lightIntensity);
        color *= startDarkness;

        gl_FragColor = vec4(color, 1.0);
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

    // 4. Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Resize
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

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uScroll.value = scrollProgress.current?.current ?? 0;
      material.uniforms.uIntro.value = introProgress.current?.current ?? 0;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

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
