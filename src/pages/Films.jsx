import { Link } from 'react-router-dom'
import CTABanner from '../components/sections/CTABanner'
import Seo from '../components/seo/Seo'
import Button from '../components/ui/Button'
import Img from '../components/ui/Img'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { films } from '../data/films'

// Keep each key art's subject in frame when the poster is cropped (default: centre).
const framing = { gangamma: 'object-[68%_center]' }

export default function Films() {
  // Upcoming productions first, then released titles.
  const ordered = [...films].sort((a, b) => (a.status === 'Upcoming' ? -1 : 0) - (b.status === 'Upcoming' ? -1 : 0))

  return (
    <>
      <Seo title="Our Films" description="Feature films produced by Eagle Media Creations – released titles and upcoming productions." />
      <PageHero kicker="Filmography" title="Our Films" image="page-films" position="object-[72%_center]" />

      <section className="section-y bg-ink">
        <ul className="container-x space-y-24 md:space-y-32 xl:space-y-40">
          {ordered.map((film, i) => {
            const flip = i % 2 === 1
            return (
              <li key={film.slug}>
                <article
                  className={`grid items-center gap-10 md:gap-12 lg:gap-20 ${
                    flip ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]' : 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]'
                  }`}
                >
                  <Reveal className={flip ? 'lg:order-2' : ''}>
                    <Link to={`/films/${film.slug}`} className="group relative block overflow-hidden border border-line">
                      <Img
                        name={film.poster}
                        size="(min-width: 1024px) 58vw, 100vw"
                        alt={`${film.title} key art`}
                        className={`zoom-img aspect-[16/10] w-full object-cover ${framing[film.slug] || 'object-center'}`}
                      />
                      <span
                        className={`eyebrow absolute top-5 left-5 px-3 py-1.5 text-[9.5px] text-white ${
                          film.status === 'Upcoming' ? 'bg-crimson' : 'bg-black/70 backdrop-blur-sm'
                        }`}
                      >
                        {film.status}
                      </span>
                    </Link>
                  </Reveal>

                  <Reveal delay={0.1} className={flip ? 'lg:order-1' : ''}>
                    <p className="font-display text-crimson">{String(i + 1).padStart(2, '0')}</p>
                    {film.kicker && <p className="eyebrow mt-4 text-[10.5px] text-gold">{film.kicker}</p>}
                    <h2 className="display mt-3 text-[clamp(2rem,1.5rem+1.6vw,3.2rem)]">{film.title}</h2>
                    <p className="eyebrow mt-5 text-[10.5px] text-mist">
                      {film.genre}
                      {film.languages?.length > 0 && <span className="text-smoke"> · {film.languages.length} languages</span>}
                    </p>
                    <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-bone/80">{film.synopsis}</p>
                    <Button to={`/films/${film.slug}`} className="mt-10">
                      View Film
                    </Button>
                  </Reveal>
                </article>
              </li>
            )
          })}
        </ul>
      </section>
      <CTABanner />
    </>
  )
}
