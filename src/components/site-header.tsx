import { Bell, Moon, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export function SiteHeader() {
  const [isDark, setIsDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Prefer saved preference in localStorage, otherwise fall back to existing class
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') {
        document.documentElement.classList.add('dark')
        setIsDark(true)
        return
      }
      if (saved === 'light') {
        document.documentElement.classList.remove('dark')
        setIsDark(false)
        return
      }
    } catch (e) {
      // ignore localStorage errors (e.g., privacy mode)
    }

    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      setIsDark(false)
      try { localStorage.setItem('theme', 'light') } catch (e) {}
    } else {
      document.documentElement.classList.add('dark')
      setIsDark(true)
      try { localStorage.setItem('theme', 'dark') } catch (e) {}
    }
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  const { pathname } = useLocation()

  const pathTitles: Record<string, string> = {
    "/": "Dashboard",
    "/creazione-rapida": "Creazione rapida",
    "/pannello-controllo": "Ordini",
    "/ciclo-vitale": "File",
    "/analisi": "Prezzi",
    "/progetti": "Progetti",
    "/squadra": "Squadra",
    "/biblioteca-dati": "Biblioteca dati",
    "/rapporti": "Rapporti",
    "/assistente-parole": "Assistente parole",
    "/file": "File",
  }

  const formatSegment = (seg: string) =>
    seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())

  const title =
    pathTitles[pathname] ||
    (pathname.split("/").filter(Boolean).pop() ? formatSegment(pathname.split("/").filter(Boolean).pop() as string) : "Dashboard")

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4 relative">
        <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full border-2 border-cyan-400">
          {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-yellow-500" />}
        </Button>
        <div className="relative">
          <Button variant="outline" size="icon" onClick={toggleNotifications} className="rounded-full border-2 border-cyan-400">
            <Bell className="h-5 w-5 text-yellow-500" />
          </Button>
          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-md border bg-card p-4 shadow-lg">
              <h3 className="mb-3 font-semibold">Notifiche</h3>
              <div className="space-y-2">
                <div className="rounded-md border p-3">
                  <p className="text-sm font-medium">Nuovo ordine ricevuto</p>
                  <p className="text-xs text-muted-foreground">2 minuti fa</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-sm font-medium">Aggiornamento sistema</p>
                  <p className="text-xs text-muted-foreground">1 ora fa</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-sm font-medium">Report mensile disponibile</p>
                  <p className="text-xs text-muted-foreground">3 ore fa</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Button variant="outline" size="icon" onClick={handleLogout} title="Esci" className="rounded-full border-2 border-cyan-400">
          <User className="h-5 w-5 text-yellow-500" />
        </Button>
      </div>
    </header>
  )
}
