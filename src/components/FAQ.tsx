'use client'

import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  className?: string
}

export function FAQ({ items, className }: FAQProps) {
  return (
    <dl className={clsx('space-y-4', className)}>
      {items.map((item, index) => (
        <Disclosure key={index} as="div" className="rounded-lg bg-white ring-1 ring-slate-200">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset">
                <dt className="text-base font-semibold text-slate-900">
                  {item.question}
                </dt>
                <span className="ml-4 flex-shrink-0">
                  <svg
                    className={clsx(
                      'h-5 w-5 text-teal-600 transition-transform',
                      open && 'rotate-180',
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="px-6 pb-4 pt-0">
                <dd className="text-base text-slate-600">{item.answer}</dd>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </dl>
  )
}








