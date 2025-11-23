'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  type CookiePreferences,
  getCookiePreferences,
  setCookiePreferences,
  hasConsentDecision,
} from '@/lib/cookies'
import { CookieBanner } from './CookieBanner'
import { CookieSettings } from './CookieSettings'

interface CookieContextValue {
  preferences: CookiePreferences | null
  updatePreferences: (prefs: Omit<CookiePreferences, 'timestamp'>) => void
  openSettings: () => void
  closeSettings: () => void
}

const CookieContext = createContext<CookieContextValue | null>(null)

export function useCookieContext() {
  const context = useContext(CookieContext)
  if (!context) {
    throw new Error('useCookieContext must be used within CookieProvider')
  }
  return context
}

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPrefs] = useState<CookiePreferences | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Load preferences on mount
  useEffect(() => {
    const prefs = getCookiePreferences()
    setPrefs(prefs)
    setShowBanner(!hasConsentDecision())
  }, [])

  const updatePreferences = useCallback((prefs: Omit<CookiePreferences, 'timestamp'>) => {
    setCookiePreferences(prefs)
    const updated = getCookiePreferences()
    setPrefs(updated)
    setShowBanner(false)
    setShowSettings(false)
  }, [])

  const openSettings = useCallback(() => {
    setShowSettings(true)
    setShowBanner(false)
  }, [])

  const closeSettings = useCallback(() => {
    setShowSettings(false)
  }, [])

  const contextValue: CookieContextValue = {
    preferences,
    updatePreferences,
    openSettings,
    closeSettings,
  }

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
      {showBanner && <CookieBanner />}
      {showSettings && <CookieSettings />}
    </CookieContext.Provider>
  )
}






