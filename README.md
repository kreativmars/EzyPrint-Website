# EzyPrint website

Homepage for EzyPrint, a custom printing shop in Quezon City, Philippines (shirts, caps, mugs, stickers, souvenirs; no minimum order).

## Branches

| Branch | What it is |
|---|---|
| `main` | The first homepage: logo, hero, products, how it works, weddings and events, social links, footer. Plain HTML and CSS. |
| `ui-polish` | Polished version: logo-inspired hero, GSAP animations and micro-interactions, mobile menu, and an order form that saves to Google Sheets. |

## Run it locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Order form (ui-polish)

The order form posts to a Google Apps Script web app that adds a row to a Google Sheet and emails the shop. Setup steps are in `form-to-sheet/guide.md`. Then open `index.html`, find the line marked `PASTE YOUR GOOGLE WEB APP URL`, and put your web app URL (ending in `/exec`) between the quotes in `ORDER_URL`. Until then the form shows a "not connected yet" message.

## Placeholders to fill in

Prices (`₱[PRICE]`), shop address and opening hours, reply time, Instagram, Facebook, Messenger, WhatsApp, Shopee, Lazada and TikTok Shop links.

## Notes

- Brand: navy with pink, yellow and cyan from the logo. Fonts: Poppins and Nunito Sans.
- Planning notes are in `docs/website-plan.md`.
