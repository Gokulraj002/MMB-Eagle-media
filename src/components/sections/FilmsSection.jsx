import { films } from '../../data/films'
import FilmCard from '../cards/FilmCard'
import CircleArrow from '../ui/CircleArrow'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

export default function FilmsSection() {
  return (
    <section id="films" className="section-y border-b border-line bg-ink">
      <div className="container-x">
        {/* Title row – "view all" sits on the right from tablet up */}
        <div className="flex items-end justify-between gap-8">
          <SectionTitle>Our Films</SectionTitle>
          <div className="hidden sm:block">
            <CircleArrow to="/films" label="View All Films" className="sm:flex-row-reverse sm:gap-4" />
          </div>
        </div>

        <ul className="mt-10 grid gap-12 sm:grid-cols-3 sm:gap-6 md:mt-14 lg:gap-10 xl:gap-12">
          {films.map((film, i) => (
            <Reveal as="li" key={film.slug} delay={0.1 * i}>
              <FilmCard film={film} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex justify-center sm:hidden">
          <CircleArrow to="/films" label="View All Films" />
        </div>
      </div>
    </section>
  )
}
