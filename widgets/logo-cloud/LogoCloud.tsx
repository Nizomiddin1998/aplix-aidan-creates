"use client";

import { motion } from "framer-motion";

import { BaseIcon } from "@/public/images/logos/BaseIcon";
import { ShapeIcon } from "@/public/images/logos/ShapeIcon";
import { AudlabsIcon } from "@/public/images/logos/AudlabsIcon";
import { ImagineAIIcon } from "@/public/images/logos/ImagineAIIcon";
import { AtlasIcon } from "@/public/images/logos/AtlasIcon";
import { AstraIcon } from "@/public/images/logos/AstraIcon";

const LOGOS = [
  { icon: <BaseIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <ShapeIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <AudlabsIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <AtlasIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <AstraIcon className="h-20 w-auto text-icon-gray" /> },
  { icon: <ImagineAIIcon className="h-20 w-auto text-icon-gray" /> },
];

const DOUBLED = [...LOGOS, ...LOGOS, ...LOGOS];

export function LogoCloud() {
  return (
    <section className="py-14 overflow-hidden">
      <div className="container-main mb-6">
        <p className="uppercase text-[14px] text-white/50 font-medium tracking-wider ">
          Powering the world&apos;s best teams
        </p>
      </div>

      {/* Marquee */}
      <div className="container-main">
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
                className="flex items-center justify-center hover:text-white transition-colors duration-300 pointer-events-auto cursor-default"
              >
                {logo.icon}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
