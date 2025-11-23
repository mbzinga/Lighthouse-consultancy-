import { type Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Comprehensive SEND consultancy services for families, schools, and local authorities.',
}

export default function Services() {
  return (
    <>
      <Section background="teal-gradient" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 sm:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            We offer comprehensive SEND support services tailored to families,
            schools, and local authorities.
          </p>
        </div>
      </Section>

      <Section spacing="lg">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <h2 className="text-2xl font-display font-semibold text-slate-900">
                For Families
              </h2>
              <p className="mt-4 text-slate-600 flex-grow min-h-[96px]">
                Expert SEND support for families including assessments,
                coaching, and EHCP advice. We help you navigate the system and
                advocate for your child&apos;s needs.
              </p>
              <div className="mt-6">
                <Button
                  href="/services/families"
                  className="w-full bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
                >
                  Learn more
                </Button>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <h2 className="text-2xl font-display font-semibold text-slate-900">For Schools</h2>
              <p className="mt-4 text-slate-600 flex-grow min-h-[96px]">
                Comprehensive SEND support for schools including training,
                audits, and specialist consultation services to help you deliver
                excellent provision.
              </p>
              <div className="mt-6">
                <Button
                  href="/services/schools"
                  className="w-full bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
                >
                  Learn more
                </Button>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <h2 className="text-2xl font-display font-semibold text-slate-900">
                For Local Authorities
              </h2>
              <p className="mt-4 text-slate-600 flex-grow min-h-[96px]">
                Expert SEND consultancy services to support local authority
                teams with complex cases, strategic provision planning, and
                service development.
              </p>
              <div className="mt-6">
                <Button
                  href="/services/local-authorities"
                  className="w-full bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}


