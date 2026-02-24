import { motion } from "framer-motion";

export function MovingDashedBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <svg
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="3"
          stroke="#353434da"
          strokeWidth="1"
          strokeDasharray="12 12"
          animate={{
            strokeDashoffset: [0, -24],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ vectorEffect: "non-scaling-stroke" }}
        />
      </svg>
    </div>
  );
}
