import React from 'react';

function MarcaList({ marcas, onDelete }) {
  if (marcas.length === 0) {
    return <div className="empty-message">No hay marcas registradas</div>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Nombre Oficial</th>
          <th>País</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {marcas.map((marca) => (
          <tr key={marca.id_marca}>
            <td>{marca.id_marca}</td>
            <td><strong>{marca.nombre}</strong></td>
            <td>{marca.nombre_oficial || '-'}</td>
            <td>{marca.pais_origen || '-'}</td>
            <td>{marca.activo ? '✅ Sí' : '❌ No'}</td>
            <td>
              <button 
                className="btn-danger"
                onClick={() => onDelete(marca.id_marca, marca.nombre)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MarcaList;