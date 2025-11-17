import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div>
      {/* Tabs Section */}
      <div className="flex gap-2 border-b">
        <Button variant="ghost" className="border-b-2 border-primary">
          Schema
        </Button>
        <Button variant="ghost">
          Performance passate <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">3</span>
        </Button>
        <Button variant="ghost">
          Personale chiave <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">2</span>
        </Button>
        <Button variant="ghost">
          Documenti di messa a fuoco
        </Button>
        <Button variant="ghost" className="ml-auto">
          🗂️ Personalizza colonne
        </Button>
        <Button variant="ghost">
          ➕ Aggiungi sezione
        </Button>
      </div>
    </div>
  )
}
