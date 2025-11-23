import { type Metadata } from 'next'
import { Section } from '@/components/Section'
import { ContactForm } from '@/components/ContactForm'
import {
  LightBulbIcon,
  UserGroupIcon,
  ArrowPathIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Services for Local Authorities',
  description:
    'SEND support for local authorities including transition panels, EBSA taskforce, and provision planning.',
}

export default function ServicesLocalAuthorities() {
  return (
    <>
      <Section background="teal-gradient" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-display font-bold tracking-tight text-charcoal-900 sm:text-5xl lg:text-6xl">
            Services for Local Authorities
          </h1>
          <p className="mt-6 text-xl leading-8 text-charcoal-600 max-w-2xl">
            Expert SEND consultancy services to support local authority teams
            with complex cases and strategic provision planning.
          </p>
        </div>
      </Section>

      <Section spacing="lg" background="white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold tracking-tight text-charcoal-900 sm:text-4xl">
              How we can support your local authority
            </h2>
            <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">
              Comprehensive SEND support services for local authority teams
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <LightBulbIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                Early Intervention & Service Review
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Collaborative support to strengthen your early identification and
                intervention systems. We help review existing services, identify
                gaps, and design pathways that support early intervention in order to reduce escalation where appropriate. Where applicable, we recommend evidence-based pathways.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                EBSA Taskforce Support
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Expert input for Emotionally Based School Avoidance (EBSA)
                initiatives — from individual casework and multi-agency
                formulation to system-level planning and staff training. We help
                local areas develop consistent, trauma-informed responses to
                EBSA.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <ArrowPathIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                Transition Programmes
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Design and delivery of targeted transition programmes for
                vulnerable learners and those with SEND, supporting confidence,
                independence, and supporting successful reintegration wherever possible.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                Strategic Planning & Provision Review
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Support with SEND strategy development, capacity planning, and
                quality assurance. We work with senior leaders to review
                provision, model future demand, and strengthen inclusive
                practice across your local area.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-display font-semibold text-charcoal-900">Contact us</h2>
          <p className="mt-4 text-charcoal-500">
            Get in touch to discuss how we can support your local authority.
          </p>
          <div className="mt-8">
            <ContactForm source="la_pkg" defaultAudience="la" />
          </div>
        </div>
      </Section>
    </>
  )
}


