import React, { useState, useEffect } from 'react'

const Navbar = () => {

  const [rol, setRol] = useState()
  const [correo, setCorreo] = useState()

  useEffect(() => {
    setRol(sessionStorage.getItem('rol'))
    setCorreo(sessionStorage.getItem('correo'))
  }, [])
  

  return (
    <div className='w-screen  border-b-2 border-[#2E0364] flex justify-between' data-name="contenedor-principal">
      <div className='flex items-center w-[30%]' data-name="contenedor izquierda">
        <div className='w-[16%]' data-name="contenedor-img">
          <img className=' bg-[#2E0364]' src='https://cdn-icons-png.flaticon.com/128/6059/6059906.png'/>
        </div>
        <h1 className='font-bold px-[4%]'>SISTEMA DE GESTION DE PROYECTOS </h1>
      </div>

      <div className='w-[35%] flex gap-[3%] items-center justify-center' data-name="contenedor derecha">
        <h2 className='border-2 text-xs border-[#cccccc] py-[.5%] px-[5%] rounded-md font-medium'>{rol}</h2>
        <h2 className='border-2 text-xs border-[#cccccc] py-[.5%] px-[5%] rounded-md font-medium'>{correo}</h2>
      </div>
    </div>
  )
}

export default Navbar
