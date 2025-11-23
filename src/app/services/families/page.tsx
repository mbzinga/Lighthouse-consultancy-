import { type Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { FAQ } from '@/components/FAQ'
import { Button } from '@/components/Button'
import { PricingTiers } from '@/components/PricingTiers'
import { siteConfig } from '@/config/site'
import { 
  ClipboardDocumentCheckIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Services for Families',
  description:
    'Expert SEND support for families including assessments, coaching, and EHCP advice.',
}

const faqItems = [
  {
    question: 'What is a SEND assessment?',
    answer:
      'A SEND assessment is a comprehensive evaluation of your child\'s special educational needs and disabilities. We assess their strengths, challenges, and support requirements to create a tailored action plan.',
  },
  {
    question: 'How long does the assessment process take?',
    answer:
      'A Deep Dive Assessment typically takes 90 minutes and includes a follow-up report. Starter Consultations (45 minutes) are perfect for initial discussions about your child\'s needs.',
  },
  {
    question: 'Can you help with EHCP applications?',
    answer:
      'Yes, we provide specialist guidance informed by research and experience on Education, Health and Care Plans (EHCPs), including help with applications, reviews, and ensuring the plan meets your child\'s needs.',
  },
  {
    question: 'What happens after the consultation?',
    answer:
      'After your consultation, you\'ll receive a summary of our discussion and recommendations. For assessments, you\'ll receive a detailed report with actionable steps to support your child.',
  },
]

export default function ServicesFamilies() {
  return (
    <>
      <Section background="teal-gradient" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-display font-bold tracking-tight text-charcoal-900 sm:text-5xl lg:text-6xl">
            Services for Families
          </h1>
          <p className="mt-6 text-xl leading-8 text-charcoal-600 max-w-2xl">
            We support families navigating the SEND system with expert advice,
            assessments, and practical guidance.
          </p>
        </div>
      </Section>

      <Section spacing="lg" background="white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold tracking-tight text-charcoal-900 sm:text-4xl">
              How we can help
            </h2>
            <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">
              Comprehensive support tailored to your family&apos;s unique needs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <ClipboardDocumentCheckIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                Initial Assessments
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Holistic needs-based assessments to understand your child&apos;s
                strengths, needs, and support requirements. We provide detailed
                reports with clear, practical recommendations where appropriate.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                Parent Coaching & Support
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Ongoing support to help you navigate the SEND system, advocate
                effectively for your child, and access the right services and
                support.
              </p>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-teal-300 transition-all duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <DocumentTextIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-2">
                EHCP Support
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Specialist guidance informed by research and experience on Education, Health and Care Plans, from initial
                applications through to annual reviews and amendments. We help
                ensure the plan accurately reflects your child&apos;s needs.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray" spacing="lg">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold tracking-tight text-charcoal-900 sm:text-4xl">
              Our process - step by step
            </h2>
            <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">
              A clear, straightforward approach to getting the support you need
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-xl shadow-lg mb-4">
                  <CalendarIcon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-2">
                  Book a consultation
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  Choose from our Starter Consultation or Deep Dive Assessment
                  options. Book online at a time that suits you.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-xl shadow-lg mb-4">
                  <ChatBubbleLeftRightIcon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-2">
                  Initial discussion
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  We&apos;ll discuss your child&apos;s needs, your concerns,
                  and what you hope to achieve from our support.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-xl shadow-lg mb-4">
                  <ClipboardDocumentListIcon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-2">
                  Assessment & planning
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  For assessments, we&apos;ll conduct a thorough evaluation and
                  create a detailed action plan tailored to your child.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-xl shadow-lg mb-4">
                  <ArrowPathIcon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-2">
                  Ongoing support
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  We provide follow-up sessions and can support you through EHCP
                  processes, school meetings, and system navigation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="lg" background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-display font-semibold text-charcoal-900">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FAQ items={faqItems} />
          </div>
        </div>
      </Section>

      {/* Pricing Tiers Section */}
      <PricingTiers tiers={siteConfig.bookingOptions} />
    </>
  )
}


