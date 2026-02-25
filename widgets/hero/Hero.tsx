"use client";

import Image from "next/image";
import { Button } from "@/shared/components/Button";
import { motion } from "framer-motion";
import DashboardImage from "@/public/images/hero/dashboard.webp";
import { NoCardIcon } from "@/public/images/logos/NoCardIcon";
import { SetupIcon } from "@/public/images/logos/SetupIcon";
import { CleanIcon } from "@/public/images/logos/CleanIcon";
import { CornerBracket } from "@/shared/components/CornerBracket";

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
  {
    icon: <NoCardIcon />,
    text: "No credit card required",
  },
  {
    icon: <SetupIcon />,
    text: "Setup in under 5 minutes",
  },
  {
    icon: <CleanIcon />,
    text: "Clean, light interface",
  },
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
        <div className="flex flex-col gap-[24px] mb-10 max-w-[550px]">
          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="heading-hero"
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
            className="text-text-secondary text-[20px] leading-snug max-w-[550px]"
          >
            Track API traffic, latency, errors, and usage in real time.
            <br /> A streamlined dashboard for teams focused on reliability.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.16}
            className="flex items-center gap-3 flex-wrap pt-2"
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
        </div>

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
              key={t.text}
              className="flex items-center gap-3 text-base text-white/60"
            >
              {t.icon}
              {t.text}
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
          <CornerBracket position="top-left" />
          <CornerBracket position="top-right" />
          <CornerBracket position="bottom-left" />
          <CornerBracket position="bottom-right" />
          <div
            className="corner-bracket relative p-4  overflow-hidden border border-white/[0.06]"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
            }}
          >
            <Image
              src={DashboardImage}
              alt="Aplix dashboard — API monitoring interface"
              width={1400}
              height={1227}
              priority
              className="w-full h-auto block object-cover object-center [corner-shape:inherit]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
