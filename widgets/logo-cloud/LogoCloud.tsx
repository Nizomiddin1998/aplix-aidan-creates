"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

import { BaseIcon } from "@/shared/assets/logos/BaseIcon";
import { ShapeIcon } from "@/shared/assets/logos/ShapeIcon";
import { AudlabsIcon } from "@/shared/assets/logos/AudlabsIcon";
import { ImagineAIIcon } from "@/shared/assets/logos/ImagineAIIcon";
import { AtlasIcon } from "@/shared/assets/logos/AtlasIcon";
import { AstraIcon } from "@/shared/assets/logos/AstraIcon";

const LOGOS = [
  { icon: <BaseIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <ShapeIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <AudlabsIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <AtlasIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <AstraIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <ImagineAIIcon className="h-20 w-auto text-icon-gray" /> },
];

const DOUBLED = [...LOGOS, ...LOGOS, ...LOGOS];

export function LogoCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const cachedBaseX = useRef(0);

  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current) {
        // The DOM renders 3 identical sets of logos.
        // We calculate the width of EXACTLY 1 set to loop correctly.
        setContentWidth(containerRef.current.scrollWidth / 3);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  const baseX = useMotionValue(0);

  const x = useTransform(baseX, (v) => {
    if (contentWidth === 0) return "0px";
    return `${wrap(0, -contentWidth, v)}px`;
  });

  useAnimationFrame((t, delta) => {
    // Only auto-scroll when not dragging
    if (!isDragging && contentWidth > 0) {
      const moveBy = (40 * delta) / 1000;
      baseX.set(baseX.get() - moveBy);
    }
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (wrapperRef.current) {
      wrapperRef.current.setPointerCapture(e.pointerId);
    }
    setIsDragging(true);
    startX.current = e.pageX;
    cachedBaseX.current = baseX.get();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const xDiff = e.pageX - startX.current;
    baseX.set(cachedBaseX.current + xDiff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (wrapperRef.current) {
      wrapperRef.current.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <section className="py-14 overflow-hidden select-none">
      <div className="container-main mb-6">
        <p className="uppercase text-[14px] text-white/50 font-medium tracking-wider ">
          Powering the world&apos;s best teams
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="container-main">
        <div
          ref={wrapperRef}
          className={`relative overflow-hidden touch-pan-y ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="fade-left pointer-events-none" />
          <div className="fade-right pointer-events-none" />

          <motion.div
            ref={containerRef}
            style={{ x }}
            className="flex items-center gap-10 w-max"
          >
            {DOUBLED.map((logo, i) => (
              // Disable pointer events on children so they don't break pointer capturing
              // and we use the parent for drag tracking exclusively. The hover effect
              // still works because we map it differently, or we can just leave it.
              <div
                key={i}
                className="flex items-center justify-center hover:text-white transition-colors duration-300"
              >
                {logo.icon}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
