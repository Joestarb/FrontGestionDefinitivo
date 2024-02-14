import React, { useEffect, useState } from 'react';
import SideBarMember from '../components/sideBarMember';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from "../../../components/Footer";

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
  const [busqueda, setBusqueda] = useState('');

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const año = fecha.getFullYear();
    const diaFormateado = dia < 10 ? '0' + dia : dia;
    const mesFormateado = mes < 10 ? '0' + mes : mes;
    return `${diaFormateado}/${mesFormateado}/${año}`;
  };
  

  

  
  useEffect(() => {
    const id = sessionStorage.getItem('id')
    axios.get(`https://localhost:8080/tareas/${id}`)
      .then(response => {
        console.log(response.data)
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
      setTareas([...tareas, response.tareas ]);
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


  const tareasFiltradas = tareas.filter(tarea => tarea.nombre.toLowerCase().includes(busqueda.toLowerCase()));


  return (
    <div className=' w-full'>
      <div className='flex justify-between mx-[1%] py-[.5%] '>
        <p className=' text-4xl font-semibold'> Tareas</p>


      </div>  

      <div className=' mx-10'>
        <div className=' flex  text-lg  font-semibold border-b-2 border-[#cccccc] mt-12'>
          <div className='flex justify-around w-[35%] my-[.5%]'>
          <p className='border-b-2 border-[#2E0364] px-2 text-[#2E0364] '>Tareas</p>
         
          </div>
        </div>

        <section className='flex flex-row mt-4 items-center mx[1%]'>
          <p className='text-lg'>Buscar:</p>
          <input 
            type="search"  
            className='border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] px-[.5%] mt-2 rounded-md text-sm'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </section>


        <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border-b-2 px-4 py-2 text-sm">ID</th>
            <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
            <th className="border-b-2 px-4 py-2 text-sm">Descripción</th>
            <th className="border-b-2 px-4 py-2 text-sm">Inicio</th>
            <th className="border-b-2 px-4 py-2 text-sm">Final</th>
            <th className="border-b-2 px-4 py-2 text-sm">Proyecto</th>
            <th className="border-b-2 px-4 py-2 text-sm">Equipo</th>
            <th className="border-b-2 px-4 py-2 text-sm">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {tareasFiltradas.map(item => (
            <tr key={item.id} className='text-center'>
              <td className="border-b-2 px-4 py-2 text-sm">{item.id}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.nombre}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.descripcion}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{formatearFecha(item.inicio)}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{formatearFecha(item.final)}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.proyecto}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.equipo}</td>
              <td className="border-b-2 px-4 py-2 text-sm">{item.usuario}</td>{/* Aquí puedes agregar botones de acción si es necesario */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      </div>



    </div>
  );
};

export default Tareas;
