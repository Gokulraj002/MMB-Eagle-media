import { site } from '../../data/site'
import { YoutubeIcon, InstagramIcon, FacebookIcon, XIcon } from '../icons/SocialIcons'

const items = [
  { key: 'youtube', label: 'YouTube', Icon: YoutubeIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { key: 'x', label: 'X (Twitter)', Icon: XIcon },
]

export default function SocialLinks({ include = ['youtube', 'instagram', 'facebook'], size = 18, className = '' }) {
  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {items
        .filter((i) => include.includes(i.key) && site.socials[i.key])
        .map(({ key, label, Icon }) => (
          <li key={key}>
            <a
              href={site.socials[key]}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-bone/90 transition-colors hover:text-crimson"
            >
              <Icon width={size} height={size} />
            </a>
          </li>
        ))}
    </ul>
  )
}
