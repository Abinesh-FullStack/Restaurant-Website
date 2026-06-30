// src/components/FoodCard.jsx
// Reusable card for a single menu item. Used on Home (featured), Menu, and Order pages.
// When `onAdd` is provided, shows an "Add to cart" button; otherwise just displays info.

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import StarRating from "./StarRating";

export default function FoodCard({ item, onAdd, quantityInCart = 0 }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col bg-paper rounded-3xl overflow-hidden border border-line shadow-soft hover:shadow-warm transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        {item.tag && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ink/85 text-paper text-[11px] font-semibold tracking-wide backdrop-blur-sm">
            {item.tag}
          </span>
        )}
        {quantityInCart > 0 && (
          <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-ember text-paper text-xs font-bold flex items-center justify-center shadow-soft">
            {quantityInCart}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink leading-snug">{item.name}</h3>
          <span className="font-display text-lg font-semibold text-ember whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-ink-soft/75 leading-relaxed line-clamp-2">{item.description}</p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={item.rating} size={14} />
            <span className="text-xs text-ink-soft/60 font-medium">{item.rating.toFixed(1)}</span>
          </div>

          {onAdd && (
            <button
              onClick={() => onAdd(item)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-ink text-paper text-xs font-semibold hover:bg-ember active:scale-95 transition-all duration-200"
            >
              <Plus size={14} />
              Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
