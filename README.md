# ShopEasy - E-Commerce Website

A responsive e-commerce web application built with React where users can browse products, manage a shopping cart, and place orders.

## Live Demo
- Website: https://shopeasy-kappa-ten.vercel.app/

## Features
- Product listing with search and category filter
- Product details page
- User registration and login with protected routes
- Shopping cart (add, remove, change quantity, live total)
- Checkout with delivery details and form validation
- Order history for each user
- Cart, users and orders persist in the browser (localStorage)

## Tech Stack
- React (Vite)
- React Router
- Context API for authentication and cart state
- localStorage as a lightweight data store (no backend)

## Project Structure
```
client/
  src/
    components/   Navbar, ProductCard, CartItem, OrderSummary, ProtectedRoute
    context/      AuthContext, CartContext
    pages/        Home, ProductDetails, Cart, Login, Register, Checkout, Orders
    data/         products.js (product catalogue)
    api.js        Local data layer (products, auth, orders)
```

## Setup Instructions
```
git clone <your-repo-link>
cd shopeasy/client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## Notes
- This version has no backend. Accounts and orders are stored in the browser only, so they are specific to the device and browser used.
- Passwords are hashed with SHA-256 before being stored. This is suitable for a demo, not for production use.
- A full-stack version (Node.js, Express, MongoDB, JWT) of this project is available separately.

## Author
Anshu - B.Tech CSE-AI, USICT, GGSIPU