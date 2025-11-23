import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseServer, validateSupabaseConfig } from '@/lib/supabaseServer'
import { contactFormSchema } from '@/types'

export async function POST(request: Request) {
  try {
    validateSupabaseConfig()
    const body = await request.json()
    const validated = contactFormSchema.parse(body)

    const contactData = {
      name: validated.name,
      email: validated.email,
      organisation: validated.organisation || null,
      audience: validated.audience,
      message: validated.message,
      source: 'contact_form' as const,
    }

    const { error } = await supabaseServer.from('contacts').insert(contactData as any)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save contact' },
        { status: 500 },
      )
    }

    return NextResponse.json({ message: 'Contact saved successfully' }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 },
      )
    }

    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 },
    )
  }
}

