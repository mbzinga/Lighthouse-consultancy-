import { NextResponse } from 'next/server'
import { createSchedulingLink } from '@/lib/calendly'
import { validateSupabaseConfig } from '@/lib/supabaseServer'
import { supabaseServer } from '@/lib/supabaseServer'
import type { Database } from '@/types/database'

type PackagePurchase = Database['public']['Tables']['package_purchases']['Row']

export async function POST(request: Request) {
  try {
    validateSupabaseConfig()

    const formData = await request.formData()
    const packagePurchaseId = formData.get('packagePurchaseId') as string
    const eventTypeUri = formData.get('eventTypeUri') as string

    if (!packagePurchaseId || !eventTypeUri) {
      return NextResponse.json(
        { error: 'Missing packagePurchaseId or eventTypeUri' },
        { status: 400 },
      )
    }

    // Get package purchase to verify it exists and has sessions remaining
    const { data, error: purchaseError } = await supabaseServer
      .from('package_purchases')
      .select('*')
      .eq('id', packagePurchaseId)
      .single()

    if (purchaseError || !data) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 400 },
      )
    }

    const purchase = data as PackagePurchase

    if (purchase.sessions_remaining <= 0) {
      return NextResponse.json(
        { error: 'No sessions remaining' },
        { status: 400 },
      )
    }

    // Create Calendly scheduling link with package metadata
    const metadata = purchase.metadata as { audience?: string }
    const booking_url = await createSchedulingLink(eventTypeUri, {
      packagePurchaseId: packagePurchaseId,
      email: purchase.email,
      audience: metadata?.audience || 'family',
      utm_campaign: 'package_booking',
    })

    // Redirect to Calendly
    return NextResponse.redirect(booking_url)
  } catch (error) {
    console.error('Error creating booking link:', error)
    return NextResponse.json(
      { error: 'Failed to create booking link' },
      { status: 500 },
    )
  }
}

