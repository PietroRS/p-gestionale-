import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layers, Plus, Edit, Trash2, Printer, Package } from "lucide-react"
import { useState } from "react"

interface Tecnologia {
  id: number
  nome: string
  descrizione: string
  stato: "Attiva" | "Inattiva"
  tipo: "Stampa"
}

interface Materiale {
  id: number
  nome: string
  colore: string
  prezzo: string
  disponibile: boolean
  categoria: string
}

export default function TecnologiePage() {
  const [tecnologie] = useState<Tecnologia[]>([
    {
      id: 1,
      nome: "Alluminio 7075",
      descrizione: "Lega di alluminio aeronautico ad alta resistenza",
      stato: "Attiva",
      tipo: "Stampa"
    },
    {
      id: 2,
      nome: "Acciaio Inox 316L",
      descrizione: "Acciaio inossidabile resistente alla corrosione",
      stato: "Attiva", 
      tipo: "Stampa"
    },
    {
      id: 3,
      nome: "Titanio Ti6Al4V",
      descrizione: "Lega di titanio ultraleggera e resistente",
      stato: "Inattiva",
      tipo: "Stampa"
    },
    {
      id: 4,
      nome: "Magnesio AZ31",
      descrizione: "Lega di magnesio per componenti ultraleggeri",
      stato: "Attiva",
      tipo: "Stampa"
    }
  ])

  const [materiali] = useState<Materiale[]>([
    {
      id: 1,
      nome: "Fibra di Carbonio",
      colore: "Nero opaco",
      prezzo: "€120.00/kg",
      disponibile: true,
      categoria: "Fibra composita"
    },
    {
      id: 2,
      nome: "Kevlar",
      colore: "Giallo/Oro",
      prezzo: "€150.00/kg", 
      disponibile: true,
      categoria: "Fibra aramidica"
    },
    {
      id: 3,
      nome: "ABS Rinforzato",
      colore: "Nero",
      prezzo: "€45.00/kg",
      disponibile: false,
      categoria: "Termoplastico"
    },
    {
      id: 4,
      nome: "PEEK",
      colore: "Naturale",
      prezzo: "€200.00/kg",
      disponibile: true,
      categoria: "Termoplastico High-Performance"
    },
    {
      id: 5,
      nome: "Nylon PA12",
      colore: "Bianco",
      prezzo: "€80.00/kg",
      disponibile: true,
      categoria: "Poliammide"
    },
    {
      id: 6,
      nome: "TPU Flessibile",
      colore: "Rosso",
      prezzo: "€65.00/kg",
      disponibile: false,
      categoria: "Elastomero"
    }
  ])

  return (
    <div className="p-6 space-y-6">
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Tecnologie & Materiali</CardTitle>
              <p className="text-sm text-muted-foreground">Gestisci tecnologie di stampa e materiali disponibili</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-150 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Nuovo
          </Button>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tabella Tecnologie */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="h-5 w-5" />
                <CardTitle className="text-lg">Materiali Metallici</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Nome</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Descrizione</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Stato</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {tecnologie.map((tech) => (
                    <tr key={tech.id} className="border-b border-border hover:bg-accent">
                      <td className="py-3 px-2 text-foreground font-medium">{tech.nome}</td>
                      <td className="py-3 px-2 text-muted-foreground">{tech.descrizione}</td>
                      <td className="py-3 px-2">
                        <Badge className={tech.stato === "Attiva" ? "bg-green-500/20 text-green-700 dark:text-green-400" : "bg-red-500/20 text-red-700 dark:text-red-400"}>
                          {tech.stato}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button className="text-muted-foreground hover:text-foreground">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
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

        {/* Tabella Materiali */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <CardTitle className="text-lg">Materiali Disponibili</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Materiale</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Colore</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Prezzo</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Stato</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {materiali.map((materiale) => (
                    <tr key={materiale.id} className="border-b border-border hover:bg-accent">
                      <td className="py-3 px-2">
                        <div>
                          <div className="text-foreground font-medium">{materiale.nome}</div>
                          <div className="text-xs text-muted-foreground">{materiale.categoria}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{materiale.colore}</td>
                      <td className="py-3 px-2 text-foreground font-medium">{materiale.prezzo}</td>
                      <td className="py-3 px-2">
                        <Badge className={materiale.disponibile ? "bg-green-500/20 text-green-700 dark:text-green-400" : "bg-red-500/20 text-red-700 dark:text-red-400"}>
                          {materiale.disponibile ? "Disponibile" : "Esaurito"}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button className="text-muted-foreground hover:text-foreground">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
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
    </div>
  )
}
