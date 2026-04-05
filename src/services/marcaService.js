import api from './api';
import MarcaModel from '../models/MarcaModel';

class MarcaService {
  async getAll() {
    const response = await api.get('/marcas/');
    return response.data.map(marca => new MarcaModel(marca));
  }

  async getById(id) {
    const response = await api.get(`/marcas/${id}`);
    return new MarcaModel(response.data);
  }

  async create(marcaData) {
    const marca = new MarcaModel(marcaData);
    if (!marca.isValid()) {
      throw new Error('Los datos de la marca no son válidos');
    }
    const response = await api.post('/marcas/', marca.toJSON());
    return new MarcaModel(response.data);
  }

  async update(id, marcaData) {
    const response = await api.put(`/marcas/${id}`, marcaData);
    return new MarcaModel(response.data);
  }

  async delete(id) {
    await api.delete(`/marcas/${id}`);
    return true;
  }

  async toggleActivo(id, activo) {
    const response = await api.patch(`/marcas/${id}`, { activo });
    return new MarcaModel(response.data);
  }
}

export default new MarcaService();