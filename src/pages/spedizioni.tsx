import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Truck, Plus, Eye, Download, Trash2, Clock, Euro, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

interface OpzioneSpedizione {
  nome: string
  descrizione: string
  percentuale: string
  giorniStimati: string
  ordine: number
  attiva: boolean
}

export default function Spedizioni() {
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

  // Nuova opzione modal state + form fields
  const [openNewOpzione, setOpenNewOpzione] = useState<boolean>(false)
  const [nuovaNome, setNuovaNome] = useState<string>('')
  const [nuovaDescrizione, setNuovaDescrizione] = useState<string>('')
  const [nuovaPercentuale, setNuovaPercentuale] = useState<string>('0')
  const [nuovaGiorni, setNuovaGiorni] = useState<string>('1')
  const [nuovoOrdine, setNuovoOrdine] = useState<number>(opzioni.length + 1)

  // detect dark mode (for Dialog force)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.classList.contains('dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  useEffect(() => {
    if (typeof document === 'undefined') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setIsDarkMode(document.documentElement.classList.contains('dark') || mq.matches)
    handler()
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else if ((mq as any).addListener) (mq as any).addListener(handler)
    const obs = new MutationObserver(() => handler())
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      obs.disconnect()
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else if ((mq as any).removeListener) (mq as any).removeListener(handler)
    }
  }, [])

  const totaleOpzioni = opzioni.length
  const opzioniAttive = opzioni.filter(o => o.attiva).length
  const percentualeMin = Math.min(...opzioni.map(o => parseFloat(o.percentuale)))
  const percentualeMax = Math.max(...opzioni.map(o => parseFloat(o.percentuale)))

  const toggleOpzione = (nome: string) => {
    setOpzioni(prev => prev.map(o => 
      o.nome === nome ? { ...o, attiva: !o.attiva } : o
    ))
  }

  

  // Delete modal state (confirm before deleting) - similar behaviour to Dashboard
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState<string | null>(null)

  const openDeleteModal = (nome: string) => {
    setDeletingItem(nome)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!deletingItem) return
    setOpzioni(prev => prev.filter(o => o.nome !== deletingItem))
    setDeleteModalOpen(false)
    setDeletingItem(null)
  }

  const handleView = (nome: string) => {
    console.log("Visualizza opzione:", nome)
  }

  const handleDownload = (nome: string) => {
    // Tentativo semplice: apri la fattura di esempio in public/documents/fatture
    try {
      const invoiceUrl = '/documents/fatture/F001234_Ducati.html'
      // apri in nuova scheda (come le altre pagine fanno per i file)
      window.open(invoiceUrl, '_blank')
      alert(`Apertura fattura per ordine relativo a: ${nome}`)
    } catch (e) {
      console.error('Errore apertura fattura', e)
      alert('Impossibile scaricare la fattura al momento')
    }
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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => { setOpenNewOpzione(true); setNuovoOrdine(opzioni.length + 1) }}>
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
                          onClick={() => handleView(opzione.nome)}
                          className="p-1.5 rounded hover:bg-muted transition-colors"
                          title="Visualizza"
                        >
                          <Eye className="h-4 w-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDownload(opzione.nome)}
                          className="p-1.5 rounded hover:bg-muted transition-colors"
                          title="Scarica"
                        >
                          <Download className="h-4 w-4 text-green-500" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(opzione.nome)}
                          className="p-1.5 rounded hover:bg-muted transition-colors"
                          title="Elimina"
                        >
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
      {/* Delete confirmation modal for shipping options */}
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
                <h3 className="text-lg font-semibold">Elimina opzione</h3>
                <p className="text-sm text-muted-foreground mt-2">Sei sicuro di voler eliminare <strong>{deletingItem}</strong>?</p>
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

      {/* Nuova Opzione Modal */}
      <Dialog open={openNewOpzione} onOpenChange={setOpenNewOpzione} forceDark={isDarkMode}>
        <DialogContent>
          <DialogHeader onClose={() => setOpenNewOpzione(false)}>
            <DialogTitle>Nuova Opzione di Spedizione</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Nome</label>
              <Input value={nuovaNome} onChange={(e) => setNuovaNome(e.target.value)} placeholder="Es. Express, Standard..." />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Descrizione</label>
              <Textarea value={nuovaDescrizione} onChange={(e) => setNuovaDescrizione(e.target.value)} placeholder="Descrizione dell'opzione di spedizione" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Percentuale (%)</label>
                <Input value={nuovaPercentuale} onChange={(e) => setNuovaPercentuale(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Giorni Stimati</label>
                <Input value={nuovaGiorni} onChange={(e) => setNuovaGiorni(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Ordine</label>
              <Input type="number" value={nuovoOrdine} onChange={(e) => setNuovoOrdine(Number(e.target.value))} />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setOpenNewOpzione(false)}>Annulla</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => {
                if (!nuovaNome.trim()) return alert('Inserisci un nome per l\'opzione')
                const percent = Number(nuovaPercentuale) || 0
                const giorni = nuovaGiorni || '1'
                const nuovo: OpzioneSpedizione = {
                  nome: nuovaNome,
                  descrizione: nuovaDescrizione,
                  percentuale: percent.toFixed(2) + '%',
                  giorniStimati: `${giorni} giorni`,
                  ordine: Number(nuovoOrdine) || (opzioni.length + 1),
                  attiva: true
                }
                setOpzioni(prev => [nuovo, ...prev])
                setNuovaNome('')
                setNuovaDescrizione('')
                setNuovaPercentuale('0')
                setNuovaGiorni('1')
                setNuovoOrdine(prev => prev + 1)
                setOpenNewOpzione(false)
              }}>Crea Opzione</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
