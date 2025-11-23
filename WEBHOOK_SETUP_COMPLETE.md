# Webhook Setup Status

✅ **Webhook Secret Added**: `whsec_your_webhook_secret_here`

## Still Needed

### 1. Stripe Secret Key
You still need to add your **Stripe Secret Key** (starts with `sk_live_`):

1. Go to Stripe Dashboard → **Developers** → **API keys**
2. Copy your **Secret key** (Reveal test/live key toggle if needed)
3. Update `.env.local`:
   ```bash
   STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
   ```

### 2. Configure Webhook in Stripe Dashboard

The webhook secret is set, but you need to:

1. **Go to Stripe Dashboard** → **Developers** → **Webhooks**
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://your-production-domain.com/api/stripe/webhook`
   - Replace `your-production-domain.com` with your actual domain (e.g., after deploying to Vercel)
   - For local testing: Use Stripe CLI (see below)
4. **Select events to listen to**:
   - ✅ `checkout.session.completed` (most important)
   - ✅ `customer.subscription.deleted` (optional, for cancellations)
5. **Copy the signing secret** and add it to your `.env.local` file

## Local Testing Setup

For local development, use Stripe CLI:

```bash
# Install Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Or download from: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# It will show a webhook signing secret - use that in .env.local for local testing
```

## Production Deployment

When deploying to Vercel:

1. **Add environment variables in Vercel Dashboard**:
   - `STRIPE_SECRET_KEY` = Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET` = Your webhook secret
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Your Stripe publishable key
   - Plus all your Supabase and Calendly keys

2. **Add webhook endpoint in Stripe** pointing to:
   `https://your-vercel-domain.vercel.app/api/stripe/webhook`

3. **Test**: Make a test purchase and verify webhook is received

## Current Status

✅ Webhook secret configured  
✅ Publishable key configured  
⏳ Secret key needed  
⏳ Webhook endpoint needs to be added in Stripe Dashboard (after deployment)  

Once you add the secret key, the payment flow will be fully functional!







