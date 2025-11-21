import React from "react"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, ShoppingBag, Truck, Globe } from 'lucide-react'

// Use the specific local hero image provided by the user
const heroImages = ['/images/wrs/images (2).jpg']

// Use actual image files that exist in public/images/wrs/
const localImages = [
  '/images/wrs/download.jpg',
  '/images/wrs/download (1).jpg',
  '/images/wrs/download (2).jpg',
  '/images/wrs/download (3).jpg',
  '/images/wrs/images (1).jpg',
  '/images/wrs/shopping.webp'
]

// Format number as Euro currency for display
const formatEuro = (value: number) =>
  value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })

const products = new Array(6).fill(null).map((_, i) => {
  const base = Number((Math.random() * 1200 + 80).toFixed(2))
  const hasDiscount = i % 2 === 0
  const discountPct = hasDiscount ? 20 : 0
  const discounted = Number((base * (1 - discountPct / 100)).toFixed(2))
  return {
    id: `prd-${i+1}`,
    title: `Prodotto ${i+1}`,
    subtitle: `Scheda tecnica ${i+1}`,
    basePrice: base,
    hasDiscount,
    discountPct,
    discountedPrice: discounted,
    img: localImages[i % localImages.length]
  }
})

export default function WrsReplicaPage() {
  return (
    <div className="min-h-screen bg-black text-white space-y-8 p-6">
      {/* Header */}
      <header className="flex items-center justify-between bg-black text-white">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">WRS</div>
          <nav className="hidden md:flex items-center gap-4 text-sm text-white/90">
            <a href="#prodotti" className="hover:text-white">Prodotti</a>
            <a href="#servizi" className="hover:text-white">Servizi</a>
            <a href="#assistenza" className="hover:text-white">Assistenza</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#111] rounded-lg p-2">
            <Search className="h-4 w-4 text-white/60" />
            <input className="bg-transparent outline-none text-sm text-white/90" placeholder="Cerca prodotti..." />
          </div>
          <Button variant="ghost" className="hidden md:inline-flex text-white/90">Area Clienti</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          <div className="md:col-span-2 relative">
            <div className="h-64 md:h-[420px] bg-gray-200">
              <img src={heroImages[0]} alt="hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/60" />
              <div className="absolute right-8 top-1/4 text-white max-w-xl text-right">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">WRS con Ferrari Hypersail<br/>nella nuova sfida oceanica</h1>
                <p className="mt-4 text-sm md:text-base text-white/90">Componenti, accessori e supporto tecnico per ogni esigenza. Scopri le novità e le offerte.</p>
                <div className="mt-4 flex items-center justify-end gap-4">
                  <img src="/images/wrs/wrs-logo.svg" alt="WRS" className="h-14 md:h-20 bg-white/10 p-1 rounded" />
                </div>
                <div className="mt-6 flex gap-3 justify-end">
                  <Button className="bg-red-600 text-white">Scopri</Button>
                  <Button variant="ghost" className="bg-white/10 text-white">Contattaci</Button>
                </div>
              </div>
            </div>
          </div>
          <aside className="hidden md:block">
            <div className="space-y-4">
              <Card className="overflow-hidden bg-[#111] text-white">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Spedizioni rapide</div>
                      <div className="text-xs text-muted-foreground">Consegne in 24-72h</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#111] text-white">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Catalogo ricco</div>
                      <div className="text-xs text-muted-foreground">Migliaia di componenti</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#111] text-white">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-medium">Supporto globale</div>
                      <div className="text-xs text-muted-foreground">Rete assistenza capillare</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </section>

      {/* Products grid */}
      <section id="prodotti">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Prodotti in evidenza</h2>
          <div className="text-sm text-muted-foreground">Visualizza tutto</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p, idx) => (
            <Card
              key={p.id}
              className="overflow-hidden bg-transparent border border-neutral-700 rounded-lg hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div className="relative">
                {/* badge */}
                {idx % 2 === 0 && (
                  <div className="absolute left-3 top-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md rotate-0">
                    BLACK FRIDAY
                  </div>
                )}
                <div className="h-52 bg-white rounded-t-lg overflow-hidden border-b border-neutral-800 flex items-center justify-center">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement
                      target.onerror = null
                      target.src = `/images/wrs/download.jpg`
                    }}
                  />
                </div>
              </div>

              <CardContent className="bg-[#0b0b0b] text-white rounded-b-lg">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-base leading-tight">{p.title}</div>
                    <div className="text-xs text-white/70 mt-1">{p.subtitle}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">
                      {p.hasDiscount ? (
                        <div className="text-right">
                          <div className="text-xs text-white/60 line-through">{formatEuro(p.basePrice)}</div>
                          <div className="text-base font-bold">{formatEuro(p.discountedPrice)}</div>
                        </div>
                      ) : (
                        <div className="text-base font-bold">{formatEuro(p.basePrice)}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <Button size="sm" className="bg-red-600 text-white px-4 py-2 rounded-md">Dettagli</Button>
                  <Button variant="ghost" size="sm" className="text-white/80">Aggiungi</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-neutral-800 pt-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-xl font-bold">WRS</div>
            <div className="text-sm text-muted-foreground mt-2">Soluzioni per moto — componenti e assistenza.</div>
          </div>
          <div>
            <h4 className="font-semibold">Contatti</h4>
            <div className="text-sm text-muted-foreground mt-2">Email: info@wrs.it</div>
            <div className="text-sm text-muted-foreground">Telefono: +39 0123 456789</div>
          </div>
          <div>
            <h4 className="font-semibold">Newsletter</h4>
            <div className="mt-2 flex gap-2">
              <input className="flex-1 rounded border p-2 bg-card" placeholder="La tua email" />
              <Button>Iscriviti</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
