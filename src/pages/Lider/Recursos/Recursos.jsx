import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import SolicitarRecurso from './Components/SolicitarRecurso';

const Recursos = () => {
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    fetch('https://localhost:8080/recurso')
      .then(response => response.json())
      .then(data => setRecursos(data))
      .catch(error => console.error('Error fetching recursos:', error));
  }, []);

  const handleDelete = (recursoId) => {
    fetch(`https://localhost:8080/recurso/${recursoId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setRecursos(prevRecursos => prevRecursos.filter(recurso => recurso.id_recurso !== recursoId));
        } else {
          console.error('Error deleting recurso:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting recurso:', error));
  };

  return (
    <div className="overflow-x-auto">
      <SolicitarRecurso/>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-7 py-2">ID</th>
            <th className="px-7 py-2">Nombre</th>
            <th className="px-7 py-2">Tipo de Recurso</th>
            <th className="px-7 py-2">Funcionalidad</th>
            <th className="px-7 py-2">Proyecto</th>
            <th className="px-7 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recursos.map(item => (
            <tr key={item.id_recurso}>
              <td className="border px-4 py-2">{item.id_recurso}</td>
              <td className="border px-4 py-2">{item.nombre}</td>
              <td className="border px-4 py-2">{item.tipo_recurso}</td>
              <td className="border px-4 py-2">{item.funcionalidad}</td>
              <td className="border px-4 py-2">{item.fk_proyecto}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(item.id_recurso)} className=" text-red-500 text-3xl  font-bold py-2 px-4 rounded">
                <MdDelete/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recursos;
