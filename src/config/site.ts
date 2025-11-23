export type Audience = 'family' | 'school' | 'la'

export type BookingOption = {
  id: string
  title: string
  price: number
  duration: number // minutes
  description: string
  eventTypeUri: string // Calendly event type URI
  audience: Audience
  stripePriceId: string // Stripe Price ID for existing product
  type: 'single' | 'package' // single session or package
  packageDetails?: {
    sessions: number
    includes: string[]
    recurring?: boolean
  }
}

export const siteConfig = {
  name: 'Lighthouse Consultancy',
  tagline: 'Supporting families, schools, and local authorities with SEND expertise',
  primaryAudience: 'family' as Audience,
  secondaryAudiences: ['school', 'la'] as Audience[],

  bookingOptions: [
    {
      id: 'starter-consultation',
      title: 'Starter Consultation',
      price: 50,
      duration: 45,
      description: 'An initial consultation to discuss your needs and explore how we can support you.',
      eventTypeUri: 'https://api.calendly.com/event_types/376eda83-fc4c-4edc-80bc-f188a98f6b07', // SEND Consultation - 45 mins
      stripePriceId: 'price_1SLnn7IrJSp147Zwq83YvKmV', // Basic Consultation
      audience: 'family' as Audience,
      type: 'single',
    },
    {
      id: 'deep-dive-assessment',
      title: 'Extended Consultation',
      price: 95,
      duration: 90,
      description: 'A comprehensive extended consultation to understand your child\'s needs and create a detailed action plan.',
      eventTypeUri: 'https://api.calendly.com/event_types/578487b4-2123-4c64-bd27-82b9c53ffa97', // Extended Consultation - 90 mins
      stripePriceId: 'price_1SLnntIrJSp147ZwwZihcxPM', // Extended Consultation
      audience: 'family' as Audience,
      type: 'single',
    },
    {
      id: 'advocacy-package',
      title: 'Monthly Advocacy Package',
      price: 200,
      duration: 0, // Package includes multiple sessions
      description: 'Complete support package including advocacy services, document reviews, and ongoing sessions.',
      eventTypeUri: 'https://api.calendly.com/event_types/376eda83-fc4c-4edc-80bc-f188a98f6b07', // Use one of your event types for package sessions
      stripePriceId: 'price_1SLnq5IrJSp147ZwXTq1PxUG', // Ongoing (Monthly Advocacy Package)
      audience: 'family' as Audience,
      type: 'package',
      packageDetails: {
        sessions: 4,
        includes: [
          'Attending meetings as an advocate',
          'Reviewing documents',
          '4 consultation sessions',
          'Monthly recurring package',
        ],
        recurring: true,
      },
    },
  ] as BookingOption[],

  contactEmails: {
    info: 'info@lighthousesend.com',
    bookings: 'bookings@lighthousesend.com',
  },

  social: {
    twitter: '',
    linkedin: '',
    facebook: '',
  },

  seo: {
    defaults: {
      title: 'Lighthouse Consultancy',
      description:
        'Expert SEND consultancy supporting families, schools, and local authorities. Book a consultation today.',
      ogImage: '/og-image.jpg',
    },
    titleTemplate: '%s | Lighthouse Consultancy',
  },
} as const

