import React, { useState, useEffect } from 'react';
import marcaController from '../../controllers/marcaController';
import MarcaForm from './MarcaForm';
import MarcaList from './MarcaList';

import add2 from '../../iconos/crud/add_list2.svg';
import add from '../../iconos/crud/add_list.svg';
import cancel from '../../iconos/crud/cancel_list.svg';
import delet from '../../iconos/crud/delete_list.svg';
import update from '../../iconos/crud/edit_list.svg';
import save from '../../iconos/crud/save_list.svg';





function MarcaPage() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 📝 NUEVO: Estado para edición
   const [editingMarca, setEditingMarca] = useState(null);
  
  // 📄 NUEVO: Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const itemsPerPage = 10;  // 10 registros por página

  useEffect(() => {
    console.log('Intentando cargar marcas...');
    cargarMarcas();
  }, [currentPage]);  // 🔄 CAMBIO: Ahora depende de currentPage

  const cargarMarcas = async () => {
    console.log('Cargando marcas...');
    setLoading(true);
    
    // 📄 NUEVO: Calcular skip basado en la página actual
    const skip = (currentPage - 1) * itemsPerPage;
    console.log(`📄 Página ${currentPage} - Skip: ${skip}, Limit: ${itemsPerPage}`);
    
    // 📄 CAMBIO: Pasar skip y limit al controlador
    const result = await marcaController.getMarcas(skip, itemsPerPage);
  
    console.log('Resultado:', result);
    
    if (result.success) {
      setMarcas(result.data);
      setError(null);
      
      // 📄 NUEVO: Calcular total de registros (temporal)
      // Si recibimos menos de 10, es la última página
      if (result.data.length < itemsPerPage) {
        const totalEstimado = skip + result.data.length;
        setTotalRegistros(totalEstimado);
      } else {
        // Si hay exactamente 10, podrían haber más
        setTotalRegistros(skip + itemsPerPage + 1);
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleCreateMarca = async (marcaData) => {
    const result = await marcaController.createMarca(marcaData);
    
    if (result.success) {
      // 📄 NUEVO: Volver a la primera página después de crear
      setCurrentPage(1);
      await cargarMarcas();
      setShowForm(false);
    } else {
      alert(result.error);
    }
  };

 // 📝 NUEVO: Manejar edición
  const handleEditMarca = (marca) => {
    console.log('✏️ Editando marca:', marca);
    setEditingMarca(marca);
    setShowForm(true);
  };

  // 📝 NUEVO: Manejar actualización
  const handleUpdateMarca = async (marcaData) => {
    if (!editingMarca) return;
    
    const result = await marcaController.updateMarca(editingMarca.id_marca, marcaData);
    
    if (result.success) {
      console.log('✅ Marca actualizada exitosamente');
      await cargarMarcas();
      setShowForm(false);
      setEditingMarca(null);
      alert('✅ Marca actualizada exitosamente');
    } else {
      console.error('❌ Error al actualizar:', result.error);
      alert(result.error);
    }
  };


// ✅ DELETE mejorado - El confirm está aquí
  const handleDeleteMarca = async (id, nombre) => {
    const confirmacion = window.confirm(`¿Eliminar la marca "${nombre}"?\n\nEsta acción no se puede deshacer.`);
    if (!confirmacion) return;
    
    console.log(`🗑️ Eliminando marca ID: ${id}`);
    
    const result = await marcaController.deleteMarca(id);
    
    if (result.success) {
      console.log('✅ Marca eliminada');
      
      // Si es la última página y no quedan registros, ir a la página anterior
      if (marcas.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await cargarMarcas();
      }
      
      alert('✅ Marca eliminada exitosamente');
    } else {
      alert(`❌ ${result.error}`);
    }
  };

  // 📝 NUEVO: Cancelar edición/creación
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMarca(null);
  };

  // 📄 NUEVO: Funciones para navegación
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    // Solo ir a siguiente página si tenemos 10 registros (podría haber más)
    if (marcas.length === itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 📄 NUEVO: Calcular total de páginas
  const totalPaginas = Math.ceil(totalRegistros / itemsPerPage);

  if (loading) return <div className="loading">Cargando marcas...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="marca-page">
      <div className="page-header">
        <div className="marca-section">
        <h1>Gestión de Marcas</h1>
        {/*<button 
          className="btn-primary"
          onClick={() => {
            setEditingMarca(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancelar' : '+ Nueva Marca'}
        </button>*/}
          <img
            src={add2}
            alt="Agregar"
            title="Agregar Marca"
            draggable="false"
            onClick={() => {
            setEditingMarca(null);
            setShowForm(!showForm);
          }}
            /*onClick={handleLogout}*/
          />
        </div>
      </div>

      {showForm && (
        <div className="form-section">
          <MarcaForm 
            onSubmit={editingMarca ? handleUpdateMarca : handleCreateMarca}
            onCancel={handleCancelForm}
            initialData={editingMarca}
            isEditing={!!editingMarca}
          />
        </div>
      )}

      <div className="list-section">
        <MarcaList 
          marcas={marcas} 
          onDelete={handleDeleteMarca}
          onEdit={handleEditMarca}  // ← Pasar la función de edición
        />
        
        {/* 📄 NUEVO: Componente de paginación */}
        {marcas.length > 0 && (
          <div className="pagination">
            <button 
              onClick={goToPreviousPage} 
              disabled={currentPage === 1}
              className="btn-pagination"
            >
              ← Anterior
            </button>
            
            <span className="page-info">
              Página {currentPage} de {totalPaginas || '?'} 
              ({marcas.length} registros mostrados)
            </span>
            
            <button 
              onClick={goToNextPage} 
              disabled={marcas.length < itemsPerPage}
              className="btn-pagination"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarcaPage;