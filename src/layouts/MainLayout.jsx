import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './MainLayout.css';

import salirIcono from '../iconos/salida.png';



function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { path: '/', icon: '🏠', label: 'Dashboard', roles: ['admin', 'usuario', 'vendedor'] },
    { path: '/marcas', icon: '🏭', label: 'Marcas', roles: ['admin', 'usuario'] },
    { path: '/inventario', icon: '📦', label: 'Inventario', roles: ['admin', 'usuario', 'vendedor'] },
    { path: '/piezas', icon: '🔧', label: 'Piezas', roles: ['admin', 'usuario'] },
    { path: '/ventas', icon: '💰', label: 'Ventas', roles: ['admin', 'vendedor'] },
    { path: '/clientes', icon: '👥', label: 'Clientes', roles: ['admin', 'vendedor'] },
    { path: '/compatibilidad', icon: '🔄', label: 'Compatibilidad', roles: ['admin', 'usuario'] },
    { path: '/reportes', icon: '📊', label: 'Reportes', roles: ['admin'] },
    { path: '/configuracion', icon: '⚙️', label: 'Configuración', roles: ['admin'] },
  ];

  const filteredMenu = menuItems.filter(item => 
    item.roles.includes(user?.rol || 'usuario')
  );

  return (
    <div className={`main-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar fijo */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            {/*<span className="logo-icon">🚗</span>*/}
            {sidebarOpen && <span className="logo-text">Autopartes 3 Hermanos.</span>}
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            {sidebarOpen && (
              <div className="user-details">
                <span className="user-name">{user?.nombre || user?.username}</span>
                <span className="user-role">{user?.rol || 'usuario'}</span>
              </div>
            )}
          </div>

          <img
           src={salirIcono}
           alt="Salir del sistema"
           title="Cerrar sesión"
           draggable="false"
           className="icono-salir"
           onClick={handleLogout}
           />

          {/*{sidebarOpen && (
            
            <button onClick={handleLogout} className="logout-btn">
              🚪 Salir
            </button>
          )}*/}
        </div>

        <nav className="sidebar-nav">
          {filteredMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/*<div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            {sidebarOpen && (
              <div className="user-details">
                <span className="user-name">{user?.nombre || user?.username}</span>
                <span className="user-role">{user?.rol || 'usuario'}</span>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button onClick={handleLogout} className="logout-btn">
              🚪 Salir
            </button>
          )}
        </div>*/}
      </aside>

      {/* Contenido principal */}
      <div className="main-container">
        {/* Header fijo */}
        
        <header className="top-header">
          
          <div className="header-title">
            {/*<table>
            <td>
          <img
           src={toro}
           alt="bussines"
           className="icono-negocio-header"
           />
             

            </td>
            <td>*/}
                <h1>{getPageTitle(location.pathname)}</h1>
            {/*</td>
            </table>*/}
            
          </div>
          <div className="header-actions">
            <span className="date">{new Date().toLocaleDateString('es-MX')}</span>
            {!sidebarOpen && (
              <button onClick={handleLogout} className="mobile-logout">
                🚪
              </button>
            )}
          </div>
        </header>

        {/* Contenido scrollable */}
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}

function getPageTitle(path) {
  const titles = {
    '/': 'Dashboard',
    '/marcas': 'Gestión de Marcas',
    '/inventario': 'Inventario de Piezas',
    '/piezas': 'Catálogo de Piezas',
    '/ventas': 'Punto de Venta',
    '/clientes': 'Gestión de Clientes',
    '/compatibilidad': 'Compatibilidad de Piezas',
    '/reportes': 'Reportes y Estadísticas',
    '/configuracion': 'Configuración del Sistema'
  };
  return titles[path] || 'Autopartes';
}

export default MainLayout;