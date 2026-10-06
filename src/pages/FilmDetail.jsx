import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Expand } from 'lucide-react'
import FilmCard from '../components/cards/FilmCard'
import NewsCard from '../components/cards/NewsCard'
import Seo from '../components/seo/Seo'
import Button from '../components/ui/Button'
import Img from '../components/ui/Img'
import Lightbox from '../components/ui/Lightbox'
import Reveal from '../components/ui/Reveal'
import SectionTitle from '../components/ui/SectionTitle'
import { featuredProject, films } from '../data/films'
import { news } from '../data/news'
import NotFound from './NotFound'

// Where each banner's subject sits, so the hero crop never cuts it off.
const HERO_FOCUS = {
  gangamma: 'object-[80%_center] md:object-[72%_center] lg:object-center', // 16:9 key art – warrior + trident sit right of centre
  'dandupalya-1': 'object-[50%_center]',
  'krishna-pranaya-sakhi': 'object-[53%_center]',
}

export default function FilmDetail() {
  const { slug } = useParams()
  const [open, setOpen] = useState(null)
  const film = films.find((f) => f.slug === slug)
  if (!film) return <NotFound />

  const featured = featuredProject.slug === slug ? featuredProject : null
  const stills = film.stills?.length ? film.stills : [film.poster]
  const mosaic = stills.length >= 5
  const matches = (text) =>
    text.toLowerCase().includes(film.title.toLowerCase()) ||
    (film.kicker && text.toLowerCase().includes(film.kicker.toLowerCase()))
  const updates = news.filter((n) => matches(n.title))
  const others = films.filter((f) => f.slug !== film.slug)

  const facts = [
    ['Status', film.status],
    ['Genre', film.genre],
    film.languages?.length && ['Languages', film.languages.join(', ')],
  ].filter(Boolean)

  return (
    <>
      <Seo title={film.title} description={film.synopsis} />

      {/* Hero – fills the screen on laptops; shading stays on the text side + bottom edge so the banner stays vivid */}
      <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden pt-32 pb-16 md:pb-20 lg:min-h-svh lg:pb-24">
        <Img
          name={film.banner || film.poster}
          size="full"
          priority
          className={`absolute inset-0 -z-20 size-full object-cover ${HERO_FOCUS[film.slug] || 'object-center'}`}
        />
        <div className="absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-ink/75 via-ink/30 to-transparent md:w-3/4" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/60 to-transparent" />
        <Reveal className="container-x text-legible">
          {film.kicker && <p className="font-display text-[12px] tracking-[0.4em] text-[#d8b98a]/80 uppercase">{film.kicker}</p>}
          {featured ? (
            <>
              <h1 className="sr-only">{film.title}</h1>
              <img src={featured.titleArt} alt="" className="mt-3 w-full max-w-[520px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]" />
              <p className="mt-2 font-display tracking-[0.42em] text-[#e0a35a] uppercase">{featured.tagline}</p>
            </>
          ) : (
            <h1 className="display mt-3 text-[clamp(2.4rem,1.6rem+3vw,4.4rem)]">{film.title}</h1>
          )}
          <p className="eyebrow mt-7 text-bone">
            <span className={film.status === 'Upcoming' ? 'text-gold' : 'text-crimson'}>{film.status}</span>
            <span className="mx-3 text-bone/30">|</span>
            {film.genre}
          </p>
          {film.languages?.length > 0 && <p className="eyebrow mt-3 text-[10.5px] text-bone/75">{film.languages.join('  ·  ')}</p>}
        </Reveal>
      </section>

      <Block id="synopsis" title="Synopsis">
        <div className="grid gap-12 xl:grid-cols-[1fr_300px] xl:gap-16">
          <p className="prose-measure text-[16px] leading-[1.95] text-bone/85 md:text-[17px]">{film.synopsis}</p>
          <dl className="max-w-md divide-y divide-line border-y border-line xl:max-w-none">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-8 py-4">
                <dt className="eyebrow text-[10px] text-mist">{k}</dt>
                <dd className="text-right text-[13px] text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Block>

      {/* Placeholder only while the film is upcoming – released titles skip it */}
      {film.status === 'Upcoming' && (
        <Block id="cast-crew" title="Cast & Crew">
          <div className="border border-dashed border-line px-8 py-14 text-center md:py-16">
            <p className="font-display text-lg tracking-[0.08em] text-bone uppercase">Coming Soon</p>
            <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-mist">The cast and crew will be announced shortly. Follow us for the reveal.</p>
          </div>
        </Block>
      )}

      <Block id="posters" title="Posters">
        <button type="button" onClick={() => setOpen(0)} className="group relative block w-full overflow-hidden border border-line" aria-label="View poster">
          <Img name={film.poster} size="(min-width: 1024px) 66vw, 100vw" alt={`${film.title} key art`} className="zoom-img aspect-[16/9] w-full object-cover" />
        </button>
      </Block>

      {/* Full-width so the stills can be big: a lead still + supporting frames when there are enough */}
      <Block id="gallery" title="Gallery" wide>
        <ul className={`grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8 ${mosaic ? 'lg:grid-cols-3' : ''}`}>
          {stills.map((name, i) => (
            <li key={name} className={mosaic && i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block size-full overflow-hidden border border-line"
                aria-label={`Open still ${i + 1}`}
              >
                <Img
                  name={name}
                  size={mosaic && i === 0 ? '(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                  alt={`${film.title} still ${i + 1}`}
                  className={`zoom-img aspect-[16/10] w-full object-cover ${mosaic && i === 0 ? 'lg:aspect-auto lg:h-full' : ''}`}
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Expand size={20} strokeWidth={1.4} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Block>

      {updates.length > 0 && (
        <Block id="updates" title="Updates">
          <ul className="grid max-w-4xl gap-10 sm:grid-cols-2 lg:gap-12">
            {updates.map((n) => (
              <li key={n.slug}>
                <NewsCard item={n} />
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* Other films */}
      <section className="section-y bg-coal">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle>More Films</SectionTitle>
            <Button to="/films">All Films</Button>
          </div>
          <ul className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-8 md:mt-14 lg:gap-12">
            {others.map((f) => (
              <li key={f.slug}>
                <FilmCard film={f} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Lightbox images={stills} index={open} onChange={setOpen} onClose={() => setOpen(null)} label={film.title} />
    </>
  )
}

// `wide` stacks the title above the content so it can use the full container width.
function Block({ id, title, wide = false, children }) {
  return (
    <section id={id} className="section-y-sm scroll-mt-24 border-b border-line">
      <div className={`container-x grid gap-10 md:gap-12 ${wide ? '' : 'lg:grid-cols-[300px_1fr] lg:gap-16 xl:grid-cols-[320px_1fr]'}`}>
        <SectionTitle>{title}</SectionTitle>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  )
}
