import React from 'react';
import update from '../../iconos/crud/edit_list.svg';
import delet from '../../iconos/crud/delete_list.svg';

function MarcaList({ marcas, onDelete, onEdit }) {
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
              {/*<button 
                className="btn-edit"  // ← Nuevo estilo
                onClick={() => onEdit(marca)}  // ← Llamar a onEdit con la marca completa
                style={{marginRight: '5px'}}
              >
                ✏️ Editar
              </button>*/}
              <img
                src={update}
                alt="Editar"
                title="Editar Marca"
                draggable="false"
                onClick={() => onEdit(marca)}
              /*onClick={handleLogout}*/
              />
              {/*<button 
                className="btn-danger"
                onClick={() => onDelete(marca.id_marca, marca.nombre)}
              >
                🗑️ Eliminar
              </button>*/}
              <img
                src={delet}
                alt="Eliminar"
                title="Eliminar Marca"
                draggable="false"
                onClick={() => onDelete(marca.id_marca, marca.nombre)}
              /*onClick={handleLogout}*/
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MarcaList;