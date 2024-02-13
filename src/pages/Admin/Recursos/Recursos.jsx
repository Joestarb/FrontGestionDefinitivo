import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecursosAdmin = () => {
  const [recursos, setRecursos] = useState([]);
  const [nombreRecurso, setNombreRecurso] = useState('');
  const [tipoRecurso, setTipoRecurso] = useState('');
  const [funcionalidadRecurso, setFuncionalidadRecurso] = useState('');
  const [proyectoId, setProyectoId] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editedNombreRecurso, setEditedNombreRecurso] = useState('');
  const [editedTipoRecurso, setEditedTipoRecurso] = useState('');
  const [editedFuncionalidadRecurso, setEditedFuncionalidadRecurso] = useState('');
  const [editedProyectoId, setEditedProyectoId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await axios.get('https://localhost:8080/recurso');
        setRecursos(response.data);
      } catch (error) {
        console.error('Error fetching recursos:', error);
      }
    };

    fetchRecursos();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nombre') setNombreRecurso(value);
    if (name === 'tipo') setTipoRecurso(value);
    if (name === 'funcionalidad') setFuncionalidadRecurso(value);
    if (name === 'proyectoId') setProyectoId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:8080/recurso', {
        nombre: nombreRecurso,
        tipo_recurso: tipoRecurso,
        funcionalidad: funcionalidadRecurso,
        fk_proyecto: proyectoId
      });
      setRecursos([...recursos, response.data]);
      setNombreRecurso('');
      setTipoRecurso('');
      setFuncionalidadRecurso('');
      setProyectoId('');
    } catch (error) {
      console.error('Error creating recurso:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:8080/recurso/${id}`);
      setRecursos(recursos.filter(recurso => recurso.id_recurso !== id));
    } catch (error) {
      console.error('Error deleting recurso:', error);
    }
  };

  const handleEdit = (id, nombre, tipo, funcionalidad, proyectoId) => {
    setEditItemId(id);
    setEditedNombreRecurso(nombre);
    setEditedTipoRecurso(tipo);
    setEditedFuncionalidadRecurso(funcionalidad);
    setEditedProyectoId(proyectoId);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://localhost:8080/recurso/${editItemId}`, {
        nombre: editedNombreRecurso,
        tipo_recurso: editedTipoRecurso,
        funcionalidad: editedFuncionalidadRecurso,
        fk_proyecto: editedProyectoId
      });

      // Actualizar la lista de recursos con los cambios
      setRecursos(recursos.map(recurso => {
        if (recurso.id_recurso === editItemId) {
          return {
            ...recurso,
            nombre: editedNombreRecurso,
            tipo_recurso: editedTipoRecurso,
            funcionalidad: editedFuncionalidadRecurso,
            fk_proyecto: editedProyectoId
          };
        }
        return recurso;
      }));

      // Limpiar los estados relacionados con la edición
      setEditItemId(null);
      setEditedNombreRecurso('');
      setEditedTipoRecurso('');
      setEditedFuncionalidadRecurso('');
      setEditedProyectoId('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating recurso:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mx-[1%] py-[.5%]">
        <p className="text-4xl font-semibold">Recursos</p>
      </div>

      <div className="mx-10">
        <section className="mt-6">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del recurso"
              value={nombreRecurso}
              onChange={handleInputChange}
              className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo de recurso"
              value={tipoRecurso}
              onChange={handleInputChange}
              className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
            />
            <input
              type="text"
              name="funcionalidad"
              placeholder="Funcionalidad del recurso"
              value={funcionalidadRecurso}
              onChange={handleInputChange}
              className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
            />
            <input
              type="text"
              name="proyectoId"
              placeholder="ID del proyecto asociado"
              value={proyectoId}
              onChange={handleInputChange}
              className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
            />
            <button type="submit" className="bg-black text-white px-2 py-1 rounded-md ml-2">
              Agregar recurso
            </button>
          </form>
        </section>

        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b-2 px-4 py-2 text-sm">ID</th>
                <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
                <th className="border-b-2 px-4 py-2 text-sm">Tipo</th>
                <th className="border-b-2 px-4 py-2 text-sm">Funcionalidad</th>
                <th className="border-b-2 px-4 py-2 text-sm">ID Proyecto</th>
                <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recursos.map((recurso) => (
                <tr key={recurso.id_recurso} className="text-center">
                  <td className="border-b-2 px-4 py-2 text-sm">{recurso.id_recurso}</td>
                  <td className="border-b-2 px-4 py-2 text-sm">{recurso.nombre}</td>
                  <td className="border-b-2 px-4 py-2 text-sm">{recurso.tipo_recurso}</td>
                  <td className="border-b-2 px-4 py-2 text-sm">{recurso.funcionalidad}</td>
                  <td className="border-b-2 px-4 py-2 text-sm">{recurso.fk_proyecto}</td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    <button onClick={() => handleDelete(recurso.id_recurso)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                      Eliminar
                    </button>
                    <button onClick={() => handleEdit(recurso.id_recurso, recurso.nombre, recurso.tipo_recurso, recurso.funcionalidad, recurso.fk_proyecto)} className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="relative bg-white rounded-lg w-96 p-6">
              <div className="absolute top-0 right-0">
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h2 className="text-xl font-semibold mb-4">Editar Recurso</h2>

              <input
                type="text"
                value={editedNombreRecurso}
                onChange={(e) => setEditedNombreRecurso(e.target.value)}
                className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
              />

              <input
                type="text"
                value={editedTipoRecurso}
                onChange={(e) => setEditedTipoRecurso(e.target.value)}
                className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
              />

              <input
                type="text"
                value={editedFuncionalidadRecurso}
                onChange={(e) => setEditedFuncionalidadRecurso(e.target.value)}
                className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
              />

              <input
                type="text"
                value={editedProyectoId}
                onChange={(e) => setEditedProyectoId(e.target.value)}
                className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
              />

              <button onClick={handleSave} className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecursosAdmin;
