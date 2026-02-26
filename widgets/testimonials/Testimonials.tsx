"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  TestimonialCard,
  type Testimonial,
} from "./components/TestimonialCard";

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "It's rare to find a tool that's both powerful and easy to use. Aplix nails that balance.",
    name: "Marcus Reed",
    role: "Lead Developer",
    avatar:
      "https://framerusercontent.com/images/soHBDoPIDO3oPucjxhHXZ1aAc.jpg",
    stars: 5,
  },
  {
    quote:
      "The dashboards are clean and easy to scan, even under pressure. That's rare in monitoring tools.",
    name: "Ryan Peterson",
    role: "DevOps Engineer",
    avatar: null,
    stars: 5,
  },
  {
    quote:
      "Aplix helped us catch issues before users ever noticed. That confidence is priceless.",
    name: "Laura Mitchell",
    role: "CTO",
    avatar:
      "https://framerusercontent.com/images/fHkKoWNBD5WELQWwJRcbjFrahY.jpg",
    stars: 5,
  },
  {
    quote:
      "Setup took less than 10 minutes. We had real-time visibility into our API within the same day.",
    name: "James Carter",
    role: "Backend Engineer",
    avatar: null,
    stars: 5,
  },
  {
    quote:
      "Finally a monitoring tool that doesn't require a PhD to configure. Love how simple Aplix is.",
    name: "Sophia Kim",
    role: "Startup Founder",
    avatar: null,
    stars: 5,
  },
  {
    quote:
      "We replaced three separate tools with Aplix. It's more capable than all of them combined.",
    name: "Daniel Torres",
    role: "Platform Engineer",
    avatar: null,
    stars: 5,
  },
];

const ROW1 = [...TESTIMONIALS, ...TESTIMONIALS];
const ROW2 = [
  ...TESTIMONIALS.slice(3),
  ...TESTIMONIALS.slice(0, 3),
  ...TESTIMONIALS.slice(3),
  ...TESTIMONIALS.slice(0, 3),
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" ref={ref} className="section overflow-hidden">
      {/* Section header */}
      <div className="container-main mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 max-w-[500px]"
        >
          <h2 className="heading-section ">Our customer reviews</h2>
          <h5 className="text-text-secondary font-[400] text-2xl leading-[1.3]">
            See how teams use Aplix to monitor APIs, spot issues early, and move
            faster with confidence.
          </h5>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="container-main ">
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="fade-left" />
            <div className="fade-right" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex gap-3 w-max pb-3"
            >
              {ROW1.map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </motion.div>
          </motion.div>
          {/* Row 2 — scrolls right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative mt-3"
          >
            <div className="fade-left" />
            <div className="fade-right" />
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex gap-3 w-max"
            >
              {ROW2.map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
