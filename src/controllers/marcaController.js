import marcaService from '../services/marcaService';

class MarcaController {
async getMarcas(skip = 0, limit = 10) {  // ← Recibir parámetros
  try {
    const marcas = await marcaService.getAll(skip, limit);  // ← Pasar parámetros
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

// controllers/marcaController.js
async updateMarca(id, marcaData) {
  try {
    if (!marcaData.nombre || marcaData.nombre.trim() === '') {
      return { 
        success: false, 
        data: null, 
        error: 'El nombre de la marca es obligatorio' 
      };
    }
    
    const marcaActualizada = await marcaService.update(id, marcaData);
    return { success: true, data: marcaActualizada, error: null };
  } catch (error) {
    console.error('Error en updateMarca:', error);
    
    if (error.message.includes('ya existe')) {
      return { 
        success: false, 
        data: null, 
        error: 'Ya existe una marca con ese nombre' 
      };
    }
    
    return { 
      success: false, 
      data: null, 
      error: 'Error al actualizar la marca' 
    };
  }
}



// controllers/marcaController.js
async deleteMarca(id) {  // ← Solo recibir ID, no el nombre
  try {
    await marcaService.delete(id);
    return { success: true, data: null, error: null };
  } catch (error) {
    console.error('Error en deleteMarca:', error);
    return { 
      success: false, 
      data: null, 
      error: error.message || 'No se pudo eliminar la marca' 
    };
  }
}
}

export default new MarcaController();