import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";

const ProyectosTabla = () => {
    const [proyectos, setProyectos] = useState([]);
    const [equipos, setEquipos] = useState({});
    const [estados, setEstados] = useState({});

    useEffect(() => {
        // Obtener proyectos
        fetch('https://localhost:8080/proyecto')
            .then(response => response.json())
            .then(data => setProyectos(data))
            .catch(error => console.error('Error fetching proyectos:', error));

        // Obtener estados
        fetch('https://localhost:8080/estado')
            .then(response => response.json())
            .then(data => {
                // Convertir el arreglo de estados en un objeto con ID como clave y nombre como valor
                const estadosMap = {};
                data.forEach(estado => {
                    estadosMap[estado.id_estado] = estado.nombre;
                });
                setEstados(estadosMap);
            })
            .catch(error => console.error('Error fetching estados:', error));

        // Obtener equipos
        fetch('https://localhost:8080/equipo')
            .then(response => response.json())
            .then(data => {
                // Convertir el arreglo de equipos en un objeto con ID como clave y nombre como valor
                const equiposMap = {};
                data.forEach(equipo => {
                    equiposMap[equipo.id_equipo] = equipo.nombre;
                });
                setEquipos(equiposMap);
            })
            .catch(error => console.error('Error fetching equipos:', error));

    }, []);

    const handleDeleteProyecto = (proyectoId) => {
        // Realizar la solicitud DELETE al endpoint correspondiente
        fetch(`https://localhost:8080/proyecto/${proyectoId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Si la eliminación fue exitosa, actualizar la lista de proyectos
                setProyectos(proyectos.filter(proyecto => proyecto.id_proyecto !== proyectoId));
            } else {
                console.error('Error al eliminar el proyecto:', response.status);
            }
        })
        .catch(error => console.error('Error al eliminar el proyecto:', error));
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Fecha de Inicio</th>
                        <th className="px-4 py-2">Fecha de Fin</th>
                        <th className="px-4 py-2">Equipo</th>
                        <th className="px-4 py-2">Estado</th>
                        <th className="px-4 py-2">Acciones</th>
                        {/* Agrega más encabezados si es necesario */}
                    </tr>
                </thead>
                <tbody>
                    {proyectos.map(proyecto => (
                        <tr key={proyecto.id_proyecto}>
                            <td className="border px-4 py-2">{proyecto.id_proyecto}</td>
                            <td className="border px-4 py-2">{proyecto.nombre}</td>
                            <td className="border px-4 py-2">{proyecto.descripcion}</td>
                            <td className="border px-4 py-2">{proyecto.fecha_inicio}</td>
                            <td className="border px-4 py-2">{proyecto.fecha_fin}</td>
                            <td className="border px-4 py-2">{equipos[proyecto.fk_equipo]}</td>
                            <td className="border px-4 py-2">{estados[proyecto.fk_estado]}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleDeleteProyecto(proyecto.id_proyecto)} className=' text-3xl  text-red-500'><MdDelete/></button>
                            </td>
                            {/* Agrega más columnas si es necesario */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProyectosTabla;
