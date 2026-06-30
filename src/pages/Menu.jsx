// src/pages/Menu.jsx
// Full menu listing with category filter tabs and animated grid.

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import FoodCard from "../components/FoodCard";
import { foodItems, categories } from "../data/foodData";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart, items } = useCart();

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return foodItems;
    return foodItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const quantityFor = (id) => items.find((i) => i.id === id)?.quantity ?? 0;

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <section className="bg-ink bg-grain py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Menu"
            title="Every dish, made with intention"
            subtitle="Browse starters, mains, wood-fired pizza, desserts, and drinks — filter by category to find your craving."
            light
          />
        </div>
      </section>

      {/* Filter tabs */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10 w-full">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-ember text-paper border-ember shadow-soft"
                  : "bg-paper text-ink-soft border-line hover:border-ember hover:text-ember"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAdd={addToCart} quantityInCart={quantityFor(item.id)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <p className="text-center text-ink-soft/60 py-16">No dishes found in this category yet.</p>
        )}
      </section>
    </div>
  );
}
