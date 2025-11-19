import { SectionCard } from "@/components/section-cards"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { data } from "@/data.json"
import { DollarSign, Package, Users, FileText, Eye, Download, Trash2 } from "lucide-react"

export default function DashboardPage() {
  const ordiniRecenti = [
    {
      id: "#ORD-X0OQ55YZ",
      hash: "e8161737...",
      cliente: "Pietro Carbone",
      stato: "Pagato",
      quantita: 1,
      totale: "30,74 €",
      data: "01 nov 2025, 13:39"
    },
    {
      id: "#ORD-X0OQ47YZ",
      hash: "d481522f...",
      cliente: "Ospite",
      stato: "Pagato",
      quantita: 1,
      totale: "44,04 €",
      data: "29 ott 2025, 15:49"
    },
    {
      id: "#ORD-X0OQ46YZ",
      hash: "c303ef8d...",
      cliente: "Ospite",
      stato: "Pagato",
      quantita: 1,
      totale: "46,68 €",
      data: "29 ott 2025, 15:12"
    }
  ]

  const [ordini, setOrdini] = useState(ordiniRecenti)

  // delete modal state for dashboard items
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState<any | null>(null)

  const openDeleteModal = (item: any) => {
    setDeletingItem(item)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!deletingItem) return
    setOrdini(prev => prev.filter(o => o.id !== deletingItem.id))
    setDeleteModalOpen(false)
    setDeletingItem(null)
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
              <CardTitle className="text-2xl">Dashboard Admin</CardTitle>
              <p className="text-sm text-muted-foreground">Panoramica generale del sistema XYZ</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-150 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">Aggiorna</Button>
        </CardHeader>
      </Card>

      {/* Delete confirmation modal for dashboard items */}
      {deleteModalOpen && deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/30"
            onClick={() => { setDeleteModalOpen(false); setDeletingItem(null); }}
          />
          <div className="relative w-full max-w-md mx-4">
            <div
              className="max-w-md rounded-lg border shadow-sm border-gray-200 dark:border-transparent"
              style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold">Elimina elemento</h3>
                <p className="text-sm text-muted-foreground mt-2">Sei sicuro di voler eliminare <strong>{deletingItem.id}</strong>?</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => { setDeleteModalOpen(false); setDeletingItem(null) }}
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

      {/* Stats Cards Prima Riga */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-500 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Guadagno Totale</CardTitle>
            <div className="p-2 bg-muted rounded-lg transition-colors hover:bg-blue-500 hover:text-white">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">121,46 €</div>
            <p className="text-xs text-muted-foreground mt-1">121,46 € questo mese</p>
          </CardContent>
        </Card>

        <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-500 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ordini Totali</CardTitle>
            <div className="p-2 bg-muted rounded-lg transition-colors hover:bg-blue-500 hover:text-white">
              <Package className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">3 questo mese</p>
          </CardContent>
        </Card>

        <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-500 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Utenti Registrati</CardTitle>
            <div className="p-2 bg-muted rounded-lg transition-colors hover:bg-blue-500 hover:text-white">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-500 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">File Caricati</CardTitle>
            <div className="p-2 bg-muted rounded-lg transition-colors hover:bg-blue-500 hover:text-white">
              <FileText className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78</div>
            <p className="text-xs text-muted-foreground mt-1">File totali nel sistema</p>
          </CardContent>
        </Card>
      </div>

      {/* Ordini Recenti */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl">Ordini Recenti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-4 py-3 w-12">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">ORDINE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">CLIENTE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">STATO</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">QUANTITÀ</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">TOTALE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">DATA</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">AZIONI</th>
                </tr>
              </thead>
              <tbody>
                {ordini.map((ordine, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium">{ordine.id}</div>
                      <div className="text-xs text-muted-foreground">{ordine.hash}</div>
                    </td>
                    <td className="px-4 py-4 text-sm">{ordine.cliente}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                        {ordine.stato}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">{ordine.quantita}</td>
                    <td className="px-4 py-4 text-sm font-medium">{ordine.totale}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{ordine.data}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 rounded hover:bg-muted transition-colors" title="Visualizza">
                          <Eye className="h-4 w-4 text-blue-500" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted transition-colors" title="Scarica">
                          <Download className="h-4 w-4 text-green-500" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted transition-colors" title="Elimina" onClick={() => openDeleteModal(ordine)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
