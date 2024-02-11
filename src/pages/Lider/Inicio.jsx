import React, { useState } from 'react';
import MiembrosLider from "./Miembro/MiembrosLider";
import TareasLider from "./Tareas/TareasLider";
import Recursos from "./Recursos/Recursos";

const Inicio = () => {
  const [mostrarProyectos, setMostrarProyectos] = useState(true);
  const [proyectoActivo, setProyectoActivo] = useState('miembros'); // Inicialmente, miembros está activo

  const cambiarAProyecto = () => {
    setMostrarProyectos(true);
    setProyectoActivo('tareas');
  };

  const cambiarARecurso = () => {
    setMostrarProyectos(false);
    setProyectoActivo('recursos');
  };

  return (
    <div>
      <div className='flex justify-between mx-2'>
        <p className='text-4xl font-semibold'> Lider </p>
      </div>

      <div >
        <div className='flex gap-4 text-2xl  w-screen font-semibold border-b-2 border-black mt-12'>
          <button className={proyectoActivo === 'miembros' ? 'text-blue-500' : 'text-black' } onClick={() => setProyectoActivo('miembros')}>Miembro</button>
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
  );
};

export default Inicio;
