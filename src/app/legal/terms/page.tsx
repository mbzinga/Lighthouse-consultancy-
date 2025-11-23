import { type Metadata } from 'next'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Lighthouse Consultancy',
}

export default function TermsOfService() {
  return (
    <Section spacing="lg">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Last updated: January 2025
        </p>

        <div className="mt-8 prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-slate-600 mb-4">
              Welcome to Lighthouse Consultancy (&quot;Lighthouse&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;).
            </p>
            <p className="text-slate-600 mb-4">
              We provide specialist consultancy services relating to special educational needs and disabilities (SEND) for families, schools and local authorities.
            </p>
            <p className="text-slate-600">
              By accessing our website or using our services, you agree to these Terms of Service. If you do not agree, please do not use our site or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. Who We Are</h2>
            <p className="text-slate-600 mb-4">
              <strong>Lighthouse Consultancy</strong>
            </p>
            <p className="text-slate-600 mb-4">
              Lighthouse Consultancy (&quot;Lighthouse&quot;) is a trading name of The SEND Tech Company Ltd, registered in England & Wales (Company No. 16756429).
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
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Scope of Services</h2>
            <p className="text-slate-600 mb-4">
              Lighthouse provides:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Consultations</li>
              <li>SEND-focused assessments</li>
              <li>Written advice & recommendations</li>
              <li>Training</li>
              <li>Strategic SEND support for schools/local authorities</li>
            </ul>
            <p className="text-slate-600">
              These services may be delivered online or in person, depending on the agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. Professional Advice Disclaimer</h2>
            <p className="text-slate-600 mb-4">
              We provide guidance grounded in professional judgement, experience and best practice.
            </p>
            <p className="text-slate-600 mb-4">
              However:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>We cannot guarantee specific outcomes for any child, school or family.</li>
              <li>All reports and recommendations rely on information provided by the client.</li>
              <li>Decisions regarding provision, placement, reintegration or support packages ultimately rest with schools, local authorities and associated agencies.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. No Outcome Guarantees</h2>
            <p className="text-slate-600 mb-4">
              SEND outcomes are multifactorial.
            </p>
            <p className="text-slate-600 mb-4">
              Reintegration, improvement, reduced escalation to specialist provision, or educational progress depend on individual circumstances and multi-agency decision-making.
            </p>
            <p className="text-slate-600 mb-4">
              We therefore make no warranties or guarantees regarding:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>School placement decisions</li>
              <li>EHCP outcomes</li>
              <li>Provision allocation</li>
              <li>Reintegration success</li>
              <li>Improvements in behaviour, attainment or emotional wellbeing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Client Responsibilities</h2>
            <p className="text-slate-600 mb-4">
              Clients agree to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Provide accurate information</li>
              <li>Participate constructively</li>
              <li>Share relevant reports or records</li>
              <li>Communicate in a timely manner</li>
            </ul>
            <p className="text-slate-600">
              We are not responsible for outcomes affected by incomplete or inaccurate information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">7. Booking & Cancellation</h2>
            <p className="text-slate-600 mb-4">
              Consultations are booked via Calendly.
            </p>
            <p className="text-slate-600 mb-4">
              You will receive a booking confirmation via email.
            </p>
            <p className="text-slate-600 mb-4">
              <strong>Rescheduling / cancellation</strong>
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Cancellations with over 48 hours&apos; notice: no charge</li>
              <li>Cancellations within 48 hours: may be charged in full</li>
            </ul>
            <p className="text-slate-600">
              If Lighthouse needs to cancel an appointment, we will offer an alternative time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">8. Fees & Payment</h2>
            <p className="text-slate-600 mb-4">
              Fees are outlined on our website.
            </p>
            <p className="text-slate-600 mb-4">
              Payments are processed securely via Stripe.
            </p>
            <p className="text-slate-600">
              We reserve the right to update pricing at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">9. Reports</h2>
            <p className="text-slate-600 mb-4">
              Where a service includes a written report:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Reports are based on the information available at the time</li>
              <li>Reports should not be altered or reproduced without permission</li>
              <li>Reports may not be accepted by third-party agencies; we are not responsible for their decisions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">10. Safeguarding</h2>
            <p className="text-slate-600">
              Where safeguarding concerns arise, we may be required to share information with statutory services in line with legal obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">11. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              To the fullest extent permitted by law, Lighthouse is not liable for:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Indirect or consequential losses</li>
              <li>Decisions taken by third parties</li>
              <li>Outcomes relating to provision, placement, reintegration or EHCP processes</li>
            </ul>
            <p className="text-slate-600">
              Our total liability is limited to the amount paid for services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">12. Intellectual Property</h2>
            <p className="text-slate-600">
              All materials (reports, resources, training content) remain the intellectual property of Lighthouse and may not be reproduced, distributed or adapted without written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">13. Website Use</h2>
            <p className="text-slate-600 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-4">
              <li>Use the website for unlawful purposes</li>
              <li>Copy or misuse content</li>
              <li>Attempt to interfere with site functionality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">14. Data Protection</h2>
            <p className="text-slate-600">
              We process personal data in accordance with our{' '}
              <a
                href="/legal/privacy"
                className="text-teal-600 hover:text-teal-700 underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">15. Changes to Terms</h2>
            <p className="text-slate-600 mb-4">
              We may update these Terms from time to time.
            </p>
            <p className="text-slate-600 mb-4">
              We will post updated terms on our website with an amended &quot;Last updated&quot; date.
            </p>
            <p className="text-slate-600">
              Continued use of the site constitutes acceptance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">16. Governing Law</h2>
            <p className="text-slate-600 mb-4">
              These Terms are governed by the laws of England & Wales.
            </p>
            <p className="text-slate-600">
              Any disputes are subject to the exclusive jurisdiction of English courts.
            </p>
          </section>
        </div>
      </div>
    </Section>
  )
}
