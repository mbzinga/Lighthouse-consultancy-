import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'

export function Layout({
  children,
  showFooter = true,
}: {
  children: React.ReactNode
  showFooter?: boolean
}) {
  return (
    <>
      <Nav />
      <main className="flex-auto">{children}</main>
      {showFooter && <Footer />}
    </>
  )
}
