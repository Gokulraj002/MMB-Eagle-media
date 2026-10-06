import Seo from '../components/seo/Seo'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-ink px-4 pt-24 text-center">
      <Seo title="Page Not Found" />
      <div>
        <p className="font-display text-7xl text-crimson">404</p>
        <h1 className="section-title mt-4">Scene Not Found</h1>
        <p className="mt-3 text-mist">The page you're looking for has been cut from the final edit.</p>
        <Button to="/" className="mt-8">Back to Home</Button>
      </div>
    </section>
  )
}
