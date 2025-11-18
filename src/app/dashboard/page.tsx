import { SectionCard } from "@/components/section-cards"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { data } from "@/data.json"
import { DollarSign, Package, Users, FileText, Eye, MoreHorizontal } from "lucide-react"

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
          <Button className="bg-blue-600 hover:bg-blue-700">Aggiorna</Button>
        </CardHeader>
      </Card>

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
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">ORDINE</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">CLIENTE</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">STATO</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">QUANTITÀ</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">TOTALE</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">DATA</th>
                  <th className="text-left py-3 px-4 font-medium text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {ordiniRecenti.map((ordine, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="text-sm font-medium">{ordine.id}</div>
                      <div className="text-xs text-muted-foreground">{ordine.hash}</div>
                    </td>
                    <td className="py-4 px-4 text-sm">{ordine.cliente}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                        {ordine.stato}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm">{ordine.quantita}</td>
                    <td className="py-4 px-4 text-sm font-medium">{ordine.totale}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{ordine.data}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
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
