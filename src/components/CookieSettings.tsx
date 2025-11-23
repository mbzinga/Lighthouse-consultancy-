'use client'

import { useState, useEffect, useRef } from 'react'
import { useCookieContext } from './CookieProvider'
import { type CookiePreferences } from '@/lib/cookies'

export function CookieSettings() {
  const { preferences, updatePreferences, closeSettings } = useCookieContext()
  const [localPreferences, setLocalPreferences] = useState({
    analytics: false,
    embeddedServices: false,
  })
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Initialize with current preferences
  useEffect(() => {
    if (preferences) {
      setLocalPreferences({
        analytics: preferences.analytics,
        embeddedServices: preferences.embeddedServices,
      })
    }
    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement
    // Focus the modal
    modalRef.current?.focus()
  }, [preferences])

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSettings()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeSettings])

  // Restore focus on close
  const handleClose = () => {
    closeSettings()
    previousFocusRef.current?.focus()
  }

  // Trap focus within modal
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modal.addEventListener('keydown', handleTab)
    firstElement?.focus()

    return () => {
      modal.removeEventListener('keydown', handleTab)
    }
  }, [])

  const handleSave = () => {
    updatePreferences({
      strictlyNecessary: true,
      analytics: localPreferences.analytics,
      embeddedServices: localPreferences.embeddedServices,
    })
  }

  const handleToggle = (category: 'analytics' | 'embeddedServices') => {
    setLocalPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      aria-describedby="cookie-settings-description"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        tabIndex={-1}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2
              id="cookie-settings-title"
              className="text-2xl font-bold text-slate-900 mb-2"
            >
              Cookie Settings
            </h2>
            <p
              id="cookie-settings-description"
              className="text-sm text-slate-600"
            >
              Manage your cookie preferences. You can enable or disable
              different types of cookies below.
            </p>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-6 mb-8">
            {/* Strictly Necessary */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Strictly Necessary
                </h3>
                <p className="text-sm text-slate-600">
                  Required for core site features. These cookies are always
                  enabled and cannot be disabled.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-navy-500 cursor-not-allowed">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Analytics
                </h3>
                <p className="text-sm text-slate-600">
                  Help us improve the site by understanding how visitors
                  interact with it.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 ${
                    localPreferences.analytics
                      ? 'bg-navy-500'
                      : 'bg-slate-300'
                  }`}
                  aria-label={`${localPreferences.analytics ? 'Disable' : 'Enable'} analytics cookies`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      localPreferences.analytics
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Embedded Services */}
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Embedded Services
                </h3>
                <p className="text-sm text-slate-600">
                  Load tools like Calendly or videos from third-party services.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle('embeddedServices')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 ${
                    localPreferences.embeddedServices
                      ? 'bg-navy-500'
                      : 'bg-slate-300'
                  }`}
                  aria-label={`${localPreferences.embeddedServices ? 'Disable' : 'Enable'} embedded services cookies`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      localPreferences.embeddedServices
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={handleClose}
              className="inline-flex justify-center rounded-2xl border-2 border-navy-500 bg-white px-6 py-3 text-base font-semibold text-navy-500 hover:bg-navy-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500 active:text-navy-600 min-h-[44px] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex justify-center rounded-2xl bg-navy-500 px-6 py-3 text-base font-semibold text-white hover:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500 active:text-white/70 min-h-[44px] transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}






