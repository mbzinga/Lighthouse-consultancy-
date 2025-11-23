# Calendly Redirect Setup Guide

This guide explains how to configure Calendly to redirect users back to your website after they complete a booking.

## Overview

After a user completes a booking on Calendly, we want them to be redirected to our `/booking-confirmed` page, which will:
- Display the booking details
- Show confirmation that an email is being sent
- Provide links to view bookings or return home

## Step-by-Step Setup

### 1. Get Your Confirmation Page URL

For **development** (localhost):
```
http://localhost:3000/booking-confirmed?invitee_uri={invitee_uri}
```

For **production** (after deployment to Vercel):
```
https://yourdomain.com/booking-confirmed?invitee_uri={invitee_uri}
```

The `{invitee_uri}` is a Calendly template variable that will be automatically replaced with the actual invitee URI when the redirect happens.

### 2. Configure Each Event Type in Calendly

You need to configure the redirect for each of your event types:

1. **SEND Consultation - 45 mins** (for Starter Consultation)
2. **Extended Consultation - 90 mins** (for Deep Dive Assessment)
3. Any event type used for package sessions

#### Steps for Each Event Type:

1. Log into your Calendly account at [calendly.com](https://calendly.com)

2. Go to **Event Types** (left sidebar)

3. Click on the event type you want to configure (e.g., "SEND Consultation - 45 mins")

4. Scroll down to find the **"After booking"** section (or **"Thank you page"** settings)

5. Look for **"Redirect"** or **"Custom redirect URL"** option

6. Enable the redirect option

7. Enter your redirect URL with the template variable:
   ```
   https://yourdomain.com/booking-confirmed?invitee_uri={invitee_uri}
   ```
   
   **⚠️ Important:** 
   - Replace `yourdomain.com` with your actual production domain (e.g., `lighthousesend.com`)
   - **Cannot use `localhost`** - Calendly's servers cannot access localhost URLs, so the redirect will fail validation
   - Must use `https://` (not `http://`) in production
   - For local testing, you'll need to either:
     - Use a tunneling service like [ngrok](https://ngrok.com) to expose your localhost
     - Or wait until you deploy to production/Vercel to configure the redirect

8. Save the settings

9. Repeat for all event types used in your booking system

### 3. Calendly Template Variables

Calendly supports several template variables you can use in redirect URLs:

- `{invitee_uri}` - The unique URI for the invitee (what we use to look up booking details)
- `{event_uri}` - The unique URI for the event
- `{invitee_email}` - The invitee's email address
- `{invitee_name}` - The invitee's name

**We use `{invitee_uri}` because:**
- It's unique and can be used to look up the booking in Supabase
- The webhook saves bookings with `calendly_invitee_uri`, so we can match them
- It's the most reliable identifier

### 4. Alternative: Using Calendly Webhooks (Already Set Up)

**Note:** We already have webhooks set up that save bookings to Supabase automatically. The redirect is optional but provides a better user experience by showing immediate confirmation.

The redirect works alongside the webhook:
1. User completes booking on Calendly
2. Calendly webhook fires → saves booking to Supabase
3. User is redirected to `/booking-confirmed` → page looks up booking by `invitee_uri`

### 5. Testing the Redirect

1. Make a test booking through your normal flow:
   - Go to your pricing page
   - Click "Book now" on a single session
   - Complete Stripe payment
   - Complete Calendly booking

2. After submitting the Calendly form, you should be redirected to:
   ```
   /booking-confirmed?invitee_uri=https://api.calendly.com/invitees/...
   ```

3. The page should display:
   - ✅ Success message
   - Booking date and time
   - Duration
   - Confirmation that email is being sent

### 6. Troubleshooting

#### "Is not a valid URL" Error?

**Common causes:**
1. **Localhost URL**: Calendly cannot validate `localhost` URLs because they're not publicly accessible
   - **Solution**: Use your production domain (e.g., `https://yourdomain.vercel.app`) or use ngrok for local testing
   
2. **URL truncated**: The input field might be cutting off your URL
   - **Solution**: Make sure the entire URL is visible: `https://yourdomain.com/booking-confirmed?invitee_uri={invitee_uri}`
   - Ensure there are no extra spaces or characters
   
3. **HTTP instead of HTTPS**: Production URLs must use `https://`
   - **Solution**: Change `http://` to `https://`
   
4. **Missing curly braces**: The template variable must include the braces
   - **Correct**: `{invitee_uri}`
   - **Incorrect**: `invitee_uri` or `{{invitee_uri}}`

#### Redirect not working?
- **Check the URL format**: Make sure you're using the exact format with `{invitee_uri}` (including the curly braces in Calendly settings)
- **Verify the event type**: Ensure you configured the redirect for the correct event type
- **Check for typos**: The URL must be exactly correct, including `http://` or `https://`
- **Test in incognito**: Sometimes browser caching can interfere

#### Booking details not showing?
- **Check webhook delivery**: The booking must be saved to Supabase first. Check Supabase logs or the `bookings` table
- **Verify invitee_uri format**: The URI should start with `https://api.calendly.com/invitees/`
- **Check Supabase query**: Ensure the `calendly_invitee_uri` field matches what's in the redirect URL

#### Local development issues?
- **Cannot use localhost**: Calendly cannot access `localhost` URLs. See **[LOCAL_TESTING_CALENDLY_REDIRECT.md](./LOCAL_TESTING_CALENDLY_REDIRECT.md)** for solutions:
  1. Use ngrok to create a public tunnel to your localhost
  2. Deploy to Vercel preview environment for testing
  3. Or temporarily skip the redirect and test the webhook only

### 7. Production Checklist

Before going live, ensure:

- ✅ All event types have redirect URLs configured
- ✅ Production domain is set correctly (not localhost)
- ✅ HTTPS is enabled (required for production)
- ✅ Redirect URL is tested and working
- ✅ Supabase webhook is receiving events
- ✅ Booking confirmation page is accessible

## Alternative: No Redirect (Webhook Only)

If you prefer not to use redirects, you can:

1. Remove the redirect URL from Calendly settings
2. Users will see Calendly's default thank you page
3. Bookings will still be saved via webhook
4. Users can manually navigate to `/my-bookings` to see their bookings

This is a valid approach, but the redirect provides a better integrated experience.

## Next Steps

After setting up redirects:

1. Test the full flow end-to-end
2. Verify bookings appear in Supabase
3. Check that the confirmation page displays correctly
4. Monitor for any redirect errors in production

For support with Calendly-specific issues, refer to [Calendly's redirect documentation](https://help.calendly.com/hc/en-us/articles/223147027-Redirecting-invitees-after-booking).

