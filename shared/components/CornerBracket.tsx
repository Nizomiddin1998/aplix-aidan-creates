import React from "react";
import { motion } from "framer-motion";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CornerBracketProps {
  position: Position;
  size?: number;
  color?: string;
  thickness?: number;
  animateHover?: boolean;
}

const positionClasses: Record<Position, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

const positionBorders: Record<Position, React.CSSProperties> = {
  "top-left": { borderTop: "0.5px solid", borderLeft: "0.5px solid" },
  "top-right": { borderTop: "0.5px solid", borderRight: "0.5px solid" },
  "bottom-left": { borderBottom: "0.5px solid", borderLeft: "0.5px solid" },
  "bottom-right": { borderBottom: "0.5px solid", borderRight: "0.5px solid" },
};

export function CornerBracket({
  position,
  size = 10,
  color = "#f54900",
  thickness = 0.5,
  animateHover = false,
}: CornerBracketProps) {
  const borders = positionBorders[position];

  const variants = animateHover
    ? {
        initial: {
          x: 0,
          y: 0,
        },
        hover: {
          x: position.includes("left") ? 5 : -5,
          y: position.includes("top") ? 5 : -5,
          borderColor: "#ffffff",
          borderTopWidth: borders.borderTop ? 1 : 0,
          borderLeftWidth: borders.borderLeft ? 1 : 0,
          borderRightWidth: borders.borderRight ? 1 : 0,
          borderBottomWidth: borders.borderBottom ? 1 : 0,
        },
      }
    : undefined;

  return (
    <motion.span
      variants={variants}
      className={`absolute pointer-events-none z-[11] ${positionClasses[position]}`}
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopWidth: borders.borderTop ? thickness : 0,
        borderLeftWidth: borders.borderLeft ? thickness : 0,
        borderRightWidth: borders.borderRight ? thickness : 0,
        borderBottomWidth: borders.borderBottom ? thickness : 0,
        borderStyle: "solid",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  );
}
