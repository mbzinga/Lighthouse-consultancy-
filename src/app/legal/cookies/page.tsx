import { type Metadata } from 'next'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for Lighthouse Consultancy',
}

export default function CookiePolicy() {
  return (
    <Section spacing="lg">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: January 2025
        </p>

        <div className="mt-8 prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. What Are Cookies?</h2>
            <p className="text-slate-600">
              Cookies are small text files stored on your device to improve your browsing experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. How We Use Cookies</h2>
            <p className="text-slate-600 mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Enable site functionality</li>
              <li>Analyse site traffic</li>
              <li>Improve user experience</li>
              <li>Support booking/payment integrations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Types of Cookies</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Strictly Necessary Cookies</h3>
            <p className="text-slate-600 mb-4">
              Required for basic site function.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Functional Cookies</h3>
            <p className="text-slate-600 mb-4">
              Remember preferences (e.g., timezone).
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Analytics Cookies</h3>
            <p className="text-slate-600 mb-4">
              Help us understand how users interact with our website.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Third-Party Cookies</h3>
            <p className="text-slate-600 mb-4">
              Used by services such as:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Calendly</li>
              <li>Stripe</li>
              <li>Analytics providers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. Managing Cookies</h2>
            <p className="text-slate-600 mb-4">
              You can:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Adjust browser settings</li>
              <li>Delete cookies</li>
              <li>Block cookies (may affect functionality)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. Changes</h2>
            <p className="text-slate-600 mb-4">
              We may update this policy.
            </p>
            <p className="text-slate-600">
              Changes will appear here with an updated date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Contact</h2>
            <p className="text-slate-600 mb-4">
              Questions?
            </p>
            <p className="text-slate-600">
              Email:{' '}
              <a
                href="mailto:info@lighthousesend.com"
                className="text-teal-600 hover:text-teal-700 underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                info@lighthousesend.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </Section>
  )
}
