'use client';

import { useEffect, useRef } from 'react';
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';
import styles from './SilkAurora.module.css';

const vertex = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uMouseSmooth;
uniform vec2 uVelocity;
uniform float uMotion;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uColorD;
uniform vec3 uColorE;

varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 6; i++) {
    value += amp * noise(p);
    p *= 2.0;
    amp *= 0.52;
  }
  return value;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

float silkFold(vec2 uv, vec2 origin, float angle, float scale, float thickness, float speed, float phase) {
  vec2 p = uv - origin;
  p *= rot(angle);

  // Enhanced depth with multiple wave layers
  float drift = sin(uTime * speed + p.x * 2.25 + phase) * 0.082;
  float wind = sin(uTime * speed * 0.76 + p.x * 1.55 - phase * 0.4) * 0.058;
  float micro = (fbm(vec2(p.x * scale * 1.18, p.y * scale * 0.48 + uTime * 0.045)) - 0.5) * 0.05;
  
  // Add depth layers for more dimensional folds
  float depth1 = sin(p.x * 3.2 + uTime * 0.3 + phase) * 0.025;
  float depth2 = cos(p.x * 4.8 - uTime * 0.2 + phase * 1.3) * 0.018;

  float ridge = abs(p.y + drift + wind + micro + depth1 + depth2);

  // Enhanced sharpness with depth
  float band = smoothstep(thickness, thickness * 0.20, ridge);
  
  // Add subtle shadow for depth perception
  float shadow = smoothstep(thickness * 1.5, thickness * 0.5, ridge) * 0.3;
  band = band + shadow * (1.0 - band);

  // spread more horizontally
  float taper = smoothstep(1.55, -0.38, p.x);

  return band * taper;
}

float silkHighlight(vec2 uv, vec2 origin, float angle, float scale, float phase) {
  vec2 p = uv - origin;
  p *= rot(angle);

  // Enhanced highlights with depth
  float fold1 = sin(p.x * scale + uTime * 0.46 + phase);
  float fold2 = sin(p.x * scale * 0.62 - uTime * 0.25 + phase * 1.5);
  float fold3 = cos(p.x * scale * 0.85 + uTime * 0.35 + phase * 0.8) * 0.5;
  
  float ridge = exp(-abs(p.y + fold1 * 0.11 + fold2 * 0.072 + fold3 * 0.045) * 29.0);

  return ridge;
}

vec2 mouseField(vec2 uv) {
  vec2 m = uMouseSmooth;
  vec2 d = uv - m;
  float dist = length(d);

  // Enhanced ripple with depth
  float ripple = exp(-dist * 6.2);
  float ring = sin(dist * 26.0 - uTime * 7.0);
  float wave = 0.5 + 0.5 * ring;
  float vel = clamp(length(uVelocity) * 34.0, 0.0, 1.0);
  
  // Add depth layers to ripples
  float ripple2 = exp(-dist * 4.5) * 0.6;
  float ring2 = sin(dist * 18.0 - uTime * 5.5);
  float wave2 = 0.5 + 0.5 * ring2;
  
  // Third layer for more depth
  float ripple3 = exp(-dist * 8.5) * 0.4;
  float ring3 = sin(dist * 32.0 - uTime * 8.5);
  float wave3 = 0.5 + 0.5 * ring3;

  vec2 dir = normalize(d + 0.0001);
  vec2 swirl = vec2(-dir.y, dir.x);

  vec2 offset =
    dir * ripple * wave * 0.040 * uMotion +
    swirl * ripple * vel * 0.034 * uMotion +
    dir * ripple2 * wave2 * 0.025 * uMotion +
    swirl * ripple3 * wave3 * 0.015 * uMotion;

  return offset;
}

