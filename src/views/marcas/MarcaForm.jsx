import React, { useState } from 'react';
import save from '../../iconos/crud/save_list.svg';

function MarcaForm({ onSubmit, onCancel, initialData, isEditing = false }) {
  // Inicializar el estado directamente con initialData o valores vacíos
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    nombre_oficial: initialData?.nombre_oficial || '',
    pais_origen: initialData?.pais_origen || '',
    notas: initialData?.notas || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    
    console.log(`${isEditing ? '✏️ Editando' : '📝 Creando'} marca:`, formData);
    onSubmit(formData);
    
    //Solo limpiar si no es edición
    if (!isEditing) {
      setFormData({ 
        nombre: '', 
        nombre_oficial: '', 
        pais_origen: '',
        notas: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="marca-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre *"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="nombre_oficial"
          placeholder="Nombre oficial"
          value={formData.nombre_oficial}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="pais_origen"
          placeholder="País de origen"
          value={formData.pais_origen}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <textarea
          name="notas"
          placeholder="Notas adicionales (opcional)"
          value={formData.notas}
          onChange={handleChange}
          rows="3"
          style={{ width: '100%', padding: '8px', resize: 'vertical' }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type="submit" className="btn-success">
          {isEditing ? '✓ Actualizar' : '💾 Guardar'}
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>


        )}
      </div>
    </form>
  );
}

export default MarcaForm;