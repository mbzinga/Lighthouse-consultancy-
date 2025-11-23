import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps =
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })

export function Button({ className, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex justify-center rounded-2xl bg-navy-500 p-4 text-base font-semibold text-white hover:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500 active:text-white/70 min-h-[44px] transition-colors',
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
