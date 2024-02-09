import React from 'react'

const NavbarLider = () => {
    return (
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
                </div>

            </div>
        </div>
    )
}

export default NavbarLider