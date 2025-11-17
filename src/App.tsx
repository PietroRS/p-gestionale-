import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppSidebar } from './components/app-sidebar'
import { SiteHeader } from './components/site-header'
import { ProtectedRoute } from './components/ProtectedRoute'
import LoginPage from './pages/login'
import DashboardPage from './app/dashboard/page'
import CreazioneRapidaPage from './pages/dashboard'
import PannelloControlloPage from './pages/ordini'
import CicloVitalePage from './pages/file'
import AnalisiPage from './pages/prezzi'
import ProgettiPage from './pages/spedizioni'
import SquadraPage from './pages/tecnologie'
import BibliotecaDatiPage from './pages/coupon'
import RapportiPage from './pages/utenti'
import AssistenteParolePage from './pages/impostazioni'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <SiteHeader />
        
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/creazione-rapida"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreazioneRapidaPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/pannello-controllo"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PannelloControlloPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/ciclo-vitale"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CicloVitalePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analisi"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnalisiPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/progetti"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProgettiPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/squadra"
          element={
            <ProtectedRoute>
              <AppLayout>
                <SquadraPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/biblioteca-dati"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BibliotecaDatiPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/rapporti"
          element={
            <ProtectedRoute>
              <AppLayout>
                <RapportiPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/assistente-parole"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AssistenteParolePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
