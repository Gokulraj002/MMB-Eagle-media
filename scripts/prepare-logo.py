"""Turns the client's white-background logo into transparent, dark-site-ready PNGs.

  client-assets/logo/trishul-logo-original.jpg
    -> src/assets/logo/trishul-logo.png    full logo used in the header (light "ENTERTAINMENTS")
    -> src/assets/logo/trishul-emblem.png  TE + trident mark only
    -> public/favicon.png, public/apple-touch-icon.png  (from the original)

Run: python3 scripts/prepare-logo.py   (needs Pillow + numpy)
"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

SRC = 'client-assets/logo/trishul-logo-original.jpg'
BONE = np.array([236, 231, 223], np.float32)  # --color-bone
EMBLEM_END, TRISHUL_END = 643, 776  # row bands: emblem | TRISHUL | ENTERTAINMENTS

a = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
H, W, _ = a.shape


def white_to_alpha(px):
    """Remove a white backdrop while keeping the true colour of soft edges."""
    alpha = np.clip((255 - px.min(-1)) / 255.0 * 1.15, 0, 1)
    col = np.clip((px - (1 - alpha[..., None]) * 255) / np.maximum(alpha, 1e-3)[..., None], 0, 255)
    return col, alpha


out = np.zeros((H, W, 4), np.float32)

# Emblem: flood-fill the white background from the edges so the white chalk "E" survives.
E = EMBLEM_END
mask = Image.fromarray(((a[:E].min(-1) > 236) * 255).astype(np.uint8), 'L').copy()
ImageDraw.floodfill(mask, (0, 0), 128)
bg = np.asarray(mask) == 128
fringe = (np.asarray(Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0) & ~bg
col, al = white_to_alpha(a[:E])
out[:E, :, :3] = np.where(fringe[..., None], col, a[:E])
out[:E, :, 3] = np.where(bg, 0, np.where(fringe, al, 1)) * 255

# TRISHUL (gold): plain white-to-alpha.
col, al = white_to_alpha(a[E:TRISHUL_END])
out[E:TRISHUL_END, :, :3], out[E:TRISHUL_END, :, 3] = col, al * 255

# ENTERTAINMENTS (black): recolour to bone so it reads on the dark site.
out[TRISHUL_END:, :, :3] = BONE
out[TRISHUL_END:, :, 3] = np.clip((255 - a[TRISHUL_END:].mean(-1)) / 255 * 1.25, 0, 1) * 255


def trim(im):
    return im.crop(im.getchannel('A').point(lambda v: 255 if v > 10 else 0).getbbox())


full = trim(Image.fromarray(out.clip(0, 255).astype(np.uint8), 'RGBA'))
emblem = trim(Image.fromarray(out[:E].clip(0, 255).astype(np.uint8), 'RGBA'))
full.save('src/assets/logo/trishul-logo.png', optimize=True)
emblem.save('src/assets/logo/trishul-emblem.png', optimize=True)

# Favicons: the original logo exactly as supplied (white background).
original = Image.open(SRC).convert('RGB')
for size, path in [(64, 'public/favicon.png'), (180, 'public/apple-touch-icon.png')]:
    original.resize((size, size), Image.LANCZOS).save(path, optimize=True)

print(f'full {full.size}, emblem {emblem.size}')
