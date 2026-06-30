// src/components/Navbar.jsx
// Sticky responsive navbar. Collapses into a slide-down mobile menu under md breakpoint.
// Shows live cart item count (from CartContext) next to the "Order" link.

import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reservation", label: "Reservation" },
  { to: "/gallery", label: "Gallery" },
  { to: "/order", label: "Order Online" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  // Close mobile menu whenever the route changes
  useEffect(() => setOpen(false), [location.pathname]);

  // Add a subtle shadow/background once the user scrolls past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-200 ${
      isActive ? "text-ember" : "text-ink-soft hover:text-ember"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur-md shadow-soft" : "bg-paper/60 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-18 py-3">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ink text-gold-soft shadow-soft group-hover:bg-ember transition-colors duration-300">
            <UtensilsCrossed size={18} />
          </span>
          <span className="font-display text-xl font-semibold text-ink">
            Tasty<span className="text-ember">Bite</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/order"
            className="relative hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink-soft hover:text-ember hover:border-ember transition-colors duration-200"
            aria-label="View cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-ember text-paper text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/reservation"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-ember transition-colors duration-300 shadow-soft"
          >
            Book a Table
          </NavLink>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-line bg-paper"
          >
            <div className="flex flex-col px-5 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `py-3 px-3 rounded-xl text-base font-medium transition-colors ${
                      isActive ? "bg-cream text-ember" : "text-ink-soft hover:bg-cream"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/reservation"
                className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full bg-ink text-paper text-sm font-semibold"
              >
                Book a Table
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
