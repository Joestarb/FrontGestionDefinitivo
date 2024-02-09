import React from 'react'

const ProyectosTabla = () => {
    const data = [
        {
            id: 1,
            nombre: 'Proyecto A',
            rol: 'Descripción del Proyecto A',
            tareas: ['Equipo 1', 'Equipo 2'],
            tareasCompletadas: '2024-02-01',
        },
        {
            id: 2,
            nombre: 'Proyecto B',
            rol: 'Descripción del Proyecto B',
            tareas: ['Equipo 3', 'Equipo 4'],
            tareasCompletadas: '2024-02-03',
        },
        // Agrega más datos si es necesario
    ];

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Rol</th>
                        <th className="px-4 py-2">Tareas</th>
                        <th className="px-4 py-2">Tareas completadas</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.id}</td>
                            <td className="border px-4 py-2">{item.nombre}</td>
                            <td className="border px-4 py-2">{item.rol}</td>
                            <td className="border px-4 py-2">{item.tareas.join(', ')}</td>
                            <td className="border px-4 py-2">{item.tareasCompletadas}</td>
                            <td className="border px-4 py-2">Acciones</td> {/* Aquí puedes agregar botones de acción si es necesario */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default ProyectosTabla
