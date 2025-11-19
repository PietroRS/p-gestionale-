import { Home, Zap, Activity, FolderKanban, Users, FileText, Database, MessageSquare, MoreHorizontal, Rocket, LayoutGrid, Package, FileIcon, TrendingUp, Truck, Layers, Tag, Settings, LogOut } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center">
          <img
            src="/logo-motosport.svg"
            alt="Moto Sport Logo"
            className="h-10 w-10 object-contain"
            style={{
              filter: 'none'
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">MotoSport</span>
          <span className="text-xs text-muted-foreground">Pannello Amministrazione</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <Link 
          to="/"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <LayoutGrid className="h-4 w-4" />
            <span className="font-medium">Dashboard</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Panoramica generale</span>
        </Link>

        <Link 
          to="/ordini"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/ordini") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/ordini") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <Package className="h-4 w-4" />
            <span className="font-medium">Ordini</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Gestione ordini</span>
        </Link>

        <Link 
          to="/file"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/file") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/file") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <FileIcon className="h-4 w-4" />
            <span className="font-medium">File</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Gestione file caricati</span>
        </Link>

        <Link 
          to="/prezzi"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/prezzi") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/prezzi") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">Prezzi</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Configurazione prezzi</span>
        </Link>

        <Link 
          to="/spedizioni"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/spedizioni") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/spedizioni") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <Truck className="h-4 w-4" />
            <span className="font-medium">Spedizioni</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Gestione spedizioni</span>
        </Link>

        <Link 
          to="/tecnologie"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/tecnologie") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/tecnologie") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <Layers className="h-4 w-4" />
            <span className="font-medium">Tecnologie & Materiali</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Gestione tecnologie e materiali</span>
        </Link>

        <Link 
          to="/coupon"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/coupon") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/coupon") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <Tag className="h-4 w-4" />
            <span className="font-medium">Coupon & Sconti</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Gestione coupon e sconti</span>
        </Link>

        <Link 
          to="/utenti"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/utenti") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/utenti") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4" />
            <span className="font-medium">Utenti</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Gestione utenti</span>
        </Link>

        <Link 
          to="/impostazioni"
          className={cn(
            "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-sm relative",
            isActive("/impostazioni") 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {isActive("/impostazioni") && (
            <div className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l" />
          )}
          <div className="flex items-center gap-3">
            <Settings className="h-4 w-4" />
            <span className="font-medium">Impostazioni</span>
          </div>
          <span className="text-xs text-muted-foreground ml-7">Impostazioni di sistema</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="border-t p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-destructive hover:bg-accent"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Disconnetti</span>
        </button>
      </div>
    </aside>
  )
}
