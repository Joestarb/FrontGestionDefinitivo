import React from 'react'
import ProyectosTabla from './Components/ProyectosTabla'

const EquipoLider = () => {

  return (
    <div>
      <div className='flex justify-between mx-2'>
        <p className=' text-4xl font-semibold'> Equipo </p>
        <button className=' bg-black rounded-xl text-white p-2 font-semibold'>+Agregar proyecto</button>
      </div>

      <div className=' mx-10'>
        <div className=' flex  gap-4   text-2xl  font-semibold border-b-2 border-black  mt-12'>
          <p>Proyecto</p>
          <p>Recurso</p>
        </div>

        <section className=' flex flex-row mt-4 items-center'>
          <p className=' text-3xl'>Buscar:</p>
          <input type="search" className='border-2   h-7 border-gray-500 mt-2  rounded-md' />
        </section>
        <ProyectosTabla />

      </div>



    </div>
  )
}

export default EquipoLider