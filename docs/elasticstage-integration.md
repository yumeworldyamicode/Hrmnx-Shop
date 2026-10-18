# ElasticStage checkout and fulfilment integration

## Current status
The initial storefront does not create ElasticStage orders and must not claim that it does. Before production checkout, verify the API and commercial flow supported by the user's ElasticStage account.

## Confirm with ElasticStage
1. Can an external storefront create a paid order through an API?
2. What product and variant identifiers are required for vinyl and CD editions?
3. Is payment collected by the storefront, ElasticStage, or a connected payment provider?
4. What order fields are required for recipient, address, variant, quantity, shipping method and email?
5. How are production and shipping updates retrieved: webhook, polling endpoint, or dashboard?
6. Can tracking details and order status be shared back to the storefront?
7. Is there a sandbox, and what are the authentication, rate-limit, refund and regional shipping rules?

## Intended safe flow
1. Customer selects a listed product and variant.
2. Server validates product, variant, price, availability and destination.
3. Customer completes the supported payment flow.
4. Server verifies payment through trusted provider confirmation or webhook.
5. Server submits the order to ElasticStage only after payment/order requirements are satisfied.
6. Server stores minimal order records and provider IDs.
7. Verified shipping updates are sent through a configured transactional email service.
8. Duplicate webhooks, retries, failures, cancellations and refunds are handled safely.

## Secrets and privacy
- Never put an ElasticStage API token, payment secret, email-provider key, or Supabase service-role key in browser JavaScript, HTML, CSS, or a public repository.
- Use a trusted server-side environment such as a Supabase Edge Function.
- Only use a Supabase publishable/anon key in browser code and protect data with Row Level Security.
- Do not store full payment-card numbers or security codes.
- Avoid exposing customer address/email in the public product catalog.

## Implementation gate
Do not enable real purchases until ElasticStage's API documentation or written support confirmation is available and the payment/order responsibility is clear. A direct external checkout link is a separate fallback and does not meet the goal of keeping checkout inside Hrmnx Shop.