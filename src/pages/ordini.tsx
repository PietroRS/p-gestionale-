import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, MoreHorizontal, Search, Filter, Plus } from "lucide-react"
import { useState } from "react"

const ordini = [
  {
    id: "ORD-001",
    cliente: "Mario Rossi",
    email: "mario.rossi@email.it",
    prodotto: "Stampa 3D Prototipo",
    quantita: 2,
    data: "15/11/2025",
    stato: "In lavorazione",
    importo: 250.00,
    priorita: "alta"
  },
  {
    id: "ORD-002",
    cliente: "Laura Bianchi",
    email: "laura.bianchi@email.it",
    prodotto: "Componente Meccanico",
    quantita: 5,
    data: "14/11/2025",
    stato: "Completato",
    importo: 450.00,
    priorita: "media"
  },
  {
    id: "ORD-003",
    cliente: "Giuseppe Verdi",
    email: "giuseppe.verdi@email.it",
    prodotto: "Pezzo di Ricambio",
    quantita: 1,
    data: "13/11/2025",
    stato: "Spedito",
    importo: 180.00,
    priorita: "bassa"
  },
  {
    id: "ORD-004",
    cliente: "Anna Ferrari",
    email: "anna.ferrari@email.it",
    prodotto: "Modello Architettonico",
    quantita: 3,
    data: "12/11/2025",
    stato: "In lavorazione",
    importo: 620.00,
    priorita: "alta"
  },
  {
    id: "ORD-005",
    cliente: "Carlo Neri",
    email: "carlo.neri@email.it",
    prodotto: "Prototipo Industriale",
    quantita: 1,
    data: "11/11/2025",
    stato: "Completato",
    importo: 890.00,
    priorita: "media"
  },
  {
    id: "ORD-006",
    cliente: "Francesca Russo",
    email: "francesca.russo@email.it",
    prodotto: "Componente Elettronico",
    quantita: 10,
    data: "10/11/2025",
    stato: "Spedito",
    importo: 320.00,
    priorita: "bassa"
  },
  {
    id: "ORD-007",
    cliente: "Roberto Esposito",
    email: "roberto.esposito@email.it",
    prodotto: "Gadget Personalizzato",
    quantita: 50,
    data: "09/11/2025",
    stato: "In lavorazione",
    importo: 150.00,
    priorita: "media"
  },
  {
    id: "ORD-008",
    cliente: "Giulia Conti",
    email: "giulia.conti@email.it",
    prodotto: "Stampa 3D Artistico",
    quantita: 2,
    data: "08/11/2025",
    stato: "Completato",
    importo: 420.00,
    priorita: "alta"
  }
]

const getStatoBadge = (stato: string) => {
  switch (stato) {
    case "Completato":
      return <Badge className="bg-green-600 hover:bg-green-700 text-white">✓ Completato</Badge>
    case "In lavorazione":
      return <Badge className="bg-blue-600 hover:bg-blue-700 text-white">⏳ In lavorazione</Badge>
    case "Spedito":
      return <Badge className="bg-purple-600 hover:bg-purple-700 text-white">📦 Spedito</Badge>
    default:
      return <Badge>{stato}</Badge>
  }
}

const getPrioritaBadge = (priorita: string) => {
  switch (priorita) {
    case "alta":
      return <Badge variant="outline" className="border-red-500 text-red-500">Alta</Badge>
    case "media":
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Media</Badge>
    case "bassa":
      return <Badge variant="outline" className="border-green-500 text-green-500">Bassa</Badge>
    default:
      return <Badge variant="outline">{priorita}</Badge>
  }
}

export default function PannelloControlloPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredOrdini = ordini.filter(ordine => 
    ordine.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordine.prodotto.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totaleOrdini = filteredOrdini.reduce((sum, ord) => sum + ord.importo, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ordini</h1>
          <p className="mt-2 text-muted-foreground">
            Gestisci tutti gli ordini ricevuti dai clienti
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Esporta
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuovo Ordine
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Totale Ordini</div>
          <div className="mt-2 text-2xl font-bold">{filteredOrdini.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">In Lavorazione</div>
          <div className="mt-2 text-2xl font-bold text-blue-600">
            {filteredOrdini.filter(o => o.stato === "In lavorazione").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Completati</div>
          <div className="mt-2 text-2xl font-bold text-green-600">
            {filteredOrdini.filter(o => o.stato === "Completato").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Valore Totale</div>
          <div className="mt-2 text-2xl font-bold">€ {totaleOrdini.toFixed(2)}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-card p-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtra
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Ordine</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Prodotto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Qtà</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Priorità</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Stato</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">Importo</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrdini.map((ordine) => (
                <tr 
                  key={ordine.id} 
                  className="transition-colors hover:bg-muted/50"
                >
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm font-medium">{ordine.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
                        {ordine.cliente.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{ordine.cliente}</div>
                        <div className="text-xs text-muted-foreground">{ordine.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{ordine.prodotto}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{ordine.quantita}x</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">{ordine.data}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getPrioritaBadge(ordine.priorita)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatoBadge(ordine.stato)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-semibold">€ {ordine.importo.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Visualizza dettagli">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Altre azioni">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{filteredOrdini.length}</span> di <span className="font-medium">{ordini.length}</span> ordini
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Precedente
            </Button>
            <Button variant="outline" size="sm" disabled>
              Successivo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
