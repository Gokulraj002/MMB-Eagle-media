import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

// Thin circled chevron with optional label – "VIEW ALL FILMS"
export default function CircleArrow({ to, onClick, label, ariaLabel, className = '' }) {
  const inner = (
    <>
      <span className="flex size-10 items-center justify-center rounded-full border border-bone/70 transition-all duration-300 group-hover:border-crimson group-hover:bg-crimson">
        <ChevronRight size={16} strokeWidth={1.5} />
      </span>
      {label && <span className="eyebrow text-[10.5px] text-bone/90">{label}</span>}
    </>
  )
  const classes = `group inline-flex flex-col items-center gap-3.5 text-bone ${className}`

  if (to) return <Link to={to} className={classes} aria-label={ariaLabel || label}>{inner}</Link>
  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel || label}>
      {inner}
    </button>
  )
}
