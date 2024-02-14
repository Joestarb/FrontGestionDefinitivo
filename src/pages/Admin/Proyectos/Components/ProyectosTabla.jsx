import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import add from "/src/assets/Add/add.svg"
import moment from 'moment';
import recurso from "/src/assets/Resource/recurso.svg"
import axios from 'axios';
import EditProyect from './EditProyect';




const ProyectosTabla = ({ proyectos, getColorClass, handleOpenModal, fetchRecursosPorProyecto }) => {
    const [idP, setidP] = useState()
    const [modal, setModal] = useState(false)
    const [data, setData] = useState([])
    const [selectedProyectoId, setSelectedProyectoId] = useState(null);
    const [recursos, setRecursos] = useState([]);
    const [editProyect, setEditProyect] = useState(false);
    const [dataP, setDataP] = useState(false)
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

    const fetchData = async (idP) => {
        try {
            const response = await axios.get(`https://localhost:8080/equipoProyect/${idP}`)
            setData(response.data)
        } catch (error) {
            console.error('something went woring', error)
        }
    }

    useEffect(() => {
        if (idP) {
            fetchData(idP);
        }
    }, [idP]);
    const handleDesAsignar = async (id) => {
        try {
            const response = await axios.put(`https://localhost:8080/equiposProyectR/${id}`);
            fetchData(idP)
            return response.data;
        } catch (error) {
            console.error('Error removing project from equipo:', error);
            throw error;
        }
    };

    // Function to add a project to equipo
    const handleAsignar = async (id) => {
        try {
            const response = await axios.put(`https://localhost:8080/equiposProyect/${idP}/${id}`);
            fetchData(idP)
            return response.data;
        } catch (error) {
            console.error('Error adding project to equipo:', error);
            throw error;
        }
    };

    const openModal = (id) => {
        setidP(id)
        setModal(true)
    }

    const openEdit = (id) => {
        setEditProyect(true)
        setDataP(id)
    }

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
                                    {moment(proyecto.fecha_inicio, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
                                </td>
                                <td className="border-b-2 px-4 py-2 text-sm">
                                    {moment(proyecto.fecha_fin, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
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

                                <td className="border-b-2 px-4 py-2 text-sm flex items-center justify-center">
                                    <button className=' text-green-500' onClick={() => openModal(proyecto.id_proyecto)}>
                                        <img className='h-[5vh] w-[5vw]' src={add} />

                                    </button>
                                    <button className=' text-green-500 bg-indigo-500 px-4  rounded-md ' onClick={() => openEdit(proyecto)}>
                                        <p className=" text-white text-xl ">Edit</p>
                                    </button>
                                </td>
                                <td className="border-b-2 px-4 py-2 text-sm">
                                    <button className=' text-red-500'>
                                        <img className='h-[5vh] w-[5vw]' src={recurso} />
                                    </button>
                                </td>

                                <td className="border-b-2 px-4 py-2 text-sm">
                                    <button className='  text-red-500' onClick={() => handleBorrarProyecto(proyecto.id_proyecto)}>
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




            {editProyect && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <div className="relative bg-white rounded-lg w-96 p-6">
                            <div className="absolute top-0 right-0">
                                <button className="text-gray-500 hover:text-gray-700">

                                </button>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Editar Proyecto</h2>

                            <EditProyect data={dataP}  >
                                <button className='bg-red-500  mx-[1%] text-white font-bold py-2 px-4 rounded' onClick={() => setEditProyect(false)}>Cancelar</button>

                            </EditProyect>



                        </div>
                    </div>
                </div>

            )}



            {modal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <div className="relative bg-white rounded-lg w-96 p-6">
                            <div className="absolute top-0 right-0">
                                <button className="text-gray-500 hover:text-gray-700">

                                </button>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Agregar Equipo</h2>


                            {data.map((item) => (
                                <div className={`rounded-sm py-[.5%] my-1 px-[1.5%] flex items-center justify-between ${item.fk_proyecto !== null ? 'bg-green-100 border border-green-200 rounded-sm' : ''}`}>
                                    <h3>{item.nombre}</h3>
                                    <button
                                        className={`text-xl cursor-pointer  ${item.fk_proyecto !== null ? 'text-red-500' : 'text-green-500'}`}
                                        onClick={() => item.fk_proyecto !== null ? handleDesAsignar(item.id_equipo) : handleAsignar(item.id_equipo)}
                                    >
                                        {item.fk_proyecto !== null ? '-' : '+'}
                                    </button>
                                </div>
                            ))}

                            <div className='text-right pt-8'>
                                <button className='bg-green-500 text-white  rounded px-2'>Aceptar</button>
                                <button className='bg-red-500  mx-[1%] text-white rounded px-2' onClick={() => setModal(false)}>Cancelar</button>
                            </div>




                        </div>
                    </div>
                </div>

            )}















        </div>
    )
}

export default ProyectosTabla