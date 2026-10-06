import Seo from '../components/seo/Seo'
import Hero from '../components/sections/Hero'
import AboutSection from '../components/sections/AboutSection'
import FeaturedProject from '../components/sections/FeaturedProject'
import FilmsSection from '../components/sections/FilmsSection'
import GallerySection from '../components/sections/GallerySection'
import NewsSection from '../components/sections/NewsSection'
import ContactSection from '../components/sections/ContactSection'
import Img from '../components/ui/Img'
import { site } from '../data/site'

export default function Home() {
  return (
    <>
      <Seo />
      {/* Structured data so search engines understand the company */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.name,
            slogan: site.tagline,
            email: site.email,
            telephone: site.phone,
            ...(site.url && { url: site.url }),
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Hyderabad',
              addressRegion: 'Telangana',
              addressCountry: 'IN',
            },
            sameAs: Object.values(site.socials).filter(Boolean),
          }),
        }}
      />
      <Hero />
      <AboutSection />
      <FeaturedProject />
      <FilmsSection />
      <GallerySection />

      {/* Sunset silhouette sits behind Contact and fades up into News' bottom padding,
          so it never runs under the (full-width) news cards */}
      <div className="relative isolate overflow-hidden bg-ink">
        <NewsSection />
        <div className="relative">
          <Img
            name="premium-contact-v3"
            size="26vw"
            className="absolute bottom-0 left-0 -z-10 hidden h-[calc(100%+96px)] w-[24%] object-cover object-[34%_center] [mask-image:linear-gradient(to_right,black_45%,transparent),linear-gradient(to_bottom,transparent,black_30%)] [mask-composite:intersect] xl:block"
          />
          <ContactSection offset />
        </div>
      </div>
    </>
  )
}
