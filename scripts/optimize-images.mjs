// Converts every JPG/PNG photo in client-assets/images/ into web-ready WebP files.
//   client-assets/images/hero-cinema.jpg  →  src/assets/images/web/hero-cinema-800.webp
//                                           src/assets/images/web/hero-cinema-1600.webp
//                                           src/assets/images/web/hero-cinema-2048.webp  (large sources only)
// The large variant keeps full-screen banners sharp on 1440–1536px laptops; it is named by its real
// width (capped at 2400) so the srcset descriptors stay accurate.
// Run after adding or replacing photos:  npm run images
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'client-assets/images'
const OUT = 'src/assets/images/web'
const WIDTHS = [800, 1600, 2400]
const QUALITY = 78

await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f))
// Prefer the .jpg when both a .png master and a .jpg exist for the same name.
const byName = new Map()
for (const f of files) {
  const name = f.replace(/\.(jpe?g|png)$/i, '')
  if (!byName.has(name) || /\.jpe?g$/i.test(f)) byName.set(name, f)
}

let made = 0
for (const [name, file] of byName) {
  const input = path.join(SRC, file)
  const { width } = await sharp(input).metadata()
  const srcTime = (await stat(input)).mtimeMs
  for (const [i, w] of WIDTHS.entries()) {
    const real = Math.min(w, width)
    // Base sizes are always written; larger ones only when the source is clearly bigger
    // (a 1672px file next to the 1600 one would add weight without adding sharpness).
    if (i >= 2 && real < WIDTHS[i - 1] * 1.15) continue
    const label = i >= 2 ? real : w
    const out = path.join(OUT, `${name}-${label}.webp`)
    // Skip files that are already up to date.
    const outTime = await stat(out).then((o) => o.mtimeMs, () => 0)
    if (outTime >= srcTime) continue
    await sharp(input)
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out)
    made++
  }
}
console.log(`✓ ${byName.size} images checked, ${made} WebP files written to ${OUT}`)
