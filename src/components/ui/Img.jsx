import { img, SIZES } from '../../utils/images'

// <Img name="hero-cinema" size="full" alt="" /> – responsive WebP with lazy loading.
export default function Img({ name, size = 'card', alt = '', priority = false, ...rest }) {
  const { src, srcSet } = img(name)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={SIZES[size] || size}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      {...rest}
    />
  )
}
