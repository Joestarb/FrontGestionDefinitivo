import React, { useEffect, useState } from 'react';
import SideBarMember from '../components/sideBarMember';
import axios from 'axios';
import Swal from 'sweetalert2';

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [tareasCompletadas, setTareasCompletadas] = useState([]);
  const [mostrarCompletadas, setMostrarCompletadas] = useState(false);
  const [modalTarea, setModalTarea] = useState(null);
  const [nombreTarea, setNombreTarea] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');
  const [fechaInicioTarea, setFechaInicioTarea] = useState('');
  const [fechaFinTarea, setFechaFinTarea] = useState('');
  const [modalAgregar, setModalAgregar] = useState(false);

  useEffect(() => {
    const storedTareasCompletadas = JSON.parse(localStorage.getItem('tareasCompletadas')) || [];
    setTareasCompletadas(storedTareasCompletadas);

    axios.get('https://localhost:8080/tarea')
      .then(response => {
        setTareas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las tareas:', error);
      });
  }, []);

  const handleCompletarTarea = (id) => {
    const tareaCompletada = tareas.find(tarea => tarea.id_tarea === id);
    setTareasCompletadas([...tareasCompletadas, tareaCompletada]);
    setTareas(tareas.filter(tarea => tarea.id_tarea !== id));
    Swal.fire('¡Tarea completada!', '', 'success');
    localStorage.setItem('tareasCompletadas', JSON.stringify([...tareasCompletadas, tareaCompletada]));
  };

  const toggleMostrarCompletadas = () => {
    setMostrarCompletadas(!mostrarCompletadas);
  };

  const handleMostrarDetalles = (tarea) => {
    setModalTarea(tarea);
  };

  const closeModal = () => {
    setModalTarea(null);
  };

  const toggleModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  };

  const handleAgregarTarea = () => {
    if (!nombreTarea.trim() || !descripcionTarea.trim() || !fechaInicioTarea.trim() || !fechaFinTarea.trim()) {
      Swal.fire('Error', 'Todos los campos son requeridos', 'error');
      return;
    }

    axios.post('https://localhost:8080/tarea', {
      nombre: nombreTarea,
      descripcion: descripcionTarea,
      fecha_inicio: fechaInicioTarea,
      fecha_fin: fechaFinTarea
    })
    .then(response => {
      setTareas([...tareas, response.data]);
      setNombreTarea('');
      setDescripcionTarea('');
      setFechaInicioTarea('');
      setFechaFinTarea('');
      Swal.fire('¡Tarea agregada!', '', 'success');
      toggleModalAgregar();
    })
    .catch(error => {
      console.error('Error al agregar tarea:', error);
      Swal.fire('Error', 'Error al agregar la tarea', 'error');
    });
  };

  return (
    <div className="flex">
      <SideBarMember />
      <div className="flex flex-col flex-grow mx-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-semibold">Tareas</h1>
          <div>
            <button className="bg-black text-white rounded-xl py-2 px-4 font-semibold mr-4" onClick={toggleModalAgregar}>+ Agregar tarea</button>
            <button className="bg-black text-white rounded-xl py-2 px-4 font-semibold" onClick={toggleMostrarCompletadas}>
              {mostrarCompletadas ? 'Ocultar Completadas' : 'Mostrar Completadas'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Fecha de Inicio</th>
                <th className="px-4 py-2">Fecha de Fin</th>
                <th className="px-4 py-2">Completada</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 cursor-pointer" onClick={() => handleMostrarDetalles(tarea)}>{tarea.nombre}</td>
                  <td className="border px-4 py-2">{tarea.descripcion}</td>
                  <td className="border px-4 py-2">{new Date(tarea.fecha_inicio).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{new Date(tarea.fecha_fin).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleCompletarTarea(tarea.id_tarea)} className="bg-green-500 text-white px-4 py-2 rounded">Completar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarCompletadas && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg overflow-y-auto max-h-full">
            <h2 className="text-xl font-semibold mb-4">Tareas Completadas</h2>
            <ul>
              {tareasCompletadas.map((tarea, index) => (
                <li key={index} className="cursor-pointer" onClick={() => handleMostrarDetalles(tarea)}>{tarea.nombre}</li>
              ))}
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={toggleMostrarCompletadas}>Cerrar</button>
          </div>
        </div>
      )}

      {modalTarea && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Detalles de Tarea</h2>
            <p><strong>Nombre:</strong> {modalTarea.nombre}</p>
            <p><strong>Descripción:</strong> {modalTarea.descripcion}</p>
            <p><strong>Fecha de Inicio:</strong> {new Date(modalTarea.fecha_inicio).toLocaleDateString()}</p>
            <p><strong>Fecha de Fin:</strong> {new Date(modalTarea.fecha_fin).toLocaleDateString()}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      {modalAgregar && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Agregar Tarea</h2>
            <input type="text" placeholder="Nombre" value={nombreTarea} onChange={(e) => setNombreTarea(e.target.value)} className="mb-2 w-full p-2 border rounded" />
            <input type="text" placeholder="Descripción" value={descripcionTarea} onChange={(e) => setDescripcionTarea(e.target.value)} className="mb-2 w-full p-2 border rounded" />
            <input type="date" placeholder="Fecha de Inicio" value={fechaInicioTarea} onChange={(e) => setFechaInicioTarea(e.target.value)} className="mb-2 w-full p-2 border rounded" />
            <input type="date" placeholder="Fecha de Fin" value={fechaFinTarea} onChange={(e) => setFechaFinTarea(e.target.value)} className="mb-2 w-full p-2 border rounded" />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAgregarTarea}>Agregar</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={toggleModalAgregar}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tareas;
