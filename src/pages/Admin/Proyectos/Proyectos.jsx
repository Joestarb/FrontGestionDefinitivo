import React, { useState, useEffect } from "react";

const Modal = ({ equipos, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Equipos</h2>
        <ul>
          {equipos.map((equipo) => (
            <li key={equipo.id_equipo}>{equipo.nombre}</li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md">
          Cerrar
        </button>
      </div>
    </div>
  );
};

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]); // Estado para almacenar los proyectos
  const [equiposPorProyecto, setEquiposPorProyecto] = useState({}); // Estado para almacenar los equipos por proyecto
  const [selectedProjectId, setSelectedProjectId] = useState(null);


  // Función para cargar los proyectos desde el endpoint
  const fetchProyectos = async () => {
    try {
      const response = await fetch("https://localhost:8080/proyecto"); // Realiza la solicitud GET al endpoint
      if (!response.ok) {
        throw new Error('Error al cargar los proyectos');
      }
      const data = await response.json(); // Convierte la respuesta a formato JSON
      setProyectos(data); // Actualiza el estado con los datos de los proyectos obtenidos
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Función para cargar los equipos por proyecto
    fetchProyectos(); // Llama a la función para cargar los proyectos cuando el componente se monta

    const fetchEquiposPorProyecto = async () => {
      try {
        const equiposPorProyectoData = {};
        await Promise.all(
          proyectos.map(async (proyecto) => {
            const response = await fetch(`https://localhost:8080/proyecto/${proyecto.id_proyecto}/equipos`);
            if (!response.ok) {
              throw new Error(`Error al cargar los equipos para el proyecto ${proyecto.id_proyecto}`);
            }
            const equiposData = await response.json();
            equiposPorProyectoData[proyecto.id_proyecto] = equiposData;
          })
        );
        setEquiposPorProyecto(equiposPorProyectoData);
      } catch (error) {
        console.error(error);
      }
    };

    if (proyectos.length > 0) {
      fetchEquiposPorProyecto();
    }
  }, [proyectos]);

  const getColorClass = (estado) => {
    // Función para obtener la clase de color basada en el estado del proyecto
    switch (estado) {
      case 1:
        return "bg-green-200";
      case 2:
        return "bg-red-200";
      case 3:
        return "bg-yellow-200";
      default:
        return "";
    }
  };
  const openModal = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
  };


  return (
    <div className="w-full ">
      <div className="flex justify-between mx-[1%] py-[.5%] ">
        <p className="text-4xl font-semibold">Proyecto</p>
        <button className="bg-black rounded-md text-white px-2 py-1">
          + Agregar proyecto
        </button>
      </div>

      <div className="mx-10">
        <div className="flex text-lg font-semibold border-b-2 border-[#cccccc] mt-12">
          <div className="flex justify-around w-[35%] my-[.5%]">
            <p className="border-b-2 border-[#2E0364] px-2 text-[#2E0364]">
              Proyecto
            </p>
            <p>Equipo</p>
            <p>Recurso</p>
          </div>
        </div>

        <section className="flex flex-row mt-4 items-center">
          <p className="text-lg">Buscar:</p>
          <input
            type="search"
            className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm"
          />
        </section>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b-2 px-4 py-2 text-sm">#</th>
                <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
                <th className="border-b-2 px-4 py-2 text-sm">Descripción</th>
                <th className="border-b-2 px-4 py-2 text-sm">Equipos</th>
                <th className="border-b-2 px-4 py-2 text-sm">
                  Fecha de Inicio
                </th>
                <th className="border-b-2 px-4 py-2 text-sm">Estado</th>
                <th className="border-b-2 px-4 py-2 text-sm">Recurso</th>
                <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id_proyecto} className="text-center">
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {proyecto.id_proyecto}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {proyecto.nombre}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {proyecto.descripcion}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                                    <button onClick={() => openModal(proyecto.id_proyecto)} className="underline text-blue-500">Ver equipos</button>
                                </td>className="border-b-2 px-4 py-2 text-sm">
                    {proyecto.fecha_inicio}
                  </td>
                  <td
                    className={`border-b-2 px-4 py-2 text-sm ${getColorClass(
                      proyecto.fk_estado
                    )}`}
                  >
                    {proyecto.fk_estado === 1
                      ? "Completado"
                      : proyecto.fk_estado === 2
                        ? "Pendiente"
                        : proyecto.fk_estado === 3
                          ? "En Proceso"
                          : ""}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {proyecto.fk_recurso}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">Acciones</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    </div >
  );
};

export default Proyectos;
