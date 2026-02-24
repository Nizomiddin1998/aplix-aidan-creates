"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ApixLogo } from "@/shared/components/ApixLogo";
import { CornerBracket } from "@/shared/components/CornerBracket";
import { MovingDashedBorder } from "./components/MovingDashedBorder";
import { DesktopNav } from "./components/DesktopNav";
import { MobileMenu } from "./components/MobileMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 810);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Floating Navbar ── */}
      <div
        className="fixed z-[100] top-6 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: isMobile ? "calc(100% - 32px)" : "auto" }}
      >
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto"
        >
          <div
            className="relative flex items-center justify-between"
            style={{
              gap: isMobile ? 0 : 20,
              padding: isMobile ? "0 16px" : "16px",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: 3,
            }}
          >
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />
            <MovingDashedBorder />

            <ApixLogo />

            {!isMobile && <DesktopNav />}

            {isMobile && (
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="bg-transparent border-none cursor-pointer p-2 flex flex-col justify-center gap-[5px]"
              >
                <span className="block w-[22px] h-[1.5px] bg-brand rounded-[1px]" />
                <span className="block w-[22px] h-[1.5px] bg-brand rounded-[1px]" />
                <span className="block w-[22px] h-[1.5px] bg-brand rounded-[1px]" />
              </button>
            )}
          </div>
        </motion.header>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
