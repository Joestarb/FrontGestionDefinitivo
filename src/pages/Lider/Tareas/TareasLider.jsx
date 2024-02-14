import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import editar from "/src/assets/Edit/editar.svg"
import add from "/src/assets/Add/add.svg"
import axios from 'axios'

const TareasLider = () => {
    const id_proyecto = 1 
    const equipo = 3
    
    const [tarea, setTarea] = useState()
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);
    const [encargados, setEncargados] = useState([])

    const openModal = async (id) => { // Espera a que se establezca el estado de tarea
      await fetchEncargados(id);
      setTarea(id) // Llama a fetchEncargados después de que tarea se haya actualizado
      setModal(true);
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:8080/tareaPorProyecto/${id_proyecto}`)
            const tareas = response.data;
            
            // Obtener los usuarios asignados para cada tarea
            const promises = tareas.map(async tarea => {
                const response = await axios.get(`https://localhost:8080/asignacionesByTarea/${tarea.id_tarea}`);
                tarea.usuariosAsignados = response.data;
                return tarea;
            });
    
            // Esperar a que todas las solicitudes de usuarios asignados se completen
            const tareasConUsuarios = await Promise.all(promises);
            
            // Establecer los datos actualizados en el estado
            setData(tareasConUsuarios);
            
        } catch (error) {
            console.log('Algo salió mal');
        }
    }

    const fetchEncargados = async (id) => {
      try {
          const response = await axios.get(`https://localhost:8080/equipoTarea/${id}/${equipo}`)
          setEncargados(response.data);
         
      } catch (error) {
          console.log('Algo salió mal');
      }
  }

    const handleDesAsignar = async(usuario) => {
      try {
        
        const response = await axios.delete(`https://localhost:8080/asignaciones/${usuario}/${tarea}`)
        fetchData()
        fetchEncargados(tarea)
      } catch (error) {
        console.error('Alg salio mal: ', error)
      }
    }

    const handleAsignar = async(usuario) => {
      
      try {
        const response = await axios.post(`https://localhost:8080/asignacioness/${usuario}/${tarea}`)

        fetchData()
        fetchEncargados(tarea)
      } catch (error) {
        console.error('Alg salio mal: ', error)
      }
    }
    

    useEffect(()=>{
        fetchData()
        
    },[])

    return (
        <div className="overflow-x-auto">
     
            <table className="table-auto w-full">
                <thead>
                    <tr className='items-center'>
                        <th className="px-7 py-2">ID</th>
                        <th className="px-7 py-2">Tilin</th>
                        <th className="px-7 py-2">Tipo de Recurso</th>
                        <th className="px-7 py-2">Funcionalidad</th>
                        <th className="px-7 py-2">Proyecto</th>
                        <th className="px-7 py-2">Miembros</th>
                        <th className="px-7 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => ( 
                        <tr key={item.id_tarea}>
                            <td className="border-b-2 px-4 py-2 text-sm items-center">{item.id_tarea}</td>
                            <td className="border-b-2 px-4 py-2 text-sm items-center">{item.nombre}</td>
                            <td className="border-b-2 px-4 py-2 text-sm items-center">{item.descripcion}</td>
                            <td className="border-b-2 px-4 py-2 text-sm items-center">{item.fecha_inicio}</td>
                            <td className="border-b-2 px-4 py-2 text-sm items-center">{item.fecha_fin ? item.fecha_fin : 'En progreso'}</td>
                            <td className="border-b-2 px-4 py-2 text-sm items-center">
                                    {item.usuariosAsignados.map(usuario => (
                                        <div key={usuario.id_usuario}>
                                            {usuario.nombre_usuario}
                                        </div>
                                    ))} </td>

                            <td className="border-b-2 px-4 py-2 text-sm">
                            <button onClick={() => handleDelete(item.id_recurso)} className=" text-red-500 text-3xl  font-bold py-2 px-4 rounded">
                                   <img className='h-[5vh] w-[5vw]' src={editar}/>
                                </button>
                                <button onClick={() => handleDelete(item.id_recurso)} className=" text-red-500 text-3xl  font-bold py-2 px-4 rounded">
                                    <MdDelete/>
                                </button>
                                <button className=' text-green-500' onClick={()=>openModal(item.id_tarea)}>
                                    <img className='h-[5vh] w-[5vw]' src={add}/>
                                
                                    </button>
                                
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

                        {
                         modal && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <div className="relative bg-white rounded-lg w-96 p-6">
          <div className="absolute top-0 right-0">
            <button className="text-gray-500 hover:text-gray-700"></button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Encargado(s) de la Tarea</h2>

          { encargados.map((item)=>(
            <div className={`rounded-sm py-[.5%] my-1 px-[1.5%] flex items-center justify-between ${item.en_uso === 1 ? 'bg-green-100 border border-green-200 rounded-sm' : ''}`}>
              <h3>{item.nombre_usuario}</h3>
              <button 
                className={`text-xl cursor-pointer ${item.en_uso === 1 ? 'text-red-500' : 'text-green-500'}`} 
                onClick={() => item.en_uso === 1 ? handleDesAsignar(item.id_usuario) : handleAsignar(item.id_usuario)}
              >
                {item.en_uso === 1 ? '-' : '+'}
              </button>
            </div>
          ))}

          <div className='text-right pt-8'>
            <button className='bg-green-500 w-[6vw] text-white'>Aceptar</button>
            <button className='bg-red-500 w-[6vw] mx-[1%] text-white' onClick={()=>setModal(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )}

        </div>
    );
};

export default TareasLider;
