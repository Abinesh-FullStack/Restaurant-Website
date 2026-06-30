// src/pages/Home.jsx
// Landing page: hero, food categories, featured menu items, "why us" strip,
// testimonials preview, and a reservation CTA banner.

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Leaf, Soup, Star, Truck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import FoodCard from "../components/FoodCard";
import ReviewCard from "../components/ReviewCard";
import { foodItems, categories } from "../data/foodData";
import { reviews } from "../data/reviewData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const CATEGORY_ICONS = {
  starters: Soup,
  mains: Leaf,
  pizza: Soup,
  desserts: Star,
  drinks: Truck,
};

export default function Home() {
  const featured = foodItems.filter((f) => f.featured).slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-ink bg-grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-24 sm:pt-20 sm:pb-32 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="flex flex-col gap-6">
            <motion.span
              variants={fadeUp}
              className="eyebrow-underline inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold-soft w-fit"
            >
              Modern Comfort Food
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-paper leading-[1.05]"
            >
              Food that feels like <span className="italic text-ember">home</span>,
              <br className="hidden sm:block" /> plated with care.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-cream/65 text-base sm:text-lg max-w-md leading-relaxed">
              From wood-fired pizza to slow-braised classics, TastyBite brings together honest ingredients,
              warm hospitality, and a menu built for second helpings.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ember text-paper text-sm font-semibold hover:bg-ember-dark transition-colors duration-300 shadow-warm"
              >
                Reserve a Table
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-cream/25 text-paper text-sm font-semibold hover:bg-paper hover:text-ink transition-colors duration-300"
              >
                View Menu
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 pt-6 text-cream/60">
              <div>
                <p className="font-display text-2xl font-semibold text-paper">12+</p>
                <p className="text-xs">Years serving</p>
              </div>
              <div className="w-px h-9 bg-cream/15" />
              <div>
                <p className="font-display text-2xl font-semibold text-paper">4.8/5</p>
                <p className="text-xs">Average rating</p>
              </div>
              <div className="w-px h-9 bg-cream/15" />
              <div>
                <p className="font-display text-2xl font-semibold text-paper">40+</p>
                <p className="text-xs">Signature dishes</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-warm">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80"
                alt="Warmly lit TastyBite dining room with a beautifully plated dish"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 sm:-left-10 bg-paper rounded-2xl shadow-warm p-4 sm:p-5 flex items-center gap-3 w-56"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-cream text-ember">
                <Star size={20} className="fill-ember" />
              </div>
              <div>
                <p className="font-display font-semibold text-ink text-sm">Top Rated</p>
                <p className="text-xs text-ink-soft/60">800+ happy guests</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* decorative gradient blob */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-ember/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow="Explore" title="Browse by category" align="left" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {categories
            .filter((c) => c.id !== "all")
            .map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] ?? Soup;
              return (
                <motion.div key={cat.id} variants={fadeUp}>
                  <Link
                    to="/menu"
                    className="group flex flex-col items-center gap-3 bg-paper border border-line rounded-2xl py-7 px-4 text-center hover:border-ember hover:shadow-soft transition-all duration-300"
                  >
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-cream text-ember group-hover:bg-ember group-hover:text-paper transition-colors duration-300">
                      <Icon size={20} />
                    </span>
                    <span className="font-display font-semibold text-ink text-sm">{cat.label}</span>
                  </Link>
                </motion.div>
              );
            })}
        </motion.div>
      </section>

      {/* ============ FEATURED MENU ============ */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <SectionHeading
              eyebrow="Chef's Selection"
              title="Crowd favorites this season"
              subtitle="A handful of dishes our guests keep coming back for — pulled straight from the full menu."
            />
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ember hover:text-ember-dark transition-colors shrink-0"
            >
              View full menu <ArrowRight size={16} />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featured.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <FoodCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ WHY US STRIP ============ */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid sm:grid-cols-3 gap-6">
        {[
          { icon: Leaf, title: "Locally Sourced", desc: "Seasonal produce from regional farms, delivered daily." },
          { icon: Clock, title: "Always Fresh", desc: "Every dish is made to order — nothing sits and waits." },
          { icon: Truck, title: "Fast Delivery", desc: "Hot, fresh meals delivered within 30 minutes, citywide." },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col gap-4 p-7 rounded-3xl bg-paper border border-line shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-ink text-gold-soft">
              <Icon size={20} />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
            <p className="text-sm text-ink-soft/70 leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* ============ TESTIMONIALS PREVIEW ============ */}
      <section className="bg-ink bg-grain py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="What our guests are saying"
            align="center"
            light
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reviews.slice(0, 3).map((review) => (
              <motion.div key={review.id} variants={fadeUp}>
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center mt-10">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cream/25 text-paper text-sm font-semibold hover:bg-paper hover:text-ink transition-colors duration-300"
            >
              Read all reviews <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ RESERVATION CTA BANNER ============ */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-ember px-6 sm:px-14 py-14 sm:py-16 flex flex-col items-center text-center gap-5">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-paper max-w-xl">
              Hungry already? Let's get you a table.
            </h2>
            <p className="text-paper/80 max-w-md">
              Reserve in under a minute and we'll have your favorite booth warmed up and ready.
            </p>
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-ink/90 transition-colors duration-300 mt-2"
            >
              Book a Table <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
