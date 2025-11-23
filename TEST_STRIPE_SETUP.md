# Test Stripe Product Setup

Since you're using **live Stripe keys**, we should create a small test product to safely test the payment flow.

## Option 1: Create a Test Product in Stripe (Recommended)

### Steps:

1. **Go to Stripe Dashboard** → **Products**
2. **Click "+ Add product"**
3. **Create a test product:**
   - **Name**: `Test Consultation - £1`
   - **Description**: `Test booking for development`
   - **Pricing**: 
     - One-time payment
     - Amount: `£1.00` (or £0.50 to keep it very cheap)
   - **Click "Save product"**

4. **Copy the Price ID** (starts with `price_...`)

5. **Temporarily update `src/config/site.ts`**:
   ```typescript
   {
     id: 'starter-consultation',
     // ... other fields ...
     stripePriceId: 'price_YOUR_TEST_PRICE_ID', // Use test product temporarily
   }
   ```

6. **Test the flow**, then switch back to your real Price IDs

## Option 2: Use Stripe Test Mode

Alternatively, switch to test mode:

1. **Get test keys** from Stripe Dashboard:
   - Developers → API keys
   - Toggle to "Test mode"
   - Copy test keys

2. **Update `.env.local`** with test keys:
   ```bash
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_... # From test webhook
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

3. **Create test products** in test mode (won't charge real money)

## Recommended Approach

For now, let's create a **£1 test product** using your live Stripe account:

1. Create the product (see steps above)
2. I'll update the config to use it temporarily
3. Test the complete flow
4. Switch back to real products when ready

**Important**: Even with live keys, you can make test purchases and refund them through Stripe Dashboard if needed.







