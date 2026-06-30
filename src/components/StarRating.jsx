// src/components/StarRating.jsx
// Renders a row of stars for a given rating out of 5. Supports half stars visually via fill %.

import { Star } from "lucide-react";

export default function StarRating({ rating = 0, size = 14, className = "" }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {stars.map((s) => {
        const fillPercent = Math.max(0, Math.min(1, rating - (s - 1))) * 100;
        return (
          <span key={s} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-gold-soft" strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
              <Star size={size} className="text-gold fill-gold" strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
