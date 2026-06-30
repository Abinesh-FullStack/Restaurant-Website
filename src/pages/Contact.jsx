// src/pages/Contact.jsx
// Contact page: address/phone/email/hours, a Google Map placeholder, and a validated
// contact form. No backend — submission just shows a confirmation state.

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const HOURS = [
  { day: "Monday – Thursday", time: "11:00 AM – 10:00 PM" },
  { day: "Friday – Saturday", time: "11:00 AM – 11:30 PM" },
  { day: "Sunday", time: "10:00 AM – 9:00 PM" },
];

const initialForm = { name: "", email: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!form.subject.trim()) errors.subject = "Please add a subject.";
  if (!form.message.trim()) errors.message = "Please write a message.";
  else if (form.message.trim().length < 10) errors.message = "Message should be at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm(initialForm);
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="bg-ink bg-grain py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="We'd love to hear from you"
            subtitle="Questions, feedback, or planning something special? Reach out and we'll get back within a day."
            light
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 w-full grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
        {/* Info column */}
        <div className="flex flex-col gap-6">
          <InfoCard icon={MapPin} title="Address">
            24 Harborlight Lane, Riverside District, Chennai 600001, India
          </InfoCard>
          <InfoCard icon={Phone} title="Phone">
            +91 98765 43210
          </InfoCard>
          <InfoCard icon={Mail} title="Email">
            hello@tastybite.com
          </InfoCard>
          <InfoCard icon={Clock} title="Opening Hours">
            <ul className="flex flex-col gap-1 mt-1">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 text-sm">
                  <span className="text-ink-soft/70">{h.day}</span>
                  <span className="font-medium text-ink">{h.time}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Map placeholder */}
          <div className="relative rounded-3xl overflow-hidden border border-line shadow-soft aspect-[4/3] bg-cream flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,_var(--color-line)_1px,_transparent_1px),linear-gradient(45deg,_var(--color-line)_1px,_transparent_1px)] bg-[length:24px_24px]" />
            <div className="relative flex flex-col items-center gap-2 text-ink-soft/60">
              <MapPin size={28} className="text-ember" />
              <p className="text-sm font-medium">Google Map placeholder</p>
              <p className="text-xs">24 Harborlight Lane, Riverside District</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="bg-paper border border-line rounded-3xl shadow-soft p-6 sm:p-9 h-fit"
        >
          {sent && (
            <div className="flex items-center gap-2 rounded-2xl bg-olive/10 text-olive text-sm font-medium px-4 py-3 mb-5">
              <CheckCircle2 size={16} /> Message sent — we'll be in touch shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Jane Doe" />
              <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="jane@example.com" />
            </div>
            <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} placeholder="Catering inquiry, feedback, etc." />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-ink" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className={`w-full rounded-2xl border bg-cream/30 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/40 focus:bg-paper outline-none transition-colors duration-200 resize-none ${
                  errors.message ? "border-ember-dark" : "border-line focus:border-ember"
                }`}
              />
              {errors.message && <span className="text-xs text-ember-dark">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ember text-paper text-sm font-semibold hover:bg-ember-dark active:scale-[0.98] transition-all duration-200 shadow-soft"
            >
              Send Message <Send size={15} />
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-4 bg-paper border border-line rounded-2xl p-5 shadow-soft">
      <span className="flex items-center justify-center w-11 h-11 rounded-full bg-cream text-ember shrink-0">
        <Icon size={18} />
      </span>
      <div className="flex-1">
        <h3 className="font-display font-semibold text-ink text-sm mb-1">{title}</h3>
        <div className="text-sm text-ink-soft/70">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, error, ...inputProps }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-ink" htmlFor={inputProps.name}>
        {label}
      </label>
      <input
        id={inputProps.name}
        {...inputProps}
        className={`w-full rounded-2xl border bg-cream/30 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/40 focus:bg-paper outline-none transition-colors duration-200 ${
          error ? "border-ember-dark" : "border-line focus:border-ember"
        }`}
      />
      {error && <span className="text-xs text-ember-dark font-medium">{error}</span>}
    </div>
  );
}
