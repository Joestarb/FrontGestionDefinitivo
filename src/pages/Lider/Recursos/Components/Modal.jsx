import React from 'react';

const Modal = ({ isOpen, onClose, recurso, onSaveChanges }) => {
    const handleSaveChanges = () => {
        onSaveChanges(); // Llamar a la función de guardar cambios definida por el padre
        onClose(); // Cerrar el modal después de guardar los cambios
    };

    return (
        isOpen && recurso && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-md">
                    <h2 className="text-xl font-bold mb-4">Editar Recurso</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            className="border rounded-md px-4 py-2 w-full"
                            value={recurso.nombre}
                            onChange={(e) => onSaveChanges({ ...recurso, nombre: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="tipo_recurso">Tipo de Recurso:</label>
                        <input
                            type="text"
                            id="tipo_recurso"
                            className="border rounded-md px-4 py-2 w-full"
                            value={recurso.tipo_recurso}
                            onChange={(e) => onSaveChanges({ ...recurso, tipo_recurso: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="funcionalidad">Funcionalidad:</label>
                        <input
                            type="text"
                            id="funcionalidad"
                            className="border rounded-md px-4 py-2 w-full"
                            value={recurso.funcionalidad}
                            onChange={(e) => onSaveChanges({ ...recurso, funcionalidad: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="fk_proyecto">Proyecto:</label>
                        <input
                            type="text"
                            id="fk_proyecto"
                            className="border rounded-md px-4 py-2 w-full"
                            value={recurso.fk_proyecto}
                            onChange={(e) => onSaveChanges({ ...recurso, fk_proyecto: e.target.value })}
                        />
                    </div>
                    <div>
                        <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Guardar
                        </button>
                        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-4">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;
