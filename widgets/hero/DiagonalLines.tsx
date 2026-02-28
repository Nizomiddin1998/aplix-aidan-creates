"use client";

import { motion } from "framer-motion";

/**
 * A short glowing brand-color segment (~40px wide) that travels along the
 * top border of the dashboard from the left edge to the right edge,
 * fades in and out, then repeats.
 */
export function DiagonalLines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Top edge: left → right */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          height: "1.5px",
          width: "40px",
          background:
            "linear-gradient(to right, transparent, rgba(245,73,0,1) 50%, transparent)",
          borderRadius: "1px",
        }}
        initial={{ left: "-40px", opacity: 0 }}
        animate={{ left: ["calc(-40px)", "calc(100%)"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2.8,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 2.5,
          times: [0, 0.04, 0.96, 1],
        }}
      />

      {/* Left edge: top → bottom */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          height: "40px",
          width: "1.5px",
          background:
            "linear-gradient(to bottom, transparent, rgba(245,73,0,1) 50%, transparent)",
          borderRadius: "1px",
        }}
        initial={{ top: "-40px", opacity: 0 }}
        animate={{ top: ["calc(-40px)", "calc(100%)"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2.8,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 2.5,
          times: [0, 0.04, 0.96, 1],
        }}
      />

      {/* Bottom edge: right → left */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          height: "1.5px",
          width: "40px",
          background:
            "linear-gradient(to left, transparent, rgba(245,73,0,1) 50%, transparent)",
          borderRadius: "1px",
        }}
        initial={{ right: "-40px", opacity: 0 }}
        animate={{
          right: ["calc(-40px)", "calc(100%)"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.8,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 2.5,
          times: [0, 0.04, 0.96, 1],
        }}
      />

      {/* Right edge: bottom → top */}
      <motion.div
        style={{
          position: "absolute",
          right: 0,
          height: "40px",
          width: "1.5px",
          background:
            "linear-gradient(to top, transparent, rgba(245,73,0,1) 50%, transparent)",
          borderRadius: "1px",
        }}
        initial={{ bottom: "-40px", opacity: 0 }}
        animate={{
          bottom: ["calc(-40px)", "calc(100%)"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.8,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 2.5,
          times: [0, 0.04, 0.96, 1],
        }}
      />
    </div>
  );
}
