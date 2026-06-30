// src/pages/Order.jsx
// Online ordering experience: browse menu items, add to cart, then review and
// update quantities / totals in a persistent cart summary panel.

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import FoodCard from "../components/FoodCard";
import { foodItems, categories } from "../data/foodData";
import { useCart } from "../context/CartContext";

const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.05;

export default function Order() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { items, addToCart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return foodItems;
    return foodItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const quantityFor = (id) => items.find((i) => i.id === id)?.quantity ?? 0;

  const tax = subtotal * TAX_RATE;
  const total = items.length > 0 ? subtotal + tax + DELIVERY_FEE : 0;

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setPlaced(true);
    clearCart();
    setTimeout(() => setPlaced(false), 5000);
  };

  return (
    <div className="flex flex-col">
      <section className="bg-ink bg-grain py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Order Online"
            title="Build your order"
            subtitle="Add your favorites to the cart, adjust quantities, and check out — fresh and ready in 30 minutes."
            light
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 w-full grid lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
        {/* Menu browser */}
        <div>
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

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAdd={addToCart} quantityInCart={quantityFor(item.id)} />
            ))}
          </div>
        </div>

        {/* Cart summary */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:sticky lg:top-24 bg-paper border border-line rounded-3xl shadow-soft p-6 flex flex-col gap-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ink text-gold-soft">
              <ShoppingBag size={16} />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink">Your Cart</h3>
            <span className="ml-auto text-xs font-semibold text-ink-soft/50">{items.length} item(s)</span>
          </div>

          {placed && (
            <div className="rounded-2xl bg-olive/10 text-olive text-sm font-medium px-4 py-3">
              Order placed! Your food is on its way. 🎉
            </div>
          )}

          {items.length === 0 ? (
            <p className="text-sm text-ink-soft/55 py-6 text-center">
              Your cart is empty. Add a few dishes to get started.
            </p>
          ) : (
            <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{item.name}</p>
                    <p className="text-xs text-ink-soft/55">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-cream rounded-full px-1.5 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-ink-soft hover:bg-paper transition-colors"
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-ink-soft hover:bg-paper transition-colors"
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-ink-soft/40 hover:text-ember-dark transition-colors shrink-0"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-line pt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-ink-soft/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-ink-soft/70">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-ink-soft/70">
              <span>Delivery Fee</span>
              <span>{items.length > 0 ? `$${DELIVERY_FEE.toFixed(2)}` : "$0.00"}</span>
            </div>
            <div className="flex justify-between font-display text-lg font-semibold text-ink pt-2 border-t border-line mt-1">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={items.length === 0}
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-ember text-paper text-sm font-semibold hover:bg-ember-dark active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </motion.aside>
      </section>
    </div>
  );
}
