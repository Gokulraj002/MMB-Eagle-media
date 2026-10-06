import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Play } from 'lucide-react'
import { preload } from 'react-dom'
import { heroCopy, heroSlides } from '../../data/hero'
import { img, SIZES } from '../../utils/images'
import CircleArrow from '../ui/CircleArrow'
import ReelModal from '../ui/ReelModal'

const SLIDE_MS = 7000
const ease = [0.2, 0.7, 0.2, 1]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [reelOpen, setReelOpen] = useState(false)
  const reduce = useReducedMotion()
  const slide = heroSlides[index]
  const slideImg = img(slide.image)

  // Load the first slide as early as possible (LCP image).
  const first = img(heroSlides[0].image)
  preload(first.src, { as: 'image', imageSrcSet: first.srcSet, imageSizes: SIZES.full, fetchPriority: 'high' })

  // Warm the browser cache for the next slide so the crossfade never flashes.
  useEffect(() => {
    const { src, srcSet } = img(heroSlides[(index + 1) % heroSlides.length].image)
    const pre = new Image()
    pre.sizes = SIZES.full
    pre.srcset = srcSet
    pre.src = src
  }, [index])

  const next = useCallback(() => setIndex((i) => (i + 1) % heroSlides.length), [])

  // Autoplay – restarts whenever the slide changes (incl. manual clicks).
  useEffect(() => {
    if (reduce || reelOpen) return
    const t = setTimeout(next, SLIDE_MS)
    return () => clearTimeout(t)
  }, [index, next, reduce, reelOpen])

  // Full screen on every device; grows only if the content needs more room (very short screens).
  return (
    <section className="relative isolate flex min-h-[max(640px,100svh)] flex-col overflow-hidden bg-ink">
      {/* Background slides – landscape screens use `position`, portrait phones/tablets `positionPortrait` */}
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.id}
          src={slideImg.src}
          srcSet={slideImg.srcSet}
          sizes={SIZES.full}
          alt=""
          className="absolute inset-0 -z-20 size-full object-cover [object-position:var(--pos)] portrait:[object-position:var(--pos-portrait)]"
          style={{ '--pos': slide.position, '--pos-portrait': slide.positionPortrait || slide.position }}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: SLIDE_MS / 1000 + 1.2, ease: 'linear' } }}
        />
      </AnimatePresence>

      {/* Readability overlays – kept local to the text so the photo stays vivid */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/55 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/45 via-ink/60 via-45% to-ink/10 md:hidden" />
      <div className="absolute inset-y-0 left-0 -z-10 hidden w-[62%] bg-gradient-to-r from-ink/75 via-ink/35 to-transparent md:block" />
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[26%] bg-gradient-to-l from-ink/55 via-ink/20 to-transparent md:block" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[34%] bg-gradient-to-t from-ink via-ink/45 to-transparent" />

      <div className="container-x relative flex flex-1 flex-col pt-28 pb-10 md:pt-32 md:pb-12 xl:pb-14">
        {/* Headline – vertically centred in the space between header and tabs */}
        <div className="flex max-w-2xl flex-1 flex-col justify-center py-8 md:py-10 [text-shadow:0_2px_18px_rgba(0,0,0,0.75)] md:[text-shadow:0_2px_22px_rgba(0,0,0,0.55)]">
          <motion.h1
            className="display text-[clamp(2.5rem,1.2rem+2.8vw,4rem)]"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
          >
            {heroCopy.lines.map((line) => (
              <HeadlineLine key={line} className="text-bone">{line}</HeadlineLine>
            ))}
            {heroCopy.accentLines.map((line) => (
              <HeadlineLine key={line} className="text-crimson">{line}</HeadlineLine>
            ))}
          </motion.h1>

          <motion.p
            className="eyebrow mt-7 text-[10.5px] leading-[2] text-bone md:mt-8 md:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {heroCopy.sub[0]}
            <br />
            {heroCopy.sub[1]}
          </motion.p>

          <motion.button
            type="button"
            onClick={() => setReelOpen(true)}
            className="group mt-9 flex w-fit items-center gap-5 md:mt-11"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease }}
          >
            <span className="relative flex size-12 items-center justify-center rounded-full border-2 border-bone/90 transition-colors duration-300 group-hover:border-crimson group-hover:bg-crimson">
              <span className="absolute inset-0 animate-ping rounded-full border border-bone/30 [animation-duration:2.4s]" />
              <Play size={16} fill="currentColor" className="ml-0.5" />
            </span>
            <span className="eyebrow text-[10.5px] text-bone">Watch Our Reel</span>
          </motion.button>
        </div>

        {/* Right-side tagline + next arrow – aligned to the container gutter, landscape widths only */}
        <div className="absolute top-1/2 right-5 hidden -translate-y-1/2 text-right md:right-10 lg:right-14 lg:block xl:right-[72px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.6, ease }}
              className="font-display text-[clamp(0.95rem,0.6rem+0.7vw,1.35rem)] leading-tight tracking-[0.08em] text-bone uppercase [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]"
            >
              <p className="pr-10">{slide.sideText[0]}</p>
              <p>{slide.sideText[1]}</p>
              <p className="mt-1 pr-10">{slide.sideText[2]}</p>
              <p>{slide.sideText[3]}</p>
            </motion.div>
          </AnimatePresence>
          <CircleArrow onClick={next} ariaLabel="Next slide" className="mt-6" />
        </div>

        {/* Numbered slide tabs */}
        <div>
          <ol className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4 lg:max-w-[52rem] lg:gap-x-12">
            {heroSlides.map((s, i) => {
              const active = i === index
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    className="group w-full text-left"
                    aria-label={`Show slide ${i + 1}: ${s.label}`}
                    aria-current={active}
                  >
                    <span
                      className={`block font-display text-lg transition-colors ${
                        active ? 'text-crimson' : 'text-mist group-hover:text-bone'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`eyebrow block text-[10px] transition-colors ${
                        active ? 'text-bone' : 'text-mist group-hover:text-bone'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="mt-3 block h-px w-full max-w-36 bg-bone/15">
                      {active && (
                        <motion.span
                          key={`${s.id}-${index}`}
                          className="block h-full origin-left bg-crimson"
                          initial={{ scaleX: reduce ? 1 : 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: reduce ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                        />
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <ReelModal open={reelOpen} onClose={() => setReelOpen(false)} />
    </section>
  )
}

function HeadlineLine({ children, className }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${className}`}
        variants={{
          hidden: { y: '105%' },
          show: { y: 0, transition: { duration: 0.9, ease } },
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
