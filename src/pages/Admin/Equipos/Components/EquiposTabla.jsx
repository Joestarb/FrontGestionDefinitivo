import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import editar from '/src/assets/Edit/editar.svg'

const EquiposTabla = ({ equipos, handleDeleteEquipo }) => {
    const [proyectoSeleccionadoId, setProyectoSeleccionadoId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const [nombreEquipoEditado, setNombreEquipoEditado] = useState('');
    const [proyectos, setProyectos] = useState([]);
    

    const openEditModal = (equipo) => {
        setEquipoSeleccionado(equipo);
        setNombreEquipoEditado(equipo.nombre);
        setProyectoSeleccionadoId(equipo.fk_proyecto); // Guarda el ID del proyecto seleccionado
        setModalOpen(true);
    };
    
    const closeEditModal = () => {
        setModalOpen(false);
    };

    const handleEditEquipo = () => {
        const equipoId = equipoSeleccionado.id_equipo;
        fetch(`https://localhost:8080/equipo/${equipoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreEquipoEditado,
                fk_proyecto: proyectoSeleccionadoId // Usamos el ID del proyecto seleccionado
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al editar el equipo');
                }
                return response.json();
            })
            .then(data => {
                console.log('Equipo editado:', data);
                closeEditModal();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        fetch('https://localhost:8080/proyecto')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar proyectos');
                }
                return response.json();
            })
            .then(data => {
                setProyectos(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const getNombreProyecto = (equipo) => {
        const proyectoAsociado = proyectos.find(proyecto => proyecto.id_proyecto === equipo.fk_proyecto);
        return proyectoAsociado ? proyectoAsociado.nombre : 'Proyecto no encontrado';
    };
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border-b-2 px-4 py-2 text-sm">#</th>
                        <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
                        <th className="border-b-2 px-4 py-2 text-sm">Nombre Proyecto</th>
                        <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map((equipo, index) => (
                        <tr key={equipo.id_equipo}>
                            <td className="border-b-2  pl-20 py-2 text-sm">{equipo.id_equipo}</td>
                            <td className="border-b-2  pl-20 py-2 text-sm">{equipo.nombre}</td>
                            <td className="border-b-2  pl-20 py-2 text-sm">{getNombreProyecto(equipo)}</td>
                            <td className="border-b-2  pl-20 py-2 text-sm">
                            <td className="border-b-2 px-4 py-2 text-sm">
                            
                                </td>
                                <button onClick={() => handleDeleteEquipo(equipo.id_equipo)} className=" text-red-500 px-2 py-1 rounded-md"> <MdDelete /></button>
                                <button onClick={() => openEditModal(equipo)} className=" text-white px-2 py-1 rounded-md ml-2">
                                    <img className='h-[3vh] w-[3vw]' src={editar}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && equipoSeleccionado && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Equipo</h3>
                                        <div className="mt-2">
                                            <input type="text" value={nombreEquipoEditado} onChange={(e) => setNombreEquipoEditado(e.target.value)} className="w-full border-gray-400 border rounded-md px-3 py-2" />
                                            <select
                                                value={proyectoSeleccionadoId}
                                                onChange={(e) => setProyectoSeleccionadoId(e.target.value)}
                                                className="w-full border-gray-400 border rounded-md px-3 py-2 mt-2"
                                            >
                                                <option value="">Seleccionar Proyecto</option>
                                                {proyectos.map(proyecto => (
                                                    <option key={proyecto.id_proyecto} value={proyecto.id_proyecto}>{proyecto.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleEditEquipo} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Guardar
                                </button>
                                <button onClick={closeEditModal} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EquiposTabla;
