import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Mail, Phone, MoreHorizontal, Search, UserPlus, X } from "lucide-react"
import { useState } from "react"

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
  const [utenti, setUtenti] = useState<Utente[]>(utentiIniziali)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    ruolo: "Operatore"
  })
  
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

    setUtenti([...utenti, nuovoUtente])
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Utenti</h1>
          <p className="mt-2 text-muted-foreground">
            Gestisci gli utenti che hanno accesso al gestionale
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          Aggiungi Utente
        </Button>
      </div>

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-card p-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Cerca utenti per nome, email o ID..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Utente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Contatti</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Ruolo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Stato</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Registrazione</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUtenti.map((utente) => (
                <tr 
                  key={utente.id} 
                  className="transition-colors hover:bg-muted/50"
                >
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm font-medium">{utente.id}</div>
                  </td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {utente.telefono}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRuoloBadge(utente.ruolo)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatoBadge(utente.stato)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">{utente.dataRegistrazione}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Visualizza dettagli">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Altre azioni">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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
