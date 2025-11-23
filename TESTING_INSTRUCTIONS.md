# Testing Payment Flow

## Current Setup

✅ **Dev server running on**: http://localhost:3001  
✅ **Test Price ID configured**: `price_1SNc4aIrJSp147ZwRGwfMNeg` (£1 Test Consultation)

## Test Flow

1. **Visit the pricing page**:
   ```
   http://localhost:3001/pricing
   ```

2. **Click "Book now" on "Starter Consultation"**:
   - It will use the test Price ID (£1)
   - Enter your email and name when prompted
   - You'll be redirected to Stripe Checkout

3. **Complete test payment**:
   - Use a real card (since you're on live Stripe)
   - Amount should be £1.00
   - Complete the payment

4. **After payment**:
   - You should be redirected to `/booking-success`
   - For single sessions: Auto-redirects to Calendly booking page
   - Check Supabase `package_purchases` table to verify payment was saved

5. **Verify in Stripe Dashboard**:
   - Go to Stripe Dashboard → Payments
   - You should see the £1 test payment
   - Check the webhook delivery status

6. **Check webhook**:
   - Stripe Dashboard → Developers → Webhooks
   - View delivery logs for `checkout.session.completed` event
   - Should show successful webhook delivery

## What to Test

✅ Payment flow works  
✅ Stripe redirects correctly  
✅ Webhook receives payment confirmation  
✅ Payment saved to Supabase  
✅ Auto-redirect to Calendly (for single sessions)  
✅ Success page displays correctly  

## After Testing

To switch back to production Price IDs:

1. Edit `src/config/site.ts`
2. Replace `price_1SNc4aIrJSp147ZwRGwfMNeg` with:
   - `price_1SLnn7IrJSp147Zwq83YvKmV` (Basic Consultation)
3. Restart dev server

Or see `src/config/site.ts.test-backup` for all original Price IDs.

## Troubleshooting

**Payment not going through?**
- Check Stripe Dashboard for payment errors
- Verify `STRIPE_SECRET_KEY` is correct in `.env.local`

**Webhook not working?**
- Check Stripe Dashboard → Webhooks → Delivery logs
- Verify webhook endpoint URL is correct
- For local testing, use Stripe CLI: `stripe listen --forward-to localhost:3001/api/stripe/webhook`

**Not redirecting to Calendly?**
- Check browser console for errors
- Verify Calendly event type URI is correct
- Check network tab for API call to `/api/calendly/scheduling-link`







