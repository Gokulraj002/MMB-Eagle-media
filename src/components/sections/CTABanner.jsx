import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'

// Full-width closing call-to-action used at the bottom of inner pages.
export default function CTABanner({
  kicker = 'Collaborate with us',
  title = 'Have a story worth telling?',
  text = 'From feature films to celebrity events, let’s create something unforgettable together.',
  image = 'premium-hero-beyond-v3',
  position = 'object-[72%_center]',
}) {
  return (
    <section className="section-y relative isolate flex min-h-[max(440px,58svh)] items-center overflow-hidden border-y border-line lg:min-h-[max(520px,66svh)]">
      <Img name={image} size="full" className={`absolute inset-0 -z-20 size-full object-cover ${position}`} />

      {/* Shade only behind the copy (left) – the crew on the right stays bright */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent md:via-ink/30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/60 to-transparent" />

      <Reveal className="container-x [text-shadow:0_2px_20px_rgb(0_0_0/0.55)]">
        <div className="max-w-xl">
          <p className="eyebrow flex items-center gap-3 text-bone/90">
            <span className="h-px w-7 bg-crimson" />
            {kicker}
          </p>
          <h2 className="display mt-5 text-[clamp(2.1rem,1.4rem+2.2vw,3.6rem)]">{title}</h2>
          <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-bone/90">{text}</p>
          <Button to="/contact" className="mt-10 [text-shadow:none]">
            Get in Touch
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
