import { useState, useEffect } from 'react';
import axios from 'axios';

const Recursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [nombreRecurso, setNombreRecurso] = useState('');
  const [tipoRecurso, setTipoRecurso] = useState('');
  const [funcionalidadRecurso, setFuncionalidadRecurso] = useState('');
  const [proyectoId, setProyectoId] = useState('');

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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Recursos;
