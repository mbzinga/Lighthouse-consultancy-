import { type Metadata } from 'next'
import { Section } from '@/components/Section'
import { siteConfig } from '@/config/site'
import {
  HeartIcon,
  AcademicCapIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Lighthouse Consultancy, our mission, values, and approach to supporting families, schools, and local authorities.',
}

export default function About() {
  return (
    <>
      <Section background="teal-gradient" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 sm:text-6xl">
            About Lighthouse Consultancy
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            {siteConfig.tagline}
          </p>
        </div>
      </Section>

      <Section spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-display font-semibold text-slate-900">Our mission</h2>
          <p className="mt-4 text-slate-600">
            We believe that every child with special educational needs and
            disabilities deserves access to high-quality support and advocacy.
            Our mission is to empower families, schools, and local authorities
            with the expertise and guidance needed to create positive outcomes
            for children and young people with SEND.
          </p>
        </div>
      </Section>

      <Section background="gray" spacing="lg">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900 sm:text-4xl">
              Our values
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                Child-centered approach
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Every child is unique. We take time to understand each child&apos;s
                individual strengths, challenges, and needs to provide truly
                tailored support.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                Evidence-based practice
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Our recommendations are grounded in research and best practice,
                ensuring practical and sustainable solutions informed by research and experience.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                Collaborative working
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We work in partnership with families, schools, and local
                authorities, fostering positive relationships and
                understanding.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                Accessibility and inclusion
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We are committed to making our services accessible to all,
                regardless of background or circumstance.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Our approach</h2>
          <p className="mt-4 text-slate-600">
            We take a holistic, person-centered approach to SEND support. We
            understand that navigating the SEND system can be complex and
            overwhelming, and we are here to provide clear guidance, practical
            support, and expert advocacy.
          </p>
          <p className="mt-4 text-slate-600">
            Our team brings wide experience across families, schools,
            and local authorities, giving us unique insight into the challenges
            and opportunities across the system.
          </p>
        </div>
      </Section>

      <Section background="gray" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Accessibility statement
          </h2>
          <p className="mt-4 text-slate-600">
            {siteConfig.name} is committed to ensuring digital accessibility for
            people with disabilities. We are continually improving the user
            experience for everyone and applying the relevant accessibility
            standards.
          </p>
          <p className="mt-4 text-slate-600">
            We aim to conform to WCAG 2.1 Level AA standards. If you encounter
            any accessibility issues or have suggestions for improvement, please
            contact us at{' '}
            <a
              href={`mailto:${siteConfig.contactEmails.info}`}
              className="text-teal-600 hover:text-teal-700 underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
            >
              {siteConfig.contactEmails.info}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  )
}


