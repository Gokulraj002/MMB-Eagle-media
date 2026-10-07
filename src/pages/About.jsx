import Seo from '../components/seo/Seo'
import AboutSection from '../components/sections/AboutSection'
import CTABanner from '../components/sections/CTABanner'
import Img from '../components/ui/Img'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionTitle from '../components/ui/SectionTitle'

const offerings = [
  {
    title: 'Film Production',
    text: 'Feature films, web content and short films – from script development and casting to principal photography and post-production.',
    image: 'premium-gallery-bts-v3',
  },
  {
    title: 'Entertainment Events',
    text: 'Celebrity events, film launches and sports leagues produced with cinematic scale, staging and storytelling.',
    image: 'hero-entertainment',
  },
  {
    title: 'Talent & Collaborations',
    text: 'Bringing together actors, technicians and creative partners to build lasting relationships across industries.',
    image: 'gallery-cast-crew',
  },
]

const pillars = [
  { title: 'Our Vision', text: 'To tell stories rooted in our culture that travel across languages and borders.' },
  { title: 'Our Mission', text: 'To produce cinema and live entertainment with honesty, craft and scale.' },
  { title: 'Our Promise', text: 'Every frame made with passion, every partner treated like family.' },
]

export default function About() {
  return (
    <>
      <Seo title="About Us" description="Trishul Entertainments is a film and media production company creating feature films, entertainment events and creative collaborations." />
      <PageHero kicker="Who we are" title="About Us" image="page-about" position="object-[60%_center]" />
      <AboutSection showButton={false} title="Our Story" />

      <section className="section-y bg-ink">
        <div className="container-x">
          <SectionTitle>What We Do</SectionTitle>
          {/* Tablet: image + text side by side; three columns from lg so nothing is thumbnail-sized */}
          <ul className="mt-14 grid gap-14 md:mt-16 lg:grid-cols-3 lg:gap-12">
            {offerings.map((o, i) => (
              <Reveal as="li" key={o.title} delay={0.1 * i} className="group md:grid md:grid-cols-2 md:items-center md:gap-10 lg:block">
                <div className="overflow-hidden border border-line">
                  <Img name={o.image} size="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" alt={o.title} className="zoom-img aspect-[4/3] w-full object-cover" />
                </div>
                <div>
                  <h3 className="mt-7 font-display text-[18px] tracking-[0.08em] text-gold-soft uppercase md:mt-0 lg:mt-7">{o.title}</h3>
                  <p className="mt-4 max-w-sm text-[14.5px] leading-[1.85] text-mist">{o.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-t border-line bg-coal">
        <div className="container-x">
          <SectionTitle>What Drives Us</SectionTitle>
          <ul className="mt-14 grid gap-px bg-line md:mt-16 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 * i} className="bg-coal p-8 md:p-10 xl:p-14">
                <span className="font-display text-crimson">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-lg tracking-[0.08em] uppercase">{p.title}</h3>
                <p className="mt-4 max-w-xs text-[14.5px] leading-[1.85] text-mist">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
