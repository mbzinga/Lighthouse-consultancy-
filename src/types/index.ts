import { z } from 'zod'

export type Audience = 'family' | 'school' | 'la'

// Booking types (Supabase)
export interface Booking {
  id: string
  calendly_invitee_uri: string
  event_type_uri: string
  email: string
  name: string
  starts_at: string
  ends_at: string
  audience: Audience
  notes: string | null
  status: 'scheduled' | 'canceled'
  raw: Record<string, unknown>
  created_at: string
  updated_at: string
}

// Contact types (Supabase)
export interface Contact {
  id: string
  name: string
  email: string
  organisation: string | null
  audience: Audience
  message: string
  source: 'contact_form' | 'school_pkg' | 'la_pkg'
  created_at: string
}

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  organisation: z.string().max(200).optional(),
  audience: z.enum(['family', 'school', 'la']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Calendly API types
export interface CalendlyEventType {
  uri: string
  name: string
  active: boolean
  slug: string
  scheduling_url: string
  duration: number
  kind: string
  pooling_type: string | null
  type: string
  color: string
  created_at: string
  updated_at: string
  internal_note: string | null
  description_plain: string | null
  description_html: string | null
  profile: {
    type: string
    name: string
    owner: string
  }
  secret: boolean
  booking_methods: string[]
  custom_questions: unknown[]
  deleted_at: string | null
}

export interface CalendlyEventTypesResponse {
  collection: CalendlyEventType[]
  pagination: {
    count: number
    next_page: string | null
    previous_page: string | null
    next_page_token: string | null
    previous_page_token: string | null
  }
}

export interface CalendlySchedulingLink {
  owner: string
  owner_type: string
  event_type: string
  booking_url: string
}

export interface CalendlySchedulingLinkResponse {
  resource: CalendlySchedulingLink
}

export interface CalendlyWebhookPayload {
  event: 'invitee.created' | 'invitee.canceled'
  time: string
  payload: {
    invitee: {
      uri: string
      name: string
      email: string
      event: string
    }
    event: {
      uri: string
      name: string
      start_time: string
      end_time: string
      event_type: string
    }
    questions_and_answers?: Array<{
      question: string
      answer: string
    }>
    tracking?: {
      utm_campaign?: string
      utm_source?: string
      utm_medium?: string
      utm_content?: string
      salesforce_uuid?: string
    }
  }
}

// API Request/Response types
export interface SchedulingLinkRequest {
  eventTypeUri: string
  metadata?: {
    audience?: Audience
    [key: string]: unknown
  }
}

export interface SchedulingLinkResponse {
  booking_url: string
}








