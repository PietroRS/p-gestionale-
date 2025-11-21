import { useEffect, useRef, useState } from 'react'

type Slide = {
  id?: string
  image: string
  /** optional webp source URL for higher quality / smaller size */
  webp?: string
  /** optional srcSet for the img fallback (e.g. 'image@2x.jpg 2x, image-1920w.jpg 1920w') */
  srcSet?: string
  /** optional webp srcSet for the webp <source> */
  webpSrcSet?: string
  title?: string
  subtitle?: string
  ctaText?: string
}

type Props = {
  slides: Slide[]
  interval?: number
  className?: string
}

export default function Carousel({ slides, interval = 5000, className = '' }: Props) {
  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)
  const paused = useRef(false)
  const slidesCount = slides.length
  const prevPreload = useRef<HTMLLinkElement | null>(null)

  const start = () => {
    if (timer.current || slidesCount <= 1) return
    timer.current = window.setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % slidesCount)
    }, interval)
  }

  const stop = () => {
    if (timer.current) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }

  useEffect(() => {
    start()
    return () => stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesCount, interval])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Preload the active slide image (and prefer webp if available) to improve perceived quality
  useEffect(() => {
    if (!slides || slides.length === 0) return
    const s = slides[index]
    const href = (s.webpSrcSet && typeof s.webpSrcSet === 'string')
      ? // if webpSrcSet contains multiple entries, take first URL before space
        String(s.webpSrcSet).split(',')[0].trim().split(' ')[0]
      : (s.webp || s.image)

    if (!href) return

    try {
      // remove previous preload if exists
      if (prevPreload.current) {
        document.head.removeChild(prevPreload.current)
        prevPreload.current = null
      }

      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = href
      ;(link as any).fetchPriority = 'high'
      document.head.appendChild(link)
      prevPreload.current = link
    } catch (e) {
      // ignore
    }

    return () => {
      if (prevPreload.current) {
        try { document.head.removeChild(prevPreload.current) } catch { }
        prevPreload.current = null
      }
    }
  }, [index, slides])

  const prev = () => {
    setIndex((i) => (i - 1 + slidesCount) % slidesCount)
  }
  const next = () => {
    setIndex((i) => (i + 1) % slidesCount)
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      <div className="w-full h-full relative">
        {slides.map((s, i) => (
          <div
            key={s.id || i}
            role="group"
            aria-roledescription="slide"
            aria-hidden={index !== i}
            className={`absolute inset-0 transition-opacity duration-700 ${index === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="w-full h-full relative overflow-hidden" style={{ minHeight: 240 }}>
              <picture>
                {s.webpSrcSet ? (
                  <source srcSet={s.webpSrcSet} type="image/webp" />
                ) : s.webp ? (
                  <source srcSet={s.webp} type="image/webp" />
                ) : null}

                <img
                  src={s.image}
                  srcSet={s.srcSet}
                  sizes="100vw"
                  alt={s.title || s.subtitle || `slide-${i + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-700 ${index === i ? 'scale-105' : 'scale-100'}`}
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = '/images/wrs/hero.jpg'; }}
                  loading={index === i ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === i ? 'high' : 'low'}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
            </div>

            {(s.title || s.subtitle || s.ctaText) && (
              <div className="absolute inset-0 flex items-center">
                <div className={`max-w-3xl ml-auto mr-6 pr-6 text-right text-white transition-transform duration-500 ${index === i ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                  {s.title && <h2 className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow">{s.title}</h2>}
                  {s.subtitle && <p className="mt-2 text-sm md:text-base text-white/90">{s.subtitle}</p>}
                  {s.ctaText && <div className="mt-4"><button className="bg-red-600 text-white px-4 py-2 rounded shadow-md hover:brightness-105">{s.ctaText}</button></div>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* controls */}
      <button aria-label="Prev" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 shadow-lg">
        <span className="text-2xl leading-none">‹</span>
      </button>
      <button aria-label="Next" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 shadow-lg">
        <span className="text-2xl leading-none">›</span>
      </button>

      {/* dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} aria-label={`Vai alla slide ${i + 1}`} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${index === i ? 'bg-red-600 shadow' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}
