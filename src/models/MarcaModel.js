class MarcaModel {
  constructor(data = {}) {
    this.id_marca = data.id_marca || null;
    this.nombre = data.nombre || '';
    this.nombre_oficial = data.nombre_oficial || '';
    this.pais_origen = data.pais_origen || '';
    this.activo = data.activo !== undefined ? data.activo : true;
    this.fecha_registro = data.fecha_registro || new Date().toISOString();
    this.notas = data.notas || '';
  }

  isValid() {
    return this.nombre.trim().length > 0;
  }

  toJSON() {
    return {
      nombre: this.nombre,
      nombre_oficial: this.nombre_oficial,
      pais_origen: this.pais_origen,
      activo: this.activo,
      notas: this.notas
    };
  }

  get displayName() {
    return `${this.nombre} (${this.pais_origen || 'País no especificado'})`;
  }
}

export default MarcaModel;