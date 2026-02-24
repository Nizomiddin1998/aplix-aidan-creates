import Image from "next/image";
import { StarRating } from "./StarRating";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string | null;
  stars: number;
}

interface TestimonialCardProps {
  item: Testimonial;
}

export function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 w-80 bg-white/[0.03] border border-white/[0.08] rounded-md p-6 flex flex-col gap-4 select-none">
      <StarRating count={item.stars} />

      <p className="text-sm leading-relaxed text-white/80 flex-1">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="flex items-center gap-2.5">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.name}
            width={36}
            height={36}
            className="rounded-full object-cover border border-brand/40 flex-shrink-0"
            style={{ width: 36, height: 36 }}
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-brand flex-shrink-0 border border-brand/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,73,0,0.35) 0%, rgba(245,73,0,0.1) 100%)",
            }}
          >
            {item.name[0]}
          </div>
        )}

        <div>
          <div className="text-sm font-semibold text-white">{item.name}</div>
          <div className="text-[0.7rem] text-white/45">{item.role}</div>
        </div>
      </div>
    </div>
  );
}
