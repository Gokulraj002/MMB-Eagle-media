import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Red rectangular CTA – "KNOW MORE →", "EXPLORE PROJECT →"
export default function Button({ to, href, children, className = '', arrow = true, ...rest }) {
  const classes = `group inline-flex items-center gap-3 bg-crimson px-6 py-3 eyebrow text-white transition-colors duration-300 hover:bg-crimson-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight size={14} strokeWidth={1.6} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )

  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>
  return <button type="button" className={classes} {...rest}>{content}</button>
}
