import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import Img from '../ui/Img'

export default function NewsCard({ item }) {
  return (
    <Link to={`/news#${item.slug}`} className="group block text-center">
      <div className="overflow-hidden border border-line">
        <Img name={item.image} size="(min-width: 640px) 33vw, 92vw" alt="" className="zoom-img aspect-[3/2] w-full object-cover object-[60%_center]" />
      </div>
      <h3 className="mt-6 font-display text-[15px] font-semibold tracking-[0.1em] text-bone uppercase transition-colors group-hover:text-crimson md:text-[16px]">
        {item.title}
      </h3>
      <p className="eyebrow mt-2 text-[10.5px] text-bone/75">{item.subtitle}</p>
      <time dateTime={item.date} className="mt-3 block text-[11px] tracking-wider text-mist">
        {formatDate(item.date)}
      </time>
    </Link>
  )
}
