import React from 'react'

type Props = {
  src?: string | null
  alt?: string
  className?: string
  eager?: boolean
  onErrorSrc?: string
}

function toWebp(src: string) {
  if (!src) return src
  // Only convert common raster extensions to .webp. Do not convert SVG or already webp.
  const lower = src.toLowerCase()
  if (lower.endsWith('.webp')) return src
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) {
    return src.replace(/\.[^/.]+$/, '.webp')
  }
  return src
}

export default function ResponsiveImage({ src, alt = '', className, eager = false, onErrorSrc = '/images/wrs/prod-1.jpg' }: Props) {
  const resolvedSrc = src || onErrorSrc
  const webp = toWebp(resolvedSrc)

  return (
    <picture className={className}>
      <source srcSet={webp} type="image/webp" />
      <img
        src={resolvedSrc}
        alt={alt}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = onErrorSrc }}
      />
    </picture>
  )
}
