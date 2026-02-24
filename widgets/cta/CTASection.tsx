"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/shared/components/Button";
import { ParticleSphere } from "./ParticleSphere";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="section section-border relative overflow-hidden"
      ref={ref}
    >
      {/* Three.js Background */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-[15%] w-[800px] h-[800px] pointer-events-none opacity-60 z-0">
        <ParticleSphere />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-[600px]"
        >
          <h2 className="heading-section mb-6">
            Start monitoring your API with confidence.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-[480px]">
            Get real-time visibility into traffic, performance, and errors. No
            setup hassle. No hidden complexity.
          </p>

          <div className="flex items-center gap-3">
            <Button text="GET STARTED" href="/pricing" />
            <Button
              text="REQUEST DEMO"
              href="/contact"
              variant="outline"
              rightIcon={false}
              color="rgba(255, 255, 255, 0.14)"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
