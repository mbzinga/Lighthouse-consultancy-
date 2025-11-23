import { type Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Section } from '@/components/Section'
import { siteConfig } from '@/config/site'
import heroImage from '@/images/Image.webp'
import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  ArrowPathIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Expert SEND consultancy supporting families, schools, and local authorities with specialist advice and assessments.',
}

export default function Home() {
  return (
    <>
      {/* Hero Section with Fixed Background */}
      <div className="relative min-h-screen pt-20 sm:pt-24">
        {/* Fixed Background Image */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-800/30 to-navy-900/40" />
        <Image
          src={heroImage}
          alt="Children learning and playing"
          fill
          className="object-cover blur-sm lg:blur-[1px]"
          priority
        />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-display font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              Supporting families with SEND expertise
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-pretty text-sand-100 sm:text-xl">
              {siteConfig.tagline}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:gap-x-6">
              <Button
                href="/services/families"
                className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold flex items-center"
              >
                Get started
              </Button>
              <Link 
                href="/about" 
                className="flex items-center text-base font-semibold leading-6 text-white hover:text-sky-400 transition-colors underline decoration-2 underline-offset-4 decoration-sky-500"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Service Category Cards - Scrolls over hero */}
      <section className="relative z-10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-charcoal-900 sm:text-4xl">
              How we can help
            </h2>
            <p className="mt-4 text-lg leading-7 text-charcoal-500">
              Expert SEND support tailored to your needs
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {/* For Families Card */}
            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100 transition-shadow hover:shadow-xl hover:ring-teal-300">
          <h3 className="text-2xl font-display font-semibold text-charcoal-900 mb-4">
            For Families
          </h3>
          <p className="text-charcoal-500 mb-6 flex-grow min-h-[72px]">
            We help families navigate schooling options to support social, emotional and academic growth.
          </p>
              <Button
                href="/services/families"
                className="w-full bg-teal-600 hover:bg-teal-500 focus-visible:outline-teal-600"
              >
                Learn more
              </Button>
            </div>

            {/* For Schools Card */}
            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100 transition-shadow hover:shadow-xl hover:ring-teal-300">
          <h3 className="text-2xl font-display font-semibold text-charcoal-900 mb-4">
            For Schools
          </h3>
          <p className="text-charcoal-500 mb-6 flex-grow min-h-[72px]">
            Building links with both maintained and independent schools specialising in additional learning needs.
          </p>
              <Button
                href="/services/schools"
                className="w-full bg-teal-600 hover:bg-teal-500 focus-visible:outline-teal-600"
              >
                Learn more
              </Button>
            </div>

            {/* For Local Authorities Card */}
            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100 transition-shadow hover:shadow-xl hover:ring-teal-300">
          <h3 className="text-2xl font-display font-semibold text-charcoal-900 mb-4">
            For Local Authorities
          </h3>
          <p className="text-charcoal-500 mb-6 flex-grow min-h-[72px]">
            Working with legal and diagnostic professionals to help parents access specialist learning environments.
          </p>
              <Button
                href="/services/local-authorities"
                className="w-full bg-teal-600 hover:bg-teal-500 focus-visible:outline-teal-600"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <Section background="gray" spacing="lg">
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg ring-1 ring-gray-200 p-8 sm:p-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-semibold tracking-tight text-charcoal-900 sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-lg leading-7 text-charcoal-500 max-w-2xl mx-auto">
                Getting started is simple. Here's what to expect when you work with us
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-xl shadow-lg mb-6">
                <CalendarIcon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="absolute top-8 left-1/2 hidden lg:block w-full h-0.5 bg-teal-200 -z-10" style={{ width: 'calc(100% + 2rem)' }} />
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-3">
                Book Your Consultation
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">
                Select a time that works for you from our available slots. Quick and easy online booking.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-xl shadow-lg mb-6">
                <ChatBubbleLeftRightIcon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="absolute top-8 left-1/2 hidden lg:block w-full h-0.5 bg-teal-200 -z-10" style={{ width: 'calc(100% + 2rem)' }} />
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-3">
                Share Your Needs
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">
                Tell us about your situation, concerns, and what you hope to achieve from our support.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-xl shadow-lg mb-6">
                <LightBulbIcon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="absolute top-8 left-1/2 hidden lg:block w-full h-0.5 bg-teal-200 -z-10" style={{ width: 'calc(100% + 2rem)' }} />
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-3">
                Get Expert Guidance
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">
                Receive tailored advice and actionable recommendations based on your unique needs.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-xl shadow-lg mb-6">
                <ArrowPathIcon className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-3">
                Move Forward
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">
                Implement solutions with our ongoing support and see real progress for your child.
              </p>
            </div>
          </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section background="white" spacing="lg">
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-charcoal-900/70 backdrop-blur-sm rounded-3xl p-8 sm:p-10 mx-auto max-w-3xl">
              <h2 className="text-3xl font-display font-semibold tracking-tight text-white sm:text-4xl">
                Why choose us
              </h2>
              <p className="mt-4 text-lg leading-7 text-gray-100 max-w-2xl mx-auto">
                Experience, expertise, and a proven approach to SEND support
              </p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Benefit 1 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100 transition-shadow hover:shadow-xl hover:ring-teal-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-3">
                10+ Years of Experience
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                With over a decade working across families, schools, and local authorities, we bring deep expertise in navigating the SEND system and securing positive outcomes.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100 transition-shadow hover:shadow-xl hover:ring-teal-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-3">
                Evidence-Based Practice
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Our recommendations are grounded in research and best practice, ensuring practical and sustainable solutions that make a real difference.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-teal-100 transition-shadow hover:shadow-xl hover:ring-teal-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-3">
                Child-Centered Approach
              </h3>
              <p className="text-charcoal-500 leading-relaxed">
                Every child is unique. We provide holistic, tailored assessments that focus on strengths and needs, delivering actionable recommendations—not just reports.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section background="teal-gradient" spacing="lg">
        <div className="relative z-20 mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-charcoal-900/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Book a consultation today and take the first step towards getting the support your child deserves. Our Starter Consultation is a low-commitment way to explore how we can help.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
              <Button
                href="/services/families"
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 focus-visible:outline-teal-600"
              >
                Book a consultation
              </Button>
              <Link
                href="/pricing"
                className="flex items-center text-base font-semibold leading-6 text-white hover:text-teal-300 transition-colors underline decoration-2 underline-offset-4 decoration-teal-400"
              >
                View pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust Section */}
      <section className="bg-sand-50 py-20">
        <div className="relative z-20 w-full bg-charcoal-900/70 backdrop-blur-sm py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-display font-semibold tracking-tight text-white sm:text-4xl">
                Trusted by families, schools and local authorities
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                With wide experience across families, schools and local
                authorities, we provide specialist guidance informed by research and experience for children with SEND.
              </p>
            </div>
            <div className="mt-16 grid gap-12 sm:grid-cols-2">
              <div className="text-center">
                <div className="text-4xl font-display font-semibold text-gold-400">10+</div>
                <div className="mt-3 text-base text-gray-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-base text-gray-200">Has provided support for children, young people with SEND, schools and local authorities.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
