'use client'

import { useCookieContext } from './CookieProvider'

export function CookieSettingsLink() {
  const { openSettings } = useCookieContext()

  return (
    <button
      onClick={openSettings}
      className="text-sm text-sand-200 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 rounded transition-colors"
    >
      Cookie settings
    </button>
  )
}






