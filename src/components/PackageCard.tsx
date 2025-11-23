'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import type { BookingOption } from '@/config/site'

interface PackageCardProps {
  packageOption: BookingOption
  onPurchase?: (sessionUrl: string) => void
  onError?: (error: string) => void
}

export function PackageCard({
  packageOption,
  onPurchase,
  onError,
}: PackageCardProps) {
  const router = useRouter()

  const handlePurchaseClick = () => {
    if (!packageOption.stripePriceId) {
      onError?.('Payment not configured. Please contact support.')
      return
    }
    router.push(`/book/${packageOption.id}`)
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100 transition-shadow hover:shadow-xl hover:ring-teal-300">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-display font-semibold text-charcoal-900">
          {packageOption.title}
        </h3>
        <div className="text-right">
          <div className="text-3xl font-display font-semibold text-teal-600">
            £{packageOption.price}
          </div>
          {packageOption.packageDetails?.recurring && (
            <div className="text-sm text-charcoal-500">per month</div>
          )}
        </div>
      </div>
      <p className="mt-4 text-charcoal-500">{packageOption.description}</p>

      {packageOption.packageDetails && (
        <div className="mt-6 space-y-2">
          <h4 className="font-semibold text-charcoal-900">Package includes:</h4>
          <ul className="list-disc list-inside space-y-1 text-charcoal-500">
            {packageOption.packageDetails.includes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-charcoal-500">
            Includes {packageOption.packageDetails.sessions} consultation
            sessions
          </p>
        </div>
      )}

      <Button
        onClick={handlePurchaseClick}
        disabled={!packageOption.stripePriceId}
        className="mt-6 w-full"
        aria-label={`Purchase ${packageOption.title}`}
      >
        Purchase Package
      </Button>
    </div>
  )
}

