import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Resource',
  description: 'Resource from Lighthouse Consultancy',
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Placeholder for future MDX/markdown content
  // This route structure supports future blog posts
  await params // Resolve the promise
  notFound()
}

