import React, { useEffect, useRef, useState } from 'react'
import type { Tecnologia } from '@/types/tecnologia'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type TechCardProps = {
  item: Tecnologia
  onCompareToggle: (id: string) => void
  selected: boolean
  onOpen: (url?: string, item?: Tecnologia) => void
}

export const TechCard = ({ item, onCompareToggle, selected, onOpen }: TechCardProps) => {
  const [showPreview, setShowPreview] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return
      if (!(e.target instanceof Node)) return
      if (!rootRef.current.contains(e.target)) setShowPreview(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <Card ref={rootRef} className="relative hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{item.nome}</CardTitle>
            <div className="text-xs text-muted-foreground">{item.categoria}</div>
          </div>
          <div className="flex items-center gap-2">
            {item.certificazioni.map((c) => (
              <Badge key={c} className="text-xs">{c}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* If datasheetUrl points to an image, show a small thumbnail */}
        {item.datasheetUrl && /\.(jpe?g|png|gif|webp|svg)$/i.test(item.datasheetUrl) ? (
          <div className="mb-3">
            <img
              src={item.datasheetUrl}
              alt={`${item.nome} - anteprima`}
              className="w-full h-32 object-contain rounded bg-muted/5 cursor-pointer"
              onClick={() => setShowPreview(true)}
            />
          </div>
        ) : null}

        <p className="text-sm text-muted-foreground mb-3">{item.descrizione}</p>

        <div className="flex items-center gap-3 mb-3">
          <div className="text-xs">Densità: <strong>{item.densita_kg_m3} kg/m³</strong></div>
          <div className="text-xs">Resistenza: <strong>{item.resistenza_mpa} MPa</strong></div>
          <div className="text-xs">Temp. max: <strong>{item.temp_max_c}°C</strong></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => onOpen(item.datasheetUrl, item)}>
              Scheda tecnica
            </Button>
            <Button size="sm" variant={selected ? 'default' : 'ghost'} onClick={() => onCompareToggle(item.id)}>
              {selected ? 'Selezionato' : 'Confronta'}
            </Button>
          </div>
          <div className="text-sm font-semibold">€ {item.costo_eur.toFixed(2)}</div>
        </div>
      </CardContent>

      {/* Inline small preview popup (anchored to the card) */}
      {showPreview && item.datasheetUrl ? (
        <div className="absolute right-4 top-4 z-50 w-80 bg-white dark:bg-slate-900 border rounded shadow-lg p-3">
          <div className="flex justify-between items-start gap-2">
            <strong className="text-sm">Anteprima</strong>
            <button className="text-xs text-muted-foreground" onClick={() => setShowPreview(false)}>Chiudi</button>
          </div>
          <div className="mt-2">
            {/\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(item.datasheetUrl) ? (
              <img src={item.datasheetUrl} alt={`${item.nome} anteprima`} className="w-full h-36 object-contain rounded bg-muted/5" />
            ) : (
              <div className="w-full h-36 flex items-center justify-center text-xs text-muted-foreground">Preview non disponibile (Apri per visualizzare)</div>
            )}
          </div>
          <div className="mt-2 text-sm grid grid-cols-2 gap-2">
            <div>Densità: <strong>{item.densita_kg_m3} kg/m³</strong></div>
            <div>Resistenza: <strong>{item.resistenza_mpa} MPa</strong></div>
            <div>Temp. max: <strong>{item.temp_max_c}°C</strong></div>
            <div>€ {item.costo_eur.toFixed(2)}</div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => { setShowPreview(false); onOpen(item.datasheetUrl, item) }}>Apri</Button>
          </div>
        </div>
      ) : null}
    </Card>
  )
}

TechCard.displayName = "TechCard"

export default TechCard
