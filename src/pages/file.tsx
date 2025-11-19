import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  FileIcon, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  FileText,
  Image,
  FileSpreadsheet,
  Award,
  Settings,
  ShoppingBag
} from "lucide-react"
import FileUploader, { FilePreviewModal } from "@/components/ui/file-uploader"
import { useState, useEffect } from "react"

const fileCategories = [
  { name: "Schede Tecniche", icon: FileText, count: 127, color: "bg-blue-500" },
  { name: "Certificazioni", icon: Award, count: 45, color: "bg-green-500" },
  { name: "Cataloghi", icon: ShoppingBag, count: 23, color: "bg-purple-500" },
  { name: "Fatture", icon: FileSpreadsheet, count: 89, color: "bg-orange-500" },
  { name: "Manuali", icon: Settings, count: 34, color: "bg-red-500" },
  { name: "Immagini", icon: Image, count: 256, color: "bg-pink-500" }
]

const certificazioni = [
  { 
    name: "Certificazione CE - Freni Brembo Z04", 
    filename: "CE_Brembo_Z04.html",
    category: "CE - Componenti Frenanti", 
    size: "1.8 MB", 
    date: "15 Nov 2025", 
    validUntil: "15 Nov 2027",
    type: "html",
    downloadUrl: "/documents/certifications/CE_Brembo_Z04.html"
  },
  { 
    name: "DOT Approved - Caschi Arai RX-7V", 
    filename: "DOT_Arai_RX7V.html",
    category: "DOT - Caschi", 
    size: "2.1 MB", 
    date: "10 Nov 2025", 
    validUntil: "10 Nov 2028",
    type: "html",
    downloadUrl: "/documents/certifications/DOT_Arai_RX7V.html"
  },
  { 
    name: "ECE R22.06 - Caschi Shoei GT-Air", 
    filename: "ECE_Shoei_GTAir.pdf",
    category: "ECE - Caschi", 
    size: "1.9 MB", 
    date: "8 Nov 2025", 
    validUntil: "8 Nov 2027",
    type: "pdf",
    downloadUrl: "/documents/certifications/ECE_Shoei_GTAir.pdf"
  },
  { 
    name: "Certificazione CE - Scarichi Akrapovic", 
    filename: "CE_Akrapovic_Evolution.html",
    category: "CE - Sistemi Scarico", 
    size: "3.2 MB", 
    date: "5 Nov 2025", 
    validUntil: "5 Nov 2026",
    type: "html",
    downloadUrl: "/documents/certifications/CE_Akrapovic_Evolution.html"
  },
  { 
    name: "FIM Approved - Tute Alpinestars GP Pro", 
    filename: "FIM_Alpinestars_GPPro.pdf",
    category: "FIM - Abbigliamento Racing", 
    size: "2.7 MB", 
    date: "3 Nov 2025", 
    validUntil: "3 Nov 2027",
    type: "pdf",
    downloadUrl: "/documents/certifications/FIM_Alpinestars_GPPro.pdf"
  },
  { 
    name: "Certificazione CE - Pneumatici Pirelli Diablo", 
    filename: "CE_Pirelli_Diablo.pdf",
    category: "CE - Pneumatici", 
    size: "1.4 MB", 
    date: "1 Nov 2025", 
    validUntil: "1 Nov 2026",
    type: "pdf",
    downloadUrl: "/documents/certifications/CE_Pirelli_Diablo.pdf"
  },
  { 
    name: "TÜV Approved - Sospensioni Öhlins TTX", 
    filename: "TUV_Ohlins_TTX.pdf",
    category: "TÜV - Sospensioni", 
    size: "2.3 MB", 
    date: "28 Ott 2025", 
    validUntil: "28 Ott 2027",
    type: "pdf",
    downloadUrl: "/documents/certifications/TUV_Ohlins_TTX.pdf"
  },
  { 
    name: "Certificazione CE - Kit Luci LED Denali", 
    filename: "CE_Denali_LED.pdf",
    category: "CE - Illuminazione", 
    size: "1.1 MB", 
    date: "25 Ott 2025", 
    validUntil: "25 Ott 2026",
    type: "pdf",
    downloadUrl: "/documents/certifications/CE_Denali_LED.pdf"
  }
]

const schedeTecniche = [
  { 
    name: "Scheda Tecnica - Freni Brembo Z04", 
    filename: "Brembo_Z04_DataSheet.html",
    category: "Pastiglie Freno Racing", 
    size: "850 KB", 
    date: "12 Nov 2025", 
    type: "html",
    downloadUrl: "/documents/schede-tecniche/Brembo_Z04_DataSheet.html"
  },
  { 
    name: "Specifiche - Sospensioni Öhlins TTX", 
    filename: "Ohlins_TTX_Specs.html",
    category: "Sospensioni Racing", 
    size: "1.2 MB", 
    date: "10 Nov 2025", 
    type: "html",
    downloadUrl: "/documents/schede-tecniche/Ohlins_TTX_Specs.html"
  },
  { 
    name: "Datasheet - Pneumatici Pirelli Diablo", 
    filename: "Pirelli_Diablo_Tech.html",
    category: "Pneumatici Sport", 
    size: "690 KB", 
    date: "8 Nov 2025", 
    type: "html",
    downloadUrl: "/documents/schede-tecniche/Pirelli_Diablo_Tech.html"
  }
]

