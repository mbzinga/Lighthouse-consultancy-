import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export default function NotFound() {
  return (
    <Layout showFooter={true}>
      <div className="relative flex min-h-[60vh] items-center py-20 sm:py-36">
        <Container className="relative flex w-full flex-col items-center">
          <p className="font-display text-2xl tracking-tight text-slate-900">
            404
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tighter text-teal-600 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-lg tracking-tight text-slate-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Button
            href="/"
            className="mt-8 bg-teal-600 hover:bg-teal-700 focus-visible:outline-teal-600"
          >
            Go back home
          </Button>
        </Container>
      </div>
    </Layout>
  )
}
