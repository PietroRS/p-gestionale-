import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Download, Trash2, Package } from "lucide-react"
import { GenericTable } from "@/components/ui/table-generic"
import { ordiniData } from "@/data/ordini.data"
import type { Ordine } from "@/types/ordine.types"
import { StatoOrdine, PrioritaOrdine } from "@/types/ordine.types"
import type { TableConfig } from "@/types/table.types"

// Funzione per renderizzare il badge dello stato
const renderStatoBadge = (stato: StatoOrdine) => {
  switch (stato) {
    case StatoOrdine.COMPLETATO:
      return <Badge className="bg-green-600 hover:bg-green-700 text-white">✓ Completato</Badge>
    case StatoOrdine.IN_LAVORAZIONE:
      return <Badge className="bg-blue-600 hover:bg-blue-700 text-white">⏳ In lavorazione</Badge>
    case StatoOrdine.SPEDITO:
      return <Badge className="bg-purple-600 hover:bg-purple-700 text-white">📦 Spedito</Badge>
    case StatoOrdine.ANNULLATO:
      return <Badge className="bg-red-600 hover:bg-red-700 text-white">✖ Annullato</Badge>
    default:
      // fallback visibile anche in dark mode
      return <Badge variant="outline" className="border border-muted text-sm text-muted-foreground px-2 py-1">{stato}</Badge>
  }
}

// Funzione per renderizzare il badge della priorità
const renderPrioritaBadge = (priorita: PrioritaOrdine) => {
  switch (priorita) {
    case PrioritaOrdine.ALTA:
      return <Badge variant="outline" className="border-red-500 text-red-500">Alta</Badge>
    case PrioritaOrdine.MEDIA:
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Media</Badge>
    case PrioritaOrdine.BASSA:
      return <Badge variant="outline" className="border-green-500 text-green-500">Bassa</Badge>
    default:
      return <Badge variant="outline">{priorita}</Badge>
  }
}

export default function Ordini() {
  // Stato locale degli ordini (permette eliminare in locale come nella Dashboard)
  const [ordini, setOrdini] = React.useState<Ordine[]>(() => [...ordiniData])

  // Calcolo delle statistiche
  const totaleOrdini = ordini.length
  const ordiniInLavorazione = ordini.filter(o => o.stato === StatoOrdine.IN_LAVORAZIONE).length
  const ordiniCompletati = ordini.filter(o => o.stato === StatoOrdine.COMPLETATO).length
  const valoreTotale = ordini.reduce((sum, ord) => sum + ord.importo, 0)

  // Configurazione della tabella
  const tableConfig: TableConfig<Ordine> = {
    data: ordini,
    keyExtractor: (row) => row.id,
    searchable: true,
    searchKeys: ['cliente', 'id', 'prodotto', 'email'],
    pagination: {
      enabled: true,
      pageSize: 10
    },
    columns: [
      {
        key: 'id',
        header: 'Ordine',
        render: (value) => (
          <div className="font-mono text-sm font-medium">{value}</div>
        )
      },
      {
        key: 'cliente',
        header: 'Cliente',
        render: (_value, row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
              {row.cliente.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="text-sm font-medium">{row.cliente}</div>
              <div className="text-xs text-muted-foreground">{row.email}</div>
            </div>
          </div>
        )
      },
      {
        key: 'prodotto',
        header: 'Prodotto',
        render: (value) => <div className="text-sm">{value}</div>
      },
      {
        key: 'quantita',
        header: 'Qtà',
        render: (value) => <div className="text-sm font-medium">{value}x</div>
      },
      {
        key: 'data',
        header: 'Data',
        render: (value) => <div className="text-sm text-muted-foreground">{value}</div>
      },
      {
        key: 'priorita',
        header: 'Priorità',
        render: (value) => renderPrioritaBadge(value as PrioritaOrdine)
      },
      {
        key: 'stato',
        header: 'Stato',
        render: (value) => renderStatoBadge(value as StatoOrdine)
      },
      {
        key: 'importo',
        header: 'Importo',
        render: (value) => (
          <div className="text-sm font-semibold">€ {(value as number).toFixed(2)}</div>
        )
      }
    ],
    actions: [
      {
        label: 'Visualizza dettagli',
        icon: <Eye className="h-4 w-4 text-blue-500" />,
        onClick: (row) => console.log('Visualizza', row),
        variant: 'ghost'
      },
      {
        label: 'Scarica',
        icon: <Download className="h-4 w-4 text-green-500" />,
        onClick: (row) => console.log('Download', row),
        variant: 'ghost'
      },
      {
        label: 'Elimina',
        icon: <Trash2 className="h-4 w-4 text-red-500" />,
        onClick: (row) => openDeleteModal(row as Ordine),
        variant: 'ghost'
      }
    ],
    emptyMessage: 'Nessun ordine trovato'
  }

  // Delete modal state for orders (similar to Dashboard)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const [deletingOrder, setDeletingOrder] = React.useState<Ordine | null>(null)

  const openDeleteModal = (item: Ordine) => {
    setDeletingOrder(item)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!deletingOrder) return
    setOrdini(prev => prev.filter(o => o.id !== deletingOrder.id))
    setDeleteModalOpen(false)
    setDeletingOrder(null)
  }

  // Persist ordini to localStorage so deletions survive page refresh
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('gestionale-ordini')
      if (raw) {
        const parsed = JSON.parse(raw) as Ordine[]
        // basic validation
        if (Array.isArray(parsed)) setOrdini(parsed)
      }
    } catch (e) {
      // ignore parse errors and keep default data
      console.error('Errore caricamento ordini da localStorage', e)
    }
  }, [])

  React.useEffect(() => {
    try {
      localStorage.setItem('gestionale-ordini', JSON.stringify(ordini))
    } catch (e) {
      console.error('Errore salvataggio ordini su localStorage', e)
    }
  }, [ordini])

  // Helper: reset ordini to default (clears localStorage)
  const resetOrdini = () => {
    try {
      localStorage.removeItem('gestionale-ordini')
    } catch (e) {
      console.error('Impossibile rimuovere ordini da localStorage', e)
    }
    setOrdini([...ordiniData])
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Ordini</CardTitle>
              <p className="text-sm text-muted-foreground">Gestisci tutti gli ordini ricevuti dai clienti</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-150 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">Aggiorna</Button>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Totale Ordini</div>
          <div className="mt-2 text-2xl font-bold">{totaleOrdini}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">In Lavorazione</div>
          <div className="mt-2 text-2xl font-bold text-blue-600">{ordiniInLavorazione}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Completati</div>
          <div className="mt-2 text-2xl font-bold text-green-600">{ordiniCompletati}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Valore Totale</div>
          <div className="mt-2 text-2xl font-bold">€ {valoreTotale.toFixed(2)}</div>
        </div>
      </div>

      {/* Delete confirmation modal for orders */}
      {deleteModalOpen && deletingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/30"
            onClick={() => { setDeleteModalOpen(false); setDeletingOrder(null); }}
          />
          <div className="relative w-full max-w-md mx-4">
            <div
              className="max-w-md rounded-lg border shadow-sm border-gray-200 dark:border-transparent"
              style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold">Elimina ordine</h3>
                <p className="text-sm text-muted-foreground mt-2">Sei sicuro di voler eliminare <strong>{deletingOrder.id}</strong>?</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => { setDeleteModalOpen(false); setDeletingOrder(null) }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabella Generica */}
      <GenericTable config={tableConfig} />
    </div>
  )
}
