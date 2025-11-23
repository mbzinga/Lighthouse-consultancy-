# Lighthouse Consultancy Website

A production-ready Next.js website for Lighthouse Consultancy, built with TypeScript, Tailwind CSS, Supabase, and Calendly API integration.

## Features

- **Marketing Website**: Clean, accessible design for families, schools, and local authorities
- **Calendly Integration**: Server-side booking flow using Calendly API (no embeds)
- **Supabase Backend**: Database for bookings, contacts, and lead capture
- **Booking System**: 3 consultation options with dynamic pricing
- **Stripe Payment Integration**: All bookings require payment before Calendly scheduling
- **Package Management**: System for tracking and booking multiple sessions from packages
- **Contact Forms**: Audience-aware forms with Supabase storage
- **Webhook Support**: Automatic booking synchronization from Calendly
- **SEO Optimized**: Sitemap, robots.txt, and comprehensive metadata
- **Accessibility**: WCAG AA compliant with focus states and ARIA labels

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** (from keynote-ts template)
- **Supabase** (database and optional auth)
- **Calendly API v2** (scheduling links and webhooks)
- **Zod** (form validation)
- **Vitest** (testing)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Calendly account with API access
- Vercel account (for deployment)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables template:

Create a `.env.local` file with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Calendly
CALENDLY_PERSONAL_ACCESS_TOKEN=your_calendly_personal_access_token
CALENDLY_ORG_URI=https://api.calendly.com/organizations/XXXX
CALENDLY_OWNER_URI=https://api.calendly.com/users/XXXX

# App
APP_BASE_URL=https://lighthouse.example.com
```

### Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Run the migration SQL:

```bash
# In Supabase SQL Editor or via CLI
psql -h your-project.supabase.co -U postgres -d postgres -f supabase/migrations/001_initial_schema.sql
```

Or copy the contents of `supabase/migrations/001_initial_schema.sql` into the Supabase SQL Editor and execute.

### Calendly Setup

1. **Create Event Types**: In your Calendly dashboard, create 3 event types matching:
   - Starter Consultation (45 minutes)
   - Deep Dive Assessment (90 minutes)
   - Follow-up & Action Plan (45 minutes)

2. **Get Event Type URIs**: For each event type, copy its URI (format: `https://api.calendly.com/event_types/XXXX`)

3. **Update Config**: Edit `src/config/site.ts` and add the event type URIs to each booking option:

```typescript
bookingOptions: [
  {
    id: 'starter-consultation',
    // ... other fields
    eventTypeUri: 'https://api.calendly.com/event_types/YOUR_URI_HERE',
  },
  // ... other options
]
```

4. **Get API Access**:
   - Go to Calendly Integrations → API & Webhooks
   - Create a Personal Access Token
   - Note your Organization URI and Owner (User) URI

### Running Locally

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Watch mode for tests
npm run test:watch
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Webhook Registration

Register Calendly webhooks to sync bookings automatically:

```bash
npm run webhook:register
```

This script:
- Registers webhooks for `invitee.created` and `invitee.canceled` events
- Points to `/api/calendly/webhook` endpoint
- Handles existing webhook cleanup

**Important**: Run this after deploying to production and setting `APP_BASE_URL` to your production domain.

#### Configure Redirect After Booking

After a user completes a booking on Calendly, you can redirect them back to your website's confirmation page. See **[CALENDLY_REDIRECT_SETUP.md](./CALENDLY_REDIRECT_SETUP.md)** for detailed instructions.

**Quick setup:**
1. Go to each Event Type in Calendly settings
2. Find "After booking" → "Redirect"
3. Set redirect URL to: `https://yourdomain.com/booking-confirmed?invitee_uri={invitee_uri}`
4. Replace `yourdomain.com` with your production domain

## Configuration

### Site Configuration

Edit `src/config/site.ts` to update:
- Site name, tagline, and metadata
- Booking options (prices, durations, descriptions)
- Contact emails
- SEO defaults

### Booking Options

Booking options are defined in `src/config/site.ts`. To add or modify:

1. Update the `bookingOptions` array
2. Ensure each option has a valid `eventTypeUri` from Calendly
3. The `id`, `title`, `price`, `duration`, and `description` fields control the display

### Styling

Brand colors are defined in `src/styles/tailwind.css`. The site uses:
- **Primary**: Teal (calming, gender-neutral)
- **Secondary**: Slate (accessible grays)
- All colors meet WCAG AA contrast requirements

## Project Structure

```
keynote-ts/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes (Calendly, contacts)
│   │   ├── services/     # Service pages
│   │   ├── legal/        # Legal pages
│   │   └── ...
│   ├── components/       # React components
│   ├── config/           # Site configuration
│   ├── lib/              # Utilities (Supabase, Calendly)
│   ├── types/            # TypeScript types
│   └── styles/           # Tailwind CSS
├── supabase/
│   └── migrations/       # Database migrations
├── scripts/              # Utility scripts
└── public/               # Static assets
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add all environment variables from `.env.local`
4. Deploy

### Post-Deployment

1. **Register Webhooks**: Run `npm run webhook:register` after first deployment
2. **Verify Webhook**: Create a test booking in Calendly and check Supabase `bookings` table
3. **Test Booking Flow**: Use the booking cards on the pricing page

## Testing

Run the test suite:

```bash
npm test
```

Tests cover:
- Calendly API client functions
- API route handlers (with mocking)
- Form validation schemas

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) | Yes |
| `CALENDLY_PERSONAL_ACCESS_TOKEN` | Calendly API token | Yes |
| `CALENDLY_ORG_URI` | Calendly organization URI | Yes |
| `CALENDLY_OWNER_URI` | Calendly user/owner URI | Yes |
| `APP_BASE_URL` | Production URL for webhooks | Yes (production) |

## Troubleshooting

### Bookings not syncing

1. Verify webhooks are registered: `npm run webhook:register`
2. Check webhook endpoint is accessible: `https://your-domain.com/api/calendly/webhook`
3. Review Supabase logs for errors
4. Verify `CALENDLY_OWNER_URI` matches your Calendly account

### API errors

1. Verify all environment variables are set
2. Check Calendly API token is valid
3. Ensure event type URIs in config match your Calendly event types

### Build errors

1. Ensure TypeScript strict mode passes: `npm run build`
2. Check all imports use `@/` alias correctly
3. Verify all environment variables are available

## License

This project is based on the Keynote template from Tailwind Plus. Please refer to the original template license.

## Support

For questions or issues, please contact [your support email] or open an issue in the repository.
