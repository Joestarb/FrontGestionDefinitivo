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
      <div className="mx-10">
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Agregar Equipo</h2>
          <button onClick={() => setMostrarModal(true)} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md">Agregar Equipo</button>


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
          <h2 className="text-2xl font-semibold mb-2">Equipos</h2>
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
