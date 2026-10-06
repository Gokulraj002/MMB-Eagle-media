import { news } from '../../data/news'
import NewsCard from '../cards/NewsCard'
import CircleArrow from '../ui/CircleArrow'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

export default function NewsSection() {
  return (
    <section id="news" className="section-y">
      <div className="container-x">
        {/* Title row – "view all" sits on the right from tablet up */}
        <div className="flex items-end justify-between gap-8">
          <SectionTitle>News &amp; Updates</SectionTitle>
          <div className="hidden sm:block">
            <CircleArrow to="/news" label="View All Updates" className="sm:flex-row-reverse sm:gap-4" />
          </div>
        </div>

        <ul className="mt-10 grid gap-12 sm:grid-cols-3 sm:gap-6 md:mt-14 lg:gap-10 xl:gap-12">
          {news.slice(0, 3).map((item, i) => (
            <Reveal as="li" key={item.slug} delay={0.1 * i}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex justify-center sm:hidden">
          <CircleArrow to="/news" label="View All Updates" />
        </div>
      </div>
    </section>
  )
}
