import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  TrendingUp, 
  Edit3, 
  Save, 
  BarChart3,
  Calculator,
  Download,
  Percent,
  Euro,
  Target,
  Package,
  Users,
  Zap,
  Gift,
  Clock,
  AlertTriangle,
  CheckCircle,
  Star,
  PieChart,
  LineChart
} from "lucide-react"
import { useState } from "react"

const categoriesProdotti = [
  { name: "Freni e Dischi", icon: Target, count: 89, avgMargin: "38%", color: "bg-red-500" },
  { name: "Sospensioni", icon: Package, count: 67, avgMargin: "42%", color: "bg-blue-500" },
  { name: "Scarichi", icon: TrendingUp, count: 45, avgMargin: "35%", color: "bg-orange-500" },
  { name: "Pneumatici", icon: Package, count: 156, avgMargin: "25%", color: "bg-green-500" },
  { name: "Carene & Accessori", icon: Package, count: 234, avgMargin: "45%", color: "bg-purple-500" },
  { name: "Abbigliamento", icon: Package, count: 198, avgMargin: "55%", color: "bg-pink-500" }
]

const tipiListino = [
  { 
    name: "B2C - Privati", 
    icon: Users, 
    description: "Clienti finali", 
    ricarico: 45, 
    attivo: true,
    colore: "bg-blue-500"
  },
  { 
    name: "B2B - Rivenditori", 
    icon: Package, 
    description: "Concessionari e officine", 
    ricarico: 25, 
    attivo: true,
    colore: "bg-green-500"
  },
  { 
    name: "Racing - Competizioni", 
    icon: Zap, 
    description: "Prodotti da gara", 
    ricarico: 35, 
    attivo: true,
    colore: "bg-red-500"
  },
  { 
    name: "Stagionale - Inverno", 
    icon: Clock, 
    description: "Prezzi ridotti off-season", 
    ricarico: 20, 
    attivo: false,
    colore: "bg-orange-500"
  }
]

const promozioniAttive = [
  {
    nome: "Black Friday Freni",
    categoria: "Freni e Dischi",
    sconto: 20,
    dataInizio: "2025-11-15",
    dataFine: "2025-11-30",
    prodottiCoinvolti: 34,
    venditeGenerate: 127,
    stato: "attiva"
  },
  {
    nome: "Kit Sospensioni Bundle",
    categoria: "Sospensioni",
    sconto: 15,
    dataInizio: "2025-11-01",
    dataFine: "2025-12-31",
    prodottiCoinvolti: 12,
    venditeGenerate: 23,
    stato: "attiva"
  }
]

const prodottiEsempio = [
  {
    id: 1,
    nome: "Pastiglie Freno Brembo Z04",
    codice: "BRE-Z04-R1",
    categoria: "Freni e Dischi",
    costoAcquisto: 198.50,
    ricarico: 40,
    prezzoVendita: 277.90,
    iva: 22,
    prezzoFinale: 339.04,
    margine: 79.40,
    percentualeMargine: 28.6,
    venditeUltimoMese: 24
  }
]

