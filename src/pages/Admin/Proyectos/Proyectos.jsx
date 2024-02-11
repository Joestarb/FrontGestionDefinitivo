import React, { useState, useEffect } from "react";

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch("https://localhost:8080/proyecto");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProyectos(data);
      } catch (error) {
        console.error("Error fetching proyectos:", error);
      }
    };

    fetchProyectos();
  }, []);

  const getColorClass = (estado) => {
    switch (estado) {
      case "Completado":
        return "bg-green-200";
      case "Pendiente":
        return "bg-red-200";
      case "En Proceso":
        return "bg-yellow-200";
      default:
        return "";
    }
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
                    {proyecto.fk_equipo}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
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
    </div>
  );
};

export default Proyectos;
