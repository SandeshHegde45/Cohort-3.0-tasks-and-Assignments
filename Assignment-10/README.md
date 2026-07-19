# 🚀 SkyMart

A dark-themed e-commerce storefront UI built with React, React Router, and Tailwind CSS. Product data is pulled live from the public [DummyJSON](https://dummyjson.com/products) API.

## Features
- Auth-gated Home, Shop, and About pages — signed-out visitors are sent to Login
- Register → Login → Home flow: creating an account does not auto sign-in, it sends you to Login to confirm
- Login and Register pages have no navbar/footer (standalone auth screens)
- Slide-over cart drawer (opened from the cart icon) with quantity controls and an empty state
- Category browsing, search, and sorting on the Shop page
- Mock auth backed by localStorage: `sm_users` (all accounts), `sm_session` (current user), `sm_cart` (cart items)
- Responsive, dark UI with a lime-green accent, including a mobile nav menu

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
React 19 · react-router · Tailwind CSS 3 · react-hook-form · axios · lucide-react icons · Vite