export default function PrezziPage() {
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [prodotti, setProdotti] = useState(prodottiEsempio)
  const [selectedListino, setSelectedListino] = useState("B2C - Privati")
  const [viewMode, setViewMode] = useState<'products' | 'promotions' | 'analytics'>('products')

  const calcolaPrezzi = (costoAcquisto: number, ricarico: number) => {
    const prezzoVendita = costoAcquisto * (1 + ricarico / 100)
    const prezzoConIva = prezzoVendita * 1.22
    const margine = prezzoVendita - costoAcquisto
    const percentualeMargine = (margine / prezzoVendita) * 100
    
    return { prezzoVendita, prezzoConIva, margine, percentualeMargine }
  }

  const updateProduct = (id: number, field: string, value: number) => {
    setProdotti(prev => prev.map(product => {
      if (product.id === id) {
        const updated = { ...product, [field]: value }
        
        if (field === 'costoAcquisto' || field === 'ricarico') {
          const calcolati = calcolaPrezzi(
            field === 'costoAcquisto' ? value : updated.costoAcquisto,
            field === 'ricarico' ? value : updated.ricarico
          )
          return {
            ...updated,
            prezzoVendita: Number(calcolati.prezzoVendita.toFixed(2)),
            prezzoFinale: Number(calcolati.prezzoConIva.toFixed(2)),
            margine: Number(calcolati.margine.toFixed(2)),
            percentualeMargine: Number(calcolati.percentualeMargine.toFixed(1))
          }
        }
        return updated
      }
      return product
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Gestione Prezzi Avanzata</CardTitle>
              <p className="text-sm text-muted-foreground">Sistema completo per pricing, promozioni e analytics per articoli moto</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Esporta
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold">
              <Save className="h-4 w-4 mr-2" />
              Salva Modifiche
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b">
        <Button 
          variant={viewMode === 'products' ? 'default' : 'ghost'}
          onClick={() => setViewMode('products')}
          className="rounded-b-none"
        >
          <Package className="h-4 w-4 mr-2" />
          Multi-Listino
        </Button>
        <Button 
          variant={viewMode === 'promotions' ? 'default' : 'ghost'}
          onClick={() => setViewMode('promotions')}
          className="rounded-b-none"
        >
          <Gift className="h-4 w-4 mr-2" />
          Promozioni
        </Button>
        <Button 
          variant={viewMode === 'analytics' ? 'default' : 'ghost'}
          onClick={() => setViewMode('analytics')}
          className="rounded-b-none"
        >
          <PieChart className="h-4 w-4 mr-2" />
          Analytics AI
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Euro className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-600">€847K</h3>
                <p className="text-sm text-muted-foreground">Ricavi Totali</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Percent className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-600">37.2%</h3>
                <p className="text-sm text-muted-foreground">Margine Medio</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-600">789</h3>
                <p className="text-sm text-muted-foreground">Prodotti Attivi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calculator className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-600">4</h3>
                <p className="text-sm text-muted-foreground">Listini Attivi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Multi-Listino View */}
      {viewMode === 'products' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Sistema Multi-Listino
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tipiListino.map((listino) => {
                  const IconComponent = listino.icon
                  return (
                    <Card 
                      key={listino.name} 
                      className={`cursor-pointer transition-all ${
                        selectedListino === listino.name 
                          ? 'ring-2 ring-blue-500 bg-blue-50/20 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600' 
                          : 'hover:shadow-md'
                      } ${!listino.attivo ? 'opacity-50' : ''}`}
                      onClick={() => listino.attivo && setSelectedListino(listino.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 ${listino.colore} rounded-lg`}>
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{listino.name}</h4>
                            <p className="text-xs text-muted-foreground">{listino.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                +{listino.ricarico}%
                              </Badge>
                              {listino.attivo ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Clock className="h-3 w-3 text-orange-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Categorie Prodotti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoriesProdotti.map((categoria) => {
                  const IconComponent = categoria.icon
                  return (
                    <Card key={categoria.name} className="hover:shadow-md transition-shadow cursor-pointer border-l-4"
                          style={{ borderLeftColor: categoria.color.replace('bg-', '#').replace('-500', '') }}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${categoria.color} rounded-lg`}>
                              <IconComponent className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{categoria.name}</h4>
                              <p className="text-xs text-muted-foreground">{categoria.count} prodotti</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="font-semibold">
                              {categoria.avgMargin}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">margine medio</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Prodotti Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Gestione Prezzi Prodotti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prodotti.map((prodotto) => (
                  <Card key={prodotto.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold">{prodotto.nome}</h4>
                          <p className="text-sm text-muted-foreground">{prodotto.codice}</p>
                          <Badge variant="outline" className="mt-1">{prodotto.categoria}</Badge>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Costo Acquisto</label>
                          {editingProduct === prodotto.id ? (
                            <Input
                              type="number"
                              step="0.01"
                              value={prodotto.costoAcquisto}
                              onChange={(e) => updateProduct(prodotto.id, 'costoAcquisto', Number(e.target.value))}
                              className="h-8"
                            />
                          ) : (
                            <p className="font-semibold">€{prodotto.costoAcquisto.toFixed(2)}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Ricarico %</label>
                          {editingProduct === prodotto.id ? (
                            <Input
                              type="number"
                              value={prodotto.ricarico}
                              onChange={(e) => updateProduct(prodotto.id, 'ricarico', Number(e.target.value))}
                              className="h-8"
                            />
                          ) : (
                            <p className="font-semibold text-blue-600">{prodotto.ricarico}%</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Prezzo Finale</label>
                          <p className="font-bold text-green-600 text-lg">€{prodotto.prezzoFinale.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">IVA incl.</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Margine</label>
                          <p className="font-bold text-orange-600">€{prodotto.margine.toFixed(2)}</p>
                          <p className="text-xs text-green-600">{prodotto.percentualeMargine.toFixed(1)}%</p>
                          <Button
                            variant={editingProduct === prodotto.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setEditingProduct(editingProduct === prodotto.id ? null : prodotto.id)}
                          >
                            <Edit3 className="h-3 w-3 mr-1" />
                            {editingProduct === prodotto.id ? 'Salva' : 'Modifica'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Promotions View */}
      {viewMode === 'promotions' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Sistema Promozioni Automatiche
                </CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Gift className="h-4 w-4 mr-2" />
                  Nuova Promozione
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {promozioniAttive.map((promo, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{promo.nome}</h4>
                            <Badge 
                              variant={promo.stato === 'attiva' ? 'default' : 'secondary'}
                              className={promo.stato === 'attiva' ? 'bg-green-500' : ''}
                            >
                              {promo.stato === 'attiva' ? 'Attiva' : 'Terminata'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Categoria</p>
                              <p className="font-medium">{promo.categoria}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Sconto</p>
                              <p className="font-medium text-red-600">{promo.sconto}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Prodotti</p>
                              <p className="font-medium">{promo.prodottiCoinvolti} articoli</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Vendite Generate</p>
                              <p className="font-medium text-green-600">{promo.venditeGenerate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics View */}
      {viewMode === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  AI Pricing Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Algoritmi ML per Pricing Ottimale</p>
                      <p className="text-xs text-muted-foreground">Analisi Predittiva 2025</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-lg font-bold text-green-600">↗ +18%</p>
                      <p className="text-xs text-muted-foreground">ROI Ottimizzato</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <p className="text-lg font-bold text-blue-600">€125K</p>
                      <p className="text-xs text-muted-foreground">Revenue AI</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <p className="text-lg font-bold text-purple-600">94%</p>
                      <p className="text-xs text-muted-foreground">Precisione AI</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Real-time Market Analysis</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm">🏍️ Racing Products</span>
                      <span className="font-semibold">+15% trending</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm">⚡ Performance Parts</span>
                      <span className="font-semibold">Peak season</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm">🛡️ Safety Gear</span>
                      <span className="font-semibold">Stable demand</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Recommendations & Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Star className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Opportunità Pricing Ottimale</p>
                    <p className="text-sm text-green-700">Kit Freni Brembo: aumenta prezzo del 8% per massimizzare profitto (+€12K/mese previsto)</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Applica
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Trend Seasonale Rilevato</p>
                    <p className="text-sm text-blue-700">Abbigliamento invernale: riduci prezzi del 15% ora per accelerare vendite pre-natalizie</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Programma
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800">Bundle Intelligente Suggerito</p>
                    <p className="text-sm text-purple-700">Crea kit "Preparazione Pista" con sconto 12% (margine previsto +22%)</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Crea Kit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
