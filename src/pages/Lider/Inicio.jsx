import React, { useState } from 'react';
import MiembrosLider from "./Miembro/MiembrosLider";
import TareasLider from "./Tareas/TareasLider";
import Recursos from "./Recursos/Recursos";
import proyectos from '../../assets/Sidebar/proyectos.svg';
import cerrar from '../../assets/Sidebar/cerrar.svg';
import { Link } from 'react-router-dom';

const cerrarSesion = () => {
  sessionStorage.clear();
  localStorage.clear();
};

const Inicio = () => {

  const [proyectoActivo, setProyectoActivo] = useState('miembros'); // Inicialmente, miembros está activo



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

          <div  className=''>
            <div className='flex gap-4 text-2xl  w-[90vw] font-semibold border-b-2 border-black mt-12'>
              <button className={proyectoActivo === 'miembros' ? 'text-blue-500' : 'text-black'} onClick={() => setProyectoActivo('miembros')}>Miembro</button>
              <button className={proyectoActivo === 'tareas' ? 'text-blue-500' : 'text-black'} onClick={() => setProyectoActivo('tareas')}>Tarea</button>
              <button className={proyectoActivo === 'recursos' ? 'text-blue-500' : 'text-black'} onClick={() => setProyectoActivo('recursos')}>Recurso</button>
            </div>

            <section className='flex flex-row mt-4 items-center'>
              <p className='text-3xl'>Buscar:</p>
              <input type="search" className='border-2 h-7 border-gray-500 mt-2 rounded-md' />
            </section>

            {proyectoActivo === 'miembros' && <MiembrosLider />}
            {proyectoActivo === 'tareas' && <TareasLider />}
            {proyectoActivo === 'recursos' && <Recursos />}
          </div>
        </div>
      </div>


    </div>

  );
};

export default Inicio;
