import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  

  useEffect(() => {
    fetch('https://localhost:8080/equipo')
      .then(response => response.json())
      .then(data => setEquipos(data))
      .catch(error => console.error('Error fetching equipos:', error));
      
      fetch('https://localhost:8080/proyecto')
      .then(response => response.json())
      .then(data => setProyectos(data))
      .catch(error => console.error('Error fetching proyectos:', error));
  }, []);
  const getNombreProyecto = (idProyecto) => {
    const proyecto = proyectos.find(proyecto => proyecto.id_proyecto === idProyecto);
    return proyecto ? proyecto.nombre : 'No encontrado';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mx-[1%] py-[.5%]">
        <p className="text-4xl font-semibold">Proyecto</p>
        <button onClick={() => setAgregarProyecto(true)} className="bg-black rounded-md text-white px-2 py-1">
          + Agregar proyecto
        </button>
      </div>

      <div className="mx-10">
        <div className="flex text-lg font-semibold border-b-2 border-[#cccccc] mt-12">
          <div className="flex justify-around w-[35%] my-[.5%]">
            <Link to={'/admin/proyectos'}>
              <button className="px-2">Proyecto</button>
            </Link>
            <Link to={'/admin/equipos'}>
              <button className="border-b-2 text-[#2E0364] border-[#2E0364]">Equipo</button>
            </Link>
            <Link to={'/admin/recursos'}>
              <button>Recurso</button>
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Equipos</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b-2 px-4 py-2 text-sm">ID Equipo</th>
                <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
                <th className="border-b-2 px-4 py-2 text-sm">ID Proyecto</th>
                <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((equipo, index) => (
                <tr key={index}>
                  <td className="border-b-2  pl-28 text-sm">{equipo.id_equipo}</td>
                  <td className="border-b-2  pl-32 text-sm">{equipo.nombre}</td>
                  <td className="border border-gray-400 px-4 py-2">{getNombreProyecto(equipo.fk_proyecto)}</td>
                  <td className="border border-gray-400 px-4 py-2">Acciones</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Equipos;
