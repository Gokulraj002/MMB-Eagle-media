// Gold outline icons used in the "About Us" feature columns.
const base = {
  width: 40,
  height: 40,
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function CameraIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8.5" r="4" />
      <circle cx="19" cy="8" r="3.2" />
      <rect x="3.5" y="13.5" width="18" height="11" rx="1.5" />
      <path d="M21.5 17.5 28 14.5v9l-6.5-3" />
      <path d="M9 24.5 7 29M16 24.5l2 4.5" />
    </svg>
  )
}

function CalendarIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="6" width="24" height="22" rx="2" />
      <path d="M10 3v6M22 3v6M4 12h24" />
      <path d="m16 15.5 1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.4z" />
    </svg>
  )
}

function PeopleIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="9" r="3.6" />
      <path d="M9.5 22v-1.5a6.5 6.5 0 0 1 13 0V22" />
      <circle cx="7" cy="12" r="2.8" />
      <path d="M2.5 22v-1a4.6 4.6 0 0 1 6.2-4.3" />
      <circle cx="25" cy="12" r="2.8" />
      <path d="M29.5 22v-1a4.6 4.6 0 0 0-6.2-4.3" />
      <path d="M2.5 25.5h27" />
    </svg>
  )
}

export const featureIcons = {
  camera: CameraIcon,
  calendar: CalendarIcon,
  people: PeopleIcon,
}
