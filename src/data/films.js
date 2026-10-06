import gangammaTitle from '../assets/images/gangamma/gangamma-title.png'

// `poster` / `stills` are file names from client-assets/images/ (without extension).
// NOTE: synopses are placeholder copy – replace with client-approved text.
export const films = [
  {
    slug: 'dandupalya-1',
    title: 'Dandupalya 1',
    status: 'Released',
    genre: 'Crime Thriller',
    poster: 'premium-film-crime-v3',
    banner: 'film-dandupalya',
    synopsis:
      'A gripping crime thriller that follows a trail of fear and the relentless investigation to uncover the truth.',
    stills: ['premium-film-crime-v3', 'film-dandupalya'],
  },
  {
    slug: 'krishna-pranaya-sakhi',
    title: 'Krishna Pranaya Sakhi',
    status: 'Released',
    genre: 'Romantic Drama',
    poster: 'premium-film-romance-v3',
    banner: 'film-krishna',
    synopsis:
      'A heartfelt romantic drama about love, family and the choices that bring two hearts together.',
    stills: ['premium-film-romance-v3', 'film-krishna'],
  },
  {
    slug: 'gangamma',
    title: 'Gangamma',
    kicker: 'Production No. 3',
    status: 'Upcoming',
    genre: 'Mythological Action Drama',
    languages: ['Kannada', 'Telugu', 'Tamil', 'Hindi', 'Malayalam'],
    poster: 'premium-film-gangamma-v3',
    // 16:9 key art – the whole warrior + trident fit a full-screen hero (the ultra-wide
    // premium-featured-v3 is kept for the home banner via featuredProject.banner)
    banner: 'gangamma-featured',
    synopsis:
      'A tale of devotion and vengeance, where faith becomes fury. A pan-Indian mythological action drama releasing in five languages.',
    stills: [
      'premium-film-gangamma-v3',
      'gangamma-featured',
      'film-gangamma',
      'news-gangamma',
      'premium-news-gangamma-v3',
      'hero-reference-v2',
    ],
  },
]

// Featured upcoming project shown in the big banner on the home page.
export const featuredProject = {
  slug: 'gangamma',
  kicker: 'Production No. 3',
  title: 'Gangamma',
  titleArt: gangammaTitle, // replace with the official transparent PNG title logo
  tagline: 'Fury of Faith',
  languages: ['Kannada', 'Telugu', 'Tamil', 'Hindi', 'Malayalam'],
  banner: 'premium-featured-v3',
  bannerMobile: 'premium-film-gangamma-v3', // 16:9 crop used on phones, where the ultra-wide banner is too thin
  sections: [
    { label: 'Synopsis', id: 'synopsis' },
    { label: 'Cast & Crew', id: 'cast-crew' },
    { label: 'Posters', id: 'posters' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Updates', id: 'updates' },
  ],
}
