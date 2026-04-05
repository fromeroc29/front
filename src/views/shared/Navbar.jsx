import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🚗 Autopartes</h1>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/">Inicio</Link>
            <Link to="/marcas">Marcas</Link>
            <Link to="/inventario">Inventario</Link>
            <Link to="/ventas">Ventas</Link>
            <span className="user-info">👤 {user?.username}</span>
            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;