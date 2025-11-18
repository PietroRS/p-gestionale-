import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Eye, Mail, Phone, Download, Trash2, Search, X, Users, Filter, PlusCircle, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"

interface Utente {
  id: string
  nome: string
  cognome: string
  email: string
  telefono: string
  ruolo: string
  stato: string
  dataRegistrazione: string
  avatar?: string
}

const utentiIniziali: Utente[] = [
  {
    id: "USR-001",
    nome: "Pietro",
    cognome: "Carbone",
    email: "pietrocarbone98@gmail.com",
    telefono: "+39 340 1234567",
    ruolo: "Amministratore",
    stato: "Attivo",
    dataRegistrazione: "01/01/2024"
  },
  {
    id: "USR-002",
    nome: "Marco",
    cognome: "Bianchi",
    email: "marco.bianchi@email.it",
    telefono: "+39 345 7654321",
    ruolo: "Manager",
    stato: "Attivo",
    dataRegistrazione: "15/03/2024"
  },
  {
    id: "USR-003",
    nome: "Laura",
    cognome: "Verdi",
    email: "laura.verdi@email.it",
    telefono: "+39 320 9876543",
    ruolo: "Operatore",
    stato: "Attivo",
    dataRegistrazione: "22/05/2024"
  },
  {
    id: "USR-004",
    nome: "Giuseppe",
    cognome: "Rossi",
    email: "giuseppe.rossi@email.it",
    telefono: "+39 333 4567890",
    ruolo: "Operatore",
    stato: "Inattivo",
    dataRegistrazione: "10/08/2024"
  }
]

const getRuoloBadge = (ruolo: string) => {
  switch (ruolo) {
    case "Amministratore":
      return <Badge className="bg-red-600 hover:bg-red-700 text-white border-0">👑 Amministratore</Badge>
    case "Manager":
      return <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0">🎯 Manager</Badge>
    case "Operatore":
      return <Badge className="bg-green-600 hover:bg-green-700 text-white border-0">👤 Operatore</Badge>
    default:
      return <Badge className="text-white">{ruolo}</Badge>
  }
}

const getStatoBadge = (stato: string) => {
  return stato === "Attivo" 
    ? <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950">● Attivo</Badge>
    : <Badge variant="outline" className="border-gray-500 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950">● Inattivo</Badge>
}

