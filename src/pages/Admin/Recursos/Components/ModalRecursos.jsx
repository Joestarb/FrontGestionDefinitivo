import React from 'react'

const ModalRecursos = ({editedNombreRecurso, editedTipoRecurso, editedFuncionalidadRecurso, editedProyectoId, handleSave, setEditedNombreRecurso, setIsModalOpen, setEditedProyectoId      }) => {
    return (
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

                    <h2 className="text-xl font-semibold mb-4">Editar Recurso</h2>

                    <input
                        type="text"
                        value={editedNombreRecurso}
                        onChange={(e) => setEditedNombreRecurso(e.target.value)}
                        className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
                    />

                    <input
                        type="text"
                        value={editedTipoRecurso}
                        onChange={(e) => setEditedTipoRecurso(e.target.value)}
                        className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
                    />

                    <input
                        type="text"
                        value={editedFuncionalidadRecurso}
                        onChange={(e) => setEditedFuncionalidadRecurso(e.target.value)}
                        className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
                    />

                    <input
                        type="text"
                        value={editedProyectoId}
                        onChange={(e) => setEditedProyectoId(e.target.value)}
                        className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
                    />

                    <button onClick={handleSave} className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4">Guardar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalRecursos