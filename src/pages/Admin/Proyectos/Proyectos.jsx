import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EquiposPorProyecto from "./Components/EquiposPorProyecto";
import ProyectoForm from "./Components/ProyectoForm";
import ProyectosTabla from "./Components/ProyectosTabla";
const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]); // Estado para almacenar los proyectos
  const [equiposPorProyecto, setEquiposPorProyecto] = useState({}); // Estado para almacenar los equipos por proyecto
  const [selectedProyectoId, setSelectedProyectoId] = useState(null); // Estado para almacenar el ID del proyecto seleccionado
  const [agregarProyecto, setAgregarProyecto] = useState(false)
  // Función para cargar los proyectos desde el endpoint
  const fetchProyectos = async () => {
    try {
      const response = await fetch("https://localhost:8080/proyecto"); // Realiza la solicitud GET al endpoint
      if (!response.ok) {
        throw new Error('Error al cargar los proyectos');
      }
      const data = await response.json(); // Convierte la respuesta a formato JSON
      setProyectos(data); // Actualiza el estado con los datos de los proyectos obtenidos
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecursosPorProyecto = async (proyectoId) => {
    try {
      const response = await fetch(`https://localhost:8080/proyecto/${proyectoId}/recurso`);
      if (!response.ok) {
        throw new Error(`Error al cargar los recursos para el proyecto ${proyectoId}`);
      }
      const recursosData = await response.json();
      console.log(recursosData)
      return recursosData;

    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchEquiposPorProyecto = async () => {
    try {
      const equiposPorProyectoData = {};
      await Promise.all(
        proyectos.map(async (proyecto) => {
          const response = await fetch(`https://localhost:8080/proyecto/${proyecto.id_proyecto}/equipos`);
          if (!response.ok) {
            throw new Error(`Error al cargar los equipos para el proyecto ${proyecto.id_proyecto}`);
          }
          const equiposData = await response.json();
          equiposPorProyectoData[proyecto.id_proyecto] = equiposData;
          

        })
      );
      setEquiposPorProyecto(equiposPorProyectoData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Función para cargar los equipos por proyecto
    fetchProyectos(); // Llama a la función para cargar los proyectos cuando el componente se monta



    if (proyectos.length > 0) {
      fetchEquiposPorProyecto();
    }
  }, []);

  const getColorClass = (estado) => {
    // Función para obtener la clase de color basada en el estado del proyecto
    switch (estado) {
      case 1:
        return "bg-green-200";
      case 2:
        return "bg-red-200";
      case 3:
        return "bg-yellow-200";
      default:
        return "";
    }
  };
  // Función para manejar la apertura del modal y cargar los equipos correspondientes
  const handleOpenModal = (proyectoId) => {
    setSelectedProyectoId(proyectoId);
    fetchEquiposPorProyecto(proyectoId);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedProyectoId(null);
  };

  const handleOpenRecursosModal = async (proyectoId) => {
    setSelectedProyectoId(proyectoId);
    const recursos = await fetchRecursosPorProyecto(proyectoId);
    // Aquí puedes hacer algo con los recursos, como mostrarlos en un modal
    console.log(recursos);
  };

  return (
    <div className="w-full ">
      <div className="flex justify-between mx-[1%] py-[.5%] ">
        <p className="text-4xl font-semibold">Proyecto</p>
        <button onClick={() => setAgregarProyecto(true)} className="bg-black rounded-md text-white px-2 py-1">
           Agregar proyecto
        </button>
      </div>

      <div className="mx-10">
        <div className="flex text-lg font-semibold border-b-2 border-[#cccccc] mt-12">
          <div className="flex justify-around w-[35%] my-[.5%]">
            <Link  to={'/admin/proyectos'}>
            <button className="border-b-2 border-[#2E0364] px-2 text-[#2E0364]">
              Proyecto
            </button>
            </Link>

            <Link to={'/admin/equipos'}>
            <button>Equipo</button>
            </Link>

            <Link to={'/admin/recursos'}>
            <button>Recurso</button>
            </Link>

          </div>
        </div>

        <section className="flex flex-row mt-4 items-center">

        </section>
        <ProyectosTabla
          proyectos={proyectos}
          getColorClass={getColorClass}
          handleOpenModal={handleOpenModal}
          fetchRecursosPorProyecto={fetchRecursosPorProyecto}

          
        />
      </div>
      {
        selectedProyectoId && (
          <EquiposPorProyecto
          selectedProyectoId  = {selectedProyectoId }
          equiposPorProyecto  = {equiposPorProyecto }
          handleCloseModal   = {handleCloseModal  }
          />
        )
      }

      {
        agregarProyecto && (
          <ProyectoForm
            setAgregarProyecto={setAgregarProyecto}
          />
        )
      }
    </div >
  );
};

export default Proyectos;
