import React, { useCallback, useState, useEffect, useRef } from 'react'
import { uploadFile } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Upload, X, FileText } from 'lucide-react'

type UploadItem = {
  file: File
  previewUrl?: string
  progress: number
  status: 'ready' | 'uploading' | 'done' | 'error'
  error?: string
}

export function FileUploader() {
  const [items, setItems] = useState<UploadItem[]>([])
  const [dragOver, setDragOver] = useState(false)

  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  const allowedMimePrefixes = [
    'image/',
    'application/pdf',
    'text/html',
    'text/plain'
  ]

  const validateFile = (f: File): string | null => {
    if (f.size > MAX_SIZE) return 'File troppo grande (max 10MB)'
    const ok = allowedMimePrefixes.some(pref => f.type.startsWith(pref))
    if (!ok) return 'Tipo file non supportato'
    return null
  }

  const onFiles = useCallback((files: FileList | null) => {
    if (!files) return
    const newItems: UploadItem[] = Array.from(files).map((f) => {
      const err = validateFile(f)
      return ({
        file: f,
        previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
        progress: 0,
        status: err ? 'error' : 'ready',
        error: err || undefined
      })
    })
    setItems((prev) => [...newItems, ...prev])
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    onFiles(e.dataTransfer.files)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiles(e.target.files)
    e.currentTarget.value = ''
  }

  const startUpload = (index: number) => {
    setItems((prev) => prev.map((it, i) => i === index ? { ...it, status: it.error ? 'error' : 'uploading', progress: it.error ? 0 : 0 } : it))
    const it = items[index]
    if (!it || it.status === 'error') return
    // use API client (will simulate if no backend)
    uploadFile(it.file, (pct) => {
      setItems((prev) => {
        const copy = [...prev]
        if (!copy[index]) return prev
        copy[index] = { ...copy[index], progress: pct }
        return copy
      })
    }).then(() => {
      setItems((prev) => {
        const copy = [...prev]
        if (!copy[index]) return prev
        copy[index] = { ...copy[index], status: 'done', progress: 100 }
        return copy
      })
      setToast('File caricati con successo')
    }).catch((err) => {
      setItems((prev) => {
        const copy = [...prev]
        if (!copy[index]) return prev
        copy[index] = { ...copy[index], status: 'error', error: String(err) }
        return copy
      })
      setToast('Errore durante il caricamento')
    })
  }

  const startAll = () => {
    items.forEach((_, i) => startUpload(i))
  }

  const removeItem = (index: number) => {
    setItems((prev) => {
      const copy = [...prev]
      const it = copy.splice(index, 1)[0]
      if (it?.previewUrl) URL.revokeObjectURL(it.previewUrl)
      return copy
    })
  }

  // PDF preview modal
  const [modalUrl, setModalUrl] = useState<string | null>(null)
  const openPreview = (it: UploadItem) => {
    if (it.file.type === 'application/pdf') {
      const url = URL.createObjectURL(it.file)
      setModalUrl(url)
    } else if (it.previewUrl) {
      setModalUrl(it.previewUrl)
    }
  }
  const closePreview = () => {
    if (modalUrl && modalUrl.startsWith('blob:')) URL.revokeObjectURL(modalUrl)
    setModalUrl(null)
  }

  // toast for completed uploads
  const [toast, setToast] = useState<string | null>(null)
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  // Note: persistence is handled by `uploadFile` mock when no backend is configured.

  // cleanup object URLs on unmount
  const createdUrlsRef = useRef<string[]>([])
  useEffect(() => {
    // track created preview urls
    items.forEach(it => {
      if (it.previewUrl && !createdUrlsRef.current.includes(it.previewUrl)) createdUrlsRef.current.push(it.previewUrl)
    })
    return () => {
      createdUrlsRef.current.forEach(u => { try { URL.revokeObjectURL(u) } catch(e){} })
    }
  }, [items])

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        className={`rounded-lg border-2 p-6 mb-4 transition-colors ${dragOver ? 'border-dashed border-cyan-400 bg-muted/40' : 'border-dashed border-transparent bg-muted/10'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold">Trascina qui i file o seleziona per caricare</div>
              <div className="text-sm text-muted-foreground">PDF, immagini e HTML. Max 10MB per file.</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input id="__file_input" type="file" multiple onChange={handleSelect} className="hidden" />
            <label htmlFor="__file_input">
              <Button variant="outline" size="sm">Seleziona</Button>
            </label>
            <Button size="sm" onClick={startAll}>Avvia Tutti</Button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="mt-4 space-y-2">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded bg-card border">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-muted rounded overflow-hidden">
                  {it.previewUrl ? (
                    <img src={it.previewUrl} alt={it.file.name} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm truncate">
                      <button className="underline" onClick={() => openPreview(it)}>{it.file.name}</button>
                    </div>
                    <div className="text-xs text-muted-foreground">{(it.file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                  {it.error && (
                    <div className="text-xs text-red-400 mt-1">{it.error}</div>
                  )}
                  <div className="mt-2 h-2 bg-muted/30 rounded overflow-hidden">
                    <div style={{ width: `${it.progress}%` }} className={`h-2 bg-green-500 transition-all`}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {it.status !== 'uploading' && it.status !== 'done' && (
                    <Button size="sm" variant="ghost" onClick={() => startUpload(idx)} disabled={!!it.error}>Carica</Button>
                  )}
                  <Button size="icon" variant="ghost" onClick={() => removeItem(idx)} title="Rimuovi">
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Preview modal */}
      {modalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closePreview} />
          <div role="dialog" aria-modal="true" className="relative w-[90%] h-[90%] bg-card rounded shadow-xl overflow-hidden">
            <button aria-label="Chiudi anteprima" className="absolute right-3 top-3 z-10 p-2 rounded bg-muted/40" onClick={closePreview}>Close</button>
            {modalUrl.endsWith('.pdf') || modalUrl.startsWith('blob:') ? (
              <iframe src={modalUrl} className="w-full h-full" title="Anteprima PDF" />
            ) : (
              <img src={modalUrl} alt="preview" className="w-full h-full object-contain bg-black" />
            )}
          </div>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div className="fixed right-4 bottom-4 z-60 bg-green-600 text-white px-4 py-2 rounded shadow-lg">{toast}</div>
      )}
    </div>
  )
}

export default FileUploader

// Simple modal render outside main uploader element
export function FilePreviewModal({ url, onClose }: { url: string | null, onClose: () => void }) {
  if (!url) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[90%] h-[90%] bg-card rounded shadow-xl overflow-hidden">
        <button className="absolute right-3 top-3 z-10 p-2 rounded bg-muted/40" onClick={onClose}>Close</button>
        {url.endsWith('.pdf') || url.startsWith('blob:') ? (
          <iframe src={url} className="w-full h-full" />
        ) : (
          <img src={url} alt="preview" className="w-full h-full object-contain bg-black" />
        )}
      </div>
    </div>
  )
}
