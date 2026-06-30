// src/pages/Reservation.jsx
// Table reservation form: name, phone, email, date, time, guests, special request.
// Pure client-side validation; on success shows a confirmation state (no backend).

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, Mail, MessageSquare, Phone, User, Users } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  guests: "2",
  request: "",
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  else if (form.name.trim().length < 2) errors.name = "Name looks too short.";

  if (!form.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number.";

  if (!form.email.trim()) errors.email = "Please enter an email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";

  if (!form.date) errors.date = "Please choose a date.";
  else if (new Date(form.date) < new Date(new Date().toDateString())) errors.date = "Date can't be in the past.";

  if (!form.time) errors.time = "Please choose a time.";

  if (!form.guests || Number(form.guests) < 1) errors.guests = "At least 1 guest is required.";
  else if (Number(form.guests) > 20) errors.guests = "For 20+ guests, please call us directly.";

  return errors;
}

export default function Reservation() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // clear the field's error as soon as the user edits it
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col">
      <section className="bg-ink bg-grain py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Reservation"
            title="Reserve your table"
            subtitle="Tell us when you're coming and how many of you there are — we'll take care of the rest."
            light
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="bg-paper border border-line rounded-3xl shadow-soft p-6 sm:p-9"
        >
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-10">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-olive/10 text-olive">
                <CheckCircle2 size={32} />
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink">Table reserved!</h3>
              <p className="text-ink-soft/70 max-w-sm">
                Thanks, {form.name.split(" ")[0]}. We've pencilled you in for {form.guests} guest
                {Number(form.guests) > 1 ? "s" : ""} on {form.date} at {form.time}. A confirmation has been sent
                to {form.email}.
              </p>
              <button
                onClick={handleReset}
                className="mt-2 px-6 py-3 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-ember transition-colors duration-300"
              >
                Make another reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <FormField
                label="Full Name"
                icon={User}
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Jane Doe"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  label="Phone Number"
                  icon={Phone}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+91 98765 43210"
                />
                <FormField
                  label="Email Address"
                  icon={Mail}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="jane@example.com"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <FormField
                  label="Date"
                  icon={Calendar}
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  error={errors.date}
                />
                <FormField
                  label="Time"
                  icon={Clock}
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={handleChange}
                  error={errors.time}
                />
                <FormField
                  label="Guests"
                  icon={Users}
                  name="guests"
                  type="number"
                  min={1}
                  max={20}
                  value={form.guests}
                  onChange={handleChange}
                  error={errors.guests}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-ink mb-2" htmlFor="request">
                  <MessageSquare size={15} className="text-ember" />
                  Special Request <span className="font-normal text-ink-soft/50">(optional)</span>
                </label>
                <textarea
                  id="request"
                  name="request"
                  rows={3}
                  value={form.request}
                  onChange={handleChange}
                  placeholder="Window seat, anniversary, allergies, etc."
                  className="w-full rounded-2xl border border-line bg-cream/30 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/40 focus:border-ember focus:bg-paper outline-none transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-ember text-paper text-sm font-semibold hover:bg-ember-dark active:scale-[0.98] transition-all duration-200 shadow-soft"
              >
                Confirm Reservation
              </button>
            </form>
          )}
        </motion.div>

        {/* Side info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=900&q=80"
              alt="Cozy candle-lit table setting at TastyBite"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-cream/60 border border-line rounded-3xl p-6 flex flex-col gap-4">
            <h3 className="font-display text-lg font-semibold text-ink">Good to know</h3>
            <ul className="flex flex-col gap-3 text-sm text-ink-soft/75">
              <li>• Tables are held for 15 minutes past the reserved time.</li>
              <li>• Parties of 8 or more may require a deposit.</li>
              <li>• Need to cancel or reschedule? Call us at +91 98765 43210.</li>
              <li>• Walk-ins are always welcome, subject to availability.</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// Small reusable input field with icon + inline validation message
function FormField({ label, icon: Icon, error, ...inputProps }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-ink" htmlFor={inputProps.name}>
        <Icon size={15} className="text-ember" />
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
