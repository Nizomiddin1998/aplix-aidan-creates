"use client";

import { motion } from "framer-motion";

const LOGOS = [
  { name: "base", icon: "⬡" },
  { name: "Shape", icon: "◈" },
  { name: "Audlabs", icon: "◎" },
  { name: "Atlas", icon: "❋" },
  { name: "Astro", icon: "✦" },
  { name: "Imagine AI", icon: "◉" },
];

const DOUBLED = [...LOGOS, ...LOGOS, ...LOGOS];

export function LogoCloud() {
  return (
    <section className="py-14 border-t border-b border-white/[0.07] overflow-hidden">
      <div className="container-main text-center mb-6">
        <p className="label">Powering the world&apos;s best teams</p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="fade-left" />
        <div className="fade-right" />

        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-10 w-max"
        >
          {DOUBLED.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-white/35 text-sm font-medium whitespace-nowrap select-none px-3 transition-colors duration-200"
            >
              <span className="text-lg opacity-50">{logo.icon}</span>
              {logo.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
