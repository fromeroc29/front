import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './views/auth/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import LoginPage from './views/auth/LoginPage';
import RegisterPage from './views/auth/RegisterPage';
import DashboardPage from './views/dashboard/DashboardPage';
import MarcaPage from './views/marcas/MarcaPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas (sin sidebar) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Rutas protegidas (con sidebar) */}
          <Route path="/*" element={
            <ProtectedRoute>
              <MainLayout>
                <AppRoutes />
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/marcas" element={<MarcaPage />} />
      <Route path="/inventario" element={<Placeholder title="Inventario" />} />
      <Route path="/piezas" element={<Placeholder title="Piezas" />} />
      <Route path="/ventas" element={<Placeholder title="Ventas" />} />
      <Route path="/clientes" element={<Placeholder title="Clientes" />} />
      <Route path="/compatibilidad" element={<Placeholder title="Compatibilidad" />} />
      <Route path="/reportes" element={<Placeholder title="Reportes" />} />
      <Route path="/configuracion" element={<Placeholder title="Configuración" />} />
    </Routes>
  );
}

function Placeholder({ title }) {
  return (
    <div className="placeholder">
      <h2>{title}</h2>
      <p>Módulo en desarrollo...</p>
    </div>
  );
}

export default App;