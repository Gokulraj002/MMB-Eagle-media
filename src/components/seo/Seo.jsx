import { site } from '../../data/site'
import { img } from '../../utils/images'

const defaultImage = img('hero-reference-v2').src

// React 19 hoists <title>/<meta> into <head> automatically.
export default function Seo({ title, description = site.description, image = defaultImage }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
  const imageUrl = image && site.url ? new URL(image, site.url).href : image
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </>
  )
}
