"use client";

import { useEffect, useRef } from "react";

/* ── CONFIG ─────────────────────────────────────────────── */
const STAR_COUNT = 90;
const SHOOTING_STAR_COUNT = 8;

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  timer: number;
  delay: number;
  tailLength: number;
}

/* ── COMPONENT ──────────────────────────────────────────── */
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    /* ── Resize handler ─────────────────────────────────── */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w-100}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Generate stars ─────────────────────────────────── */
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * w - w * 0.1,
      y: Math.random() * h,
      size: Math.random() * 1.4 + 0.1,
      opacity: Math.random() * 0.5 + 0.15,
      twinkleSpeed: Math.random() * 0.003 + 0.001,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    /* ── Generate shooting stars ─────────────────────────── */
    const shootingStars: ShootingStar[] = Array.from(
      { length: SHOOTING_STAR_COUNT },
      () => ({
        x: 0,
        y: 0,
        length: Math.random() * 50 + 60,
        speed: Math.random() * 4 + 3,
        angle: (Math.PI / 4) * (0.8 + Math.random() * 0.6), // ~35-55 degrees
        opacity: 0,
        active: false,
        timer: 0,
        delay: Math.random() * 6000 + 3000, // 3-9s between appearances
        tailLength: Math.random() * 40 + 60,
      }),
    );

    /* ── Activate a shooting star ─────────────────────── */
    const activateShootingStar = (s: ShootingStar) => {
      s.active = true;
      s.opacity = 0.9;
      // Start from top-right area
      s.x = Math.random() * w * 0.6 + w * 0.09;
      s.y = Math.random() * h * 0.3;
      s.timer = 0;
    };

    /* ── Animation loop ─────────────────────────────────── */
    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, w, h);

      /* Draw static + twinkling stars */
      for (const star of stars) {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
        const alpha = star.opacity * (0.4 + twinkle * 0.2);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      /* Draw + update shooting stars */
      for (const s of shootingStars) {
        if (!s.active) {
          s.timer++;
          if (s.timer > s.delay / 16) {
            activateShootingStar(s);
          }
          continue;
        }

        // Move
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.timer++;

        // Fade in then out
        if (s.timer < 10) {
          s.opacity = (s.timer / 10) * 0.9;
        } else if (s.timer > 40) {
          s.opacity = Math.max(0, s.opacity - 0.03);
        }

        // Draw tail
        const tailX = s.x - Math.cos(s.angle) * s.tailLength;
        const tailY = s.y - Math.sin(s.angle) * s.tailLength;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(0.7, `rgba(255, 255, 255, ${s.opacity * 0.3})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        // Deactivate when off-screen or faded
        if (s.x > w + 50 || s.y > h + 50 || s.opacity <= 0) {
          s.active = false;
          s.timer = 0;
          s.delay = Math.random() * 6000 + 3000;
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
