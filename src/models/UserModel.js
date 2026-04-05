class UserModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.username = data.username || '';
    this.email = data.email || '';
    this.nombre = data.nombre || '';
    this.rol = data.rol || 'usuario'; // admin, usuario, vendedor
    this.token = data.token || '';
  }

  isValid() {
    return this.username.trim().length > 0 && this.email.trim().length > 0;
  }

  isAdmin() {
    return this.rol === 'admin';
  }

  isVendedor() {
    return this.rol === 'vendedor' || this.rol === 'admin';
  }

  toJSON() {
    return {
      username: this.username,
      email: this.email,
      nombre: this.nombre,
      rol: this.rol
    };
  }
}

export default UserModel;