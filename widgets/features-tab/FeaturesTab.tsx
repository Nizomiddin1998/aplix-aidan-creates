"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const TABS = [
  {
    id: 0,
    step: "01",
    title: "Sign up and connect",
    desc: "Create an account, paste in your API key, and Aplix starts pulling in data immediately. No complex setup, no DevOps required.",
    image:
      "https://framerusercontent.com/images/9LKnnWcx8OELyDZDpkOLbWnlkk.webp",
  },
  {
    id: 1,
    step: "02",
    title: "Metrics organize themselves",
    desc: "Traffic, latency, errors, and usage patterns are automatically grouped and visualized. You get a clear picture of your API without manually building dashboards.",
    image:
      "https://framerusercontent.com/images/0m7n1838c9KN5e2GNrwCpLgSM.webp",
  },
  {
    id: 2,
    step: "03",
    title: "Act with confidence",
    desc: "Set alert thresholds, share dashboards with your team, and export reports. Aplix keeps you informed so you can move fast and fix issues early.",
    image:
      "https://framerusercontent.com/images/9LKnnWcx8OELyDZDpkOLbWnlkk.webp",
  },
];

export function FeaturesTab() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section section-border" ref={ref}>
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="label mb-1.5">How it works</p>
          <h2 className="heading-section max-w-[520px]">
            From setup to insight.{" "}
            <span className="text-faded">Faster than you expect.</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-[420px] text-sm leading-relaxed">
            Everything is designed to get you from zero to clarity with minimal
            effort.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left — tabs */}
          <div className="flex flex-col">
            {TABS.map((tab, i) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                onClick={() => setActive(tab.id)}
                className="cursor-pointer mb-1 transition-all duration-200 px-5 py-[1.4rem]"
                style={{
                  borderLeft: `2px solid ${
                    active === tab.id ? "#f54900" : "rgba(255,255,255,0.08)"
                  }`,
                  background:
                    active === tab.id ? "rgba(245,73,0,0.04)" : "transparent",
                }}
              >
                <div className="flex items-baseline gap-2.5 mb-2">
                  <span className="text-[0.7rem] font-bold text-brand tracking-widest">
                    {tab.step}
                  </span>
                  <h3
                    className="text-[0.95rem] font-semibold transition-colors duration-200"
                    style={{
                      color:
                        active === tab.id ? "#fff" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {tab.title}
                  </h3>
                </div>

                <AnimatePresence>
                  {active === tab.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-text-secondary text-sm leading-relaxed overflow-hidden"
                    >
                      {tab.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right — dynamic image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="corner-bracket hidden md:block border border-brand/20 rounded-sm overflow-hidden relative aspect-[16/10]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={TABS[active].image}
                  alt={TABS[active].title}
                  fill
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
