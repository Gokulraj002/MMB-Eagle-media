import { Link } from 'react-router-dom'
import logo from '../../assets/logo/eagle-logo.png'
import { site } from '../../data/site'

// Replace assets/logo/eagle-logo.png with the real logo (transparent PNG/SVG preferred).
// `compact` shrinks the mark once the fixed header turns solid on scroll.
export default function Logo({ className = '', compact = false }) {
  return (
    <Link to="/" className={`block ${className}`} aria-label={`${site.name} – home`}>
      <img
        src={logo}
        alt={site.name}
        className={`w-auto transition-[height] duration-500 ${compact ? 'h-12 md:h-[54px]' : 'h-14 md:h-16'}`}
      />
    </Link>
  )
}
