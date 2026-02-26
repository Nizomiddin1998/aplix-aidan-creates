"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Feature1 from "@/public/images/features/feature-1.webp";
import Feature2 from "@/public/images/features/feature-2.webp";
import Feature3 from "@/public/images/features/feature-3.webp";
import { CornerBracket } from "@/shared/components/CornerBracket";
import { MovingDashedBorder } from "@/shared/components/MovingDashedBorder";
import { TabIcon1 } from "@/shared/assets/icons/TabIcon1";
import { TabIcon2 } from "@/shared/assets/icons/TabIcon2";
import { TabIcon3 } from "@/shared/assets/icons/TabIcon3";
import { JoinCornerBacket } from "@/shared/components/JoinCornerBacket";
import { SupportCards } from "./SupportCards";

const TABS = [
  {
    id: 0,
    icon: TabIcon1,
    title: "Sign up and connect",
    desc: "Create an account, paste in your API key, and Aplix starts pulling in data immediately. No complex setup, no DevOps required.",
    image: Feature1,
  },
  {
    id: 1,
    icon: TabIcon2,
    title: "Metrics organize themselves",
    desc: "Traffic, latency, errors, and usage patterns are automatically grouped and visualized. You get a clear picture of your API without manually building dashboards.",
    image: Feature2,
  },
  {
    id: 2,
    icon: TabIcon3,
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
    <section className="section flex flex-col gap-20" ref={ref}>
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
              <h2 className=" text-[40px] leading-[1.2] font-[500]">
                From setup to insight.
                <br />
                Faster than you expect.
              </h2>
              <h5 className="text-[#ffffffb3] text-[20px] leading-[1.5] max-w-[450px]">
                Everything is designed to get you from&nbsp; zero to clarity
                with minimal effort.
              </h5>
            </motion.div>

            {/* Tab list */}
            <div className="flex flex-col gap-6">
              {TABS.map((tab, i) => {
                const isActive = active === tab.id;
                return (
                  <motion.div
                    key={tab.id}
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    whileHover="hover"
                    variants={{
                      initial: { opacity: 0, x: -16 },
                      animate: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: i * 0.1, duration: 0.4 },
                      },
                    }}
                    onClick={() => {
                      setActive(tab.id);
                      startInterval();
                    }}
                    className="relative flex items-center gap-4 px-3 py-3 cursor-pointer transition-colors duration-200 group"
                    style={{}}
                  >
                    {/* Background Left Border (Inactive & Base) */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-200"
                      style={{
                        background: isActive
                          ? "transparent"
                          : "rgba(255,255,255,0.08)",
                      }}
                    />

                    {/* Active / Hover Left Border (Fills from bottom) */}
                    <motion.div
                      className="absolute left-0 bottom-0 w-[2px] bg-[#f54900]"
                      variants={{
                        initial: { height: isActive ? "100%" : "0%" },
                        hover: { height: isActive ? "100%" : "100%" },
                      }}
                      initial={false}
                      animate={{ height: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />

                    {/* Icon box */}
                    <div className="flex-shrink-0 relative w-[48px] h-[48px] flex items-center justify-center  transition-all duration-200 bg-white/10">
                      {/* Corner Brackets */}
                      <JoinCornerBacket
                        x={3}
                        y={3}
                        animateHover={isActive ? false : true}
                        color={isActive ? "#f54900" : "rgba(255,255,255,0.1)"}
                        animateHoverColor={"#f54900"}
                      />
                      {isActive && <MovingDashedBorder />}

                      {/* Icon */}
                      <motion.div
                        className="transition-colors duration-200 group-hover:text-white"
                        style={{
                          color: isActive
                            ? "#F54900"
                            : "rgba(255,255,255,0.45)",
                        }}
                      >
                        <tab.icon className="w-6 h-6" />
                      </motion.div>
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
            <div className="w-full relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center p-6 lg:p-12"
                >
                  <Image
                    src={TABS.find((t) => t.id === active)?.image || Feature1}
                    alt="Feature preview"
                    className="w-full h-auto object-contain max-h-[100%]"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      {/* ── SUPPORT CARDS ROW ── */}
      <SupportCards />
    </section>
  );
}
