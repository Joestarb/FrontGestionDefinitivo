import React, { useState } from 'react';

const AnadirRecurso = ({ isOpen, onClose, handleSubmit, handleInputChange, nombreRecurso, tipoRecurso, funcionalidadRecurso, proyectoId, handleCloseModal, }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitForm = (e) => {
        setIsSubmitting(true);
        handleSubmit(e);
        setIsSubmitting(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative z-10 bg-white w-96 p-6 rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Agregar Recurso</h2>
                        <form onSubmit={handleSubmitForm}>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre del recurso"
                                value={nombreRecurso}
                                onChange={handleInputChange}
                                className="border-gray-300 border-2 rounded-md px-2 py-1 mb-2 w-full"
                            />
                            <input
                                type="text"
                                name="tipo"
                                placeholder="Tipo de recurso"
                                value={tipoRecurso}
                                onChange={handleInputChange}
                                className="border-gray-300 border-2 rounded-md px-2 py-1 mb-2 w-full"
                            />
                            <input
                                type="text"
                                name="funcionalidad"
                                placeholder="Funcionalidad del recurso"
                                value={funcionalidadRecurso}
                                onChange={handleInputChange}
                                className="border-gray-300 border-2 rounded-md px-2 py-1 mb-2 w-full"
                            />
                            <input
                                type="text"
                                name="proyectoId"
                                placeholder="ID del proyecto asociado"
                                value={proyectoId}
                                onChange={handleInputChange}
                                className="border-gray-300 border-2 rounded-md px-2 py-1 mb-2 w-full"
                            />
                            <div className=' flex justify-between'>

                                <button type="submit" className=" bg-blue-500 text-white px-4 py-2 rounded-md">
                                    {isSubmitting ? 'Agregando...' : 'Agregar recurso'}
                                </button>
                                <button onClick={handleCloseModal} className=" bg-red-500  text-2xl text-white  px-4 py-2 rounded-md">
                                    Cerrar
                                </button>
                            </div>

                        </form>
                        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default AnadirRecurso;
