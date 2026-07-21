# 🚀 SkyMart

A dark-themed e-commerce storefront UI built with React, react-router, and Tailwind CSS. Product data is pulled live from the public [DummyJSON](https://dummyjson.com/products) API.

## Features
- Auth-gated Home, Shop, and About pages — signed-out visitors are sent to Login
- Register → Login → Home flow: creating an account does not auto sign-in, it sends you to Login to confirm
- Login and Register pages have no navbar/footer (standalone auth screens), with password show/hide toggle and a live password-strength checklist on Register
- Slide-over cart drawer (opened from the cart icon) with quantity controls, item subtotal + unit price, a "Clear cart" link, and a `react-hot-toast` confirmation on checkout
- Product cards open a full detail page at `/products/:id` — breadcrumb, gallery, price, description, add-to-cart, wishlist heart, delivery/pay/returns tiles, category-scoped previous/next navigation, and related products
- Wishlist and cart both persist to localStorage and survive a refresh
- Category browsing, search, and sorting on the Products page
- Mock auth backed by localStorage: `sm_users` (all accounts), `sm_session` (current user), `sm_cart` (cart items), `sm_wishlist` (wishlist items)
- Fully responsive, including a mobile nav menu

## Getting started
```bash
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173).

## Build
```bash
npm run build
npm run preview
```

## Stack
React 19 · react-router · Tailwind CSS 3 (Syne + DM Sans, custom `ink`/`volt` design tokens) · react-hook-form · axios · react-hot-toast · lucide-react icons · Vite
