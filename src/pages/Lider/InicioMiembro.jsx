import React from 'react';
import { Link } from 'react-router-dom';
import cerrar from '../../assets/Sidebar/cerrar.svg';
import proyectos from '../../assets/Sidebar/proyectos.svg';
import MiembrosLider from "./Miembro/MiembrosLider";

const cerrarSesion = () => {
  sessionStorage.clear();
  localStorage.clear();
};

const InicioMiembro = () => {

  return (
    <div className='  relative '>
      <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
        <img className='w-[50%]' src={proyectos} />
        <Link to="/">
          <img className='w-[100%]' src={cerrar} onClick={cerrarSesion} />
        </Link>

        <div className=' absolute  left-0  mx-24'>
          <div className='flex justify-between mx-2'>
            <p className='text-4xl font-semibold'> Lider </p>
          </div>

          <div className=''>
            <div className='flex gap-4 text-2xl  w-[90vw] font-semibold border-b-2 border-black mt-12'>
              <Link to={'/lider/miembros'}>
                <button className='text-blue-500'>Miembro</button>
              </Link>

              <Link to={'/lider/tareas'}>
                <button >Tarea</button>
              </Link>

              <Link to={'/lider/Recursos'}>
              <button>Recurso</button>
              </Link>
            </div>

            <MiembrosLider />
          </div>
        </div>
      </div>


    </div>

  );
};

export default InicioMiembro;
