import { useState, useEffect } from "react";
import axios from "axios";

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editedNombreEquipo, setEditedNombreEquipo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get("https://localhost:8080/equipo");
        setEquipos(response.data);
      } catch (error) {
        console.error("Error fetching equipos:", error);
      }
    };

    const fetchProyectos = async () => {
      try {
        const response = await axios.get("https://localhost:8080/proyecto");
        setProyectos(response.data);
      } catch (error) {
        console.error("Error fetching proyectos:", error);
      }
    };

    fetchEquipos();
    fetchProyectos();
  }, []);

  

  const getEstadoFromNumber = (numeroEstado) => {
    switch (numeroEstado) {
      case 1:
        return "En Proceso";
      case 2:
        return "Completado";
      case 3:
        return "Pendiente";
      default:
        return "Sin asignar";
    }
  };

  const handleInputChange = (event) => {
    setNombreEquipo(event.target.value);
  };

  const handleEdit = (id, nombre) => {
    setEditItemId(id);
    setEditedNombreEquipo(nombre);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://localhost:8080/equipo/${editItemId}`, {
        nombre: editedNombreEquipo,
      });

      // Actualizar el nombre del equipo en la lista
      setEquipos(equipos.map((equipo) => {
        if (equipo.id_equipo === editItemId) {
          return { ...equipo, nombre: editedNombreEquipo };
        }
        return equipo;
      }));

      // Limpiar los estados relacionados con la edición
      setEditItemId(null);
      setEditedNombreEquipo("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating equipo:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://localhost:8080/equipo", {
        nombre: nombreEquipo,
      });
      setEquipos([...equipos, response.data]);
      setNombreEquipo("");
    } catch (error) {
      console.error("Error creating equipo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:8080/equipo/${id}`);
      setEquipos(equipos.filter((equipo) => equipo.id_equipo !== id));
    } catch (error) {
      console.error("Error deleting equipo:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mx-[1%] py-[.5%]">
        <p className="text-4xl font-semibold">Equipos</p>
        {/* Botón para agregar nuevo equipo */}
      </div>

      <div className="mx-10">
        <section className="mt-6">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre del equipo"
              value={nombreEquipo}
              onChange={handleInputChange}
              className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
            />
            <button
              type="submit"
              className="bg-black text-white px-2 py-1 rounded-md ml-2"
            >
              Agregar equipo
            </button>
          </form>
        </section>

        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b-2 px-4 py-2 text-sm">ID</th>
                <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
                <th className="border-b-2 px-4 py-2 text-sm">Estado</th>
                <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {equipos.map((equipo) => (
                <tr key={equipo.id_equipo} className="text-center">
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {equipo.id_equipo}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {equipo.nombre}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {proyectos
                      .filter((proyecto) => proyecto.fk_equipo === equipo.id_equipo)
                      .map((proyecto) => (
                        <span key={proyecto.id_proyecto}>
                          {getEstadoFromNumber(proyecto.fk_estado)}
                        </span>
                      ))}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDelete(equipo.id_equipo)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Eliminar
                    </button>
                    <button
                        onClick={() => handleEdit(equipo.id_equipo, equipo.nombre)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      >
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

              <h2 className="text-xl font-semibold mb-4">Editar Nombre del Equipo</h2>

              <input
                type="text"
                value={editedNombreEquipo}
                onChange={(e) => setEditedNombreEquipo(e.target.value)}
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

export default Equipos;
