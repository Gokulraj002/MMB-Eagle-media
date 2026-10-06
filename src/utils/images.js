// Central image registry. Photos live in client-assets/images/ and are converted to
// WebP by `npm run images` → src/assets/images/web/<name>-800.webp / -1600.webp (+ a ~2048px
// file for large banner sources). Every width found is added to the srcset automatically.
// Use: img('hero-cinema') → { src, srcSet } ready to spread onto an <img>.
const files = import.meta.glob('../assets/images/web/*.webp', { eager: true, import: 'default' })

const registry = {}
for (const [file, url] of Object.entries(files)) {
  const [, name, width] = file.match(/\/([^/]+)-(\d+)\.webp$/)
  ;(registry[name] ||= []).push({ width: Number(width), url })
}
for (const list of Object.values(registry)) list.sort((a, b) => a.width - b.width)

export function img(name) {
  const list = registry[name]
  if (!list) {
    if (import.meta.env.DEV) console.warn(`[images] "${name}" not found – run "npm run images"`)
    return { src: '', srcSet: '' }
  }
  return {
    src: list[list.length - 1].url,
    srcSet: list.map((v) => `${v.url} ${v.width}w`).join(', '),
  }
}

// Common `sizes` hints so the browser downloads the right file.
export const SIZES = {
  full: '100vw',
  half: '(min-width: 1024px) 50vw, 100vw',
  card: '(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 90vw',
  thumb: '(min-width: 1024px) 18vw, (min-width: 640px) 33vw, 70vw',
}
