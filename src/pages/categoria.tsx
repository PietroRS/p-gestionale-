import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function CategoriaPage() {
  const { slug } = useParams<{ slug: string }>()
  const title = slug ? slug.replace(/-/g, ' ') : 'Categoria'

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/wrs" className="text-sm text-white/70 hover:text-white">◂ Torna a WRS</Link>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-4">{title}</h1>
        <p className="text-white/80 mb-6">Pagina placeholder per la categoria “{title}”. Qui verranno elencati i prodotti, i filtri e le informazioni correlate.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-neutral-800 p-4 rounded">
              <div className="w-full pt-[70%] bg-white mb-3" />
              <div className="text-sm font-semibold">Prodotto esempio {i+1}</div>
              <div className="text-xs text-white/70">Prezzo e descrizione breve</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
