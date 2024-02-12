import React from 'react'

const RecursosTabla = ({recursos, handleDelete, handleEdit   }) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="border-b-2 px-4 py-2 text-sm">ID</th>
                    <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
                    <th className="border-b-2 px-4 py-2 text-sm">Tipo</th>
                    <th className="border-b-2 px-4 py-2 text-sm">Funcionalidad</th>
                    <th className="border-b-2 px-4 py-2 text-sm">ID Proyecto</th>
                    <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {recursos.map((recurso) => (
                    <tr key={recurso.id_recurso} className="text-center">
                        <td className="border-b-2 px-4 py-2 text-sm">{recurso.id_recurso}</td>
                        <td className="border-b-2 px-4 py-2 text-sm">{recurso.nombre}</td>
                        <td className="border-b-2 px-4 py-2 text-sm">{recurso.tipo_recurso}</td>
                        <td className="border-b-2 px-4 py-2 text-sm">{recurso.funcionalidad}</td>
                        <td className="border-b-2 px-4 py-2 text-sm">{recurso.fk_proyecto}</td>
                        <td className="border-b-2 px-4 py-2 text-sm">
                            <button onClick={() => handleDelete(recurso.id_recurso)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                                Eliminar
                            </button>
                            <button onClick={() => handleEdit(recurso.id_recurso, recurso.nombre, recurso.tipo_recurso, recurso.funcionalidad, recurso.fk_proyecto)} className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2">
                                Editar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RecursosTabla