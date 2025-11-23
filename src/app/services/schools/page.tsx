import { type Metadata } from 'next'
import { Section } from '@/components/Section'
import { ContactForm } from '@/components/ContactForm'
import {
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  UserIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Services for Schools',
  description:
    'SEND training, audits, and SENCO support services for schools and educational institutions.',
}

export default function ServicesSchools() {
  return (
    <>
      <Section background="teal-gradient" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-display font-bold tracking-tight text-charcoal-900 sm:text-5xl lg:text-6xl">
            Services for Schools
          </h1>
          <p className="mt-6 text-xl leading-8 text-charcoal-600 max-w-2xl">
            Comprehensive SEND support for schools including training, audits,
            and specialist consultation services.
          </p>
        </div>
      </Section>

      <Section spacing="lg" background="white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold tracking-tight text-charcoal-900 sm:text-4xl">
              How we can support your school
            </h2>
            <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">
              Comprehensive SEND support services tailored to your school&apos;s needs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <ClipboardDocumentCheckIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                SEND Audits & Reviews
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Comprehensive audits of your school&apos;s SEND provision,
                identifying strengths and areas for development. We provide
                detailed reports with clear, practical recommendations where appropriate.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                Staff Training & Development
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Tailored training sessions for teaching staff, TAs, and SENCOs
                on topics including understanding SEND, differentiation
                strategies, and effective provision mapping.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <UserIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                SENCO Support & Coaching
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Ongoing support and coaching for SENCOs, helping you navigate
                the complexities of SEND leadership, EHCP processes, and
                strategic planning.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <DocumentChartBarIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                Provision Mapping & Graduated Response for EHCP
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Support schools to develop effective and workable provision maps and a graduated
                response system that ensures appropriate support at every level.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-display font-semibold text-charcoal-900">
            Request a proposal
          </h2>
          <p className="mt-4 text-charcoal-500">
            Tell us about your school&apos;s needs and we&apos;ll create a
            tailored proposal for you.
          </p>
          <div className="mt-8">
            <ContactForm source="school_pkg" defaultAudience="school" />
          </div>
        </div>
      </Section>
    </>
  )
}


