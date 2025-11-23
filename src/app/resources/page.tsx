import { type Metadata } from 'next'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Resources, articles, and guides from Lighthouse Consultancy',
}

export default function Resources() {
  return (
    <Section spacing="lg">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Resources
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Our resources section is coming soon. We&apos;ll be sharing articles,
          guides, and updates about SEND support here.
        </p>
        <p className="mt-4 text-slate-600">
          This section can be extended with MDX blog posts or markdown content
          in the future.
        </p>
      </div>
    </Section>
  )
}


