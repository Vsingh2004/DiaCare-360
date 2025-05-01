This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
frontend
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ about-us.jpg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ hero.png
│  ├─ hero2.png
│  ├─ hero3.webp
│  ├─ hero4.webp
│  ├─ image1.jpg
│  ├─ image2.jpg
│  ├─ image3.jpg
│  ├─ image4.jpg
│  ├─ meal
│  │  └─ fruits.jpg
│  ├─ next.svg
│  ├─ products
│  │  ├─ bpmonitor.png
│  │  ├─ cookies.png
│  │  ├─ glucometers.png
│  │  └─ insulin.png
│  ├─ thermometer.png
│  ├─ vercel.svg
│  ├─ video1.mp4
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (main)
│  │  │  ├─ about
│  │  │  │  └─ page.jsx
│  │  │  ├─ contact
│  │  │  │  └─ page.jsx
│  │  │  ├─ data
│  │  │  │  └─ diabeticProducts.json
│  │  │  ├─ layout.jsx
│  │  │  ├─ login
│  │  │  │  └─ page.jsx
│  │  │  └─ signup
│  │  │     └─ page.jsx
│  │  ├─ admin
│  │  │  ├─ layout.jsx
│  │  │  ├─ manage-user
│  │  │  │  └─ page.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  └─ profile
│  │  │     └─ page.jsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.jsx
│  │  ├─ metadata.js
│  │  ├─ page.jsx
│  │  ├─ Signup-navbar.jsx
│  │  └─ user
│  │     └─ profile
│  │        ├─ layout.jsx
│  │        ├─ Navbar.jsx
│  │        └─ page.jsx
│  ├─ components
│  │  ├─ Banner.jsx
│  │  ├─ FactSection.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Hero.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ PrelineScript.jsx
│  │  ├─ ProductList.jsx
│  │  ├─ SmartMealPlanner.jsx
│  │  └─ SwiperText.jsx
│  └─ context
│     └─ AppContext.jsx
└─ tailwind.config.js

```
```
frontend
├─ components.json
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ about-us.jpg
│  ├─ assets
│  │  └─ assets.js
│  ├─ hero
│  │  ├─ hero1.png
│  │  └─ hero2.png
│  ├─ icons
│  │  ├─ file.svg
│  │  ├─ globe.svg
│  │  ├─ next.svg
│  │  ├─ vercel.svg
│  │  └─ window.svg
│  ├─ meal
│  │  └─ fruits.jpg
│  ├─ media
│  │  └─ video1.mp4
│  └─ products
│     ├─ bpmonitor.png
│     ├─ cookies.png
│     ├─ glucometers.png
│     └─ insulin.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (main)
│  │  │  ├─ about
│  │  │  │  └─ page.jsx
│  │  │  ├─ articles
│  │  │  │  └─ page.jsx
│  │  │  ├─ contact
│  │  │  │  └─ page.jsx
│  │  │  ├─ dashboard
│  │  │  │  └─ page.jsx
│  │  │  ├─ data
│  │  │  │  └─ diabeticProducts.json
│  │  │  ├─ layout.jsx
│  │  │  ├─ login
│  │  │  │  └─ page.jsx
│  │  │  ├─ marketplace
│  │  │  │  └─ page.jsx
│  │  │  ├─ signup
│  │  │  │  └─ page.jsx
│  │  │  ├─ upload-file
│  │  │  │  └─ page.jsx
│  │  │  └─ view
│  │  │     └─ [id]
│  │  │        └─ page.jsx
│  │  ├─ admin
│  │  │  ├─ add-articles
│  │  │  │  └─ page.jsx
│  │  │  ├─ add-product
│  │  │  │  └─ page.jsx
│  │  │  ├─ layout.jsx
│  │  │  ├─ manage-articles
│  │  │  │  └─ page.jsx
│  │  │  ├─ manage-user
│  │  │  │  └─ page.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  └─ profile
│  │  │     └─ page.jsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.jsx
│  │  ├─ metadata.js
│  │  ├─ page.jsx
│  │  ├─ Signup-navbar.jsx
│  │  └─ user
│  │     ├─ cart
│  │     │  └─ page.jsx
│  │     ├─ layout.jsx
│  │     └─ profile
│  │        ├─ Navbar.jsx
│  │        └─ page.jsx
│  ├─ components
│  │  ├─ Articles
│  │  │  ├─ Categories.jsx
│  │  │  ├─ EditorsChoice.jsx
│  │  │  ├─ GridSection.jsx
│  │  │  ├─ InfiniteScroll.jsx
│  │  │  ├─ LatestNews.jsx
│  │  │  └─ TopArticles.jsx
│  │  ├─ Dashboard
│  │  │  ├─ Sidebar.jsx
│  │  │  ├─ SmartMealPlanner.jsx
│  │  │  └─ Topbar.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Home
│  │  │  ├─ Banner.jsx
│  │  │  ├─ FactSection.jsx
│  │  │  ├─ Hero.jsx
│  │  │  ├─ ProductList.jsx
│  │  │  ├─ SmartMealPlanner.jsx
│  │  │  └─ SwiperText.jsx
│  │  ├─ Marketplace
│  │  │  ├─ ExpertRecommend.jsx
│  │  │  ├─ Hero.jsx
│  │  │  ├─ ProductCard.jsx
│  │  │  └─ ProductGrid.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ PrelineScript.jsx
│  │  └─ ui
│  │     ├─ avatar.jsx
│  │     ├─ badge.jsx
│  │     ├─ button.jsx
│  │     └─ input.jsx
│  ├─ constants
│  │  └─ sidebarItems.js
│  ├─ context
│  │  ├─ AppContext.jsx
│  │  └─ CartContext.jsx
│  └─ lib
│     └─ utils.js
└─ tailwind.config.js

```