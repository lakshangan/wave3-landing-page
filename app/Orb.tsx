import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl';


export default function Orb({ hue = 0, hoverIntensity = 0.2, rotateOnHover = true, forceHoverState = false }) {
  const ctnDom = useRef<HTMLDivElement>(null);

  const vert = `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = `
    precision highp float;
    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    varying vec2 vUv;
    // ... shader code omitted for brevity ...
    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = vec4(0.0);
      gl_FragColor = col;
    }
  `;

  useEffect(() => {
  const container = ctnDom.current;
  if (!container) return;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
  (container as HTMLDivElement).appendChild(gl.canvas);
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        hue: { value: hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });
    function resize() {
      if (!container) return;
      const dpr = window.devicePixelRatio || 1;
      const width = (container as HTMLDivElement).clientWidth;
      const height = (container as HTMLDivElement).clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + 'px';
      gl.canvas.style.height = height + 'px';
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();
    let targetHover = 0;
    let lastTime = 0;
    let currentRot = 0;
    const rotationSpeed = 0.3;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (container as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      const size = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const uvX = ((x - centerX) / size) * 2.0;
      const uvY = ((y - centerY) / size) * 2.0;
      if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {
        targetHover = 1;
      } else {
        targetHover = 0;
      }
    };
    const handleMouseLeave = () => {
      targetHover = 0;
    };
  (container as HTMLDivElement).addEventListener('mousemove', handleMouseMove);
  (container as HTMLDivElement).addEventListener('mouseleave', handleMouseLeave);
  let rafId: number;
  const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      const dt = (t - lastTime) * 0.001;
      lastTime = t;
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hue;
      program.uniforms.hoverIntensity.value = hoverIntensity;
      const effectiveHover = forceHoverState ? 1 : targetHover;
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;
      if (rotateOnHover && effectiveHover > 0.5) {
        currentRot += dt * rotationSpeed;
      }
      program.uniforms.rot.value = currentRot;
      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      (container as HTMLDivElement).removeEventListener('mousemove', handleMouseMove);
      (container as HTMLDivElement).removeEventListener('mouseleave', handleMouseLeave);
      (container as HTMLDivElement).removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);
  return <div ref={ctnDom} className="orb-container" />;
}
