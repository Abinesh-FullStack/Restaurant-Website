// src/components/SectionHeading.jsx
// Reusable heading block used at the top of most page sections.
// eyebrow: small warm-colored label above the title
// title: large display heading (Fraunces)
// subtitle: optional supporting copy
// align: "left" | "center"

export default function SectionHeading({ eyebrow, title, subtitle, align = "left", light = false }) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span
          className={`eyebrow-underline text-xs font-semibold tracking-[0.2em] uppercase ${
            light ? "text-gold-soft" : "text-ember"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] font-semibold ${
          light ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg ${light ? "text-cream/70" : "text-ink-soft/80"}`}>{subtitle}</p>
      )}
    </div>
  );
}
