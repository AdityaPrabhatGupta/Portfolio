// HeroBackground3D.jsx
// Purpose : Renders a high-performance interactive 3D particle background
//           for the Hero section using Three.js.
//           Slowly rotates and floats towards mouse movements.
//           Halts animation when off-screen.

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBackground3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height, false);

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;

    // ── Particles ──
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random coordinates in space
      positions[i]     = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom circular particle point texture simulation (low performance cost)
    const material = new THREE.PointsMaterial({
      color: 0xc8ff00,
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Mouse Interaction ──
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener('mousemove', onMouseMove);

    // ── Render loop ──
    let raf;
    let isIntersecting = true;

    const tick = () => {
      if (!isIntersecting) return;
      
      raf = requestAnimationFrame(tick);

      // Interpolate towards mouse (lerp)
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Slowly rotate points
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Apply interactive tilt
      particles.rotation.y += (targetX * 0.1 - particles.rotation.y) * 0.05;
      particles.rotation.x += (-targetY * 0.1 - particles.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    // ── Performance Control (Intersection Observer) ──
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cancelAnimationFrame(raf);
          tick();
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Initial draw
    tick();

    // ── Resize handler ──
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
}
