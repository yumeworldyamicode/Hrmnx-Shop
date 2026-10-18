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
