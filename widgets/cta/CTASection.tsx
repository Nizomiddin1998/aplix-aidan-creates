"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/shared/components/Button";
import { ParticleSphere } from "./ParticleSphere";
import { StarField } from "@/widgets/hero/StarField";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" ref={ref}>
      <div className="container-main relative flex max-[809.98px]:flex-col gap-6 max-[809.98px]:gap-8 overflow-hidden">
        {/* Star field background behind the sphere */}
        <StarField />
        <div className="relative flex flex-col max-[809.98px]:w-full justify-center overflow-hidden min-[809.98px]:h-[530px]">
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
                Get real-time visibility into traffic, performance, and errors.
                No setup hassle. No hidden complexity.
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
        <div className="flex flex-col max-[809.98px]:w-full min-[809.98px]:flex-1 aspect-square gap-10 max-[809.98px]:mt-10 max-[809.98px]:h-[400px] max-[809.98px]:items-center max-[809.98px]:justify-center">
          <div className="absolute min-[809.98px]:max-w-[530px] max-[809.98px]:w-[350px] max-[809.98px]:h-[350px] min-[809.98px]:w-full min-[809.98px]:h-[530px] aspect-square">
            <div className="relative flex items-center justify-center w-full h-full overflow-visible">
              <div className="relative w-full h-full overflow-visible flex items-center justify-center">
                <ParticleSphere />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
