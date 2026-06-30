// src/pages/Reviews.jsx
// Lists all customer reviews with an overall rating summary, plus a (client-only)
// "leave a review" form with star selection and validation.

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ReviewCard from "../components/ReviewCard";
import StarRating from "../components/StarRating";
import { reviews as initialReviews } from "../data/reviewData";

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [form, setForm] = useState({ name: "", comment: "", rating: 0 });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const average = useMemo(
    () => (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    [reviews]
  );

  const distribution = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => Math.round(r.rating) === star).length,
    }));
    return counts;
  }, [reviews]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.comment.trim()) errs.comment = "Please share a few words about your visit.";
    else if (form.comment.trim().length < 10) errs.comment = "Please write at least 10 characters.";
    if (!form.rating) errs.rating = "Please select a star rating.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newReview = {
      id: Date.now(),
      name: form.name,
      role: "Guest",
      rating: form.rating,
      date: "Just now",
      comment: form.comment,
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
    };
    setReviews((prev) => [newReview, ...prev]);
    setForm({ name: "", comment: "", rating: 0 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="flex flex-col">
      <section className="bg-ink bg-grain py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Reviews"
            title="What guests say after the last bite"
            subtitle="Real feedback from real visits — the good, the honest, and the occasional craving for more."
            light
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 w-full grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
        {/* Rating summary + form */}
        <div className="flex flex-col gap-8">
          <div className="bg-paper border border-line rounded-3xl shadow-soft p-7 flex flex-col items-center text-center gap-2">
            <p className="font-display text-5xl font-semibold text-ink">{average}</p>
            <StarRating rating={Number(average)} size={20} />
            <p className="text-sm text-ink-soft/60">Based on {reviews.length} reviews</p>

            <div className="w-full flex flex-col gap-2 mt-5">
              {distribution.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-3 text-xs text-ink-soft/60">
                  <span className="w-8 flex items-center gap-1">
                    {star} <Star size={11} className="fill-gold text-gold" />
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-cream overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${(count / reviews.length) * 100}%` }}
                    />
                  </div>
                  <span className="w-5 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leave a review form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="bg-paper border border-line rounded-3xl shadow-soft p-7 flex flex-col gap-4"
          >
            <h3 className="font-display text-lg font-semibold text-ink">Share your experience</h3>

            {submitted && (
              <div className="flex items-center gap-2 rounded-2xl bg-olive/10 text-olive text-sm font-medium px-4 py-3">
                <CheckCircle2 size={16} /> Thanks for the review!
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setForm((f) => ({ ...f, rating: s }))}
                    aria-label={`Rate ${s} star`}
                  >
                    <Star
                      size={26}
                      className={s <= form.rating ? "fill-gold text-gold" : "text-line"}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && <span className="text-xs text-ember-dark -mt-2">{errors.rating}</span>}

              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`w-full rounded-2xl border bg-cream/30 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/40 focus:bg-paper outline-none transition-colors duration-200 ${
                    errors.name ? "border-ember-dark" : "border-line focus:border-ember"
                  }`}
                />
                {errors.name && <span className="text-xs text-ember-dark">{errors.name}</span>}
              </div>

              <div>
                <textarea
                  rows={3}
                  placeholder="Tell us about your visit..."
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  className={`w-full rounded-2xl border bg-cream/30 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/40 focus:bg-paper outline-none transition-colors duration-200 resize-none ${
                    errors.comment ? "border-ember-dark" : "border-line focus:border-ember"
                  }`}
                />
                {errors.comment && <span className="text-xs text-ember-dark">{errors.comment}</span>}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-ember transition-colors duration-300"
              >
                Submit Review
              </button>
            </form>
          </motion.div>
        </div>

        {/* Review list */}
        <div className="grid sm:grid-cols-2 gap-6 content-start">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </div>
  );
}
