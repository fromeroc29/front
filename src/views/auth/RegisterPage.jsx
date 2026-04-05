import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nombre: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await register(formData);
    
    if (result.success) {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🚗 Autopartes</h1>
          <p>Crea tu cuenta (DEMO)</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Usuario *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="mínimo 3 caracteres"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Contraseña *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="mínimo 3 caracteres"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Confirmar contraseña *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="auth-error">❌ {error}</div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
          <p className="demo-info">✨ DEMO: Cualquier usuario/contraseña funciona (mínimo 3 caracteres)</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;