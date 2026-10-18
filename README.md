# Hrmnx Shop

Hrmnx Shop is the standalone storefront for Hrmnx Entertainment releases and artist merchandise, beginning with SEIUN vinyl and CDs.

## Planned structure

- `index.html` — storefront entry point
- `styles.css` — responsive storefront styling
- `app.js` — storefront UI and product loading
- `docs/elasticstage-integration.md` — checkout and fulfilment integration requirements

## Important integration status

The storefront foundation must not pretend a purchase has completed until a real checkout provider confirms payment. ElasticStage API access and the supported order-creation flow must be verified before connecting production checkout. API secrets belong in a trusted server-side environment, never in browser JavaScript.

## Nemawashi

The storefront is intended to be managed through Nemawashi's App Builder. Keep the storefront repository separate from the Nemawashi application/admin code; editor changes and publishing integration can be added as a later step.

## Development

Open `index.html` in a browser or deploy the repository using GitHub Pages / a configured custom domain after the storefront files are added.


## Supabase release catalogue

The storefront reads active rows from `public.shop_products`.

1. Open the Supabase project used by Nemawashi.
2. Open **SQL Editor** and create a new query.
3. Copy the complete contents of [`supabase/catalogue.sql`](supabase/catalogue.sql) into the editor and run it.
4. Open **Table Editor → shop_products** to review the two starter entries for SEIUN's *WINK: The Beginning* (Vinyl and CD).
5. Add or edit release details there. Leave `available` false and `checkout_url` empty until the purchase flow is ready.

The SQL enables public read access only for active catalogue entries; it does not create public write permissions. `shop-config.js` contains only the browser-safe Supabase URL and publishable key. Never put a service-role key in the storefront.

Prices and artwork are intentionally blank until confirmed. The catalogue can load before checkout exists, and the product cards should display **Coming soon** while no checkout URL is configured.
