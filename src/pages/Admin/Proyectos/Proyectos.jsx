import React from 'react'

const Proyectos = () => {
  const data = [
    {
      id: 1,
      nombre: 'Proyecto A',
      descripcion: 'Descripción del Proyecto A',
      equipos: ['Equipo 1', 'Equipo 2'],
      fechaInicio: '2024-02-01',
      estado: 'En progreso',
      recurso: 'Recurso A'
    },
    {
      id: 2,
      nombre: 'Proyecto B',
      descripcion: 'Descripción del Proyecto B',
      equipos: ['Equipo 3', 'Equipo 4'],
      fechaInicio: '2024-02-03',
      estado: 'Completado',
      recurso: 'Recurso B'
    },
    // Agrega más datos si es necesario
  ];
  return (
    <div>
      <div className='flex justify-between mx-2'>
        <p className=' text-4xl font-semibold'> Proyecto </p>
        <button className=' bg-black rounded-xl text-white p-2 font-semibold'>+Agregar proyecto</button>
      </div>

      <div className=' mx-10'>
        <div className=' flex justify-around   text-2xl  font-semibold border-b-2 border-black  mt-12'>
          <p>Proyecto</p>
          <p>Equipo</p>
          <p>Recurso</p>
        </div>

        <section className=' flex flex-row mt-4 items-center'>
          <p className=' text-3xl'>Buscar:</p>
          <input type="search"  className='border-2   h-7 border-gray-500 mt-2  rounded-md'/>
        </section>
        <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Equipos</th>
            <th className="px-4 py-2">Fecha de Inicio</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Recurso</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.nombre}</td>
              <td className="border px-4 py-2">{item.descripcion}</td>
              <td className="border px-4 py-2">{item.equipos.join(', ')}</td>
              <td className="border px-4 py-2">{item.fechaInicio}</td>
              <td className="border px-4 py-2">{item.estado}</td>
              <td className="border px-4 py-2">{item.recurso}</td>
              <td className="border px-4 py-2">Acciones</td> {/* Aquí puedes agregar botones de acción si es necesario */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      </div>



    </div>
  )
}

export default Proyectos