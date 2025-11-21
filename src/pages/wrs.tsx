import React from "react"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, ShoppingBag, Star, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Carousel from '@/components/ui/carousel'
import { useCart } from '@/hooks/useCart'
import MiniCart from '@/components/mini-cart'

// Normalized image names for products and logo
const localImages = [
  '/images/wrs/prod-1.jpg',
  '/images/wrs/prod-2.jpg',
  '/images/wrs/prod-3.jpg',
  '/images/wrs/prod-4.jpg',
  '/images/wrs/prod-5.jpg',
  '/images/wrs/prod-6.webp'
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

// Carousel slides for the hero
const heroSlides = [
  {
    id: 'h1',
    image: '/images/wrs/hero.jpg',
    title: 'WRS — Passione e tecnologia',
    subtitle: 'Componenti, accessori e supporto tecnico per ogni esigenza. Scopri le novità e le offerte.',
    ctaText: 'Scopri'
  },
  {
    id: 'h2',
    image: '/images/wrs/prod-1.jpg',
    title: 'Performance e stile',
    subtitle: 'Scarichi e componenti per chi cerca il massimo.',
    ctaText: 'Vedi prodotti'
  },
  {
    id: 'h3',
    image: '/images/wrs/prod-2.jpg',
    title: 'Sicurezza e qualità',
    subtitle: 'Freni e componenti testati per la tua sicurezza.',
    ctaText: 'Acquista ora'
  }
]

export default function WrsReplicaPage() {
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Promo strip */}
      <div className="w-full bg-red-700 text-sm text-white py-2 text-center">Spedizione gratuita in Italia sopra i 200€ — Scopri le offerte del momento</div>

      {/* Header - WRS style (match reference) */}
      <header className="sticky top-0 z-40 bg-black">
        {/* top compact bar: right aligned small items */}
        <div className="w-full bg-black text-white/70 text-xs">
          <div className="max-w-7xl mx-auto px-6 flex justify-end items-center py-1">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Italiano ▾</span>
              <span className="hidden sm:inline">EUR € ▾</span>
              <a href="#" className="hidden sm:inline hover:text-white">Lista dei desideri (0)</a>
            </div>
          </div>
        </div>

        {/* main header row */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-12 items-center gap-4">
            {/* logo left */}
            <div className="col-span-2 flex items-center">
              <a href="/wrs" className="flex items-center">
                <img src="/images/wrs/logo.png" alt="WRS" className="h-14 w-auto" />
              </a>
            </div>

            {/* centered search */}
            <div className="col-span-8">
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <input aria-label="Cerca nel catalogo" className="w-full rounded-none border-2 border-red-600 bg-neutral-900 text-white px-4 py-3 placeholder:text-white/60" placeholder="Cerca nel nostro catalogo" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 px-3 py-2 text-white rounded">🔍</button>
                </div>
              </div>
            </div>

            {/* right partners / trustpilot / account */}
            <div className="col-span-2 flex items-center justify-end gap-4">
              <div className="hidden lg:flex items-center gap-3">
                <img src="/images/wrs/prod-1.jpg" alt="partner1" className="h-8 object-contain" />
                <img src="/images/wrs/prod-2.jpg" alt="partner2" className="h-8 object-contain" />
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <div className="text-green-400 font-bold">4.9</div>
                  <div className="hidden lg:inline">Trustpilot</div>
                </div>
                <a href="#" className="text-white/80 hover:text-white flex items-center gap-2"><User className="h-4 w-4"/> <span className="text-sm">PIETRO ANTONIO</span></a>
                <button onClick={() => setCartOpen(true)} className="relative text-white/80 hover:text-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5"/>
                  <span className="absolute -top-2 -right-2 bg-red-600 text-xs font-bold px-2 rounded-full">{cart.count}</span>
                </button>
              </div>
            </div>
          </div>

          {/* thin red full-width line */}
          <div className="w-full">
            <div className="h-1 bg-red-600" />
          </div>
        </div>

        {/* categories nav (second row) with dropdown for Accessori moto */}
        <div className="bg-neutral-900">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-4 overflow-auto py-2 text-sm text-white/90">
              {['Accessori moto','Accessori Scooter','Abbigliamento','Prodotti WRS','Marchi trattati','Novità','Offerte'].map((c) => (
                <a key={c} href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-800 rounded">
                  <span className="text-red-600">🏁</span>
                  <span className="font-medium">{c}</span>
                  <ChevronDown className="h-3 w-3 text-white/70" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Category chips (racing style) */}
      <div className="px-6 mt-4">
        <div className="flex gap-3 overflow-auto py-2">
          {['Scarichi', 'Freni', 'Elettronica', 'Cupolini', 'Abbigliamento', 'Akrapovic', 'Brembo', 'Novità'].map((c) => (
            <button key={c} className="flex-shrink-0 px-4 py-2 bg-neutral-800 text-white/90 rounded-full text-sm font-semibold border border-neutral-700 hover:bg-red-600 hover:text-white transition">
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Hero carousel */}
      <section className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 rounded-lg overflow-hidden relative h-72 md:h-[420px] shadow-xl border border-neutral-800">
            <Carousel slides={heroSlides} className="h-72 md:h-[420px] rounded-lg" />
          </div>
          {/* aside removed as requested (spedizione rapida, garanzia, supporto) */}
        </div>
      </section>

      {/* Products grid */}
      <section id="prodotti" className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Prodotti in evidenza</h2>
          <div className="text-sm text-white/70">Visualizza tutto ▸</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <Card
              key={p.id}
              className="group relative overflow-hidden bg-neutral-800 border border-neutral-700 rounded-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <div className="relative">
                {/* badge */}
                {p.hasDiscount && (
                  <div className="absolute left-3 top-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                    -{p.discountPct}%
                  </div>
                )}
                {/* new badge */}
                {i === 0 && (
                  <div className="absolute right-3 top-3 z-10 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow">New</div>
                )}

                <div className="h-56 bg-neutral-900 rounded-t-lg overflow-hidden border-b border-neutral-700 flex items-center justify-center relative">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ filter: 'contrast(1.08) saturate(1.14)', transformOrigin: 'center' }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement
                      target.onerror = null
                      target.src = `/images/wrs/prod-1.jpg`
                    }}
                  />

                  <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full flex items-center justify-between gap-4 p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <Button size="sm" className="bg-white text-black">Quick View</Button>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-red-600 text-white">Aggiungi</Button>
                        <Button variant="ghost" size="sm" className="text-white/80">Dettagli</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="bg-neutral-900 text-white rounded-b-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-base leading-tight">{p.title}</div>
                    <div className="text-xs text-white/60 mt-1">{p.subtitle}</div>
                    <div className="flex items-center gap-2 mt-2 text-yellow-400">
                      <Star className="h-4 w-4" />
                      <span className="text-sm">4.7</span>
                      <span className="text-xs text-white/70">(345)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    {p.hasDiscount ? (
                      <div>
                        <div className="text-xs text-white/60 line-through">{formatEuro(p.basePrice)}</div>
                        <div className="text-lg font-bold text-red-500">{formatEuro(p.discountedPrice)}</div>
                      </div>
                    ) : (
                      <div className="text-lg font-bold">{formatEuro(p.basePrice)}</div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-white/60">Spedizione gratuita*</div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-red-600 text-white px-3 py-2" onClick={() => cart.add({ id: p.id, title: p.title, price: p.hasDiscount ? p.discountedPrice : p.basePrice, img: p.img })}>Aggiungi</Button>
                    <Button variant="ghost" size="sm" className="text-white/80">Dettagli</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <MiniCart open={cartOpen} onOpenChange={setCartOpen} />

      {/* Footer - WRS-style detailed */}
      <footer className="mt-12 bg-black text-white">
        {/* Newsletter strip */}
        <div className="max-w-7xl mx-auto px-6 py-8 border-b border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold text-red-600">Rimani aggiornato sulle offerte e novità:</h3>
              <p className="text-sm text-white/70 mt-2">Iscriviti alla newsletter per ricevere promozioni e novità.</p>
            </div>

            <div className="">
              <form className="flex gap-2 items-center" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget as HTMLFormElement); const email = String(f.get('email') || ''); const consent = Boolean(f.get('consent')); if (!consent) { alert('Devi accettare la privacy.'); return; } localStorage.setItem('wrs_newsletter', JSON.stringify({ email, date: Date.now() })); alert('Grazie! Ti sei iscritto.'); }}>
                <input name="email" type="email" required placeholder="Il tuo indirizzo email" className="w-full lg:w-96 rounded-none border border-red-600 bg-neutral-900 px-3 py-3 text-sm text-white placeholder:text-white/60" />
                <button type="submit" className="bg-red-600 px-4 py-3 rounded text-white">✉️</button>
              </form>
              <div className="mt-2 flex items-center gap-2">
                <input id="consent" name="consent" type="checkbox" />
                <label htmlFor="consent" className="text-xs text-white/70">Accetto termini e condizioni riguardanti la privacy policy.</label>
              </div>
            </div>

            <div className="flex justify-end">
              <img src="/images/wrs/hero.jpg" alt="partner" className="h-16 object-contain opacity-80" />
            </div>
          </div>
        </div>

        {/* Main footer columns */}
        <div className="max-w-7xl mx-auto px-6 py-10 border-b border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h4 className="text-lg font-bold text-red-600 mb-4">Indirizzo</h4>
              <p className="text-sm text-white/80">WRS S.r.l.<br/>Sede: Via O. Respighi, 56 int. 1 - 47841 Cattolica (RN) - Italia<br/>Capitale Sociale 1.000.000,00€</p>
              <div className="mt-3 text-sm text-white/80">
                <div>✉️ Servizio clienti: <a href="mailto:info@wrs.it" className="hover:text-white">info@wrs.it</a></div>
                <div>Orario servizio clienti: 09:30-12:30 / 15:00-18:00</div>
                <div>Orario negozio: 09:00-12:30 / 14:30-18:00</div>
              </div>
              <div className="flex items-center gap-3 mt-4 text-red-600 text-xl">
                <a href="#" className="hover:opacity-80">f</a>
                <a href="#" className="hover:opacity-80">in</a>
                <a href="#" className="hover:opacity-80">ig</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-red-600 mb-4">Informazioni</h4>
              <ul className="text-sm text-white/80 space-y-2">
                <li><a href="#" className="hover:text-white">Contattaci</a></li>
                <li><a href="#" className="hover:text-white">Chi siamo</a></li>
                <li><a href="#" className="hover:text-white">Termini e condizioni</a></li>
                <li><a href="#" className="hover:text-white">Consegna</a></li>
                <li><a href="#" className="hover:text-white">Pagamenti</a></li>
                <li><a href="#" className="hover:text-white">Lavora con noi</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-red-600 mb-4">Il mio account</h4>
              <ul className="text-sm text-white/80 space-y-2">
                <li><a href="#" className="hover:text-white">Entra</a></li>
                <li><a href="#" className="hover:text-white">Storico ordini</a></li>
                <li><a href="#" className="hover:text-white">Dati personali</a></li>
                <li><a href="#" className="hover:text-white">Indirizzi</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-red-600 mb-4">Recensioni</h4>
              <div className="bg-neutral-900 p-4 rounded">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-yellow-400">4.9</div>
                  <div>
                    <div className="flex gap-1 text-yellow-400">{Array.from({ length: 5 }).map((_, i) => (<span key={i}>★</span>))}</div>
                    <div className="text-sm text-white/70">4.9 - 4669 Recensioni</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-white/60">Recensioni verificate · Feedaty</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between">
          <div>© {new Date().getFullYear()} WRS S.r.l. P.Iva 02590120412</div>
          <div className="flex items-center gap-6 mt-3 md:mt-0">
            <div className="text-white/70">Scarica la nostra App:</div>
            <div className="flex gap-2 items-center">
              <img src="/images/wrs/logo.png" alt="appstore" className="h-8 opacity-80" />
            </div>
            <div className="text-white/70">In questo sito puoi pagare anche con:</div>
            <div className="bg-white/90 px-3 py-1 rounded">PayPal</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
