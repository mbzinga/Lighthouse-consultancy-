import { type Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { siteConfig } from '@/config/site'
import { Layout } from '@/components/Layout'
import { CookieProvider } from '@/components/CookieProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://lighthousesend.com'),
  title: {
    template: siteConfig.seo.titleTemplate,
    default: siteConfig.seo.defaults.title,
  },
  description: siteConfig.seo.defaults.description,
  openGraph: {
    title: siteConfig.seo.defaults.title,
    description: siteConfig.seo.defaults.description,
    type: 'website',
    images: [
      {
        url: siteConfig.seo.defaults.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaults.title,
    description: siteConfig.seo.defaults.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full bg-white antialiased',
        inter.variable,
        poppins.variable,
      )}
    >
      <body className="flex min-h-full">
        <CookieProvider>
          <div className="flex w-full flex-col">
            <Layout>{children}</Layout>
          </div>
        </CookieProvider>
      </body>
    </html>
  )
}
