import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from 'sweetalert2';


const Recursos = () => {
  const [recursosData, setRecursosData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedRecurso, setEditedRecurso] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  useEffect(() => {
    fetch('https://localhost:8080/recurso')
      .then(response => response.json())
      .then(data => setRecursosData(data))
      .catch(error => console.error('Error fetching recursos data:', error));

    fetch('https://localhost:8080/proyecto')
      .then(response => response.json())
      .then(data => setProyectos(data))
      .catch(error => console.error('Error fetching proyectos data:', error));
  }, [])

  const handleEdit = (recurso) => {
    setEditedRecurso(recurso);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditedRecurso(null);
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    
    window.location.reload()
    fetch(`https://localhost:8080/recurso/${editedRecurso.id_recurso}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedRecurso),
    })
      .then(response => {
        if (response.ok) {
          console.log("Cambios guardados exitosamente");
          return response.json(); // Obtener los datos 
          
        } else {
          console.error('Error al guardar los cambios:', response.statusText);
          throw new Error('Error al guardar los cambios');
        }
      })
      .then(data => {
        // Actualizar la lista de recursos con los datos actualizados
        const updatedRecursosData = recursosData.map(item => {
          if (item.id_recurso === editedRecurso.id_recurso) {
            return data; // Usar los datos actualizados en lugar de los antiguos
          }
          return item;
        });
        setRecursosData(updatedRecursosData); // Actualizar el estado

        // Obtener la lista actualizada de proyectos después de guardar los cambios
        fetch('https://localhost:8080/proyecto')
          .then(response => response.json())
          .then(data => setProyectos(data))
          .catch(error => console.error('Error fetching proyectos data:', error));

        handleCloseModal(); // Cerrar el modal después de actualizar los datos
      })
      .catch(error => {
        console.error('Error al guardar los cambios:', error);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      });
  };
  const handleDelete = (recursoId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:8080/recurso/${recursoId}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (response.ok) {
              console.log("Recurso borrado exitosamente");
              // Actualizar la lista de recursos después de borrar
              const updatedRecursosData = recursosData.filter(item => item.id_recurso !== recursoId);
              setRecursosData(updatedRecursosData);
            } else {
              console.error('Error al borrar el recurso:', response.statusText);
              throw new Error('Error al borrar el recurso');
            }
          })
          .catch(error => {
            console.error('Error al borrar el recurso:', error);
            // Puedes mostrar un mensaje de error al usuario si lo deseas
          });
      }
    });
  };



  const getNombreProyecto = (fk_proyecto, proyectos) => {
    const proyecto = proyectos.find(proyecto => proyecto.id_proyecto === fk_proyecto);
    return proyecto ? proyecto.nombre : 'Proyecto no encontrado';


  };

  return (
    <div className=" ">
      <table className=" w-full">
        <thead>
          <tr>
            <th className="border-b-2 px-4 py-2 text-sm">#</th>
            <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
            <th className="border-b-2 px-4 py-2 text-sm">Tipo de Recurso</th>
            <th className="border-b-2 px-4 py-2 text-sm">Funcionalidad</th>
            <th className="border-b-2 px-4 py-2 text-sm">Proyecto</th>
            <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recursosData.map(item => (
            <tr className='   text-center' key={item.id_recurso}>
              <td className=" border-b-2 text-sm  ">{item.id_recurso}</td>
              <td className=" border-b-2 text-sm  ">{item.nombre}</td>
              <td className=" border-b-2 text-sm  ">{item.tipo_recurso}</td>
              <td className=" border-b-2 text-sm  ">{item.funcionalidad}</td>
              <td className=" border-b-2 text-sm  ">{getNombreProyecto(item.fk_proyecto, proyectos)}</td>
              <td className=" border-b-2 text-sm   ">
                <button onClick={() => handleEdit(item)} className="text-blue-500 text-3xl font-bold py-2 px-4 rounded">
                  <MdEdit />
                </button>
                <button onClick={() => handleDelete(item.id_recurso)} className="text-red-500 text-3xl font-bold py-2 px-4 rounded">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && editedRecurso && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-bold mb-4">Editar Recurso</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="nombre">Nombre:</label>
              <input required type="text" id="nombre" className="border rounded-md px-4 py-2 w-full" value={editedRecurso.nombre} onChange={(e) => setEditedRecurso({ ...editedRecurso, nombre: e.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="tipo_recurso">Tipo de Recurso:</label>
              <input required type="text" id="tipo_recurso" className="border rounded-md px-4 py-2 w-full" value={editedRecurso.tipo_recurso} onChange={(e) => setEditedRecurso({ ...editedRecurso, tipo_recurso: e.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="funcionalidad">Funcionalidad:</label>
              <input required type="text" id="funcionalidad" className="border rounded-md px-4 py-2 w-full" value={editedRecurso.funcionalidad} onChange={(e) => setEditedRecurso({ ...editedRecurso, funcionalidad: e.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="proyecto">Proyecto:</label>
              <select id="proyecto" className="border rounded-md px-4 py-2 w-full" value={editedRecurso.fk_proyecto} onChange={(e) => setEditedRecurso({ ...editedRecurso, fk_proyecto: e.target.value })}>
                <option value="">Seleccionar Proyecto</option>
                {proyectos.map(proyecto => (
                  <option key={proyecto.id_proyecto} value={proyecto.id_proyecto}>{proyecto.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded-md">Guardar</button>
              <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-4">Cancelar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Recursos;
