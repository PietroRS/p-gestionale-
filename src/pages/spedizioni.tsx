import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Plus, Edit, Trash2, Clock, Euro, TrendingUp } from "lucide-react"
import { useState } from "react"

interface OpzioneSpedizione {
  nome: string
  descrizione: string
  percentuale: string
  giorniStimati: string
  ordine: number
  attiva: boolean
}

export default function ProgettiPage() {
  const [opzioni, setOpzioni] = useState<OpzioneSpedizione[]>([
    {
      nome: "Express",
      descrizione: "Consegna in 24-48 ore",
      percentuale: "100.00%",
      giorniStimati: "2 giorni",
      ordine: 1,
      attiva: true
    },
    {
      nome: "Veloce",
      descrizione: "Consegna in 3-5 giorni lavorativi",
      percentuale: "80.00%",
      giorniStimati: "4 giorni",
      ordine: 2,
      attiva: true
    },
    {
      nome: "Standard",
      descrizione: "Consegna in 5-7 giorni lavorativi",
      percentuale: "50.00%",
      giorniStimati: "6 giorni",
      ordine: 3,
      attiva: true
    },
    {
      nome: "Economy",
      descrizione: "Consegna in 7-14 giorni lavorativi",
      percentuale: "25.00%",
      giorniStimati: "10 giorni",
      ordine: 4,
      attiva: true
    },
    {
      nome: "Ritiro in Sede",
      descrizione: "Ritira in sede il prodotto",
      percentuale: "0.00%",
      giorniStimati: "1 giorni",
      ordine: 5,
      attiva: false
    }
  ])

  const totaleOpzioni = opzioni.length
  const opzioniAttive = opzioni.filter(o => o.attiva).length
  const percentualeMin = Math.min(...opzioni.map(o => parseFloat(o.percentuale)))
  const percentualeMax = Math.max(...opzioni.map(o => parseFloat(o.percentuale)))

  const toggleOpzione = (nome: string) => {
    setOpzioni(prev => prev.map(o => 
      o.nome === nome ? { ...o, attiva: !o.attiva } : o
    ))
  }

  const handleEdit = (nome: string) => {
    console.log("Modifica opzione:", nome)
  }

  const handleDelete = (nome: string) => {
    setOpzioni(prev => prev.filter(o => o.nome !== nome))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Card */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Gestione Spedizioni</CardTitle>
              <p className="text-sm text-muted-foreground">
                Gestisci le opzioni di spedizione disponibili per i clienti in tempo reale.
              </p>
            </div>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuova Opzione
          </Button>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Totale Opzioni */}
        <div 
          className="rounded-lg border-2 border-gray-300 dark:border-gray-700 shadow-sm p-6"
          style={{ 
            backgroundColor: 'white',
            color: 'black'
          }}
          data-theme="light"
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              .dark [data-theme="light"] {
                background-color: #1f2937 !important;
                color: white !important;
              }
              .dark [data-theme="light"] span {
                color: #d1d5db !important;
              }
              .dark [data-theme="light"] .text-3xl {
                color: white !important;
              }
            `
          }} />
          <div className="flex items-center gap-3 mb-2">
            <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-gray-600">Totale Opzioni</span>
          </div>
          <div className="text-3xl font-bold">{totaleOpzioni}</div>
        </div>

        {/* Attive */}
        <div 
          className="rounded-lg border-2 border-gray-300 dark:border-gray-700 shadow-sm p-6"
          style={{ 
            backgroundColor: 'white',
            color: 'black'
          }}
          data-theme="light"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm text-gray-600">Attive</span>
          </div>
          <div className="text-3xl font-bold">{opzioniAttive}</div>
        </div>

        {/* Percentuale Min */}
        <div 
          className="rounded-lg border-2 border-gray-300 dark:border-gray-700 shadow-sm p-6"
          style={{ 
            backgroundColor: 'white',
            color: 'black'
          }}
          data-theme="light"
        >
          <div className="flex items-center gap-3 mb-2">
            <Euro className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span className="text-sm text-gray-600">Percentuale Min</span>
          </div>
          <div className="text-3xl font-bold">{percentualeMin.toFixed(2)}%</div>
        </div>

        {/* Percentuale Max */}
        <div 
          className="rounded-lg border-2 border-gray-300 dark:border-gray-700 shadow-sm p-6"
          style={{ 
            backgroundColor: 'white',
            color: 'black'
          }}
          data-theme="light"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-sm text-gray-600">Percentuale Max</span>
          </div>
          <div className="text-3xl font-bold">{percentualeMax.toFixed(2)}%</div>
        </div>
      </div>

      {/* Tabella Opzioni */}
      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 bg-muted rounded-sm"></div>
            <h3 className="font-semibold text-foreground">Opzioni di Spedizione</h3>
            <span className="text-sm text-muted-foreground">(Trascina per riordinare)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground"></th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Descrizione</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Percentuale (%)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Giorni Stimati</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ordine</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stato</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {opzioni.map((opzione) => (
                  <tr key={opzione.nome} className="border-b border-border hover:bg-accent">
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="w-2 h-1 bg-muted rounded-full"></div>
                        <div className="w-2 h-1 bg-muted rounded-full"></div>
                        <div className="w-2 h-1 bg-muted rounded-full"></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground font-medium">{opzione.nome}</td>
                    <td className="py-3 px-4 text-muted-foreground">{opzione.descrizione}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{opzione.percentuale}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{opzione.giorniStimati}</td>
                    <td className="py-3 px-4 text-foreground">{opzione.ordine}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleOpzione(opzione.nome)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          opzione.attiva ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                            opzione.attiva ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span className={`ml-2 text-sm ${opzione.attiva ? "text-foreground" : "text-muted-foreground"}`}>
                        {opzione.attiva ? "Attiva" : "Inattiva"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(opzione.nome)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(opzione.nome)}
                          className="text-muted-foreground hover:text-destructive"
                        >
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
  )
}
