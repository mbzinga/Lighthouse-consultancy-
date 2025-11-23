# Stripe Products Setup Guide

Since you already have Stripe products created, you need to:

## 1. Get Your Stripe Price IDs

For each booking option, you need to find the **Price ID** (starts with `price_`):

1. Go to Stripe Dashboard → **Products**
2. Click on each product you've created
3. Copy the **Price ID** (not the Product ID)
   - It looks like: `price_1ABC123...` (live) or `price_1Test123...` (test)

## 2. Update Config File

Edit `src/config/site.ts` and add the Price IDs:

```typescript
bookingOptions: [
  {
    id: 'starter-consultation',
    // ... other fields ...
    stripePriceId: 'price_YOUR_STARTER_PRICE_ID', // Add here
  },
  {
    id: 'deep-dive-assessment',
    // ... other fields ...
    stripePriceId: 'price_YOUR_EXTENDED_PRICE_ID', // Add here
  },
  {
    id: 'advocacy-package',
    // ... other fields ...
    stripePriceId: 'price_YOUR_PACKAGE_PRICE_ID', // Add here (should be recurring/subscription)
  },
]
```

## 3. Environment Variables

Update your `.env.local` with Stripe keys:

```bash
# Stripe (use LIVE keys for production)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

You'll also need:
- **Secret Key** (sk_live_...) - from Stripe Dashboard → Developers → API keys
- **Webhook Secret** (whsec_...) - from Stripe Dashboard → Developers → Webhooks

## 4. How It Works Now

### All Bookings Flow:
1. Customer clicks "Book now" on any booking option
2. Enters email and name
3. Redirected to **Stripe Checkout** (using your existing Price ID)
4. Completes payment
5. For **single sessions**: Automatically redirected to Calendly booking
6. For **packages**: Shows success page with option to book sessions

### Database Tracking:
- All payments stored in `package_purchases` table
- Single sessions get `sessions_remaining: 1`
- Packages get `sessions_remaining: 4` (or whatever you configured)

## 5. Quick Test

Once you've added the Price IDs:

```bash
npm run dev
# Visit /pricing
# Click any "Book now" button
# Use test card: 4242 4242 4242 4242
```

**Important:** Use test keys during development, switch to live keys in production!







