"use client";

import Image from "next/image";
import { Button } from "@/shared/components/Button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const TRUST = [
  "No credit card required",
  "Setup in under 5 minutes",
  "Clean, light interface",
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      {/* Top center radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at center 20%, rgba(245,73,0,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Bottom glow behind dashboard */}
      <div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[120%] h-[400px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at center bottom, rgba(245,73,0,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="container-main pt-24 pb-16 relative z-10">
        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="heading-hero max-w-[700px] mb-6 font-bold"
        >
          Your API. Fully visible.
          <br />
          Always under control.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.08}
          className="text-text-secondary text-lg leading-snug max-w-[520px] mb-9"
        >
          Track API traffic, latency, errors, and usage in real time. A
          streamlined dashboard for teams focused on reliability.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.16}
          className="flex items-center gap-3 flex-wrap mb-7"
        >
          <Button text="GET STARTED" href="/pricing" />
          <Button
            text="REQUEST DEMO"
            href="/contact"
            variant="outline"
            rightIcon={false}
            color="rgba(255, 255, 255, 0.14)"
          />
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.22}
          className="flex items-center gap-6 flex-wrap mb-20"
        >
          {TRUST.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 text-sm text-text-muted"
            >
              <CheckCircle size={14} className="text-brand" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* Dashboard Preview Image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="relative"
        >
          <div
            className="corner-bracket relative rounded-sm overflow-hidden border border-white/[0.06]"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
            }}
          >
            {/* Orange corner dots */}
            <span className="absolute top-[-1px] left-[-1px] w-1.5 h-1.5 bg-brand z-10" />
            <span className="absolute top-[-1px] right-[-1px] w-1.5 h-1.5 bg-brand z-10" />
            <span className="absolute bottom-[-1px] left-[-1px] w-1.5 h-1.5 bg-brand z-10" />
            <span className="absolute bottom-[-1px] right-[-1px] w-1.5 h-1.5 bg-brand z-10" />

            <Image
              src="https://framerusercontent.com/images/9LKnnWcx8OELyDZDpkOLbWnlkk.webp"
              alt="Aplix dashboard — API monitoring interface"
              width={1632}
              height={1227}
              priority
              className="w-full h-auto block max-h-[540px] object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
