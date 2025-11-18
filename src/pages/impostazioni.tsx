import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings } from "lucide-react"
import { useState } from "react"

export default function AssistenteParolePage() {
  const [maintenanceMode, setMaintenanceMode] = useState(true)
  const [formData, setFormData] = useState({
    nomeAzienda: "ACME Inc",
    partitaIva: "IT12345678901",
    emailAmministratore: "acmenc@acme3d.com",
    dimensioneMaxFile: "100",
    nomeBanca: "Intesa Sanpaolo",
    intestatarioConto: "ACME Tecno 3D S.r.l.",
    iban: "IT60X0542811101000002345",
    bicSwift: "BPMIITMXXXX"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Salvataggio impostazioni:", formData)
    // Logica di salvataggio
  }

  return (
    <div className="p-6 space-y-6">
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Impostazioni Sistema</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configura le impostazioni globali, i dati aziendali e le informazioni bancarie della piattaforma.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border border-border">
        <CardContent className="pt-6 space-y-6">
          {/* Modalità Manutenzione */}
          <div className="bg-amber-100 dark:bg-gray-900 border border-amber-300 dark:border-amber-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-white mb-1">Modalità Manutenzione</h3>
                <p className="text-sm text-amber-800 dark:text-white">
                  Attiva questa modalità per impedire nuovi ordini e mostrare un messaggio di manutenzione agli utenti
                </p>
              </div>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  maintenanceMode ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    maintenanceMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Grid 2 colonne */}
          <div className="grid grid-cols-2 gap-4">
            {/* Nome Azienda */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome Azienda</label>
              <Input
                value={formData.nomeAzienda}
                onChange={(e) => handleInputChange("nomeAzienda", e.target.value)}
              />
            </div>

            {/* Partita IVA */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Partita IVA</label>
              <Input
                value={formData.partitaIva}
                onChange={(e) => handleInputChange("partitaIva", e.target.value)}
              />
            </div>

            {/* Email Amministratore */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Amministratore</label>
              <Input
                type="email"
                value={formData.emailAmministratore}
                onChange={(e) => handleInputChange("emailAmministratore", e.target.value)}
              />
            </div>

            {/* Dimensione Max File */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Dimensione Max File (MB)</label>
              <Input
                type="number"
                value={formData.dimensioneMaxFile}
                onChange={(e) => handleInputChange("dimensioneMaxFile", e.target.value)}
              />
            </div>

            {/* Nome Banca */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome Banca</label>
              <Input
                value={formData.nomeBanca}
                onChange={(e) => handleInputChange("nomeBanca", e.target.value)}
              />
            </div>

            {/* Intestatario Conto */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Intestatario Conto</label>
              <Input
                value={formData.intestatarioConto}
                onChange={(e) => handleInputChange("intestatarioConto", e.target.value)}
              />
            </div>

            {/* IBAN */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">IBAN</label>
              <Input
                value={formData.iban}
                onChange={(e) => handleInputChange("iban", e.target.value)}
              />
            </div>

            {/* BIC/SWIFT */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">BIC/SWIFT</label>
              <Input
                value={formData.bicSwift}
                onChange={(e) => handleInputChange("bicSwift", e.target.value)}
              />
            </div>
          </div>

          {/* Pulsante Salva */}
          <Button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold"
          >
            <Settings className="mr-2 h-5 w-5" />
            Salva Impostazioni Sistema
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
