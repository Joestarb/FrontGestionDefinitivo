import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AgregarEquipo from './Components/AgregarEquipo';
import EquiposTabla from './Components/EquiposTabla';

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [nuevoEquipo, setNuevoEquipo] = useState({
    nombre: '',
    fk_proyecto: ''
  });
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    fetch('https://localhost:8080/equipo')
      .then(response => response.json())
      .then(data => setEquipos(data))
      .catch(error => console.error('Error fetching equipos:', error));

    fetch('https://localhost:8080/proyecto')
      .then(response => response.json())
      .then(data => setProyectos(data))
      .catch(error => console.error('Error fetching proyectos:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEquipo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAgregarEquipo = () => {
    fetch('https://localhost:8080/equipo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoEquipo)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Equipo agregado exitosamente:', data);
        window.location.reload()
        setEquipos([...equipos, data]);
        setNuevoEquipo({
          nombre: '',
          fk_proyecto: ''
        });
        setMostrarModal(false); // Cerrar el modal después de agregar el equipo

      })
      .catch(error => console.error('Error al agregar equipo:', error));
  };

  const handleDeleteEquipo = (equipoId) => {
    fetch(`https://localhost:8080/equipo/${equipoId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setEquipos(equipos.filter(equipo => equipo.id_equipo !== equipoId));
          console.log('Equipo eliminado exitosamente');
        } else {
          console.error('Error al eliminar equipo');
        }
      })
      .catch(error => console.error('Error al eliminar equipo:', error));
  };


  return (
    <div className="w-full">
      <div className=' flex justify-between mt-2 m-2'>
        <h2 className="text-4xl font-semibold mb-2">Equipos</h2>
        <button onClick={() => setMostrarModal(true)} className="bg-black text-white px-4 py-2 ml-2 rounded-md">Agregar Equipo</button>
      </div>
      <div className="mx-10">


        <div className="flex text-lg font-semibold border-b-2 border-[#cccccc] mt-12">
          <div className="flex justify-around w-[35%] my-[.5%]">
            <Link to={'/admin/proyectos'}>
              <button className=" ">
                Proyecto
              </button>
            </Link>

            <Link to={'/admin/equipos'}>
              <button className=' border-[#2E0364] border-b-2px-2 text-[#2E0364] '>Equipo</button>
            </Link>

            <Link to={'/admin/recursos'}>
              <button>Recurso</button>
            </Link>

          </div>
        </div>

        <div className="mt-6">


          {mostrarModal && (
            <AgregarEquipo
              nuevoEquipo={nuevoEquipo}
              handleInputChange={handleInputChange}
              proyectos={proyectos}
              handleAgregarEquipo={handleAgregarEquipo}
            />
          )}
        </div>

        <div className="mt-6">
          {equipos.length > 0 ? (
            <>
              <EquiposTabla
                equipos={equipos}
                handleDeleteEquipo={handleDeleteEquipo}
                proyectos={proyectos}
              />
            </>
          ) : (
            <>
              No hay equipos añadidos.
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Equipos;
