import React, { useState } from 'react';
import ProyectosTabla from './Equipo/Components/ProyectosTabla';
import Recursos from './Recursos/Recursos';
import Navbar from '../../components/Navbar';

const Inicio = () => {
  const [mostrarProyectos, setMostrarProyectos] = useState(true);
  const [proyectoActivo, setProyectoActivo] = useState(true);

  const cambiarAProyecto = () => {
    setMostrarProyectos(true);
    setProyectoActivo(true);
  };

  const cambiarARecurso = () => {
    setMostrarProyectos(false);
    setProyectoActivo(false);
  };

  return (
    <div>
      <div className='flex justify-between mx-2'>
        <p className='text-4xl font-semibold'> Lider </p>
      </div>

      <div className='mx-10'>
        <div className='flex gap-4 text-2xl font-semibold border-b-2 border-black mt-12'>
          <p onClick={cambiarAProyecto} style={{ cursor: 'pointer', color: proyectoActivo ? '#985be3' : 'inherit' }}>Proyecto</p>
          <p onClick={cambiarARecurso} style={{ cursor: 'pointer', color: !proyectoActivo ? '#985be3' : 'inherit' }}>Recurso</p>
        </div>

        <section className='flex flex-row mt-4 items-center'>
          <p className='text-3xl'>Buscar:</p>
          <input type="search" className='border-2 h-7 border-gray-500 mt-2 rounded-md' />
        </section>

        {mostrarProyectos ? <ProyectosTabla /> : <Recursos />}
      </div>
    </div>
  );
};

export default Inicio;
