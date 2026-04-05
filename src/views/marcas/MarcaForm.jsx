import React, { useState } from 'react';

function MarcaForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    nombre_oficial: '',
    pais_origen: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    onSubmit(formData);
    setFormData({ nombre: '', nombre_oficial: '', pais_origen: '' });
  };

  return (
    <form className="marca-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nombre *"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nombre oficial"
          value={formData.nombre_oficial}
          onChange={(e) => setFormData({ ...formData, nombre_oficial: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="País de origen"
          value={formData.pais_origen}
          onChange={(e) => setFormData({ ...formData, pais_origen: e.target.value })}
        />
      </div>
      <button type="submit" className="btn-success">Guardar</button>
      {onCancel && (
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
      )}
    </form>
  );
}

export default MarcaForm;