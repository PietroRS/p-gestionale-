import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tag, Plus, Edit, Trash2, Gift } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from "@/components/ui/badge"

interface Coupon {
  codice: string
  tipo: string
  valore: string
  minOrdine: string
  validoDal: string
  validoFino: string
  utilizzi: number
  stato: "Attivo" | "Inattivo"
}

export default function CouponPage() {
  const [openNewCoupon, setOpenNewCoupon] = useState<boolean>(false)
  const [codice, setCodice] = useState<string>('')
  const [tipo, setTipo] = useState<string>('Importo Fisso (€)')
  const [valore, setValore] = useState<string>('')
  const [minOrdine, setMinOrdine] = useState<string>('0.00')
  const [scontoMax, setScontoMax] = useState<string>('0.00')
  const [validoDal, setValidoDal] = useState<string>('')
  const [validoFino, setValidoFino] = useState<string>('')
  const [limiteUtilizzi, setLimiteUtilizzi] = useState<string>('')
  const [couponAttivoToggle, setCouponAttivoToggle] = useState<boolean>(true)
  const [scontoBenvenuto, setScontoBenvenuto] = useState("0,00")
  const [couponAttivi, setCouponAttivi] = useState<Coupon[]>([
    {
      codice: "WELCOME10",
      tipo: "Percentuale",
      valore: "10.00%",
      minOrdine: "€50.00",
      validoDal: "-",
      validoFino: "-",
      utilizzi: 0,
      stato: "Attivo"
    },
    {
      codice: "PROVA25",
      tipo: "Percentuale",
      valore: "10.00%",
      minOrdine: "-",
      validoDal: "-",
      validoFino: "-",
      utilizzi: 2,
      stato: "Attivo"
    }
  ])

  const handleSaveSconto = () => {
    console.log("Salvataggio sconto benvenuto:", scontoBenvenuto)
  }

  const handleEditCoupon = (codice: string) => {
    console.log("Modifica coupon:", codice)
  }

  const handleDeleteCoupon = (codice: string) => {
    setCouponAttivi(prev => prev.filter(c => c.codice !== codice))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Card */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Tag className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Coupon e Sconti</CardTitle>
              <p className="text-sm text-muted-foreground">
                Gestisci coupon promozionali e lo sconto di benvenuto per nuovi clienti.
              </p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 text-base font-semibold" onClick={() => setOpenNewCoupon(true)}>
            <Plus className="mr-2 h-5 w-5" />
            Nuovo Coupon
          </Button>
        </CardHeader>
      </Card>

      {/* Sconto di Benvenuto Card */}
      <div 
        className="rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-sm p-6"
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
          `
        }} />
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-lg">Sconto di Benvenuto</h3>
        </div>
        <p className="text-sm mb-4">
          Questo sconto viene applicato automaticamente al primo ordine di ogni nuovo cliente. Non richiede codice coupon e viene applicato una sola volta per utente.
        </p>
        <div className="space-y-2">
          <label className="text-sm font-medium">Percentuale di Sconto (%)</label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={scontoBenvenuto}
              onChange={(e) => setScontoBenvenuto(e.target.value)}
              className="max-w-xs"
            />
            <Button 
              onClick={handleSaveSconto}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Salva Sconto Benvenuto
            </Button>
          </div>
        </div>
      </div>

      {/* Coupon Attivi Card */}
      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-foreground" />
            <h3 className="font-semibold text-foreground text-lg">Coupon Attivi</h3>
          </div>
          
          {/* Tabella */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Codice</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valore</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Min. Ordine</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valido dal</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valido fino</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Utilizzi</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stato</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {couponAttivi.map((coupon) => (
                  <tr key={coupon.codice} className="border-b border-border hover:bg-accent">
                    <td className="py-3 px-4 text-blue-600 dark:text-blue-400 font-medium">{coupon.codice}</td>
                    <td className="py-3 px-4 text-foreground">{coupon.tipo}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{coupon.valore}</td>
                    <td className="py-3 px-4 text-foreground">{coupon.minOrdine}</td>
                    <td className="py-3 px-4 text-foreground">{coupon.validoDal}</td>
                    <td className="py-3 px-4 text-foreground">{coupon.validoFino}</td>
                    <td className="py-3 px-4 text-foreground">{coupon.utilizzi}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50">
                        {coupon.stato}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCoupon(coupon.codice)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCoupon(coupon.codice)}
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
      {/* Nuovo Coupon Modal */}
      <Dialog open={openNewCoupon} onOpenChange={setOpenNewCoupon} forceDark={false}>
        <DialogContent>
          <DialogHeader onClose={() => setOpenNewCoupon(false)}>
            <DialogTitle>Nuovo Coupon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Codice <span className="text-destructive">*</span></label>
              <Input value={codice} onChange={(e) => setCodice(e.target.value)} placeholder="Es. ESTATE2024" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Tipo Sconto <span className="text-destructive">*</span></label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="flex h-10 w-full rounded-md border border-gray-300 bg-white dark:bg-black px-3 py-2 text-sm text-gray-900 dark:text-white">
                  <option>Importo Fisso (€)</option>
                  <option>Percentuale (%)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Valore <span className="text-destructive">*</span></label>
                <Input value={valore} onChange={(e) => setValore(e.target.value)} placeholder="10.00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Importo Minimo Ordine (€)</label>
                <Input value={minOrdine} onChange={(e) => setMinOrdine(e.target.value)} placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Sconto Massimo (€) - Non applicabile</label>
                <Input value={scontoMax} onChange={(e) => setScontoMax(e.target.value)} placeholder="0.00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Valido Dal</label>
                <Input value={validoDal} onChange={(e) => setValidoDal(e.target.value)} placeholder="gg/mm/aaaa" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Valido Fino</label>
                <Input value={validoFino} onChange={(e) => setValidoFino(e.target.value)} placeholder="gg/mm/aaaa" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Limite Utilizzi</label>
              <Input value={limiteUtilizzi} onChange={(e) => setLimiteUtilizzi(e.target.value)} placeholder="Illimitato" />
              <p className="text-xs text-muted-foreground mt-1">Lascia vuoto per utilizzi illimitati</p>
            </div>

            <div className="rounded-lg border p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">Coupon Attivo</div>
                <div className="text-sm text-muted-foreground">Disattiva il coupon per renderlo inutilizzabile</div>
              </div>
              <button
                type="button"
                onClick={() => setCouponAttivoToggle(prev => !prev)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${couponAttivoToggle ? 'bg-black' : 'bg-muted'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${couponAttivoToggle ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setOpenNewCoupon(false)}>Annulla</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => {
                // basic validation and add
                if (!codice.trim()) return alert('Inserisci il codice')
                const nuovo: Coupon = {
                  codice,
                  tipo: tipo === 'Percentuale (%)' ? 'Percentuale' : tipo,
                  valore: tipo.includes('Percentuale') ? (valore.endsWith('%') ? valore : valore + '%') : valore,
                  minOrdine: minOrdine ? `€${minOrdine}` : '-',
                  validoDal: validoDal || '-',
                  validoFino: validoFino || '-',
                  utilizzi: limiteUtilizzi ? Number(limiteUtilizzi) : 0,
                  stato: couponAttivoToggle ? 'Attivo' : 'Inattivo'
                }
                setCouponAttivi(prev => [nuovo, ...prev])
                setOpenNewCoupon(false)
                // reset
                setCodice('')
                setValore('')
                setMinOrdine('0.00')
                setScontoMax('0.00')
                setValidoDal('')
                setValidoFino('')
                setLimiteUtilizzi('')
                setCouponAttivoToggle(true)
              }}>Crea Coupon</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
