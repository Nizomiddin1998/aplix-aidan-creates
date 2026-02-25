import Link from "next/link";
import { Button } from "@/shared/components/Button";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
  { label: "Contact", href: "/contact" },
];

export function DesktopNav() {
  return (
    <>
      {/* Nav links */}
      <nav className="flex items-center gap-1.5">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-white/75 text-xs font-normal px-2.5 py-1.5 no-underline whitespace-nowrap transition-colors duration-200 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* CTA button */}
      <div className="ml-2">
        <Button text="GET STARTED" href="/pricing" />
      </div>
    </>
  );
}
