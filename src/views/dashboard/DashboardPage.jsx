import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './DashboardPage.css';
import toro from '../../iconos/torucho.png';
import aguila from '../../iconos/aguilucho.png';

function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { icon: '📦', label: 'Piezas en Inventario', value: '1,234', change: '+12%', color: '#007bff' },
    { icon: '💰', label: 'Ventas del Mes', value: '$45,678', change: '+8%', color: '#28a745' },
    { icon: '👥', label: 'Clientes Activos', value: '89', change: '+5%', color: '#17a2b8' },
    { icon: '🚗', label: 'Vehículos Desarmados', value: '23', change: '+3%', color: '#ffc107' },
  ];

  const recentSales = [
    { id: 1, cliente: 'Juan Pérez', pieza: 'Motor 2.0L', monto: '$8,500', fecha: '2026-04-05' },
    { id: 2, cliente: 'María López', pieza: 'Transmisión CVT', monto: '$5,500', fecha: '2026-04-04' },
    { id: 3, cliente: 'Refaccionaria El Motor', pieza: 'Sistema Bose', monto: '$3,200', fecha: '2026-04-03' },
  ];

  return (
    <div className="dashboard">
      {/* Bienvenida */}
      <div className="welcome-section">
        <img src={aguila} alt="aguila" title="Autopartes del Norte" draggable="false" className="welcome-icon" />
        <div>
            <h2>¡Bienvenido, {user?.nombre || user?.username}!</h2>
            <p>Aquí está el resumen de tu negocio hoy</p>
        </div>
        <img src={toro} alt="toro" title="Autopartes 3 Hermanos" draggable="false" className="welcome-icon" />
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
              <span className="stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos y tablas */}
      <div className="dashboard-grid">
        {/* Ventas recientes */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>🔄 Ventas Recientes</h3>
            <a href="/ventas" className="view-all">Ver todas →</a>
          </div>
          <table className="recent-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Pieza</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.cliente}</td>
                  <td>{sale.pieza}</td>
                  <td className="amount">{sale.monto}</td>
                  <td>{sale.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Acciones rápidas */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>⚡ Acciones Rápidas</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-btn" onClick={() => window.location.href = '/ventas'}>
              💰 Nueva Venta
            </button>
            <button className="quick-btn" onClick={() => window.location.href = '/inventario'}>
              📦 Agregar Pieza
            </button>
            <button className="quick-btn" onClick={() => window.location.href = '/clientes'}>
              👤 Nuevo Cliente
            </button>
            <button className="quick-btn" onClick={() => window.location.href = '/compatibilidad'}>
              🔍 Ver Compatibilidad
            </button>
          </div>
        </div>

        {/* Piezas más vendidas */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>🏆 Top 5 Piezas Más Vendidas</h3>
          </div>
          <div className="top-piezas">
            <div className="pieza-item">
              <span>1. Motor 2.0L SkyActiv-G</span>
              <span className="count">24 unidades</span>
            </div>
            <div className="pieza-item">
              <span>2. Transmisión CVT</span>
              <span className="count">18 unidades</span>
            </div>
            <div className="pieza-item">
              <span>3. Faros LED</span>
              <span className="count">15 unidades</span>
            </div>
            <div className="pieza-item">
              <span>4. Sensor de oxígeno</span>
              <span className="count">12 unidades</span>
            </div>
            <div className="pieza-item">
              <span>5. Cuerpo de aceleración</span>
              <span className="count">9 unidades</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;