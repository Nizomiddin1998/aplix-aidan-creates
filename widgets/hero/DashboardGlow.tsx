"use client";

import { useEffect, useRef } from "react";

/* ── CONFIG ────────────────────────────────────────────── */
const H = 125;
const PARTICLE_COUNT = 50;

interface Particle {
  /** Angle from center-bottom */
  angle: number;
  /** Distance from center-bottom */
  dist: number;
  /** Base distance (max orbit) */
  baseDist: number;
  /** Speed of inward pull */
  speed: number;
  /** Size */
  size: number;
  /** Opacity */
  opacity: number;
  /** Trail length factor */
  trail: number;
  /** Horizontal scatter offset */
  offsetX: number;
}

export function DashboardGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    /* ── Dynamic width from parent ───────────────────────── */
    let W = canvas.parentElement?.offsetWidth ?? 900;
    let CENTER_X = W / 2;
    const CENTER_Y = H;

    const setSize = () => {
      W = canvas.parentElement?.offsetWidth ?? 900;
      CENTER_X = W / 2;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    /* ── Create particles ───────────────────────────────── */
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = -Math.PI * Math.random();
      // Increase base distance dramatically so they spawn from far edges of the screen
      const baseDist = Math.random() * 1000 + 150;
      return {
        angle,
        dist: baseDist * (0.3 + Math.random() * 0.7),
        baseDist,
        // Slower speed for more elegant fading
        speed: Math.random() * 0.05 + 0.05,
        // Smaller dots
        size: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.8 + 0.5,
        trail: Math.random() * 0.6 + 0.4,
        offsetX: (Math.random() - 0.5) * 40, // scattered -20px to +20px
      };
    });

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* ── Draw radial orange glow background ─────────── */
      const glowRadius = Math.max(W * 0.55, 450);
      const glowGrad = ctx.createRadialGradient(
        CENTER_X,
        CENTER_Y,
        0,
        CENTER_X,
        CENTER_Y,
        glowRadius,
      );
      // Very subtle, quiet dark-orange glow
      glowGrad.addColorStop(0, "rgba(245, 73, 0, 0.20)");
      glowGrad.addColorStop(0.2, "rgba(245, 73, 0, 0.10)");
      glowGrad.addColorStop(0.5, "rgba(245, 73, 0, 0.03)");
      glowGrad.addColorStop(0.8, "rgba(245, 73, 0, 0.005)");
      glowGrad.addColorStop(1, "transparent");

      ctx.save();
      // Squish the radial gradient to make it an ellipse (wider than tall)
      ctx.scale(1, 0.65);
      ctx.fillStyle = glowGrad;
      // Because we scaled Y by 0.65, we must fill an area 1 / 0.65 times taller
      ctx.fillRect(0, 0, W, H / 0.65);
      ctx.restore();

      /* ── Vertical brand gradient: soft, minimal orange at bottom ── */
      const vertGrad = ctx.createLinearGradient(0, H, 0, 0);
      vertGrad.addColorStop(0.0, "rgba(245, 73, 0, 0.25)");
      vertGrad.addColorStop(0.05, "rgba(245, 73, 0, 0.20)");
      vertGrad.addColorStop(0.12, "rgba(245, 73, 0, 0.15)");
      vertGrad.addColorStop(0.2, "rgba(245, 73, 0, 0.10)");
      vertGrad.addColorStop(0.35, "rgba(245, 73, 0, 0.05)");
      vertGrad.addColorStop(0.5, "rgba(245, 73, 0, 0.02)");
      vertGrad.addColorStop(0.7, "rgba(245, 73, 0, 0.005)");
      vertGrad.addColorStop(1.0, "transparent");
      ctx.fillStyle = vertGrad;
      ctx.fillRect(0, 0, W, H);

      // Removed the ugly horizGrad destination-out completely.

      /* ── Draw converging particles ─────────────────── */
      for (const p of particles) {
        // Move inward
        p.dist -= p.speed;

        // Reset when too close to center
        if (p.dist < 5) {
          p.baseDist = Math.random() * 1000 + 150;
          p.dist = p.baseDist;
          p.angle = -Math.PI * Math.random();
          p.opacity = Math.random() * 0.7 + 0.3;
          p.offsetX = (Math.random() - 0.5) * 80; // wider center scatter
        }

        // Position
        const targetX = CENTER_X + p.offsetX;
        const x = targetX + Math.cos(p.angle) * p.dist;
        const y = CENTER_Y + Math.sin(p.angle) * p.dist;

        // Skip if outside canvas
        if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;

        // Fade as they get closer to center, keep relatively bright
        const distRatio = p.dist / p.baseDist;
        const alpha = p.opacity * (0.3 + distRatio * 0.7);

        // Draw trail (line from particle toward center)
        const trailLen = p.trail * 20 * (1 - distRatio); // Longer trail factor
        if (trailLen > 1) {
          const tx = x - Math.cos(p.angle) * trailLen * -1;
          const ty = y - Math.sin(p.angle) * trailLen * -1;

          const trailGrad = ctx.createLinearGradient(tx, ty, x, y);
          trailGrad.addColorStop(0, `rgba(255, 255, 255, 0)`);
          trailGrad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.5})`);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(x, y);
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = p.size * 0.7;
          ctx.stroke();
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      /* ── Brand glow line right at the bottom edge ───── */
      // This is the intense, sharp core line seen in the target design
      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0, "transparent");
      lineGrad.addColorStop(0.2, "rgba(255, 255, 255, 0.0)");
      lineGrad.addColorStop(0.35, "rgba(255, 255, 255, 0.4)");
      lineGrad.addColorStop(0.45, "rgba(255, 255, 255, 0.8)");
      lineGrad.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
      lineGrad.addColorStop(0.55, "rgba(255, 255, 255, 0.8)");
      lineGrad.addColorStop(0.65, "rgba(255, 255, 255, 0.4)");
      lineGrad.addColorStop(0.8, "rgba(255, 255, 255, 0.0)");
      lineGrad.addColorStop(1, "transparent");

      // Draw a highly intense 1px core line
      ctx.fillStyle = lineGrad;
      ctx.fillRect(0, H - 1, W, 1);

      // Draw a thicker (3px) orange softer blur under it
      const softLineGrad = ctx.createLinearGradient(0, 0, W, 0);
      softLineGrad.addColorStop(0, "transparent");
      softLineGrad.addColorStop(0.3, "rgba(255, 255, 255, 0)");
      softLineGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
      softLineGrad.addColorStop(0.7, "rgba(255, 255, 255, 0)");
      softLineGrad.addColorStop(1, "transparent");

      ctx.fillStyle = softLineGrad;
      ctx.fillRect(0, H - 3, W, 3);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <div
      className="absolute left-1/2 -translate-x-[50%] bottom-[100%] w-[815px] pointer-events-none z-10"
      style={{
        height: H,
        /* Completely flat bottom edge, fades smoothly to the top and sides */
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        WebkitMaskComposite: "source-in",
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
