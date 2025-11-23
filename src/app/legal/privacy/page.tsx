import { type Metadata } from 'next'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Lighthouse Consultancy',
}

export default function PrivacyPolicy() {
  return (
    <Section spacing="lg">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: January 2025
        </p>

        <div className="mt-8 prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-slate-600 mb-4">
              Lighthouse Consultancy (&quot;Lighthouse&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting your personal data and respecting your privacy.
            </p>
            <p className="text-slate-600">
              This policy explains what information we collect, how we use it, and your rights under UK GDPR.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. Who We Are</h2>
            <p className="text-slate-600 mb-4">
              <strong>Data Controller:</strong> Lighthouse Consultancy
            </p>
            <p className="text-slate-600 mb-4">
              Lighthouse Consultancy (&quot;Lighthouse&quot;) is operated by The SEND Tech Company Ltd, registered in England & Wales (Company No. 16756429).
            </p>
            <p className="text-slate-600 mb-4">
              For the purposes of UK GDPR, The SEND Tech Company Ltd is the Data Controller.
            </p>
            <p className="text-slate-600 mb-4">
              Registered office: 167-169 Great Portland Street, London, England, W1W 5PF
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

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. What Data We Collect</h2>
            <p className="text-slate-600 mb-4">
              We may collect:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Name & contact details</li>
              <li>Child or student information relevant to SEND support</li>
              <li>Notes about consultations</li>
              <li>School / setting information</li>
              <li>Payment details (processed via Stripe — not stored by us)</li>
              <li>Website usage data (cookies/analytics)</li>
            </ul>
            <p className="text-slate-600">
              We only collect information needed to provide our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. How We Collect Data</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Forms submitted via our website</li>
              <li>Emails and calls</li>
              <li>Calendly bookings</li>
              <li>Consultation sessions</li>
              <li>Reports and documents you provide</li>
              <li>Website analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. How We Use Your Data</h2>
            <p className="text-slate-600 mb-4">
              To:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Deliver services</li>
              <li>Arrange consultations & communicate</li>
              <li>Prepare reports</li>
              <li>Process payments</li>
              <li>Improve our services</li>
              <li>Maintain records</li>
              <li>Comply with legal obligations (e.g., safeguarding)</li>
            </ul>
            <p className="text-slate-600">
              We do not sell or rent personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Lawful Basis</h2>
            <p className="text-slate-600 mb-4">
              We process data under:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Contract (to deliver services)</li>
              <li>Consent</li>
              <li>Legitimate interest</li>
              <li>Legal obligation (e.g., safeguarding)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">7. Sharing Your Data</h2>
            <p className="text-slate-600 mb-4">
              We only share data where necessary.
            </p>
            <p className="text-slate-600 mb-4">
              Examples:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Stripe (payments)</li>
              <li>Calendly (booking)</li>
              <li>Schools/local authorities (with consent)</li>
              <li>Safeguarding agencies (where required by law)</li>
            </ul>
            <p className="text-slate-600 mb-4">
              These organisations act as data processors and comply with relevant regulations.
            </p>
            <p className="text-slate-600">
              We will never sell your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">8. Data Retention</h2>
            <p className="text-slate-600 mb-4">
              We retain data only for as long as necessary for service delivery and legal requirements.
            </p>
            <p className="text-slate-600 mb-4">
              Typically:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Case records: up to 7 years</li>
              <li>Financial records: minimum 6 years</li>
            </ul>
            <p className="text-slate-600">
              You may request deletion where legally permissible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">9. Your Rights</h2>
            <p className="text-slate-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Access your data</li>
              <li>Request correction / deletion</li>
              <li>Withdraw consent</li>
              <li>Object to processing</li>
              <li>Request data transfer</li>
              <li>Make a complaint</li>
            </ul>
            <p className="text-slate-600 mb-4">
              To exercise rights:
            </p>
            <p className="text-slate-600 mb-4">
              Email us at{' '}
              <a
                href="mailto:info@lighthousesend.com"
                className="text-teal-600 hover:text-teal-700 underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                info@lighthousesend.com
              </a>
            </p>
            <p className="text-slate-600">
              You may also complain to the ICO:{' '}
              <a
                href="https://www.ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                www.ico.org.uk
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">10. Security</h2>
            <p className="text-slate-600 mb-4">
              We use appropriate technical and organisational measures to protect data.
            </p>
            <p className="text-slate-600">
              However, no system is 100% secure; transmission is at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">11. International Transfers</h2>
            <p className="text-slate-600 mb-4">
              We may use third-party services that process data outside the UK.
            </p>
            <p className="text-slate-600">
              Where this occurs, we ensure appropriate safeguards are in place.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">12. Links to Other Sites</h2>
            <p className="text-slate-600 mb-4">
              Our site may link to other providers (e.g., Stripe, Calendly).
            </p>
            <p className="text-slate-600">
              We are not responsible for their content or privacy practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">13. Updates</h2>
            <p className="text-slate-600 mb-4">
              We may update this policy periodically.
            </p>
            <p className="text-slate-600">
              Changes will be posted here with an updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">14. Contact</h2>
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
