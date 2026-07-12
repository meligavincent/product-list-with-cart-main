# Product List with Cart

![Product list with cart preview](./preview.jpg)

A polished, responsive e-commerce cart experience built for the [Frontend Mentor Product List with Cart challenge](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). The interface lets customers browse desserts, manage quantities, review totals, and complete an order in an accessible confirmation dialog.

## Overview

### The challenge

Users can:

- Add desserts to the cart and see the selected state immediately
- Increase, decrease, or remove individual cart items
- Review item subtotals, total quantity, and order total
- Confirm an order and inspect a complete order summary
- Reset the experience with “Start New Order”
- Navigate every interactive control with a keyboard
- Use the interface comfortably from 320px mobile screens to large desktops

### Links

- [Source code](https://github.com/meligavincent/product-list-with-cart-main)
- [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d)

## Built with

- React 19 and reusable JSX components
- Vite 7 for local development and production builds
- Tailwind CSS 4 with a challenge-specific design-token theme
- A focused custom hook for cart state and derived totals
- Native HTML `<dialog>` semantics
- Responsive `<picture>` sources and local variable fonts

## Architecture

```text
src/
├── components/
│   ├── Cart.jsx
│   ├── Icons.jsx
│   ├── OrderConfirmationModal.jsx
│   └── ProductCard.jsx
├── data/
│   └── desserts.js
├── hooks/
│   └── useCart.js
├── App.jsx
├── index.css
└── main.jsx
```

The UI layer stays declarative: `App` composes the catalogue, cart, and confirmation dialog, while `useCart` owns all cart mutations and calculated values. Product metadata remains separate from presentation code, making the catalogue straightforward to replace or extend.

## Getting started

This project requires Node.js 20.19+ (Node 22 LTS is recommended).

```bash
git clone https://github.com/meligavincent/product-list-with-cart-main.git
cd product-list-with-cart-main
npm install
npm run dev
```

Useful commands:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create an optimized production build
npm run preview  # Preview the production build locally
npm run lint     # Run the ESLint quality checks
```

## Implementation highlights

- Cart totals are derived from state instead of duplicated, avoiding synchronization bugs.
- Quantity controls expose descriptive accessible names and announce updated values.
- The confirmation experience uses the browser’s modal dialog behavior, including focus management and Escape-key support.
- Local Red Hat Text assets avoid a render-blocking third-party font request.
- Product imagery switches between mobile, tablet, and desktop crops with `<picture>`.
- Visible focus styles and reduced-motion support improve the experience beyond pointer-only use.
- The Vite base path is relative, so production assets work correctly under a GitHub Pages project URL.

## Quality checklist

- Responsive layout at mobile, tablet, and desktop widths
- Semantic headings, lists, buttons, and complementary cart region
- Keyboard-accessible cart and modal workflows
- Descriptive labels for icon-only controls
- Optimized production build
- ESLint checks for React and Hooks rules
- No external runtime API or font dependency

## Author

- GitHub: [@meligavincent](https://github.com/meligavincent)
- Frontend Mentor: [@meligavincent](https://www.frontendmentor.io/profile/meligavincent)

## Acknowledgements

Challenge and visual specification by [Frontend Mentor](https://www.frontendmentor.io). Product imagery and icons are supplied with the challenge starter files.
