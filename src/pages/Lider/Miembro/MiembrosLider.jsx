import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import editar from "/src/assets/Edit/editar.svg"
const MiembrosLider = () => {
    const recursosDummyData = [
        { id_recurso: 1, nombre: "Recurso 1", tipo_recurso: "Tipo 1", funcionalidad: "Funcionalidad 1", fk_proyecto: 1 },
        { id_recurso: 2, nombre: "Recurso 2", tipo_recurso: "Tipo 2", funcionalidad: "Funcionalidad 2", fk_proyecto: 2 },
        // Agrega más datos ficticios si es necesario
    ];

    const handleDelete = (recursoId) => {
        // Aquí puedes implementar la lógica para eliminar un recurso
        console.log("Eliminar recurso con ID:", recursoId);
    };

    return (
        <div className="overflow-x-auto">
  
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-7 py-2">ID</th>
                        <th className="px-7 py-2">Nombre</th>
                        <th className="px-7 py-2">Tipo de Recurso</th>
                        <th className="px-7 py-2">Funcionalidad</th>
                        <th className="px-7 py-2">Proyecto</th>
                        <th className="px-7 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {recursosDummyData.map(item => (
                        <tr key={item.id_recurso}>
                            <td className="border-b-2 px-4 py-2 text-sm">{item.id_recurso}</td>
                            <td className="border-b-2 px-4 py-2 text-sm">{item.nombre}</td>
                            <td className="border-b-2 px-4 py-2 text-sm">{item.tipo_recurso}</td>
                            <td className="border-b-2 px-4 py-2 text-sm">{item.funcionalidad}</td>
                            <td className="border-b-2 px-4 py-2 text-sm">{item.fk_proyecto}</td>
                            <td className="border-b-2 px-4 py-2 text-sm">

                            <button onClick={() => handleDelete(item.id_recurso)} className=" text-red-500 text-3xl  font-bold py-2 px-4 rounded">
                                   <img className='h-[5vh] w-[5vw]' src={editar}/>
                                </button>
                                <button onClick={() => handleDelete(item.id_recurso)} className=" text-red-500 text-3xl  font-bold py-2 px-4 rounded">
                                    <MdDelete/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MiembrosLider;
