import { useEffect, useMemo, useState } from 'react'

export type CartItem = {
  id: string
  title: string
  price: number
  qty: number
  img?: string
}

const STORAGE_KEY = 'wrs_cart'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window === 'undefined') return []
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      return JSON.parse(raw) as CartItem[]
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      // ignore
    }
  }, [items])

  const add = (item: Omit<CartItem, 'qty'>, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id)
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + qty } : p))
      }
      return [...prev, { ...item, qty }]
    })
  }

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id))
  const updateQty = (id: string, qty: number) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)))
  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])

  return { items, add, remove, updateQty, clear, count, subtotal }
}
