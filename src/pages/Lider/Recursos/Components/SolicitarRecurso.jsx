import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';



function SolicitarRecurso({ onSubmit }) {
  const [proyectos, setProyectos] = useState([]); // Aquí almacenaremos la lista de proyectos disponibles
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo_recurso: '',
    nombre: '',
    funcionalidad: '',
    fk_proyecto: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se envíe el formulario por defecto
  
    // Verifica si hay campos vacíos o solo espacios en blanco
    for (const key in formData) {
      if (formData[key] === '' || /^\s+$/.test(formData[key])) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor complete todos los campos',
        });
        return; // Detiene el envío del formulario si hay campos vacíos o solo espacios en blanco
      }
    }
  
    try {
      const response = await fetch('https://localhost:8080/recurso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
  
      // Aquí puedes manejar la respuesta si es necesario
      const responseData = await response.json();
      console.log('Response data:', responseData);
  
      // Llamar a la función onSubmit si es necesario
      onSubmit(formData);
  
      // Limpiar el formulario y cerrar el modal
      setFormData({
        tipo_recurso: '',
        nombre: '',
        funcionalidad: '',
        fk_proyecto: ''
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting data:', error);
      // Aquí puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }
  };
  


  useEffect(() => {
    // Aquí realizaremos la solicitud para obtener la lista de proyectos al cargar el componente
    fetch('https://localhost:8080/proyecto')
      .then(response => response.json())
      .then(data => setProyectos(data))
      .catch(error => console.error('Error fetching proyectos:', error));
  }, []); // Usamos un arreglo vacío como dependencia para que se ejecute solo una vez al montar el componente


  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black rounded-xl absolute top-[98px] mr-7 right-0 text-white p-2 font-semibold"
      >
        Solicitar recurso
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label htmlFor="tipo_recurso" className="block text-gray-700 text-sm font-bold mb-2">Tipo de Recurso</label>
                    <input
                      type="text"
                      id="tipo_recurso"
                      name="tipo_recurso"
                      value={formData.tipo_recurso}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ingrese el tipo de recurso"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ingrese el nombre"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="funcionalidad" className="block text-gray-700 text-sm font-bold mb-2">Funcionalidad</label>
                    <input
                      type="text"
                      id="funcionalidad"
                      name="funcionalidad"
                      value={formData.funcionalidad}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ingrese la funcionalidad"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="fk_proyecto" className="block text-gray-700 text-sm font-bold mb-2">Proyecto</label>
                    <select
                      id="fk_proyecto"
                      name="fk_proyecto"
                      value={formData.fk_proyecto}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="">Seleccione un proyecto</option>
                      {proyectos.map(proyecto => (
                        <option key={proyecto.id_proyecto} value={proyecto.id_proyecto}>{proyecto.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SolicitarRecurso;
