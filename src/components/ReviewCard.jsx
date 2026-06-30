// src/components/ReviewCard.jsx
// Card displaying a single customer review with avatar, name, rating, and comment.

import { Quote } from "lucide-react";
import StarRating from "./StarRating";

export default function ReviewCard({ review }) {
  return (
    <div className="relative flex flex-col gap-4 bg-paper rounded-3xl border border-line p-6 sm:p-7 shadow-soft hover:shadow-warm transition-shadow duration-300 h-full">
      <Quote size={32} className="text-gold-soft/60" strokeWidth={1.5} />

      <p className="text-sm sm:text-[15px] leading-relaxed text-ink-soft/85 flex-1">“{review.comment}”</p>

      <div className="flex items-center gap-3 pt-3 border-t border-line">
        <img
          src={review.avatar}
          alt={review.name}
          loading="lazy"
          className="w-11 h-11 rounded-full object-cover border-2 border-cream"
        />
        <div className="flex-1">
          <p className="font-display font-semibold text-ink text-sm">{review.name}</p>
          <p className="text-xs text-ink-soft/60">
            {review.role} · {review.date}
          </p>
        </div>
        <StarRating rating={review.rating} size={13} />
      </div>
    </div>
  );
}
