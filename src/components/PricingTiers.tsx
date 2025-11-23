'use client'

import { useRouter } from 'next/navigation'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/Button'
import type { BookingOption } from '@/config/site'

interface PricingTiersProps {
  tiers: BookingOption[]
}

export function PricingTiers({ tiers }: PricingTiersProps) {
  // Transform BookingOption data to work with our pricing display
  const displayTiers = tiers.map((booking) => {
    // Generate features based on booking type and details
    let features: string[] = []
    
    if (booking.type === 'package' && booking.packageDetails) {
      features = booking.packageDetails.includes
    } else {
      features = [
        `${booking.duration} minute consultation`,
        'Follow-up email with summary',
        'Expert SEND support',
        'Calendly booking integration',
      ]
    }

    return {
      ...booking,
      features,
    }
  })

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-teal-600">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-charcoal-900 sm:text-6xl">
            Choose your consultation
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-charcoal-600 sm:text-xl/8">
          Select the option that best fits your needs.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {displayTiers.map((tier, index) => {
            // Make the middle tier featured (most popular)
            const isFeatured = index === 1
            
            return (
              <TierCard key={tier.id} tier={tier} isFeatured={isFeatured} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TierCard({ tier, isFeatured }: { tier: BookingOption & { features: string[] }, isFeatured: boolean }) {
  const router = useRouter()

  const handleBookClick = () => {
    if (!tier.stripePriceId) {
      return
    }
    router.push(`/book/${tier.id}`)
  }

  const priceSuffix = tier.type === 'package' && tier.packageDetails?.recurring ? '/month' : '/session'

  return (
    <div
      data-featured={isFeatured ? 'true' : undefined}
      className="group/tier flex flex-col rounded-3xl p-8 ring-1 ring-gray-200 data-featured:ring-2 data-featured:ring-teal-600 xl:p-10"
    >
      <div className="flex items-start justify-between gap-x-4">
        <div className="flex-1">
          <h3
            id={`tier-${tier.id}`}
            className="text-lg/8 font-semibold text-charcoal-900 group-data-featured/tier:text-teal-600"
          >
            {tier.title}
          </h3>
          {tier.duration > 0 && (
            <p className="mt-1 text-sm text-charcoal-500">
              {tier.duration} minutes
            </p>
          )}
        </div>
        {isFeatured && (
          <span className="inline-flex items-center rounded-full bg-teal-600/10 px-2.5 py-1 text-xs font-semibold text-teal-600 shrink-0">
            Most popular
          </span>
        )}
      </div>
      <p className="mt-4 text-sm/6 text-charcoal-600 flex-grow">{tier.description}</p>
      
      <div className="mt-6">
        <p className="flex items-baseline gap-x-1">
          <span className="text-4xl font-semibold tracking-tight text-charcoal-900">
            £{tier.price}
          </span>
          <span className="text-sm/6 font-semibold text-charcoal-600">{priceSuffix}</span>
        </p>
      </div>

      <Button
        onClick={handleBookClick}
        disabled={!tier.stripePriceId}
        className="mt-8 w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        aria-label={tier.type === 'package' ? `Purchase ${tier.title}` : `Book ${tier.title}`}
        title={!tier.stripePriceId ? 'Payment not configured for this option' : undefined}
      >
        {tier.type === 'package' ? 'Purchase Package' : 'Book now'}
      </Button>

      <ul role="list" className="mt-8 space-y-3 text-sm/6 text-charcoal-600 xl:mt-10">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-teal-600" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