export default function RapportiPage() {
  // Funzione per caricare utenti dal localStorage
  const loadUtenti = () => {
    const saved = localStorage.getItem('gestionale-utenti')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error('Errore nel caricamento utenti:', error)
        return utentiIniziali
      }
    }
    return utentiIniziali
  }

  // Funzione per salvare utenti nel localStorage
  const saveUtenti = (newUtenti: Utente[]) => {
    try {
      localStorage.setItem('gestionale-utenti', JSON.stringify(newUtenti))
    } catch (error) {
      console.error('Errore nel salvataggio utenti:', error)
    }
  }

  const [utenti, setUtenti] = useState<Utente[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    ruolo: "Operatore"
  })

  // Carica utenti all'avvio del componente
  useEffect(() => {
    const loadedUtenti = loadUtenti()
    setUtenti(loadedUtenti)
  }, [])
  
  const filteredUtenti = utenti.filter(utente => 
    utente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    utente.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    utente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    utente.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const nuovoUtente: Utente = {
      id: `USR-${String(utenti.length + 1).padStart(3, '0')}`,
      nome: formData.nome,
      cognome: formData.cognome,
      email: formData.email,
      telefono: formData.telefono,
      ruolo: formData.ruolo,
      stato: "Attivo",
      dataRegistrazione: new Date().toLocaleDateString('it-IT')
    }

    const newUtenti = [...utenti, nuovoUtente]
    setUtenti(newUtenti)
    saveUtenti(newUtenti) // Salva nel localStorage
    
    setFormData({
      nome: "",
      cognome: "",
      email: "",
      telefono: "",
      ruolo: "Operatore"
    })
    setShowForm(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredUtenti.map(u => u.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedIds(newSelected)
  }

  const handleDeleteUser = (userId: string) => {
    const newUtenti = utenti.filter(u => u.id !== userId)
    setUtenti(newUtenti)
    saveUtenti(newUtenti)
    
    // Rimuovi dalla selezione se era selezionato
    const newSelected = new Set(selectedIds)
    newSelected.delete(userId)
    setSelectedIds(newSelected)
  }

  const handleViewUser = (utente: Utente) => {
    alert(`Visualizzazione utente: ${utente.nome} ${utente.cognome}\nEmail: ${utente.email}\nRuolo: ${utente.ruolo}`)
  }

  const handleDownloadUser = (utente: Utente) => {
    const userData = `Nome: ${utente.nome} ${utente.cognome}\nEmail: ${utente.email}\nTelefono: ${utente.telefono}\nRuolo: ${utente.ruolo}\nStato: ${utente.stato}\nRegistrazione: ${utente.dataRegistrazione}`
    const blob = new Blob([userData], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `utente_${utente.nome}_${utente.cognome}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Utenti</CardTitle>
              <p className="text-sm text-muted-foreground">Gestisci gli utenti che hanno accesso al gestionale</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white gap-2 px-6 py-3 rounded-full font-semibold transition-transform duration-150 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            >
              <PlusCircle className="h-4 w-4" />
              Nuovo Utente
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-150 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">Aggiorna</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Form Nuovo Utente */}
      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Nuovo Utente</CardTitle>
                <CardDescription>Compila i campi per aggiungere un nuovo utente</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome *</label>
                  <Input 
                    name="nome"
                    placeholder="Inserisci il nome" 
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cognome *</label>
                  <Input 
                    name="cognome"
                    placeholder="Inserisci il cognome" 
                    value={formData.cognome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input 
                    name="email"
                    type="email"
                    placeholder="email@esempio.it" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefono *</label>
                  <Input 
                    name="telefono"
                    placeholder="+39 123 4567890" 
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ruolo *</label>
                <select 
                  name="ruolo"
                  value={formData.ruolo}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="Operatore">Operatore</option>
                  <option value="Manager">Manager</option>
                  <option value="Amministratore">Amministratore</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Annulla
                </Button>
                <Button type="submit">
                  Salva Utente
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Totale Utenti</div>
          <div className="mt-2 text-2xl font-bold">{filteredUtenti.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Attivi</div>
          <div className="mt-2 text-2xl font-bold text-green-600">
            {filteredUtenti.filter(u => u.stato === "Attivo").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Amministratori</div>
          <div className="mt-2 text-2xl font-bold text-red-600">
            {filteredUtenti.filter(u => u.ruolo === "Amministratore").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">Manager</div>
          <div className="mt-2 text-2xl font-bold text-blue-600">
            {filteredUtenti.filter(u => u.ruolo === "Manager").length}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4 bg-muted/30">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Cerca utenti per nome, email o ID..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="default" className="gap-2">
          <Filter className="h-4 w-4" />
          Tutti gli stati
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-150 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
          Aggiorna
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-4 py-3 w-12">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                    checked={selectedIds.size === filteredUtenti.length && filteredUtenti.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Utente</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contatti</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ruolo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stato</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Registrazione</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredUtenti.map((utente) => (
                <tr 
                  key={utente.id} 
                  className={`border-b transition-colors hover:bg-muted/30 ${
                    selectedIds.has(utente.id) ? 'bg-muted/50' : ''
                  }`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      checked={selectedIds.has(utente.id)}
                      onChange={(e) => handleSelectRow(utente.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-mono text-sm font-medium">{utente.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-sm font-semibold text-white">
                        {utente.nome[0]}{utente.cognome[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{utente.nome} {utente.cognome}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {utente.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {utente.telefono}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getRuoloBadge(utente.ruolo)}
                  </td>
                  <td className="px-4 py-4">
                    {getStatoBadge(utente.stato)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-muted-foreground">{utente.dataRegistrazione}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="p-1.5 rounded hover:bg-muted transition-colors" 
                        title="Visualizza"
                        onClick={() => handleViewUser(utente)}
                      >
                        <Eye className="h-4 w-4 text-blue-500" />
                      </button>
                      <button 
                        className="p-1.5 rounded hover:bg-muted transition-colors" 
                        title="Scarica"
                        onClick={() => handleDownloadUser(utente)}
                      >
                        <Download className="h-4 w-4 text-green-500" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button 
                            className="p-1.5 rounded hover:bg-muted transition-colors" 
                            title="Elimina"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              Elimina Utente
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Sei sicuro di voler eliminare <strong>{utente.nome} {utente.cognome}</strong>?
                              <br /><br />
                              <span className="text-red-600 font-medium">
                                Questa azione non può essere annullata.
                              </span>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annulla</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteUser(utente.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Elimina
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{filteredUtenti.length}</span> di <span className="font-medium">{utenti.length}</span> utenti
          </p>
        </div>
      </div>
    </div>
  )
}
