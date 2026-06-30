# TastyBite Restaurant Website

A modern, fully responsive restaurant frontend built with React, Tailwind CSS v4, React Router, Framer Motion, and Lucide icons.

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build
```

## Structure

- `src/components` — reusable UI: Navbar, Footer, FoodCard, ReviewCard, GalleryCard, StarRating, SectionHeading
- `src/pages` — Home, Menu, Reservation, Gallery, Order, Reviews, Contact
- `src/data` — dummy data: foodData.js, reviewData.js, galleryData.js
- `src/context/CartContext.jsx` — cart state (React state only, no backend/persistence)

## Notes

- No backend: reservation, review, contact, and order forms validate client-side and show an in-page confirmation.
- Cart state lives in React context and resets on page reload (by design — no localStorage per project constraints).
- Images are linked from Unsplash; swap with your own restaurant photography in `src/data/*.js` before going live.
