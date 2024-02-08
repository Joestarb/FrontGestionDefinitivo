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
    <div className=' w-full'>
      <div className='flex justify-between mx-[1%] py-[.5%] '>
        <p className=' text-4xl font-semibold'> Proyecto </p>
        <button className=' bg-black rounded-md text-white px-2 py-1 '>+  Agregar proyecto</button>
      </div>  

      <div className=' mx-10'>
        <div className=' flex  text-lg  font-semibold border-b-2 border-[#cccccc] mt-12'>
          <div className='flex justify-around w-[35%] my-[.5%]'>
          <p className='border-b-2 border-[#2E0364] px-2 text-[#2E0364] '>Proyecto</p>
          <p>Equipo</p>
          <p>Recurso</p>
          </div>
        </div>

        <section className=' flex flex-row mt-4 items-center'>
          <p className=' text-lg'>Buscar:</p>
          <input type="search"  className='border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm'/>
        </section>
        <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border-b-2 px-4 py-2 text-sm">ID</th>
            <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
            <th className="border-b-2 px-4 py-2 text-sm">Descripción</th>
            <th className="border-b-2 px-4 py-2 text-sm">Equipos</th>
            <th className="border-b-2 px-4 py-2 text-sm">Fecha de Inicio</th>
            <th className="border-b-2 px-4 py-2 text-sm">Estado</th>
            <th className="border-b-2 px-4 py-2 text-sm">Recurso</th>
            <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className='text-center'>
              <td className="border-b-2 px-4 py-2 text-sm">{item.id}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.nombre}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.descripcion}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.equipos.join(', ')}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.fechaInicio}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.estado}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.recurso}</td>
              <td className="border-b-2 px-4 py-2 text-sm">Acciones</td> {/* Aquí puedes agregar botones de acción si es necesario */}
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