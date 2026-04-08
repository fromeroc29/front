import api from './api';
import MarcaModel from '../models/MarcaModel';

class MarcaService {
// services/marcaService.js
async getAll(skip = 0, limit = 10) {  // ← Agregamos parámetros con valores por defecto
  try {
    const response = await api.get('/marcas/', {
      params: { skip, limit }  // ← Enviamos los parámetros a la URL
    });
    return response.data.map(marca => new MarcaModel(marca));
  } catch (error) {
    console.error('Error en getAll:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Error del servidor');
    }
    throw new Error('Error de conexión con el servidor');
  }
}
  async getById(id) {
    const response = await api.get(`/marcas/${id}`);
    return new MarcaModel(response.data);
  }

async create(marcaData) {
  try {
    const marca = new MarcaModel(marcaData);
    if (!marca.isValid()) {
      throw new Error('Los datos de la marca no son válidos');
    }
    
    console.log('Enviando al backend:', marca.toJSON()); // Debug
    
    const response = await api.post('/marcas/', marca.toJSON());
    console.log('Respuesta del backend:', response.data); // Debug
    
    return new MarcaModel(response.data);
  } catch (error) {
    console.error('Error detallado en create:', error);
    
    if (error.response) {
      // El servidor respondió con un status code fuera del 2xx
      console.error('Data del error:', error.response.data);
      console.error('Status:', error.response.status);
      throw new Error(error.response.data.message || `Error ${error.response.status}`);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('No hay respuesta del servidor');
      throw new Error('No se pudo conectar con el servidor');
    } else {
      // Algo pasó al configurar la petición
      throw error;
    }
  }
}

// services/marcaService.js
async update(id, marcaData) {
  try {
    // Crear instancia del modelo para validar
    const marca = new MarcaModel(marcaData);
    if (!marca.isValid()) {
      throw new Error('Los datos de la marca no son válidos');
    }
    
    console.log(`✏️ Actualizando marca ${id}:`, marca.toJSON());
    
    const response = await api.put(`/marcas/${id}`, marca.toJSON());
    console.log('✅ Respuesta del update:', response.data);
    
    return new MarcaModel(response.data);
  } catch (error) {
    console.error('Error en update:', error);
    if (error.response) {
      throw new Error(error.response.data.message || `Error ${error.response.status}`);
    }
    throw new Error('Error de conexión con el servidor');
  }
}

// services/marcaService.js
async delete(id) {
  try {
    console.log(`🗑️ Eliminando marca con ID: ${id}`);
    const response = await api.delete(`/marcas/${id}`);
    console.log('✅ Marca eliminada exitosamente');
    return true;
  } catch (error) {
    console.error('Error en delete:', error);
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('La marca no existe');
      }
      throw new Error(error.response.data.message || 'Error del servidor');
    }
    throw new Error('Error de conexión con el servidor');
  }
}

  async toggleActivo(id, activo) {
    const response = await api.patch(`/marcas/${id}`, { activo });
    return new MarcaModel(response.data);
  }
}

export default new MarcaService();


