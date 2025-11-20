import { useRef, useState, useEffect } from 'react'
import type { Tecnologia } from '@/types/tecnologia'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type TechCardProps = {
  item: Tecnologia
  onCompareToggle: (id: string) => void
  selected: boolean
  onOpen?: (url?: string, item?: Tecnologia) => void
}

export const TechCard = ({ item, onCompareToggle, selected }: TechCardProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [showLocalModal, setShowLocalModal] = useState(false)

  useEffect(() => {
    // lock body scroll when modal is open
    if (showLocalModal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => { document.body.classList.remove('overflow-hidden') }
  }, [showLocalModal])

  // detect dark mode (respect .dark class and prefers-color-scheme)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return document.documentElement.classList.contains('dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setIsDarkMode(document.documentElement.classList.contains('dark') || mq.matches)
    handler()
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else if ((mq as any).addListener) (mq as any).addListener(handler)

    // observe html class changes (in case theme is toggled by adding/removing .dark)
    const obs = new MutationObserver(handler)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else if ((mq as any).removeListener) (mq as any).removeListener(handler)
      obs.disconnect()
    }
  }, [])

  const isImageUrlLocal = (u?: string | null) => {
    if (!u) return false
    return /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(u)
  }

  // openPopup removed: converted to in-page modal per user request

  

  return (
    <>
    <Card ref={rootRef} className="relative bg-card rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transform transition-all duration-150 dark:text-black">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{item.nome}</CardTitle>
            <div className="text-xs text-muted-foreground">{item.categoria}</div>
          </div>
          <div className="flex items-center gap-2">
            {item.certificazioni.map((c) => (
              <span key={c} className="text-xs px-2 py-0.5 rounded bg-muted/10 text-muted-foreground">{c}</span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Image inside the card (opaque container) */}
        {(() => {
          const previewSrc = item.datasheetUrl || item.immagini?.[0]
          if (previewSrc && isImageUrlLocal(previewSrc)) {
            return (
              <div className="mb-3">
                <div className="w-full h-44 flex items-center justify-center bg-white/10 dark:bg-slate-900 p-3 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
                  <img
                    src={encodeURI(previewSrc)}
                    alt={`${item.nome} - anteprima`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            )
          }
          return null
        })()}

        {/* Readable description box under the image */}
        <div className="mb-3 bg-white/10 dark:bg-slate-900 p-4 rounded-md border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-foreground leading-relaxed">{item.descrizione}</p>
        </div>

        <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
          <div className="px-2 py-1 rounded bg-muted/10"><span className="block text-xxs">Densità</span><strong className="block text-foreground">{item.densita_kg_m3} kg/m³</strong></div>
          <div className="px-2 py-1 rounded bg-muted/10"><span className="block text-xxs">Resistenza</span><strong className="block text-foreground">{item.resistenza_mpa} MPa</strong></div>
          <div className="px-2 py-1 rounded bg-muted/10"><span className="block text-xxs">Temp. max</span><strong className="block text-foreground">{item.temp_max_c}°C</strong></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowLocalModal(true)}>
              Scheda tecnica
            </Button>
            <Button size="sm" variant={selected ? 'default' : 'ghost'} className="border" onClick={() => onCompareToggle(item.id)}>
              {selected ? 'Selezionato' : 'Confronta'}
            </Button>
          </div>
          <div className="text-sm font-semibold text-foreground">€ {item.costo_eur.toFixed(2)}</div>
        </div>
      </CardContent>

      {/* Modal is handled globally by the page; TechCard triggers open via onOpen prop */}
    </Card>
      {showLocalModal && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center" tabIndex={-1} role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowLocalModal(false)} />
          <div className="modal-dialog relative w-full max-w-3xl px-4">
              <div className={`modal-content rounded-lg shadow-xl overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`modal-header flex items-start justify-between p-4 ${isDarkMode ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                  <h5 className="modal-title text-lg font-semibold">{item.nome}</h5>
                  <button type="button" aria-label="Close" className="text-2xl leading-none text-white bg-red-600 rounded px-2 py-1 hover:bg-red-700" onClick={() => setShowLocalModal(false)}>×</button>
                </div>
                <div className="modal-body p-4">
                  <p className={`mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>{item.descrizione}</p>
                  {item.datasheetUrl || item.immagini?.[0] ? (
                    <div className="w-full flex items-center justify-center">
                      <img src={encodeURI(item.datasheetUrl || item.immagini?.[0] || '')} alt={item.nome} className={`max-w-full max-h-[60vh] object-contain border ${isDarkMode ? 'border-white/20' : 'border-gray-200'}`} />
                    </div>
                  ) : null}
                </div>
                <div className={`modal-footer flex items-center justify-end gap-2 p-4 ${isDarkMode ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>
                  <button type="button" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => setShowLocalModal(false)}>Close</button>
                  <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save changes</button>
                </div>
              </div>
            </div>
        </div>
      )}
    </>
  )
}

TechCard.displayName = "TechCard"

export default TechCard
