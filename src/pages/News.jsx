import CTABanner from '../components/sections/CTABanner'
import Seo from '../components/seo/Seo'
import Img from '../components/ui/Img'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { news } from '../data/news'
import { formatDate } from '../utils/formatDate'

export default function News() {
  return (
    <>
      <Seo title="News & Updates" />
      <PageHero kicker="Latest" title="News & Updates" image="page-news" position="object-[65%_center]" />
      <section className="section-y bg-ink">
        <ul className="container-x space-y-16 md:space-y-20 [&>li:last-child>article]:border-b-0 [&>li:last-child>article]:pb-0">
          {news.map((n) => (
            <Reveal as="li" key={n.slug}>
              <article
                id={n.slug}
                className="grid scroll-mt-28 gap-8 border-b border-line pb-16 md:gap-10 md:pb-20 lg:items-center lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20"
              >
                <div className="overflow-hidden border border-line">
                  <Img name={n.image} size="(min-width: 1024px) 55vw, 100vw" alt="" className="aspect-[16/9] w-full object-cover" />
                </div>
                <div>
                  <time dateTime={n.date} className="eyebrow text-crimson">{formatDate(n.date)}</time>
                  <h2 className="mt-4 font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.3rem)] leading-tight tracking-[0.06em] uppercase">{n.title}</h2>
                  <p className="eyebrow mt-3 text-gold-soft">{n.subtitle}</p>
                  <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-mist">{n.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
      <CTABanner />
    </>
  )
}