const fatture = [
  { 
    name: "Fattura F001234 - Ducati SpA", 
    filename: "F001234_Ducati.html",
    category: "Vendita Componenti", 
    size: "245 KB", 
    date: "15 Nov 2025", 
    amount: "€ 2,847.50",
    type: "html",
    downloadUrl: "/documents/fatture/F001234_Ducati.html"
  },
  { 
    name: "Fattura F001189 - Yamaha Motor", 
    filename: "F001189_Yamaha.html",
    category: "Ricambi Originali", 
    size: "198 KB", 
    date: "12 Nov 2025", 
    amount: "€ 1,456.80",
    type: "html",
    downloadUrl: "/documents/fatture/F001189_Yamaha.html"
  },
  { 
    name: "Fattura F001098 - Honda Racing", 
    filename: "F001098_Honda.html",
    category: "Kit Racing", 
    size: "312 KB", 
    date: "8 Nov 2025", 
    amount: "€ 5,120.00",
    type: "html",
    downloadUrl: "/documents/fatture/F001098_Honda.html"
  }
]

const manuali = [
  { 
    name: "Manuale Installazione - Scarichi Akrapovič", 
    filename: "Akrapovic_Install_Guide.html",
    category: "Sistemi Scarico", 
    size: "2.1 MB", 
    date: "14 Nov 2025", 
    pages: "24 pagine",
    type: "html",
    downloadUrl: "/documents/manuali/Akrapovic_Install_Guide.html"
  },
  { 
    name: "Setup - Sospensioni Öhlins Racing", 
    filename: "Ohlins_Setup_Manual.html",
    category: "Sospensioni", 
    size: "3.8 MB", 
    date: "10 Nov 2025", 
    pages: "45 pagine",
    type: "html",
    downloadUrl: "/documents/manuali/Ohlins_Setup_Manual.html"
  },
  { 
    name: "Guida Manutenzione - Freni Brembo", 
    filename: "Brembo_Maintenance.html",
    category: "Impianti Frenanti", 
    size: "1.6 MB", 
    date: "6 Nov 2025", 
    pages: "18 pagine",
    type: "html",
    downloadUrl: "/documents/manuali/Brembo_Maintenance.html"
  }
]

const cataloghi = [
  { 
    name: "Catalogo Yamaha 2025 - Accessori R1", 
    filename: "Yamaha_R1_2025_Catalog.html",
    category: "Yamaha Racing", 
    size: "8.4 MB", 
    date: "18 Nov 2025", 
    products: "127 prodotti",
    type: "html",
    downloadUrl: "/documents/cataloghi/Yamaha_R1_2025_Catalog.html"
  },
  { 
    name: "Brochure Ducati Panigale V4 Performance", 
    filename: "Ducati_V4_Performance.html",
    category: "Ducati Performance", 
    size: "6.2 MB", 
    date: "14 Nov 2025", 
    products: "89 prodotti",
    type: "html",
    downloadUrl: "/documents/cataloghi/Ducati_V4_Performance.html"
  },
  { 
    name: "Catalogo Kawasaki ZX-10R Track Parts", 
    filename: "Kawasaki_ZX10R_Track.html",
    category: "Kawasaki Racing", 
    size: "5.1 MB", 
    date: "9 Nov 2025", 
    products: "76 prodotti",
    type: "html",
    downloadUrl: "/documents/cataloghi/Kawasaki_ZX10R_Track.html"
  }
]

const immagini = [
  { 
    name: "Gallery Freni Brembo Z04 - Racing", 
    filename: "brembo-z04-gallery.html",
    category: "Componenti Frenanti", 
    size: "3.2 MB", 
    date: "16 Nov 2025", 
    count: "12 immagini HD",
    type: "html",
    downloadUrl: "/images/prodotti/brembo-z04-gallery.html"
  },
  { 
    name: "Foto Prodotto - Scarichi Akrapovič Evolution", 
    filename: "akrapovic-evolution-photos.html",
    category: "Sistemi Scarico", 
    size: "4.8 MB", 
    date: "13 Nov 2025", 
    count: "18 immagini HD",
    type: "html",
    downloadUrl: "/images/prodotti/akrapovic-evolution-photos.html"
  },
  { 
    name: "Images - Sospensioni Öhlins TTX Setup", 
    filename: "ohlins-ttx-images.html",
    category: "Sospensioni Racing", 
    size: "2.7 MB", 
    date: "11 Nov 2025", 
    count: "9 immagini HD",
    type: "html",
    downloadUrl: "/images/prodotti/ohlins-ttx-images.html"
  }
]

