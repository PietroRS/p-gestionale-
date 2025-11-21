import React from "react"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, ShoppingBag, Star, User, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
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

const products = new Array(15).fill(null).map((_, i) => {
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
    image: '/images/wrs/hero-custom.jpg',
    title: 'WRS — Novità in vetrina',
    subtitle: 'Scopri le ultime novità e gli accessori in evidenza.',
    ctaText: 'Scopri'
  },
  {
    id: 'h2',
    image: '/images/wrs/hero-2.jpg',
    title: 'Performance e stile',
    subtitle: 'Scarichi e componenti per chi cerca il massimo.',
    ctaText: 'Vedi prodotti'
  },
  {
    id: 'h3',
    image: '/images/wrs/hero-3.jpg',
    title: 'Tecnologia e precisione',
    subtitle: 'Componenti di alta qualità per la tua moto.',
    ctaText: 'Scopri'
  },
  {
    id: 'h4',
    image: '/images/wrs/hero-4.jpg',
    title: 'Accessori selezionati',
    subtitle: 'Offerte e prodotti selezionati dal nostro team.',
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
                <img src="/images/wrs/logo.png" alt="WRS" className="h-10 w-auto" />
              </a>
            </div>

            {/* centered search */}
            <div className="col-span-7">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={(e) => { e.preventDefault(); /* TODO: handle search */ }} className="relative">
                  <input
                    aria-label="Cerca nel catalogo"
                    className="w-full rounded-md border-2 border-red-600 bg-neutral-900 text-white px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-red-500/25 shadow-sm"
                    placeholder="Cerca nel nostro catalogo"
                  />
                  <button
                    type="submit"
                    aria-label="Cerca"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 w-12 h-10 rounded-md flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* right partners / trustpilot / account */}
            <div className="col-span-3 flex items-center justify-end gap-4">
              {/* partner images removed per user request */}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <div className="text-green-400 font-bold">4.9</div>
                  <div className="hidden sm:inline">Trustpilot</div>
                </div>
                <a href="#" className="text-white/80 hover:text-white flex items-center gap-2">
                  <User className="h-4 w-4"/>
                  <span className="text-sm hidden md:inline">PIETRO ANTONIO</span>
                </a>
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
              {['Accessori moto','Accessori Scooter','Abbigliamento','Prodotti WRS','Marchi trattati','Novità','Offerte'].map((c) => {
                const slug = c.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
                return (
                  <Link key={c} to={`/categoria/${slug}`} className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-800 rounded">
                    <span className="text-red-600">🏁</span>
                    <span className="font-medium">{c}</span>
                    <ChevronDown className="h-3 w-3 text-white/70" />
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Category chips (racing style) */}
      <div className="px-6 mt-4">
          <div className="flex gap-3 overflow-auto py-2">
          {['Scarichi', 'Freni', 'Elettronica', 'Cupolini', 'Abbigliamento', 'Akrapovic', 'Brembo', 'Novità'].map((c) => {
            const slug = c.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
            return (
              <Link key={c} to={`/categoria/${slug}`} className="flex-shrink-0 px-4 py-2 bg-neutral-800 text-white/90 rounded-full text-sm font-semibold border border-neutral-700 hover:bg-red-600 hover:text-white transition">
                {c}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Hero carousel */}
      <section className="px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 rounded-lg overflow-hidden relative h-80 md:h-[520px] shadow-2xl border border-neutral-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <Carousel slides={heroSlides} className="h-80 md:h-[520px] rounded-lg" />
            <div className="absolute left-8 bottom-8 z-20">
              <a href="#prodotti" className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:brightness-105">Scopri le offerte</a>
            </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((p, i) => (
            <Card
              key={p.id}
              className="group relative bg-neutral-900 border-2 border-neutral-800 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-transform min-h-[300px]"
            >
              {/* fixed ribbon inside card (anchored to Card) */}
              {p.hasDiscount && (
                <div className="absolute left-2 top-2 z-50 pointer-events-none" style={{ transformOrigin: 'left top', transformBox: 'fill-box' }}>
                  <svg className="shadow-lg -rotate-12" width="78" height="30" viewBox="0 0 78 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="0" y="0" width="78" height="30" rx="4" fill="#d03030" stroke="#fff" strokeWidth="2.5"/>
                    <text x="39" y="20" textAnchor="middle" fontWeight="700" fontSize="11" fill="#fff" fontFamily="sans-serif">BLACK FRIDAY</text>
                  </svg>
                </div>
              )}

              {/* image area: white square like reference */}
              <div className="relative bg-white border-b border-neutral-800">
                <div className="w-full pt-[100%]" />
                <div className="absolute inset-0 p-2 flex items-center justify-center">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = `/images/wrs/prod-1.jpg`; }}
                  />
                </div>
              </div>

              <div className="px-3 pt-2 pb-12 flex-1">
                <div className="text-[11px] text-white/70 uppercase font-semibold leading-tight h-10 overflow-hidden">{p.title}</div>
                <div className="text-[10px] text-white/60 mt-1 h-5 overflow-hidden">{p.subtitle}</div>
              </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className="h-3 w-3 text-yellow-400" aria-hidden />
                      ))}
                    </div>
                    <span className="text-[12px] text-white/80">4.7</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 shadow-sm text-sm" onClick={() => cart.add({ id: p.id, title: p.title, price: p.hasDiscount ? p.discountedPrice : p.basePrice, img: p.img })} aria-label={`Aggiungi ${p.title} al carrello`}>Aggiungi</Button>
                    <Button variant="ghost" size="sm" className="text-white/70 text-sm hover:text-white" aria-label={`Vedi dettagli ${p.title}`}>Dettagli</Button>
                  </div>
                </div>

              {/* price strip fixed at bottom */}
              <div className="absolute left-0 right-0 bottom-0 bg-neutral-800 p-2 border-t border-neutral-700 flex items-center justify-between">
                <div className="text-[11px] text-white/60">Spedizione gratuita*</div>
                <div className="text-right">
                  {p.hasDiscount ? (
                    <div className="flex items-baseline gap-3">
                      <div className="text-base font-bold text-white">{formatEuro(p.discountedPrice)}</div>
                      <div className="text-xs text-white/60 line-through">{formatEuro(p.basePrice)}</div>
                    </div>
                  ) : (
                    <div className="text-base font-bold text-white">{formatEuro(p.basePrice)}</div>
                  )}
                </div>
              </div>

              {/* price strip fixed at bottom */}
              <div className="absolute left-0 right-0 bottom-0 bg-neutral-800 p-2 border-t border-neutral-700 flex items-center justify-between">
                <div className="text-[11px] text-white/60">Spedizione gratuita*</div>
                <div className="text-right">
                  {p.hasDiscount ? (
                    <div className="flex items-baseline gap-3">
                      <div className="text-base font-bold text-white">{formatEuro(p.discountedPrice)}</div>
                      <div className="text-xs text-white/60 line-through">{formatEuro(p.basePrice)}</div>
                    </div>
                  ) : (
                    <div className="text-base font-bold text-white">{formatEuro(p.basePrice)}</div>
                  )}
                </div>
              </div>

              {/* action row (placed above the price strip visually) */}
              <div className="absolute left-0 right-0 bottom-10 px-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center -space-x-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-3 w-3 text-yellow-400" aria-hidden />
                    ))}
                  </div>
                  <span className="text-[12px] text-white/80 ml-2">4.7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 shadow-sm text-sm" onClick={() => cart.add({ id: p.id, title: p.title, price: p.hasDiscount ? p.discountedPrice : p.basePrice, img: p.img })} aria-label={`Aggiungi ${p.title} al carrello`}>Aggiungi</Button>
                  <Button variant="ghost" size="sm" className="text-white/70 text-sm hover:text-white" aria-label={`Vedi dettagli ${p.title}`}>Dettagli</Button>
                </div>
              </div>
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

            {/* partner image removed per request */}
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
          </div>
        </div>
      </footer>
    </div>
  )
}
