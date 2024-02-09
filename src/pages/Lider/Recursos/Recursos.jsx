import React from 'react'

const Recursos = () => {
  const data = [
    {
      id: 1,
      estado: 'Proyecto A',
      tipo: 'Descripción del Proyecto A',
      funcionalidad: ['Equipo 1', 'Equipo 2'],
      estado: "Activo",
      Proyecto: '2024-02-01',
    },
    {
      id: 2,
      estado: 'Proyecto B',
      tipo: 'Descripción del Proyecto B',
      funcionalidad: ['Equipo 3', 'Equipo 4'],
      estado: "Activo",
      Proyecto: '2024-02-03',
    },
    // Agrega más datos si es necesario
  ];
  return (
    <div className="overflow-x-auto">
        <button className='bg-black rounded-xl absolute top-[98px] mr-7 right-0 text-white p-2 font-semibold'>+Agregar proyecto</button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-7 py-2">ID</th>
            <th className="px-7 py-2">Estado</th>
            <th className="px-7 py-2">Tipo</th>
            <th className="px-7 py-2">Funcionalidad</th>
            <th className="px-7 py-2">Proyecto</th>
            <th className="px-7 py-2">estado</th>
            <th className="px-7 py-2">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.estado}</td>
              <td className="border px-4 py-2">{item.tipo}</td>
              <td className="border px-4 py-2">{item.funcionalidad.join(', ')}</td>
              <td className="border px-4 py-2">{item.Proyecto}</td>
              <td className="border px-4 py-2 bg-[#41ff3b4f] rounded-xl  w-16">{item.estado}</td>
              <td className="border px-4 py-2">Acciones</td> {/* Aquí puedes agregar botones de acción si es necesario */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recursos