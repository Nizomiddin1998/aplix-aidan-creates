"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart } from "./components/BarChart";
import { StatTag } from "./components/StatTag";
import { CornerBracket } from "@/shared/components/CornerBracket";
import { MovingDashedBorder } from "@/shared/components/MovingDashedBorder";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const CARD_BASE = "corner-bracket bg-bg-surface  overflow-hidden relative";

export function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section" ref={ref}>
      <div className="container-main">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          custom={0}
          className="mb-10 max-w-[560px] flex flex-col gap-6"
        >
          <h2 className="heading-section">
            See what&apos;s happening.
            <br />
            As it happens.
          </h2>
          <p className="text-text-secondary  text-2xl leading-[1.3]">
            Get all the signals to maintain your API's health, speed, and
            reliability without sifting through logs or changing tools.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Card 1 — Track API health */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            custom={1}
            className={`${CARD_BASE} col-span-1 min-h-[300px] flex flex-col p-5`}
          >
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />
            <MovingDashedBorder />

            <p className="text-xl font-semibold text-brand tracking-widest uppercase mb-1.5">
              Track API health
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-5">
              Monitor traffic, response times, status codes, and error rates in
              one clear view.
            </p>
            <div className="flex-1 flex flex-col justify-end">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-sm pt-3 px-3 overflow-hidden">
                <BarChart />
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Backend at a glance */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            custom={2}
            className={`${CARD_BASE} col-span-2 min-h-[300px] p-5`}
          >
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />
            <MovingDashedBorder />
            <p className="text-xl font-semibold text-brand tracking-widest uppercase mb-1.5">
              Backend at a glance
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              Requests, performance, alerts, and usage, all summarized without
              losing detail.
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-[200px]">
              <Image
                src="https://framerusercontent.com/images/9LKnnWcx8OELyDZDpkOLbWnlkk.webp"
                alt="Dashboard overview"
                fill
                className="object-cover object-top opacity-75"
              />
              <div className="absolute inset-0 bg-surface-fade" />
            </div>
          </motion.div>

          {/* Card 3 — Spot issues early */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            custom={3}
            className={`${CARD_BASE} col-span-1 min-h-[180px] p-5`}
          >
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />
            <MovingDashedBorder />
            <p className="text-xl font-semibold text-brand tracking-widest uppercase mb-1.5">
              Spot issues early
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-5">
              Alert thresholds surface anomalies before they become customer
              problems.
            </p>
            <div className="flex gap-3 flex-wrap">
              <StatTag label="Monthly" value="$8,097" />
              <StatTag label="Yearly" value="$312,134" />
            </div>
          </motion.div>

          {/* Card 4 — Uptime */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            custom={4}
            className={`${CARD_BASE} col-span-1 min-h-[180px] p-5`}
          >
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />
            <MovingDashedBorder />
            <p className="text-xl font-semibold text-brand tracking-widest uppercase mb-1.5">
              Set it and forget it
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-5">
              Automated dashboards that update as your API grows.
            </p>
            <div className="text-4xl font-bold tracking-tightest text-brand leading-none">
              99.99%
            </div>
            <div className="text-[0.7rem] text-text-muted mt-1">Uptime SLA</div>
          </motion.div>

          {/* Card 5 — Latency */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            custom={5}
            className={`${CARD_BASE} col-span-1 min-h-[180px] p-5`}
          >
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />
            <MovingDashedBorder />
            <p className="text-xl font-semibold text-brand tracking-widest uppercase mb-1.5">
              Latency tracking
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-5">
              P50/P95/P99 breakdown across every endpoint, always fresh.
            </p>
            <div className="text-4xl font-bold tracking-tightest text-white leading-none">
              42ms
            </div>
            <div className="text-[0.7rem] text-text-muted mt-1">
              P95 latency
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
