# TastyBite Restaurant Website

A modern, responsive restaurant website built with React, Tailwind CSS, and Framer Motion, providing an elegant user experience for browsing menus, making reservations, placing orders, exploring the gallery, and reading customer reviews.

# Features
🏠 Modern Landing Page
🍕 Interactive Food Menu
📖 Food Categories
🛒 Shopping Cart
💳 Order Summary
📅 Table Reservation Form
🖼️ Restaurant Gallery
⭐ Customer Reviews & Ratings
📞 Contact Form
📱 Fully Responsive Design
🌙 Modern UI/UX
🎬 Smooth Page Animations
🚀 Fast Performance
♿ Accessible Components

# 🛠️ Tech Stack
**Frontend
React 19
React Router DOM
Tailwind CSS v4
JavaScript (ES6+)
HTML5
CSS3
**UI Libraries
Framer Motion
Lucide React Icons
**State Management
React Context API
**Development Tools
Vite
npm

# Project Structure
src/
│
├── assets/
│
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── FoodCard
│   ├── GalleryCard
│   ├── ReviewCard
│   ├── StarRating
│   └── SectionHeading
│
├── context/
│   └── CartContext.jsx
│
├── data/
│   ├── foodData.js
│   ├── galleryData.js
│   └── reviewData.js
│
├── pages/
│   ├── Home
│   ├── Menu
│   ├── Order
│   ├── Reservation
│   ├── Gallery
│   ├── Reviews
│   └── Contact
│
├── App.jsx
└── main.jsx

# 📱 Responsive Design

The website is optimized for:

Desktop
Laptop
Tablet
Mobile Devices
# 🎨 UI Highlights
Clean Restaurant Theme
Modern Typography
Smooth Hover Effects
Scroll Animations
Beautiful Card Layouts
Responsive Navigation
Mobile Friendly Menu
Interactive Buttons
# 🛒 Shopping Cart

Current Features

Add Food Items
Remove Items
Quantity Management
Order Summary
Total Price Calculation

Current Implementation

React Context API
Client-side State Management
No Backend
No Local Storage
# 📅 Reservation

Features

Customer Details
Date Selection
Time Selection
Guest Count
Form Validation
Success Message
# ⭐ Customer Reviews
Star Ratings
Customer Testimonials
Beautiful Review Cards
Responsive Layout
# 🖼️ Gallery
Restaurant Interior
Food Photography
Responsive Grid Layout
Hover Animations

## 📸 Screenshots 
Home Page 
<img width="2235" height="1235" alt="Screenshot 2026-06-30 150229" src="https://github.com/user-attachments/assets/9fe05d41-c8ec-4514-ac9c-47020567146b" />

Menu Page
<img width="2238" height="1227" alt="Screenshot 2026-06-30 150253" src="https://github.com/user-attachments/assets/3ebd5be8-fc8d-4265-b793-297756c05550" />

Cart
<img width="2240" height="1241" alt="Screenshot 2026-06-30 150316" src="https://github.com/user-attachments/assets/ace17b91-a645-4f0a-8711-30692a9f32f2" />

Reviews
<img width="2255" height="1246" alt="Screenshot 2026-06-30 150331" src="https://github.com/user-attachments/assets/18e7d6b9-4834-41f7-b68d-12fd03e799db" />

## 🌐 Live Demo
https://restaurant-website-coral-three.vercel.app/

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
