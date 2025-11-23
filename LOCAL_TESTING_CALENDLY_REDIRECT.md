# Local Testing: Calendly Redirect Setup

Since Calendly cannot redirect to `localhost` URLs, here are options for testing the redirect locally.

## Option 1: Use ngrok (Recommended for Local Testing)

ngrok creates a public URL that tunnels to your localhost.

### Steps:

1. **Install ngrok**:
   ```bash
   # macOS
   brew install ngrok
   
   # Or download from https://ngrok.com/download
   ```

2. **Start your Next.js dev server**:
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
   ```

3. **Start ngrok tunnel**:
   ```bash
   ngrok http 3000
   ```

4. **Copy the HTTPS URL** that ngrok provides (e.g., `https://abc123.ngrok.io`)

5. **Configure Calendly redirect** with:
   ```
   https://abc123.ngrok.io/booking-confirmed?invitee_uri={invitee_uri}
   ```

6. **Test the flow** - now Calendly can redirect to your local server via ngrok

**Note:** The ngrok URL changes each time you restart ngrok (unless you have a paid plan with custom domains).

## Option 2: Deploy to Vercel Preview (Recommended for Staging)

If you're using Vercel, preview deployments are perfect for testing:

1. **Deploy to Vercel**:
   ```bash
   vercel
   ```

2. **Get your preview URL** (e.g., `https://lighthouse-send-abc123.vercel.app`)

3. **Configure Calendly redirect** with:
   ```
   https://lighthouse-send-abc123.vercel.app/booking-confirmed?invitee_uri={invitee_uri}
   ```

4. **Test the full flow**

5. **Update to production URL** when ready for production

## Option 3: Skip Redirect for Local Testing

If you just want to test the booking flow without the redirect:

1. **Don't configure the redirect** in Calendly yet
2. **Test the booking flow** - users will see Calendly's default thank you page
3. **Check Supabase** to verify bookings are being saved via webhook
4. **Manually visit** `/booking-confirmed?invitee_uri=YOUR_INVITEE_URI` to test the confirmation page

## Quick Reference: URL Format

**Format:**
```
https://YOUR_DOMAIN/booking-confirmed?invitee_uri={invitee_uri}
```

**Examples:**
- Production: `https://lighthousesend.com/booking-confirmed?invitee_uri={invitee_uri}`
- Vercel Preview: `https://lighthouse-send-abc123.vercel.app/booking-confirmed?invitee_uri={invitee_uri}`
- ngrok: `https://abc123.ngrok.io/booking-confirmed?invitee_uri={invitee_uri}`

**❌ Will NOT work:**
- `http://localhost:3000/booking-confirmed?invitee_uri={invitee_uri}` (localhost)
- `http://192.168.1.101:3000/booking-confirmed?invitee_uri={invitee_uri}` (local IP)

## Getting Your Invitee URI for Testing

If you want to test the confirmation page manually:

1. Make a test booking through your normal flow
2. Check Supabase `bookings` table for the `calendly_invitee_uri` value
3. Visit: `/booking-confirmed?invitee_uri=YOUR_INVITEE_URI_FROM_SUPABASE`







