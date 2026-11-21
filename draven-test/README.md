# Draven website (HTML + CSS only)

Open `home.html` in a browser to start. The three pages link to each other.

| Page | File | Stylesheets |
|---|---|---|
| Home | `home.html` | `css/base.css` + `css/home.css` |
| Product | `product.html` | `css/base.css` + `css/product.css` |
| Checkout | `checkout.html` | `css/base.css` + `css/checkout.css` |

`css/base.css` holds everything shared: colors and fonts (at the top, as variables), the header, the footer, buttons, panels, form fields and the carousels. Each page's own CSS file only has what is special to that page.

`assets/` has the small images (cobweb, bats, room illustration, favicon).

## Layout
It is responsive and follows the desktop and mobile wireframes:
- 1100px and wider: the desktop wireframe layout.
- 720px to 1099px: panels stack into one column.
- under 720px: the mobile wireframe layout (the search collapses to an icon, the product page reorders, and a few mobile-only blocks appear: the intro on the home page, the call-to-action and review pictures on the product page).

## Placeholders (still to replace)
- All the "Lorem ipsum" text, the empty image areas, the "Ipsum" footer links and the `$0.00` prices.
- Links that go nowhere yet use `href="#"`: footer links and the store policy links.
- The color swatch names and the size options on the product page are examples.

## What works now, and what is left for later
- Menu (hamburger), the expandable order summary, the radio choices and the floating field labels all work with CSS only.
- The carousels scroll by swiping, trackpad, keyboard or the scrollbar. The arrows jump to the first or last card and the dots jump to a card.
- The **search** and the **checkout form** can be typed in but do nothing yet: each `<form>` has `onsubmit="return false"`. Remove that attribute when you connect them to a back end.
- **Check out** on the product page sends the chosen size and color to `checkout.html` in the address (for example `checkout.html?size=l&color=boho`).
- There is no JavaScript. A real carousel (arrows that move one card at a time) is the first thing that will need it.

## Notes
- Fonts (Cinzel, Cormorant Garamond, UnifrakturMaguntia) load from Google Fonts, so the pages need an internet connection to show the real fonts.
- If you host the site, the server will look for `index.html` by default. Add one (or set `home.html` as the default page) when you publish.
