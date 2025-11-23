import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookingPage } from '@/components/BookingPage'
import { siteConfig } from '@/config/site'
import type { BookingOption } from '@/config/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookingId: string }>
}): Promise<Metadata> {
  const { bookingId } = await params
  const booking = siteConfig.bookingOptions.find((b) => b.id === bookingId)

  if (!booking) {
    return {
      title: 'Booking Not Found',
    }
  }

  return {
    title: `Book ${booking.title}`,
    description: booking.description,
  }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ bookingId: string }>
}) {
  const { bookingId } = await params
  const booking = siteConfig.bookingOptions.find(
    (b) => b.id === bookingId,
  ) as BookingOption | undefined

  if (!booking) {
    notFound()
  }

  return <BookingPage booking={booking} />
}






