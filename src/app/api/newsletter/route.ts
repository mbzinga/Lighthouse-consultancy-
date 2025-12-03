import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseServer, validateSupabaseConfig } from '@/lib/supabaseServer'
import { sendNewsletterSignupNotification } from '@/lib/email'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(request: Request) {
  try {
    validateSupabaseConfig()
    const body = await request.json()
    const validated = newsletterSchema.parse(body)

    // Check if email already exists
    const { data: existing } = await supabaseServer
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', validated.email)
      .single()

    if (existing) {
      // Already subscribed - return success without error
      return NextResponse.json(
        { message: 'Already subscribed' },
        { status: 200 },
      )
    }

    // Insert new subscriber
    const { error } = await supabaseServer
      .from('newsletter_subscribers')
      .insert({ email: validated.email } as any)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 },
      )
    }

    // Send email notification to admin
    try {
      await sendNewsletterSignupNotification({ email: validated.email })
    } catch (emailError) {
      // Log email error but don't fail the request - subscriber was saved to DB
      console.error('Failed to send newsletter notification:', emailError)
    }

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address', details: error.issues },
        { status: 400 },
      )
    }

    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 },
    )
  }
}

