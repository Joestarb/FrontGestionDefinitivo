import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cerrar from '../../assets/Sidebar/cerrar.svg';
import proyectos from '../../assets/Sidebar/proyectos.svg';
import MiembrosLider from "./Miembro/MiembrosLider";

const cerrarSesion = () => {
  sessionStorage.clear();
  localStorage.clear();
};

const InicioMiembro = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    fk_proyecto: '',
    fk_rol: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:8080/tarea', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: formData
      });
      if (response.status === 200) {
        // Aquí puedes manejar la respuesta del backend, por ejemplo, cerrar el modal, actualizar la lista de miembros, etc.
        setShowModal(false);
      } else {
        // Manejar errores de la respuesta del backend
        console.error('Error al insertar miembro', response.data.error);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
    }
  };

  return (
    <div className='  relative '>
      <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
        <img className='w-[50%]' src={proyectos} />
        <Link to="/">
          <img className='w-[100%]' src={cerrar} onClick={cerrarSesion} />
        </Link>

        <div className=' absolute  left-0  mx-24'>
          <div className='flex justify-between mx-2 pt-4'>
            <p className='text-4xl font-semibold'> Lider </p>
            <button onClick={() => setShowModal(true)} className="bg-black rounded-md text-white px-2 pyy-1">
          + Agregar Miembro
        </button>
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
      
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Agregar Miembro</h2>
            <form onSubmit={handleSubmit}>
  <label className="block mb-4">
    <span className="text-gray-700 text-lg">Nombre:</span>
    <input
      type="text"
      id="nombre"
      name="nombre"
      value={formData.nombre}
      onChange={handleChange}
      className="border mt-1 block w-full py-2 px-4"
    />
  </label>

  <label className="block mb-4">
    <span className="text-gray-700 text-lg">Descripción:</span>
    <textarea
      id="descripcion"
      name="descripcion"
      value={formData.descripcion}
      onChange={handleChange}
      className="border mt-1 block w-full py-2 px-4"
    />
  </label>

  <label className="block mb-4">
    <span className="text-gray-700 text-lg">Fecha de inicio:</span>
    <input
      type="date"
      id="fecha_inicio"
      name="fecha_inicio"
      value={formData.fecha_inicio}
      onChange={handleChange}
      className="border mt-1 block w-full py-2 px-4"
    />
  </label>

  <label className="block mb-4">
    <span className="text-gray-700 text-lg">Fecha de fin:</span>
    <input
      type="date"
      id="fecha_fin"
      name="fecha_fin"
      value={formData.fecha_fin}
      onChange={handleChange}
      className="border mt-1 block w-full py-2 px-4"
    />
  </label>

  <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Guardar</button>
</form>
            <button className="mt-4 text-blue-500" onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

    </div>

  );
};

export default InicioMiembro;
