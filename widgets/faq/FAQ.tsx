"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "What is Aplix?",
    answer:
      "Aplix is a lightweight API monitoring tool that gives you real-time visibility into traffic, performance, errors, and usage. It's built to help teams understand what's happening across their APIs without complex setup or noisy dashboards.",
  },
  {
    question: "Can I upgrade my plan at any time?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes are reflected immediately.",
  },
  {
    question: "Is there a discount for annual subscriptions?",
    answer:
      "Yes, if you choose to pay annually, you save 20% compared to the monthly billing cycle.",
  },
  {
    question: "What is included in the free trial?",
    answer:
      "Our 14-day free trial gives you full access to all Pro features so you can experience the power of Aplix before committing.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all our paid plans. If you are not satisfied, contact our support team.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section section-border" id="faq" ref={ref}>
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left — title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="label mb-1.5">FAQ</p>
            <h2 className="heading-section max-w-[300px] mb-4">
              Your Questions. Clearly answered.
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-[320px]">
              Fast, clear, and easy to understand.
            </p>
          </motion.div>

          {/* Right — accordion */}
          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="border-b border-white/[0.06]"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className={`w-full py-5 flex items-center justify-between bg-transparent border-none text-left cursor-pointer transition-colors duration-200 ${
                    open === i ? "text-white" : "text-white/70"
                  }`}
                >
                  <span className="text-base font-semibold">
                    {faq.question}
                  </span>
                  {open === i ? (
                    <Minus size={16} className="flex-shrink-0 text-brand" />
                  ) : (
                    <Plus size={16} className="flex-shrink-0 text-white/50" />
                  )}
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-sm leading-relaxed pb-6 max-w-[90%]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
