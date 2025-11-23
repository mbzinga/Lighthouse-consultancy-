import { Container } from '@/components/Container'
import clsx from 'clsx'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'teal' | 'sand-50' | 'teal-gradient' | 'navy-gradient'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

const spacingClasses = {
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-20',
  xl: 'py-24',
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-sand-50',
  teal: 'bg-teal-50',
  'sand-50': 'bg-sand-50',
  'teal-gradient': 'bg-gradient-to-br from-teal-50 via-teal-100/50 to-teal-50',
  'navy-gradient': 'bg-gradient-to-br from-navy-500 via-navy-600 to-navy-500',
}

export function Section({
  children,
  className,
  background = 'white',
  spacing = 'md',
}: SectionProps) {
  return (
    <section
      className={clsx(
        backgroundClasses[background],
        spacingClasses[spacing],
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}


