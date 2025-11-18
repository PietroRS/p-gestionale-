import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function AssistenteParolePage() {
  return (
    <div className="p-6 space-y-6">
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Impostazioni</CardTitle>
              <p className="text-sm text-muted-foreground">Configura le impostazioni del sistema</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Aggiorna</Button>
        </CardHeader>
      </Card>
    </div>
  )
}
