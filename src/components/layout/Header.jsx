import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../../data/navigation'
import { useScrolled } from '../../hooks/useScrolled'
import Logo from './Logo'
import SocialLinks from './SocialLinks'

export default function Header() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/85 py-2.5 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md'
          : 'bg-gradient-to-b from-ink/55 via-ink/20 to-transparent py-4 text-legible'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-8">
        <Logo compact={scrolled} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 whitespace-nowrap xl:gap-8 2xl:gap-10">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `relative eyebrow py-2 text-[11px] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:origin-left after:bg-crimson after:transition-transform after:duration-300 ${
                      isActive
                        ? 'text-crimson after:scale-x-100'
                        : 'text-bone/90 after:scale-x-0 hover:text-bone hover:after:scale-x-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="hidden shrink-0 lg:flex" />

        <button
          type="button"
          className="text-bone lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={28} strokeWidth={1.4} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-x flex items-center justify-between py-4">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} className="text-bone" aria-label="Close menu">
                <X size={28} strokeWidth={1.4} />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center">
              <ul className="space-y-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <NavLink
                      to={link.to}
                      end
                      className={({ isActive }) =>
                        `display text-3xl ${isActive ? 'text-crimson' : 'text-bone'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-x pb-10">
              <SocialLinks include={['youtube', 'instagram', 'facebook', 'x']} size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
