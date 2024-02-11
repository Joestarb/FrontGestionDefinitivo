import React from 'react'

const EquiposPorProyecto = ({selectedProyectoId,equiposPorProyecto, handleCloseModal }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md">

                <h2 className=" text-4xl">Equipos del Proyecto {selectedProyectoId}</h2>
                {equiposPorProyecto[selectedProyectoId]?.length > 0 ? (
                    <ul className="grid grid-cols-3 my-4 place-content-center">
                        {equiposPorProyecto[selectedProyectoId]?.map((equipo) => (
                            <li key={equipo.id_equipo}>{equipo.nombre}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay equipos disponibles para este proyecto.</p>
                )}

                <button className=" bg-red-500 p-2  text-white rounded-2xl" onClick={handleCloseModal}>
                    Cerrar
                </button>
            </div>

        </div>
    )
}

export default EquiposPorProyecto