import { SectionCard } from "@/components/section-cards"
import { Button } from "@/components/ui/button"
import { data } from "@/data.json"

export default function CreazioneRapidaPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Crea velocemente nuovi progetti, task o documenti.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SectionCard
            title="Ricavi totali"
            value={data.ricaviTotali.value}
            currency={data.ricaviTotali.currency}
            trend={data.ricaviTotali.trend}
            subtitle={data.ricaviTotali.subtitle}
            description={data.ricaviTotali.description}
          />
          <SectionCard
            title="Nuovi clienti"
            value={data.nuoviClienti.value}
            trend={data.nuoviClienti.trend}
            subtitle={data.nuoviClienti.subtitle}
            description={data.nuoviClienti.description}
          />
          <SectionCard
            title="Account attivi"
            value={data.accountAttivi.value}
            trend={data.accountAttivi.trend}
            subtitle={data.accountAttivi.subtitle}
            description={data.accountAttivi.description}
          />
          <SectionCard
            title="Tasso di crescita"
            value={data.tassoCrescita.value}
            trend={data.tassoCrescita.trend}
            subtitle={data.tassoCrescita.subtitle}
            description={data.tassoCrescita.description}
          />
        </div>

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
    </div>
  )
}
