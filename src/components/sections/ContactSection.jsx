import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../data/site'
import SocialLinks from '../layout/SocialLinks'
import SectionTitle from '../ui/SectionTitle'

// `offset` leaves room for the sunset image on the home page.
export default function ContactSection({ title = 'Contact Us', offset = false }) {
  return (
    <section id="contact" className={`section-y border-t border-line ${offset ? 'xl:border-t-0' : ''}`}>
      <div
        className={`container-x grid items-center gap-12 2xl:gap-16 ${
          // offset: text starts where the 24%-wide photo has faded out; a slimmer map keeps the address lines unbroken
          offset ? 'xl:grid-cols-[1fr_320px] xl:pl-[20%] 2xl:grid-cols-[1fr_380px]' : 'xl:grid-cols-[1fr_380px] 2xl:grid-cols-[1fr_440px]'
        }`}
      >
        <div>
          <SectionTitle>{title}</SectionTitle>

          <div className="mt-10 grid gap-9 sm:grid-cols-[auto_1fr] sm:gap-0">
            <address className="flex gap-4 not-italic sm:border-r sm:border-line sm:pr-10">
              <MapPin size={18} className="mt-1 shrink-0 text-bone" strokeWidth={1.6} />
              <div className="text-[14px] leading-[1.8] text-bone/85">
                <p className="font-semibold text-bone">{site.name}</p>
                <p>{site.address.line1}</p>
                <p>{site.address.line2}</p>
              </div>
            </address>

            <div className="space-y-4 sm:pl-10">
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-[14px] text-bone/90 hover:text-crimson">
                <Phone size={16} strokeWidth={1.6} /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 text-[14px] break-all text-bone/90 sm:break-normal sm:whitespace-nowrap hover:text-crimson">
                <Mail size={16} strokeWidth={1.6} /> {site.email}
              </a>
              <SocialLinks include={['youtube', 'instagram', 'facebook', 'x']} size={20} className="pt-4" />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative h-64 overflow-hidden border border-line md:h-72 xl:h-[280px]">
          <iframe
            src={site.mapEmbed}
            title={`${site.name} location`}
            className="size-full grayscale-[35%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={site.mapDirections}
            target="_blank"
            rel="noreferrer"
            className="absolute top-4 right-4 rounded-full bg-ink/90 px-5 py-2.5 eyebrow text-[10px] text-bone shadow-lg transition-colors hover:bg-crimson"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  )
}
