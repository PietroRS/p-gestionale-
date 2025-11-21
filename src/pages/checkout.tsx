import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import ResponsiveImage from '@/components/ui/responsive-image'

export default function CheckoutPage(): React.ReactElement {
  const navigate = useNavigate()
  const { items, updateQty, remove, subtotal, clear } = useCart()

  const handlePlaceOrder = () => {
    // Demo behaviour: clear cart and navigate to home with a simple confirmation
    clear()
    alert('Ordine completato (demo). Grazie!')
    navigate('/')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.length === 0 ? (
            <Card className="p-4">Il carrello è vuoto.</Card>
          ) : (
            items.map((it) => (
              <Card key={it.id} className="p-4 flex items-center gap-4">
                <ResponsiveImage src={it.img} alt={it.title} className="h-20 w-20 object-cover rounded" onErrorSrc="/images/wrs/prod-1.jpg" />
                <div className="flex-1">
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-muted-foreground">€ {it.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min={1} value={it.qty} onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value || 1)))} className="w-20 rounded border px-2 py-1 text-black" />
                  <Button variant="ghost" onClick={() => remove(it.id)}>Rimuovi</Button>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="p-4 border rounded bg-card">
          <div className="mb-4">
            <div className="text-sm text-muted-foreground">Riepilogo</div>
            <div className="text-xl font-bold">€ {subtotal.toFixed(2)}</div>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={handlePlaceOrder} className="bg-red-600">Completa ordine</Button>
            <Button variant="ghost" onClick={() => navigate(-1)}>Continua a comprare</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
