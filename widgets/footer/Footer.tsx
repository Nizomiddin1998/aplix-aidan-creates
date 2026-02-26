"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import { ApixLogo } from "@/shared/components/ApixLogo";
import { Button } from "@/shared/components/Button";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
];

const SOCIALS = [
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] pt-16 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Left — Logo and Links */}
          <div className="flex flex-col gap-10">
            <ApixLogo size={22} />
            <div className="flex flex-wrap gap-6">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium text-white/50 no-underline transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — Newsletter */}
          <div className="max-w-[360px] md:ml-auto">
            <p className="text-xs font-semibold text-white mb-3">
              Join our newsletter
            </p>
            <div className="flex gap-1">
              <input
                type="email"
                placeholder="name@email.com"
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-sm px-3 py-2 text-white text-xs outline-none placeholder:text-white/30 focus:border-white/20 transition-colors"
              />
              <Button text="Thank you" rightIcon={false} />
            </div>
            <p className="text-[0.65rem] text-white/40 mt-2">
              By clicking, you&apos;re agreeing to our{" "}
              <Link
                href="/terms"
                className="text-inherit hover:text-white/60 transition-colors"
              >
                Terms
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-[0.75rem] text-white/40">
            <span>
              © 2026 Aplix by{" "}
              <span className="text-brand hover:text-text-secondary cursor-pointer transition-colors">
                AidanCreates
              </span>
            </span>
            <span className="mx-1">·</span>
            <Link
              href="/terms"
              className="text-text-secondary no-underline hover:text-brand transition-colors"
            >
              Terms
            </Link>
            <span className="mx-1">·</span>
            <Link
              href="/privacy"
              className="text-text-secondary no-underline hover:text-brand transition-colors"
            >
              Privacy
            </Link>
          </div>

          <div className="flex gap-4">
            {SOCIALS.map((soc, i) => (
              <Link
                key={i}
                href={soc.href}
                className="text-white/40 transition-colors duration-200 hover:text-white"
              >
                <soc.icon size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
