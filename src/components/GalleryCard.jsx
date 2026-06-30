// src/components/GalleryCard.jsx
// Single gallery tile with a soft zoom + caption overlay on hover.

import { Expand } from "lucide-react";

export default function GalleryCard({ image, onClick, className = "" }) {
  return (
    <button
      onClick={() => onClick?.(image)}
      className={`group relative block w-full overflow-hidden rounded-2xl shadow-soft focus:outline-none ${className}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="flex items-center gap-2 text-paper">
          <Expand size={15} />
          <span className="text-xs font-medium capitalize">{image.category}</span>
        </div>
      </div>
    </button>
  );
}
