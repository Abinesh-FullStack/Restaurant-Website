// src/components/Footer.jsx
// Dark warm footer with brand blurb, quick links, contact snippet, and social icons.

import { NavLink } from "react-router-dom";
import { Camera, ThumbsUp, AtSign, UtensilsCrossed, MapPin, Phone, Mail } from "lucide-react";

// Note: lucide-react no longer ships brand/logo icons, so generic icons stand
// in for each social platform here while keeping accurate labels/links.

const QUICK_LINKS = [
  { to: "/menu", label: "Menu" },
  { to: "/reservation", label: "Reservation" },
  { to: "/gallery", label: "Gallery" },
  { to: "/order", label: "Order Online" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink bg-grain text-cream/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ember text-paper">
              <UtensilsCrossed size={18} />
            </span>
            <span className="font-display text-xl font-semibold text-paper">
              Tasty<span className="text-gold-soft">Bite</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-cream/60">
            Modern comfort food, cooked warm. From wood-fired pizza to slow-braised classics, every plate is
            built around honest ingredients and a little patience.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-lg text-paper font-semibold">Explore</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className="text-cream/60 hover:text-gold-soft transition-colors duration-200">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact snippet */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-lg text-paper font-semibold">Visit Us</h3>
          <ul className="flex flex-col gap-3 text-sm text-cream/60">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 text-gold-soft shrink-0" />
              <span>1/110 Sriram Nagar , Kolumanivakkam , Chennai 600069</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-gold-soft shrink-0" />
              <span>+91 9600147651</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-gold-soft shrink-0" />
              <span>abinesh.fullstack@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/40">
          <p> Developed By Abinesh Full Stack Dev {new Date().getFullYear()} </p>
          <p>Crafted with care for food lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
