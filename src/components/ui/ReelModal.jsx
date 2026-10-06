import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { site } from '../../data/site'

export default function ReelModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-bone/80 hover:text-white"
            aria-label="Close"
          >
            <X size={28} strokeWidth={1.4} />
          </button>
          <motion.div
            className="aspect-video w-full max-w-5xl bg-ash"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            {site.reelUrl ? (
              <iframe
                className="size-full"
                src={`${site.reelUrl}?autoplay=1`}
                title="Eagle Media Creations showreel"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-3 text-center">
                <p className="section-title">Showreel</p>
                <p className="eyebrow text-mist">Coming soon</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
