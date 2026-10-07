import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import Seo from '../components/seo/Seo'
import Img from '../components/ui/Img'
import Lightbox from '../components/ui/Lightbox'
import PageHero from '../components/ui/PageHero'
import { galleryCategories } from '../data/gallery'

const ALL = 'all'

export default function Gallery() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const fromHash = hash.slice(1)
  const [filter, setFilter] = useState(galleryCategories.some((c) => c.slug === fromHash) ? fromHash : ALL)
  const [open, setOpen] = useState(null)

  // Home-page links like /gallery#events open that category.
  useEffect(() => {
    if (galleryCategories.some((c) => c.slug === fromHash)) setFilter(fromHash)
  }, [fromHash])

  // Every image once, tagged with its category label.
  const items = useMemo(() => {
    const seen = new Set()
    return galleryCategories.flatMap((c) =>
      c.images
        .filter((name) => (filter === ALL ? !seen.has(name) && seen.add(name) : c.slug === filter))
        .map((name) => ({ name, category: c.label })),
    )
  }, [filter])

  const select = (slug) => {
    setFilter(slug)
    navigate(slug === ALL ? '/gallery' : `/gallery#${slug}`, { replace: true, preventScrollReset: true })
  }

  const tabs = [{ slug: ALL, label: 'All' }, ...galleryCategories]

  return (
    <>
      <Seo title="Gallery" description="Posters, behind-the-scenes moments, events, locations and the people behind Trishul Entertainments." />
      <PageHero kicker="Moments" title="Gallery" image="page-gallery" position="object-[85%_center]" />

      <section className="section-y-sm bg-ink">
        <div className="container-x">
          {/* Filter tabs */}
          <div className="-mx-4 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,#000_85%,transparent)] [scrollbar-width:none] lg:[mask-image:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex min-w-max gap-9 border-b border-line md:gap-8 lg:gap-12" role="tablist" aria-label="Gallery categories">
              {tabs.map((t) => {
                const active = filter === t.slug
                return (
                  <li key={t.slug}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => select(t.slug)}
                      className={`relative eyebrow pb-5 text-[11px] transition-colors ${
                        active ? 'text-bone' : 'text-mist hover:text-bone'
                      }`}
                    >
                      {t.label}
                      {active && <motion.span layoutId="gallery-tab" className="absolute inset-x-0 -bottom-px h-[2px] bg-crimson" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Masonry grid – images keep their natural ratio, so nothing is cropped */}
          <motion.ul layout className="mt-12 columns-2 gap-4 sm:gap-6 md:mt-16 lg:columns-3 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.li
                  layout
                  key={`${filter}-${item.name}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04 }}
                  className="mb-4 break-inside-avoid sm:mb-6 lg:mb-8"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="group relative block w-full overflow-hidden border border-line text-left"
                    aria-label={`Open ${item.category} image`}
                  >
                    <Img name={item.name} size="(min-width: 1320px) 420px, (min-width: 1024px) 33vw, 50vw" alt={item.category} className="zoom-img w-full" />
                    <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 lg:p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="eyebrow text-[10px] text-bone">{item.category}</span>
                      <Expand size={16} strokeWidth={1.5} className="text-bone" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      <Lightbox images={items.map((i) => i.name)} index={open} onChange={setOpen} onClose={() => setOpen(null)} label="Gallery" />
    </>
  )
}
