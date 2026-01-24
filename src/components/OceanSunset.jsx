'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const OceanSunset = () => {
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Define all presets from CodePen
    const PRESETS = {
      Sunset: {
        sunPosX: 0.0, sunPosY: 0.05, sunSize: 2.1, sunIntensity: 4.0,
        horizonColor: '#ff2200', enableClouds: true, cloudDensity: 0.6,
        cloudColor: '#ffaa00', waveHeight: 0.22, speed: 0.35,
        sssBaseColor: '#000000', sssTipColor: '#ff3300',
        reflectionStrength: 1.4, reflectionWidth: 0.05
      },
      Sunny: {
        sunPosX: 0.0, sunPosY: 0.6, sunSize: 1.0, sunIntensity: 6.0,
        horizonColor: '#00bbff', enableClouds: true, cloudDensity: 0.25,
        cloudColor: '#ffffff', waveHeight: 0.25, speed: 0.4,
        sssBaseColor: '#001a33', sssTipColor: '#0099ff',
        reflectionStrength: 3.0, reflectionWidth: 0.1
      },
      Cloudy: {
        sunPosX: 0.0, sunPosY: 0.3, sunSize: 3.0, sunIntensity: 1.5,
        horizonColor: '#667788', enableClouds: true, cloudDensity: 1.5,
        cloudColor: '#556677', waveHeight: 0.45, speed: 0.5,
        sssBaseColor: '#111520', sssTipColor: '#4a5a6a',
        reflectionStrength: 0.8, reflectionWidth: 0.3
      },
      Night: {
        sunPosX: 0.0, sunPosY: 0.3, sunSize: 0.9, sunIntensity: 3.0,
        horizonColor: '#0a0a15', enableClouds: true, cloudDensity: 0.3,
        cloudColor: '#101018', waveHeight: 0.2, speed: 0.2,
        sssBaseColor: '#000005', sssTipColor: '#8888aa',
        reflectionStrength: 2.5, reflectionWidth: 0.015
      },
      Twilight: {
        sunPosX: 0.0, sunPosY: -0.05, sunSize: 2.5, sunIntensity: 2.0,
        horizonColor: '#1a0a20', enableClouds: true, cloudDensity: 0.4,
        cloudColor: '#2a1a30', waveHeight: 0.3, speed: 0.25,
        sssBaseColor: '#050008', sssTipColor: '#6644aa',
        reflectionStrength: 1.8, reflectionWidth: 0.08
      },
      Dark: {
        sunPosX: 0.0, sunPosY: 0.15, sunSize: 0.5, sunIntensity: 4.8,
        horizonColor: '#4476ff', enableClouds: true, cloudDensity: 0.15,
        cloudColor: '#080810', waveHeight: 0.35, speed: 0.15,
        sssBaseColor: '#000002', sssTipColor: '#222233',
        reflectionStrength: 8.2, reflectionWidth: 0.5
      }
    };

    const presetNames = Object.keys(PRESETS);
    let currentPresetIndex = 0;

    // Start with Night preset
    const params = {
      style: 0, // Standard (Real) mode
      enableGrid: false,
      ...PRESETS.Night,
      cloudSpeed: 0.05,
      waveChoppiness: 2.5,
      sssStrength: 4.0,
      enableReflections: true,
      flySpeed: 0.5,
      enableFX: true,
      dustStrength: 1.0,
      flareIntensity: 1.5,
      flareGhosting: 0.8,
      flareStreak: 1.0,
      flareAngle: 140,
      haloStrength: 1.5,
      haloRadius: 0.3,
      haloSize: 0.02,
      horizonFade: 0.05,
      grainAmount: 0.0,
      grainScale: 50.0,
      vignetteStrength: 0.65
    };

    const mousePos = new THREE.Vector2(0, 0);

    // Fragment Shader (same as before - complete from CodePen)
    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMousePos;
      uniform float uStyle;
      uniform float uEnableGrid;
      uniform float uEnableClouds;
      uniform float uEnableReflections;
      uniform float uEnableFX;
      uniform float uFlareIntensity;
      uniform float uFlareGhosting;
      uniform float uFlareStreak;
      uniform float uFlareAngle;
      uniform float uCameraHeight;
      uniform float uCameraTilt;
      uniform float uWaveHeight;
      uniform float uWaveChoppiness;
      uniform float uSpeed;
      uniform float uFlySpeed;
      uniform float uSssStrength;
      uniform vec3 uSssBaseColor;
      uniform vec3 uSssTipColor;
      uniform float uSunSize;
      uniform float uSunIntensity;
      uniform float uSunPosX;
      uniform float uSunPosY;
      uniform float uReflectionStrength;
      uniform float uReflectionWidth;
      uniform float uCloudDensity;
      uniform float uCloudSpeed;
      uniform vec3 uCloudColor;
      uniform vec3 uHorizonColor;
      uniform float uHaloStrength;
      uniform float uHaloRadius;
      uniform float uHaloSize;
      uniform float uDustStrength;
      uniform float uHorizonFade;
      uniform float uVignetteStrength;
      uniform float uGrainAmount;
      uniform float uGrainScale;

      #define PI 3.14159265359

      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
          return mix(mix(hash(i+vec2(0,0)), hash(i+vec2(1,0)), f.x),
                     mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
      }

      float fbm(vec2 p) {
          float v = 0.0; float a = 0.5;
          mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
          for(int i=0; i<3; i++) { v += a * noise(p); p = rot * p * 2.0; a *= 0.5; }
          return v;
      }

      float noise3D(vec3 p) {
          vec3 i = floor(p); vec3 f = fract(p); f = f*f*(3.0-2.0*f);
          float n = dot(i, vec3(1.0, 57.0, 113.0));
          return mix(mix(mix(hash(vec2(n+0.0)), hash(vec2(n+1.0)), f.x),
                         mix(hash(vec2(n+57.0)), hash(vec2(n+58.0)), f.x), f.y),
                     mix(mix(hash(vec2(n+113.0)), hash(vec2(n+114.0)), f.x),
                         mix(hash(vec2(n+170.0)), hash(vec2(n+171.0)), f.x), f.y), f.z);
      }

      float cloudNoise(vec2 p) {
          float f = 0.0;
          f += 0.50000 * noise(p); p = p * 2.02;
          f += 0.25000 * noise(p); p = p * 2.03;
          f += 0.12500 * noise(p);
          return f;
      }

      float map(vec3 p) {
          vec2 q = p.xz * 0.35;
          float h = 0.0;
          float a = 0.6 * uWaveHeight;
          if(uWaveChoppiness > 0.1) q += vec2(fbm(q + uTime * 0.05), fbm(q)) * uWaveChoppiness;
          for(int i=0; i<4; i++) {
              float ang = float(i) * 0.6;
              vec2 dir = vec2(sin(ang), cos(ang) * 1.5); dir = normalize(dir);
              float wave = 1.0 - abs(sin(dot(q, dir) - uTime * uSpeed + float(i)));
              wave = pow(wave, 3.0); h += a * wave;
              a *= 0.5; q *= 1.8; q.x += 1.0;
          }
          return p.y - h;
      }

      vec3 getNormal(vec3 p) {
          float eps = 0.01 + uWaveHeight * 0.02;
          vec2 e = vec2(eps, 0.0);
          return normalize(vec3(map(p+e.xyy) - map(p-e.xyy), e.x * 2.0, map(p+e.yyx) - map(p-e.yyx)));
      }

      vec3 getSky(vec3 rd, vec3 sunDir, bool renderSun) {
          float sunDot = max(0.0, dot(rd, sunDir));
          vec3 zenithCol = vec3(0.0, 0.0, 0.02);
          vec3 skyCol = mix(uHorizonColor, zenithCol, pow(max(0.0,rd.y + 0.05), 0.5));

          float occlusion = 0.0;
          if (uEnableClouds > 0.5) {
              if (uCloudDensity > 0.0 && rd.y > 0.0 && rd.y < 0.45) {
                 vec2 skyUV = rd.xz / max(0.05, rd.y);
                 skyUV.x += uTime * uCloudSpeed;
                 float cl = cloudNoise(skyUV * 0.15);
                 float heightMask = smoothstep(0.0, 0.1, rd.y) * smoothstep(0.45, 0.1, rd.y);
                 float cloudIntensity = smoothstep(0.3, 0.7, cl) * heightMask * uCloudDensity;
                 skyCol = mix(skyCol, uCloudColor, cloudIntensity);
                 occlusion = cloudIntensity;
              }
          }

          float sunRadiusThreshold = 0.99 - (uSunSize * 0.03);
          float sun = (uSunSize < 0.1) ? 0.0 : smoothstep(sunRadiusThreshold, sunRadiusThreshold + 0.002, sunDot);
          float glow = (uSunSize < 0.1) ? 0.0 : pow(sunDot, 12.0 / uSunSize);
          float sunVis = 1.0 - clamp(occlusion * 1.5, 0.0, 0.9);

          vec3 sunCol = uSssTipColor * uSunIntensity * sunVis;
          skyCol += glow * sunCol * 1.5;

          if (renderSun) { skyCol += sun * sunCol * 8.0; }

          if (uEnableFX > 0.5 && uHaloStrength > 0.0) {
              float baseR = 1.0 - uHaloRadius * 0.2;
              float sizeR = uHaloSize;
              float sizeG = uHaloSize + 0.005;
              float sizeB = uHaloSize + 0.010;

              float ringR = smoothstep(sizeR, 0.0, abs(sunDot - baseR));
              float ringG = smoothstep(sizeG, 0.0, abs(sunDot - (baseR + 0.005)));
              float ringB = smoothstep(sizeB, 0.0, abs(sunDot - (baseR + 0.010)));

              vec3 haloCol = vec3(ringR, ringG, ringB);
              skyCol += haloCol * uHaloStrength * 0.5 * (1.0 - occlusion * 0.5);
          }

          return skyCol;
      }

      vec3 renderScene(vec3 ro, vec3 rd, vec3 sunDir) {
          float t = 0.0; float d = 0.0; float maxDist = 150.0;
          for(int i=0; i<100; i++) { d = map(ro + rd*t); t += d * 0.6; if(d<0.01 || t>maxDist) break; }
          vec3 col = vec3(0.0);

          if(t < maxDist) {
              vec3 p = ro + rd*t;
              vec3 n = getNormal(p);
              vec3 ref = reflect(rd, n);
              float fresnel = 0.02 + 0.98 * pow(1.0 - max(0.0, dot(n, -rd)), 5.0);

              col = uSssBaseColor * (0.002 + 0.1*max(0.0, dot(n, sunDir)));
              col = mix(col, getSky(ref, sunDir, false), fresnel * 0.95);

              float sss = pow(max(0.0, dot(n, -sunDir)), 2.0) * smoothstep(-0.2, uWaveHeight, p.y);
              col += uSssTipColor * sss * uSssStrength * 3.0;

              if (uEnableReflections > 0.5) {
                  float refDot = dot(ref, sunDir);
                  float specPower = 1.0 / max(0.0001, uReflectionWidth * uReflectionWidth);
                  float specular = pow(max(0.0, refDot), specPower);
                  col += uSssTipColor * specular * uReflectionStrength;
              }
              if(uEnableGrid > 0.5) {
                  vec2 gridUV = p.xz * 0.5;
                  float grid = step(0.97, fract(gridUV.x)) + step(0.97, fract(gridUV.y));
                  float fade = smoothstep(50.0, 0.0, t);
                  col += uSssTipColor * grid * fade * 2.0;
              }
              float hBlend = smoothstep(maxDist * (1.0 - max(0.001, uHorizonFade)), maxDist, t);
              col = mix(col, getSky(rd, sunDir, true), hBlend);
          } else {
              col = getSky(rd, sunDir, true);
          }
          return col;
      }

      vec3 filmic(vec3 x) {
        vec3 a = max(vec3(0.0), x - vec3(0.004));
        return (a * (6.2 * a + 0.5)) / (a * (6.2 * a + 1.7) + 0.06);
      }

      void main() {
        vec2 coord = gl_FragCoord.xy;
        vec2 uv = (coord * 2.0 - uResolution.xy) / uResolution.y;

        vec3 ro = vec3(0.0, uCameraHeight, uTime * (uFlySpeed * 2.0 + 1.0));
        vec3 ta = ro + vec3(0.0, uCameraTilt, 10.0);
        vec3 ww = normalize(ta - ro);
        vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
        vec3 vv = normalize(cross(uu, ww));
        vec3 sunDir = normalize(vec3(uSunPosX, uSunPosY, 1.0));
        vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.5 * ww);

        vec3 col = renderScene(ro, rd, sunDir);

        if(uEnableFX > 0.5 && uDustStrength > 0.0) {
            vec3 pDust = rd * 8.0; pDust.y -= uTime * 0.3;
            float specks = smoothstep(0.90, 1.0, noise3D(pDust));
            col += uSssTipColor * specks * uDustStrength;
        }

        col = filmic(col);
        col *= 1.0 - length(uv * uVignetteStrength);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0));
    containerRef.current.appendChild(renderer.domElement);

    // Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMousePos: { value: mousePos },
      uStyle: { value: params.style },
      uEnableGrid: { value: params.enableGrid ? 1.0 : 0.0 },
      uEnableClouds: { value: params.enableClouds ? 1.0 : 0.0 },
      uEnableReflections: { value: params.enableReflections ? 1.0 : 0.0 },
      uEnableFX: { value: params.enableFX ? 1.0 : 0.0 },
      uSunPosX: { value: params.sunPosX },
      uSunPosY: { value: params.sunPosY },
      uSunSize: { value: params.sunSize },
      uSunIntensity: { value: params.sunIntensity },
      uHorizonColor: { value: new THREE.Color(params.horizonColor) },
      uCloudDensity: { value: params.cloudDensity },
      uCloudSpeed: { value: params.cloudSpeed },
      uCloudColor: { value: new THREE.Color(params.cloudColor) },
      uWaveHeight: { value: params.waveHeight },
      uWaveChoppiness: { value: params.waveChoppiness },
      uSpeed: { value: params.speed },
      uFlySpeed: { value: params.flySpeed },
      uSssBaseColor: { value: new THREE.Color(params.sssBaseColor) },
      uSssTipColor: { value: new THREE.Color(params.sssTipColor) },
      uSssStrength: { value: params.sssStrength },
      uReflectionStrength: { value: params.reflectionStrength },
      uReflectionWidth: { value: params.reflectionWidth },
      uHaloStrength: { value: params.haloStrength },
      uHaloRadius: { value: params.haloRadius },
      uHaloSize: { value: params.haloSize },
      uDustStrength: { value: params.dustStrength },
      uHorizonFade: { value: params.horizonFade },
      uVignetteStrength: { value: params.vignetteStrength },
      uGrainAmount: { value: params.grainAmount },
      uGrainScale: { value: params.grainScale },
      uFlareIntensity: { value: params.flareIntensity },
      uFlareGhosting: { value: params.flareGhosting },
      uFlareStreak: { value: params.flareStreak },
      uFlareAngle: { value: params.flareAngle },
      uCameraHeight: { value: 4.0 },
      uCameraTilt: { value: -0.1 }
    };

    scene.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
          fragmentShader,
          uniforms
        })
      )
    );

    // Auto-switch presets with GSAP
    const switchPreset = () => {
      // Get next random preset (different from current)
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * presetNames.length);
      } while (nextIndex === currentPresetIndex);

      currentPresetIndex = nextIndex;
      const presetName = presetNames[currentPresetIndex];
      const preset = PRESETS[presetName];

      // GSAP smooth transition (3 seconds)
      gsap.to(uniforms.uSunPosX, { value: preset.sunPosX, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uSunPosY, { value: preset.sunPosY, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uSunSize, { value: preset.sunSize, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uSunIntensity, { value: preset.sunIntensity, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uCloudDensity, { value: preset.cloudDensity, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uWaveHeight, { value: preset.waveHeight, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uSpeed, { value: preset.speed, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uReflectionStrength, { value: preset.reflectionStrength, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uReflectionWidth, { value: preset.reflectionWidth, duration: 3, ease: 'power2.inOut' });

      // Animate colors
      const newHorizonColor = new THREE.Color(preset.horizonColor);
      const newCloudColor = new THREE.Color(preset.cloudColor);
      const newSssBaseColor = new THREE.Color(preset.sssBaseColor);
      const newSssTipColor = new THREE.Color(preset.sssTipColor);

      gsap.to(uniforms.uHorizonColor.value, { r: newHorizonColor.r, g: newHorizonColor.g, b: newHorizonColor.b, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uCloudColor.value, { r: newCloudColor.r, g: newCloudColor.g, b: newCloudColor.b, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uSssBaseColor.value, { r: newSssBaseColor.r, g: newSssBaseColor.g, b: newSssBaseColor.b, duration: 3, ease: 'power2.inOut' });
      gsap.to(uniforms.uSssTipColor.value, { r: newSssTipColor.r, g: newSssTipColor.g, b: newSssTipColor.b, duration: 3, ease: 'power2.inOut' });
    };

    // Start auto-switching (every 15 seconds)
    const presetInterval = setInterval(switchPreset, 15000);

    // Mouse handling
    const handleMouseMove = (event) => {
      mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    // Resize handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    // Scroll handling
    let scrollProgress = 0;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = Math.min(1, window.scrollY / scrollHeight);
      const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      const cameraHeight = 4.0 - (4.0 - 1.5) * easedProgress;
      const cameraTilt = -0.1 + (2.5 - (-0.1)) * easedProgress;
      uniforms.uCameraHeight.value = cameraHeight;
      uniforms.uCameraTilt.value = cameraTilt;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    let animationId;
    const animate = (t) => {
      const time = t * 0.001;
      uniforms.uTime.value = time;
      uniforms.uMousePos.value.set(mousePos.x, mousePos.y);
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    // Cleanup
    cleanupRef.current = () => {
      clearInterval(presetInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationId) cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <div ref={containerRef} className="ocean-sunset-container" />
  );
};

export default OceanSunset;
