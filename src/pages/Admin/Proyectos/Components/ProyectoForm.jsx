import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function ProyectoForm({setAgregarProyecto}) {
    const [proyectoData, setProyectoData] = useState({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        fk_estado: 0
    });

    const [estados, setEstados] = useState([]);

    useEffect(() => {
        async function fetchEstados() {
            try {
                const response = await fetch('https://localhost:8080/estado');
                if (!response.ok) {
                    throw new Error('Error al obtener los estados');
                }
                const data = await response.json();
                setEstados(data);
            } catch (error) {
                console.error('Error al obtener los estados:', error);
            }
        }

        fetchEstados();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProyectoData({ ...proyectoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Expresiones regulares para validación
        const regexNombre = /^[a-zA-Z\s]+$/;
        const regexDescripcion = /^.{1,100}$/; // Máximo 100 caracteres
        const regexFecha = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

        // Validación de campos
        if (!regexNombre.test(proyectoData.nombre.trim())) {
            showError('El nombre es inválido.');
            return;
        }

        if (!regexDescripcion.test(proyectoData.descripcion.trim())) {
            showError('La descripción es inválida.');
            return;
        }

        if (!regexFecha.test(proyectoData.fecha_inicio)) {
            showError('La fecha de inicio es inválida.');
            return;
        }

        if (!regexFecha.test(proyectoData.fecha_fin)) {
            showError('La fecha de fin es inválida.');
            return;
        }

        if (proyectoData.fk_estado === 0) {
            showError('Por favor selecciona un estado.');
            return;
        }

        try {
            const response = await fetch('https://localhost:8080/proyecto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(proyectoData)
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }
            setAgregarProyecto(false)
            console.log('Datos enviados exitosamente');
            // Aquí podrías hacer algo más después de enviar los datos, como limpiar el formulario o mostrar un mensaje de éxito.
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    const showError = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
    };

    return (

        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 bg-white p-10">
                <p className=' text-4xl mb-2'>Agregar Proyecto</p>
                <label className="block mb-2">
                    <span className="text-gray-700">Nombre:</span>
                    <input
                        type="text"
                        name="nombre"
                        value={proyectoData.nombre}
                        onChange={handleChange}
                        className="  border mt-1 block w-full"
                    />
                </label>
                <label className="block mb-2">
                    <span className="text-gray-700">Descripción:</span>
                    <input
                        type="text"
                        name="descripcion"
                        value={proyectoData.descripcion}
                        onChange={handleChange}
                        className="  border mt-1 block w-full"
                    />
                </label>
                <label className="block mb-2">
                    <span className="text-gray-700">Fecha de inicio:</span>
                    <input
                        type="datetime-local"
                        name="fecha_inicio"
                        value={proyectoData.fecha_inicio}
                        onChange={handleChange}
                        className="  border mt-1 block w-full"
                    />
                </label>
                <label className="block mb-2">
                    <span className="text-gray-700">Fecha de fin:</span>
                    <input
                        type="datetime-local"
                        name="fecha_fin"
                        value={proyectoData.fecha_fin}
                        onChange={handleChange}
                        className="  border mt-1 block w-full"
                    />
                </label>
                <label className="block mb-2">
                    <span className="text-gray-700">Estado:</span>
                    <select
                        name="fk_estado"
                        value={proyectoData.fk_estado}
                        onChange={handleChange}
                        className="  bordert mt-1 block w-full"
                    >
                        <option value={0}>Selecciona un estado</option>
                        {estados.map(estado => (
                            <option key={estado.id_estado} value={estado.id_estado}>
                                {estado.nombre}
                            </option>
                        ))}
                    </select>
                </label>
                <button  type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Enviar
                </button>
                <button onClick={()=> setAgregarProyecto(false)} type="submit" className="bg-red-500 ml-3 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cerrar
                </button>
            </form>
        </div>

    );
}

export default ProyectoForm;
