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
      className="section container-main relative flex gap-6 overflow-hidden"
      ref={ref}
    >
      <div className="relative flex flex-col justify-center overflow-hidden h-[500px]">
        {/* Three.js Background */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-[500px] flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2.5">
            <h2 className="heading-section">
              Start monitoring your API with confidence.
            </h2>
            <h5 className="text-text-secondary text-2xl font-normal leading-[1.2]">
              Get real-time visibility into traffic, performance, and errors. No
              setup hassle. No hidden complexity.
            </h5>
          </div>

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
      <div className="flex flex-col flex-1 gap-10">
        <div className="relative max-w-[530px] h-[530px] aspect-square">
          <div className="relative flex items-center justify-center w-full h-full overflow-visible">
            <div className="relative w-full h-full overflow-visible">
              <ParticleSphere />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
