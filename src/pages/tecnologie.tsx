import React, { useMemo, useState, useEffect, useRef } from 'react'
import type { Tecnologia } from '@/types/tecnologia'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TechCard from '@/components/tech-card'
import tecnologieData from '@/data/tecnologie.data'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function TecnologiePage(): React.ReactElement {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string | null>(null)
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewItem, setPreviewItem] = useState<Tecnologia | null>(null)
  const [openCompare, setOpenCompare] = useState(false)

  // FOR DEV: force using source data to ensure updated images appear.
  // This bypasses LocalStorage so the UI shows the current `tecnologie.data` content.
  const [itemsState, setItemsState] = useState<Tecnologia[]>(tecnologieData as Tecnologia[])

  // One-time auto-reset: if we haven't done it yet on this browser, clear
  // any stored `tecnologieItems` and force in-memory data to the source.
  useEffect(() => {
    try {
      if (!localStorage.getItem('tec_auto_reset_done')) {
        localStorage.removeItem('tecnologieItems')
        localStorage.setItem('tec_auto_reset_done', '1')
        setItemsState(tecnologieData)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // Quick reset helper: if the page is loaded with ?resetData=1, clear stored items
  // and reload the in-memory data so updated `datasheetUrl` and `immagini` are visible.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      if (params.get('resetData') === '1') {
        localStorage.removeItem('tecnologieItems')
        setItemsState(tecnologieData)
        // remove query param from URL without reloading
        params.delete('resetData')
        const base = window.location.pathname + (params.toString() ? `?${params.toString()}` : '')
        window.history.replaceState({}, '', base)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // If user has an older `tecnologieItems` in localStorage (from previous runs),
  // merge it with current `tecnologieData` so new fields (e.g. datasheetUrl/immagini)
  // added in source are picked up without forcing the user to clear localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem('tecnologieItems')
      if (!raw) return
      const stored = JSON.parse(raw) as Tecnologia[]
      if (!Array.isArray(stored)) return
      const lookup: Record<string, Tecnologia> = {}
      ;(tecnologieData as Tecnologia[]).forEach((t: Tecnologia) => { lookup[t.id] = t })
      let changed = false
      const merged = stored.map((s: Tecnologia) => {
        const base = lookup[s.id]
        if (!base) return s
        // bring missing fields from base into stored item
        const mergedItem: Tecnologia = { ...base, ...s }
        if (!s.datasheetUrl && base.datasheetUrl) changed = true
        if ((!s.immagini || s.immagini.length === 0) && (base.immagini && base.immagini.length)) changed = true
        return mergedItem
      })
      if (changed) {
        setItemsState(merged)
        try { localStorage.setItem('tecnologieItems', JSON.stringify(merged)) } catch {}
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const csvInputRef = useRef<HTMLInputElement | null>(null)

  // Disabled persistence during debugging to avoid stale LocalStorage overriding source data.
  // useEffect(() => {
  //   try { localStorage.setItem('tecnologieItems', JSON.stringify(itemsState)) } catch {}
  // }, [itemsState])

  const allTags = useMemo(() => {
    const s = new Set<string>()
    itemsState.forEach((t: Tecnologia) => (t.tag || []).forEach((tg: string) => s.add(tg)))
    return Array.from(s)
  }, [itemsState])

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    return itemsState.filter((i: Tecnologia) => {
      if (selectedTags && !((i.tag || []) as string[]).includes(selectedTags)) return false
      if (!q) return true
      return [i.nome, i.categoria, (i.tag || []).join(' '), i.descrizione].join(' ').toLowerCase().includes(q)
    })
  }, [query, selectedTags, itemsState])

  const toggleCompare = (id: string) => {
    setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : (prev.length < 3 ? [...prev, id] : prev))
  }

  const openPreview = (url?: string, item?: Tecnologia | null) => {
    // Prefer an explicit url passed by the caller (e.g. TechCard),
    // otherwise fall back to authoritative datasheetUrl from source `tecnologieData`.
    try {
      if (item && item.id) {
        const base = (tecnologieData as Tecnologia[]).find((t: Tecnologia) => t.id === item.id)
        const chosenUrl = url || base?.datasheetUrl
        setPreviewUrl(chosenUrl ?? null)
        // merge base + item so we show the latest fields (base provides new images)
        setPreviewItem({ ...(base || {}), ...(item || {}) })
        return
      }
    } catch (e) {
      // fallback to provided url/item
    }
    if (!url) return
    setPreviewUrl(url)
    setPreviewItem(item ?? null)
  }

  const isImageUrl = (u?: string | null) => {
    if (!u) return false
    return /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(u)
  }

  const handleCsvFile = async (file: File) => {
    try {
      const text = await file.text()
      const lines = text.split(/\r?\n/).filter(Boolean)
      if (lines.length === 0) return alert('CSV vuoto')
      const headers = lines[0].split(',').map(h => h.trim())
      const rows = lines.slice(1).map(l => {
        const cols = l.split(',').map(c => c.trim())
        const obj: any = {}
        headers.forEach((h, i) => { obj[h] = cols[i] ?? '' })
        return obj
      })

      const normalized = rows.map((r, idx): Tecnologia => {
        const tags = (r.tag || r.tags || '')
          .toString().split(/;|,|\|/).map((s: string) => s.trim()).filter(Boolean)
        return {
          id: r.id || `CSV-${Date.now()}-${idx}`,
          nome: r.nome || r.name || 'Unnamed',
          categoria: r.categoria || r.category || 'Generico',
          tag: tags,
          descrizione: r.descrizione || r.description || '',
          densita_kg_m3: Number(r.densita_kg_m3 || r.density || 0) || 0,
          resistenza_mpa: Number(r.resistenza_mpa || r.resistance || 0) || 0,
          temp_max_c: Number(r.temp_max_c || r.temp_max || 0) || 0,
          costo_eur: Number(r.costo_eur || r.price || 0) || 0,
          certificazioni: (r.certificazioni || '').toString().split(/;|,|\|/).map((s: string) => s.trim()).filter(Boolean),
          datasheetUrl: r.datasheetUrl || r.datasheet || ''
        }
      })

      setItemsState(prev => {
        const merged = [...normalized, ...prev]
        try { localStorage.setItem('tecnologieItems', JSON.stringify(merged)) } catch {}
        return merged
      })
      alert(`Importati ${normalized.length} elementi dal CSV`)
    } catch (e) {
      console.error(e)
      alert('Errore durante l\'import CSV')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <Card className="border-2">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Tecnologie & Materiali</CardTitle>
            <p className="text-sm text-muted-foreground">Esplora materiali, schede tecniche e confronta proprietà</p>
          </div>
          <div className="flex items-center gap-3">
            <Input placeholder="Cerca tecnologia o tag..." value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-[300px]" />
            <Button onClick={() => { setQuery(''); setSelectedTags(null); setCompareIds([]) }}>Reset</Button>
            <Button variant="outline" onClick={() => {
              try {
                localStorage.removeItem('tecnologieItems')
                setItemsState(tecnologieData as Tecnologia[])
                alert('Dati ricaricati: cache cancellata')
              } catch (e) {
                console.error(e)
                alert('Errore durante il reset dei dati')
              }
            }}>Reset dati</Button>
            <Button onClick={() => setOpenCompare(true)} disabled={compareIds.length < 2}>Confronta ({compareIds.length})</Button>
            <input ref={csvInputRef} id="__csv_input" type="file" accept="text/csv" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleCsvFile(f)
              e.currentTarget.value = ''
            }} />
            <Button onClick={() => csvInputRef.current?.click()}>Importa CSV</Button>
          </div>
        </CardHeader>
      </Card>

      <div className="flex gap-2 items-center">
        <div className="text-sm text-muted-foreground mr-2">Tag:</div>
        {allTags.map(t => (
          <button key={t} onClick={() => setSelectedTags(prev => prev === t ? null : t)} className={`px-3 py-1 rounded ${selectedTags === t ? 'bg-blue-600 text-white' : 'bg-muted/10'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item: Tecnologia) => (
          <TechCard key={item.id} item={item} onCompareToggle={toggleCompare} selected={compareIds.includes(item.id)} onOpen={openPreview} />
        ))}
      </div>

      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setPreviewUrl(null)} />
          <div className="relative w-[90%] h-[90%] bg-card rounded shadow-xl overflow-hidden flex items-center justify-center">
            <button className="absolute right-3 top-3 z-10 p-2 rounded bg-muted/40" onClick={() => setPreviewUrl(null)}>Close</button>
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              {isImageUrl(previewUrl) ? (
                <img src={previewUrl as string} alt="Anteprima scheda tecnica" className="max-w-full max-h-[70%] object-contain mb-4" />
              ) : (
                <iframe src={previewUrl as string} className="w-full h-[70%]" title="Scheda tecnica" />
              )}

              {previewItem ? (
                <div className="w-full max-w-3xl bg-muted/5 dark:bg-muted/10 rounded p-3">
                  <h4 className="text-lg font-semibold mb-2">{previewItem.nome}</h4>
                  <div className="text-sm grid grid-cols-2 gap-2">
                    <div>Densità: <strong>{previewItem.densita_kg_m3} kg/m³</strong></div>
                    <div>Resistenza: <strong>{previewItem.resistenza_mpa} MPa</strong></div>
                    <div>Temp. max: <strong>{previewItem.temp_max_c} °C</strong></div>
                    <div>Costo: <strong>€ {Number(previewItem.costo_eur || 0).toFixed(2)}</strong></div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{previewItem.descrizione}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <Dialog open={openCompare} onOpenChange={setOpenCompare}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confronto materiali</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2">Proprietà</th>
                  {compareIds.map(id => <th key={id} className="p-2">{itemsState.find((t: Tecnologia) => t.id === id)?.nome}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-semibold">Densità (kg/m³)</td>
                  {compareIds.map(id => <td key={id} className="p-2">{itemsState.find((t: Tecnologia) => t.id === id)?.densita_kg_m3}</td>)}
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Resistenza (MPa)</td>
                  {compareIds.map(id => <td key={id} className="p-2">{itemsState.find((t: Tecnologia) => t.id === id)?.resistenza_mpa}</td>)}
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Temp. max (°C)</td>
                  {compareIds.map(id => <td key={id} className="p-2">{itemsState.find((t: Tecnologia) => t.id === id)?.temp_max_c}</td>)}
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Costo (€)</td>
                  {compareIds.map(id => <td key={id} className="p-2">€ {(itemsState.find((t: Tecnologia) => t.id === id)?.costo_eur ?? 0).toFixed(2)}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={() => setOpenCompare(false)}>Chiudi</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
