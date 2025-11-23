# Updated Booking System - Stripe Integration

## Overview

The booking system now supports:
1. **Single Sessions** - Direct Calendly booking (no payment required upfront)
   - Starter Consultation (£50, 45 min)
   - Extended Consultation (£95, 90 min)

2. **Monthly Advocacy Package** - Stripe payment required first (£200/month)
   - Includes: Advocacy services, document reviews, 4 sessions
   - Recurring monthly subscription
   - After payment, customer can book their 4 sessions via Calendly

## What's Changed

### Configuration (`src/config/site.ts`)

- Added `type: 'single' | 'package'` to booking options
- Added `packageDetails` for package options
- Updated booking options:
  - Removed "Follow-up & Action Plan" (you can add it back if needed)
  - Added "Monthly Advocacy Package" (£200)

### Database Schema

**New migration:** `supabase/migrations/002_add_payments.sql`

Creates:
- `package_purchases` table - Tracks Stripe payments
- `package_sessions` table - Links Calendly bookings to package purchases

**Run this migration in Supabase SQL Editor!**

### Stripe Integration

**API Routes:**
- `/api/stripe/create-checkout` - Creates Stripe Checkout session
- `/api/stripe/webhook` - Receives payment confirmations from Stripe

**Components:**
- `PackageCard.tsx` - Handles package purchase flow
- `BookingCard.tsx` - Updated to route packages to PackageCard

**Pages:**
- `/booking-success` - Shows payment confirmation and remaining sessions

## Setup Required

### 1. Run Database Migration

In Supabase SQL Editor, run:
```sql
-- Copy contents of supabase/migrations/002_add_payments.sql
```

### 2. Set Up Stripe

1. Create Stripe account
2. Get API keys (test keys for development)
3. Set up webhook endpoint (production URL)
4. Add to `.env.local`:

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

See `STRIPE_SETUP.md` for detailed instructions.

### 3. Environment Variables

Your `.env.local` should now include:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Calendly
CALENDLY_PERSONAL_ACCESS_TOKEN=...
CALENDLY_ORG_URI=...
CALENDLY_OWNER_URI=...

# Stripe (for package payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
APP_BASE_URL=http://localhost:3000
```

## How It Works

### Single Session Booking Flow

1. Customer clicks "Book now" on a single session card
2. API creates Calendly scheduling link
3. Customer redirected to Calendly to book
4. Calendly webhook creates booking record in Supabase

### Package Purchase Flow

1. Customer clicks "Purchase Package" on advocacy package card
2. Enters email and name
3. Redirected to Stripe Checkout
4. Completes payment
5. Stripe webhook creates `package_purchase` record with `sessions_remaining: 4`
6. Customer redirected to `/booking-success`
7. Customer can then book sessions via Calendly (needs implementation to link to package)

## Next Steps

### Link Package Sessions to Calendly Bookings

Currently, package purchases are tracked but not automatically linked to Calendly bookings. You'll need to:

1. **Option A:** Update Calendly webhook handler to:
   - Check if customer has an active package purchase
   - Link booking to package purchase
   - Decrement `sessions_remaining`

2. **Option B:** Create a custom booking flow that:
   - Checks package status before allowing Calendly redirect
   - Links the session when created

3. **Option C:** Manual linking through admin interface

Would you like me to implement the automatic linking?

## Testing

1. **Test Single Session:**
   ```bash
   npm run dev
   # Visit /pricing
   # Click "Book now" on Starter Consultation
   ```

2. **Test Package Purchase (with Stripe test keys):**
   ```bash
   npm run dev
   # Visit /pricing
   # Click "Purchase Package"
   # Use test card: 4242 4242 4242 4242
   ```

3. **Test Stripe Webhook (local):**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

## Files Changed

- `src/config/site.ts` - Updated booking options
- `src/components/BookingCard.tsx` - Routes packages to PackageCard
- `src/components/PackageCard.tsx` - New component for package purchases
- `src/app/api/stripe/*` - New Stripe integration routes
- `src/app/booking-success/page.tsx` - Payment confirmation page
- `supabase/migrations/002_add_payments.sql` - New database tables

## Notes

- All single sessions still work via Calendly (no Stripe needed)
- Only the package requires Stripe payment
- Package is set as recurring monthly subscription
- Sessions are tracked per package purchase
- Webhook handles payment confirmation automatically







