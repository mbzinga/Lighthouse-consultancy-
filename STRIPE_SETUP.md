# Stripe Payment Integration Setup

## Overview

The Monthly Advocacy Package (£200) uses Stripe for payment processing. After successful payment, customers can book their 4 consultation sessions via Calendly.

## Setup Steps

### 1. Create a Stripe Account

1. Go to https://stripe.com and create an account
2. Complete the onboarding process
3. Verify your business details

### 2. Get Your API Keys

1. Go to **Developers** → **API keys** in Stripe Dashboard
2. Copy your **Publishable key** (starts with `pk_`)
3. Copy your **Secret key** (starts with `sk_`)
   - **Important**: Keep this secret! Never commit it to git.

### 3. Set Up Webhook Endpoint

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://your-domain.com/api/stripe/webhook`
   - Replace `your-domain.com` with your production URL
   - For local testing: Use Stripe CLI (see below)
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.deleted` (optional, for cancellations)
5. Copy the **Signing secret** (starts with `whsec_`)

### 4. Configure Environment Variables

Add to your `.env.local` file:

```bash
# Stripe (Development - use test keys)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# For production, use live keys:
# STRIPE_PUBLISHABLE_KEY=pk_live_...
# STRIPE_SECRET_KEY=sk_live_...
```

**Add to Vercel environment variables** for production deployment.

### 5. Local Testing with Stripe CLI

For local webhook testing:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copy the webhook secret it provides and use it in `.env.local`

### 6. Test the Integration

1. Start your dev server: `npm run dev`
2. Visit `/pricing`
3. Click "Purchase Package" on the Monthly Advocacy Package
4. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any zip code
5. Complete checkout
6. Verify:
   - Redirects to `/booking-success`
   - Payment recorded in Stripe Dashboard
   - Package purchase saved in Supabase `package_purchases` table

### 7. Run Database Migration

Make sure you've run the payment tables migration:

```sql
-- Run in Supabase SQL Editor
-- Copy contents of supabase/migrations/002_add_payments.sql
```

This creates:
- `package_purchases` table
- `package_sessions` table
- Necessary indexes

## Stripe Dashboard

Monitor:
- **Payments** → See successful transactions
- **Webhooks** → See webhook delivery status
- **Customers** → See customer records
- **Subscriptions** → See recurring subscriptions (if enabled)

## Security Notes

- ✅ Never commit Stripe keys to git
- ✅ Use test keys for development
- ✅ Switch to live keys only in production
- ✅ Webhook signature verification is implemented
- ✅ All payments go through secure Stripe Checkout

## Troubleshooting

### Webhook not receiving events
- Check webhook endpoint URL is correct
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Check webhook delivery logs in Stripe Dashboard
- For local: Make sure Stripe CLI is forwarding

### Payment succeeded but no record in Supabase
- Check webhook logs in Stripe Dashboard
- Check Supabase logs for errors
- Verify database migration ran successfully
- Check that `STRIPE_WEBHOOK_SECRET` is correct

### "STRIPE_SECRET_KEY is not set" error
- Make sure `.env.local` has the key
- Restart dev server after adding env vars
- In production: Check Vercel environment variables

## Next Steps After Payment

After a customer purchases a package:
1. They're redirected to `/booking-success`
2. Payment is recorded in `package_purchases` table
3. `sessions_remaining` is set to 4
4. Customer can now book sessions via Calendly
5. When they book via Calendly, link the booking to the package purchase
6. Decrement `sessions_remaining` when session is booked

## Linking Package Sessions to Calendly Bookings

You'll need to:
1. Track which Calendly bookings use package sessions
2. Update `package_sessions` table when bookings are made
3. Decrement `sessions_remaining` in `package_purchases`
4. Prevent booking if `sessions_remaining` is 0

This logic can be added to the Calendly webhook handler or booking flow.







