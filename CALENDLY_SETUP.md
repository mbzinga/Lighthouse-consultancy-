# Calendly API Setup Guide

## Step 1: Create a Personal Access Token

1. Log in to your Calendly account
2. Go to **Settings** → **Integrations** → **API & Webhooks**
3. Scroll down to **Personal Access Tokens**
4. Click **Create New Token**
5. Give it a name (e.g., "Lighthouse Website")
6. Set expiration (or leave blank for no expiration)
7. Click **Create Token**
8. **IMPORTANT**: Copy the token immediately - you won't be able to see it again!

Add this token to `.env.local`:
```
CALENDLY_PERSONAL_ACCESS_TOKEN=paste_your_token_here
```

## Step 2: Get Your Organization URI

1. In Calendly, go to **Settings** → **Integrations** → **API & Webhooks**
2. Look for **Organization URI** or **Account URI**
3. It will look like: `https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA`
4. Copy the full URI

Add to `.env.local`:
```
CALENDLY_ORG_URI=https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA
```

## Step 3: Get Your Owner/User URI

1. Still in **Settings** → **Integrations** → **API & Webhooks**
2. Look for **User URI** or **Owner URI**
3. It will look like: `https://api.calendly.com/users/AAAAAAAAAAAAAAAA`
4. Copy the full URI

Add to `.env.local`:
```
CALENDLY_OWNER_URI=https://api.calendly.com/users/AAAAAAAAAAAAAAAA
```

**Alternative Method**: If you can't find these URIs in the UI, you can get them via the API:
```bash
# Test your token works (replace YOUR_TOKEN)
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.calendly.com/users/me
```

The response will include your user URI. The organization URI is usually shown in the response or you can get it from:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.calendly.com/organizations
```

## Step 4: Create Your 3 Event Types

You need to create 3 event types in Calendly that match your booking options:

### 1. Starter Consultation (45 minutes, £50)
1. Go to **Event Types** in Calendly
2. Click **+ New Event Type**
3. Choose **One-on-One** or **Meeting**
4. Set:
   - Name: "Starter Consultation"
   - Duration: 45 minutes
   - Description: "An initial consultation to discuss your needs and explore how we can support you."
5. Save
6. **Copy the Event Type URI** from the URL or API
   - URI format: `https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA`

### 2. Deep Dive Assessment (90 minutes, £95)
1. Create another event type
2. Set:
   - Name: "Deep Dive Assessment"
   - Duration: 90 minutes
   - Description: "A comprehensive assessment to understand your child's needs and create a detailed action plan."
3. Save and copy the Event Type URI

### 3. Follow-up & Action Plan (45 minutes, £60)
1. Create another event type
2. Set:
   - Name: "Follow-up & Action Plan"
   - Duration: 45 minutes
   - Description: "A follow-up session to review progress and refine your action plan."
3. Save and copy the Event Type URI

## Step 5: Update the Config File

Once you have all 3 Event Type URIs, update `src/config/site.ts`:

```typescript
bookingOptions: [
  {
    id: 'starter-consultation',
    // ... other fields
    eventTypeUri: 'https://api.calendly.com/event_types/YOUR_STARTER_URI',
  },
  {
    id: 'deep-dive-assessment',
    // ... other fields
    eventTypeUri: 'https://api.calendly.com/event_types/YOUR_DEEP_DIVE_URI',
  },
  {
    id: 'follow-up-action-plan',
    // ... other fields
    eventTypeUri: 'https://api.calendly.com/event_types/YOUR_FOLLOWUP_URI',
  },
]
```

## Step 6: Verify It Works

Test the API connection:
```bash
# Should return your event types
npm run dev
# Then visit: http://localhost:3000/api/calendly/event-types
```

Or use curl:
```bash
curl http://localhost:3000/api/calendly/event-types
```

## Step 7: Register Webhooks (After Deployment)

Once you've deployed to production:
```bash
# Set APP_BASE_URL in .env.local to your production URL
APP_BASE_URL=https://your-domain.com

# Register webhooks
npm run webhook:register
```

## Troubleshooting

### Can't find Organization URI?
- Try checking your Calendly account settings
- Or use the API: `curl -H "Authorization: Bearer YOUR_TOKEN" https://api.calendly.com/organizations`

### Event types not showing?
- Make sure they're set to "Active" in Calendly
- Verify your `CALENDLY_OWNER_URI` matches the user who created them

### API returns 401 Unauthorized?
- Check your Personal Access Token is correct
- Make sure the token hasn't expired
- Verify you're using `Bearer` authentication







