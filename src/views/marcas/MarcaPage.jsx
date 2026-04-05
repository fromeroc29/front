import React, { useState, useEffect } from 'react';
import marcaController from '../../controllers/marcaController';
import MarcaForm from './MarcaForm';
import MarcaList from './MarcaList';

function MarcaPage() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarMarcas();
  }, []);

  const cargarMarcas = async () => {
    setLoading(true);
    const result = await marcaController.getMarcas();
    
    if (result.success) {
      setMarcas(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleCreateMarca = async (marcaData) => {
    const result = await marcaController.createMarca(marcaData);
    
    if (result.success) {
      await cargarMarcas();
      setShowForm(false);
    } else {
      alert(result.error);
    }
  };

  const handleDeleteMarca = async (id, nombre) => {
    const result = await marcaController.deleteMarca(id, nombre);
    
    if (result.success) {
      await cargarMarcas();
    }
  };

  if (loading) return <div className="loading">Cargando marcas...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="marca-page">
      <div className="page-header">
        <h1>🚗 Gestión de Marcas</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Nueva Marca'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <MarcaForm 
            onSubmit={handleCreateMarca}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="list-section">
        <MarcaList 
          marcas={marcas} 
          onDelete={handleDeleteMarca}
        />
      </div>
    </div>
  );
}

export default MarcaPage;