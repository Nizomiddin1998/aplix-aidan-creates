import React from "react";
import { CornerBracket } from "./CornerBracket";

interface Props {
  size?: number;
  color?: string;
  thickness?: number;
  animateHover?: boolean;
  animateHoverColor?: string;
  x?: number;
  y?: number;
}

export const JoinCornerBacket = ({
  x,
  y,
  color,
  animateHoverColor,
  animateHover,
  thickness,
  size,
}: Props) => {
  return (
    <>
      <CornerBracket
        position="top-left"
        animateHover={animateHover}
        x={x}
        y={y}
        color={color}
        animateHoverColor={animateHoverColor}
        thickness={thickness}
        size={size}
      />
      <CornerBracket
        position="top-right"
        animateHover={animateHover}
        x={x}
        y={y}
        color={color}
        animateHoverColor={animateHoverColor}
        thickness={thickness}
        size={size}
      />
      <CornerBracket
        position="bottom-left"
        x={x}
        y={y}
        animateHover={animateHover}
        color={color}
        animateHoverColor={animateHoverColor}
        thickness={thickness}
        size={size}
      />
      <CornerBracket
        position="bottom-right"
        x={x}
        y={y}
        animateHover={animateHover}
        color={color}
        animateHoverColor={animateHoverColor}
        thickness={thickness}
        size={size}
      />
    </>
  );
};
