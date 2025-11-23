'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import type { BookingOption } from '@/config/site'
import { PackageCard } from '@/components/PackageCard'

interface BookingCardProps {
  booking: BookingOption
  onBookingError?: (error: string) => void
}

function SingleSessionCard({
  booking,
  onBookingError,
}: {
  booking: BookingOption
  onBookingError?: (error: string) => void
}) {
  const router = useRouter()

  const handleBookClick = () => {
    if (!booking.eventTypeUri || !booking.stripePriceId) {
      onBookingError?.('Payment not configured. Please contact support.')
      return
    }
    router.push(`/book/${booking.id}`)
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100 transition-shadow hover:shadow-xl hover:ring-teal-300">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-display font-semibold text-charcoal-900">{booking.title}</h3>
        <div className="text-right">
          <div className="text-3xl font-display font-semibold text-teal-600">
            £{booking.price}
          </div>
          <div className="text-sm text-charcoal-500">{booking.duration} minutes</div>
        </div>
      </div>
      <p className="mt-4 text-charcoal-500">{booking.description}</p>
      <Button
        onClick={handleBookClick}
        disabled={!booking.eventTypeUri || !booking.stripePriceId}
        className="mt-6 w-full"
        aria-label={`Book ${booking.title}`}
      >
        Book now
      </Button>
    </div>
  )
}

export function BookingCard({ booking, onBookingError }: BookingCardProps) {
  // If it's a package, use PackageCard component
  if (booking.type === 'package') {
    return (
      <PackageCard
        packageOption={booking}
        onError={onBookingError}
      />
    )
  }

  // Otherwise use SingleSessionCard
  return <SingleSessionCard booking={booking} onBookingError={onBookingError} />
}


