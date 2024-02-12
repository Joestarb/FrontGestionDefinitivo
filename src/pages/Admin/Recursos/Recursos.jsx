import { useState, useEffect } from 'react';
import axios from 'axios';
import ModalRecursos from './Components/ModalRecursos';
import RecursosTabla from './Components/RecursosTabla';
import AnadirRecurso from './Components/AnadirRecurso';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const RecursosAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [recursos, setRecursos] = useState([]);
  const [nombreRecurso, setNombreRecurso] = useState('');
  const [tipoRecurso, setTipoRecurso] = useState('');
  const [funcionalidadRecurso, setFuncionalidadRecurso] = useState('');
  const [proyectoId, setProyectoId] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editedNombreRecurso, setEditedNombreRecurso] = useState('');
  const [editedTipoRecurso, setEditedTipoRecurso] = useState('');
  const [editedFuncionalidadRecurso, setEditedFuncionalidadRecurso] = useState('');
  const [editedProyectoId, setEditedProyectoId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await axios.get('https://localhost:8080/recurso');
        setRecursos(response.data);
      } catch (error) {
        console.error('Error fetching recursos:', error);
      }
    };

    fetchRecursos();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nombre') setNombreRecurso(value);
    if (name === 'tipo') setTipoRecurso(value);
    if (name === 'funcionalidad') setFuncionalidadRecurso(value);
    if (name === 'proyectoId') setProyectoId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:8080/recurso', {
        nombre: nombreRecurso,
        tipo_recurso: tipoRecurso,
        funcionalidad: funcionalidadRecurso,
        fk_proyecto: proyectoId
      });
      setRecursos([...recursos, response.data]);
      setNombreRecurso('');
      setTipoRecurso('');
      setFuncionalidadRecurso('');
      setProyectoId('');
      handleCloseModal()
    } catch (error) {
      console.error('Error creating recurso:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Mostrar confirmación antes de eliminar
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo'
      });
      if (result.isConfirmed) {
        await axios.delete(`https://localhost:8080/recurso/${id}`);
        // Actualizar la lista de recursos después de eliminar
        setRecursos(recursos.filter(recurso => recurso.id_recurso !== id));
        // Mostrar notificación de éxito
        Swal.fire(
          '¡Eliminado!',
          'El recurso ha sido eliminado.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting recurso:', error);
      // Mostrar notificación de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el recurso. Por favor, intenta de nuevo más tarde.'
      });
    }
  };


  const handleEdit = (id, nombre, tipo, funcionalidad, proyectoId) => {
    setEditItemId(id);
    setEditedNombreRecurso(nombre);
    setEditedTipoRecurso(tipo);
    setEditedFuncionalidadRecurso(funcionalidad);
    setEditedProyectoId(proyectoId);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://localhost:8080/recurso/${editItemId}`, {
        nombre: editedNombreRecurso,
        tipo_recurso: editedTipoRecurso,
        funcionalidad: editedFuncionalidadRecurso,
        fk_proyecto: editedProyectoId
      });

      // Actualizar la lista de recursos con los cambios
      setRecursos(recursos.map(recurso => {
        if (recurso.id_recurso === editItemId) {
          return {
            ...recurso,
            nombre: editedNombreRecurso,
            tipo_recurso: editedTipoRecurso,
            funcionalidad: editedFuncionalidadRecurso,
            fk_proyecto: editedProyectoId
          };
        }
        return recurso;
      }));

      // Limpiar los estados relacionados con la edición
      setEditItemId(null);
      setEditedNombreRecurso('');
      setEditedTipoRecurso('');
      setEditedFuncionalidadRecurso('');
      setEditedProyectoId('');
      setIsModalOpen(false);

      // Mostrar notificación de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'El recurso ha sido actualizado exitosamente.'
      });
    } catch (error) {
      console.error('Error updating recurso:', error);
      // Mostrar notificación de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el recurso. Por favor, intenta de nuevo más tarde.'
      });
    }
  };


  return (
    <div className="w-full">
      <div className="flex justify-between mx-[1%] py-[.5%]">
        <p className="text-4xl font-semibold">Recursos</p>
        <button className=' bg-blue-500  px-2 py-2 text-white rounded-xl' onClick={handleShowModal}>Mostrar Modal</button>
      </div>
      
      <div className=' mx-10'>
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
      </div>

      <div className="mx-10">
        <section className="mt-6">
          <AnadirRecurso
            isOpen={showModal}
            onClose={handleCloseModal}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            nombreRecurso={nombreRecurso}
            tipoRecurso={tipoRecurso}
            funcionalidadRecurso={funcionalidadRecurso}
            proyectoId={proyectoId}
            handleCloseModal={handleCloseModal}
          />
        </section>

        <div className="overflow-x-auto mt-6">
          {recursos.length > 0 ?
            (<>
              <RecursosTabla
                recursos={recursos}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </>)
            : (<p>No hay recursos añade alguno</p>)}

        </div>
      </div>
      {isModalOpen && (
        <ModalRecursos
          editedNombreRecurso={editedNombreRecurso}
          editedTipoRecurso={editedTipoRecurso}
          editedFuncionalidadRecurso={editedFuncionalidadRecurso}
          editedProyectoId={editedProyectoId}
          handleSave={handleSave}
          setEditedNombreRecurso={setEditedNombreRecurso}
          setIsModalOpen={setIsModalOpen}
          setEditedProyectoId={setEditedProyectoId}


        />
      )}
    </div>
  );
};

export default RecursosAdmin;
