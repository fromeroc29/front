import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';
import passwordicon from '../../iconos/password.svg';
import usericon from '../../iconos/nameuser.svg';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(username, password);
    
    if (result.success) {
      navigate('/');
    }
    
    setLoading(false);
  };

  // Usuarios de prueba rápidos
  const fillDemoUser = () => {
    setUsername('demo');
    setPassword('demo');
  };

  const fillAdminUser = () => {
    setUsername('admin');
    setPassword('admin');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Autopartes 3 Hermanos</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="label-icon-group">
            <img src={usericon} alt="usuario" className="input-icon" />
            <label>Usuario</label>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
              disabled={loading}
            />
          </div>


<div className="form-group">
  <div className="label-icon-group">
    <img src={passwordicon} alt="contraseña" className="input-icon" />
    <label>Contraseña</label>
  </div>
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Ingresa tu contraseña"
    required
    disabled={loading}
  />
</div>
          {/*<div className="form-group">
            <img src={passwordicon}/>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              disabled={loading}
            />
          </div>*/}

          <div className="demo-buttons">
            <button type="button" onClick={fillDemoUser} className="demo-btn">
              📝 Usuario
            </button>
            <button type="button" onClick={fillAdminUser} className="demo-btn">
              👑 Admin
            </button>
          </div>

          {error && (
            <div className="auth-error">❌ {error}</div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
          {/*<p className="demo-info">✨ DEMO: Usa cualquier usuario/contraseña (mínimo 3 caracteres)</p>*/}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;