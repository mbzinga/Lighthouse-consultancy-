/**
 * Cookie consent utilities for Lighthouse Consultancy
 * 
 * Handles storage and retrieval of cookie preferences in localStorage.
 * Provides utilities for checking consent and conditionally loading scripts.
 */

export type CookieCategory = 'strictly-necessary' | 'analytics' | 'embedded-services'

export interface CookiePreferences {
  strictlyNecessary: boolean // Always true, cannot be disabled
  analytics: boolean
  embeddedServices: boolean
  timestamp: number
}

const STORAGE_KEY = 'lighthouse-cookie-preferences'

/**
 * Get cookie preferences from localStorage
 * Returns null if preferences don't exist
 */
export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const preferences = JSON.parse(stored) as CookiePreferences
    // Validate structure
    if (
      typeof preferences.strictlyNecessary === 'boolean' &&
      typeof preferences.analytics === 'boolean' &&
      typeof preferences.embeddedServices === 'boolean' &&
      typeof preferences.timestamp === 'number'
    ) {
      return preferences
    }
    return null
  } catch {
    return null
  }
}

/**
 * Save cookie preferences to localStorage
 */
export function setCookiePreferences(preferences: Omit<CookiePreferences, 'timestamp'>): void {
  if (typeof window === 'undefined') return

  try {
    const fullPreferences: CookiePreferences = {
      ...preferences,
      strictlyNecessary: true, // Always enforce
      timestamp: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPreferences))
  } catch (error) {
    console.error('Failed to save cookie preferences:', error)
  }
}

/**
 * Check if user has consented to a specific cookie category
 */
export function hasConsent(category: CookieCategory): boolean {
  const preferences = getCookiePreferences()
  if (!preferences) return false

  switch (category) {
    case 'strictly-necessary':
      return true // Always allowed
    case 'analytics':
      return preferences.analytics
    case 'embedded-services':
      return preferences.embeddedServices
    default:
      return false
  }
}

/**
 * Check if user has made any consent decision
 */
export function hasConsentDecision(): boolean {
  return getCookiePreferences() !== null
}

/**
 * Load a script conditionally based on cookie consent
 * 
 * @example
 * ```ts
 * loadScript({
 *   src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
 *   category: 'analytics',
 *   onLoad: () => {
 *     // Initialize analytics
 *   }
 * })
 * ```
 */
export function loadScript(options: {
  src: string
  category: CookieCategory
  onLoad?: () => void
  onError?: (error: Error) => void
}): void {
  if (typeof window === 'undefined') return

  // Check consent
  if (!hasConsent(options.category)) {
    console.log(`Script blocked: ${options.src} (category: ${options.category})`)
    return
  }

  // Check if script already exists
  const existingScript = document.querySelector(`script[src="${options.src}"]`)
  if (existingScript) {
    options.onLoad?.()
    return
  }

  // Create and load script
  const script = document.createElement('script')
  script.src = options.src
  script.async = true

  script.onload = () => {
    options.onLoad?.()
  }

  script.onerror = () => {
    const error = new Error(`Failed to load script: ${options.src}`)
    options.onError?.(error)
  }

  document.head.appendChild(script)
}

/**
 * Conditionally render an iframe based on cookie consent
 * 
 * @example
 * ```tsx
 * {shouldLoadEmbedded({
 *   category: 'embedded-services',
 *   fallback: <div>Please enable embedded services to view this content</div>
 * }) && (
 *   <iframe src="https://calendly.com/..." />
 * )}
 * ```
 */
export function shouldLoadEmbedded(category: CookieCategory): boolean {
  return hasConsent(category)
}

/**
 * Clear all cookie preferences (useful for testing)
 */
export function clearCookiePreferences(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}






