import { type Metadata } from 'next'
import { Section } from '@/components/Section'
import { ContactForm } from '@/components/ContactForm'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Lighthouse Consultancy for questions or support.',
}

export default function Contact() {
  return (
    <>
      <Section background="teal-gradient" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 sm:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Have a question or want to discuss how we can support you? Get in
            touch.
          </p>
        </div>
      </Section>

      <Section spacing="lg">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Get in touch</h2>
              <p className="mt-4 text-slate-600">
                Fill out the form and we&apos;ll get back to you as soon as
                possible.
              </p>
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Email</h3>
                  <a
                    href={`mailto:${siteConfig.contactEmails.info}`}
                    className="mt-1 text-slate-600 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                  >
                    {siteConfig.contactEmails.info}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}


