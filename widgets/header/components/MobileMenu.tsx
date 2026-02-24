import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ApixLogo } from "@/shared/components/ApixLogo";
import { Button } from "@/shared/components/Button";
import { MovingDashedBorder } from "./MovingDashedBorder";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
  { label: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{
            background: "rgba(5,5,5,0.97)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[150%] h-[280px] pointer-events-none"
            style={{
              top: "18%",
              background:
                "radial-gradient(ellipse at center, rgba(245,73,0,0.06) 0%, transparent 70%)",
            }}
          />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-[22px] pb-4">
            <ApixLogo onClick={onClose} />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="bg-transparent border-none text-brand cursor-pointer p-1 leading-none"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Centered nav links */}
          <nav className="relative z-10 flex-1 flex flex-col items-center justify-center gap-0.5">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{
                  delay: 0.06 + i * 0.05,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block text-white text-[1.05rem] font-normal px-8 py-3 no-underline text-center transition-colors duration-150 hover:text-brand"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 px-5 pb-8"
          >
            <div className="relative">
              <MovingDashedBorder />
              <Button
                text="GET STARTED"
                href="/pricing"
                onClick={onClose}
                className="w-full text-xs"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
