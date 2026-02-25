"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Feature1 from "@/public/images/features/feature-1.webp";
import Feature2 from "@/public/images/features/feature-2.webp";
import Feature3 from "@/public/images/features/feature-3.webp";

const TABS = [
  {
    id: 0,
    icon: "/images/features/tab-icon-1.svg",
    title: "Sign up and connect",
    desc: "Create an account, paste in your API key, and Aplix starts pulling in data immediately. No complex setup, no DevOps required.",
    image: Feature1,
  },
  {
    id: 1,
    icon: "/images/features/tab-icon-2.svg",
    title: "Metrics organize themselves",
    desc: "Traffic, latency, errors, and usage patterns are automatically grouped and visualized. You get a clear picture of your API without manually building dashboards.",
    image: Feature2,
  },
  {
    id: 2,
    icon: "/images/features/tab-icon-3.svg",
    title: "Act with confidence",
    desc: "Set alert thresholds, share dashboards with your team, and export reports. Aplix keeps you informed so you can move fast and fix issues early.",
    image: Feature3,
  },
];

export function FeaturesTab() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TABS.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  return (
    <section className="section" ref={ref}>
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <h2 className="heading-section">
                From setup to insight.
                <br />
                Faster than you expect.
              </h2>
              <p className="text-text-secondary text-xl leading-relaxed max-w-[400px]">
                Everything is designed to get you from&nbsp; zero to clarity
                with minimal effort.
              </p>
            </motion.div>

            {/* Tab list */}
            <div className="flex flex-col gap-6">
              {TABS.map((tab, i) => {
                const isActive = active === tab.id;
                return (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    onClick={() => {
                      setActive(tab.id);
                      startInterval();
                    }}
                    className="flex items-center gap-4 px-3 py-3 cursor-pointer transition-all duration-200"
                    style={{
                      borderLeft: `2px solid ${
                        isActive ? "#f54900" : "rgba(255,255,255,0.08)"
                      }`,
                    }}
                  >
                    {/* Icon box */}
                    <div
                      className="flex-shrink-0 w-[48px] h-[48px] flex items-center justify-center border transition-colors duration-200"
                      style={{
                        borderColor: isActive
                          ? "rgba(245,73,0,0.6)"
                          : "rgba(255,255,255,0.1)",
                        background: isActive
                          ? "rgba(245,73,0,0.08)"
                          : "rgba(255,255,255,0.03)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tab.icon}
                        alt={tab.title}
                        width={24}
                        height={24}
                        style={{
                          filter: isActive
                            ? "brightness(1) sepia(1) saturate(10) hue-rotate(-10deg)"
                            : "brightness(0.4)",
                          transition: "filter 0.2s ease",
                        }}
                      />
                    </div>

                    {/* Title */}
                    <span
                      className="text-[1rem] font-medium transition-colors duration-200"
                      style={{
                        color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {tab.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Switching image ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="relative w-full aspect-[4/3] overflow-hidden"
                style={{ background: "rgba(0,0,0,0.3)" }}
              >
                <Image
                  src={TABS[active].image}
                  alt={TABS[active].title}
                  fill
                  className="object-cover object-center"
                  // sizes="(max-width: 768px) 100vw, "
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
