import React from 'react'
import Dialog, { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'

export const MiniCart = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const { items, remove, updateQty, subtotal, clear } = useCart()

  return (
    <Dialog open={open} onOpenChange={onOpenChange} forceDark>
      <DialogContent>
        <DialogHeader onClose={() => onOpenChange(false)}>
          <DialogTitle>Carrello</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-sm text-white/70">Il carrello è vuoto.</div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center gap-3">
                <img src={it.img} alt={it.title} className="h-12 w-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-white/70">{it.qty} x €{it.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min={1} value={it.qty} onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value || 1)))} className="w-16 rounded border px-2 py-1 text-black" />
                  <Button variant="ghost" onClick={() => remove(it.id)}>Rimuovi</Button>
                </div>
              </div>
            ))
          )}

          <div className="pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Totale</div>
              <div className="font-bold">€{subtotal.toFixed(2)}</div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button onClick={() => alert('Checkout demo: integrare gateway') } className="bg-red-600">Procedi</Button>
              <Button variant="ghost" onClick={() => clear()}>Svuota</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MiniCart
