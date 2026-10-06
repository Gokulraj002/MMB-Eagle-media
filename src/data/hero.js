// Each slide = one numbered tab under the hero (01 Cinema, 02 Entertainment…).
// `image` is a file name from client-assets/images/ (without extension).
// `position` = object-position on landscape screens (laptops/desktops – the subject sits right of the headline);
// `positionPortrait` = object-position on portrait phones/tablets, where only a narrow slice of the photo shows.
export const heroSlides = [
  {
    id: 'cinema',
    label: 'Cinema',
    image: 'hero-reference-v2',
    position: '62% 30%', // warrior + trident on the right, head kept clear on ultra-wide crops
    positionPortrait: '82% center',
    sideText: ['Real', 'Stories', 'Bigger', 'Emotions'],
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    image: 'hero-entertainment',
    position: '72% 40%', // arched stage + light beams
    positionPortrait: '84% center',
    sideText: ['Grand', 'Stages', 'Live', 'Moments'],
  },
  {
    id: 'events',
    label: 'Events',
    image: 'premium-hero-events-v3',
    position: '66% 35%', // singer centre-stage
    positionPortrait: '75% center',
    sideText: ['Celebrity', 'Events', 'Sports', 'Leagues'],
  },
  {
    id: 'beyond',
    label: 'Beyond Boundaries',
    image: 'premium-hero-beyond-v3',
    position: '70% 45%', // camera crew against the sunset
    positionPortrait: '77% center',
    sideText: ['New', 'Horizons', 'Global', 'Screens'],
  },
]

export const heroCopy = {
  lines: ['Stories.', 'Cinema.'],
  accentLines: ['Beyond', 'Imagination.'],
  sub: ['A production house creating', 'powerful stories for a bigger tomorrow'],
}