const recentFiles = [
  { name: "Freni_Brembo_Z04_Scheda.pdf", category: "Schede Tecniche", size: "2.4 MB", date: "2 ore fa", type: "pdf" },
  { name: "Certificato_CE_Akrapovic.pdf", category: "Certificazioni", size: "1.8 MB", date: "4 ore fa", type: "pdf" },
  { name: "Catalogo_Yamaha_2025.pdf", category: "Cataloghi", size: "12.3 MB", date: "1 giorno fa", type: "pdf" },
  { name: "Sospensioni_Ohlins_R1.jpg", category: "Immagini", size: "956 KB", date: "2 giorni fa", type: "image" },
  { name: "Manuale_Installazione_Termignoni.pdf", category: "Manuali", size: "3.7 MB", date: "3 giorni fa", type: "pdf" },
  { name: "Fattura_F001234_Ducati.xlsx", category: "Fatture", size: "145 KB", date: "1 settimana fa", type: "excel" }
]

export default function FilePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleDownload = (file: any) => {
    // Open certificate in new tab instead of download
    window.open(file.downloadUrl, '_blank')
    
    // Show success message
    alert(`Apertura documento: ${file.filename}`)
  }

  const getCategoryData = (categoryName: string) => {
    switch(categoryName) {
      case "Schede Tecniche": return schedeTecniche
      case "Certificazioni": return certificazioni
      case "Fatture": return fatture
      case "Manuali": return manuali
      case "Cataloghi": return cataloghi
      case "Immagini": return immagini
      default: return []
    }
  }

  // uploaded files stored by FileUploader in localStorage (demo)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('uploadedFiles') || '[]') } catch { return [] }
  })

  useEffect(() => {
    const onStorage = () => setUploadedFiles(JSON.parse(localStorage.getItem('uploadedFiles') || '[]'))
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <FileIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">File</CardTitle>
                <p className="text-sm text-muted-foreground">Organizza documenti, schede tecniche e certificazioni per articoli moto</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold"
                onClick={() => { (document.getElementById('__file_input') as HTMLInputElement | null)?.click() }}
              >
                <Upload className="h-4 w-4 mr-2" />
                Carica File
              </Button>
            </div>
        </CardHeader>
      </Card>

      {/* Uploader */}
      <FileUploader />

      {/* Preview modal rendered at page level so it overlays whole app */}
      {/* The FileUploader exposes blob URL via window event? Simpler: keep preview handled inside uploader; omitted here. */}

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Cerca file per nome, categoria o tipo..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtri
          </Button>
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* File Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fileCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 ${category.color} rounded-lg`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} file</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-semibold">
                    {category.count}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Category Detail View */}
      {selectedCategory && selectedCategory !== "Certificazioni" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  ← Indietro
                </Button>
                <CardTitle className="text-xl">{selectedCategory}</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Tutti
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getCategoryData(selectedCategory).map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-base">{item.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </span>
                        <span>•</span>
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                        {item.amount && (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-green-600">{item.amount}</span>
                          </>
                        )}
                        {item.pages && (
                          <>
                            <span>•</span>
                            <span className="text-blue-600">{item.pages}</span>
                          </>
                        )}
                        {item.products && (
                          <>
                            <span>•</span>
                            <span className="text-purple-600">{item.products}</span>
                          </>
                        )}
                        {item.count && (
                          <>
                            <span>•</span>
                            <span className="text-pink-600">{item.count}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(item)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Visualizza
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificazioni Detail View */}
      {selectedCategory === "Certificazioni" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  ← Indietro
                </Button>
                <CardTitle className="text-xl">Certificazioni</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Tutti
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificazioni.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-base">{cert.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {cert.category}
                          </Badge>
                        </span>
                        <span>•</span>
                        <span>{cert.size}</span>
                        <span>•</span>
                        <span>Emesso: {cert.date}</span>
                        <span>•</span>
                        <span className="text-orange-600">Valido fino: {cert.validUntil}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(cert)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Visualizza Certificato
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Files Section */}
      {!selectedCategory && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">File Recenti</CardTitle>
              <Button variant="outline" size="sm">Vedi tutti</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      {file.type === 'pdf' && <FileText className="h-4 w-4 text-blue-600" />}
                      {file.type === 'image' && <Image className="h-4 w-4 text-green-600" />}
                      {file.type === 'excel' && <FileSpreadsheet className="h-4 w-4 text-orange-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{file.category}</span>
                        <span>•</span>
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Storage Stats */}
      {!selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600">574</h3>
                <p className="text-sm text-muted-foreground">File Totali</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-600">2.8 GB</h3>
                <p className="text-sm text-muted-foreground">Spazio Utilizzato</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">127</h3>
                <p className="text-sm text-muted-foreground">Download Oggi</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Uploaded files (from localStorage) */}
      {!selectedCategory && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Uploaded (demo)</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  localStorage.removeItem('uploadedFiles')
                  setUploadedFiles([])
                }}>
                  Pulisci lista
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {uploadedFiles.length === 0 ? (
              <div className="text-sm text-muted-foreground">Nessun file caricato (demo).</div>
            ) : (
              <div className="space-y-2">
                {uploadedFiles.map((f: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div>
                      <div className="font-medium text-sm">{f.name}</div>
                      <div className="text-xs text-muted-foreground">{(f.size/1024/1024).toFixed(2)} MB • {new Date(f.date).toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{f.type}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
