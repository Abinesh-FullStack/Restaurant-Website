// src/pages/Gallery.jsx
// Gallery grid of food + ambience photography with category filter and a simple lightbox.

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import GalleryCard from "../components/GalleryCard";
import { galleryImages } from "../data/galleryData";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "ambience", label: "Ambience" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [activeImage, setActiveImage] = useState(null);

  const filtered =
    filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter);

  return (
    <div className="flex flex-col">
      <section className="bg-ink bg-grain py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="A taste of the atmosphere"
            subtitle="Plated dishes, the open kitchen, and quiet corners — a peek into what it feels like to dine with us."
            light
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10 w-full">
        <div className="flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                filter === f.id
                  ? "bg-ember text-paper border-ember shadow-soft"
                  : "bg-paper text-ink-soft border-line hover:border-ember hover:text-ember"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
          {filtered.map((image, idx) => (
            <GalleryCard
              key={`${image.id}-${idx}`}
              image={image}
              onClick={setActiveImage}
              className={idx % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-full max-h-[80vh] object-cover rounded-2xl shadow-warm"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-paper text-ink flex items-center justify-center shadow-soft"
                aria-label="Close image"
              >
                <X size={18} />
              </button>
              <p className="mt-3 text-center text-cream/70 text-sm">{activeImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
