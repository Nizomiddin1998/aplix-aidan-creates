"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera ──────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 2;

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // ── Particle positions ───────────────────────────────────────────────────
    const COUNT = 3000;

    const basePos = new Float32Array(COUNT * 3); // resting sphere positions
    const currPos = new Float32Array(COUNT * 3); // animated positions
    const vel = new Float32Array(COUNT * 3); // scatter velocities
    const colorsArr = new Float32Array(COUNT * 3); // per-particle RGB

    // ── Fibonacci golden-angle spiral → evenly-spaced spiral rings on sphere ──
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ≈ 2.39996 rad

    for (let i = 0; i < COUNT; i++) {
      const yCoord = 1 - (i / (COUNT - 1)) * 2; // top → bottom
      const radius = Math.sqrt(1 - yCoord * yCoord); // ring radius at y
      const theta = GOLDEN_ANGLE * i; // golden angle step

      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);
      const y = yCoord;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;
      currPos[i * 3] = x;
      currPos[i * 3 + 1] = y;
      currPos[i * 3 + 2] = z;

      // Pure white — matching Aplix exactly
      colorsArr[i * 3] = 1.0;
      colorsArr[i * 3 + 1] = 1.0;
      colorsArr[i * 3 + 2] = 1.0;
    }

    const geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(currPos, 3);
    const colAttr = new THREE.BufferAttribute(colorsArr, 3);
    geometry.setAttribute("position", posAttr);
    geometry.setAttribute("color", colAttr);

    // ── Particle texture: soft circular glow ────────────────────────────────
    const canvas2d = document.createElement("canvas");
    canvas2d.width = canvas2d.height = 130;
    const ctx = canvas2d.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.5)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const particleTex = new THREE.CanvasTexture(canvas2d);

    const material = new THREE.PointsMaterial({
      size: 0.042, // bigger — matches Aplix particle size
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    // ── Central warm glow (sprite) ───────────────────────────────────────────
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 400;
    const gctx = glowCanvas.getContext("2d")!;
    const gg = gctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    gg.addColorStop(0, "rgba(200, 60, 0, 0.47)");
    gg.addColorStop(0.5, "rgba(180, 40, 0, 0.3)");
    gg.addColorStop(0.8, "rgba(120, 20, 0, 0.1)");
    gg.addColorStop(1, "rgba(0, 0, 0, 0)");
    gctx.fillStyle = gg;
    gctx.fillRect(0, 0, 400, 400);
    const glowTex = new THREE.CanvasTexture(glowCanvas);

    const glowMat = new THREE.SpriteMaterial({
      map: glowTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });
    const glowSprite = new THREE.Sprite(glowMat);
    glowSprite.scale.set(1.6, 1.6, 1);
    scene.add(glowSprite);

    // ── Drag-to-rotate state ─────────────────────────────────────────────────
    let isDragging = false;
    let prevX = 0,
      prevY = 0;
    let rotVX = 0,
      rotVY = 0;
    let idleFrames = 0;

    const AUTO_X = 0.0006;
    const AUTO_Y = 0.0013;
    const INERTIA = 0.92;

    // ── Hover scatter state ──────────────────────────────────────────────────
    const mouse3D = new THREE.Vector2(99999, 99999);
    const SCATTER_R = 0.22;
    const SCATTER_F = 0.055;
    const RETURN_SPD = 0.045;
    const DAMP = 0.86;

    // ── Helpers ──────────────────────────────────────────────────────────────
    const invMat = new THREE.Matrix4();
    const rayOriginL = new THREE.Vector3();
    const rayDirL = new THREE.Vector3();
    const localCursor = new THREE.Vector3();

    function toNDC(clientX: number, clientY: number) {
      const r = container.getBoundingClientRect();
      return new THREE.Vector2(
        ((clientX - r.left) / r.width) * 2 - 1,
        -((clientY - r.top) / r.height) * 2 + 1,
      );
    }

    // ── Events ────────────────────────────────────────────────────────────────
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      rotVX = rotVY = 0;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse3D.copy(toNDC(e.clientX, e.clientY));
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotVY = dx * 0.006;
      rotVX = dy * 0.006;
      mesh.rotation.y += rotVY;
      mesh.rotation.x += rotVX;
      glowSprite.rotation.y += rotVY;
      glowSprite.rotation.x += rotVX;
      prevX = e.clientX;
      prevY = e.clientY;
      idleFrames = 0;
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerLeave = () => {
      mouse3D.set(99999, 99999);
      if (isDragging) {
        isDragging = false;
      }
    };

    container.style.userSelect = "none";
    container.style.touchAction = "none";
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    let animId: number;
    const raycaster = new THREE.Raycaster();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-rotate + inertia
      if (!isDragging) {
        idleFrames++;
        const blend = Math.min(idleFrames / 90, 1);
        rotVX *= INERTIA;
        rotVY *= INERTIA;
        const dX = rotVX + AUTO_X * blend;
        const dY = rotVY + AUTO_Y * blend;
        mesh.rotation.x += dX;
        mesh.rotation.y += dY;
        glowSprite.rotation.x += dX;
        glowSprite.rotation.y += dY;
      }

      // Scatter: only compute hit when cursor is inside canvas
      let hitFound = false;
      if (mouse3D.x < 9000) {
        raycaster.setFromCamera(mouse3D, camera);
        invMat.copy(mesh.matrixWorld).invert();

        rayOriginL.copy(raycaster.ray.origin).applyMatrix4(invMat);
        rayDirL
          .copy(raycaster.ray.direction)
          .transformDirection(invMat)
          .normalize();

        // Ray-sphere intersection: |O + t*D|^2 = 1
        const b2 = rayOriginL.dot(rayDirL);
        const disc = b2 * b2 - (rayOriginL.lengthSq() - 1.0);

        if (disc >= 0) {
          const tHit = -b2 - Math.sqrt(disc);
          if (tHit > 0) {
            localCursor.copy(rayOriginL).addScaledVector(rayDirL, tHit);
            hitFound = true;
          }
        }
      }

      // Always run physics every frame — scatter conditionally, spring always
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;

        // 1. Scatter force (only when cursor hits sphere surface)
        if (hitFound) {
          const cx = currPos[i3] - localCursor.x;
          const cy = currPos[i3 + 1] - localCursor.y;
          const cz = currPos[i3 + 2] - localCursor.z;
          const dist = Math.sqrt(cx * cx + cy * cy + cz * cz);
          if (dist < SCATTER_R && dist > 0) {
            const force = (SCATTER_R - dist) / SCATTER_R;
            vel[i3] += (cx / dist) * SCATTER_F * force;
            vel[i3 + 1] += (cy / dist) * SCATTER_F * force;
            vel[i3 + 2] += (cz / dist) * SCATTER_F * force;
          }
        }

        // 2. Spring — always return to base position
        vel[i3] += (basePos[i3] - currPos[i3]) * RETURN_SPD;
        vel[i3 + 1] += (basePos[i3 + 1] - currPos[i3 + 1]) * RETURN_SPD;
        vel[i3 + 2] += (basePos[i3 + 2] - currPos[i3 + 2]) * RETURN_SPD;

        // 3. Damping
        vel[i3] *= DAMP;
        vel[i3 + 1] *= DAMP;
        vel[i3 + 2] *= DAMP;

        // 4. Move
        currPos[i3] += vel[i3];
        currPos[i3 + 1] += vel[i3 + 1];
        currPos[i3 + 2] += vel[i3 + 2];
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose();
      material.dispose();
      glowMat.dispose();
      particleTex.dispose();
      glowTex.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    />
  );
}
