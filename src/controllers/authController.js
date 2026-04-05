import authService from '../services/authService';

class AuthController {
  async login(username, password) {
    if (!username || !password) {
      return { success: false, error: 'Usuario y contraseña son obligatorios' };
    }
    if (username.length < 3 || password.length < 3) {
      return { success: false, error: 'Usuario y contraseña deben tener al menos 3 caracteres' };
    }
    return await authService.login(username, password);
  }

  async register(userData) {
    if (!userData.username || !userData.email || !userData.password) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }
    if (userData.password !== userData.confirmPassword) {
      return { success: false, error: 'Las contraseñas no coinciden' };
    }
    if (userData.username.length < 3) {
      return { success: false, error: 'El usuario debe tener al menos 3 caracteres' };
    }
    if (userData.password.length < 3) {
      return { success: false, error: 'La contraseña debe tener al menos 3 caracteres' };
    }
    return await authService.register(userData);
  }

  async logout() {
    return await authService.logout();
  }

  isAuthenticated() {
    return authService.isAuthenticated();
  }

  async getCurrentUser() {
    return await authService.getCurrentUser();
  }
}

export default new AuthController();