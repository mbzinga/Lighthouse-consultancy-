# Lighthouse Consultancy - Verification Checklist

## ✅ Phase 1: Foundation & Configuration

### Dependencies
- [x] @supabase/supabase-js installed
- [x] zod installed
- [x] vitest installed
- [x] tsx installed for scripts
- [x] Package.json scripts configured

### Configuration
- [x] `src/config/site.ts` created with booking options
- [x] Types defined in `src/types/index.ts`
- [x] Environment variables template ready

**Action Required**: 
- Create `.env.local` with your Supabase and Calendly credentials

## ✅ Phase 2: Supabase Integration

### Database
- [x] Migration SQL created: `supabase/migrations/001_initial_schema.sql`
- [x] Supabase client utilities created
- [x] Database types defined

**Action Required**:
1. Run the migration in Supabase SQL Editor:
   ```sql
   -- Copy contents of supabase/migrations/001_initial_schema.sql
   -- Run in Supabase Dashboard → SQL Editor
   ```

2. Verify tables created:
   - `bookings` table exists
   - `contacts` table exists
   - Indexes are created

### Environment Variables
Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## ✅ Phase 3: Calendly Integration

### API Client
- [x] Calendly client library created (`src/lib/calendly.ts`)
- [x] API routes created:
  - `/api/calendly/event-types`
  - `/api/calendly/scheduling-link`
  - `/api/calendly/webhook`
- [x] Webhook registration script created

**Action Required**:
1. Create 3 event types in Calendly:
   - Starter Consultation (45 min, £50)
   - Deep Dive Assessment (90 min, £95)
   - Follow-up & Action Plan (45 min, £60)

2. Get Calendly credentials:
   - Personal Access Token (Calendly → Integrations → API & Webhooks)
   - Organization URI
   - Owner/User URI

3. Update `src/config/site.ts` with event type URIs:
   ```typescript
   bookingOptions: [
     {
       eventTypeUri: 'https://api.calendly.com/event_types/XXXX', // Add here
       // ...
     }
   ]
   ```

4. Add to `.env.local`:
   ```
   CALENDLY_PERSONAL_ACCESS_TOKEN=your-token
   CALENDLY_ORG_URI=https://api.calendly.com/organizations/XXXX
   CALENDLY_OWNER_URI=https://api.calendly.com/users/XXXX
   APP_BASE_URL=https://your-domain.com
   ```

## ✅ Phase 4: UI Components

### Base Components
- [x] Nav component (replaces Header)
- [x] Footer updated
- [x] Section component
- [x] Layout component updated

### Feature Components
- [x] BookingCard component
- [x] ContactForm component
- [x] FAQ accordion component
- [x] Toast notification component

**Test**:
- [ ] Navigation works on mobile and desktop
- [ ] Booking cards display correctly
- [ ] Contact forms validate input
- [ ] FAQ accordion expands/collapses

## ✅ Phase 5: Pages

### All Pages Created
- [x] Home page (`/`)
- [x] Services for Families (`/services/families`)
- [x] Services for Schools (`/services/schools`)
- [x] Services for Local Authorities (`/services/local-authorities`)
- [x] Pricing (`/pricing`)
- [x] About (`/about`)
- [x] Contact (`/contact`)
- [x] Resources (`/resources`)
- [x] Legal pages (Privacy, Terms, Cookies)
- [x] Thank You page (`/thank-you`)

**Test Each Page**:
- [ ] All pages load without errors
- [ ] Metadata and SEO tags are correct
- [ ] Mobile responsive layout works
- [ ] Links navigate correctly

## ✅ Phase 6: Styling & Accessibility

- [x] Tailwind theme updated with brand colors
- [x] WCAG AA contrast ratios
- [x] Large touch targets (44x44px)
- [x] Clear focus states
- [x] Reduced motion support

**Test**:
- [ ] Colors meet accessibility standards
- [ ] Keyboard navigation works
- [ ] Screen reader testing (optional)

## ✅ Phase 7: API Routes

- [x] `/api/contacts` - Contact form submissions
- [x] `/api/calendly/event-types` - List event types
- [x] `/api/calendly/scheduling-link` - Create booking links
- [x] `/api/calendly/webhook` - Receive Calendly webhooks

**Test**:
- [ ] Contact form submits to Supabase
- [ ] Booking cards create Calendly links
- [ ] Webhook receives events from Calendly

## ✅ Phase 8: SEO

- [x] Sitemap generated
- [x] Robots.txt configured
- [x] Metadata on all pages
- [x] Open Graph tags

## ✅ Phase 9: Testing

- [x] Vitest configured
- [x] Test setup file created
- [x] Sample test for Calendly client

**Action**: Run tests with `npm test`

## ✅ Phase 10: Documentation

- [x] README updated with setup instructions
- [x] Environment variables documented
- [x] Deployment checklist included

## Next Steps

### 1. Local Testing
```bash
# Start dev server
npm run dev

# Test:
# - Visit http://localhost:3000
# - Try booking flow
# - Submit contact form
# - Check Supabase for data
```

### 2. Calendly Webhook Registration
```bash
# After deploying to production
npm run webhook:register
```

### 3. Production Deployment
1. Push to GitHub
2. Connect to Vercel
3. Add all environment variables
4. Deploy
5. Register webhooks
6. Test end-to-end

## Verification Commands

```bash
# Build test
npm run build

# Run tests
npm test

# Lint check
npm run lint

# Start dev server
npm run dev
```

