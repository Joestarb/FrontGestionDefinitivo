import React from 'react'

const Navbar = () => {
  return (
    <div className='w-screen  border-b-2 border-[#2E0364] flex justify-between' data-name="contenedor-principal">
      <div className='flex items-center w-[30%]' data-name="contenedor izquierda">
        <div className='w-[16%]' data-name="contenedor-img">
          <img className=' bg-[#2E0364]' src='https://cdn-icons-png.flaticon.com/128/5956/5956592.png'/>
        </div>
        <h1 className='font-bold px-[4%]'>SISTEMA DE GESTION DE PROYECTOS </h1>
      </div>

      <div className='w-[35%] flex gap-[3%] items-center justify-center' data-name="contenedor derecha">
        <h2 className='border-2 text-sm border-[#cccccc] px-[5%] rounded-md font-medium'>ADMINISTRADOR</h2>
        <h2 className='border-2 text-sm border-[#cccccc] px-[5%] rounded-md font-medium'>tavitoAmaELi@gmail.com</h2>
      </div>
    </div>
  )
}

export default Navbar
