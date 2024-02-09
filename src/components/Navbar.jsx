import React from 'react'

const Navbar = () => {
  return (
<<<<<<< HEAD
    <div className='w-screen  border-b-2 border-[#2E0364] flex justify-between' data-name="contenedor-principal">
      <div className='flex items-center w-[30%]' data-name="contenedor izquierda">
        <div className='w-[16%]' data-name="contenedor-img">
          <img className=' bg-[#2E0364]' src='https://cdn-icons-png.flaticon.com/128/6059/6059906.png'/>
        </div>
        <h1 className='font-bold px-[4%]'>SISTEMA DE GESTION DE PROYECTOS </h1>
=======
    <div className=' border-b-4   ml-[120%] w-[90vw]  border-red-500'>
      <div className='flex justify-between my-5 mx-5'>
      <p className='  text-2xl font-bold '>Sistema Gestion de proyectos</p>
      <div className='flex gap-3'>
      <select name="" id="" className='px-3 border-2 '>
        <option value="Administrador"> Administrador</option>
      </select>
      <select name="" id="" className='px-3 border-2 '>
        <option value="Administrador"> correo@correo.com</option>
      </select>
>>>>>>> main
      </div>

      <div className='w-[35%] flex gap-[3%] items-center justify-center' data-name="contenedor derecha">
        <h2 className='border-2 text-xs border-[#cccccc] py-[.5%] px-[5%] rounded-md font-medium'>ADMINISTRADOR</h2>
        <h2 className='border-2 text-xs border-[#cccccc] py-[.5%] px-[5%] rounded-md font-medium'>Admin@gmail.com</h2>
      </div>
    </div>
  )
}

export default Navbar
