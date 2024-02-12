import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";

const ProyectosTabla = ({ proyectos, getColorClass, handleOpenModal, fetchRecursosPorProyecto }) => {
    const [selectedProyectoId, setSelectedProyectoId] = useState(null);
    const [recursos, setRecursos] = useState([]);
    const handleOpenRecursosModal = async (proyectoId) => {
        setSelectedProyectoId(proyectoId);
        const recursosData = await fetchRecursosPorProyecto(proyectoId);
        setRecursos(recursosData); // Actualizar el estado de recursos con los datos obtenidos
    };
    // Agrega la función handleBorrarProyecto
    const handleBorrarProyecto = async (proyectoId) => {
        try {
            const response = await fetch(`https://localhost:8080/proyecto/${proyectoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                console.log(`Proyecto con ID ${proyectoId} eliminado correctamente.`);
            } else {
                console.error(`Error al borrar el proyecto con ID ${proyectoId}.`);
            }
        } catch (error) {
            console.error(`Error de red al intentar borrar el proyecto: ${error.message}`);
        }
    };
    return (
        <div className="overflow-x-auto">
            {proyectos.length > 0 ? (
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
                            <th className="border-b-2 px-4 py-2 text-sm">
                                Fecha de finalizacion
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
                                <td className="border-b-2 px-4 py-2 text-sm"  >
                                    <button onClick={() => handleOpenModal(proyecto.id_proyecto)}>
                                        Ver Equipos
                                    </button>
                                </td>

                                <td className="border-b-2 px-4 py-2 text-sm">
                                    {proyecto.fecha_inicio}
                                </td>
                                <td className="border-b-2 px-4 py-2 text-sm">
                                    {proyecto.fecha_fin}
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
                                    <td className="border-b-2 px-4 py-2 text-sm"  >
                                        <button onClick={() => handleOpenRecursosModal(proyecto.id_proyecto)}>Ver Recursos</button>
                                    </td>
                                </td>

                                <td className="border-b-2 px-4 py-2 text-sm">
                                    <button className=' text-red-500' onClick={() => handleBorrarProyecto(proyecto.id_proyecto)}>
                                        <MdDelete />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay proyectos disponibles.</p>
            )}

            {selectedProyectoId && (
                <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <span className="close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={() => setSelectedProyectoId(null)}>&times;</span>
                            <h2 className="text-2xl font-bold">Recursos del Proyecto</h2>

                            <ul>
                                {recursos.map(recurso => (
                                    <li key={recurso.id_recurso} className="py-2">
                                        <strong>Tipo:</strong> {recurso.tipo_recurso}, <strong>Nombre:</strong> {recurso.nombre}, <strong>Funcionalidad:</strong> {recurso.funcionalidad}
                                    </li>
                                ))}
                            </ul>
                            <button className=" bg-red-500 p-2 rounded-xl text-white" onClick={() => setSelectedProyectoId(null)}>cerrar</button>

                        </div>
                    </div>

                </div>

            )}


        </div>
    )
}

export default ProyectosTabla