"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "@/shared/components/Button";

const PLANS = [
  {
    name: "Starter",
    price: "$24",
    period: "/ user per month",
    desc: "Ideal for small teams getting started.",
    badge: null,
    features: [
      "Up to 10 users",
      "Real-time traffic & error tracking",
      "Basic alerts",
      "Standard integrations",
      "Community support",
    ],
    cta: "GET STARTED",
    ctaHref: "/pricing",
    popular: false,
  },
  {
    name: "Pro",
    price: "$64",
    period: "/ user per month",
    desc: "Growing teams needing more insight.",
    badge: "Most popular",
    features: [
      "Up to 30 users",
      "Advanced reporting",
      "Role-based access controls",
      "Priority integrations",
      "Priority support",
      "Custom dashboards",
    ],
    cta: "GET STARTED",
    ctaHref: "/pricing",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Large organizations with strict requirements.",
    badge: null,
    features: [
      "Unlimited users",
      "On-premise or private cloud",
      "Advanced security controls",
      "Custom SLAs",
      "24/7 dedicated support",
      "SSO & compliance",
    ],
    cta: "CONTACT SALES",
    ctaHref: "/contact",
    popular: false,
  },
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="pricing" ref={ref}>
      <div className="container-main flex flex-col gap-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-[480px] flex flex-col gap-6"
        >
          <h2 className="heading-section ">
            Simple pricing for clear API insight
          </h2>
          <h5 className="text-text-secondary text-2xl leading-[1.2] font-normal">
            Choose a plan that fits your team and scale as your API grows. No
            hidden fees. No complicated limits.
          </h5>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-3 gap-2">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`corner-bracket relative flex flex-col rounded-sm px-5 py-6 border ${
                plan.popular
                  ? "bg-brand/[0.04] border-brand/25"
                  : "bg-bg-surface border-border"
              }`}
            >
              {/* Top accent bar for popular */}

              <div className="mb-7">
                {/* Name + badge */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-text-secondary">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="text-[0.6rem] font-bold tracking-wide uppercase text-white bg-brand px-1.5 py-0.5 rounded-sm">
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-bold tracking-tight ${
                      plan.price === "Custom" ? "text-4xl" : "text-5xl"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[0.72rem] text-text-muted leading-tight max-w-[80px]">
                      {plan.period}
                    </span>
                  )}
                </div>

                <p className="text-text-muted text-xs mt-1.5">{plan.desc}</p>
              </div>

              {/* Divider */}
              <hr className="border-0  border-t border-white/[0.07] mb-5" />

              {/* Features */}
              <div className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2 text-xs text-white/70 leading-snug"
                  >
                    <Check
                      size={13}
                      className="text-brand flex-shrink-0 mt-0.5"
                    />
                    {f}
                  </div>
                ))}
              </div>

              <Button
                text={plan.cta}
                href={plan.ctaHref}
                variant={plan.popular ? "brand" : "outline"}
                className="w-full py-3 text-xs"
                showBrackets={true}
                rightIcon={false}
                color={
                  plan.popular
                    ? "rgba(255,255,255,0.5)"
                    : `rgba(255,255,255,0.1)`
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
