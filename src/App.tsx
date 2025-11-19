import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppSidebar } from './components/app-sidebar'
import { SiteHeader } from './components/site-header'
import { ProtectedRoute } from './components/ProtectedRoute'
import LoginPage from './pages/login'
import DashboardPage from './app/dashboard/page'
import CreazioneRapidaPage from './pages/dashboard'
import FilePage from './pages/file'
import PrezziPage from './pages/prezzi' 
import SpedizioniPage from './pages/spedizioni'
import TecnologiePage from './pages/tecnologie'
import CouponPage from './pages/coupon'
import UtentiPage from './pages/utenti'
import ImpostazioniPage from './pages/impostazioni'
import Ordini from './pages/ordini'

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
          path="/ordini"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Ordini/>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        
        
        <Route
          path="/prezzi"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PrezziPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/spedizioni"
          element={
            <ProtectedRoute>
              <AppLayout>
                <SpedizioniPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/tecnologie"
          element={
            <ProtectedRoute>
              <AppLayout>
                <TecnologiePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        
        <Route
          path="/coupon"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CouponPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/utenti"
          element={
            <ProtectedRoute>
              <AppLayout>
                <UtentiPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/impostazioni"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ImpostazioniPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/file"
          element={
            <ProtectedRoute>
              <AppLayout>
                <FilePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
