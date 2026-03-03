# Shop.co - E-Commerce Fashion Store

A modern, fully responsive e-commerce fashion store built with **Next.js 14**, **Sanity CMS**, and **Tailwind CSS**. Browse, search, and shop from a curated collection of clothing — from casual wear to formal attire.

## Live Demo

> Deploy on Vercel and add your live URL here.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Sanity CMS](https://www.sanity.io/) | Headless CMS for product data |
| [Shadcn/ui](https://ui.shadcn.com/) | UI component library |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |

## Features

- **Product Catalog** — Browse new arrivals and top-selling products fetched from Sanity CMS
- **Product Detail Page** — View product images, select colors & sizes, adjust quantity
- **Search** — Real-time product search powered by Sanity GROQ queries
- **Shopping Cart** — Add/remove items, apply promo codes, view order summary
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Customer Reviews** — Interactive carousel showcasing customer testimonials
- **Browse by Style** — Filter products by dress style (Casual, Formal, Party, Gym)
- **Newsletter Subscription** — Stay updated with latest offers
- **Sanity Studio** — Built-in content management at `/studio`

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with header/footer
│   ├── error.tsx             # Error boundary
│   ├── arrivals/             # Cart page
│   ├── brands/               # Brands page
│   ├── onsale/               # On Sale - product listing with filters
│   ├── products/
│   │   ├── page.tsx          # New Arrivals section
│   │   ├── sell.tsx          # Top Selling section
│   │   └── [id]/page.tsx     # Product detail page
│   └── studio/               # Sanity Studio
├── components/
│   ├── header.tsx            # Site header with navigation & cart
│   ├── hero.tsx              # Hero banner
│   ├── footer.tsx            # Site footer with newsletter
│   ├── search.tsx            # Product search
│   ├── shirts.tsx            # Product grid (casual)
│   ├── products.tsx          # "You might also like" section
│   ├── carousel.tsx          # Customer reviews carousel
│   ├── dress.tsx             # Browse by dress style
│   ├── breadcrumb.tsx        # Breadcrumb navigation
│   ├── sheet.tsx             # Mobile navigation drawer
│   ├── types.ts              # Shared TypeScript interfaces
│   └── ui/                   # Shadcn/ui components
├── sanity/
│   ├── env.ts                # Environment variables
│   ├── lib/
│   │   ├── client.ts         # Sanity client
│   │   └── image.ts          # Image URL builder
│   └── schemaTypes/
│       ├── products.ts       # Product schema
│       ├── order.ts          # Order schema
│       └── shipping_form.ts  # Shipping form schema
└── lib/
    └── utils.ts              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Sanity project (free tier available at [sanity.io](https://www.sanity.io/))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/shopco-ecommerce.git
cd shopco-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-17
```

### 4. Import sample product data (optional)

Set additional environment variables for the import script:

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

Then run:

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
3. Add the environment variables in Vercel project settings
4. Deploy

## License

This project is open source and available under the [MIT License](LICENSE).
