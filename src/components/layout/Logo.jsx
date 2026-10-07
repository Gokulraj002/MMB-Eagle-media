import { Link } from 'react-router-dom'
import logo from '../../assets/logo/trishul-logo.png'
import { site } from '../../data/site'

// The client's Trishul Entertainments logo with its white background removed
// (made by scripts/prepare-logo.py). `compact` shrinks it once the header turns solid on scroll.
export default function Logo({ className = '', compact = false }) {
  return (
    <Link to="/" className={`block ${className}`} aria-label={`${site.name} – home`}>
      <img
        src={logo}
        alt={site.name}
        className={`w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] transition-[height] duration-500 ${compact ? 'h-14 md:h-16' : 'h-[72px] md:h-[88px]'}`}
      />
    </Link>
  )
}
