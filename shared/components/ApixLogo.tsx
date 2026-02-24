import { AplixIcon } from "@/public/images/logos/AplixIcon";
import Link from "next/link";

interface ApixLogoProps {
  onClick?: () => void;
  size?: number;
}

export function ApixLogo({ onClick, size = 26 }: ApixLogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2 no-underline flex-shrink-0"
    >
      <AplixIcon />
    </Link>
  );
}
