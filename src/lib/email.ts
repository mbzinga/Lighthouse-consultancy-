import { Resend } from 'resend'
import { siteConfig } from '@/config/site'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

function ensureResendClient() {
  if (!resend) {
    throw new Error(
      'Resend API key not configured. Set RESEND_API_KEY in your environment variables.',
    )
  }
  return resend
}

// Admin email to receive notifications
const ADMIN_EMAIL = siteConfig.contactEmails.info

// From email - use Resend's default until domain is verified
// After verifying your domain, change this to: `Lighthouse Consultancy <info@lighthousesend.com>`
const FROM_EMAIL = 'Lighthouse Consultancy <onboarding@resend.dev>'

export interface ContactFormEmailData {
  name: string
  email: string
  organisation?: string | null
  audience: 'family' | 'school' | 'la'
  message: string
}

export interface NewsletterSignupEmailData {
  email: string
}

export interface BookingNotificationEmailData {
  customerName: string
  customerEmail: string
  bookingTitle: string
  amount: number
  currency: string
}

/**
 * Send email notification when someone submits the contact form
 */
export async function sendContactFormNotification(data: ContactFormEmailData) {
  const audienceLabels = {
    family: 'Parent/Carer',
    school: 'School Professional',
    la: 'Local Authority Professional',
  }

  const { error } = await ensureResendClient().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0d9488; margin-bottom: 24px;">New Contact Form Submission</h1>
        
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #334155; font-size: 16px; margin: 0 0 16px 0;">Contact Details</h2>
          
          <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></p>
          ${data.organisation ? `<p style="margin: 8px 0;"><strong>Organisation:</strong> ${data.organisation}</p>` : ''}
          <p style="margin: 8px 0;"><strong>Type:</strong> ${audienceLabels[data.audience]}</p>
        </div>
        
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
          <h2 style="color: #334155; font-size: 16px; margin: 0 0 16px 0;">Message</h2>
          <p style="margin: 0; white-space: pre-wrap; color: #475569;">${data.message}</p>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
          This email was sent from the contact form on lighthousesend.com
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('Failed to send contact form notification:', error)
    throw new Error('Failed to send email notification')
  }
}

/**
 * Send email notification when someone signs up for the newsletter
 */
export async function sendNewsletterSignupNotification(data: NewsletterSignupEmailData) {
  const { error } = await ensureResendClient().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: 'New Newsletter Subscriber',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0d9488; margin-bottom: 24px;">New Newsletter Subscriber</h1>
        
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
          <p style="margin: 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></p>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
          This subscriber signed up via the newsletter form on lighthousesend.com
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('Failed to send newsletter signup notification:', error)
    throw new Error('Failed to send email notification')
  }
}

/**
 * Send email notification when someone completes a booking payment
 */
export async function sendBookingNotification(data: BookingNotificationEmailData) {
  const { error } = await ensureResendClient().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Booking: ${data.bookingTitle} from ${data.customerName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0d9488; margin-bottom: 24px;">New Booking Received</h1>
        
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #334155; font-size: 16px; margin: 0 0 16px 0;">Booking Details</h2>
          
          <p style="margin: 8px 0;"><strong>Service:</strong> ${data.bookingTitle}</p>
          <p style="margin: 8px 0;"><strong>Amount:</strong> £${(data.amount / 100).toFixed(2)} ${data.currency.toUpperCase()}</p>
        </div>
        
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
          <h2 style="color: #334155; font-size: 16px; margin: 0 0 16px 0;">Customer Details</h2>
          
          <p style="margin: 8px 0;"><strong>Name:</strong> ${data.customerName}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.customerEmail}" style="color: #0d9488;">${data.customerEmail}</a></p>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
          Payment was processed via Stripe. The customer will be scheduling their session via Calendly.
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('Failed to send booking notification:', error)
    throw new Error('Failed to send email notification')
  }
}

