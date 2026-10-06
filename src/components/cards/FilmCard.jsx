import { Link } from 'react-router-dom'
import Img from '../ui/Img'

export default function FilmCard({ film }) {
  return (
    <Link to={`/films/${film.slug}`} className="group block text-center">
      <div className="relative overflow-hidden border border-line">
        <Img
          name={film.poster}
          size="(min-width: 640px) 33vw, 92vw"
          alt={`${film.title} key art`}
          className="zoom-img aspect-[3/2] w-full object-cover object-[60%_center]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="mt-6">
        {/* Kicker line is reserved from tablet up so titles line up across a row */}
        <p className="eyebrow text-[10.5px] sm:min-h-[1.6em] text-bone/75">{film.kicker}</p>
        <h3 className="mt-1 font-display text-[15px] font-semibold tracking-[0.1em] text-bone uppercase transition-colors group-hover:text-crimson md:text-[13.5px] md:tracking-[0.08em] lg:text-[16px] lg:tracking-[0.1em]">
          {film.title}
        </h3>
        <p className={`mt-2 text-[12.5px] tracking-wide ${film.status === 'Upcoming' ? 'text-gold' : 'text-mist'}`}>
          {film.status}
        </p>
      </div>
    </Link>
  )
}
