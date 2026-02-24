import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CornerBracket } from "./CornerBracket";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  width?: string | number;
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "outline";
  rightIcon?: ReactNode | boolean;
  showBrackets?: boolean;
  color?: string;
  className?: string;
  classNameContainer?: string;
}

export function Button({
  text,
  href,
  onClick,
  width,
  size = "md",
  variant = "brand",
  rightIcon = true,
  showBrackets = true,
  color = "rgba(255,255,255,0.5)",
  className = "",
  classNameContainer = "",
}: ButtonProps) {
  const isInternalLink = href && href.startsWith("/");

  const buttonContent = (
    <>
      {text}
      {rightIcon === true ? (
        <span className="text-[0.75em] ml-0.5">▶</span>
      ) : (
        rightIcon
      )}
    </>
  );

  const sizeStyles = {
    sm: "h-[32px] px-3 text-[0.7rem]",
    md: "h-[36px] px-4 text-[0.75rem]",
    lg: "h-[46px] px-6 text-[0.85rem]",
  };

  const baseStyles = `inline-flex items-center justify-center gap-1.5 font-medium tracking-widest no-underline whitespace-nowrap transition-colors duration-150 ${sizeStyles[size]}`;
  const variants = {
    brand: "bg-brand text-white hover:bg-brand-hover",
    outline: "bg-[#FFFFFF1A] text-white",
  };

  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const containerStyle: React.CSSProperties = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
  };

  const content = (
    <motion.div
      initial="initial"
      whileHover="hover"
      className={`relative inline-block ${classNameContainer}`}
      style={containerStyle}
    >
      {showBrackets && (
        <>
          <CornerBracket position="top-left" color={color} animateHover />
          <CornerBracket position="top-right" color={color} animateHover />
          <CornerBracket position="bottom-left" color={color} animateHover />
          <CornerBracket position="bottom-right" color={color} animateHover />
        </>
      )}

      {href ? (
        isInternalLink ? (
          <Link href={href} className={finalClassName} style={buttonStyle}>
            {buttonContent}
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={finalClassName}
            style={buttonStyle}
          >
            {buttonContent}
          </a>
        )
      ) : (
        <button
          onClick={onClick}
          className={finalClassName}
          style={buttonStyle}
        >
          {buttonContent}
        </button>
      )}
    </motion.div>
  );

  return content;
}