void main() {
  vec2 uv = vUv;
  vec2 displacedUv = uv + mouseField(uv);

float veil1 = silkFold(displacedUv, vec2(0.73, 0.10), -0.76, 6.1, 0.36, 0.40, 0.4);
float veil2 = silkFold(displacedUv, vec2(0.58, 0.26), -1.02, 5.3, 0.31, 0.34, 1.4);
float veil3 = silkFold(displacedUv, vec2(0.86, 0.06), -0.44, 5.8, 0.40, 0.27, 2.1);
float veil4 = silkFold(displacedUv, vec2(0.28, 0.18), -0.12, 4.9, 0.43, 0.22, 2.8);
float veil5 = silkFold(displacedUv, vec2(0.47, 0.14), -0.62, 5.0, 0.24, 0.31, 3.6);

float hi1 = silkHighlight(displacedUv, vec2(0.73, 0.10), -0.76, 8.6, 0.2);
float hi2 = silkHighlight(displacedUv, vec2(0.58, 0.26), -1.02, 7.7, 1.2);
float hi3 = silkHighlight(displacedUv, vec2(0.86, 0.06), -0.44, 7.5, 2.0);
float hi4 = silkHighlight(displacedUv, vec2(0.28, 0.18), -0.12, 6.5, 3.1);
float hi5 = silkHighlight(displacedUv, vec2(0.47, 0.14), -0.62, 7.1, 4.0);

  float bodyNoise = fbm(vec2(displacedUv.x * 2.1, displacedUv.y * 1.7 + uTime * 0.03));
  float softFlow = fbm(vec2(displacedUv.x * 1.15 - uTime * 0.02, displacedUv.y * 1.55));
  float flowMix = mix(bodyNoise, softFlow, 0.55);

  vec3 col = vec3(0.02, 0.012, 0.012);

 vec3 veilCol1 = mix(uColorA, uColorB, clamp(flowMix * 1.1, 0.0, 1.0));
vec3 veilCol2 = mix(uColorB, uColorC, clamp(flowMix * 1.0, 0.0, 1.0));
vec3 veilCol3 = mix(uColorC, uColorD, clamp(flowMix * 0.95, 0.0, 1.0));
vec3 veilCol4 = mix(uColorD, uColorE, clamp(flowMix * 0.9, 0.0, 1.0));
vec3 veilCol5 = mix(uColorA, uColorD, clamp(flowMix * 1.05, 0.0, 1.0));

col += veilCol1 * veil1 * 1.02;
col += veilCol2 * veil2 * 0.98;
col += veilCol3 * veil3 * 1.00;
col += veilCol4 * veil4 * 0.66;
col += veilCol5 * veil5 * 0.58;

col += vec3(1.30, 0.42, 0.18) * hi1 * veil1 * 0.86;
col += vec3(1.18, 0.18, 0.16) * hi2 * veil2 * 0.74;
col += vec3(1.24, 0.55, 0.22) * hi3 * veil3 * 0.84;
col += vec3(0.82, 0.18, 0.12) * hi4 * veil4 * 0.42;
col += vec3(1.08, 0.34, 0.16) * hi5 * veil5 * 0.36;

  float topBloom = smoothstep(1.18, 0.0, uv.y);
  float rightHot = exp(-distance(uv, vec2(0.77, 0.08)) * 4.0);
  float centerHot = exp(-distance(uv, vec2(0.64, 0.42)) * 2.9);
  float leftFill = exp(-distance(uv, vec2(0.28, 0.26)) * 2.2);
  float leftUpper = exp(-distance(uv, vec2(0.18, 0.12)) * 2.8);

  col += vec3(0.88, 0.16, 0.10) * topBloom * 0.22;
  col += vec3(1.0, 0.26, 0.14) * rightHot * 0.62;
  col += vec3(0.72, 0.05, 0.10) * centerHot * 0.38;
  col += vec3(0.34, 0.03, 0.04) * leftFill * 0.52;
  col += vec3(0.20, 0.02, 0.03) * leftUpper * 0.34;

  float leftDark = smoothstep(0.22, -0.08, uv.x) * 0.46;
  float bottomDark = smoothstep(0.82, 0.22, uv.y);
  float cornerDark = exp(-distance(uv, vec2(0.06, 0.98)) * 2.5);

  col *= 1.0 - leftDark * 0.42;
  col *= 1.0 - bottomDark * 0.62;
  col *= 1.0 - cornerDark * 0.22;

  float cursorGlow = exp(-distance(uv, uMouseSmooth) * 8.0);
  col += vec3(0.55, 0.06, 0.08) * cursorGlow * clamp(length(uVelocity) * 18.0, 0.0, 1.0);

  col = pow(col, vec3(0.92));
  col *= 1.14;

  gl_FragColor = vec4(col, 1.0);
}
`;

interface MousePosition {
  x: number;
  y: number;
}

function hexToRgb(hex: string): [number, number, number] {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Parse hex to RGB (0-255)
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  // Convert to 0-1 range for WebGL
  return [r / 255, g / 255, b / 255];
}

export default function SilkAurora(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 1.8),
      premultipliedAlpha: true,
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);

    const geometry = new Triangle(gl);

const uniforms = {
  uTime: { value: 0 },
  uResolution: { value: [root.clientWidth, root.clientHeight] },
  uMouse: { value: [1.72, 1.28] },
  uMouseSmooth: { value: [1.72, 1.28] },
  uVelocity: { value: [0, 1] },
  uMotion: { value: 2.38 },

  // vivid crimson sunset palette
  uColorA: { value: hexToRgb('#ff4800ff') },
  uColorB: { value: hexToRgb('#ff0000ff') }, 
  uColorC: { value: hexToRgb('#000000ff') }, 
  uColorD: { value: hexToRgb('#ff5900ff') },
  uColorE: { value: hexToRgb('#000000ff') }, 
};

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
    });

    const mesh = new Mesh(gl, { geometry, program });
    root.appendChild(gl.canvas);

    const target: MousePosition = { x: 1.72, y: 1.28 };
    const current: MousePosition = { x: 0.72, y: 0.28 };
    const previous: MousePosition = { x: 0.72, y: 0.28 };
    const velocity: MousePosition = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent): void => {
      const rect = root.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = 1 - (e.clientY - rect.top) / rect.height;
    };

    const onPointerLeave = (): void => {
      target.x = 0.72;
      target.y = 0.28;
    };

    const resize = (): void => {
      const width = root.clientWidth;
      const height = root.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value = [width, height];
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', resize);

    resize();

    let raf = 0;
    const render = (t: number): void => {
      raf = requestAnimationFrame(render);

      current.x += (target.x - current.x) * 0.095;
      current.y += (target.y - current.y) * 0.095;

      velocity.x += ((current.x - previous.x) - velocity.x) * 0.24;
      velocity.y += ((current.y - previous.y) - velocity.y) * 0.24;

      previous.x = current.x;
      previous.y = current.y;

      uniforms.uTime.value = t * 0.001;
      uniforms.uMouse.value = [target.x, target.y];
      uniforms.uMouseSmooth.value = [current.x, current.y];
      uniforms.uVelocity.value = [velocity.x, velocity.y];

      renderer.render({ scene: mesh });
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);

      if (gl.canvas.parentNode === root) {
        root.removeChild(gl.canvas);
      }

      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={rootRef} className={styles.root} />;
}