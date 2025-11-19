import axios from 'axios'
import { ordiniData } from '@/data/ordini.data'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''
const hasRemote = !!baseURL

const client = axios.create({ baseURL: hasRemote ? baseURL : undefined })

export async function getOrders(params?: Record<string, any>) {
  if (hasRemote) {
    const res = await client.get('/api/orders', { params })
    return res.data
  }
  // frontend-only mock: return local data in the same shape
  return { data: ordiniData, total: ordiniData.length }
}

export function uploadFile(file: File, onProgress?: (pct: number) => void): Promise<any> {
  if (hasRemote) {
    const fd = new FormData()
    fd.append('file', file)
    return client.post('/api/uploads', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (ev: ProgressEvent) => {
        const pct = Math.round((ev.loaded * 100) / (ev.total || file.size))
        onProgress?.(pct)
      }
    }).then(res => res.data)
  }

  // simulate upload on client when no backend configured
  return new Promise((resolve, reject) => {
    let pct = 0
    const interval = setInterval(() => {
      pct = Math.min(100, pct + Math.floor(Math.random() * 20) + 10)
      onProgress?.(pct)
      if (pct >= 100) {
        clearInterval(interval)
        const meta = { name: file.name, size: file.size, type: file.type, date: new Date().toISOString() }
        try {
          const stored = JSON.parse(localStorage.getItem('uploadedFiles') || '[]')
          if (!stored.some((s: any) => s.name === meta.name && s.size === meta.size)) {
            stored.unshift(meta)
            localStorage.setItem('uploadedFiles', JSON.stringify(stored.slice(0, 50)))
          }
        } catch (e) {
          // ignore
        }
        resolve(meta)
      }
    }, 300)
  })
}

export default { getOrders, uploadFile }
