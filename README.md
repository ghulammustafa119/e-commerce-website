# Shop.co - E-Commerce Fashion Store

A modern, fully responsive e-commerce fashion store built with **Next.js 14**, **Sanity CMS**, **Stripe**, **Clerk**, and **Tailwind CSS**. Browse, filter, wishlist, review, shop, and pay — all in one seamless experience.

## Live Demo

[https://e-commerce-website-tau-azure.vercel.app](https://e-commerce-website-tau-azure.vercel.app)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Sanity CMS](https://www.sanity.io/) | Headless CMS for products, orders & reviews |
| [Stripe](https://stripe.com/) | Credit/debit card payments + webhooks |
| [PayPal](https://www.paypal.com/) | PayPal payments |
| [Clerk](https://clerk.com/) | Authentication (Sign in / Sign up) |
| [Resend](https://resend.com/) | Transactional order confirmation emails |
| [Sonner](https://sonner.emilkowal.dev/) | Toast notifications |
| [Shadcn/ui](https://ui.shadcn.com/) | UI component library |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |

## Features

### Shopping Experience
- **Product Catalog** — Browse products fetched dynamically from Sanity CMS
- **Product Detail Page** — View images, select colors & sizes, adjust quantity, size guide, social sharing
- **Sort By** — Sort products by Most Popular, Newest, Price Low/High
- **Stock Management** — Real-time stock status (In Stock, Low Stock, Out of Stock), quantity limits
- **Recently Viewed** — Tracks and displays recently viewed products on product pages
- **Product Filters** — Filter by category, price range, colors, sizes, and dress style with live results
- **Pagination** — Navigate through products with page-based pagination (9 per page)
- **Search** — Real-time product search
- **Dress Style Navigation** — Clickable dress style cards (Casual, Formal, Party, Gym) on homepage and brands page
- **Related Products** — "You might also like" section showing same-category products from Sanity
- **Wishlist** — Save favorite products with heart icon, persists in localStorage
- **Shopping Cart** — Add/remove items, apply promo codes (`SAVE10` for 10% off)
- **Toast Notifications** — Beautiful toast alerts for all actions (add to cart, wishlist, errors)
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop

### Authentication
- **Clerk Authentication** — Sign in / Sign up with modal
- **Protected Routes** — Checkout, orders, and tracking require authentication

### Checkout & Payments
- **Credit/Debit Card (Stripe)** — Secure payments via Stripe hosted checkout
- **PayPal** — Pay with PayPal account
- **Cash on Delivery** — Place orders without online payment
- **Stripe Webhook** — Automatic order status update to "paid" after successful payment
- **Promo Codes** — Apply discount codes at checkout

### Reviews & Ratings
- **Submit Reviews** — Star rating selector with comment form on product pages
- **Dynamic Ratings** — Real average ratings calculated from customer reviews (no hardcoded values)
- **View Reviews** — Real reviews fetched from Sanity with average rating display
- **Verified Badge** — Shows verified purchase indicator

### Order Management
- **Order Tracking** — Visual status stepper (Pending → Paid → Processing → Shipped → Delivered)
- **Order Cancellation** — Cancel pending/paid orders from tracking page
- **Order History** — Look up past orders by email address
- **Email Confirmation** — Automated order confirmation emails via Resend
- **Admin Dashboard** — View stats (orders, revenue, pending, delivered) and manage order statuses

### Content Management
- **Sanity Studio** — Built-in CMS at `/studio` for managing products, orders, reviews
- **Contact Page** — Customer support form with Sanity storage
- **Newsletter Subscription** — Stay updated with latest offers

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout (Clerk, Cart, Wishlist, Toaster)
│   ├── arrivals/             # Cart page
│   ├── checkout/
│   │   ├── page.tsx          # Checkout (Stripe + COD)
│   │   └── success/page.tsx  # Order success page
│   ├── wishlist/             # Wishlist page
│   ├── track-order/          # Order tracking page
│   ├── orders/               # Order history lookup
│   ├── admin/                # Admin dashboard
│   ├── onsale/               # Product listing with filters & pagination
│   ├── products/
│   │   ├── page.tsx          # New Arrivals section
│   │   ├── sell.tsx          # Top Selling section
│   │   └── [id]/page.tsx     # Product detail (reviews, wishlist, related)
│   ├── api/
│   │   ├── checkout/         # Checkout API (Stripe + COD)
│   │   ├── webhook/          # Stripe webhook handler
│   │   ├── reviews/          # Reviews API (GET + POST)
│   │   ├── track-order/      # Order tracking API
│   │   ├── orders/           # Order history API
│   │   └── admin/            # Admin order management APIs
│   └── studio/               # Sanity Studio
├── components/
│   ├── header.tsx            # Header with nav, search, wishlist, cart, auth
│   ├── cart-context.tsx      # Global cart state (localStorage)
│   ├── wishlist-context.tsx  # Global wishlist state (localStorage)
│   ├── shirts.tsx            # Product grid with filters & pagination
│   ├── dressStyle.tsx         # Dress style filter (Casual, Formal, Party, Gym)
│   ├── accordion.tsx         # Category filter (controlled)
│   ├── slider.tsx            # Price range filter (controlled)
│   ├── check-box.tsx         # Color filter (controlled)
│   ├── size.tsx              # Size filter (controlled, multi-select)
│   ├── pagination.tsx        # Dynamic pagination component
│   ├── products.tsx          # Related products (dynamic from Sanity)
│   ├── all-reviews.tsx       # Product reviews (fetched from Sanity)
│   ├── review-form.tsx       # Review submission form with star rating
│   ├── carousel.tsx          # Customer reviews carousel
│   └── ui/                   # Shadcn/ui components
├── sanity/
│   ├── lib/
│   │   ├── client.ts         # Sanity read client
│   │   ├── writeClient.ts    # Sanity write client (server-side)
│   │   └── image.ts          # Image URL builder
│   └── schemaTypes/
│       ├── products.ts       # Product schema
│       ├── order.ts          # Order schema
│       ├── review.ts         # Review schema
│       └── shipping_form.ts  # Shipping form schema
└── lib/
    ├── resend.ts             # Resend email client
    ├── sendOrderEmail.ts     # Order email sender
    └── emails/
        └── order-confirmation.tsx  # Email template
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- [Sanity](https://www.sanity.io/) project
- [Stripe](https://stripe.com/) account (test mode)
- [Clerk](https://clerk.com/) account
- [Resend](https://resend.com/) account (100 free emails/day)

### 1. Clone the repository

```bash
git clone https://github.com/ghulammustafa119/e-commerce-website.git
cd e-commerce-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-17
SANITY_API_TOKEN=your_sanity_write_token

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_key

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# Resend
RESEND_API_KEY=re_your_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Import sample product data (optional)

```bash
node importData.mjs
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 6. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to manage your product data.

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, new arrivals, top selling |
| `/products` | All products listing |
| `/products/[id]` | Product detail with reviews, wishlist, related products |
| `/onsale` | Product listing with filters & pagination |
| `/arrivals` | Shopping cart with promo codes |
| `/wishlist` | Saved wishlist items |
| `/checkout` | Checkout with Stripe and COD |
| `/checkout/success` | Order confirmation page |
| `/track-order` | Track order by Order ID |
| `/orders` | Order history lookup by email |
| `/contact` | Customer support contact form |
| `/admin` | Admin dashboard for order management |
| `/studio` | Sanity Studio CMS |

## Testing

- **Testing Report:** `testing-report.csv` — 65 test cases covering functional, error handling, performance, security, cross-browser, and UAT
- **Lighthouse Report:** `public/lighthouse/lighthouse-report.png` — Performance: 72, Accessibility: 87, Best Practices: 77, SEO: 100

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `node importData.mjs` | Import sample products into Sanity |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Add all environment variables in Vercel project settings
4. Deploy

Make sure to also:
- Add your Vercel URL to Sanity CORS origins at [sanity.io/manage](https://www.sanity.io/manage)
- Set up Stripe webhook endpoint pointing to `https://your-domain.com/api/webhook` (listen for `checkout.session.completed`)
- Update `NEXT_PUBLIC_BASE_URL` to your production URL

## License

This project is open source and available under the [MIT License](LICENSE).
