import { Link } from 'react-router-dom'
import { featuredProject as p } from '../../data/films'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'

// Soft shadow that keeps light text legible over the photo without darkening it
const shadow = '[text-shadow:0_2px_14px_rgba(0,0,0,0.75)]'

export default function FeaturedProject() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1a0806]">
      {/* Phones: the 16:9 key art keeps the warrior + trident recognisable in a tall crop */}
      <Img
        name={p.bannerMobile}
        size="full"
        className="absolute inset-0 -z-20 size-full object-cover object-[60%_center] md:hidden"
      />
      {/* Tablet & up: full-bleed ultra-wide banner – the photo's own smoky left side sits behind the title */}
      <Img
        name={p.banner}
        size="full"
        className="absolute inset-0 -z-20 hidden size-full object-cover md:block md:object-[85%_center] xl:object-right"
      />
      {/* Mobile: text sits over the photo, so dim evenly (kept light so the subject reads) */}
      <div className="absolute inset-0 -z-10 bg-[#120605]/45 md:hidden" />
      {/* Desktop: localized gradient behind the copy only – the warrior stays vivid */}
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#120605]/85 via-[#1a0806]/35 via-40% to-transparent to-60% md:block" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_50%,rgba(200,32,47,0.16),transparent_55%)]" />
      {/* Soft right-edge shade so the section links stay readable (links show from xl only) */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-96 bg-gradient-to-l from-black/75 via-black/30 to-transparent xl:block" />

      <div className="container-x section-y grid items-center gap-10 md:min-h-[520px] lg:min-h-[600px] xl:grid-cols-[1fr_auto] xl:min-h-[640px]">
        <Reveal className="max-w-xl text-center md:text-left">
          <p className={`font-display text-[12px] tracking-[0.4em] text-[#e2c599] uppercase ${shadow}`}>{p.kicker}</p>
          <h2 className="mt-4">
            <span className="sr-only">{p.title}</span>
            {/* Title art – transparent PNG (replace with the official title logo) */}
            <img
              src={p.titleArt}
              alt=""
              className="mx-auto w-full max-w-[420px] drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)] md:mx-0 xl:max-w-[460px]"
            />
          </h2>
          <p
            className={`mt-3 font-display text-[clamp(1rem,0.8rem+0.6vw,1.3rem)] tracking-[0.42em] text-[#eaae63] uppercase ${shadow}`}
          >
            {p.tagline}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-y-2 md:justify-start">
            {p.languages.map((lang, i) => (
              <li
                key={lang}
                className={`eyebrow text-[9.5px] tracking-[0.1em] text-bone sm:text-[10.5px] sm:tracking-[0.14em] ${shadow}`}
              >
                {i > 0 && <span className="mx-2 text-bone/45 sm:mx-3">|</span>}
                {lang}
              </li>
            ))}
          </ul>
          <Button to={`/films/${p.slug}`} className="mt-9">
            Explore Project
          </Button>
        </Reveal>

        {/* Quick links into the project page – only where there is room beside the warrior */}
        <nav aria-label={`${p.title} sections`} className="hidden xl:-mr-6 xl:block">
          <ul className="space-y-6">
            {p.sections.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/films/${p.slug}#${s.id}`}
                  className={`group flex items-center gap-4 eyebrow text-[10.5px] text-bone hover:text-white ${shadow}`}
                >
                  <span className="h-px w-4 bg-crimson transition-all duration-300 group-hover:w-8" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
