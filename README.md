# Boba Wicks

A premium luxury ecommerce website for a boba tea–inspired candle brand. Built with React, Tailwind CSS, and a Node.js/Express API.

## Features

- **Homepage** — Hero, featured products, brand pillars, custom CTA
- **Scents** — Full product catalogue with search and scent-type filters
- **Custom Scents** — Build-your-own form with dynamic pricing
- **About** — Brand story and quality promise
- **Contact** — Contact form, social links, FAQ accordion
- **Cart** — Add to cart, quantity controls, slide-out drawer (React state)

## Tech Stack

| Layer    | Stack                          |
|----------|--------------------------------|
| Frontend | React 18, Vite, Tailwind CSS   |
| Routing  | React Router v6                |
| Backend  | Node.js, Express               |

## Project Structure

```
boba/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Navbar, Footer, Hero, ProductCard, etc.
│       ├── pages/          # Home, Scents, Custom, About, Contact
│       ├── admin/          # Admin dashboard (pages, components, API client)
│       ├── context/        # CartContext
│       └── data/           # Mock products & pricing helpers
├── server/                 # Express API
│   ├── store.js            # In-memory data
│   ├── middleware/auth.js
│   └── routes/             # public.js, admin.js
└── package.json            # Root scripts (dev both apps)
```

## Getting Started

### Prerequisites

- Node.js 18+

### Install

```bash
cd boba
npm install
npm run install:all
```

### Development

Run both the API and frontend (API on port 3001, UI on port 5173):

```bash
npm run dev
```

Or run separately:

```bash
npm run dev:server   # http://localhost:3001
npm run dev:client   # http://localhost:5173
```

The Vite dev server proxies `/api` requests to the Express backend.

### Production Build

```bash
npm run build
```

Preview the static build:

```bash
npm run preview --prefix client
```

## Admin Dashboard

Access the admin portal at **http://localhost:5173/admin**

| Email | Password |
|-------|----------|
| `admin@bobacandles.com` | `admin123` |

**Admin features:**
- Authentication & session management
- Product CRUD with search and filters
- Scent category management
- Custom candle request tracking
- Order status management
- Customer inquiry inbox
- Analytics dashboard with charts
- Homepage content management (hero, stats, featured products, CTAs)

## API Endpoints

### Public

| Method | Path               | Description              |
|--------|--------------------|--------------------------|
| GET    | `/api/products`    | List all products        |
| GET    | `/api/products/:id`| Single product           |
| GET    | `/api/homepage`    | Homepage CMS content     |
| POST   | `/api/custom-scent`| Submit custom order      |
| POST   | `/api/contact`     | Submit contact form      |
| POST   | `/api/orders`      | Create customer order    |
| GET    | `/api/health`      | Health check             |

### Admin (Bearer token required)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/analytics` | Dashboard analytics |
| GET/POST/PUT/DELETE | `/api/admin/products` | Product management |
| GET/POST/PUT/DELETE | `/api/admin/categories` | Category management |
| GET/PUT | `/api/admin/custom-requests` | Custom orders |
| GET/PUT | `/api/admin/orders` | Order tracking |
| GET/PUT | `/api/admin/inquiries` | Contact messages |
| GET/PUT | `/api/admin/homepage` | Homepage CMS |

## Design

- Soft luxury aesthetic with light pink (`blush`) accents
- Cormorant Garamond + DM Sans typography
- Glassmorphism, gradients, smooth hover/entrance animations
- Fully responsive (mobile, tablet, desktop)
- SVG candle placeholders (no external image dependencies)

## License

Private — demo project.

## Render
- this is where the app server is deployed
- https://dashboard.render.com