import Img from './Img'
import Reveal from './Reveal'

// Banner at the top of inner pages (About, Films, Gallery…)
// `position` is an object-position class so each page can keep its photo's subject in frame,
// e.g. position="object-[70%_center]".
export default function PageHero({ title, kicker, image, position = 'object-center' }) {
  return (
    <section className="relative isolate flex min-h-[max(460px,64svh)] items-end overflow-hidden pt-36 pb-16 md:min-h-[max(520px,72svh)] md:pb-20 lg:min-h-[max(560px,78svh)] lg:pb-24">
      {image && <Img name={image} size="full" priority className={`absolute inset-0 -z-20 size-full object-cover ${position}`} />}

      {/* Light, localized shading – the photo stays vivid, only the title area and edges are darkened */}
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-t from-ink via-ink/45 to-transparent" />
      <div className="absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-ink/65 via-ink/20 to-transparent md:w-3/4 lg:w-[60%]" />

      <div className="container-x">
        <Reveal className="[text-shadow:0_2px_24px_rgb(0_0_0/0.6)]">
          {kicker && (
            <p className="eyebrow mb-5 flex items-center gap-3 text-bone/90">
              <span className="h-px w-7 bg-crimson" />
              {kicker}
            </p>
          )}
          <h1 className="display text-[clamp(2.6rem,1.6rem+3.4vw,5rem)] text-bone">{title}</h1>
          <span className="title-rule mt-5" />
        </Reveal>
      </div>
    </section>
  )
}
