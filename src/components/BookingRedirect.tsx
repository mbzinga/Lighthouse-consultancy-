'use client'

import { useEffect } from 'react'

interface BookingRedirectProps {
  url: string
}

export function BookingRedirect({ url }: BookingRedirectProps) {
  useEffect(() => {
    // Small delay to show success message, then redirect
    const timer = setTimeout(() => {
      window.location.href = url
    }, 1500)

    return () => clearTimeout(timer)
  }, [url])

  return (
    <div className="text-center">
      <p className="text-slate-600">Redirecting to booking...</p>
    </div>
  )
}







