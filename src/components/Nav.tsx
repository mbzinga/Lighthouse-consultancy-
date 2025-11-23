'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { siteConfig } from '@/config/site'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
]

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Text color based on scroll state and page
  const textColorClass = scrolled || !isHomePage ? 'text-charcoal-900' : 'text-white'
  const logoColorClass = scrolled || !isHomePage ? 'text-navy-500' : 'text-white'
  const hoverColorClass = scrolled || !isHomePage ? 'hover:text-sky-500' : 'hover:text-sky-300'
  const mobileButtonColorClass = scrolled || !isHomePage ? 'text-charcoal-700' : 'text-white'

  return (
    <header className={`sticky top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : ''}`}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="flex items-center gap-3">
            <span className="sr-only">{siteConfig.name}</span>
            <Logo className={`h-8 w-auto ${logoColorClass}`} />
            <span className={`flex flex-col leading-none ${textColorClass}`}>
              <span className="text-xl font-display font-semibold">Lighthouse</span>
              <span className="text-sm font-display font-medium -mt-0.5">Consultancy</span>
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${mobileButtonColorClass}`}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? (scrolled || !isHomePage 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'bg-white/20 text-white')
                    : `${textColorClass} ${hoverColorClass} ${
                        scrolled || !isHomePage 
                          ? 'hover:bg-gray-100' 
                          : 'hover:bg-white/10'
                      }`
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
          <Button href="/pricing" className="flex items-center">Book a consultation</Button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-charcoal-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
              <span className="sr-only">{siteConfig.name}</span>
              <Logo className="h-8 w-auto text-navy-500" />
              <span className="flex flex-col leading-none text-charcoal-900">
                <span className="text-xl font-display font-semibold">Lighthouse</span>
                <span className="text-sm font-display font-medium -mt-0.5">Consultancy</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-charcoal-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-charcoal-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-charcoal-900 hover:bg-teal-50"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
              <div className="py-6">
                <Button href="/pricing" className="w-full">
                  Book a consultation
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

