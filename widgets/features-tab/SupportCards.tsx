import React from "react";
import { CornerBracket } from "@/shared/components/CornerBracket";
import { SupportIcon1 } from "@/shared/assets/icons/SupportIcon1";
import { SupportIcon2 } from "@/shared/assets/icons/SupportIcon2";
import { SupportIcon3 } from "@/shared/assets/icons/SupportIcon3";
import { SupportIcon4 } from "@/shared/assets/icons/SupportIcon4";
import { JoinCornerBacket } from "@/shared/components/JoinCornerBacket";

const SCardsData = [
  {
    title: "Templates & Tools",
    desc: "Start faster with proven setups",
    // Paper file dotted
    icon: <SupportIcon1 />,
  },
  {
    title: "Industry Insights",
    desc: "Learn from real API trends",
    // Column Chart dotted
    icon: <SupportIcon2 />,
  },
  {
    title: "Expert Resources",
    desc: "Guides from experts and more",
    // Bookmark dotted
    icon: <SupportIcon3 />,
  },
  {
    title: "Downloadables",
    desc: "Ready-to-use assets and files",
    // Target/Download dotted
    icon: <SupportIcon4 />,
  },
];

export const SupportCards = () => {
  return (
    <div className="container-main">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative">
        {SCardsData.map((card, idx) => (
          <div
            key={idx}
            className={`relative p-6 flex flex-col justify-between min-h-[200px] group ring-1 ring-inset ring-white/10 transition-all duration-300 hover:bg-white/[0.02]`}
          >
            <JoinCornerBacket color="rgba(255,255,255,0.4)" />
            {/* Hover Icon Color Fill Effect */}
            <div className="text-[#f54900]">{card.icon}</div>

            <div className="flex flex-col gap-1">
              <h3 className="text-white text-[18px] font-medium leading-tight">
                {card.title}
              </h3>
              <p className="text-white/60 text-[16px] leading-snug">
                {card.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Outer Corner Brackets for the whole grid */}
        {/* <CornerBracket
          position="top-left"
          size={6}
          thickness={1}
          color="rgba(255,255,255,0.4)"
          x={0}
          y={0}
        />
        <CornerBracket
          position="top-right"
          size={6}
          thickness={1}
          color="rgba(255,255,255,0.4)"
          x={0}
          y={0}
        />
        <CornerBracket
          position="bottom-left"
          size={6}
          thickness={1}
          color="rgba(255,255,255,0.4)"
          x={0}
          y={0}
        />
        <CornerBracket
          position="bottom-right"
          size={6}
          thickness={1}
          color="rgba(255,255,255,0.4)"
          x={0}
          y={0}
        /> */}
      </div>
    </div>
  );
};
