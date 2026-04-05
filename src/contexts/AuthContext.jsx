import React, { createContext, useState, useContext, useEffect } from 'react';
import authController from '../controllers/authController';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (authController.isAuthenticated()) {
      const result = await authController.getCurrentUser();
      if (result.success) {
        setUser(result.user);
        // Guardar en localStorage para persistencia
        localStorage.setItem('current_user', JSON.stringify(result.user));
      } else {
        await logout();
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    setError(null);
    setLoading(true);
    const result = await authController.login(username, password);
    setLoading(false);
    
    if (result.success) {
      setUser(result.user);
      localStorage.setItem('current_user', JSON.stringify(result.user));
      return { success: true };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const register = async (userData) => {
    setError(null);
    setLoading(true);
    const result = await authController.register(userData);
    setLoading(false);
    
    if (result.success) {
      setUser(result.user);
      localStorage.setItem('current_user', JSON.stringify(result.user));
      return { success: true };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const logout = async () => {
    setLoading(true);
    await authController.logout();
    setUser(null);
    localStorage.removeItem('current_user');
    localStorage.removeItem('auth_token');
    setLoading(false);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.rol === 'admin',
    isVendedor: user?.rol === 'vendedor' || user?.rol === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}