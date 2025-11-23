'use client'

import { useCookieContext } from './CookieProvider'
import { Button } from './Button'

export function CookieBanner() {
  const { updatePreferences, openSettings } = useCookieContext()

  const handleAcceptAll = () => {
    updatePreferences({
      strictlyNecessary: true,
      analytics: true,
      embeddedServices: true,
    })
  }

  const handleRejectNonEssential = () => {
    updatePreferences({
      strictlyNecessary: true,
      analytics: false,
      embeddedServices: false,
    })
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-teal-200 shadow-lg"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h2
              id="cookie-banner-title"
              className="text-lg font-semibold text-slate-900 mb-2"
            >
              Cookies on Lighthouse
            </h2>
            <p
              id="cookie-banner-description"
              className="text-sm text-slate-600 mb-4"
            >
              We use cookies to make our site work. With your consent, we&apos;d
              also use analytics and embedded tools (like Calendly) to improve
              your experience. You can accept, reject, or manage settings at
              any time.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-shrink-0">
            <button
              onClick={handleRejectNonEssential}
              className="inline-flex justify-center rounded-2xl border-2 border-navy-500 bg-white px-4 py-2 text-sm font-semibold text-navy-500 hover:bg-navy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500 active:text-navy-600 min-h-[44px] transition-colors"
            >
              Reject non-essential
            </button>
            <button
              onClick={openSettings}
              className="inline-flex justify-center rounded-2xl border-2 border-navy-500 bg-white px-4 py-2 text-sm font-semibold text-navy-500 hover:bg-navy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500 active:text-navy-600 min-h-[44px] transition-colors"
            >
              Manage settings
            </button>
            <button
              onClick={handleAcceptAll}
              className="inline-flex justify-center rounded-2xl bg-navy-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500 active:text-white/70 min-h-[44px] transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



