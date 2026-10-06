import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { galleryCategories } from '../../data/gallery'
import CircleArrow from '../ui/CircleArrow'
import Img from '../ui/Img'
import SectionTitle from '../ui/SectionTitle'

export default function GallerySection() {
  const track = useRef(null)

  // Scrolls one card at a time; loops back to the start at the end.
  const scrollNext = () => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = card ? card.offsetWidth + gap : el.clientWidth
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: 'smooth' })
  }

  return (
    <section id="gallery" className="section-y border-b border-line bg-coal">
      <div className="container-x">
        {/* Title row – "view all" sits on the right from tablet up */}
        <div className="flex items-end justify-between gap-8">
          <SectionTitle rule={false}>Gallery</SectionTitle>
          <div className="hidden sm:block">
            <CircleArrow to="/gallery" label="View Full Gallery" className="sm:flex-row-reverse sm:gap-4" />
          </div>
        </div>

        {/* ~3.5 cards visible on laptops – the peeking card hints that the row scrolls */}
        <div className="relative mt-10 md:mt-14">
          <ul
            ref={track}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
          >
            {galleryCategories.map((c) => (
              <li
                key={c.slug}
                className="w-[78%] shrink-0 snap-start sm:w-[44%] md:w-[calc((100%-64px)/2.5)] lg:w-[calc((100%-96px)/3.5)]"
              >
                <Link to={`/gallery#${c.slug}`} className="group block text-center">
                  <div className="overflow-hidden border border-line">
                    <Img
                      name={c.cover}
                      size="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 78vw"
                      alt={c.label}
                      className="zoom-img aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <p className="eyebrow mt-5 text-[11px] text-bone/85 transition-colors group-hover:text-crimson">
                    {c.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Soft edge fade + next button over the peeking card */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-coal/85 to-transparent sm:block" />
          <div className="absolute top-[calc((100%-2.75rem)/2)] right-4 hidden -translate-y-1/2 sm:block">
            <CircleArrow
              onClick={scrollNext}
              ariaLabel="More gallery categories"
              className="rounded-full bg-ink/60 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="mt-14 flex justify-center sm:hidden">
          <CircleArrow to="/gallery" label="View Full Gallery" />
        </div>
      </div>
    </section>
  )
}
