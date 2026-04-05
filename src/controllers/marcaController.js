import marcaService from '../services/marcaService';

class MarcaController {
  async getMarcas() {
    try {
      const marcas = await marcaService.getAll();
      return { success: true, data: marcas, error: null };
    } catch (error) {
      console.error('Error en getMarcas:', error);
      return { 
        success: false, 
        data: [], 
        error: 'No se pudieron cargar las marcas' 
      };
    }
  }

  async createMarca(marcaData) {
    try {
      if (!marcaData.nombre || marcaData.nombre.trim() === '') {
        return { 
          success: false, 
          data: null, 
          error: 'El nombre de la marca es obligatorio' 
        };
      }
      
      const nuevaMarca = await marcaService.create(marcaData);
      return { success: true, data: nuevaMarca, error: null };
    } catch (error) {
      console.error('Error en createMarca:', error);
      
      if (error.response?.status === 400) {
        return { 
          success: false, 
          data: null, 
          error: 'Ya existe una marca con ese nombre' 
        };
      }
      
      return { 
        success: false, 
        data: null, 
        error: 'Error al crear la marca' 
      };
    }
  }

  async deleteMarca(id, nombre) {
    try {
      const confirmacion = window.confirm(`¿Eliminar la marca "${nombre}"?`);
      if (!confirmacion) {
        return { success: false, data: null, error: 'Cancelado por el usuario' };
      }
      
      await marcaService.delete(id);
      return { success: true, data: null, error: null };
    } catch (error) {
      console.error('Error en deleteMarca:', error);
      return { 
        success: false, 
        data: null, 
        error: 'No se pudo eliminar la marca' 
      };
    }
  }
}

export default new MarcaController();