import UserModel from '../models/UserModel';

class AuthService {
  // Almacenar token en localStorage
  setToken(token) {
    localStorage.setItem('auth_token', token);
  }

  // Obtener token
  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Eliminar token (logout)
  removeToken() {
    localStorage.removeItem('auth_token');
  }

  // Versión DEMO - Solo para pruebas
  async login(username, password) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo: cualquier usuario/contraseña funciona (mínimo 3 caracteres)
    if (username && password && username.length >= 3 && password.length >= 3) {
      const fakeUser = new UserModel({
        id: 1,
        username: username,
        email: `${username}@demo.com`,
        nombre: username === 'admin' ? 'Administrador' : 'Usuario Demo',
        rol: username === 'admin' ? 'admin' : 'usuario',
        token: 'fake-token-123'
      });
      
      this.setToken('fake-token-123');
      return { 
        success: true, 
        user: fakeUser, 
        error: null 
      };
    }
    
    return { 
      success: false, 
      user: null, 
      error: 'Usuario o contraseña incorrectos (mínimo 3 caracteres)' 
    };
  }

  // Registro DEMO
  async register(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (userData.username && userData.email && userData.password) {
      const fakeUser = new UserModel({
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        nombre: userData.nombre || userData.username,
        rol: 'usuario',
        token: 'fake-token-' + Date.now()
      });
      
      this.setToken(fakeUser.token);
      return { 
        success: true, 
        user: fakeUser, 
        error: null 
      };
    }
    
    return { 
      success: false, 
      user: null, 
      error: 'Todos los campos son obligatorios' 
    };
  }

  // Logout DEMO
  async logout() {
    this.removeToken();
    return { success: true };
  }

  // Verificar si está autenticado
  isAuthenticated() {
    const token = this.getToken();
    return token !== null && token !== '';
  }

  // Obtener usuario actual DEMO
  async getCurrentUser() {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = this.getToken();
    if (token) {
      // Recuperar usuario del localStorage o crear uno demo
      let user = localStorage.getItem('current_user');
      if (user) {
        return { success: true, user: new UserModel(JSON.parse(user)), error: null };
      }
      
      // Usuario demo por defecto
      const fakeUser = new UserModel({
        id: 1,
        username: 'demo',
        email: 'demo@demo.com',
        nombre: 'Usuario Demo',
        rol: 'admin',
        token: token
      });
      
      localStorage.setItem('current_user', JSON.stringify(fakeUser));
      return { success: true, user: fakeUser, error: null };
    }
    
    return { success: false, user: null, error: 'No autenticado' };
  }
}

export default new AuthService();


