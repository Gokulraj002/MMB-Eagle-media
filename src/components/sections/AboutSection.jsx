import { services } from '../../data/services'
import { featureIcons } from '../icons/FeatureIcons'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'

export default function AboutSection({ showButton = true, title = 'About Us' }) {
  return (
    <section id="about" className="grain relative overflow-hidden border-y border-line bg-coal">
      <div className="grid lg:grid-cols-[34%_1fr] xl:grid-cols-[42%_1fr]">
        {/* Image – bleeds to the left edge; only its inner edge fades into the panel.
            -z-10 keeps the panel's film grain on top so the fade has no visible seam. */}
        <div className="relative -z-10 h-80 sm:h-[28rem] lg:h-auto lg:min-h-[600px]">
          <Img
            name="premium-about-v3"
            size="(min-width: 1024px) 42vw, 100vw"
            alt="Eagle Media Creations crew filming at sunset"
            className="absolute inset-0 size-full object-cover object-[38%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent via-40% to-transparent lg:bg-gradient-to-r lg:from-transparent lg:from-60% lg:to-coal lg:to-[97%]" />
        </div>

        <div className="section-y px-5 max-lg:pt-8 md:px-10 lg:pr-[max(56px,calc((100vw-1440px)/2+56px))] xl:pr-[max(72px,calc((100vw-1440px)/2+72px))] lg:pl-14 xl:pl-20">
          <Reveal className="max-w-xl">
            <h2 className="section-title">{title}</h2>
            <div className="mt-7 space-y-5 text-[15px] leading-[1.85] text-bone/85">
              <p>
                Eagle Media Creations is a film and media production company dedicated to creating impactful
                stories that entertain, inspire and stay with audiences.
              </p>
              <p>
                From feature films to entertainment events, we bring together creativity, technology and passion to
                deliver unforgettable cinematic experiences.
              </p>
            </div>
            {showButton && (
              <Button to="/about" className="mt-9">
                Know More
              </Button>
            )}
          </Reveal>

          {/* Three gold feature columns, set apart from the copy by a hairline */}
          <ul className="mt-12 grid gap-10 border-t border-line pt-12 sm:grid-cols-3 sm:gap-0 lg:mt-14">
            {services.map((s, i) => {
              const Icon = featureIcons[s.icon]
              return (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={0.12 * i}
                  className="flex flex-col items-center px-6 text-center lg:px-3 xl:px-6 sm:border-l sm:border-line sm:first:border-l-0"
                >
                  <Icon className="text-gold" />
                  <h3 className="mt-5 font-display text-[12.5px] leading-snug font-semibold tracking-[0.1em] text-gold-soft uppercase">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.75] sm:max-w-[15rem] text-mist">{s.text}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
