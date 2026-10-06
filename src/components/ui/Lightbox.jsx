import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { img } from '../../utils/images'

// Full-screen image viewer. `images` = image names, `index` = open image (null = closed).
export default function Lightbox({ images, index, onChange, onClose, label = 'Image' }) {
  const open = index !== null && index !== undefined
  const touchX = useRef(null)

  const go = useCallback(
    (step) => onChange((index + step + images.length) % images.length),
    [index, images.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, go, onClose])

  const current = open ? img(images[index]) : null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - (touchX.current ?? 0)
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} viewer`}
        >
          <motion.img
            key={images[index]}
            src={current.src}
            srcSet={current.srcSet}
            sizes="94vw"
            alt={`${label} ${index + 1}`}
            className="h-auto max-h-[84svh] w-auto max-w-[94vw] object-contain shadow-2xl sm:max-w-[calc(100vw-10rem)] lg:max-h-[86svh]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          />

          <p className="eyebrow absolute bottom-5 left-1/2 -translate-x-1/2 text-mist">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>

          <button type="button" onClick={onClose} className="absolute top-5 right-5 text-bone/80 hover:text-white" aria-label="Close">
            <X size={28} strokeWidth={1.4} />
          </button>

          {images.length > 1 && (
            <>
              <NavButton side="left" onClick={(e) => (e.stopPropagation(), go(-1))} label="Previous image">
                <ChevronLeft size={22} strokeWidth={1.4} />
              </NavButton>
              <NavButton side="right" onClick={(e) => (e.stopPropagation(), go(1))} label="Next image">
                <ChevronRight size={22} strokeWidth={1.4} />
              </NavButton>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NavButton({ side, onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/40 text-bone transition-colors hover:border-crimson hover:bg-crimson sm:flex ${
        side === 'left' ? 'left-5' : 'right-5'
      }`}
    >
      {children}
    </button>
  )
}
